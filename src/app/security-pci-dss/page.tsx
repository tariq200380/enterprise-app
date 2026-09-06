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
    </div>
  );
}
