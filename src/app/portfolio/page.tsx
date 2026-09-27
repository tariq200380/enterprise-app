import type { Metadata } from "next";
import { getPortfolioProjects, getPortfolioShowcase } from "@/lib/portfolio-data";
import PortfolioHeroSection from "@/components/portfolio/PortfolioHeroSection";
import PortfolioStandardsSection from "@/components/portfolio/PortfolioStandardsSection";
import PortfolioCaseStudiesSection from "@/components/portfolio/PortfolioCaseStudiesSection";
import PortfolioCtaSection from "@/components/portfolio/PortfolioCtaSection";

import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Portfolio page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("portfolio");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/portfolio",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/portfolio",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default async function PortfolioPage() {
  const [projects, showcase] = await Promise.all([
    getPortfolioProjects(),
    getPortfolioShowcase(),
  ]);

  return (
    <div className="w-full bg-[#FAFAFC] text-[#111827] font-sans text-left">
      <PortfolioHeroSection />
      <PortfolioStandardsSection showcase={showcase} />
      <PortfolioCaseStudiesSection projects={projects} />
      <PortfolioCtaSection />
    </div>
  );
}
