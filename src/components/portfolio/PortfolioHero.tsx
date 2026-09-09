import React from "react";
import Link from "next/link";

export default function PortfolioHero() {
  return (
    <section
      id="portfolio-hero-section"
      className="w-full bg-[#0B1120] py-12 lg:py-16 px-6 lg:px-16 relative overflow-hidden"
    >
      {/* Ambient Orange Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,107,0,0.17)_0%,rgba(255,107,0,0.05)_45%,rgba(11,17,32,0)_70%),radial-gradient(circle_at_0%_50%,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.05)_40%,rgba(11,17,32,0)_65%),radial-gradient(circle_at_100%_50%,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.05)_40%,rgba(11,17,32,0)_65%)]"
      />
      {/* Subtle 36px Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.035]"
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
        {/* Left Column */}
        <div className="w-full lg:w-1/2">
          <div className="text-[11px] font-semibold uppercase tracking-[3px] text-[#AEB6C2] mb-2.5">
            FLAGSHIP CASE STUDIES &amp; PROVEN ARCHITECTURES
          </div>
          <div className="w-[60px] h-[2px] bg-[#FF6B00] opacity-80 mb-6" />
          <h1 className="text-[34px] sm:text-[46px] font-extrabold text-white leading-[1.1] mb-1 tracking-tight">
            Architectural Mastery.
          </h1>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-white leading-[1.2] mb-4 tracking-tight">
            Proven Business Impact.
          </h2>
          <p className="text-base font-normal text-white/75 leading-[1.7] max-w-[520px] mb-7">
            In-depth case studies documenting how Creed Tech engineers mission-critical infrastructure,
            multi-region database replication, private LLMs, and enterprise-grade security platforms —
            delivering measurable outcomes for global enterprises.
          </p>
          <Link
            href="#portfolio-case-studies"
            className="inline-block bg-[#0052FF] hover:bg-[#0042D0] text-white text-sm font-semibold px-8 py-4 rounded transition-colors"
          >
            View Case Studies
          </Link>
        </div>

        {/* Right Column - 4 Stat Cards */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-[14px] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-[#FF6B00]/40 transition-all text-left">
            <svg
              className="w-6 h-6 text-[#00F0FF]/70 mb-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-xl sm:text-[26px] font-bold text-white block leading-[1.1] mb-0.5">
              End-to-End
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 block">
              Project Delivery
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-[14px] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-[#FF6B00]/40 transition-all text-left">
            <svg
              className="w-6 h-6 text-[#00F0FF]/70 mb-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <p className="text-xl sm:text-[26px] font-bold text-white block leading-[1.1] mb-0.5">
              Security-First
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 block">
              Engineering
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-[14px] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-[#FF6B00]/40 transition-all text-left">
            <svg
              className="w-6 h-6 text-[#00F0FF]/70 mb-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="text-xl sm:text-[26px] font-bold text-white block leading-[1.1] mb-0.5">
              Reliable
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 block">
              Delivery
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-[14px] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-[#FF6B00]/40 transition-all text-left">
            <svg
              className="w-6 h-6 text-[#00F0FF]/70 mb-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <p className="text-xl sm:text-[26px] font-bold text-white block leading-[1.1] mb-0.5">
              Quality-Driven
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 block">
              Development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
