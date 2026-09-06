import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PCI-DSS v4.0 Payment Architecture | Creed Tech",
  description:
    "Founded by major payment brands, the PCI SSC establishes global payment card security standards. Creed Tech architects client-side tokenization flows that isolate cardholder data and streamline PCI assessment scope.",
};

export default function SecurityPciDssPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section (2-Column) */}
      <section className="w-full pt-16 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8">
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
                  <span className="text-slate-400 font-normal">/</span>{" "}
                  <span className="text-slate-500 font-normal">PCI-DSS V4.0</span>
                </span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EFF6FF] border border-[#BFDBFE]/80 text-[#1D4ED8] text-[11px] font-bold tracking-wider uppercase mb-5 shadow-sm">
                <span>PAYMENT CARD INDUSTRY COUNCIL &bull; WAKEFIELD, MA, USA</span>
              </div>

              {/* Heading with 2-Tone Color */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5">
                <span className="text-[#0B1220] block">PCI-DSS v4.0</span>
                <span className="text-[#0052FF] block">FinTech &amp; Tokenized Payment</span>
                <span className="text-[#0052FF] block">Architecture</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-xl mb-6 font-normal">
                Founded by major payment brands, the PCI SSC establishes global payment card security standards. Creed Tech architects client-side tokenization flows that isolate cardholder data and streamline PCI assessment scope.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-5 py-3 bg-[#0052FF] hover:bg-[#0043D1] text-white font-bold text-xs tracking-wider rounded uppercase transition-colors shadow-sm"
                >
                  CONSULT PAYMENT SYSTEMS ARCHITECT
                </Link>
                <Link
                  href="/security"
                  className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs tracking-wider rounded uppercase border border-slate-200 transition-colors shadow-sm"
                >
                  ALL SECURITY STANDARDS
                </Link>
              </div>
            </div>

            {/* Right Column: Zero-PAN Tokenization Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-sm">
                {/* Header of Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <span className="text-slate-500 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                    ZERO-PAN TOKENIZATION
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/90 text-emerald-700 text-[10px] sm:text-[11px] font-bold tracking-wide">
                    SAQ A SCOPE
                  </span>
                </div>

                {/* 3 Step Flow Diagram */}
                <div className="space-y-2">
                  {/* Step 1 */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5 sm:p-4 text-left">
                    <span className="text-slate-400 font-bold text-[10px] tracking-wider uppercase block mb-1">
                      STEP 1: BROWSER IFRAME
                    </span>
                    <p className="text-slate-700 font-medium text-xs sm:text-[13px] font-mono">
                      Cardholder Data &rarr; Direct Vault Iframe
                    </p>
                  </div>

                  {/* Arrow Connector */}
                  <div className="text-slate-300 text-xs text-center flex justify-center py-0.5">
                    &darr;
                  </div>

                  {/* Step 2 */}
                  <div className="bg-blue-50/50 border border-blue-200/80 rounded-lg p-3.5 sm:p-4 text-left">
                    <span className="text-blue-600 font-bold text-[10px] tracking-wider uppercase block mb-1">
                      STEP 2: ENCRYPTED VAULT
                    </span>
                    <p className="text-slate-800 font-medium text-xs sm:text-[13px] font-mono">
                      Vault converts PAN into Token: &apos;tok_sec_99a&apos;
                    </p>
                  </div>

                  {/* Arrow Connector */}
                  <div className="text-slate-300 text-xs text-center flex justify-center py-0.5">
                    &darr;
                  </div>

                  {/* Step 3 */}
                  <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-lg p-3.5 sm:p-4 text-left">
                    <span className="text-emerald-700 font-bold text-[10px] tracking-wider uppercase block mb-1">
                      STEP 3: CLIENT SERVER
                    </span>
                    <p className="text-slate-800 font-medium text-xs sm:text-[13px] font-mono">
                      Server receives Token only &bull; Zero Cardholder Scope
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The 6 Goals & 12 Statutory PCI-DSS Requirements */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10 text-left">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              STATUTORY MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              The 6 Goals &amp; 12 Statutory PCI-DSS<br className="hidden sm:inline" /> Requirements
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed font-normal">
              PCI-DSS v4.0 establishes 12 mandatory technical requirements organized under 6 core security objectives:
            </p>
          </div>

          {/* 6 Cards Grid (3 Columns, 2 Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Goal 1 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                GOAL 1 &bull; SECURE NETWORK
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Req 1 &amp; 2: Firewalls &amp; Defaults
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Maintain network firewalls isolating cardholder data environments (CDE) and strictly forbid vendor-supplied default passwords or configuration parameters.
              </p>
            </div>

            {/* Card 2: Goal 2 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                GOAL 2 &bull; PROTECT CARD DATA
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Req 3 &amp; 4: Encryption &amp; Transit
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Protect stored account data with AES-256 GCM encryption and enforce strong cryptography (TLS 1.3) during transmission over open, public networks.
              </p>
            </div>

            {/* Card 3: Goal 3 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                GOAL 3 &bull; VULNERABILITY MGMT
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Req 5 &amp; 6: Malware &amp; Secure Code
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Deploy automated anti-malware telemetry and develop secure software following OWASP Top 10 guidelines with automated SAST code reviews.
              </p>
            </div>

            {/* Card 4: Goal 4 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                GOAL 4 &bull; ACCESS CONTROL
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Req 7 &amp; 8: Need-to-Know &amp; MFA
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Restrict cardholder access to business need-to-know, assign unique user IDs, and enforce mandatory multi-factor authentication (MFA) on all CDE access.
              </p>
            </div>

            {/* Card 5: Goal 5 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                GOAL 5 &bull; MONITOR &amp; TEST
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Req 9 &amp; 10: Physical &amp; Audit Logs
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Restrict physical server room access and log all network and database queries with immutable audit trails synchronized to NTP atomic clocks.
              </p>
            </div>

            {/* Card 6: Goal 6 */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0052FF]/40 hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[#0052FF] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2">
                GOAL 6 &bull; SECURITY POLICY
              </span>
              <h3 className="text-[#0B1220] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                Req 11 &amp; 12: ASV Scans &amp; Policies
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                Conduct quarterly vulnerability scans, authorized penetration testing within agreed client scope, and maintain formal security policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Dark CTA Section (Building an E-Commerce Checkout or FinTech Payment Engine?) */}
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
            Building an E-Commerce Checkout or<br className="hidden sm:inline" /> FinTech Payment Engine?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Our payment systems architects design tokenized, scope-reduced checkout flows that simplify PCI-DSS compliance audits.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block px-7 py-3.5 bg-[#FF6A00] hover:bg-[#E55F00] text-white font-bold text-xs tracking-wider uppercase rounded transition-colors shadow-md"
            >
              START FINTECH ARCHITECTURE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
