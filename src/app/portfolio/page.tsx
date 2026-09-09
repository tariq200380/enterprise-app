import type { Metadata } from "next";
import { query } from "@/lib/db";
import {
  DEFAULT_WEBSITE_SETTINGS,
  PortfolioProjectItem,
  PortfolioShowcaseSettings,
} from "@/components/admin/settings/types";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioShowcaseSection from "@/components/portfolio/PortfolioShowcaseSection";
import PortfolioCaseStudiesSection from "@/components/portfolio/PortfolioCaseStudiesSection";
import PortfolioCtaBanner from "@/components/portfolio/PortfolioCtaBanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Case Studies & Delivered Systems | Creed Tech",
  description:
    "Explore real-world software architecture deployments, high-concurrency systems, and digital transformations delivered by Creed Tech.",
};

async function getPortfolioData(): Promise<{
  showcase: PortfolioShowcaseSettings;
  projects: PortfolioProjectItem[];
}> {
  let showcase = DEFAULT_WEBSITE_SETTINGS.portfolioShowcase;
  let projects = DEFAULT_WEBSITE_SETTINGS.portfolioProjects;

  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;

      if (val.portfolioShowcase) {
        showcase = { ...showcase, ...val.portfolioShowcase };
      }
      if (Array.isArray(val.portfolioProjects) && val.portfolioProjects.length > 0) {
        projects = val.portfolioProjects;
      }
    }
  } catch (err) {
    console.error("Failed to load portfolio settings:", err);
  }

  return { showcase, projects };
}

export default async function PortfolioPage() {
  const { showcase, projects } = await getPortfolioData();

  return (
    <div className="w-full bg-[#FAFAFC] text-[#111827] font-sans text-left">
      <PortfolioHero />
      <PortfolioShowcaseSection showcase={showcase} />
      <PortfolioCaseStudiesSection projects={projects} />
      <PortfolioCtaBanner />
    </div>
  );
}
