import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PCI-DSS v4.0 Payment Architecture | Creed Tech",
  description:
    "Founded by major payment brands, the PCI SSC establishes global payment card security standards. Creed Tech architects client-side tokenization flows that isolate cardholder data and streamline PCI assessment scope.",
};

export default function SecurityPciDssPage() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] min-h-screen">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION: PCI-DSS V4.0 TOKENIZED ARCHITECTURE                   */}
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
                  <span className="text-slate-400 font-normal">/</span> FINTECH PAYMENT ARCHITECTURE
                </span>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/25 text-[#FF6B00] text-[11px] font-mono font-bold tracking-wider uppercase mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
                <span>PCI SSC &bull; PCI-DSS V4.0 COMPLIANT ARCHITECTURE</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] tracking-tight leading-[1.12] mb-4">
                PCI-DSS v4.0 <br className="hidden sm:inline" />
                FinTech &amp; Tokenized Payment <br className="hidden sm:inline" />
                Architecture
              </h1>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mb-6 font-normal">
                Founded by major global payment brands, the PCI Security Standards Council defines cardholder data protection benchmarks. Creed Tech architects client-side tokenization architectures that completely isolate cardholder data environments and compress compliance audits to SAQ A scope.
              </p>

              {/* Highlights List */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  Zero-PAN Cardholder Exposure
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  SAQ A Audit Scope Reduction
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  Direct Iframe Tokenization
                </span>
              </div>
            </div>

            {/* Right Column: Specification Snapshot Card */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl border border-[#E6E4DF] p-5 sm:p-6 shadow-xs">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-wider uppercase">
                    PAYMENT SECURITY SNAPSHOT
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    GLOBAL FINTECH
                  </span>
                </div>

                {/* Metric 1 */}
                <div className="py-3 border-b border-[#F0EFEB] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      Standard Version
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      PCI Security Standards Council
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    PCI-DSS v4.0
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="py-3 border-b border-[#F0EFEB] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      Scope Classification
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Merchant Cardholder Isolation
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    SAQ A Scope
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="py-3 border-b border-[#F0EFEB] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      Tokenization Model
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Direct Client-Side Vault Iframe
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    Zero PAN Exposure
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      Transit Encryption
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal block">
                      Transport Layer Security
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    TLS 1.3 &bull; AES-256
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
                Zero-PAN Storage
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Direct client-side tokenization
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                SAQ A Scope
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Complete CDE isolation audit
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                End-to-End Encryption
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                AES-256-GCM &amp; TLS 1.3 tunnels
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
                ASV Vulnerability Scans
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Quarterly certified scan reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. ZERO-PAN TOKENIZATION FLOW ARCHITECTURE                             */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header Split */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
                DATA PIPELINE ARCHITECTURE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight">
                Zero-PAN Tokenization Data Flow
              </h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
              Primary Account Numbers (PAN) never touch merchant web servers. Direct client-side vault tokenization eliminates cardholder data storage risks and minimizes compliance scope.
            </p>
          </div>

          {/* 3 Step Pipeline Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    STEP 01
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    BROWSER CLIENT
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Client-Side Vault Iframe
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  End-users enter sensitive credit card information directly into a sandboxed, PCI Level 1 certified vault iframe hosted within their web browser.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Cardholder Data Enters Vault Directly
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    STEP 02
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ENCRYPTED VAULT
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Hardware Token Generation
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  The certified payment gateway vault ingests the PAN, encrypts cardholder data using HSM-backed AES-256 keys, and returns a single-use token.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Returns Ephemeral Token: &apos;tok_sec_99a&apos;
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                    STEP 03
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    MERCHANT SERVER
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Zero-Scope Charge Execution
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Merchant servers receive only the cryptographic token to execute payment transactions. Sensitive cardholder numbers never touch your application code or databases.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
                Zero PAN Stored &bull; Complete SAQ A Isolation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. THE 6 GOALS & 12 STATUTORY PCI-DSS REQUIREMENTS                     */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-white border-t border-b border-[#E6E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-8">
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              STATUTORY MATRIX
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
              The 6 Goals &amp; 12 Statutory PCI-DSS Requirements
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
              PCI-DSS v4.0 mandates twelve statutory technical requirements organized under six comprehensive security objectives:
            </p>
          </div>

          {/* 6 Cards Grid (3 columns desktop, 2 columns tablet) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Goal 1 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    GOAL 1
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    NETWORK
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Build &amp; Maintain a Secure Network
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Req 1 &amp; 2: Install and maintain network firewalls isolating cardholder data environments (CDE) and forbid vendor-supplied default passwords.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Firewall Isolation &bull; Hardened Configs
              </div>
            </div>

            {/* Goal 2 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    GOAL 2
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    CARD DATA
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Protect Cardholder Data
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Req 3 &amp; 4: Protect stored account data with AES-256 GCM encryption and enforce strong cryptographic protocols (TLS 1.3) during transmission over public networks.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                AES-256 Storage &bull; TLS 1.3 Transit
              </div>
            </div>

            {/* Goal 3 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    GOAL 3
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    VULNERABILITY
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Vulnerability Management Program
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Req 5 &amp; 6: Deploy automated anti-malware telemetry and develop secure software following OWASP Top 10 guidelines with automated SAST/DAST code reviews.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                OWASP Guidelines &bull; Automated SAST
              </div>
            </div>

            {/* Goal 4 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    GOAL 4
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ACCESS
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Strong Access Control Measures
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Req 7 &amp; 8: Restrict cardholder access to business need-to-know, assign unique user IDs, and enforce mandatory multi-factor authentication (MFA) on all CDE access.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Need-to-Know IAM &bull; Mandatory 2FA
              </div>
            </div>

            {/* Goal 5 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    GOAL 5
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    MONITORING
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Regularly Monitor &amp; Test Networks
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Req 9 &amp; 10: Track and monitor all access to network resources and cardholder data with immutable audit trails synchronized to atomic NTP clocks.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Immutable Logging &bull; NTP Sync
              </div>
            </div>

            {/* Goal 6 */}
            <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                    GOAL 6
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    GOVERNANCE
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                  Maintain Information Security Policy
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                  Req 11 &amp; 12: Conduct quarterly Approved Scanning Vendor (ASV) vulnerability scans, annual penetration testing, and maintain formal security policies.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
                Quarterly ASV Scans &bull; Pen Testing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. ASSESSMENT SCOPE & SAQ VALIDATION FRAMEWORK TABLE                   */}
      {/* ====================================================================== */}
      <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-8">
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              AUDIT SCOPE &bull; SAQ COMPLIANCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
              Self-Assessment Questionnaire (SAQ) Scope Matrix
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
              Merchant compliance obligations vary based on payment integration architecture. Tokenization reduces assessment complexity:
            </p>
          </div>

          {/* Table Container */}
          <div className="border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[840px]">
                <thead>
                  <tr className="border-b border-[#E6E4DF] bg-[#FAF9F6]">
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Validation Level
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                      SAQ Type
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Cardholder Scope Isolation
                    </th>
                    <th className="py-4 px-6 text-[#1C1917] font-mono font-bold text-xs uppercase tracking-wider">
                      Audit Instrument
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E4DF]">
                  {/* Row 1 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Hosted Iframe / Tokenization
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        E-commerce client-side vaulting
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                        SAQ A
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Zero PAN Exposure &bull; Cardholder data never touches merchant servers. Complete CDE scope reduction.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Annual SAQ A &amp; AoC
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Direct Post API Integration
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Merchant server serves form fields
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                        SAQ A-EP
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Restricted Transit &bull; Web server controls JavaScript delivery but does not store cardholder data.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Quarterly ASV &bull; SAQ A-EP
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Hardware Standalone Terminals
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Point-of-Sale IP terminals
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                        SAQ B-IP
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Physical POS Isolation &bull; Hardware encryption prevents electronic card data access on local networks.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Annual SAQ B-IP
                      </span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                        Custom Payment Engine Provider
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Full card transmission and storage
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                        SAQ D
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                      Full CDE Scope &bull; Comprehensive audit of all network nodes, databases, and encryption keys.
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Annual QSA On-Site Audit &bull; RoC
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
      {/* 6. PCI-DSS DOCUMENTATION CTA (Deep Navy & Ambient Orange Glow)         */}
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
            PAYMENT SECURITY ASSURANCE &bull; PCI-DSS V4.0
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Building a Tokenized Checkout or FinTech Payment Engine?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Our payment systems architects design scope-reduced tokenized payment flows, SAQ A compliance frameworks, and secure checkout architectures tailored to client requirements, under standard mutual NDA.
          </p>
          <div>
            <Link
              href="/contact"
              className="w-full sm:w-auto min-w-[200px] h-14 px-8 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold rounded inline-flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
            >
              Contact Payment Architects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
