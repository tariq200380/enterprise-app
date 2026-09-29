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
  const title = "SOC 2 Type II Compliance & Trust Principles | Creed Tech";
  const description =
    "Review Creed Tech's SOC 2 Type II security posture, AICPA trust services criteria, continuous automated compliance monitoring, and audit telemetry.";
  const canonicalUrl = "https://creed-tech.com/security-soc-2";
  const ogImage = "/images/og-security.webp";
  const keywords =
    "SOC 2 compliance, SOC 2 Type II report, AICPA trust services criteria, cloud security audit, enterprise SOC 2 IT firm, Creed Tech SOC 2";

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
        "AICPA Trust Services Criteria, continuous automated audit controls, and multi-cloud telemetry engineered by Creed Tech.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech SOC 2 Type II Compliance",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "AICPA Trust Services Criteria, continuous automated audit controls, and multi-cloud telemetry engineered by Creed Tech.",
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

const soc2JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/security-soc-2/#breadcrumb",
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
          name: "SOC 2 Type II",
          item: "https://creed-tech.com/security-soc-2",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://creed-tech.com/security-soc-2/#webpage",
      url: "https://creed-tech.com/security-soc-2",
      name: "SOC 2 Type II Compliance & Trust Principles",
      description:
        "Independent SOC 2 audit telemetry, security trust criteria, and continuous monitoring controls enforced by Creed Tech.",
      publisher: {
        "@id": "https://creed-tech.com/#organization",
      },
    },
  ],
};

export default function SecuritySoc2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(soc2JsonLd) }}
      />
      <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
        <Soc2Hero />
        <Soc2Pillars />
        <Soc2Comparison />
        <Soc2Criteria />
        <Soc2EvidenceTable />
        <Soc2Cta />
      </div>
    </>
  );
}
