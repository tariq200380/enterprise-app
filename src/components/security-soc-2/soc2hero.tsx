import Link from "next/link";

export default function Soc2Hero() {
  return (
    <section className="relative w-full bg-[#0B1220] text-white pt-8 pb-8 sm:pt-12 sm:pb-12 overflow-hidden border-b border-slate-800/60">
      {/* Subtle Engineering Dot Grid Overlay - Pure Tailwind CSS */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#475569_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Ambient Orange Radial Glow in Center - Pure Tailwind CSS */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(255,107,0,0.20)_0%,rgba(255,107,0,0.05)_45%,transparent_75%)]" />

      {/* Centered Soft Orange Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[300px] sm:h-[420px] bg-[#FF6B00]/15 rounded-full blur-[110px] pointer-events-none" />

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
                <span className="text-slate-500 font-normal">/</span> SOC 2 TYPE II
              </span>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-[11px] font-mono font-bold tracking-wider uppercase mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
              <span>AICPA TRUST CRITERIA &bull; SOC 2 TYPE II ALIGNED</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-4">
              SOC 2 Type II <br className="hidden sm:inline" />
              Trust Services Criteria &amp; <br className="hidden sm:inline" />
              Continuous Operational Rigor
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mb-6 font-normal">
              The American Institute of CPAs (AICPA, USA) establishes the definitive benchmark for SaaS security. Creed Tech engineers systems aligned with continuous operational controls across Security, Availability, and Confidentiality.
            </p>

            {/* Highlights List */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                Continuous Control Monitoring
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                AICPA SSAE 18 Aligned
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                12-Month Audit Period
              </span>
            </div>
          </div>

          {/* Right Column: Specification Snapshot Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#0E1726]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 sm:p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
                <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-wider uppercase">
                  AICPA SSAE 18 / AT-C 205
                </span>
                <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded border border-[#FF6B00]/25">
                  TYPE II AUDIT
                </span>
              </div>

              {/* Metric 1 */}
              <div className="py-3 border-b border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Framework Standard
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal block">
                    AICPA Trust Services Criteria
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#FF6B00]">
                  SOC 2 Type II
                </span>
              </div>

              {/* Metric 2 */}
              <div className="py-3 border-b border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Control Criteria
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal block">
                    Security, Availability, Confidentiality
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#FF6B00]">
                  CC1 &ndash; CC9
                </span>
              </div>

              {/* Metric 3 */}
              <div className="py-3 border-b border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Observation Window
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal block">
                    Continuous live verification
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#FF6B00]">
                  12 Months
                </span>
              </div>

              {/* Metric 4 */}
              <div className="pt-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Audit Rigor Model
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal block">
                    Operational effectiveness proof
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#FF6B00]">
                  Continuous SIEM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
