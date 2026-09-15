import type { Metadata } from "next";
import SecurityHero from "@/components/security/securityhero";
import SecurityPillar from "@/components/security/securitypillar";
import SecurityCompliance from "@/components/security/securitycompliance";
import SecurityArchitecture from "@/components/security/securityarchitecture";
import SecurityProcessors from "@/components/security/securityprocessors";
import SecurityFooter from "@/components/security/securityfooter";

export const metadata: Metadata = {
  title: "Trust, Engineered Into Every Layer | Enterprise Security Center",
  description:
    "Security at Creed Tech isn't a layer we add — it's built into our infrastructure, our development lifecycle, and how we govern the company. Explore the architecture, controls, and audited standards behind every engagement.",
};

export default function SecurityPage() {
  return (
    <main className="w-full bg-[#F7F6F5] font-sans antialiased text-[#0F172A] selection:bg-[#FF6B00] selection:text-white">
      <SecurityHero />
      <SecurityPillar />
      <SecurityCompliance />
      <SecurityArchitecture />
      <SecurityProcessors />
      <SecurityFooter />
    </main>
  );
}
