import type { Metadata } from "next";
import { getContactSettings } from "@/lib/contact-data";
import ContactPageClient from "@/components/contact/ContactPageClient";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactOnboardingSection from "@/components/contact/ContactOnboardingSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";

import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Contact page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("contact");
  const title =
    seo.title ||
    "Contact Creed Tech | Enterprise Software & Cloud Engineering Consultation";
  const description =
    seo.description ||
    "Get in touch with Creed Tech's senior engineering team. Schedule an architectural consultation for custom software, cloud infrastructure, AI, or cybersecurity.";
  const canonicalUrl = seo.canonical_url || "https://creed-tech.com/contact";
  const ogImage = seo.og_image || "/images/og-contact.webp";

  return {
    title: { absolute: title },
    description,
    keywords:
      seo.keywords ||
      "contact Creed Tech, hire enterprise engineers, software consultation, cloud architecture inquiry, IT consulting Pakistan, hire dedicated software pods",
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
          alt: "Contact Creed Tech - Enterprise Software & Cloud Engineering Consultation",
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

export default async function ContactPage() {
  const settings = await getContactSettings();

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://creed-tech.com/contact/#breadcrumb",
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
            name: "Contact Us",
            item: "https://creed-tech.com/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        "@id": "https://creed-tech.com/contact/#contactpage",
        url: "https://creed-tech.com/contact",
        name: "Contact Creed Tech | Enterprise Software & Cloud Engineering Consultation",
        description:
          "Get in touch with Creed Tech's senior engineering team. Schedule an architectural consultation for custom software, cloud infrastructure, AI, or cybersecurity.",
        mainEntity: {
          "@type": "LocalBusiness",
          "@id": "https://creed-tech.com/#organization",
          name: "Creed Tech",
          telephone: "+923219204488",
          email: "info@creed-tech.com",
          url: "https://creed-tech.com",
          image: "https://creed-tech.com/images/og-contact.webp",
          priceRange: "$$$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Office # 02, Main Shopping Center",
            addressLocality: "Sheikhupura",
            addressRegion: "Punjab",
            postalCode: "39350",
            addressCountry: "PK",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="w-full bg-[#F7F6F5] text-[#0F172A] font-sans antialiased text-left">
        {/* 1. Hero Section (Pure RSC) */}
        <ContactHeroSection settings={settings} />

        {/* 2. Interactive Scoping & Direct Channels Hub (Client Island) */}
        <ContactPageClient settings={settings}>
          {/* 3. Transparent 4-Step Onboarding Protocol (Pure RSC) */}
          <ContactOnboardingSection settings={settings} />

          {/* 4. Enterprise Technical FAQ (Pure RSC) */}
          <ContactFaqSection />
        </ContactPageClient>
      </div>
    </>
  );
}
