import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AICPA SOC 2 Type II Security Controls | Creed Tech",
  description:
    "The American Institute of CPAs (AICPA, USA) establishes the definitive benchmark for SaaS security. Creed Tech engineers systems aligned with continuous operational controls across Security, Availability, and Confidentiality.",
};

export default function SecuritySoc2Page() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION: DARK THEME WITH SOFT CENTER ORANGE GLOW               */}
      {/* ====================================================================== */}
      <section className="relative w-full bg-[#0B1220] text-white pt-8 pb-8 sm:pt-12 sm:pb-12 overflow-hidden border-b border-slate-800/60">
        {/* Subtle Engineering Dot Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(#475569 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient Orange Radial Glow in Center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255, 107, 0, 0.20) 0%, rgba(255, 107, 0, 0.05) 45%, transparent 75%)",
          }}
        />

        {/* Centered Soft Orange Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[300px] sm:h-[420px] bg-[#FF6B00]/15 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Framework Identity */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Breadcrumb Navigation */}
              <div className="mb-3">
                <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase">
                  <Link href="/security" className="hover:underline">
                    SECURITY CENTER
                  </Link>{" "}
                  <span className="text-slate-500 font-normal">/</span> SOC 2 TYPE II
                </span>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-[11px] font-mono font-bold tracking-wider uppercase mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
                <span>AICPA TRUST CRITERIA &bull; SOC 2 TYPE II ALIGNED</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-4">
                SOC 2 Type II <br className="hidden sm:inline" />
                Trust Services Criteria &amp; <br className="hidden sm:inline" />
                Continuous Operational Rigor
              </h1>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mb-6 font-normal">
                The American Institute of CPAs (AICPA, USA) establishes the definitive benchmark for SaaS security. Creed Tech engineers systems aligned with continuous operational controls across Security, Availability, and Confidentiality.
              </p>

              {/* Highlights List */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  Continuous Control Monitoring
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  AICPA SSAE 18 Aligned
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  12-Month Audit Period
                </span>
              </div>
            </div>

            {/* Right Column: Specification Snapshot Card */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-[#0E1726]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 sm:p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-wider uppercase">
                    AICPA SSAE 18 / AT-C 205
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded border border-[#FF6B00]/25">
                    TYPE II AUDIT
                  </span>
                </div>

                {/* Metric 1 */}
                <div className="py-3 border-b border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Framework Standard
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      AICPA Trust Services Criteria
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    SOC 2 Type II
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="py-3 border-b border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Control Criteria
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Security, Availability, Confidentiality
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    CC1 &ndash; CC9
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="py-3 border-b border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Observation Window
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Continuous live verification
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    12 Months
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Audit Rigor Model
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Operational effectiveness proof
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    Continuous SIEM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. ARCHITECTURAL PILLARS STRIP                                         */}
      {/* ====================================================================== */}
      <section className="w-full bg-[#F4F3F1] text-[#0F172A] border-b border-[#E6E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E6E4DF] py-3 sm:py-4">
            {/* Pillar 1 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Common Criteria
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                CC1 through CC9 safeguards
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                12-Month Proof
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Continuous operational rigor
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Zero Standing Access
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Automated least-privilege IAM
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Immutable SIEM
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                24/7 telemetry &amp; forensic logs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. WHY TYPE II OPERATIONAL RIGOR MATTERS (TYPE I VS TYPE II)          */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header Split */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
                AUDIT RIGOR COMPARISON
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight">
                Why Type II Operational Rigor Matters for SaaS
              </h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
              Many software vendors design for a point-in-time snapshot. Creed Tech architects continuous operational proof across everyday engineering and infrastructure lifecycles.
            </p>
          </div>

          {/* 2 Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Card 1: SOC 2 Type I */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-slate-400 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    TYPE I REPORT
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    POINT-IN-TIME
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C1917] tracking-tight mb-2">
                  Single Point-in-Time Snapshot
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-4">
                  Examines only whether security policies are designed properly on a single calendar day. Does not verify whether controls were actually enforced in daily operational practices or engineering code commits.
                </p>
                <div className="space-y-2 pt-2 border-t border-[#F0EFEB] text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">&times;</span>
                    <span>No historical observation window</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">&times;</span>
                    <span>Theoretical policy design only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">&times;</span>
                    <span>Zero proof of operational adherence</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-6 border-t border-[#F0EFEB] text-xs font-semibold text-slate-400">
                Baseline Policy Verification Only
              </div>
            </div>

            {/* Card 2: SOC 2 Type II */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    TYPE II ALIGNMENT
                  </span>
                  <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">
                    12-MONTH PROOF
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C1917] tracking-tight mb-2">
                  12-Month Live Operational Proof
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-4">
                  We engineer continuous controls across daily development: verifying every code PR with automated SAST/DAST, logging immutable deployments, automating access revocations, and executing regular disaster recovery drills.
                </p>
                <div className="space-y-2 pt-2 border-t border-[#F0EFEB] text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6B00] font-bold">&check;</span>
                    <span>12-month continuous observation period</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6B00] font-bold">&check;</span>
                    <span>Live automated audit evidence collection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6B00] font-bold">&check;</span>
                    <span>Proves daily engineering &amp; operational compliance</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-6 border-t border-[#F0EFEB] text-xs font-semibold text-[#FF6B00]">
                Continuous Operational Effectiveness
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. AICPA COMMON CRITERIA (CC1 - CC9) IMPLEMENTATION                    */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-white border-t border-b border-[#E6E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-8">
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              TRUST CRITERIA BREAKDOWN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
              AICPA Common Criteria (CC1&ndash;CC9) Implementation
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
              How Creed Tech implements technical safeguards across the nine core AICPA trust services criteria categories:
            </p>
          </div>

          {/* 6 Cards Grid (3 columns desktop, 2 columns tablet) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: CC1 & CC2 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    CC1 &bull; CC2
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    GOVERNANCE
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Control Environment &amp; Communication
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Executive oversight, mandatory signed employee code of conduct, background checks prior to hire, and transparent communication of security policies.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Annual Policy Reviews &bull; Signed NDAs
              </div>
            </div>

            {/* Card 2: CC3 & CC4 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    CC3 &bull; CC4
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    RISK
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Risk Assessment &amp; Monitoring
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Continuous automated vulnerability telemetry, architectural threat modeling, and 24/7 SIEM anomaly alerts evaluated against documented risk appetite.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Continuous Telemetry &bull; Threat Matrix
              </div>
            </div>

            {/* Card 3: CC5 & CC6 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    CC5 &bull; CC6
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ACCESS
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Logical &amp; Physical Access Controls
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Zero standing administrative privileges, mandatory WebAuthn 2FA, session recording, and automated access deprovisioning within 1 hour of role change.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Zero Standing Privileges &bull; WebAuthn
              </div>
            </div>

            {/* Card 4: CC7 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    CC7
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    OPERATIONS
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  System Operations &amp; Incident Management
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Immutable audit logging, anti-malware telemetry, file integrity monitoring (FIM), and structured incident detection and escalation playbooks for SEV1-4 events.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Immutable S3 Logs &bull; SEV Escalation
              </div>
            </div>

            {/* Card 5: CC8 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    CC8
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    CHANGE
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Change Management &amp; SDLC
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Mandatory peer review on all code PRs, automated SAST/DAST unit testing, strict environment segregation (dev, staging, prod), and single-click rollbacks.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                100% PR Review &bull; Automated CI/CD
              </div>
            </div>

            {/* Card 6: CC9 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    CC9
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SUPPLIER
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Vendor &amp; Supplier Risk Management
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Mandatory annual SOC 2 review of all cloud providers (AWS, GCP, Cloudflare), signed DPAs, and strict contractual security minimums.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Annual Vendor Review &bull; DPA Schedules
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. CONTINUOUS CONTROL EVIDENCE & AUDIT TELEMETRY TABLE                  */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-8">
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              AUDIT TELEMETRY &bull; CONTINUOUS EVIDENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
              Continuous Control Evidence Architecture
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
              In accordance with AICPA SSAE 18 standards, automated telemetry collection ensures uninterrupted audit readiness:
            </p>
          </div>

          {/* Table Container */}
          <div className="border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[840px]">
                <thead>
                  <tr className="border-b border-[#E6E4DF] bg-[#FAF9F6]">
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Trust Services Category
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                      Criteria Code
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Automated Evidence Ingestion Source
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Audit Sampling Frequency
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E4DF]">
                  {/* Row 1 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Identity &amp; Access Governance
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Logical access &amp; MFA enforcement
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                        CC6.1 &ndash; CC6.3
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Okta / Google SSO event logs, WebAuthn 2FA audit trails, and AWS IAM least-privilege telemetry.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Real-Time &bull; Quarterly Access Reviews
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Change Management Verification
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Code deployment safeguards
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                        CC8.1
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      GitHub branch protection rules, signed commits, automated CI/CD SAST logs, and peer approvals.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Continuous (Per Production PR)
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Infrastructure Threat Detection
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Network perimeter &amp; SIEM telemetry
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                        CC6.6 &ndash; CC6.7
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      AWS CloudTrail, GuardDuty threat detection, and Cloudflare enterprise WAF / DDoS logs.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        24/7 Automated Ingestion
                      </span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Disaster Recovery &amp; Availability
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Backup verification &amp; failover drills
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                        A1.2 &ndash; A1.3
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Automated encrypted RDS snapshots, cross-region replication, and annual disaster recovery drill logs.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Daily Automated &bull; Annual Drill
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. SOC 2 DOCUMENTATION CTA (Deep Navy & Ambient Orange Glow)            */}
      {/* ====================================================================== */}
      <section className="w-full bg-[#0B1220] py-12 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center border-t border-slate-800/40">
        {/* Ambient Orange Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255, 107, 0, 0.20) 0%, rgba(255, 107, 0, 0.05) 45%, transparent 75%)",
          }}
        />

        {/* Centered Soft Orange Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[300px] sm:h-[420px] bg-[#FF6B00]/15 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.2em] uppercase block mb-3">
            ENTERPRISE ASSURANCE &bull; VENDOR RISK READINESS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Undergoing Enterprise Vendor Risk Assessment?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            We can help prepare SIG Core questionnaires, CAIQ-aligned security documentation, and detailed SOC 2 control mapping frameworks tailored to client requirements, under standard mutual NDA.
          </p>
          <div>
            <Link
              href="/contact"
              className="w-full sm:w-auto min-w-[200px] h-14 px-8 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold rounded inline-flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
            >
              Request SOC 2 Mapping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
