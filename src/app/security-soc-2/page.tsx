import type { Metadata } from "next";
import Soc2Hero from "@/components/security-soc-2/soc2hero";
import Soc2Pillars from "@/components/security-soc-2/soc2pillars";
import Soc2Comparison from "@/components/security-soc-2/soc2comparison";
import Soc2Criteria from "@/components/security-soc-2/soc2criteria";
import Soc2EvidenceTable from "@/components/security-soc-2/soc2evidencetable";
import Soc2Cta from "@/components/security-soc-2/soc2cta";

export const metadata: Metadata = {
  title: "AICPA SOC 2 Type II Security Controls | Creed Tech",
  description:
    "The American Institute of CPAs (AICPA, USA) establishes the definitive benchmark for SaaS security. Creed Tech engineers systems aligned with continuous operational controls across Security, Availability, and Confidentiality.",
};

export default function SecuritySoc2Page() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      <Soc2Hero />
      <Soc2Pillars />
      <Soc2Comparison />
      <Soc2Criteria />
      <Soc2EvidenceTable />
      <Soc2Cta />
    </div>
  );
}
