export default function SecurityHero() {
  return (
    <section className="relative w-full bg-[#F7F6F5] text-[#0F172A] pt-16 pb-16 sm:pt-24 sm:pb-20 overflow-hidden border-b border-[#E6E4DF]">
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
          {/* Left Column: Headline, Narrative */}
          <div className="lg:col-span-7">
            <div className="text-xs sm:text-[12px] font-bold text-[#FF6B00] tracking-[0.2em] uppercase mb-4">
              ENTERPRISE TRUST, GOVERNANCE &amp; ZERO-TRUST
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0F172A] tracking-tight leading-[1.08] mb-6">
              Trust,<br />
              engineered into<br />
              <span className="text-[#FF6B00]">every layer</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Security at Creed Tech isn&apos;t a layer we add — it&apos;s built into our infrastructure, our development lifecycle, and how we govern the company. Explore the architecture, controls, and audited standards behind every engagement.
            </p>
          </div>

          {/* Right Column: 4-Row Metrics Box with Clean White Card Style */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="divide-y divide-[#E6E4DF]">
                {/* Row 1 */}
                <div className="flex items-center justify-between py-4 first:pt-0">
                  <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                    Standard client<br />availability
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right">
                    99.98%
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                    Standing admin<br />privileges
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right">
                    0
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                    Threat telemetry &amp;<br />SIEM coverage
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right">
                    24/7
                  </span>
                </div>

                {/* Row 4 */}
                <div className="flex items-center justify-between py-4 last:pb-0">
                  <span className="text-xs sm:text-[13px] text-slate-600 text-left font-normal">
                    Target critical incident<br />triage time
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight text-right">
                    &lt; 15m
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
