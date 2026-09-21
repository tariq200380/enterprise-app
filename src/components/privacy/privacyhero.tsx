export default function PrivacyHero() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[#E6E4DF]">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <span className="text-xs font-semibold text-[#8C7A6B] tracking-wide mb-3">
          &mdash; Data Governance &amp; Trust
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-[#1C1917] tracking-tight mb-4">
          Privacy Policy
        </h1>

        <p className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed max-w-2xl font-normal mb-6">
          Transparent principles governing how Creed Tech respects, processes,
          and secures information submitted through our website and engineering
          communication channels.
        </p>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#E6E4DF] text-xs text-slate-500 shadow-2xs">
          <span>Last updated</span>
          <span className="font-semibold text-[#FF6B00]">August 21, 2026</span>
        </div>
      </div>
    </section>
  );
}
