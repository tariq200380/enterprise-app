import type { Metadata } from "next";
import PrivacyHero from "@/components/privacy/privacyhero";
import PrivacySidebar from "@/components/privacy/privacysidebar";
import PrivacyOverview from "@/components/privacy/privacyoverview";
import PrivacyVoluntary from "@/components/privacy/privacyvoluntary";
import PrivacySecurity from "@/components/privacy/privacysecurity";
import PrivacyUsage from "@/components/privacy/privacyusage";
import PrivacyStorage from "@/components/privacy/privacystorage";
import PrivacyRights from "@/components/privacy/privacyrights";
import PrivacyThirdParty from "@/components/privacy/privacythirdparty";
import PrivacyMinors from "@/components/privacy/privacyminors";
import PrivacyUpdates from "@/components/privacy/privacyupdates";
import PrivacyContacts from "@/components/privacy/privacycontacts";

import { getSeoForPage } from "@/lib/seoHelper";

// 5-minute Incremental Static Regeneration (ISR) edge caching
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("privacy_policy");
  const title = "Privacy Policy & Data Protection Standards | Creed Tech";
  const description =
    "Review Creed Tech's enterprise privacy policy, GDPR compliance protocols, cryptographic data encryption standards, and client data protection practices.";
  const canonicalUrl = "https://creed-tech.com/privacy-policy";
  const ogImage = "/images/og-home.webp";
  const keywords =
    "Creed Tech privacy policy, enterprise data protection, GDPR compliance IT, client data confidentiality, secure software engineering privacy";

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
        "Review Creed Tech's enterprise privacy policy, GDPR compliance protocols, and data protection standards.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech Privacy Policy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "Review Creed Tech's enterprise privacy policy, GDPR compliance protocols, and data protection standards.",
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

const privacyPolicyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/privacy-policy/#breadcrumb",
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
          name: "Privacy Policy",
          item: "https://creed-tech.com/privacy-policy",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://creed-tech.com/privacy-policy/#webpage",
      url: "https://creed-tech.com/privacy-policy",
      name: "Privacy Policy & Data Protection Standards",
      description:
        "Official enterprise privacy policy and data governance practices enforced by Creed Tech.",
      publisher: {
        "@id": "https://creed-tech.com/#organization",
      },
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicyJsonLd) }}
      />
      <div className="w-full bg-[#FAF9F6] min-h-screen text-[#0F172A]">
        <PrivacyHero />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-16">
            <PrivacySidebar />

            <div className="flex-1 max-w-3xl w-full">
              <PrivacyOverview />
              <PrivacyVoluntary />
              <PrivacySecurity />
              <PrivacyUsage />
              <PrivacyStorage />
              <PrivacyRights />
              <PrivacyThirdParty />
              <PrivacyMinors />
              <PrivacyUpdates />
              <PrivacyContacts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
