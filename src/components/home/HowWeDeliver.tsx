import Link from "next/link";

export default function HowWeDeliver() {
  return (
    <section
      className="w-full py-14 sm:py-16 lg:py-20 text-white relative overflow-hidden border-b border-gray-800 select-none"
      style={{ backgroundColor: "#0B1120" }}
      id="how-we-deliver-section"
    >
      {/* Hidden Radio Buttons for Pure CSS Tabs (Zero useState, Zero JS) */}
      <input type="radio" name="phase-radio" id="phase-1" defaultChecked className="hidden" />
      <input type="radio" name="phase-radio" id="phase-2" className="hidden" />
      <input type="radio" name="phase-radio" id="phase-3" className="hidden" />
      <input type="radio" name="phase-radio" id="phase-4" className="hidden" />

      {/* Ambient Orange Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(255, 107, 0, 0.17) 0%, rgba(255, 107, 0, 0.05) 45%, rgba(11, 17, 32, 0) 70%)",
        }}
      />

      {/* Blueprint Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 flex flex-col items-center z-10">
        {/* Section Badge & Header */}
        <div className="flex flex-col items-center text-center mb-12 max-w-2xl">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-orange-500/10 border border-orange-500/20 text-[#FF6B00] text-[11px] font-medium uppercase tracking-widest mb-3 hover:bg-orange-500/20 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            ENGINEERING METHODOLOGY
          </Link>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white uppercase mb-3">
            HOW WE DELIVER
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed">
            A transparent, four-phase delivery methodology designed to eliminate surprises and keep projects on track.
          </p>
        </div>

        {/* 4-Phase Workflow Navigation Tabs (Pure Tailwind CSS Labels) */}
        <div className="w-full max-w-3xl mx-auto mb-10">
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {/* Tab 1 */}
            <label
              htmlFor="phase-1"
              className="phase-tab-1 flex flex-col items-center text-center cursor-pointer transition-colors group focus:outline-none text-gray-400 hover:text-gray-200"
            >
              <span className="phase-dot-1 w-3 h-3 rounded-full mb-3 transition-all duration-200 bg-[#0E1526] border border-[#2B3A5A] group-hover:border-gray-500" />
              <span className="text-xs sm:text-[13.5px] leading-tight">
                Team Requirement
              </span>
            </label>

            {/* Tab 2 */}
            <label
              htmlFor="phase-2"
              className="phase-tab-2 flex flex-col items-center text-center cursor-pointer transition-colors group focus:outline-none text-gray-400 hover:text-gray-200"
            >
              <span className="phase-dot-2 w-3 h-3 rounded-full mb-3 transition-all duration-200 bg-[#0E1526] border border-[#2B3A5A] group-hover:border-gray-500" />
              <span className="text-xs sm:text-[13.5px] leading-tight">
                Onboarding
              </span>
            </label>

            {/* Tab 3 */}
            <label
              htmlFor="phase-3"
              className="phase-tab-3 flex flex-col items-center text-center cursor-pointer transition-colors group focus:outline-none text-gray-400 hover:text-gray-200"
            >
              <span className="phase-dot-3 w-3 h-3 rounded-full mb-3 transition-all duration-200 bg-[#0E1526] border border-[#2B3A5A] group-hover:border-gray-500" />
              <span className="text-xs sm:text-[13.5px] leading-tight">
                Productivity Phase
              </span>
            </label>

            {/* Tab 4 */}
            <label
              htmlFor="phase-4"
              className="phase-tab-4 flex flex-col items-center text-center cursor-pointer transition-colors group focus:outline-none text-gray-400 hover:text-gray-200"
            >
              <span className="phase-dot-4 w-3 h-3 rounded-full mb-3 transition-all duration-200 bg-[#0E1526] border border-[#2B3A5A] group-hover:border-gray-500" />
              <span className="text-xs sm:text-[13.5px] leading-tight">
                Quality Control
              </span>
            </label>
          </div>
        </div>

        {/* Active Content Card */}
        <div className="w-full relative bg-[#0E1526]/95 border border-orange-500/30 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
          {/* Top-Left Corner Accent Bracket ┌ */}
          <div
            className="absolute top-3 left-3 w-3.5 h-3.5 border-t-[1.5px] border-l-[1.5px] border-orange-500/60 rounded-tl-[3px] pointer-events-none"
            aria-hidden="true"
          />
          {/* Bottom-Right Corner Accent Bracket ┘ */}
          <div
            className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-[1.5px] border-r-[1.5px] border-orange-500/60 rounded-br-[3px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Internal Grid & Center Glow */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Phase 1 Pane */}
          <div className="phase-pane-1 hidden relative z-10 grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-orange-500/10 border border-orange-500/30 text-[#FF6B00] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                PHASE 01
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-3">
                Team Requirement
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                Define your technical stack, domain scope, and seniority expectations. We match verified senior software engineers tailored precisely to your architecture.
              </p>
            </div>

            <div className="lg:col-span-5 w-full flex flex-col justify-center divide-y divide-gray-800/80">
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  01
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Define technical stack &amp; domain scope
                </span>
              </div>
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  02
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Evaluate seniority expectations
                </span>
              </div>
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  03
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Match verified senior software engineers
                </span>
              </div>
            </div>
          </div>

          {/* Phase 2 Pane */}
          <div className="phase-pane-2 hidden relative z-10 grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-orange-500/10 border border-orange-500/30 text-[#FF6B00] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                PHASE 02
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-3">
                Rapid Onboarding &amp; Setup
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                Sprint kickoff, repo provisioning, secure access integration, and architectural alignment within 48 hours without friction.
              </p>
            </div>

            <div className="lg:col-span-5 w-full flex flex-col justify-center divide-y divide-gray-800/80">
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  01
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Sprint kickoff &amp; repo provisioning
                </span>
              </div>
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  02
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Secure access integration
                </span>
              </div>
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  03
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Architectural alignment within 48 hours
                </span>
              </div>
            </div>
          </div>

          {/* Phase 3 Pane */}
          <div className="phase-pane-3 hidden relative z-10 grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-orange-500/10 border border-orange-500/30 text-[#FF6B00] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                PHASE 03
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-3">
                Full Velocity Execution
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                Daily async syncs, sprint milestone tracking, clean PR reviews, and automated CI/CD deployment pipelines operating at enterprise velocity.
              </p>
            </div>

            <div className="lg:col-span-5 w-full flex flex-col justify-center divide-y divide-gray-800/80">
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  01
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Daily async syncs &amp; milestone tracking
                </span>
              </div>
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  02
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Clean PR code reviews
                </span>
              </div>
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  03
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Automated CI/CD deployment pipelines
                </span>
              </div>
            </div>
          </div>

          {/* Phase 4 Pane */}
          <div className="phase-pane-4 hidden relative z-10 grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-orange-500/10 border border-orange-500/30 text-[#FF6B00] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                PHASE 04
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-3">
                Continuous Quality Control
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                End-to-end automated testing, security audits, performance profiling, and milestone sign-offs ensuring production-grade stability.
              </p>
            </div>

            <div className="lg:col-span-5 w-full flex flex-col justify-center divide-y divide-gray-800/80">
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  01
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  End-to-end automated testing
                </span>
              </div>
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  02
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Security audits &amp; performance profiling
                </span>
              </div>
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#FF6B00] tracking-wider shrink-0">
                  03
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-normal">
                  Production-grade milestone sign-offs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

