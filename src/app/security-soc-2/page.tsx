import type { Metadata } from "next";
import Soc2Hero from "@/components/security-soc-2/soc2hero";
import Soc2Pillars from "@/components/security-soc-2/soc2pillars";
import Soc2Comparison from "@/components/security-soc-2/soc2comparison";
import Soc2Criteria from "@/components/security-soc-2/soc2criteria";
import Soc2EvidenceTable from "@/components/security-soc-2/soc2evidencetable";
import Soc2Cta from "@/components/security-soc-2/soc2cta";

import { getSeoForPage } from "@/lib/seoHelper";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("security_soc_2");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/security-soc-2",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/security-soc-2",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default function SecuritySoc2Page() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      <Soc2Hero />
      <Soc2Pillars />
      <Soc2Comparison />
      <Soc2Criteria />
      <Soc2EvidenceTable />
      <Soc2Cta />
    </div>
  );
}
