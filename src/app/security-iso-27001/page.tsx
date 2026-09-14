import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ISO/IEC 27001:2022 ISMS Architecture | Creed Tech Security",
  description:
    "The International Organization for Standardization (ISO, Geneva) defines the premier global framework for information security management. Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models.",
};

export default function SecurityIso27001Page() {
  return (
    <div className="w-full bg-[#F7F6F5] font-sans antialiased text-[#0F172A] selection:bg-[#FF6B00] selection:text-white">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION (Security Palette #F7F6F5, Grid Overlay & Accent Rings) */}
      {/* ====================================================================== */}
      <section className="relative w-full bg-[#F7F6F5] text-[#0F172A] pt-8 pb-8 sm:pt-12 sm:pb-12 overflow-hidden border-b border-[#E6E4DF]">
        {/* Engineering Grid Pattern Backdrop */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e5e2db80_1px,transparent_1px),linear-gradient(to_bottom,#e5e2db80_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_65%,transparent_100%)]" />

        {/* 3 Concentric Rings in Top-Right Corner */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 420 420"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="420" cy="0" r="140" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.22" />
            <circle cx="420" cy="0" r="220" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.16" />
            <circle cx="420" cy="0" r="300" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.10" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Category, Breadcrumb & Narrative */}
            <div className="lg:col-span-7">
              {/* Breadcrumb Header */}
              <div className="mb-3">
                <span className="text-xs sm:text-[12px] font-mono font-bold text-[#FF6B00] tracking-widest uppercase">
                  <Link href="/security" className="hover:underline">
                    SECURITY CENTER
                  </Link>{" "}
                  <span className="text-slate-400 font-normal">/</span> ISO/IEC 27001:2022
                </span>
              </div>

              {/* Category Mini Tag Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[11px] font-mono font-bold text-[#FF6B00] tracking-wider uppercase mb-4">
                <span>&bull;</span>
                <span>GLOBAL ISMS STANDARD &bull; ANNEX A ARCHITECTURE</span>
              </div>

              {/* Main Headline (Premium Editorial Serif) */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-bold text-[#1C1917] tracking-tight leading-[1.08] mb-5">
                ISO/IEC 27001:2022<br />
                Standard &amp; <span className="text-[#FF6B00]">ISMS Architecture</span>
              </h1>

              {/* Narrative Paragraph */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                The International Organization for Standardization (ISO, Geneva) defines the premier global framework for information security management. Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models.
              </p>
            </div>

            {/* Right Column: 4-Row Key Metric Box Matching Security Page Style */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E6E4DF]">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    SPECIFICATION SNAPSHOT
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    ISO/IEC 27001
                  </span>
                </div>
                <div className="divide-y divide-[#E6E4DF]">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between py-3.5 first:pt-2">
                    <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                      Governing Body
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#FF6B00] tracking-tight text-right">
                      ISO (Geneva, Switzerland)
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between py-3.5">
                    <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                      Control Framework
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right">
                      93 Controls
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-between py-3.5">
                    <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                      Security Domains
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right">
                      4 Domains
                    </span>
                  </div>

                  {/* Row 4 */}
                  <div className="flex items-center justify-between py-3.5 last:pb-0">
                    <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                      Operational Status
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#FF6B00] tracking-tight text-right">
                      ISMS Aligned
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. PILLAR STRIP (#F4F3F1 with clean dividers)                          */}
      {/* ====================================================================== */}
      <section className="w-full bg-[#F4F3F1] text-[#0F172A] border-b border-[#E6E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E4DF] py-4 sm:py-5">
            {/* Pillar 1 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Policy Hierarchy
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Structured 4-tier governance
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Annex A Coverage
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                93 technical &amp; operational controls
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Secure Engineering
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                SSDLC &amp; automated SAST/DAST
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Incident Response
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                SEV-1 through SEV-4 playbooks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. 4-TIER ISMS GOVERNANCE STRUCTURE                                    */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header Split */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
                POLICY HIERARCHY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight">
                4-Tier ISMS Governance Structure
              </h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
              Creed Tech implements an institutional 4-tier documentation and enforcement hierarchy ensuring structured security controls across all internal and client-facing systems.
            </p>
          </div>

          {/* 4 Cards Grid with Top Border Accent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Tier 1 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    TIER 1
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    EXECUTIVE
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Security Policy
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Executive-approved mandates defining organizational security goals, data ownership, legal requirements, and executive accountability.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Mandatory Governance
              </div>
            </div>

            {/* Card 2: Tier 2 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    TIER 2
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    TECHNICAL
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Technical Standards
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Mandatory engineering rules: AES-256 encryption, TLS 1.3 protocol standards, WebAuthn 2FA, and strict zero-trust IAM profiles.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Baseline Specifications
              </div>
            </div>

            {/* Card 3: Tier 3 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    TIER 3
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    OPERATIONAL
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Operating Procedures
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Step-by-step SOPs for change management, secret rotation, PR code reviews, sandbox isolation, and continuous CI/CD deployments.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Execution Workflows
              </div>
            </div>

            {/* Card 4: Tier 4 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    TIER 4
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    VERIFICATION
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Evidence &amp; Audits
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Immutable audit logs, SIEM telemetry, authorized security assessment records, and employee security training documentation.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Continuous Verification
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. ANNEX A IMPLEMENTATION (93 Controls Across 4 Domains)               */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-white border-t border-b border-[#E6E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-8">
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              ANNEX A IMPLEMENTATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
              93 Technical &amp; Operational Controls Across 4 Domains
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
              In accordance with the updated ISO/IEC 27001:2022 standard, our security operations are structured into four consolidated control themes:
            </p>
          </div>

          {/* 4 Domain Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {/* Domain 1: Organizational Controls */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ANNEX A.5 &bull; 37 CONTROLS
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  ORGANIZATIONAL
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1917] tracking-tight mb-2">
                1. Organizational Controls
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-5">
                Covers formal information security policies, asset management inventories, access governance, threat intelligence integration, third-party cloud supplier vetting, and business continuity readiness.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E4DF]">
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.5.7 Threat Intel
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.5.19 Supplier Risk
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.5.24 Incident Response
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.5.30 ICT Readiness
                </span>
              </div>
            </div>

            {/* Domain 2: People Controls */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ANNEX A.6 &bull; 8 CONTROLS
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  PEOPLE
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1917] tracking-tight mb-2">
                2. People Controls
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-5">
                Multi-tier background screening prior to onboarding, mandatory signed Non-Disclosure Agreements (NDAs), quarterly simulated phishing exercises, and disciplinary protocols for security policy non-compliance.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E4DF]">
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.6.1 Background Verification
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.6.3 Security Awareness
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.6.5 Post-Employment
                </span>
              </div>
            </div>

            {/* Domain 3: Physical Controls */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ANNEX A.7 &bull; 14 CONTROLS
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  PHYSICAL
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1917] tracking-tight mb-2">
                3. Physical Controls
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-5">
                Physical access perimeters, biometric authorization, clean desk and clean screen policies, continuous video surveillance retention, and secure equipment disposal standards.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E4DF]">
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.7.2 Physical Entry
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.7.7 Clear Desk/Screen
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.7.14 Secure Disposal
                </span>
              </div>
            </div>

            {/* Domain 4: Technological Controls */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ANNEX A.8 &bull; 34 CONTROLS
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  TECHNOLOGICAL
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1917] tracking-tight mb-2">
                4. Technological Controls
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-5">
                Endpoint encryption, network segregation, automated source code SAST/DAST testing, secure development lifecycle (SSDLC), continuous logging, and automated vulnerability management.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E4DF]">
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.8.8 Vuln Management
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.8.25 Secure SDLC
                </span>
                <span className="bg-white text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                  A.8.28 Secure Coding
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. INCIDENT RESPONSE PLAYBOOK TABLE                                    */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-8">
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              INCIDENT RESPONSE PLAYBOOK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
              Incident Severity Classification &amp; Response Framework
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
              In accordance with ISO 27001 Annex A.5.24-28, all security telemetry is routed through a structured incident triage and escalation process:
            </p>
          </div>

          {/* Table Container */}
          <div className="border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-[#E6E4DF] bg-[#FAF9F6]">
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Severity Level
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Definition / Scenario
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Response Priority
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Client Notification
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E4DF]">
                  {/* SEV-1 */}
                  <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] text-slate-700 font-mono text-xs font-semibold shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                        SEV-1 (Critical)
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Active data breach, ransomware, or full service outage
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#0F172A] text-xs sm:text-[13px]">
                      Immediate Escalation
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                      Expedited &mdash; Direct Security Team Lead
                    </td>
                  </tr>

                  {/* SEV-2 */}
                  <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] text-slate-700 font-mono text-xs font-semibold shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                        SEV-2 (High)
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Potential unauthorized access or isolated core component failure
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#0F172A] text-xs sm:text-[13px]">
                      High Priority Response
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                      Same-Day Notification
                    </td>
                  </tr>

                  {/* SEV-3 */}
                  <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] text-slate-700 font-mono text-xs font-semibold shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                        SEV-3 (Medium)
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Non-critical vulnerability identified in non-production sandbox
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#0F172A] text-xs sm:text-[13px]">
                      Scheduled Assessment
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                      24 Hours / Weekly Report
                    </td>
                  </tr>

                  {/* SEV-4 */}
                  <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] text-slate-700 font-mono text-xs font-semibold shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                        SEV-4 (Low)
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Informational security advisory or minor dependency patch
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#0F172A] text-xs sm:text-[13px]">
                      Planned Remediation
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                      Monthly Sprint Release
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. ISO 27001 DOCUMENTATION CTA (Deep Navy & Ambient Orange Glow)       */}
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
            ENTERPRISE ASSURANCE &bull; AUDIT READINESS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Need Our ISO 27001 Security Alignment Documentation?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            We can help prepare SIG questionnaires, CAIQ-aligned security documentation, and Statement of Applicability (SoA) frameworks tailored to client requirements, under standard mutual NDA.
          </p>
          <div>
            <Link
              href="/security"
              className="w-full sm:w-[180px] h-14 px-6 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold rounded inline-flex items-center justify-center transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
