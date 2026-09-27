import type { Metadata } from "next";
import { query } from "@/lib/db";
import { DEFAULT_WEBSITE_SETTINGS } from "@/components/admin/settings/types";
import ServicesHero from "@/components/services/serviceshero";
import ServicesProject from "@/components/services/servicesproject";
import ServicesDigital from "@/components/services/servicesdigital";
import ServicesSolution from "@/components/services/servicessolution";
import ServicesDelivery from "@/components/services/servicesdelivery";
import ServicesIndustries from "@/components/services/servicesindustries";
import ServicesVision from "@/components/services/servicesvision";

import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Services category page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("services");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/services",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/services",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

async function getServicesData() {
  let explorer = DEFAULT_WEBSITE_SETTINGS.servicesExplorer;

  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;

      if (val.servicesExplorer) {
        explorer = {
          sectionHeadline: val.servicesExplorer.sectionHeadline || explorer.sectionHeadline,
          sectionDescription: val.servicesExplorer.sectionDescription || explorer.sectionDescription,
          services:
            Array.isArray(val.servicesExplorer.services) && val.servicesExplorer.services.length > 0
              ? val.servicesExplorer.services
              : explorer.services,
        };
      }
    }
  } catch (err) {
    console.error("Failed to load services settings:", err);
  }

  return { explorer };
}

export default async function ServicesPage() {
  const { explorer } = await getServicesData();

  return (
    <>
      <ServicesHero />
      <ServicesProject />
      <ServicesDigital data={explorer} />
      <ServicesSolution />
      <ServicesDelivery />
      <ServicesIndustries />
      <ServicesVision />
    </>
  );
}
