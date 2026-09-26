import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";
import {
  fetchAllAggregatedNews,
  fetchLiveNewsFromDb,
  revalidateAllNews,
  syncAllNewsFeeds,
  AggregatedArticle,
} from "@/lib/newsSync";
import { withCacheBuster } from "@/lib/cacheBuster";
import { BRAND_FALLBACK_IMAGES } from "@/components/knowledge-center/knowledgeCenterData";

export interface LiveNewsItem {
  id: string;
  provider: string;
  tag: string;
  providerLabel: string;
  providerColor: string;
  date: string;
  source: string;
  title: string;
  desc: string;
  link: string;
  img: string;
  image: string;
  source_image_url?: string;
  timestamp?: string;
}

const PROVIDER_METADATA: Record<string, { color: string; label: string }> = {
  google: { color: "#0052FF", label: "🌐 GOOGLE • AI & DEVICES" },
  microsoft: { color: "#00A4EF", label: "🪟 MICROSOFT • CLOUD & COPILOT" },
  nvidia: { color: "#059669", label: "⚡ NVIDIA • ACCELERATED AI" },
  anthropic: { color: "#D97706", label: "🧠 ANTHROPIC • SAFETY RESEARCH" },
  openai: { color: "#7C3AED", label: "🤖 OPENAI • AI REASONING" },
  meta: { color: "#0081FB", label: "♾️ META • OPEN SOURCE AI" },
  apple: { color: "#0284C7", label: "🍎 APPLE • HARDWARE & SILICON" },
  intel: { color: "#0071C5", label: "🔷 INTEL • NEXT-GEN SILICON" },
  dawn: { color: "#059669", label: "🇵🇰 DAWN • TECH & SCIENCE" },
  brecorder: { color: "#0284C7", label: "🇵🇰 B-RECORDER • FINTECH" },
  propakistani: { color: "#D97706", label: "🇵🇰 PROPAKISTANI • DIGITAL ECOSYSTEM" },
  tribune: { color: "#DC2626", label: "🇵🇰 TRIBUNE • AEROSPACE & TECH" },
};

