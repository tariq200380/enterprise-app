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

      {/* Why Senior Engineers Thrive at Creed Tech Section */}
      <section className="w-full bg-[#FAFBFC] border-t border-gray-200/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
            Why Senior Engineers Thrive at Creed Tech
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            We built the engineering organization we always wished we had: intellectual rigor, sovereign autonomy, and genuine respect for deep technical craftsmanship.
          </p>

          {/* 6 Benefits Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16 text-left">
            {/* Card 1: Autonomous Senior Pods */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50/80 border border-amber-100/80 flex items-center justify-center text-lg mb-4">
                  ⚡
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Autonomous Senior Pods
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-2.5 leading-relaxed font-normal">
                  No non-technical layers assigning arbitrary tickets. You partner directly with client engineering leaders and make architectural choices with sovereign authority.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] sm:text-xs font-semibold text-[#0052FF]">
                Lead-Level Ownership &bull; Zero Micromanagement
              </div>
            </div>

            {/* Card 2: Deep Asynchronous Focus */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50/80 border border-emerald-100/80 flex items-center justify-center text-lg mb-4">
                  🧘
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Deep Asynchronous Focus
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-2.5 leading-relaxed font-normal">
                  We default to clear written RFCs, technical briefs, and asynchronous reviews. We protect 4+ continuous hours of daily deep maker time with zero meeting intrusions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] sm:text-xs font-semibold text-[#10B981]">
                RFC-Driven &bull; Minimal Meeting Fatigue
              </div>
            </div>

            {/* Card 3: Top-Tier Global Compensation */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50/80 border border-blue-100/80 flex items-center justify-center text-lg mb-4">
                  💎
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Top-Tier Global Compensation
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-2.5 leading-relaxed font-normal">
                  We calibrate compensation against top global technology hubs. We benchmark salaries transparently against US/European tier-1 levels regardless of where you live.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] sm:text-xs font-semibold text-[#6366F1]">
                Global Tier-1 Banding &bull; Regular Reviews
              </div>
            </div>

            {/* Card 4: $5K Gear & Ergonomics Stipend */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100/80 border border-slate-200/80 flex items-center justify-center text-lg mb-4">
                  💻
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  $5K Gear &amp; Ergonomics Stipend
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-2.5 leading-relaxed font-normal">
                  Choose your battle station: Apple MacBook Pro Max, custom Linux Threadripper workstation, Studio Display, and Herman Miller seating stipend refreshed biennially.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
                Top-Spec Hardware &bull; Ergonomic Support
              </div>
            </div>

            {/* Card 5: Annual Learning & Research Fund */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50/80 border border-blue-100/80 flex items-center justify-center text-lg mb-4">
                  🎓
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Annual Learning &amp; Research Fund
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-2.5 leading-relaxed font-normal">
                  Continuous growth is an absolute requirement. Dedicated annual funds for international technical conferences (RustConf, KubeCon, NeurIPS), certifications, and book allowances.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] sm:text-xs font-semibold text-[#0052FF]">
                Conferences &bull; Open-Source Sponsorship
              </div>
            </div>

            {/* Card 6: Comprehensive Health & Unlimited PTO */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50/80 border border-emerald-100/80 flex items-center justify-center text-lg mb-4">
                  🛡️
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Comprehensive Health &amp; Unlimited PTO
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-2.5 leading-relaxed font-normal">
                  Full worldwide private health, dental, and vision insurance coverage. Flexible paid time off with mandatory 25+ days minimum annual rest to prevent burn-out.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] sm:text-xs font-semibold text-[#E11D48]">
                Worldwide Coverage &bull; Mandatory Rest Policy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Active Pod Openings & Upcoming Roles Section */}
      <section id="roles" className="w-full bg-white border-t border-gray-200/80 py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Badge */}
          <span className="text-xs font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
            OPEN ENGINEERING VACANCIES
          </span>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
            Explore Active Pod Openings &amp; Upcoming Roles
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            Join an active hiring cycle or register for priority notification on upcoming engineering pod positions.
          </p>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 max-w-4xl mx-auto">
            <button
              type="button"
              className="bg-[#0052FF] text-white text-xs font-semibold px-4 py-2 rounded-md shadow-xs transition-colors cursor-pointer"
            >
              All Departments
            </button>
            <button
              type="button"
              className="bg-white hover:bg-gray-50 text-gray-600 text-xs font-medium px-4 py-2 rounded-md border border-gray-200/80 transition-colors cursor-pointer"
            >
              Engineering
            </button>
            <button
              type="button"
              className="bg-white hover:bg-gray-50 text-gray-600 text-xs font-medium px-4 py-2 rounded-md border border-gray-200/80 transition-colors cursor-pointer"
            >
              AI &amp; Machine Learning
            </button>
            <button
              type="button"
              className="bg-white hover:bg-gray-50 text-gray-600 text-xs font-medium px-4 py-2 rounded-md border border-gray-200/80 transition-colors cursor-pointer"
            >
              UI/UX &amp; Design
            </button>
            <button
              type="button"
              className="bg-white hover:bg-gray-50 text-gray-600 text-xs font-medium px-4 py-2 rounded-md border border-gray-200/80 transition-colors cursor-pointer"
            >
              Cloud &amp; SRE
            </button>
            <button
              type="button"
              className="bg-white hover:bg-gray-50 text-gray-600 text-xs font-medium px-4 py-2 rounded-md border border-gray-200/80 transition-colors cursor-pointer"
            >
              Solutions &amp; Growth
            </button>
          </div>

          {/* Job Openings Cards List */}
          <div className="flex flex-col gap-4 sm:gap-5 mt-10 sm:mt-12 max-w-6xl mx-auto text-left">
            {/* Job Card 1: Senior Product Designer */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-blue-50 text-[#0052FF] border border-blue-100/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    UI/UX &amp; DESIGN
                  </span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/60 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                    REMOTE (GLOBAL)
                  </span>
                  <span className="bg-amber-50 text-amber-600 border border-amber-200/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    ANNOUNCEMENT COMING SOON
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-3 tracking-tight">
                  Senior Product Designer (Design Systems &amp; WCAG AAA)
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed font-normal">
                  Own the visual and interactive systems for complex enterprise portals, dashboards, and mobile applications.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Figma</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Design Systems</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">WCAG AAA</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Prototyping</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">User Research</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all duration-200 shrink-0 self-start md:self-center"
              >
                <span>🔔</span>
                <span>Register for Alert</span>
              </Link>
            </div>

            {/* Job Card 2: Cloud DevOps & SRE Architect */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-blue-50 text-[#0052FF] border border-blue-100/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    CLOUD &amp; INFRASTRUCTURE
                  </span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/60 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                    REMOTE (GLOBAL)
                  </span>
                  <span className="bg-amber-50 text-amber-600 border border-amber-200/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    ANNOUNCEMENT COMING SOON
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-3 tracking-tight">
                  Cloud DevOps &amp; SRE Architect (Kubernetes &amp; Terraform)
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed font-normal">
                  Architect multi-cloud, automated, self-healing infrastructure with zero configuration drift and 99.99% SLA.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">AWS</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Kubernetes</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Terraform</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Datadog</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">CI/CD</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Docker</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all duration-200 shrink-0 self-start md:self-center"
              >
                <span>🔔</span>
                <span>Register for Alert</span>
              </Link>
            </div>

            {/* Job Card 3: Solutions Architect & Technical Engagement Lead */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-blue-50 text-[#0052FF] border border-blue-100/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    SOLUTIONS &amp; GROWTH
                  </span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/60 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                    REMOTE / SAN FRANCISCO (USA)
                  </span>
                  <span className="bg-amber-50 text-amber-600 border border-amber-200/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    ANNOUNCEMENT COMING SOON
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-3 tracking-tight">
                  Solutions Architect &amp; Technical Engagement Lead
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed font-normal">
                  Bridge client business goals with engineering execution by leading technical discovery and architectural scoping.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Solutions Architecture</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Technical Scoping</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Cloud</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Client Pods</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all duration-200 shrink-0 self-start md:self-center"
              >
                <span>🔔</span>
                <span>Register for Alert</span>
              </Link>
            </div>

            {/* Job Card 4: Principal AI & LLM Systems Engineer */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-blue-50 text-[#0052FF] border border-blue-100/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    AI &amp; MACHINE LEARNING
                  </span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/60 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                    REMOTE / LONDON (UK)
                  </span>
                  <span className="bg-amber-50 text-amber-600 border border-amber-200/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    ANNOUNCEMENT COMING SOON
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-3 tracking-tight">
                  Principal AI &amp; LLM Systems Engineer (PyTorch &amp; CUDA)
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed font-normal">
                  Develop and deploy sovereign fine-tuned open-source LLM inference clusters on private on-prem GPU hardware.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">PyTorch</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">vLLM</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">CUDA</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Python</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Triton</span>
                  <span className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">Ollama</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all duration-200 shrink-0 self-start md:self-center"
              >
                <span>🔔</span>
                <span>Register for Alert</span>
              </Link>
            </div>
          </div>

          {/* Don't see your exact engineering domain? Bottom Box */}
          <div className="mt-8 rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left max-w-6xl mx-auto shadow-xs">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Don&apos;t see your exact engineering domain?
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 max-w-2xl leading-relaxed font-normal">
                Register your coordinates with our Senior Talent Network. When new high-concurrency or AI pod requirements open, we contact registered candidates before public job listings.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.99] transition-all duration-200 shrink-0 whitespace-nowrap"
            >
              + Register in Talent Network
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
