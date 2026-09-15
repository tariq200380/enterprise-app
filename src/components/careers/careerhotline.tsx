export default function CareerHotline() {
  return (
    <section className="w-full bg-[#071120] py-20 sm:py-28 text-center text-white relative overflow-hidden">
      {/* Soft Orange Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#FF6B00]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
          DIRECT FOUNDER &amp; SECURITY HOTLINE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
          Have a specialized systems architecture proposal or security concern?
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed font-normal">
          If you have a security question, technical complaint, vulnerability disclosure, or specialized system proposal, you can email our team directly.
        </p>
        <div className="mt-8 sm:mt-10">
          <button
            type="button"
            data-modal="security"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#e05d00] active:scale-[0.99] text-white text-sm font-semibold shadow-xs shadow-orange-500/20 transition-all duration-200 cursor-pointer"
          >
            Email Technical Profile
          </button>
        </div>
      </div>
    </section>
  );
}
