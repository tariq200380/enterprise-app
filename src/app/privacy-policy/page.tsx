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

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("privacy_policy");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/privacy-policy",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/privacy-policy",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen text-[#0F172A]">
      <PrivacyHero />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <PrivacySidebar />

          <main className="flex-1 max-w-3xl w-full">
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
          </main>
        </div>
      </div>
    </div>
  );
}
