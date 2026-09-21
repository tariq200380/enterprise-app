import React from "react";
import Link from "next/link";

export default function AboutMetricsSection() {
  return (
    <section className="w-full py-10 sm:py-12 text-center border-b border-[#E2E8F0] bg-[#F7F6F5]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-10 sm:mb-12 text-center">
          <div className="text-[11px] text-[#3D6BFF] font-semibold uppercase tracking-wider mb-3">
            DATA DRIVEN &bull; PROVEN RESULTS
          </div>
          <h2 className="font-outfit text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-[1.15] mb-4">
            Leading you to digital growth
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7] font-normal">
            Our proven expertise and cutting-edge technology have driven measurable success —
            see the numbers that showcase our impact.
          </p>
        </div>

        {/* 4-Item Dark Telemetry Metrics Box (Matching Portfolio Theme) */}
        <div className="relative bg-[#0B1120] text-white border border-white/10 rounded-2xl p-6 sm:p-8 max-w-[860px] mx-auto mb-10 shadow-xl overflow-hidden text-left">
          {/* Ambient Orange Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.18)_0%,transparent_60%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.03]"
          />

          {/* Header bar */}
          <div className="relative z-10 flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs text-white/50">
            <span className="flex items-center gap-2 text-white font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
              DELIVERY TELEMETRY &bull; REAL-TIME METRICS
            </span>
            <span className="text-[11px] font-semibold text-orange-400 tracking-wider">VERIFIED METRICS v4.8</span>
          </div>

          {/* 4 Direct Stat Cards (Simple JSX, No Complex JS Array) */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 text-center">
            {/* Stat 1: Job success rate */}
            <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] hover:border-orange-500/40 transition-all">
              <svg className="mx-auto mb-2 w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2 L14.6 8.8 L22 9.3 L16.3 13.9 L18.2 21 L12 17 L5.8 21 L7.7 13.9 L2 9.3 L9.4 8.8 Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              <div className="font-outfit text-2xl sm:text-3xl font-bold text-white mb-1">
                99%
              </div>
              <div className="text-[11.5px] text-slate-300 font-semibold">
                Job success rate
              </div>
            </div>

            {/* Stat 2: Working hours */}
            <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] hover:border-orange-500/40 transition-all">
              <svg className="mx-auto mb-2 w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <div className="font-outfit text-2xl sm:text-3xl font-bold text-white mb-1">
                15,000+
              </div>
              <div className="text-[11.5px] text-slate-300 font-semibold">
                Working hours
              </div>
            </div>

            {/* Stat 3: Satisfied clients */}
            <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] hover:border-orange-500/40 transition-all">
              <svg className="mx-auto mb-2 w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 21 C4 15 8 13 12 13 C16 13 20 15 20 21"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <div className="font-outfit text-2xl sm:text-3xl font-bold text-white mb-1">
                300+
              </div>
              <div className="text-[11.5px] text-slate-300 font-semibold">
                Satisfied clients
              </div>
            </div>

            {/* Stat 4: Professional team */}
            <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] hover:border-orange-500/40 transition-all">
              <svg className="mx-auto mb-2 w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="8" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2 21c0-4.5 2.7-7 6-7s6 2.5 6 7M12 21c0-4.5 2.2-7 5-7s5 2.5 5 7" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <div className="font-outfit text-2xl sm:text-3xl font-bold text-white mb-1">
                80+
              </div>
              <div className="text-[11.5px] text-slate-300 font-semibold">
                Professional team
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-center bg-[#0F172A] hover:bg-[#1B3A8C] text-[#F7F6F5] h-12 w-full sm:w-[260px] rounded-lg text-[13px] font-semibold tracking-wider uppercase border border-[#0F172A] transition-colors shadow-sm cursor-pointer"
          >
            Get free consultation &rarr;
          </Link>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center text-center h-12 w-full sm:w-[260px] rounded-lg text-[13px] font-semibold tracking-wider uppercase border border-[#CBD5E1] hover:border-[#0F172A] text-[#0F172A] bg-white transition-colors shadow-xs cursor-pointer"
          >
            Hire top talent
          </Link>
        </div>
      </div>
    </section>
  );
}
