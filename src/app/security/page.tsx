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
    </div>
  );
}
