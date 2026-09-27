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
  const title =
    seo.title || "Client Case Studies & Software Portfolio | Creed Tech";
  const description =
    seo.description ||
    "Discover Creed Tech's proven enterprise delivery track record. Explore case studies in cloud architecture, custom web systems, mobile apps, and AI solutions.";
  const canonicalUrl = seo.canonical_url || "https://creed-tech.com/portfolio";
  const ogImage = seo.og_image || "/images/og-portfolio.webp";

  return {
    title: { absolute: title },
    description,
    keywords:
      seo.keywords ||
      "software portfolio, enterprise case studies, cloud modernization projects, AI case studies, custom web development portfolio, mobile app showcase, Creed Tech projects",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: "Client Case Studies & Software Portfolio | Creed Tech",
      description:
        "Explore enterprise software architecture, cloud failover systems, and AI applications successfully engineered by Creed Tech.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech Client Portfolio & Enterprise Software Case Studies",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Client Case Studies & Software Portfolio | Creed Tech",
      description:
        "Explore enterprise software architecture, cloud failover systems, and AI applications successfully engineered by Creed Tech.",
      site: "@CreedtechHq",
      creator: "@CreedtechHq",
      images: [ogImage],
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
      googleBot: {
        index: !seo.no_index,
        follow: !seo.no_follow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function PortfolioPage() {
  const [projects, showcase] = await Promise.all([
    getPortfolioProjects(),
    getPortfolioShowcase(),
  ]);

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://creed-tech.com/portfolio/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://creed-tech.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: "https://creed-tech.com/portfolio",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": "https://creed-tech.com/portfolio/#collectionpage",
        url: "https://creed-tech.com/portfolio",
        name: "Creed Tech Client Portfolio & Case Studies",
        description:
          "Explore enterprise software architecture, cloud failover systems, and AI applications successfully engineered by Creed Tech.",
        publisher: {
          "@id": "https://creed-tech.com/#organization",
        },
        hasPart: (projects && projects.length > 0 ? projects : []).map(
          (proj, idx) => ({
            "@type": "CreativeWork",
            name: proj.title,
            headline: `${proj.category} Case Study`,
            description: proj.summary,
            keywords: Array.isArray(proj.stack)
              ? proj.stack.join(", ")
              : typeof proj.stack === "string"
              ? proj.stack
              : "Enterprise Software, Cloud, Architecture, AI",
            author: {
              "@id": "https://creed-tech.com/#organization",
            },
            url: `https://creed-tech.com/portfolio#case-study-${proj.id || idx + 1}`,
          })
        ),
      },
    ],
  };

  return (
    <div className="w-full bg-[#FAFAFC] text-[#111827] font-sans text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      <PortfolioHeroSection />
      <PortfolioStandardsSection showcase={showcase} />
      <PortfolioCaseStudiesSection projects={projects} />
      <PortfolioCtaSection />
    </div>
  );
}
