import type { Metadata } from "next";
import IsoHero from "@/components/security-iso-27001/isohero";
import IsoPillars from "@/components/security-iso-27001/isopillars";
import IsoGovernance from "@/components/security-iso-27001/isogovernance";
import IsoAnnexA from "@/components/security-iso-27001/isoannexa";
import IsoIncidentTable from "@/components/security-iso-27001/isoincidenttable";
import IsoCta from "@/components/security-iso-27001/isocta";

export const metadata: Metadata = {
  title: "ISO/IEC 27001:2022 ISMS Architecture | Creed Tech Security",
  description:
    "The International Organization for Standardization (ISO, Geneva) defines the premier global framework for information security management. Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models.",
};

export default function SecurityIso27001Page() {
  return (
    <div className="w-full bg-[#F7F6F5] font-sans antialiased text-[#0F172A] selection:bg-[#FF6B00] selection:text-white">
      <IsoHero />
      <IsoPillars />
      <IsoGovernance />
      <IsoAnnexA />
      <IsoIncidentTable />
      <IsoCta />
    </div>
  );
}
