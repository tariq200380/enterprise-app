import { cache } from "react";
import { query } from "@/lib/db";
import { DEFAULT_WEBSITE_SETTINGS, WebsiteSettingsData } from "@/components/admin/settings/types";

export interface PartnerReviewLinks {
  theManifestUrl: string;
  shopifyUrl: string;
  trustpilotUrl: string;
  clutchUrl: string;
  googleReviewsUrl: string;
}

export function getPartnerReviewLinks(settings?: WebsiteSettingsData): PartnerReviewLinks {
  const reviewLinks = settings?.aboutSettings?.reviewLinks;
  const partnerLogos = settings?.partnerLogos || [];

  // Single-pass O(1) lookup dictionary for partner website URLs
  const partnerMap = new Map<string, string>();
  for (const p of partnerLogos) {
    if (p.name && p.websiteUrl) {
      partnerMap.set(p.name.toLowerCase().trim(), p.websiteUrl);
    }
  }

  const getPartnerUrl = (keyword: string, fallback: string) => {
    for (const [name, url] of partnerMap.entries()) {
      if (name.includes(keyword)) {
        return url;
      }
    }
    return fallback;
  };

  return {
    theManifestUrl:
      reviewLinks?.theManifestUrl || getPartnerUrl("manifest", "https://themanifest.com"),
    shopifyUrl:
      reviewLinks?.shopifyUrl || getPartnerUrl("shopify", "https://www.shopify.com/partners"),
    trustpilotUrl:
      reviewLinks?.trustpilotUrl || getPartnerUrl("trustpilot", "https://www.trustpilot.com"),
    clutchUrl:
      reviewLinks?.clutchUrl || getPartnerUrl("clutch", "https://clutch.co"),
    googleReviewsUrl:
      reviewLinks?.googleReviewsUrl || getPartnerUrl("google", "https://www.google.com"),
  };
}

export const getAboutData = cache(async (): Promise<WebsiteSettingsData> => {
  let settings = DEFAULT_WEBSITE_SETTINGS;

  try {
    const res = await query(
      "SELECT value FROM website_settings WHERE key = 'global_config' LIMIT 1"
    );
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;

      settings = {
        ...settings,
        ...val,
      };
    }
  } catch (err) {
    console.error("Failed to load about page settings:", err);
  }

  return settings;
});

