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
                    href="/security-iso-27001"
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
                  href="/security-iso-27001"
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

      {/* Defense in Depth / 4-Layer Enterprise Security Architecture */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              DEFENSE IN DEPTH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              4-Layer Enterprise Security Architecture
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed">
              We employ layered technical and operational safeguards to protect client systems against advanced threat vectors:
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Layer 01 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-xs sm:text-sm tracking-wide block mb-3">
                01
              </span>
              <h3 className="text-[#0B1220] font-bold text-base sm:text-[17px] tracking-tight mb-3">
                Zero-Trust Identity &amp; Access<br />(IAM)
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Mandatory hardware WebAuthn 2FA, biometric facility checkpoints, zero standing administrative privileges (ZSP), and session recording.
              </p>
            </div>

            {/* Layer 02 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-xs sm:text-sm tracking-wide block mb-3">
                02
              </span>
              <h3 className="text-[#0B1220] font-bold text-base sm:text-[17px] tracking-tight mb-3">
                Cryptographic Protection
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                AES-256 GCM encryption at rest with envelope key management, TLS 1.3 in transit with strict HSTS, and secure key custody via cloud-managed KMS services.
              </p>
            </div>

            {/* Layer 03 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-xs sm:text-sm tracking-wide block mb-3">
                03
              </span>
              <h3 className="text-[#0B1220] font-bold text-base sm:text-[17px] tracking-tight mb-3">
                Secure Development Lifecycle<br />(SSDLC)
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                CI/CD SAST/DAST vulnerability scanning, structured peer code review, version-controlled source management, and authorized penetration testing within agreed client scope.
              </p>
            </div>

            {/* Layer 04 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-xs sm:text-sm tracking-wide block mb-3">
                04
              </span>
              <h3 className="text-[#0B1220] font-bold text-base sm:text-[17px] tracking-tight mb-3">
                24/7 Threat Telemetry &amp; SIEM
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Real-time behavioral threat detection, immutable audit logs with atomic clock synchronization, and automated failover disaster recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Governance / Audited Enterprise Sub-Processors */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              SUPPLIER GOVERNANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              Audited Enterprise Sub-Processors
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed">
              Following ISO 27001 (A.5.19) and GDPR (Article 28) supplier governance guidelines, all infrastructure sub-processors undergo rigorous security evaluation:
            </p>
          </div>

          {/* Table Container */}
          <div className="border border-slate-200/90 rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#F8FAFC]">
                    <th className="py-4 px-6 text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Sub-Processor
                    </th>
                    <th className="py-4 px-6 text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Role / Processing Activity
                    </th>
                    <th className="py-4 px-6 text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Data Location
                    </th>
                    <th className="py-4 px-6 text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Audited Certifications
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Row 1: AWS */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#0B1220] text-xs sm:text-[13px] whitespace-nowrap">
                      Amazon Web Services (AWS)
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Primary Cloud Infrastructure &amp; KMS
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs sm:text-[13px]">
                      Frankfurt / Ireland / US-East
                    </td>
                    <td className="py-4 px-6 text-[#0052FF] font-semibold text-xs sm:text-[13px] whitespace-nowrap">
                      ISO 27001, SOC 2, PCI-DSS, FedRAMP
                    </td>
                  </tr>

                  {/* Row 2: GCP */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#0B1220] text-xs sm:text-[13px] whitespace-nowrap">
                      Google Cloud Platform (GCP)
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      AI &amp; Data Pipeline Processing
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs sm:text-[13px]">
                      Belgium / Frankfurt / Iowa
                    </td>
                    <td className="py-4 px-6 text-[#0052FF] font-semibold text-xs sm:text-[13px] whitespace-nowrap">
                      ISO 27001, SOC 2, HIPAA, GDPR
                    </td>
                  </tr>

                  {/* Row 3: Cloudflare */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#0B1220] text-xs sm:text-[13px] whitespace-nowrap">
                      Cloudflare Enterprise
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Edge WAF, DDoS Mitigation &amp; DNS
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs sm:text-[13px]">
                      Global Edge Network (300+ Cities)
                    </td>
                    <td className="py-4 px-6 text-[#0052FF] font-semibold text-xs sm:text-[13px] whitespace-nowrap">
                      SOC 2 Type II, ISO 27001, PCI-DSS
                    </td>
                  </tr>

                  {/* Row 4: GitHub */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#0B1220] text-xs sm:text-[13px] whitespace-nowrap">
                      GitHub Enterprise
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                      Encrypted Source Code Management
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs sm:text-[13px]">
                      US / Multi-Region Secure Cloud
                    </td>
                    <td className="py-4 px-6 text-[#0052FF] font-semibold text-xs sm:text-[13px] whitespace-nowrap">
                      SOC 2 Type II, ISO 27001
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Security / Procurement Inquiries CTA */}
      <section className="w-full bg-[#0B1220] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center border-t border-slate-800/40">
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 82, 255, 0.45), transparent 75%)"
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5">
            Have Custom Vendor Security or<br className="hidden sm:inline" /> Procurement Inquiries?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Our security and compliance team can help prepare security architecture documentation, assist with vendor NDA coordination, and support customizing DPA frameworks for enterprise client requirements.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block px-7 py-3.5 bg-[#FF6A00] hover:bg-[#E55F00] text-white font-bold text-xs tracking-wider uppercase rounded transition-colors shadow-md"
            >
              CONTACT SECURITY &amp; COMPLIANCE TEAM
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
