import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Center | CREED TECH",
  description: "Enterprise security architecture, compliance benchmarks, and threat resilience.",
};

export default function SecurityPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-[#FF6A00] uppercase tracking-widest">
            Trust &amp; Governance
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight mt-3">
            Security &amp; Compliance Center
          </h1>
          <p className="text-lg text-[#3E3E3E] leading-relaxed mt-5 font-normal">
            ISO 27001, SOC 2, GDPR, and PCI-DSS aligned security architecture ensuring end-to-end data confidentiality and infrastructure integrity.
          </p>
        </div>
      </div>
    </div>
  );
}
