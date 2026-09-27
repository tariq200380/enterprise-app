import type { Metadata } from "next";
import { getAboutData, getPartnerReviewLinks } from "@/lib/about-data";
import AboutPageClient from "@/components/about/AboutPageClient";

import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for About page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("about");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/about",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/about",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default async function AboutPage() {
  const settings = await getAboutData();
  const partnerLinks = getPartnerReviewLinks(settings);

  return (
    <AboutPageClient
      partnerLinks={partnerLinks}
      aboutSettings={settings.aboutSettings}
    />
  );
}
