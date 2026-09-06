import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers & Engineering Pods",
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

      {/* 4-Stage Respectful Hiring Process Section */}
      <section className="w-full bg-white border-t border-gray-200/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Tag */}
          <span className="text-xs font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
            TRANSPARENT &amp; COMPENSATED
          </span>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
            Our 4-Stage Respectful Hiring Process
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            We value your craftsmanship and your time. No whiteboard trick riddles, no 8-round fatigue loops. Total turnaround time is strictly under 7 business days.
          </p>

          {/* 4 Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16 text-left">
            {/* Stage 01 */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0052FF] block tracking-tight">
                  01
                </span>
                <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider mt-3 block">
                  STAGE 1 &bull; 30 MINUTES
                </span>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2 leading-snug">
                  Architectural &amp; Values Alignment Call
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-3 leading-relaxed font-normal">
                  An informal, high-level conversation with a Principal Systems Architect. We discuss your technical philosophy, past distributed systems work, and your ideal pod setup.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
                <span>&check;</span>
                <span>Feedback in &lt; 24 Hours</span>
              </div>
            </div>

            {/* Stage 02 */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#FF6B00] block tracking-tight">
                  02
                </span>
                <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider mt-3 block">
                  STAGE 2 &bull; COMPENSATED
                </span>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2 leading-snug">
                  Paid Practical Code &amp; System Challenge
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-3 leading-relaxed font-normal">
                  A realistic take-home architecture or coding task mirroring real-world client challenges. We respect your effort and compensate your time regardless of outcome.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-[#D97706]">
                <span>💰</span>
                <span>Paid Stipend Provided</span>
              </div>
            </div>

            {/* Stage 03 */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#6366F1] block tracking-tight">
                  03
                </span>
                <span className="text-[11px] font-bold text-[#6366F1] uppercase tracking-wider mt-3 block">
                  STAGE 3 &bull; 45 MINUTES
                </span>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2 leading-snug">
                  Interactive Design &amp; Solution Teardown
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-3 leading-relaxed font-normal">
                  A collaborative review session with our Technical Founders to walk through trade-offs, edge-case tuning, scalability bottlenecks, and distributed consensus decisions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-[#0052FF]">
                <span>🤝</span>
                <span>Peer-to-Peer Dialogue</span>
              </div>
            </div>

            {/* Stage 04 */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#10B981] block tracking-tight">
                  04
                </span>
                <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider mt-3 block">
                  STAGE 4 &bull; &lt; 48 HOURS
                </span>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2 leading-snug">
                  Formal Offer &amp; Custom Hardware Kit
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-3 leading-relaxed font-normal">
                  We present a transparent global compensation offer, equity parameters, and dispatch your $5k custom hardware &amp; ergonomics package prior to your day-one onboarding.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
                <span>🎉</span>
                <span>Zero Bureaucracy Offer</span>
              </div>
            </div>
          </div>

          {/* The Creed Tech Hiring Guarantee Banner Card */}
          <div className="mt-10 sm:mt-12 rounded-xl bg-[#F4F8FF] border border-[#D3E4FE] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3.5 sm:gap-4">
              {/* Shield Icon */}
              <div className="shrink-0 text-[#6B9AD6]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#93C5FD" fillOpacity="0.3" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#1E3A8A]">
                  The Creed Tech Hiring Guarantee
                </h4>
                <p className="text-xs sm:text-[13px] text-gray-600 mt-0.5 font-normal">
                  Every candidate receives personalized feedback from a Principal Architect within 24 hours of every interview stage.
                </p>
              </div>
            </div>
            <Link
              href="#roles"
              className="text-xs sm:text-sm font-semibold text-[#0052FF] hover:text-blue-700 hover:underline transition-colors shrink-0 sm:ml-4 inline-flex items-center gap-1 whitespace-nowrap"
            >
              <span>View Upcoming Roles</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
