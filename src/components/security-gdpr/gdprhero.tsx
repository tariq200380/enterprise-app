import Link from "next/link";

export default function GdprHero() {
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
  );
}
