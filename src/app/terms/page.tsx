import type { Metadata } from "next";
import TermsHero from "@/components/terms/termshero";
import TermsSidebar from "@/components/terms/termssidebar";
import TermsAcceptance from "@/components/terms/termsacceptance";
import TermsAgreements from "@/components/terms/termsagreements";
import TermsInformational from "@/components/terms/termsinformational";
import TermsForms from "@/components/terms/termsforms";
import TermsIntellectual from "@/components/terms/termsintellectual";
import TermsThirdParty from "@/components/terms/termsthirdparty";
import TermsProhibited from "@/components/terms/termsprohibited";
import TermsWarranties from "@/components/terms/termswarranties";
import TermsLiability from "@/components/terms/termsliability";
import TermsModifications from "@/components/terms/termsmodifications";
import TermsLegal from "@/components/terms/termslegal";

import { getSeoForPage } from "@/lib/seoHelper";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("terms");
  const title = "Terms of Service & Enterprise Master Agreement | Creed Tech";
  const description =
    "Review Creed Tech's enterprise master service agreement, intellectual property terms, SLA frameworks, and client engagement conditions.";
  const canonicalUrl = "https://creed-tech.com/terms";
  const ogImage = "/images/og-home.webp";
  const keywords =
    "Creed Tech terms of service, enterprise software agreement, IT service level agreement, intellectual property terms, engineering master agreement";

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
        "Review Creed Tech's terms of service, intellectual property standards, and enterprise client engagement frameworks.",
      url: canonicalUrl,
      siteName: "Creed Tech",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Creed Tech Terms of Service",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "Review Creed Tech's terms of service, intellectual property standards, and enterprise client engagement frameworks.",
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

const termsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/terms/#breadcrumb",
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
          name: "Terms of Service",
          item: "https://creed-tech.com/terms",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://creed-tech.com/terms/#webpage",
      url: "https://creed-tech.com/terms",
      name: "Terms of Service & Enterprise Master Agreement",
      description:
        "Master service agreement, SLA guidelines, and legal terms governing Creed Tech engineering engagements.",
      publisher: {
        "@id": "https://creed-tech.com/#organization",
      },
    },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <div className="w-full bg-[#F7F6F5] min-h-screen text-[#0F172A] font-sans antialiased selection:bg-[#FF6B00] selection:text-white">
        <TermsHero />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-12">
            <TermsSidebar />

            <div className="flex-1 max-w-3xl w-full space-y-6 sm:space-y-8">
              <TermsAcceptance />
              <TermsAgreements />
              <TermsInformational />
              <TermsForms />
              <TermsIntellectual />
              <TermsThirdParty />
              <TermsProhibited />
              <TermsWarranties />
              <TermsLiability />
              <TermsModifications />
              <TermsLegal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
