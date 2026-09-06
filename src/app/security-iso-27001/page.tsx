import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ISO/IEC 27001:2022 ISMS Architecture",
  description:
    "The International Organization for Standardization (ISO, Geneva) defines the premier global framework for information security management. Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models.",
};

export default function SecurityIso27001Page() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full pt-16 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Breadcrumb Header */}
          <div className="mb-4">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase">
              <Link href="/security" className="hover:underline">
                SECURITY CENTER
              </Link>{" "}
              <span className="text-slate-400 font-normal">/</span> ISO/IEC 27001:2022
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE]/70 text-[#0052FF] text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]"></span>
            <span>GLOBAL ISMS STANDARD &bull; ISO/IEC 27001:2022 ALIGNMENT</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-5">
            ISO/IEC 27001:2022 Standard &amp; ISMS<br className="hidden sm:inline" /> Architecture
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-normal">
            The International Organization for Standardization (ISO, Geneva) defines the premier global framework for information security management. Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-[#0052FF] hover:bg-[#0043D1] text-white font-bold text-xs tracking-wider rounded uppercase transition-colors shadow-sm"
            >
              REQUEST ISMS ARCHITECTURE OVERVIEW
            </Link>
            <Link
              href="/security"
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs tracking-wider rounded uppercase border border-slate-200 transition-colors shadow-sm"
            >
              ALL SECURITY STANDARDS
            </Link>
          </div>
        </div>

        {/* 4-Metric Overview Box (Wider row width, compact typography & subtle vertical dividers) */}
        <div className="max-w-5xl xl:max-w-6xl mx-auto mt-12 px-2">
          <div className="w-full bg-white border border-slate-200/90 rounded-md py-4 sm:py-4.5 px-6 sm:px-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-slate-200/80 text-left">
              {/* Metric 1 */}
              <div className="sm:pr-6">
                <span className="text-slate-400 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase block">
                  STANDARD
                </span>
                <span className="text-[#0B1220] font-bold text-xs sm:text-[13px] block mt-1">
                  ISO/IEC 27001:2022
                </span>
              </div>

              {/* Metric 2 */}
              <div className="sm:px-6">
                <span className="text-slate-400 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase block">
                  GOVERNING BODY
                </span>
                <span className="text-[#0B1220] font-bold text-xs sm:text-[13px] block mt-1">
                  ISO (Geneva, Switzerland)
                </span>
              </div>

              {/* Metric 3 */}
              <div className="sm:px-6">
                <span className="text-slate-400 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase block">
                  CONTROL FRAMEWORK
                </span>
                <span className="text-[#0B1220] font-bold text-xs sm:text-[13px] block mt-1">
                  Annex A (93 Controls)
                </span>
              </div>

              {/* Metric 4 */}
              <div className="sm:pl-6">
                <span className="text-slate-400 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase block">
                  SECURITY STATUS
                </span>
                <span className="text-[#16A34A] font-bold text-xs sm:text-[13px] block mt-1">
                  Operational ISMS Alignment
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Tier ISMS Governance Structure */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              POLICY HIERARCHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              4-Tier ISMS Governance Structure
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed">
              Creed Tech implements an institutional 4-tier documentation and enforcement hierarchy ensuring structured security controls across all internal and client-facing systems:
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Tier 1 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-xs sm:text-[11px] tracking-wider uppercase block mb-3">
                TIER 1
              </span>
              <h3 className="text-[#0B1220] font-bold text-base sm:text-[17px] tracking-tight mb-3">
                Security Policy
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Executive-approved mandates defining organizational security goals, data ownership, legal requirements, and executive accountability.
              </p>
            </div>

            {/* Card 2: Tier 2 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-xs sm:text-[11px] tracking-wider uppercase block mb-3">
                TIER 2
              </span>
              <h3 className="text-[#0B1220] font-bold text-base sm:text-[17px] tracking-tight mb-3">
                Technical Standards
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Mandatory engineering rules: AES-256 encryption, TLS 1.3 protocol standards, WebAuthn 2FA, and strict zero-trust IAM profiles.
              </p>
            </div>

            {/* Card 3: Tier 3 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-xs sm:text-[11px] tracking-wider uppercase block mb-3">
                TIER 3
              </span>
              <h3 className="text-[#0B1220] font-bold text-base sm:text-[17px] tracking-tight mb-3">
                Operating Procedures
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Step-by-step SOPs for change management, secret rotation, PR code reviews, sandbox isolation, and continuous CI/CD deployments.
              </p>
            </div>

            {/* Card 4: Tier 4 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-xs sm:text-[11px] tracking-wider uppercase block mb-3">
                TIER 4
              </span>
              <h3 className="text-[#0B1220] font-bold text-base sm:text-[17px] tracking-tight mb-3">
                Evidence &amp; Audits
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Immutable audit logs, SIEM telemetry, authorized security assessment records, and employee security training documentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
