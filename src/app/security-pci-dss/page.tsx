import type { Metadata } from "next";
import PciHero from "@/components/security-pci-dss/pcihero";
import PciPillars from "@/components/security-pci-dss/pcipillars";
import PciTokenization from "@/components/security-pci-dss/pcitokenization";
import PciRequirements from "@/components/security-pci-dss/pcirequirements";
import PciSaqTable from "@/components/security-pci-dss/pcisaqtable";
import PciCta from "@/components/security-pci-dss/pcicta";

import { getSeoForPage } from "@/lib/seoHelper";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("security_pci_dss");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/security-pci-dss",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/security-pci-dss",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default function SecurityPciDssPage() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      <PciHero />
      <PciPillars />
      <PciTokenization />
      <PciRequirements />
      <PciSaqTable />
      <PciCta />
    </div>
  );
}
