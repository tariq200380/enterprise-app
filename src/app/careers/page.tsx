import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers & Engineering Pods | CREED TECH",
  description:
    "Build digital infrastructure that endures. We are an autonomous collective of principal systems architects, AI engineers, and design artisans.",
};

export default function CareersPage() {
  return (
    <div className="w-full bg-[#FAFBFC] border-b border-gray-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 text-center">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.14] max-w-4xl mx-auto">
          Build Digital Infrastructure That Endures. Not Just Demos.
        </h1>

        {/* Subtitle Description */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We are an autonomous collective of principal systems architects, AI engineers, and design artisans. Zero micromanagement, zero bureaucratic sprawl, and zero throwaway code.
        </p>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-14 text-left">
          {/* Card 1: Work Model */}
          <div className="bg-white rounded-xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                WORK MODEL
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0052FF] mt-3 tracking-tight">
                100% Remote &amp; Async
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-3 font-normal">
              Germany &bull; Spain &bull; USA &bull; Global Hubs
            </p>
          </div>

          {/* Card 2: Hiring SLA */}
          <div className="bg-white rounded-xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                HIRING SLA
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#10B981] mt-3 tracking-tight">
                7-Day Total Cycle
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-3 font-normal">
              Zero ghosting &bull; Paid practical challenge
            </p>
          </div>

          {/* Card 3: Hardware Allowance */}
          <div className="bg-white rounded-xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                HARDWARE ALLOWANCE
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#FF6B00] mt-3 tracking-tight">
                $5,000 Gear Budget
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-3 font-normal">
              Apple M-Max / Threadripper + 4K OLED
            </p>
          </div>

          {/* Card 4: Autonomy Level */}
          <div className="bg-white rounded-xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                AUTONOMY LEVEL
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-3 tracking-tight">
                Direct Architect-to-Client
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-3 font-normal">
              Zero non-technical middle layers
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12">
          <Link
            href="#roles"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-blue-500/25 active:scale-[0.99] transition-all duration-200"
          >
            Explore Open Engineering Roles &darr;
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold border border-gray-200 shadow-xs hover:border-gray-300 active:scale-[0.99] transition-all duration-200"
          >
            Register for Vacancy Alert
          </Link>
        </div>
      </section>
    </div>
  );
}
