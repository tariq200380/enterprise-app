import Homehero from "@/components/home/homehero";
import Homeprovide from "@/components/home/homeprovide";
import Homedeliver from "@/components/home/homedeliver";
import Homefocus from "@/components/home/homefocus";
import Homedecade from "@/components/home/homedecade";
import Homeclient from "@/components/home/homeclient";
import Homesecurity from "@/components/home/homesecurity";
import Homeknowledge from "@/components/home/homeknowledge";
import Homebulid from "@/components/home/homebulid";
import Homedicuss from "@/components/home/homedicuss";

import type { Metadata } from "next";
import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Homepage (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("home");
  const title = seo.title || "Creed Tech | Enterprise Software, Cloud Infrastructure & AI Solutions";
  const description =
    seo.description ||
    "Creed Tech provides custom software engineering, robust cloud infrastructure, cybersecurity audits, and enterprise AI integrations. Accelerate your digital transformation.";
  const canonicalUrl = seo.canonical_url || "https://creed-tech.com";
  const ogImage = seo.og_image || "/images/og-home.webp";

  return {
    title: { absolute: title },
    description,
    keywords:
      seo.keywords ||
      "software development, cloud infrastructure, cybersecurity, AI solutions, Creed Tech, enterprise IT solutions, IT consulting Pakistan",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: "Creed Tech | Enterprise Software & Cloud Infrastructure",
      description: "Enterprise-grade software engineering, cloud modernization, and autonomous AI systems.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech Enterprise Software & Cloud Infrastructure",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Creed Tech | Enterprise Software & Cloud Infrastructure",
      description: "Enterprise-grade software engineering, cloud modernization, and autonomous AI systems.",
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

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://creed-tech.com/#organization",
      name: "Creed Tech",
      url: "https://creed-tech.com",
      logo: {
        "@type": "ImageObject",
        url: "https://creed-tech.com/images/logo.webp",
        width: 130,
        height: 36,
      },
      sameAs: [
        "https://www.linkedin.com/company/creedtech",
        "https://github.com/creed-tech",
        "https://facebook.com/creedtechnology",
        "https://instagram.com/creed.technologiess",
        "https://x.com/CreedtechHq",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+923219204488",
        contactType: "customer service",
        email: "info@creed-tech.com",
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://creed-tech.com/#localbusiness",
      name: "Creed Tech",
      legalName: "Creed Tech",
      url: "https://creed-tech.com",
      logo: "https://creed-tech.com/images/logo.webp",
      image: "https://creed-tech.com/images/og-home.webp",
      telephone: "+923219204488",
      email: "info@creed-tech.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office # 02, Main Shopping Center",
        addressLocality: "Sheikhupura",
        addressRegion: "Punjab",
        postalCode: "39350",
        addressCountry: "PK",
      },
      sameAs: [
        "https://www.linkedin.com/company/creedtech",
        "https://github.com/creed-tech",
        "https://facebook.com/creedtechnology",
        "https://instagram.com/creed.technologiess",
        "https://x.com/CreedtechHq",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://creed-tech.com/#website",
      url: "https://creed-tech.com",
      name: "Creed Tech",
      publisher: {
        "@id": "https://creed-tech.com/#organization",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Homehero />
      <Homeprovide />
      <Homedeliver />
      <Homefocus />
      <Homedecade />
      <Homeclient />
      <Homesecurity />
      <Homeknowledge />
      <Homebulid />
      <Homedicuss />
    </>
  );
}

