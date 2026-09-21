export default function TermsHero() {
  return (
    <section className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-[#E6E4DF] overflow-hidden bg-[#F7F6F5]">
      {/* Subtle Engineering Grid Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e5e2db80_1px,transparent_1px),linear-gradient(to_bottom,#e5e2db80_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_65%,transparent_100%)]" />

      <div className="relative max-w-3xl mx-auto flex flex-col items-center z-10">
        {/* Category Tag Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[11px] font-bold text-[#FF6B00] tracking-wider uppercase mb-4">
          <span>&bull;</span>
          <span>Legal Framework &amp; Master Terms</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-[#1C1917] tracking-tight mb-4">
          Terms &amp; Conditions
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed max-w-2xl font-normal mb-6">
          Binding terms governing access to Creed Tech&apos;s digital infrastructure, public technical research, commercial discovery channels, and preliminary scoping requests.
        </p>

        {/* Dual Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-500">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E6E4DF] shadow-2xs">
            <span className="text-slate-400">Effective:</span>
            <span className="font-semibold text-[#FF6B00]">August 21, 2026</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E6E4DF] shadow-2xs">
            <span className="text-slate-400">Standard:</span>
            <span className="font-semibold text-slate-700">Cross-Border MSA Precedence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
