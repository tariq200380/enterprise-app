import type { Metadata } from "next";
import { getAboutData, getPartnerReviewLinks } from "@/lib/about-data";
import AboutPageClient from "@/components/about/AboutPageClient";
import { getSeoForPage } from "@/lib/seoHelper";

// Short cache for About page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("about");
  const siteUrl = "https://creed-tech.com";
  const canonicalUrl = seo.canonical_url || `${siteUrl}/about`;
  const rawOg = seo.og_image || "/images/og-about.webp";
  const ogImage = rawOg.startsWith("http")
    ? rawOg
    : `${siteUrl}${rawOg.startsWith("/") ? "" : "/"}${rawOg}`;
  const title = seo.title || "About Creed Tech | Enterprise Software & Cloud Specialists";
  const description =
    seo.description ||
    "Learn about Creed Tech: our mission, dedicated senior engineering pods, enterprise cloud standards, zero-trust security practices, and proven track record.";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords:
      seo.keywords ||
      "about Creed Tech, enterprise software engineers, cloud architects, dedicated engineering pods, software delivery methodology, IT consulting company",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title,
      description:
        "Dedicated engineering pods building scalable, resilient software architecture and multi-region cloud infrastructure for global businesses.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "About Creed Tech - Enterprise Software & Cloud Specialists",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "Dedicated engineering pods building scalable, resilient software architecture and multi-region cloud infrastructure for global businesses.",
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

export default async function AboutPage() {
  const settings = await getAboutData();
  const partnerLinks = getPartnerReviewLinks(settings);

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://creed-tech.com/about/#breadcrumb",
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
            name: "About Us",
            item: "https://creed-tech.com/about",
          },
        ],
      },
      {
        "@type": "AboutPage",
        "@id": "https://creed-tech.com/about/#aboutpage",
        url: "https://creed-tech.com/about",
        name: "About Creed Tech",
        description: "Corporate overview and engineering methodology of Creed Tech.",
        mainEntity: {
          "@type": "Organization",
          "@id": "https://creed-tech.com/#organization",
          name: "Creed Tech",
          url: "https://creed-tech.com",
          logo: "https://creed-tech.com/images/logo.webp",
          foundingDate: "2016",
          numberOfEmployees: "50+",
          knowsAbout: [
            "Cloud Infrastructure",
            "Enterprise Software Architecture",
            "Artificial Intelligence & LLMs",
            "Cybersecurity & Penetration Testing",
            "Database Scalability",
            "DevOps & CI/CD Automation",
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutPageClient
        partnerLinks={partnerLinks}
        aboutSettings={settings.aboutSettings}
      />
    </>
  );
}
