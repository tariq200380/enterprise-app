import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust, Engineered Into Every Layer | Enterprise Security Center",
  description:
    "Security at Creed Tech isn't a layer we add — it's built into our infrastructure, our development lifecycle, and how we govern the company. Explore the architecture, controls, and audited standards behind every engagement.",
};

export default function SecurityPage() {
  return (
    <div className="w-full bg-[#F7F6F5] font-sans antialiased text-[#0F172A] selection:bg-[#FF6B00] selection:text-white">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION (Light Clean Palette matching Careers: #F7F6F5)       */}
      {/* ====================================================================== */}
      <section className="relative w-full bg-[#F7F6F5] text-[#0F172A] pt-16 pb-16 sm:pt-24 sm:pb-20 overflow-hidden border-b border-[#E6E4DF]">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e5e2db80_1px,transparent_1px),linear-gradient(to_bottom,#e5e2db80_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_65%,transparent_100%)]" />

        {/* 3 Concentric Rings in Top-Right Corner */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 420 420"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Inner Ring 1 */}
            <circle cx="420" cy="0" r="140" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.22" />
            {/* Middle Ring 2 */}
            <circle cx="420" cy="0" r="220" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.16" />
            {/* Outer Ring 3 */}
            <circle cx="420" cy="0" r="300" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.10" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Narrative */}
            <div className="lg:col-span-7">
              {/* Category Mini Tag */}
              <div 
                className="text-xs sm:text-[12px] font-bold text-[#FF6B00] tracking-[0.2em] uppercase mb-4"
              >
                ENTERPRISE TRUST, GOVERNANCE &amp; ZERO-TRUST
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0F172A] tracking-tight leading-[1.08] mb-6">
                Trust,<br />
                engineered into<br />
                <span className="text-[#FF6B00]">every layer</span>
              </h1>

              {/* Narrative Paragraph */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Security at Creed Tech isn&apos;t a layer we add — it&apos;s built into our infrastructure, our development lifecycle, and how we govern the company. Explore the architecture, controls, and audited standards behind every engagement.
              </p>
            </div>

            {/* Right Column: 4-Row Metrics Box with Clean White Card Style */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="divide-y divide-[#E6E4DF]">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between py-4 first:pt-0">
                    <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                      Standard client<br />availability
                    </span>
                    <span 
                      className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right"
                    >
                      99.98%
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between py-4">
                    <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                      Standing admin<br />privileges
                    </span>
                    <span 
                      className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right"
                    >
                      0
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-between py-4">
                    <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                      Threat telemetry &amp;<br />SIEM coverage
                    </span>
                    <span 
                      className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right"
                    >
                      24/7
                    </span>
                  </div>

                  {/* Row 4 */}
                  <div className="flex items-center justify-between py-4 last:pb-0">
                    <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                      Independently<br />audited frameworks
                    </span>
                    <span 
                      className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right"
                    >
                      4
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
            <div className="p-4 sm:px-6 flex flex-col justify-center">
              <h3 className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight">
                High Availability
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Resilient cloud architecture
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center">
              <h3 className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight">
                Zero Trust
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Proactive risk mitigation
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center">
              <h3 className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight">
                Centralized SIEM
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Security telemetry &amp; alerting
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 sm:px-6 flex flex-col justify-center">
              <h3 className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight">
                Rapid Triage
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-normal">
                Structured incident playbooks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. ENTERPRISE COMPLIANCE & SECURITY FRAMEWORKS                         */}
      {/* ====================================================================== */}
      <section id="frameworks" className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5] scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header Split */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
            <div>
              <span className="text-[11px] font-bold text-[#FF6B00] tracking-[0.16em] uppercase block mb-2">
                STANDARDS &amp; AUDITS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
                Enterprise compliance &amp;<br className="hidden sm:inline" />
                {" "}security frameworks
              </h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
              Each framework below links to the governing authority, statutory requirement, and Creed Tech&apos;s client-facing implementation architecture.
            </p>
          </div>

          {/* 2x2 Grid of Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {/* Framework 1: ISO/IEC 27001:2022 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    STANDARD · AUDIT
                  </span>
                  <Link
                    href="/security-iso-27001"
                    className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05d00] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Peer architecture</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  ISO/IEC 27001:2022
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-normal">
                  ISO/IEC JTC 1/SC 27 · Geneva, Switzerland
                </p>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal">
                  Comprehensive security governance aligned with all 93 Annex A controls, secure engineering lifecycle, access controls, and risk management.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  Framework-aligned
                </span>
                <Link
                  href="/security-iso-27001"
                  className="font-semibold text-[#0F172A] hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore full breakdown</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Framework 2: EU GDPR Regulation */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    PRIVACY · EU LAW
                  </span>
                  <Link
                    href="/security-gdpr"
                    className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05d00] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Peer architecture</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  EU GDPR Regulation (EU) 2016/679
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-normal">
                  European Data Protection Board · Brussels, Belgium
                </p>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal">
                  Structured Article 28 Data Processing Agreement templates, European data residency architecture, automated DSAR workflows, and Privacy by Design.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  Statutory-aligned
                </span>
                <Link
                  href="/security-gdpr"
                  className="font-semibold text-[#0F172A] hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore full breakdown</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Framework 3: AICPA SOC 2 Type II */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    TRUST SERVICES · AUDIT
                  </span>
                  <Link
                    href="/security-soc-2"
                    className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05d00] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Peer architecture</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  AICPA SOC 2 Type II
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-normal">
                  American Institute of CPAs · USA
                </p>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal">
                  Engineered to meet AICPA SOC 2 Trust Services Criteria across Security, Availability, and Confidentiality controls.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  Framework-aligned
                </span>
                <Link
                  href="/security-soc-2"
                  className="font-semibold text-[#0F172A] hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore full breakdown</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Framework 4: PCI-DSS Version 4.0 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SCOPE · OPTIONAL
                  </span>
                  <Link
                    href="/security-pci-dss"
                    className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05d00] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Peer architecture</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  PCI-DSS Version 4.0
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-normal">
                  PCI Security Standards Council · Wakefield, USA
                </p>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal">
                  Client-side payment tokenization and isolated cardholder data environment (CDE) architecture designed to minimize PCI-DSS audit scope.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  Scope-engineered
                </span>
                <Link
                  href="/security-pci-dss"
                  className="font-semibold text-[#0F172A] hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore full breakdown</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. FOUR-LAYER ENTERPRISE SECURITY ARCHITECTURE (DEFENSE IN DEPTH)     */}
      {/* ====================================================================== */}
      <section id="architecture" className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5] border-t border-[#E6E4DF] scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header Split */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8">
            <div>
              <span className="text-[11px] font-bold text-[#FF6B00] tracking-[0.16em] uppercase block mb-2">
                DEFENSE IN DEPTH
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
                Four-layer enterprise<br className="hidden sm:inline" />
                {" "}security architecture
              </h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
              Layered technical and operational safeguards protect client systems against advanced threat vectors, applied in sequence from identity to response.
            </p>
          </div>

          {/* 4 Horizontal Columns in Connected Card Strip */}
          <div className="bg-white border border-[#E6E4DF] rounded-2xl shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E4DF]">
              {/* Layer 01 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block mb-2">
                    01
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight mb-2">
                    Zero-Trust Identity &amp; Access (IAM)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Mandatory hardware WebAuthn / FIDO2, biometric validity checkpoints, zero standing administrative privileges, and session recording.
                  </p>
                </div>
              </div>

              {/* Layer 02 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block mb-2">
                    02
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight mb-2">
                    Cryptographic Protection
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    AES-256-GCM encryption at rest with third-party key management, TLS 1.3 in-transit with strict HSTS, and multi-party quorum via cloud managed KMS.
                  </p>
                </div>
              </div>

              {/* Layer 03 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block mb-2">
                    03
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight mb-2">
                    Secure Development Lifecycle (SSDLC)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Automated SAST/DAST vulnerability scanning, immutable PR audit trails, phrase-activated secret management, and architectural peer teardowns.
                  </p>
                </div>
              </div>

              {/* Layer 04 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block mb-2">
                    04
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight mb-2">
                    24/7 Threat Telemetry &amp; SIEM
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Real-time infrastructure threat detection, immutable audit logs with atomic clock synchronization, and automated breach dispatch playbooks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. AUDITED ENTERPRISE SUB-PROCESSORS                                  */}
      {/* ====================================================================== */}
      <section className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5] border-t border-[#E6E4DF]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header Split */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8">
            <div>
              <span className="text-[11px] font-bold text-[#FF6B00] tracking-[0.16em] uppercase block mb-2">
                SUPPLIER GOVERNANCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
                Audited enterprise<br />
                sub-processors
              </h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
              Following ISO 27001 (A.5.19) and GDPR (Article 28) supplier governance guidelines, all infrastructure sub-processors undergo rigorous security evaluation.
            </p>
          </div>

          {/* Sub-processors Table Container */}
          <div className="w-full border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F4F3F1] text-slate-700 font-bold border-b border-[#E6E4DF]">
                    <th className="py-3.5 px-4 sm:px-6">Sub-processor</th>
                    <th className="py-3.5 px-4 sm:px-6">Role / processing activity</th>
                    <th className="py-3.5 px-4 sm:px-6">Data location</th>
                    <th className="py-3.5 px-4 sm:px-6">Audited certifications</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E4DF]">
                  {/* Row 1: AWS */}
                  <tr className="hover:bg-[#F9F8F6] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#0F172A] whitespace-nowrap">
                      Amazon Web Services (AWS)
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">
                      Primary cloud infrastructure &amp; KMS
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                      Frankfurt / Ireland / US-East
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#FF6B00] whitespace-nowrap">
                      ISO 27001, SOC 2, PCI-DSS, FedRAMP
                    </td>
                  </tr>

                  {/* Row 2: GCP */}
                  <tr className="hover:bg-[#F9F8F6] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#0F172A] whitespace-nowrap">
                      Google Cloud Platform (GCP)
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">
                      AI &amp; data pipeline processing
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                      Belgium / Frankfurt / Iowa
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#FF6B00] whitespace-nowrap">
                      ISO 27001, SOC 2, HIPAA, GDPR
                    </td>
                  </tr>

                  {/* Row 3: Cloudflare */}
                  <tr className="hover:bg-[#F9F8F6] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#0F172A] whitespace-nowrap">
                      Cloudflare Enterprise
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">
                      Edge WAF / DDoS mitigation &amp; DNS
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                      Global edge network (300+ cities)
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#FF6B00] whitespace-nowrap">
                      SOC 2 Type II, ISO 27001, PCI-DSS
                    </td>
                  </tr>

                  {/* Row 4: GitHub */}
                  <tr className="hover:bg-[#F9F8F6] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#0F172A] whitespace-nowrap">
                      GitHub Enterprise
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">
                      Encrypted source code management
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                      US / Multi-region secure cloud
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#FF6B00] whitespace-nowrap">
                      SOC 2 Type II, ISO 27001
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. SECURITY FOOTER STRIP                                               */}
      {/* ====================================================================== */}
      <footer className="w-full bg-[#F4F3F1] text-slate-500 text-xs py-4 px-4 sm:px-6 lg:px-8 border-t border-[#E6E4DF]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Creed Tech. Enterprise Trust &amp; Security Center.</span>
          <span className="font-mono text-[11px] text-[#FF6B00]">Frankfurt &amp; Global Operations</span>
        </div>
      </footer>
    </div>
  );
}
