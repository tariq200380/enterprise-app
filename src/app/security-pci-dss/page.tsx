import type { Metadata } from "next";
import PciHero from "@/components/security-pci-dss/pcihero";
import PciPillars from "@/components/security-pci-dss/pcipillars";
import PciTokenization from "@/components/security-pci-dss/pcitokenization";
import PciRequirements from "@/components/security-pci-dss/pcirequirements";
import PciSaqTable from "@/components/security-pci-dss/pcisaqtable";
import PciCta from "@/components/security-pci-dss/pcicta";

export const metadata: Metadata = {
  title: "PCI-DSS v4.0 Payment Architecture | Creed Tech",
  description:
    "Founded by major payment brands, the PCI SSC establishes global payment card security standards. Creed Tech architects client-side tokenization flows that isolate cardholder data and streamline PCI assessment scope.",
};

export default function SecurityPciDssPage() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      <PciHero />
      <PciPillars />
      <PciTokenization />
      <PciRequirements />
      <PciSaqTable />
      <PciCta />
    </div>
  );
}
