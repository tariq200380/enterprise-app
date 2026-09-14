import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EU GDPR Regulation (EU) 2016/679 Privacy Architecture",
  description:
    "Enacted by the European Parliament, the GDPR mandates sovereign privacy by design. Creed Tech provides structured Article 28 Data Processing Agreement (DPA) templates and architects dedicated European cloud infrastructure with sovereign data residency.",
};

export default function SecurityGdprPage() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION: EU GDPR 2016/679 ARCHITECTURE                         */}
      {/* ====================================================================== */}
      <section className="relative w-full bg-[#F7F6F5] text-[#0F172A] pt-8 pb-8 sm:pt-12 sm:pb-12 overflow-hidden border-b border-[#E6E4DF]">
        {/* Engineering Dot Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(#CBD5E1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

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
                  <span className="text-slate-400 font-normal">/</span> PRIVACY ARCHITECTURE
                </span>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/25 text-[#FF6B00] text-[11px] font-mono font-bold tracking-wider uppercase mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
                <span>EU REGULATION 2016/679 &bull; STATUTORY PRIVACY</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] tracking-tight leading-[1.12] mb-4">
                European Union GDPR <br className="hidden sm:inline" />
                Data Privacy &amp; Governance <br className="hidden sm:inline" />
                Architecture
              </h1>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mb-6 font-normal">
                Enacted by the European Parliament, the General Data Protection Regulation mandates sovereign privacy by design. Creed Tech architects dedicated European cloud infrastructure, structured Article 28 Data Processing Agreements (DPA), and automated data subject rights workflows.
              </p>

              {/* Highlights List */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  EU Sovereign Data Residency
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  Standard Contractual Clauses (SCC)
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  Privacy by Design (Art. 25)
                </span>
              </div>
            </div>

            {/* Right Column: Specification Snapshot Card */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl border border-[#E6E4DF] p-5 sm:p-6 shadow-xs">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-wider uppercase">
                    STATUTORY PRIVACY SNAPSHOT
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    LEGAL MANDATE
                  </span>
                </div>

                {/* Metric 1 */}
                <div className="py-3 border-b border-[#F0EFEB] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      Jurisdiction
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      European Parliament &bull; Brussels
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    27 EU States
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="py-3 border-b border-[#F0EFEB] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      Statutory Framework
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Regulation (EU) 2016/679
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    99 Articles
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="py-3 border-b border-[#F0EFEB] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      Data Subject Rights
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Chapter III Automated Workflows
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    8 Core Rights
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      Cross-Border Safeguards
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Standard Contractual Clauses
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    Article 46 SCC
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
                Privacy by Design
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Article 25 default protection
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Sovereign Residency
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Dedicated European cloud zones
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                DSAR Automation
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Self-service export &amp; downloads
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                Cryptographic Erasure
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Immutable Right to be Forgotten
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. ARTICLE 6: THE 6 LAWFUL BASES FOR DATA PROCESSING                   */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header Split */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
                STATUTORY FOUNDATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight">
                Article 6: 6 Lawful Bases for Processing
              </h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
              Under GDPR Article 6, personal data ingestion can only proceed when satisfied by at least one explicit legal foundation governing the specific processing lifecycle.
            </p>
          </div>

          {/* 6 Cards Grid with Top Border Accent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Consent */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    ART. 6.1.a
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    EXPLICIT
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  1. Consent
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Freely given, specific, informed, and unambiguous indication of the data subject&apos;s wishes demonstrated through affirmative action and revocable at any time.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Affirmative Authorization
              </div>
            </div>

            {/* Card 2: Contractual Necessity */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    ART. 6.1.b
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    OPERATIONAL
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  2. Contractual Necessity
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Processing strictly required for executing obligations under an agreement or taking preliminary steps at the data subject&apos;s request prior to contracting.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Service Delivery Requirement
              </div>
            </div>

            {/* Card 3: Legal Obligation */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    ART. 6.1.c
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    MANDATORY
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  3. Legal Obligation
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Statutory compliance with European Union or member state legislation, covering tax retention, corporate reporting, and law enforcement directives.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Statutory Mandate
              </div>
            </div>

            {/* Card 4: Vital Interests */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    ART. 6.1.d
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    CRITICAL
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  4. Vital Interests
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Emergency processing necessary to protect essential life, health, safety, or physical integrity of the individual or another natural person.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Life &amp; Safety Protection
              </div>
            </div>

            {/* Card 5: Public Task */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    ART. 6.1.e
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    INSTITUTIONAL
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  5. Public Task
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Processing required in the performance of an official function or statutory task carried out in the public interest by accredited governmental entities.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Public Authority Task
              </div>
            </div>

            {/* Card 6: Legitimate Interests */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    ART. 6.1.f
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    COMMERCIAL
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  6. Legitimate Interests
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Processing necessary for legitimate commercial interests, provided these are rigorously balanced against fundamental rights, freedoms, and user expectations.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Balancing Assessment Mandated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. THE 8 DATA SUBJECT RIGHTS (DSAR FRAMEWORK)                          */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-white border-t border-b border-[#E6E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-8">
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              INDIVIDUAL PRIVACY RIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
              8 Data Subject Rights Architected for Enterprise Systems
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
              Our software solutions are engineered with modular privacy mechanisms supporting all eight statutory data subject rights defined under Chapter III of Regulation (EU) 2016/679:
            </p>
          </div>

          {/* 8 Rights Grid (4 columns desktop, 2 columns tablet) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Right 1: Article 15 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    ARTICLE 15
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    DSAR
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Right of Access
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Self-service interface enabling users to generate and download structured JSON/CSV archives containing all personal data, telemetry, and access logs.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Instant Export &bull; 30-Day SLA
              </div>
            </div>

            {/* Right 2: Article 16 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    ARTICLE 16
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ACCURACY
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Right to Rectification
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Direct profile settings interfaces and RESTful APIs enabling individuals to correct, update, or complete inaccurate personal information instantly.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Self-Service Profile Edit
              </div>
            </div>

            {/* Right 3: Article 17 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    ARTICLE 17
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ERASURE
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Right to Erasure
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Cascading cryptographic data deletion pipeline purging records across primary databases, object caches, and immutable backup replicas.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Cryptographic Shredding
              </div>
            </div>

            {/* Right 4: Article 18 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    ARTICLE 18
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SUSPENSION
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Right to Restriction
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  System-level processing locks suspending downstream transformation and external sync while retaining records safely during dispute reviews.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Automated Processing Freeze
              </div>
            </div>

            {/* Right 5: Article 19 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    ARTICLE 19
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    BROADCAST
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Notification of Changes
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Automated webhook notifications dispatching data corrections, erasures, and processing restrictions to all downstream sub-processors.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Sub-Processor Sync Webhooks
              </div>
            </div>

            {/* Right 6: Article 20 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    ARTICLE 20
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    INTEROP
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Data Portability
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Standardized, machine-readable JSON and CSV export endpoints enabling users to transfer personal information directly to third-party platforms.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Machine-Readable Schema
              </div>
            </div>

            {/* Right 7: Article 21 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    ARTICLE 21
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    OPT-OUT
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Right to Object
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Granular consent management UI providing individual toggle controls to opt out of marketing telemetry, third-party analytics, and tracking cookies.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Granular Consent Toggles
              </div>
            </div>

            {/* Right 8: Article 22 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    ARTICLE 22
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    OVERSIGHT
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Automated Decisions
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Algorithmic transparency controls supporting human review, rationale disclosure, and contestation mechanisms for automated assessments.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Human-in-the-Loop Review
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. ARTICLE 28 DPA & CROSS-BORDER TRANSFER FRAMEWORK TABLE               */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-8">
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              ARTICLE 28 &bull; SUB-PROCESSOR GOVERNANCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
              Data Processor Governance &amp; Cross-Border Safeguards
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
              In strict accordance with GDPR Article 28 and Chapter V, our technical and contractual mechanisms ensure uninterrupted legal compliance across cloud infrastructure:
            </p>
          </div>

          {/* Table Container */}
          <div className="border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-[#E6E4DF] bg-[#FAF9F6]">
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Safeguard Area
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Statutory Article
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Technical Architecture Enforcement
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Contractual Instrument
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E4DF]">
                  {/* Row 1 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Sub-Processor Authorizations
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Third-party cloud vendor vetting
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF]">
                        Article 28.2
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Zero-trust IAM isolation, annual SOC 2 Type II vendor audits, and 30-day change notification webhooks.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Mutual DPA Schedule A
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        International Data Transfers
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Cross-border transmission
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF]">
                        Chapter V (Art. 46)
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      EU sovereign key management (AWS KMS / CloudHSM) and TLS 1.3 encrypted transit tunnels with PFS.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        EU Commission SCCs (2021/914)
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Breach Notification SLA
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Supervisory escalation
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF]">
                        Articles 33 &amp; 34
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Automated SIEM telemetry triage, forensic immutable audit logging, and prompt 72-hour regulatory notification protocol.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Statutory 72h SLA Playbook
                      </span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Privacy by Default (SSDLC)
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Engineering controls
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF]">
                        Article 25
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Field-level pseudonymization, column-level DB encryption, strict data minimization, and automated CI/CD security linters.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Engineering Policy EP-04
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
      {/* 6. GDPR DOCUMENTATION CTA (Deep Navy & Ambient Orange Glow)            */}
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
            DATA PRIVACY ASSURANCE &bull; ARTICLE 28 COMPLIANT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Need Our GDPR DPA &amp; Privacy Alignment Architecture?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Our privacy and compliance team can help prepare Standard Contractual Clauses (SCC) frameworks and support developing customized DPA documentation tailored to client data processing requirements, under standard mutual NDA.
          </p>
          <div>
            <Link
              href="/contact"
              className="w-full sm:w-auto min-w-[200px] h-14 px-8 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold rounded inline-flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
            >
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
