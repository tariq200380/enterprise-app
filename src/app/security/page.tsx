import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise Trust & Security Center",
  description:
    "At Creed Tech, security is deeply engineered into our infrastructure, software development lifecycles, and corporate governance. Explore our standards-aligned security architecture, operational posture metrics, and technical protection models engineered for enterprise compliance.",
};

export default function SecurityPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE]/70 text-[#0052FF] text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]"></span>
            <span>Enterprise Trust, Governance &amp; Compliance Center</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight mb-5">
            Enterprise Trust &amp; Security Center
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-3xl mb-8 font-normal">
            At Creed Tech, security is deeply engineered into our infrastructure, software development lifecycles, and corporate governance. Explore our standards-aligned security architecture, operational posture metrics, and technical protection models engineered for enterprise compliance.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#contact"
              className="px-6 py-3.5 bg-[#0052FF] hover:bg-[#0043D1] text-white font-bold text-xs tracking-wider rounded uppercase transition-colors shadow-sm"
            >
              Request Security Architecture Overview
            </Link>
            <Link
              href="#frameworks"
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs tracking-wider rounded uppercase border border-slate-200 transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Explore 4 Compliance Frameworks</span>
              <span className="text-sm font-normal">↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dark Metrics / Pillar Strip */}
      <section className="w-full bg-[#0B1220] py-8 sm:py-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {/* Pillar 1 */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                High Availability
              </h3>
              <p className="text-slate-400 text-xs sm:text-[13px] mt-1 font-normal">
                Resilient Cloud Architecture
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                Zero-Trust
              </h3>
              <p className="text-slate-400 text-xs sm:text-[13px] mt-1 font-normal">
                Proactive Risk Mitigation
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                Centralized SIEM
              </h3>
              <p className="text-slate-400 text-xs sm:text-[13px] mt-1 font-normal">
                Security Telemetry &amp; Alerting
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                Rapid Triage
              </h3>
              <p className="text-slate-400 text-xs sm:text-[13px] mt-1 font-normal">
                Structured Incident Playbooks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Alignment / Enterprise Compliance & Security Frameworks */}
      <section id="frameworks" className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              STANDARDS ALIGNMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              Enterprise Compliance &amp; Security<br className="hidden sm:inline" /> Frameworks
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed">
              Click on any framework below to inspect its governing authority, statutory requirements, and Creed Tech&apos;s client implementation architecture:
            </p>
          </div>

          {/* 2x2 Grid (2 on top row, 2 on bottom row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: ISO/IEC 27001:2022 */}
            <div className="bg-white border border-[#BFDBFE] rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#F1F5F9] text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                    FRAMEWORK ALIGNED
                  </span>
                  <Link
                    href="#contact"
                    className="text-[#0052FF] hover:text-[#0043D1] text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Architecture</span>
                    <span>→</span>
                  </Link>
                </div>

                <h3 className="text-[#0B1220] font-bold text-lg sm:text-xl tracking-tight mt-4">
                  ISO/IEC 27001:2022
                </h3>
                <p className="text-slate-400 text-xs mt-1 font-normal">
                  ISO &amp; IEC &bull; Geneva, Switzerland
                </p>

                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-4 font-normal">
                  Comprehensive security governance aligned with all 93 Annex A controls, secure engineering lifecycle, access controls, and risk management.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                <span className="text-slate-400 text-xs font-normal">
                  Standards Aligned
                </span>
                <Link
                  href="#contact"
                  className="text-slate-800 text-xs font-semibold hover:text-[#0052FF] transition-colors"
                >
                  Explore Full Breakdown
                </Link>
              </div>
            </div>

            {/* Box 2: EU GDPR Regulation (EU) 2016/679 */}
            <div className="bg-white border border-[#FDE047] rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#F1F5F9] text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                    PRIVACY BY DESIGN
                  </span>
                  <Link
                    href="#contact"
                    className="text-[#0052FF] hover:text-[#0043D1] text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Architecture</span>
                    <span>→</span>
                  </Link>
                </div>

                <h3 className="text-[#0B1220] font-bold text-lg sm:text-xl tracking-tight mt-4">
                  EU GDPR Regulation (EU)<br />2016/679
                </h3>
                <p className="text-slate-400 text-xs mt-1 font-normal">
                  European Data Protection Board &bull; Brussels, Belgium
                </p>

                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-4 font-normal">
                  Structured Article 28 Data Processing Agreement (DPA) templates, European data residency architecture, automated DSAR workflows, and Privacy by Design.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                <span className="text-slate-400 text-xs font-normal">
                  Privacy Aligned
                </span>
                <Link
                  href="#contact"
                  className="text-slate-800 text-xs font-semibold hover:text-[#0052FF] transition-colors"
                >
                  Explore Full Breakdown
                </Link>
              </div>
            </div>

            {/* Box 3: AICPA SOC 2 Type II */}
            <div className="bg-white border border-[#A7F3D0] rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#F1F5F9] text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                    TRUST SERVICES READY
                  </span>
                  <Link
                    href="#contact"
                    className="text-[#0052FF] hover:text-[#0043D1] text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Architecture</span>
                    <span>→</span>
                  </Link>
                </div>

                <h3 className="text-[#0B1220] font-bold text-lg sm:text-xl tracking-tight mt-4">
                  AICPA SOC 2 Type II
                </h3>
                <p className="text-slate-400 text-xs mt-1 font-normal">
                  American Institute of CPAs &bull; USA
                </p>

                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-4 font-normal">
                  Engineered to meet AICPA SOC 2 Type II Trust Services Criteria across Security, Availability, and Confidentiality controls.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                <span className="text-slate-400 text-xs font-normal">
                  Framework Aligned
                </span>
                <Link
                  href="#contact"
                  className="text-slate-800 text-xs font-semibold hover:text-[#0052FF] transition-colors"
                >
                  Explore Full Breakdown
                </Link>
              </div>
            </div>

            {/* Box 4: PCI-DSS Version 4.0 */}
            <div className="bg-white border border-[#BFDBFE] rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#F1F5F9] text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                    SCOPE REDUCED
                  </span>
                  <Link
                    href="#contact"
                    className="text-[#0052FF] hover:text-[#0043D1] text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Architecture</span>
                    <span>→</span>
                  </Link>
                </div>

                <h3 className="text-[#0B1220] font-bold text-lg sm:text-xl tracking-tight mt-4">
                  PCI-DSS Version 4.0
                </h3>
                <p className="text-slate-400 text-xs mt-1 font-normal">
                  PCI Security Standards Council &bull; Wakefield, MA, USA
                </p>

                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-4 font-normal">
                  Client-side payment tokenization and isolated architectures designed to minimize cardholder data environment (CDE) scope under PCI-DSS v4.0.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                <span className="text-slate-400 text-xs font-normal">
                  Scope Optimized
                </span>
                <Link
                  href="#contact"
                  className="text-slate-800 text-xs font-semibold hover:text-[#0052FF] transition-colors"
                >
                  Explore Full Breakdown
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
