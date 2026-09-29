import type { Metadata } from "next";
import { query } from "@/lib/db";
import { DEFAULT_WEBSITE_SETTINGS } from "@/components/admin/settings/types";
import ServicesHero from "@/components/services/serviceshero";
import ServicesProject from "@/components/services/servicesproject";
import ServicesDigital from "@/components/services/servicesdigital";
import ServicesSolution from "@/components/services/servicessolution";
import ServicesDelivery from "@/components/services/servicesdelivery";
import ServicesIndustries from "@/components/services/servicesindustries";
import ServicesVision from "@/components/services/servicesvision";

import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Services category page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("services");
  const title =
    seo.title || "Enterprise Software & Cloud Engineering Services | Creed Tech";
  const description =
    seo.description ||
    "Explore Creed Tech's end-to-end technology services: custom enterprise software, cloud infrastructure, autonomous AI agents, database architecture, and cybersecurity audits.";
  const canonicalUrl = seo.canonical_url || "https://creed-tech.com/services";
  const ogImage = seo.og_image || "/images/og-services.webp";

  return {
    title: { absolute: title },
    description,
    keywords:
      seo.keywords ||
      "enterprise software development, cloud infrastructure, AI solutions, LLM integration, database management, cybersecurity audit, web applications, mobile app development, Creed Tech services",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: "Enterprise Software & Cloud Engineering Services | Creed Tech",
      description:
        "Scalable software engineering, resilient cloud infrastructure, and enterprise AI integrations tailored for high-growth businesses.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech Enterprise Software & Cloud Engineering Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Enterprise Software & Cloud Engineering Services | Creed Tech",
      description:
        "Scalable software engineering, resilient cloud infrastructure, and enterprise AI integrations tailored for high-growth businesses.",
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

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/services/#breadcrumb",
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
          name: "Services",
          item: "https://creed-tech.com/services",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://creed-tech.com/services/#itemlist",
      name: "Creed Tech Enterprise Engineering Services",
      description:
        "Comprehensive enterprise technology services including custom software engineering, cloud architecture, AI solutions, and cybersecurity.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#software-development",
            name: "Custom Software Development",
            description:
              "Bespoke enterprise applications, scalable microservices, and robust API architectures tailored for business workflows.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "Software Engineering",
            url: "https://creed-tech.com/services#software-development",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#cloud-infrastructure",
            name: "Cloud Infrastructure & DevOps Modernization",
            description:
              "Multi-region cloud architecture, Kubernetes containerization, automated CI/CD pipelines, and 99.99% uptime infrastructure management.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "Cloud Infrastructure",
            url: "https://creed-tech.com/services#cloud-infrastructure",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#ai",
            name: "Artificial Intelligence (AI) & Autonomous Systems",
            description:
              "Enterprise LLM integration, autonomous AI agent pipelines, private retrieval-augmented generation (RAG), and machine learning workflows.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "Artificial Intelligence",
            url: "https://creed-tech.com/services#ai",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#database-management",
            name: "High-Concurrency Database Management & Architecture",
            description:
              "Distributed database tuning, query optimization, high-availability replication, and zero-downtime data migration.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "Database Architecture",
            url: "https://creed-tech.com/services#database-management",
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#web-development",
            name: "Web Application Engineering",
            description:
              "High-performance enterprise web applications built with modern frameworks, sub-second load times, and bank-grade security standards.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "Web Development",
            url: "https://creed-tech.com/services#web-development",
          },
        },
        {
          "@type": "ListItem",
          position: 6,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#ui-ux",
            name: "UI/UX Design & User Experience Workflows",
            description:
              "Enterprise design systems, interactive Figma prototypes, accessible user journeys, and customer portal interface design.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "UI/UX Design",
            url: "https://creed-tech.com/services#ui-ux",
          },
        },
        {
          "@type": "ListItem",
          position: 7,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#cybersecurity",
            name: "Cybersecurity, QA & Penetration Testing",
            description:
              "Comprehensive security audits, vulnerability scanning, SOC2/ISO compliance reviews, and automated QA regression pipelines.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "Cybersecurity & Quality Assurance",
            url: "https://creed-tech.com/services#cybersecurity",
          },
        },
        {
          "@type": "ListItem",
          position: 8,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#marketing",
            name: "Digital Marketing & Technical Growth Strategy",
            description:
              "Data-driven B2B digital growth, technical search engine optimization (SEO), conversion rate optimization, and enterprise marketing analytics.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "Digital Growth & Marketing",
            url: "https://creed-tech.com/services#marketing",
          },
        },
        {
          "@type": "ListItem",
          position: 9,
          item: {
            "@type": "Service",
            "@id": "https://creed-tech.com/services/#mobile-applications",
            name: "Mobile Application Engineering (iOS & Android)",
            description:
              "Cross-platform and native mobile apps built with Swift, Kotlin, Flutter, and React Native for seamless mobile enterprise workflows.",
            provider: {
              "@id": "https://creed-tech.com/#organization",
            },
            serviceType: "Mobile App Development",
            url: "https://creed-tech.com/services#mobile-applications",
          },
        },
      ],
    },
  ],
};

async function getServicesData() {
  let explorer = DEFAULT_WEBSITE_SETTINGS.servicesExplorer;

  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;

      if (val.servicesExplorer) {
        explorer = {
          sectionHeadline: val.servicesExplorer.sectionHeadline || explorer.sectionHeadline,
          sectionDescription: val.servicesExplorer.sectionDescription || explorer.sectionDescription,
          services:
            Array.isArray(val.servicesExplorer.services) && val.servicesExplorer.services.length > 0
              ? val.servicesExplorer.services
              : explorer.services,
        };
      }
    }
  } catch (err) {
    console.error("Failed to load services settings:", err);
  }

  return { explorer };
}

export default async function ServicesPage() {
  const { explorer } = await getServicesData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <ServicesHero />
      <ServicesDigital data={explorer} />
      <ServicesProject />
      <ServicesSolution />
      <ServicesDelivery />
      <ServicesIndustries />
      <ServicesVision />
    </>
  );
}
