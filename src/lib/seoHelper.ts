import { query } from "@/lib/db";
import { PageSeoData, FALLBACK_SEO } from "@/lib/seo-types";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export type { PageSeoData };
export { FALLBACK_SEO };

/**
 * Fetch SEO settings for a specific page from PostgreSQL with multi-layer caching.
 * Falls back to default values if not configured yet.
 */
const getCachedSeoForPage = cache(
  (pageKey: string) =>
    unstable_cache(
      async (): Promise<PageSeoData> => {
        const fallback = FALLBACK_SEO[pageKey] || FALLBACK_SEO.global;

        try {
          const res = await query(
            "SELECT page_key, title, description, keywords, og_image, canonical_url, no_index, no_follow, meta_tags, updated_at FROM seo_settings WHERE page_key = $1",
            [pageKey]
          );

          if (res.rows.length > 0) {
            const row = res.rows[0];
            return {
              page_key: row.page_key,
              title: row.title || fallback.title,
              description: row.description || fallback.description,
              keywords: row.keywords || fallback.keywords,
              og_image: row.og_image || fallback.og_image,
              canonical_url: row.canonical_url || fallback.canonical_url,
              no_index: Boolean(row.no_index),
              no_follow: Boolean(row.no_follow),
              meta_tags: typeof row.meta_tags === "string" ? JSON.parse(row.meta_tags) : row.meta_tags || {},
              updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
            };
          }
        } catch {
          // Return fallback in case of query failure
        }

        return fallback;
      },
      [`seo-page-${pageKey}`],
      {
        revalidate: 3600,
        tags: ["seo_settings", `seo_${pageKey}`],
      }
    )()
);

export async function getSeoForPage(pageKey: string): Promise<PageSeoData> {
  return getCachedSeoForPage(pageKey);
}

/**
 * Fetch all SEO settings records (used by admin and sitemap).
 */
const getCachedAllSeoSettings = unstable_cache(
  async (): Promise<Record<string, PageSeoData>> => {
    const result: Record<string, PageSeoData> = { ...FALLBACK_SEO };

    try {
      const res = await query(
        "SELECT page_key, title, description, keywords, og_image, canonical_url, no_index, no_follow, meta_tags, updated_at FROM seo_settings"
      );

      for (const row of res.rows) {
        result[row.page_key] = {
          page_key: row.page_key,
          title: row.title || result[row.page_key]?.title || "",
          description: row.description || result[row.page_key]?.description || "",
          keywords: row.keywords || result[row.page_key]?.keywords || "",
          og_image: row.og_image || result[row.page_key]?.og_image || "",
          canonical_url: row.canonical_url || result[row.page_key]?.canonical_url || "",
          no_index: Boolean(row.no_index),
          no_follow: Boolean(row.no_follow),
          meta_tags: typeof row.meta_tags === "string" ? JSON.parse(row.meta_tags) : row.meta_tags || {},
          updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
        };
      }
    } catch {
      // Return defaults if table is inaccessible
    }

    return result;
  },
  ["all-seo-settings"],
  {
    revalidate: 3600,
    tags: ["seo_settings"],
  }
);

export async function getAllSeoSettings(): Promise<Record<string, PageSeoData>> {
  return getCachedAllSeoSettings();
}
