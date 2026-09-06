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

      {/* Annex A Implementation / 93 Controls */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              ANNEX A IMPLEMENTATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              93 Technical &amp; Operational Controls Across 4<br className="hidden sm:inline" /> Domains
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed">
              In accordance with the updated ISO/IEC 27001:2022 standard, our security operations are structured into four consolidated control themes:
            </p>
          </div>

          {/* 4 Domain Cards (Stacked list) */}
          <div className="space-y-4 sm:space-y-5">
            {/* Domain 1: Organizational Controls */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-[#0B1220] font-bold text-base sm:text-lg tracking-tight">
                  1. Organizational Controls (37 Controls — Annex A.5)
                </h3>
                <span className="text-[#0052FF] font-semibold text-xs sm:text-[13px]">
                  Policies, Threat Intelligence &amp; Supplier Relations
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-2.5 mb-4 font-normal">
                Covers formal information security policies, asset management inventories, access governance, threat intelligence integration, third-party cloud supplier vetting, and business continuity readiness.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.5.7 Threat Intel
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.5.19 Supplier Risk
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.5.24 Incident Response
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.5.30 ICT Readiness
                </span>
              </div>
            </div>

            {/* Domain 2: People Controls */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-[#0B1220] font-bold text-base sm:text-lg tracking-tight">
                  2. People Controls (8 Controls — Annex A.6)
                </h3>
                <span className="text-[#0052FF] font-semibold text-xs sm:text-[13px]">
                  Personnel Screening &amp; Security Awareness
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-2.5 mb-4 font-normal">
                Multi-tier background screening prior to onboarding, mandatory signed Non-Disclosure Agreements (NDAs), quarterly simulated phishing exercises, and disciplinary protocols for security policy non-compliance.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.6.1 Background Verification
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.6.3 Security Awareness
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.6.5 Post-Employment Responsibilities
                </span>
              </div>
            </div>

            {/* Domain 3: Physical Controls */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-[#0B1220] font-bold text-base sm:text-lg tracking-tight">
                  3. Physical Controls (14 Controls — Annex A.7)
                </h3>
                <span className="text-[#0052FF] font-semibold text-xs sm:text-[13px]">
                  Secure Zones &amp; Clean Desk Enforcement
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-2.5 mb-4 font-normal">
                Physical access perimeters, biometric authorization, clean desk and clean screen policies, continuous video surveillance retention, and secure equipment disposal standards.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.7.2 Physical Entry
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.7.7 Clear Desk/Screen
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.7.14 Secure Disposal
                </span>
              </div>
            </div>

            {/* Domain 4: Technological Controls */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-[#0B1220] font-bold text-base sm:text-lg tracking-tight">
                  4. Technological Controls (34 Controls — Annex A.8)
                </h3>
                <span className="text-[#0052FF] font-semibold text-xs sm:text-[13px]">
                  Secure SDLC, Encryption &amp; Vulnerability Management
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-2.5 mb-4 font-normal">
                Endpoint encryption, network segregation, automated source code SAST/DAST testing, secure development lifecycle (SSDLC), continuous logging, and automated vulnerability management. All security testing is performed exclusively on authorized systems within agreed client scope.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.8.8 Vulnerability Management
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.8.25 Secure SDLC
                </span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-1 rounded border border-slate-200/60">
                  A.8.28 Secure Coding
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response Playbook / Incident Severity Classification & Response Framework */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              INCIDENT RESPONSE PLAYBOOK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              Incident Severity Classification &amp; Response<br className="hidden sm:inline" /> Framework
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed">
              In accordance with ISO 27001 Annex A.5.24-28, all security telemetry is routed through a structured incident triage and escalation process:
            </p>
          </div>

          {/* Table Container */}
          <div className="border border-slate-200/90 rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#F8FAFC]">
                    <th className="py-4 px-6 text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Severity Level
                    </th>
                    <th className="py-4 px-6 text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Definition / Scenario
                    </th>
                    <th className="py-4 px-6 text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Response Priority
                    </th>
                    <th className="py-4 px-6 text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Client Notification
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* SEV-1 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#EF4444] text-xs sm:text-[13px] whitespace-nowrap">
                      SEV-1 (Critical)
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Active data breach, ransomware, or full service outage
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold text-xs sm:text-[13px]">
                      Immediate Escalation
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                      Expedited &mdash; Direct Security Team Lead
                    </td>
                  </tr>

                  {/* SEV-2 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#FF6A00] text-xs sm:text-[13px] whitespace-nowrap">
                      SEV-2 (High)
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Potential unauthorized access or isolated core component failure
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold text-xs sm:text-[13px]">
                      High Priority Response
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                      Same-Day Notification
                    </td>
                  </tr>

                  {/* SEV-3 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#EAB308] text-xs sm:text-[13px] whitespace-nowrap">
                      SEV-3 (Medium)
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Non-critical vulnerability identified in non-production sandbox
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold text-xs sm:text-[13px]">
                      Scheduled Assessment
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                      24 Hours / Weekly Report
                    </td>
                  </tr>

                  {/* SEV-4 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#0052FF] text-xs sm:text-[13px] whitespace-nowrap">
                      SEV-4 (Low)
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Informational security advisory or minor dependency patch
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold text-xs sm:text-[13px]">
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

      {/* ISO 27001 Documentation CTA */}
      <section className="w-full bg-[#0B1220] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center border-t border-slate-800/40">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 82, 255, 0.45), transparent 75%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5">
            Need Our ISO 27001 Security Alignment<br className="hidden sm:inline" /> Documentation?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            We can help prepare SIG questionnaires, CAIQ-aligned security documentation, and Statement of Applicability (SoA) frameworks tailored to client requirements, under standard mutual NDA.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block px-7 py-3.5 bg-[#FF6A00] hover:bg-[#E55F00] text-white font-bold text-xs tracking-wider uppercase rounded transition-colors shadow-md"
            >
              REQUEST ISO 27001 SECURITY ARCHITECTURE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
