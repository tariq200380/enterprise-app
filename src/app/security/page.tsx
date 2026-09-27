import type { Metadata } from "next";
import SecurityHero from "@/components/security/securityhero";
import SecurityPillar from "@/components/security/securitypillar";
import SecurityCompliance from "@/components/security/securitycompliance";
import SecurityArchitecture from "@/components/security/securityarchitecture";
import SecurityProcessors from "@/components/security/securityprocessors";
import SecurityFooter from "@/components/security/securityfooter";

import { getSeoForPage } from "@/lib/seoHelper";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("security");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/security",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/security",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default function SecurityPage() {
  return (
    <main className="w-full bg-[#F7F6F5] font-sans antialiased text-[#0F172A] selection:bg-[#FF6B00] selection:text-white">
      <SecurityHero />
      <SecurityPillar />
      <SecurityCompliance />
      <SecurityArchitecture />
      <SecurityProcessors />
      <SecurityFooter />
    </main>
  );
}
