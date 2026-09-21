export default function CareerHero() {
  return (
    <section className="relative w-full py-12 sm:py-16 overflow-hidden bg-[#F7F6F5] border-b border-[#E6E4DF]">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e5e2db80_1px,transparent_1px),linear-gradient(to_bottom,#e5e2db80_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_65%,transparent_100%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-[#0F172A] tracking-tight leading-tight max-w-4xl mx-auto">
          Build digital infrastructure that<br className="hidden sm:inline" />
          {" "}<span className="text-[#FF6B00]">endures.</span> Not just demos.
        </h1>

        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal">
          We are an autonomous collective of principal systems architects, AI engineers, and design artisans. Zero micromanagement, zero bureaucratic sprawl, and zero throwaway code.
        </p>

        {/* 4 Connected Metrics Grid */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto bg-white border border-[#E6E4DF] rounded-2xl shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E4DF] text-left">
            {/* Metric 1 */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                WORK MODEL
              </span>
              <div className="text-base sm:text-[17px] font-outfit font-bold text-slate-900 tracking-tight leading-snug">
                100% Remote &amp; Async
              </div>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Germany · Spain · USA · Global hubs
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                HIRING SLA
              </span>
              <div className="text-base sm:text-[17px] font-outfit font-bold text-slate-900 tracking-tight leading-snug">
                7-Day Total Cycle
              </div>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Zero ghosting · Paid practical challenge
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                HARDWARE ALLOWANCE
              </span>
              <div className="text-base sm:text-[17px] font-outfit font-bold text-slate-900 tracking-tight leading-snug">
                $5,000 Gear Budget
              </div>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Apple M-Max / Threadripper · 4K OLED
              </p>
            </div>

            {/* Metric 4 */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                AUTONOMY LEVEL
              </span>
              <div className="text-base sm:text-[17px] font-outfit font-bold text-slate-900 tracking-tight leading-snug">
                Direct Architect-to-Client
              </div>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Zero non-technical middle layers
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          <a
            href="#roles"
            className="w-full sm:w-44 inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#e05d00] active:scale-[0.99] text-white text-sm font-semibold shadow-xs transition-all duration-200"
          >
            Explore &rarr;
          </a>
          <button
            type="button"
            data-modal="job"
            data-role="Senior Talent Network"
            className="w-full sm:w-44 inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white hover:bg-[#F4F3F1] active:scale-[0.99] text-slate-800 text-sm font-semibold border border-[#E6E4DF] shadow-2xs transition-all duration-200 cursor-pointer"
          >
            Talent Network
          </button>
        </div>
      </div>
    </section>
  );
}
