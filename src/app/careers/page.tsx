import type { Metadata } from "next";
import CareerHero from "@/components/careers/careerhero";
import CareerWhy from "@/components/careers/careerwhy";
import CareerProcess from "@/components/careers/careerprocess";
import CareerRoles from "@/components/careers/careerroles";
import CareerFaq from "@/components/careers/careerfaq";
import CareerHotline from "@/components/careers/careerhotline";
import CareerLogic from "@/components/careers/careerlogic";

import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Careers page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("careers");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/careers",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/careers",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default function CareersPage() {
  return (
    <main className="w-full bg-[#F7F6F5] font-sans text-[#0F172A] border-b border-[#E6E4DF]">
      <CareerHero />
      <CareerWhy />
      <CareerProcess />
      <CareerRoles />
      <CareerFaq />
      <CareerHotline />
      <CareerLogic />
    </main>
  );
}
