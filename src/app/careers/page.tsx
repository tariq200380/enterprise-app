import type { Metadata } from "next";
import Link from "next/link";
import UpcomingRolesSection, { DbJob } from "@/components/careers/UpcomingRolesSection";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers & Engineering Pods",
  description:
    "Build digital infrastructure that endures. We are an autonomous collective of principal systems architects, AI engineers, and design artisans.",
};

export default async function CareersPage() {
  let dbJobs: DbJob[] = [];
  try {
    const res = await query(
      "SELECT id, title, department, location, status, description, tags FROM job_openings WHERE status NOT IN ('CLOSED', 'PAUSED') ORDER BY id DESC"
    );
    dbJobs = res.rows;
  } catch (err) {
    console.error("Failed to load active jobs:", err);
  }
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
      <UpcomingRolesSection initialDbJobs={dbJobs} />

      {/* Frequently Asked Questions Section */}
      <section className="w-full bg-[#FAFBFC] border-t border-gray-200/80 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Badge */}
          <span className="text-xs font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
            CANDIDATE QUESTIONS
          </span>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-2xl mx-auto">
            Frequently Asked Questions
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            Direct answers regarding our hiring process, equipment, working hours, and contracts.
          </p>

          {/* FAQ Accordion List using pure Tailwind CSS and native details/summary */}
          <div className="mt-10 sm:mt-12 flex flex-col gap-3.5 max-w-4xl mx-auto text-left">
            {/* Question 1 (Open by default matching screenshot) */}
            <details
              open
              className="group bg-white rounded-xl border border-gray-200/90 p-5 sm:p-6 shadow-xs transition-all duration-200"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] hover:text-[#0052FF] transition-colors">
                <span>How does Creed Tech handle remote work and time zones?</span>
                <span className="text-base text-gray-400 group-open:hidden">+</span>
                <span className="text-base text-gray-400 hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal border-t border-gray-100 pt-3.5">
                We are 100% remote-first and asynchronous. We have team members across Germany, Spain, USA, and global time zones. Rather than demanding rigid 9-to-5 schedules, we require a minimum 3-hour daily overlap with your pod and rely on high-fidelity written documentation (RFCs and PR walkthroughs).
              </p>
            </details>

            {/* Question 2 */}
            <details className="group bg-white rounded-xl border border-gray-200/90 p-5 sm:p-6 shadow-xs transition-all duration-200">
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] hover:text-[#0052FF] transition-colors">
                <span>Is the take-home technical challenge really paid?</span>
                <span className="text-base text-gray-400 group-open:hidden">+</span>
                <span className="text-base text-gray-400 hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal border-t border-gray-100 pt-3.5">
                Yes, unconditionally. We respect the time and effort required to craft architectural solutions. Candidates who complete our practical take-home challenge receive an honorarium stipend regardless of whether we move forward with an offer.
              </p>
            </details>

            {/* Question 3 */}
            <details className="group bg-white rounded-xl border border-gray-200/90 p-5 sm:p-6 shadow-xs transition-all duration-200">
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] hover:text-[#0052FF] transition-colors">
                <span>What contract and employment types do you offer?</span>
                <span className="text-base text-gray-400 group-open:hidden">+</span>
                <span className="text-base text-gray-400 hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal border-t border-gray-100 pt-3.5">
                We accommodate both full-time permanent contracts through global Employer of Record (EOR) entities in 80+ countries and B2B contractor arrangements with flexible invoicing, depending on your tax and location preferences.
              </p>
            </details>

            {/* Question 4 */}
            <details className="group bg-white rounded-xl border border-gray-200/90 p-5 sm:p-6 shadow-xs transition-all duration-200">
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] hover:text-[#0052FF] transition-colors">
                <span>What hardware and software stack do you support?</span>
                <span className="text-base text-gray-400 group-open:hidden">+</span>
                <span className="text-base text-gray-400 hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal border-t border-gray-100 pt-3.5">
                Engineers receive a $5,000 hardware stipend to configure their choice of Apple Silicon (M3/M4 Max) or custom Linux workstations with high-refresh 4K displays and ergonomic seating. You also receive full access to commercial AI tooling (Copilot, Claude Enterprise) and sovereign cloud dev environments.
              </p>
            </details>

            {/* Question 5 */}
            <details className="group bg-white rounded-xl border border-gray-200/90 p-5 sm:p-6 shadow-xs transition-all duration-200">
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] hover:text-[#0052FF] transition-colors">
                <span>What happens after I submit a Vacancy Alert registration?</span>
                <span className="text-base text-gray-400 group-open:hidden">+</span>
                <span className="text-base text-gray-400 hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal border-t border-gray-100 pt-3.5">
                Your profile is privately indexed in our Principal Talent Registry. When our partners spin up a dedicated engineering pod in your domain, our technical founders reach out to you directly before any role is published publicly.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Direct Founder Hotline Section (Dark Navy with Soft Blue Glow) */}
      <section className="w-full bg-[#071120] py-20 sm:py-28 text-center text-white relative overflow-hidden">
        {/* Soft Blue Ambient Glow Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#0052FF]/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[240px] bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 45%, rgba(0, 82, 255, 0.22) 0%, rgba(0, 82, 255, 0.06) 45%, rgba(7, 17, 32, 0) 75%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Badge */}
          <span className="text-[11px] sm:text-xs font-bold text-[#3B82F6] tracking-widest uppercase block mb-3">
            DIRECT FOUNDER HOTLINE
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Have a specialized systems architecture proposal?
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed font-normal">
            If you are an exceptional engineer, cryptographer, or distributed systems architect, you can bypass standard recruiting and email our Founders directly.
          </p>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-10">
            <a
              href="mailto:careers@creed-tech.com"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              Email Technical Profile &bull; careers@creed-tech.com &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
