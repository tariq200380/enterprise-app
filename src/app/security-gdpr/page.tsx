import type { Metadata } from "next";
import GdprHero from "@/components/security-gdpr/gdprhero";
import GdprPillars from "@/components/security-gdpr/gdprpillars";
import GdprArticle6 from "@/components/security-gdpr/gdprarticle6";
import GdprRights from "@/components/security-gdpr/gdprrights";
import GdprDpaTable from "@/components/security-gdpr/gdprdpatable";
import GdprCta from "@/components/security-gdpr/gdprcta";

export const metadata: Metadata = {
  title: "EU GDPR Regulation (EU) 2016/679 Privacy Architecture",
  description:
    "Enacted by the European Parliament, the GDPR mandates sovereign privacy by design. Creed Tech provides structured Article 28 Data Processing Agreement (DPA) templates and architects dedicated European cloud infrastructure with sovereign data residency.",
};

export default function SecurityGdprPage() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      <GdprHero />
      <GdprPillars />
      <GdprArticle6 />
      <GdprRights />
      <GdprDpaTable />
      <GdprCta />
    </div>
  );
}
