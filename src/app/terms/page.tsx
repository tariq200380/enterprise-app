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

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Please read these Terms and Conditions carefully before using Creed Tech's website and online communication channels.",
};

export default function TermsPage() {
  return (
    <div className="w-full bg-[#F7F6F5] min-h-screen text-[#0F172A] font-sans antialiased selection:bg-[#FF6B00] selection:text-white">
      <TermsHero />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">
          <TermsSidebar />

          <main className="flex-1 max-w-3xl w-full space-y-6 sm:space-y-8">
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
          </main>
        </div>
      </div>
    </div>
  );
}
