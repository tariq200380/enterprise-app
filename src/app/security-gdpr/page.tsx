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
  const title = "GDPR Compliance & EU Data Protection Standards | Creed Tech";
  const description =
    "Discover Creed Tech's GDPR compliance framework, EU data residency protocols, Data Processing Agreements (DPA), and standard contractual clauses.";
  const canonicalUrl = "https://creed-tech.com/security-gdpr";
  const ogImage = "/images/og-security.webp";
  const keywords =
    "GDPR compliance, EU data protection, Data Processing Agreement DPA, GDPR software firm, Standard Contractual Clauses SCC, Creed Tech GDPR";

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title,
      description:
        "Full alignment with EU Regulation 2016/679, data subject rights infrastructure, and rigorous DPA execution by Creed Tech.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech GDPR Compliance",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "Full alignment with EU Regulation 2016/679, data subject rights infrastructure, and rigorous DPA execution by Creed Tech.",
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

const gdprJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/security-gdpr/#breadcrumb",
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
          name: "Security",
          item: "https://creed-tech.com/security",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "GDPR Compliance",
          item: "https://creed-tech.com/security-gdpr",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://creed-tech.com/security-gdpr/#webpage",
      url: "https://creed-tech.com/security-gdpr",
      name: "GDPR Compliance & EU Data Protection Standards",
      description:
        "Comprehensive breakdown of Creed Tech's EU General Data Protection Regulation (GDPR) technical controls, DPA terms, and privacy governance.",
      publisher: {
        "@id": "https://creed-tech.com/#organization",
      },
    },
  ],
};

export default function SecurityGdprPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gdprJsonLd) }}
      />
      <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
        <GdprHero />
        <GdprPillars />
        <GdprArticle6 />
        <GdprRights />
        <GdprDpaTable />
        <GdprCta />
      </div>
    </>
  );
}
