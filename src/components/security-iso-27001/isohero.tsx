import Link from "next/link";

export default function IsoHero() {
  return (
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
              <span className="text-xs sm:text-[12px] font-semibold text-[#FF6B00] tracking-widest uppercase">
                <Link href="/security" className="hover:underline">
                  SECURITY CENTER
                </Link>{" "}
                <span className="text-slate-400 font-normal">/</span> ISO/IEC 27001:2022
              </span>
            </div>

            {/* Category Mini Tag Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[11px] font-semibold text-[#FF6B00] tracking-wider uppercase mb-4">
              <span>&bull;</span>
              <span>GLOBAL ISMS STANDARD &bull; ANNEX A ARCHITECTURE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-bold text-[#1C1917] tracking-tight leading-[1.08] mb-5">
              ISO/IEC 27001:2022<br />
              Standard &amp; <span className="text-[#FF6B00]">ISMS Architecture</span>
            </h1>

            {/* Narrative Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              The International Organization for Standardization (ISO, Geneva) defines the premier global framework for information security management. Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models.
            </p>
          </div>

          {/* Right Column: 4-Row Key Metric Box */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E6E4DF]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  SPECIFICATION SNAPSHOT
                </span>
                <span className="text-[11px] font-semibold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  ISO/IEC 27001
                </span>
              </div>
              <div className="divide-y divide-[#E6E4DF]">
                <div className="flex items-center justify-between py-3.5 first:pt-2">
                  <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                    Governing Body
                  </span>
                  <span className="text-sm sm:text-base font-outfit font-bold text-[#FF6B00] tracking-tight text-right">
                    ISO (Geneva, Switzerland)
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5">
                  <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                    Control Framework
                  </span>
                  <span className="text-2xl sm:text-3xl font-outfit font-bold text-[#FF6B00] tracking-tight text-right">
                    93 Controls
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5">
                  <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                    Security Domains
                  </span>
                  <span className="text-2xl sm:text-3xl font-outfit font-bold text-[#FF6B00] tracking-tight text-right">
                    4 Domains
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5 last:pb-0">
                  <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                    Operational Status
                  </span>
                  <span className="text-base sm:text-lg font-outfit font-bold text-[#FF6B00] tracking-tight text-right">
                    ISMS Aligned
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