function normalizeImagePath(img: string | null | undefined, provider = ""): string {
  const pKey = provider.toLowerCase();
  const fallback = BRAND_FALLBACK_IMAGES[pKey] || "/images/kc-news.webp";
  if (!img) return fallback;
  const trimmed = img.trim();
  if (
    !trimmed ||
    trimmed === "/images/kc-news.webp" ||
    trimmed.includes("kc-news.webp") ||
    trimmed.includes("25a7c99743ebfb3b") ||
    trimmed.includes("8a4eb6c412e5e7ffa38f07233344f4b7e6644994") ||
    trimmed.toLowerCase().includes("omb-home-final") ||
    (pKey === "microsoft" && (trimmed.includes("blogs.microsoft.com") || trimmed.includes("thesourcemediaassets")))
  ) {
    return fallback;
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  return `/${trimmed}`;
}

function formatDynamicRelativeTime(timestamp?: string, rawDateStr?: string, defaultSource = "Live Wire"): string {
  let sourceSuffix = defaultSource;
  if (rawDateStr && rawDateStr.includes("•")) {
    const extracted = rawDateStr.split("•").slice(1).join("•").trim();
    if (extracted && !extracted.toLowerCase().includes("live rss feed")) sourceSuffix = extracted;
  } else if (rawDateStr && !rawDateStr.toLowerCase().includes("ago") && !rawDateStr.toLowerCase().includes("live rss feed")) {
    sourceSuffix = rawDateStr.trim();
  }

  const dateToParse = timestamp || (rawDateStr && !rawDateStr.toLowerCase().includes("ago") ? rawDateStr : null);
  if (!dateToParse) {
    return rawDateStr || (sourceSuffix ? `${defaultSource} • ${sourceSuffix}` : defaultSource);
  }

  let ts = Date.parse(dateToParse);
  if (isNaN(ts)) {
    ts = Date.parse(dateToParse.replace(" ", "T") + "Z");
  }

  if (isNaN(ts) || ts <= 0) {
    return rawDateStr || (sourceSuffix ? `${defaultSource} • ${sourceSuffix}` : defaultSource);
  }

  const diffMs = Date.now() - ts;
  if (diffMs < 0) {
    return sourceSuffix ? `Just now • ${sourceSuffix}` : "Just now";
  }

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  let timeAgo = "";
  if (diffMin < 1) timeAgo = "Just now";
  else if (diffMin < 60) timeAgo = `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  else if (diffHour < 24) timeAgo = `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  else timeAgo = "Latest Official Dispatch";

  return sourceSuffix ? `${timeAgo} • ${sourceSuffix}` : timeAgo;
}

async function ensureAllWiresPopulated(
  brandWiresClean: Record<string, any>,
  regionalWiresClean: Record<string, any>
) {
  const localCachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");
  let diskBrandWires: Record<string, any> = {};
  let diskRegionalWires: Record<string, any> = {};
  try {
    if (fs.existsSync(localCachePath)) {
      const cached = JSON.parse(fs.readFileSync(localCachePath, "utf-8"));
      if (cached.brand_wires) diskBrandWires = cached.brand_wires;
      if (cached.regional_wires) diskRegionalWires = cached.regional_wires;
    }
  } catch {}

  for (const rKey of ["dawn", "brecorder", "propakistani", "tribune"]) {
    if (!regionalWiresClean[rKey]) {
      if (diskRegionalWires[rKey]) {
        regionalWiresClean[rKey] = diskRegionalWires[rKey];
      } else {
        try {
          const dbItem = await prisma.liveNewsItem.findFirst({
            where: { provider: rKey },
            orderBy: { publishedAt: "desc" },
          });
          if (dbItem) {
            const meta = PROVIDER_METADATA[rKey] || { color: "#475569", label: rKey.toUpperCase() };
            regionalWiresClean[rKey] = {
              id: rKey,
              name: meta.label,
              brandBadge: meta.label,
              category: dbItem.category || "PAKISTAN TECH",
              date: dbItem.publishedAt ? dbItem.publishedAt.toISOString() : new Date().toISOString(),
              title: dbItem.title,
              summary: dbItem.description || "",
              sourceName: meta.label,
              sourceUrl: dbItem.link,
              link: dbItem.link,
              image: normalizeImagePath(dbItem.image, rKey),
              img: normalizeImagePath(dbItem.image, rKey),
              provider_published_at: dbItem.publishedAt?.toISOString(),
            };
          }
        } catch {}
      }
    }
  }

  for (const bKey of ["apple", "microsoft", "meta", "openai", "nvidia", "google", "anthropic", "intel"]) {
    if (!brandWiresClean[bKey]) {
      if (diskBrandWires[bKey]) {
        brandWiresClean[bKey] = diskBrandWires[bKey];
      } else {
        try {
          const dbItem = await prisma.liveNewsItem.findFirst({
            where: { provider: bKey },
            orderBy: { publishedAt: "desc" },
          });
          if (dbItem) {
            const meta = PROVIDER_METADATA[bKey] || { color: "#475569", label: bKey.toUpperCase() };
            brandWiresClean[bKey] = {
              id: bKey,
              brandBadge: meta.label,
              captionTag: `${bKey.toUpperCase()} OFFICIAL WIRE`,
              cat: dbItem.category || "TECH WIRE",
              date: dbItem.publishedAt ? dbItem.publishedAt.toISOString() : new Date().toISOString(),
              title: dbItem.title,
              summary: dbItem.description || "",
              source: meta.label,
              link: dbItem.link,
              img: normalizeImagePath(dbItem.image, bKey),
              caption: `📷 ${dbItem.title}`,
              provider_published_at: dbItem.publishedAt?.toISOString(),
            };
          }
        } catch {}
      }
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceSync = searchParams.get("sync") === "true" || searchParams.get("refresh") === "true";
    const simulateFailure = searchParams.get("simulate_failure") === "true";
    const simulateFatalError = searchParams.get("simulate_fatal_error") === "true";

    if (simulateFatalError) {
      throw new Error("Simulated fatal uncaught error for top-level catch testing");
    }

    // Immediate on-demand cache invalidation when refresh requested
    if (forceSync) {
      revalidateAllNews();
      await syncAllNewsFeeds().catch(() => {});
    }

    // Fetch all aggregated news via per-source isolated cache with PostgreSQL fallback
    let allArticles: AggregatedArticle[] = [];
    let sourceUsed = "live_sync";

    if (!simulateFailure) {
      try {
        allArticles = await fetchAllAggregatedNews();
      } catch (fetchErr) {
        console.warn("[Live News API] fetchAllAggregatedNews failed, checking PostgreSQL store:", fetchErr);
      }
    } else {
      console.log("[Live News API] Simulating live fetch failure as requested by ?simulate_failure=true");
    }

    // Fall back to persistent PostgreSQL store if live fetch fails or is empty
    if (!allArticles || allArticles.length === 0) {
      console.log("[Live News API] Falling back to PostgreSQL live_news_items store");
      allArticles = await fetchLiveNewsFromDb(28);
      sourceUsed = "database_fallback";
    }

    // Map each article ensuring title, image, source, and unique id are never mismatched
    const breakingNews: LiveNewsItem[] = allArticles.map((item) => {
      const pKey = (item.provider || "google").toLowerCase();
      const meta = PROVIDER_METADATA[pKey] || {
        color: "#475569",
        label: item.providerLabel || pKey.toUpperCase(),
      };

      const rawNormalized = normalizeImagePath(item.image || item.img, pKey);
      const finalImg = withCacheBuster(rawNormalized, item.timestamp || item.date || item.id);

      return {
        id: item.id,
        provider: pKey,
        tag: item.tag || meta.label,
        providerLabel: meta.label,
        providerColor: meta.color,
        date: formatDynamicRelativeTime(item.timestamp, item.date, item.source || meta.label),
        source: item.source || meta.label,
        title: item.title,
        desc: item.desc,
        link: item.link,
        img: finalImg,
        image: finalImg,
        source_image_url: item.image || "",
        timestamp: item.timestamp,
      };
    });

    // Group for brand wires (international) and regional wires (Pakistani)
    const brandWiresClean: Record<string, any> = {};
    const regionalWiresClean: Record<string, any> = {};
    const regionalItems: any[] = [];

    for (const item of breakingNews) {
      const pKey = item.provider;
      const isRegional = ["dawn", "brecorder", "propakistani", "tribune"].includes(pKey);

      if (!isRegional) {
        const isValidBrandTitle =
          item.title && item.title.trim().length >= 10 && !item.title.trim().startsWith("-");
        const isBetterAiStory =
          brandWiresClean[pKey] &&
          !brandWiresClean[pKey].title.toLowerCase().includes("gemini") &&
          !brandWiresClean[pKey].title.toLowerCase().includes("copilot") &&
          !brandWiresClean[pKey].title.toLowerCase().includes("claude") &&
          (item.title.toLowerCase().includes("gemini") ||
            item.title.toLowerCase().includes("copilot") ||
            item.title.toLowerCase().includes("claude"));

        if ((!brandWiresClean[pKey] || isBetterAiStory) && isValidBrandTitle) {
          brandWiresClean[pKey] = {
            id: pKey,
            brandBadge: item.providerLabel,
            captionTag: `${pKey.toUpperCase()} OFFICIAL WIRE`,
            cat: item.tag,
            date: item.date,
            title: item.title,
            summary: item.desc,
            source: item.source,
            link: item.link,
            img: item.img,
            caption: `📷 ${item.title}`,
            provider_published_at: item.timestamp,
          };
        }
      } else {
        if (!regionalWiresClean[pKey]) {
          regionalWiresClean[pKey] = {
            id: pKey,
            name: item.source,
            brandBadge: item.providerLabel,
            category: item.tag,
            date: item.date,
            title: item.title,
            summary: item.desc,
            sourceName: item.source,
            sourceUrl: item.link,
            link: item.link,
            image: item.img,
            img: item.img,
            provider_published_at: item.timestamp,
          };
        }
        regionalItems.push(item);
      }
    }

    // Guarantee all 8 international and 4 regional wires are populated dynamically
    await ensureAllWiresPopulated(brandWiresClean, regionalWiresClean);

    return NextResponse.json(
      {
        status: "success",
        source: sourceUsed,
        data_source: sourceUsed,
        timestamp: new Date().toISOString(),
        count: breakingNews.length,
        breaking_news: breakingNews,
        brand_wires: brandWiresClean,
        regional_wires: regionalWiresClean,
        regional_items: regionalItems,
      },
      {
        headers: {
          "Cache-Control": sourceUsed === "database_fallback" ? "no-cache" : "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error: any) {
    console.error("[Live News API] Error in GET handler:", error);

    // 1. Primary Fallback: Persistent PostgreSQL database store
    try {
      const dbArticles = await fetchLiveNewsFromDb(28);
      if (dbArticles && dbArticles.length > 0) {
        const breakingNews: LiveNewsItem[] = dbArticles.map((item) => {
          const pKey = (item.provider || "google").toLowerCase();
          const meta = PROVIDER_METADATA[pKey] || {
            color: "#475569",
            label: item.providerLabel || pKey.toUpperCase(),
          };
          const rawNormalized = normalizeImagePath(item.image || item.img);
          const finalImg = withCacheBuster(rawNormalized, item.timestamp || item.date || item.id);
          return {
            id: item.id,
            provider: pKey,
            tag: item.tag || meta.label,
            providerLabel: meta.label,
            providerColor: meta.color,
            date: formatDynamicRelativeTime(item.timestamp, item.date, item.source || meta.label),
            source: item.source || meta.label,
            title: item.title,
            desc: item.desc,
            link: item.link,
            img: finalImg,
            image: finalImg,
            source_image_url: item.image || "",
            timestamp: item.timestamp,
          };
        });

        const brandWiresClean: Record<string, any> = {};
        const regionalWiresClean: Record<string, any> = {};
        const regionalItems: any[] = [];

        for (const item of breakingNews) {
          const pKey = item.provider;
          const isRegional = ["dawn", "brecorder", "propakistani", "tribune"].includes(pKey);

          if (!isRegional) {
            const isValidBrandTitle =
              item.title && item.title.trim().length >= 10 && !item.title.trim().startsWith("-");
            if (!brandWiresClean[pKey] && isValidBrandTitle) {
              brandWiresClean[pKey] = {
                id: pKey,
                brandBadge: item.providerLabel,
                captionTag: `${pKey.toUpperCase()} OFFICIAL WIRE`,
                cat: item.tag,
                date: item.date,
                title: item.title,
                summary: item.desc,
                source: item.source,
                link: item.link,
                img: item.img,
                caption: `📷 ${item.title}`,
                provider_published_at: item.timestamp,
              };
            }
          } else {
            if (!regionalWiresClean[pKey]) {
              regionalWiresClean[pKey] = {
                id: pKey,
                name: item.source,
                brandBadge: item.providerLabel,
                category: item.tag,
                date: item.date,
                title: item.title,
                summary: item.desc,
                sourceName: item.source,
                sourceUrl: item.link,
                link: item.link,
                image: item.img,
                img: item.img,
                provider_published_at: item.timestamp,
              };
            }
            regionalItems.push(item);
          }
        }

        await ensureAllWiresPopulated(brandWiresClean, regionalWiresClean);

        return NextResponse.json(
          {
            status: "success",
            source: "database_fallback",
            data_source: "database_fallback",
            timestamp: new Date().toISOString(),
            count: breakingNews.length,
            breaking_news: breakingNews,
            brand_wires: brandWiresClean,
            regional_wires: regionalWiresClean,
            regional_items: regionalItems,
          },
          { headers: { "Cache-Control": "no-cache" } }
        );
      }
    } catch (dbErr) {
      console.warn("[Live News API] Database fallback error:", dbErr);
    }

    // 2. Secondary Fallback: Disk JSON cache if available
    try {
      const localCachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");
      if (fs.existsSync(localCachePath)) {
        const raw = fs.readFileSync(localCachePath, "utf-8");
        const parsed = JSON.parse(raw);
        return NextResponse.json(parsed, {
          headers: { "Cache-Control": "no-cache" },
        });
      }
    } catch {}

    return NextResponse.json(
      { status: "error", message: "Failed to load live news" },
      { status: 500 }
    );
  }
}
