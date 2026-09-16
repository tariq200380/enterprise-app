import { cache } from "react";
import { query } from "@/lib/db";
import {
  DEFAULT_WEBSITE_SETTINGS,
  WebsiteSettingsData,
  ReviewPlatformItem,
} from "@/components/admin/settings/types";

export interface PartnerReviewLinks {
  sectionTitle?: string;
  theManifestUrl: string;
  shopifyUrl: string;
  trustpilotUrl: string;
  clutchUrl: string;
  googleReviewsUrl: string;
  platforms?: ReviewPlatformItem[];
}

export function getPartnerReviewLinks(settings?: WebsiteSettingsData): PartnerReviewLinks {
  const reviewLinks = settings?.aboutSettings?.reviewLinks;
  const partnerLogos = settings?.partnerLogos || [];

  const getPartnerUrl = (keyword: string, fallback: string) => {
    const item = partnerLogos.find((p) => p.name?.toLowerCase().includes(keyword));
    return item?.websiteUrl || fallback;
  };

  const theManifestUrl =
    reviewLinks?.theManifestUrl || getPartnerUrl("manifest", "https://themanifest.com");
  const shopifyUrl =
    reviewLinks?.shopifyUrl || getPartnerUrl("shopify", "https://www.shopify.com/partners");
  const trustpilotUrl =
    reviewLinks?.trustpilotUrl || getPartnerUrl("trustpilot", "https://www.trustpilot.com");
  const clutchUrl =
    reviewLinks?.clutchUrl || getPartnerUrl("clutch", "https://clutch.co");
  const googleReviewsUrl =
    reviewLinks?.googleReviewsUrl || getPartnerUrl("google", "https://www.google.com");

  const defaultPlatforms: ReviewPlatformItem[] = [
    { id: "the-manifest", name: "The Manifest", url: theManifestUrl, enabled: true },
    { id: "shopify-partners", name: "Shopify Partners", url: shopifyUrl, enabled: true },
    { id: "trustpilot", name: "Trustpilot", url: trustpilotUrl, enabled: true },
    { id: "clutch", name: "Clutch", url: clutchUrl, enabled: true },
    { id: "google-reviews", name: "Google Reviews", url: googleReviewsUrl, enabled: true },
  ];

  const platforms =
    Array.isArray(reviewLinks?.platforms) && reviewLinks.platforms.length > 0
      ? reviewLinks.platforms
      : defaultPlatforms;

  return {
    sectionTitle: reviewLinks?.sectionTitle || "Reviewed & Recommended On",
    theManifestUrl,
    shopifyUrl,
    trustpilotUrl,
    clutchUrl,
    googleReviewsUrl,
    platforms,
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

