import type { Metadata } from "next";
import { getContactSettings } from "@/lib/contact-data";
import ContactPageClient from "@/components/contact/ContactPageClient";

import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Contact page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("contact");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/contact",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/contact",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default async function ContactPage() {
  const settings = await getContactSettings();

  return <ContactPageClient settings={settings} />;
}
