import type { Metadata } from "next";
import { getPortfolioProjects, getPortfolioShowcase } from "@/lib/portfolio-data";
import PortfolioHeroSection from "@/components/portfolio/PortfolioHeroSection";
import PortfolioStandardsSection from "@/components/portfolio/PortfolioStandardsSection";
import PortfolioCaseStudiesSection from "@/components/portfolio/PortfolioCaseStudiesSection";
import PortfolioCtaSection from "@/components/portfolio/PortfolioCtaSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Case Studies & Delivered Systems | Creed Tech",
  description:
    "Explore real-world software architecture deployments, high-concurrency systems, and digital transformations delivered by Creed Tech.",
};

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
