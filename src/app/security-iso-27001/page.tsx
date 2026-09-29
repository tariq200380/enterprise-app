import type { Metadata } from "next";
import IsoHero from "@/components/security-iso-27001/isohero";
import IsoPillars from "@/components/security-iso-27001/isopillars";
import IsoGovernance from "@/components/security-iso-27001/isogovernance";
import IsoAnnexA from "@/components/security-iso-27001/isoannexa";
import IsoIncidentTable from "@/components/security-iso-27001/isoincidenttable";
import IsoCta from "@/components/security-iso-27001/isocta";

import { getSeoForPage } from "@/lib/seoHelper";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("security_iso_27001");
  const title = "ISO/IEC 27001 Compliance & ISMS Architecture | Creed Tech";
  const description =
    "Explore Creed Tech's ISO/IEC 27001 alignment, information security management system (ISMS), risk mitigation protocols, and cloud governance frameworks.";
  const canonicalUrl = "https://creed-tech.com/security-iso-27001";
  const ogImage = "/images/og-security.webp";
  const keywords =
    "ISO 27001 compliance, ISMS certification, information security management, enterprise cloud governance, ISO 27001 IT company, Creed Tech security compliance";

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
        "Information security management systems (ISMS), rigorous risk assessments, and ISO/IEC 27001 security controls engineered by Creed Tech.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech ISO 27001 Compliance",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "Information security management systems (ISMS), rigorous risk assessments, and ISO/IEC 27001 security controls engineered by Creed Tech.",
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

const iso27001JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/security-iso-27001/#breadcrumb",
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
          name: "ISO 27001 Compliance",
          item: "https://creed-tech.com/security-iso-27001",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://creed-tech.com/security-iso-27001/#webpage",
      url: "https://creed-tech.com/security-iso-27001",
      name: "ISO/IEC 27001 Compliance & ISMS Architecture",
      description:
        "Information security management policies, risk treatment frameworks, and Annex A security controls implemented by Creed Tech.",
      publisher: {
        "@id": "https://creed-tech.com/#organization",
      },
    },
  ],
};

export default function SecurityIso27001Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(iso27001JsonLd) }}
      />
      <div className="w-full bg-[#F7F6F5] font-sans antialiased text-[#0F172A] selection:bg-[#FF6B00] selection:text-white">
        <IsoHero />
        <IsoPillars />
        <IsoGovernance />
        <IsoAnnexA />
        <IsoIncidentTable />
        <IsoCta />
      </div>
    </>
  );
}
