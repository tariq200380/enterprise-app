import React from "react";

export default function AboutCreedCodeSection() {
  return (
    <section className="bg-[#0B1120] text-white py-10 sm:py-12 border-b border-white/10 relative overflow-hidden text-left">
      {/* Ambient Orange Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0.04)_45%,transparent_70%)]"
      />
      {/* Subtle 32px Grid Lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03]"
      />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="max-w-[680px] mx-auto mb-10 sm:mb-14 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#EA580C] mb-3">
            THE CREED CODE
          </div>
          <h2 className="font-outfit text-2xl sm:text-4xl font-bold text-white tracking-tight leading-[1.15] mb-4">
            Our four pillars of uncompromising engineering
          </h2>
          <p className="text-white/70 text-[15.5px] leading-[1.7] font-normal">
            The fundamental principles that govern every technical decision, sprint review, and
            architectural deployment at Creed Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {/* Pillar 01 */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white/[0.07] transition-all shadow-lg group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-outfit text-2xl font-bold text-[#EA580C]">01</span>
                <span className="text-[11px] font-semibold text-white/80 border border-white/15 bg-white/10 px-2.5 py-1 rounded-[4px] tracking-wider uppercase">
                  Pillar of excellence
                </span>
              </div>
              <h3 className="font-outfit font-bold text-xl text-white mb-1.5 tracking-tight">
                Architectural integrity over shortcuts
              </h3>
              <div className="text-[#EA580C] text-[13px] font-semibold mb-3.5">
                We build for decades, not for quick demos.
              </div>
              <p className="text-slate-300 text-sm leading-[1.65] mb-4 font-normal">
                Software is the central nervous system of modern business. We reject fragile
                hacks, unnecessary dependencies, and opaque abstractions — every line of code is
                structured to withstand massive scale.
              </p>
            </div>
            <div className="text-[13px] text-white/90 pt-4 border-t border-white/10 flex gap-2 items-start">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7 L5.5 10.5 L12 3" stroke="#EA580C" strokeWidth="1.8" />
              </svg>
              <span>Clean, deterministic, and self-documenting codebases.</span>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white/[0.07] transition-all shadow-lg group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-outfit text-2xl font-bold text-[#EA580C]">02</span>
                <span className="text-[11px] font-semibold text-white/80 border border-white/15 bg-white/10 px-2.5 py-1 rounded-[4px] tracking-wider uppercase">
                  Pillar of excellence
                </span>
              </div>
              <h3 className="font-outfit font-bold text-xl text-white mb-1.5 tracking-tight">
                Direct architect-to-client pairing
              </h3>
              <div className="text-[#EA580C] text-[13px] font-semibold mb-3.5">
                No layers of non-technical middlemen.
              </div>
              <p className="text-slate-300 text-sm leading-[1.65] mb-4 font-normal">
                When you collaborate with Creed Tech, your product roadmap is shaped directly by
                senior principal engineers who have built high-scale systems — eliminating
                translation friction from day one.
              </p>
            </div>
            <div className="text-[13px] text-white/90 pt-4 border-t border-white/10 flex gap-2 items-start">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7 L5.5 10.5 L12 3" stroke="#EA580C" strokeWidth="1.8" />
              </svg>
              <span>100% principal engineer involvement from kickoff to launch.</span>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white/[0.07] transition-all shadow-lg group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-outfit text-2xl font-bold text-[#EA580C]">03</span>
                <span className="text-[11px] font-semibold text-white/80 border border-white/15 bg-white/10 px-2.5 py-1 rounded-[4px] tracking-wider uppercase">
                  Pillar of excellence
                </span>
              </div>
              <h3 className="font-outfit font-bold text-xl text-white mb-1.5 tracking-tight">
                Zero-trust &amp; sovereign privacy
              </h3>
              <div className="text-[#EA580C] text-[13px] font-semibold mb-3.5">
                Security is non-negotiable; it is our foundation.
              </div>
              <p className="text-slate-300 text-sm leading-[1.65] mb-4 font-normal">
                In an era of relentless cyber threats and sensitive AI models, we treat data
                sovereignty as a fundamental duty — embedding zero-knowledge cryptography and
                immutable audit trails into every platform.
              </p>
            </div>
            <div className="text-[13px] text-white/90 pt-4 border-t border-white/10 flex gap-2 items-start">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7 L5.5 10.5 L12 3" stroke="#EA580C" strokeWidth="1.8" />
              </svg>
              <span>Cryptographic data protection built into core architecture.</span>
            </div>
          </div>

          {/* Pillar 04 */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white/[0.07] transition-all shadow-lg group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-outfit text-2xl font-bold text-[#EA580C]">04</span>
                <span className="text-[11px] font-semibold text-white/80 border border-white/15 bg-white/10 px-2.5 py-1 rounded-[4px] tracking-wider uppercase">
                  Pillar of excellence
                </span>
              </div>
              <h3 className="font-outfit font-bold text-xl text-white mb-1.5 tracking-tight">
                Empathetic craftsmanship
              </h3>
              <div className="text-[#EA580C] text-[13px] font-semibold mb-3.5">
                Engineering with a deep respect for the end user.
              </div>
              <p className="text-slate-300 text-sm leading-[1.65] mb-4 font-normal">
                Brilliant engineering means nothing if the interface creates friction. We unite
                deep backend computer science with intuitive, human-centric product design,
                creating platforms that people love.
              </p>
            </div>
            <div className="text-[13px] text-white/90 pt-4 border-t border-white/10 flex gap-2 items-start">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7 L5.5 10.5 L12 3" stroke="#EA580C" strokeWidth="1.8" />
              </svg>
              <span>Intuitive micro-interactions powered by resilient backend logic.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
