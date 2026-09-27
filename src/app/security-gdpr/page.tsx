import type { Metadata } from "next";
import GdprHero from "@/components/security-gdpr/gdprhero";
import GdprPillars from "@/components/security-gdpr/gdprpillars";
import GdprArticle6 from "@/components/security-gdpr/gdprarticle6";
import GdprRights from "@/components/security-gdpr/gdprrights";
import GdprDpaTable from "@/components/security-gdpr/gdprdpatable";
import GdprCta from "@/components/security-gdpr/gdprcta";

import { getSeoForPage } from "@/lib/seoHelper";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("security_gdpr");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/security-gdpr",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/security-gdpr",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default function SecurityGdprPage() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      <GdprHero />
      <GdprPillars />
      <GdprArticle6 />
      <GdprRights />
      <GdprDpaTable />
      <GdprCta />
    </div>
  );
}
