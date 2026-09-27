import type { Metadata } from "next";
import IsoHero from "@/components/security-iso-27001/isohero";
import IsoPillars from "@/components/security-iso-27001/isopillars";
import IsoGovernance from "@/components/security-iso-27001/isogovernance";
import IsoAnnexA from "@/components/security-iso-27001/isoannexa";
import IsoIncidentTable from "@/components/security-iso-27001/isoincidenttable";
import IsoCta from "@/components/security-iso-27001/isocta";

import { getSeoForPage } from "@/lib/seoHelper";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("security_iso_27001");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/security-iso-27001",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/security-iso-27001",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default function SecurityIso27001Page() {
  return (
    <div className="w-full bg-[#F7F6F5] font-sans antialiased text-[#0F172A] selection:bg-[#FF6B00] selection:text-white">
      <IsoHero />
      <IsoPillars />
      <IsoGovernance />
      <IsoAnnexA />
      <IsoIncidentTable />
      <IsoCta />
    </div>
  );
}
