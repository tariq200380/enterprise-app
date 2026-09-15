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

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Transparent principles governing how Creed Tech respects, processes, and secures information submitted through our website and engineering communication channels.",
};

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
