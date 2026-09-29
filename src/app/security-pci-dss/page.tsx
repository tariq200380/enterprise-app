import type { Metadata } from "next";
import PciHero from "@/components/security-pci-dss/pcihero";
import PciPillars from "@/components/security-pci-dss/pcipillars";
import PciTokenization from "@/components/security-pci-dss/pcitokenization";
import PciRequirements from "@/components/security-pci-dss/pcirequirements";
import PciSaqTable from "@/components/security-pci-dss/pcisaqtable";
import PciCta from "@/components/security-pci-dss/pcicta";

import { getSeoForPage } from "@/lib/seoHelper";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("security_pci_dss");
  const title = "PCI-DSS Compliance & Payment Data Security | Creed Tech";
  const description =
    "Learn how Creed Tech engineers PCI-DSS compliant software architecture, tokenized payment processing, secure cardholder enclaves, and cryptographic controls.";
  const canonicalUrl = "https://creed-tech.com/security-pci-dss";
  const ogImage = "/images/og-security.webp";
  const keywords =
    "PCI-DSS compliance, payment card industry security, tokenized payments, cardholder data environment CDE, secure payment gateway engineering, Creed Tech PCI-DSS";

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
        "Tokenized payment architecture, cardholder data isolation, and PCI-DSS v4.0 technical controls engineered by Creed Tech.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech PCI-DSS Compliance",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "Tokenized payment architecture, cardholder data isolation, and PCI-DSS v4.0 technical controls engineered by Creed Tech.",
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

const pciDssJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/security-pci-dss/#breadcrumb",
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
          name: "PCI-DSS Compliance",
          item: "https://creed-tech.com/security-pci-dss",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://creed-tech.com/security-pci-dss/#webpage",
      url: "https://creed-tech.com/security-pci-dss",
      name: "PCI-DSS Compliance & Payment Data Security",
      description:
        "Technical controls, tokenization standards, and secure Cardholder Data Environment (CDE) architecture implemented by Creed Tech.",
      publisher: {
        "@id": "https://creed-tech.com/#organization",
      },
    },
  ],
};

export default function SecurityPciDssPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pciDssJsonLd) }}
      />
      <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
        <PciHero />
        <PciPillars />
        <PciTokenization />
        <PciRequirements />
        <PciSaqTable />
        <PciCta />
      </div>
    </>
  );
}
