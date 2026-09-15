import Link from "next/link";

export default function PciHero() {
  return (
    <section className="relative w-full bg-[#F7F6F5] text-[#0F172A] pt-8 pb-8 sm:pt-12 sm:pb-12 overflow-hidden border-b border-[#E6E4DF]">
      {/* Engineering Dot Grid Overlay - Pure Tailwind CSS */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:24px_24px]" />

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
  );
}
