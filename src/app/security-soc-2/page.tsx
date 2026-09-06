import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AICPA SOC 2 Type II Security Controls | Creed Tech",
  description:
    "The American Institute of CPAs (AICPA, USA) establishes the definitive benchmark for SaaS security. Creed Tech engineers systems aligned with continuous operational controls across Security, Availability, and Confidentiality.",
};

export default function SecuritySoc2Page() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section (Dark Theme 2-Column) */}
      <section className="w-full bg-[#0B1220] pt-16 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Breadcrumb Header */}
              <div className="mb-4">
                <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase">
                  <Link href="/security" className="hover:underline">
                    SECURITY CENTER
                  </Link>{" "}
                  <span className="text-slate-500 font-normal">/</span>{" "}
                  <span className="text-slate-400">SOC 2 TYPE II</span>
                </span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0052FF]/15 border border-[#0052FF]/40 text-[#60A5FA] text-[11px] font-bold tracking-wider uppercase mb-5 shadow-sm">
                <span>AICPA TRUST SERVICES CRITERIA &bull; SOC 2 TYPE II ALIGNMENT</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5">
                <span className="text-white block">SOC 2 Type II</span>
                <span className="text-[#0052FF] block">Trust Services Security Controls</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-xl mb-6 font-normal">
                The American Institute of CPAs (AICPA, USA) establishes the definitive benchmark for SaaS security. Creed Tech engineers systems aligned with continuous operational controls across Security, Availability, and Confidentiality.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-5 py-3 bg-[#0052FF] hover:bg-[#0043D1] text-white font-bold text-xs tracking-wider rounded uppercase transition-colors shadow-sm"
                >
                  REQUEST SOC 2 READINESS DOCUMENTATION
                </Link>
                <Link
                  href="/security"
                  className="px-5 py-3 bg-transparent hover:bg-white/10 text-white font-bold text-xs tracking-wider rounded uppercase border border-white/20 transition-colors shadow-sm"
                >
                  ALL SECURITY STANDARDS
                </Link>
              </div>
            </div>

            {/* Right Column: AICPA SSAE 18 / AT-C 205 Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0E1726]/90 border border-slate-700/60 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
                {/* Header of Card */}
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>AICPA SSAE 18 / AT-C 205</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    TRUST CRITERIA ALIGNED
                  </span>
                </div>

                {/* Rows Table */}
                <div className="space-y-3.5 text-xs sm:text-[13px]">
                  <div className="flex items-start justify-between gap-4 py-1">
                    <span className="text-slate-400 font-normal">Framework Standard:</span>
                    <span className="text-white font-medium text-right">SOC 2 Type II Alignment</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 py-1">
                    <span className="text-slate-400 font-normal">Control Criteria:</span>
                    <span className="text-[#60A5FA] font-medium text-right">Security, Availability, Confidentiality</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 py-1">
                    <span className="text-slate-400 font-normal">Operational Rigor:</span>
                    <span className="text-emerald-400 font-semibold text-right">Continuous Control Monitoring</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 py-1">
                    <span className="text-slate-400 font-normal">Control Model:</span>
                    <span className="text-slate-200 font-medium text-right">AICPA SSAE 18 Aligned Controls</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Why Type II Operational Rigor Matters for Enterprise SaaS */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10 text-left">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              AUDIT RIGOR
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              Why Type II Operational Rigor Matters for<br className="hidden sm:inline" /> Enterprise SaaS
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed font-normal">
              Many software vendors design for a point-in-time snapshot. Creed Tech designs for continuous Type II operational effectiveness:
            </p>
          </div>

          {/* 2 Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left Card: SOC 2 Type I (Basic) */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
              <div>
                <span className="text-slate-500 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-1.5">
                  SOC 2 TYPE I (BASIC)
                </span>
                <h3 className="text-[#0B1220] font-bold text-base sm:text-lg tracking-tight mb-3">
                  Single Point-in-Time Review
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Examines only whether security policies are designed properly on a single chosen day. Does not verify whether controls were actually followed in daily engineering practice.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <span className="text-slate-500 text-xs font-normal">
                  Theoretical Design Only
                </span>
              </div>
            </div>

            {/* Right Card: SOC 2 Type II Operational Model */}
            <div className="bg-white border-2 border-[#0052FF] rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
              <div>
                <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-1.5">
                  SOC 2 TYPE II OPERATIONAL MODEL
                </span>
                <h3 className="text-[#0B1220] font-bold text-base sm:text-lg tracking-tight mb-3">
                  12-Month Live Operational Proof
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  We engineer continuous controls across daily development: verifying every code PR, logging deployments, automating access revocations, and executing regular disaster recovery drills.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-start">
                <span className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold tracking-wide">
                  Continuous Control Effectiveness
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: AICPA Common Criteria (CC1-CC9) Implementation */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10 text-left">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              TRUST CRITERIA BREAKDOWN
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              AICPA Common Criteria (CC1-CC9)<br className="hidden sm:inline" /> Implementation
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed font-normal">
              How Creed Tech implements security safeguards across the 9 core control categories:
            </p>
          </div>

          {/* 6 Cards Grid (3 Columns, 2 Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: CC1 & CC2 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                CC1 &amp; CC2
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Control Environment &amp; Comm
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Executive governance, mandatory background checks, code of conduct enforcement, and transparent communication of security responsibilities.
              </p>
            </div>

            {/* Card 2: CC3 & CC4 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                CC3 &amp; CC4
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Risk Assessment &amp; Monitoring
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Continuous automated vulnerability telemetry, weekly threat modeling, and real-time SIEM alerts evaluated against documented risk appetite.
              </p>
            </div>

            {/* Card 3: CC5 & CC6 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                CC5 &amp; CC6
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Logical &amp; Physical Access
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Zero standing administrative privileges, mandatory WebAuthn 2FA, session recording, and automated access deprovisioning within 1 hour of role change.
              </p>
            </div>

            {/* Card 4: CC7 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                CC7
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                System Operations &amp; Incident Mgmt
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Immutable audit logging, anti-malware telemetry, file integrity monitoring (FIM), and structured incident detection and escalation for critical events.
              </p>
            </div>

            {/* Card 5: CC8 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                CC8
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Change Management
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Mandatory peer review on all PRs, automated SAST/DAST unit testing, separation of dev/staging/prod environments, and single-click rollbacks.
              </p>
            </div>

            {/* Card 6: CC9 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                CC9
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Vendor &amp; Supplier Risk
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Mandatory annual SOC 2 review of all cloud providers (AWS, GCP, Cloudflare) and strict contractual security minimums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Dark CTA Section (Undergoing Enterprise Vendor Risk Assessment?) */}
      <section className="w-full bg-[#0B1220] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center border-t border-slate-800/40">
        {/* Ambient Orange Radial Glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255, 106, 0, 0.18) 0%, rgba(255, 106, 0, 0.05) 45%, transparent 75%)"
          }}
        />

        {/* Centered Soft Orange Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[300px] sm:h-[420px] bg-[#FF6A00]/15 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Undergoing Enterprise Vendor Risk<br className="hidden sm:inline" /> Assessment?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            We can help prepare SIG Core questionnaires, CAIQ-aligned security documentation, and detailed SOC 2 control mapping frameworks tailored to client requirements, under standard mutual NDA.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block px-7 py-3.5 bg-[#FF6A00] hover:bg-[#E55F00] text-white font-bold text-xs tracking-wider uppercase rounded transition-colors shadow-md"
            >
              REQUEST SOC 2 SECURITY MAPPING
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
