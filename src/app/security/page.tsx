import type { Metadata } from "next";
import SecurityHero from "@/components/security/securityhero";
import SecurityPillar from "@/components/security/securitypillar";
import SecurityCompliance from "@/components/security/securitycompliance";
import SecurityArchitecture from "@/components/security/securityarchitecture";
import SecurityProcessors from "@/components/security/securityprocessors";
import SecurityFooter from "@/components/security/securityfooter";

import { getSeoForPage } from "@/lib/seoHelper";

// 5-minute Incremental Static Regeneration (ISR) edge caching
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("security");
  const title = seo.title || "Enterprise Security Architecture & Compliance Standards | Creed Tech";
  const description =
    seo.description ||
    "Review Creed Tech's zero-trust security architecture, SOC 2 compliance, cryptographic encryption, infrastructure hardening, and ISO 27001 certified protocols.";
  const canonicalUrl = seo.canonical_url || "https://creed-tech.com/security";
  const ogImage = seo.og_image || "/images/og-security.webp";

  return {
    title: { absolute: title },
    description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech Enterprise Security Architecture & Compliance",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

const securityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/security/#breadcrumb",
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
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://creed-tech.com/security/#webpage",
      url: "https://creed-tech.com/security",
      name: "Enterprise Security Architecture & Compliance Standards",
      description:
        "Comprehensive breakdown of Creed Tech's zero-trust security infrastructure, data encryption protocols, and international compliance frameworks.",
      publisher: {
        "@type": "Organization",
        "@id": "https://creed-tech.com/#organization",
        name: "Creed Tech",
      },
    },
  ],
};

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securityJsonLd) }}
      />
      <div className="w-full bg-[#F7F6F5] font-sans antialiased text-[#0F172A] selection:bg-[#FF6B00] selection:text-white">
        <SecurityHero />
        <SecurityPillar />
        <SecurityCompliance />
        <SecurityArchitecture />
        <SecurityProcessors />
        <SecurityFooter />
      </div>
    </>
  );
}
