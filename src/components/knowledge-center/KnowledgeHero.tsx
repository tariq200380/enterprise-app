import React from "react";
import Link from "next/link";

/* ========================================================================= */
/* KNOWLEDGE CENTER HERO SECTION                                             */
/* Features live visitor telemetry card and flagship research headlines      */
/* 100% Pure Tailwind CSS - Easy to read and edit                            */
/* ========================================================================= */
export default function KnowledgeHero() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#070D1E] text-white overflow-hidden border-b border-[#1F2937]">
      {/* Radial background glows - Pure Tailwind CSS */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_40%,rgba(0,102,255,0.25)_0%,transparent_60%),radial-gradient(circle_at_80%_60%,rgba(255,107,0,0.15)_0%,transparent_55%)]" />

      {/* Cyan grid pattern overlay - Pure Tailwind CSS */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,rgba(0,150,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,150,255,0.2)_1px,transparent_1px)]" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
          
          {/* ================================================================= */}
          {/* LEFT: TELEMETRY VISUAL CARD (Visitors, Waveform & Metrics)        */}
          {/* ================================================================= */}
          <div className="bg-white/[0.04] border border-white/[0.12] rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
            {/* Top row: Visitors counter */}
            <div className="mb-5 pb-5 border-b border-white/[0.12]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-white uppercase tracking-[0.06em]">
                  Visitors
                </span>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-white">48 hours</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white">48 hrs</span>
                  <span className="text-white font-extrabold text-[13px] bg-[rgba(37,99,235,0.4)] px-2 py-0.5 rounded border border-[rgba(37,99,235,0.6)]">
                    78 M
                  </span>
                </div>
              </div>

              {/* SVG Waveform Graph */}
              <div className="w-full h-16 sm:h-[4.5rem] relative">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 80"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 40 Q50 10 100 40 T200 40 T300 40 T400 30"
                    stroke="#00A3FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 50 Q60 25 120 50 T240 50 T360 45 T400 40"
                    stroke="#0066FF"
                    strokeWidth="1.75"
                    strokeOpacity="0.5"
                  />
                  <circle cx="100" cy="40" r="5" fill="#00A3FF" opacity="0.6">
                    <animate
                      attributeName="r"
                      values="3;6;3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.2;0.8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="100" cy="40" r="3" fill="#FFFFFF" />
                  <circle cx="300" cy="40" r="3" fill="#00A3FF" />
                </svg>
              </div>
            </div>

            {/* Bottom metrics dials */}
            <div className="grid grid-cols-2 gap-5 items-center">
              <div>
                <span className="text-[11px] text-white font-bold block mb-1 uppercase tracking-[0.04em]">
                  /Icce Visitors
                </span>
                <span className="text-3xl sm:text-[1.85rem] font-extrabold text-white tracking-[-0.03em] block leading-none">
                  142
                </span>
                <span className="text-xs text-white font-medium mt-1 block">
                  Top Articles
                </span>
              </div>

              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <span className="text-xs text-white block font-bold uppercase">
                    Top Articles
                  </span>
                  <span className="text-2xl sm:text-[1.65rem] font-extrabold text-white leading-tight">
                    73%
                  </span>
                </div>
                <div className="w-10 h-10 border-[3px] border-[rgba(34,211,238,0.25)] border-t-[#22D3EE] border-r-[#22D3EE] flex items-center justify-center shrink-0">
                  <div className="w-[7px] h-[7px] bg-[#22D3EE]" />
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT: EDITORIAL HEADLINES & FEATURED ARTICLES                    */}
          {/* ================================================================= */}
          <div className="text-left flex flex-col gap-4 sm:gap-5">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[rgba(0,163,255,0.12)] border border-[rgba(0,163,255,0.3)] rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[11px] font-extrabold text-white uppercase tracking-[0.08em]">
                FLAGSHIP RESEARCH &amp; BENCHMARKS
              </span>
            </div>

            {/* Page H1 Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold text-white tracking-[-0.03em] leading-[1.2] m-0">
              Enterprise Knowledge Center &amp; Tech Intelligence
            </h1>

            {/* Featured Articles List */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
              <div>
                <Link
                  href="/knowledge-center#article-1"
                  className="text-lg sm:text-xl lg:text-[1.55rem] font-extrabold text-white tracking-[-0.02em] leading-snug hover:underline transition-colors duration-200 block"
                >
                  The 7 Best Enterprise AI &amp; Cloud Laptops for Senior Engineers &amp; Architects
                </Link>
              </div>

              <div className="pt-3 border-t border-white/[0.12]">
                <Link
                  href="/knowledge-center#article-2"
                  className="text-[15px] sm:text-[17px] font-semibold text-white tracking-[-0.01em] leading-relaxed hover:underline transition-colors duration-200 block"
                >
                  Artificial Intelligence Development from 1950 to 1965: The Foundation of Modern AI
                </Link>
              </div>
            </div>

            {/* Sub-label footer */}
            <div className="pt-1">
              <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.12em] text-white uppercase inline-flex items-center gap-1.5">
                <span>⚡</span>
                <span>AI WRITING ASSISTANT &bull; VERIFIED INTELLIGENCE</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
