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

const FEATURES = [
  { tag: "WORK MODEL", title: "100% Remote & Async", desc: "Germany • Spain • USA • Global Hubs", color: "text-[#0052FF]" },
  { tag: "HIRING SLA", title: "7-Day Total Cycle", desc: "Zero ghosting • Paid practical challenge", color: "text-[#10B981]" },
  { tag: "HARDWARE ALLOWANCE", title: "$5,000 Gear Budget", desc: "Apple M-Max / Threadripper + 4K OLED", color: "text-[#FF6B00]" },
  { tag: "AUTONOMY LEVEL", title: "Direct Architect-to-Client", desc: "Zero non-technical middle layers", color: "text-[#0F172A]" },
];

const STAGES = [
  { num: "01", stage: "STAGE 1 • 30 MINUTES", title: "Architectural & Values Alignment Call", desc: "An informal, high-level conversation with a Principal Systems Architect. We discuss your technical philosophy, past distributed systems work, and your ideal pod setup.", perk: "✓ Feedback in < 24 Hours", numColor: "text-[#0052FF]", perkColor: "text-[#10B981]" },
  { num: "02", stage: "STAGE 2 • COMPENSATED", title: "Paid Practical Code & System Challenge", desc: "A realistic take-home architecture or coding task mirroring real-world client challenges. We respect your effort and compensate your time regardless of outcome.", perk: "💰 Paid Stipend Provided", numColor: "text-[#FF6B00]", perkColor: "text-[#D97706]" },
  { num: "03", stage: "STAGE 3 • 45 MINUTES", title: "Interactive Design & Solution Teardown", desc: "A collaborative review session with our Technical Founders to walk through trade-offs, edge-case tuning, scalability bottlenecks, and distributed consensus decisions.", perk: "🤝 Peer-to-Peer Dialogue", numColor: "text-[#6366F1]", perkColor: "text-[#0052FF]" },
  { num: "04", stage: "STAGE 4 • < 48 HOURS", title: "Formal Offer & Custom Hardware Kit", desc: "We present a transparent global compensation offer, equity parameters, and dispatch your $5k custom hardware & ergonomics package prior to your day-one onboarding.", perk: "🎉 Zero Bureaucracy Offer", numColor: "text-[#10B981]", perkColor: "text-[#10B981]" },
];

const BENEFITS = [
  { icon: "⚡", title: "Autonomous Senior Pods", desc: "No non-technical layers assigning arbitrary tickets. You partner directly with client engineering leaders and make architectural choices with sovereign authority.", tag: "Lead-Level Ownership • Zero Micromanagement", iconBg: "bg-amber-50/80 border-amber-100/80", tagColor: "text-[#0052FF]" },
  { icon: "🧘", title: "Deep Asynchronous Focus", desc: "We default to clear written RFCs, technical briefs, and asynchronous reviews. We protect 4+ continuous hours of daily deep maker time with zero meeting intrusions.", tag: "RFC-Driven • Minimal Meeting Fatigue", iconBg: "bg-emerald-50/80 border-emerald-100/80", tagColor: "text-[#10B981]" },
  { icon: "💎", title: "Top-Tier Global Compensation", desc: "We calibrate compensation against top global technology hubs. We benchmark salaries transparently against US/European tier-1 levels regardless of where you live.", tag: "Global Tier-1 Banding • Regular Reviews", iconBg: "bg-blue-50/80 border-blue-100/80", tagColor: "text-[#6366F1]" },
  { icon: "💻", title: "$5K Gear & Ergonomics Stipend", desc: "Choose your battle station: Apple MacBook Pro Max, custom Linux Threadripper workstation, Studio Display, and Herman Miller seating stipend refreshed biennially.", tag: "Top-Spec Hardware • Ergonomic Support", iconBg: "bg-slate-100/80 border-slate-200/80", tagColor: "text-[#FF6B00]" },
  { icon: "🎓", title: "Annual Learning & Research Fund", desc: "Continuous growth is an absolute requirement. Dedicated annual funds for international technical conferences (RustConf, KubeCon, NeurIPS), certifications, and book allowances.", tag: "Conferences • Open-Source Sponsorship", iconBg: "bg-blue-50/80 border-blue-100/80", tagColor: "text-[#0052FF]" },
  { icon: "🛡️", title: "Comprehensive Health & Unlimited PTO", desc: "Full worldwide private health, dental, and vision insurance coverage. Flexible paid time off with mandatory 25+ days minimum annual rest to prevent burn-out.", tag: "Worldwide Coverage • Mandatory Rest Policy", iconBg: "bg-emerald-50/80 border-emerald-100/80", tagColor: "text-[#E11D48]" },
];

const FAQS = [
  {
    q: "How does Creed Tech handle remote work and time zones?",
    a: "We are 100% remote-first and asynchronous. We have team members across Germany, Spain, USA, and global time zones. Rather than demanding rigid 9-to-5 schedules, we require a minimum 3-hour daily overlap with your pod and rely on high-fidelity written documentation (RFCs and PR walkthroughs).",
    defaultOpen: true,
  },
  {
    q: "Is the take-home technical challenge really paid?",
    a: "Yes, unconditionally. We respect the time and effort required to craft architectural solutions. Candidates who complete our practical take-home challenge receive an honorarium stipend regardless of whether we move forward with an offer.",
  },
  {
    q: "What contract and employment types do you offer?",
    a: "We accommodate both full-time permanent contracts through global Employer of Record (EOR) entities in 80+ countries and B2B contractor arrangements with flexible invoicing, depending on your tax and location preferences.",
  },
  {
    q: "What hardware and software stack do you support?",
    a: "Engineers receive a $5,000 hardware stipend to configure their choice of Apple Silicon (M3/M4 Max) or custom Linux workstations with high-refresh 4K displays and ergonomic seating. You also receive full access to commercial AI tooling (Copilot, Claude Enterprise) and sovereign cloud dev environments.",
  },
  {
    q: "What happens after I submit a Vacancy Alert registration?",
    a: "Your profile is privately indexed in our Principal Talent Registry. When our partners spin up a dedicated engineering pod in your domain, our technical founders reach out to you directly before any role is published publicly.",
  },
];

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
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.14] max-w-4xl mx-auto">
          Build Digital Infrastructure That Endures. Not Just Demos.
        </h1>
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We are an autonomous collective of principal systems architects, AI engineers, and design artisans. Zero micromanagement, zero bureaucratic sprawl, and zero throwaway code.
        </p>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-14 text-left">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">{f.tag}</span>
                <h3 className={`text-lg sm:text-xl font-bold ${f.color} mt-3 tracking-tight`}>{f.title}</h3>
              </div>
              <p className="text-xs text-gray-500 mt-3 font-normal">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12">
          <Link
            href="#roles"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            Explore Open Engineering Roles &darr;
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold border border-gray-200 shadow-xs transition-all duration-200"
          >
            Register for Vacancy Alert
          </Link>
        </div>
      </section>

      {/* 4-Stage Hiring Process */}
      <section className="w-full bg-white border-t border-gray-200/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
            TRANSPARENT &amp; COMPENSATED
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
            Our 4-Stage Respectful Hiring Process
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            We value your craftsmanship and your time. No whiteboard trick riddles, no 8-round fatigue loops. Total turnaround time is strictly under 7 business days.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16 text-left">
            {STAGES.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className={`text-3xl sm:text-4xl font-extrabold ${s.numColor} block tracking-tight`}>{s.num}</span>
                  <span className={`text-[11px] font-bold ${s.numColor} uppercase tracking-wider mt-3 block`}>{s.stage}</span>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2 leading-snug">{s.title}</h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-3 leading-relaxed font-normal">{s.desc}</p>
                </div>
                <div className={`mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold ${s.perkColor}`}>
                  {s.perk}
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Banner */}
          <div className="mt-10 sm:mt-12 rounded-xl bg-[#F4F8FF] border border-[#D3E4FE] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="shrink-0 text-[#6B9AD6]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#93C5FD" fillOpacity="0.3" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#1E3A8A]">The Creed Tech Hiring Guarantee</h4>
                <p className="text-xs sm:text-[13px] text-gray-600 mt-0.5 font-normal">
                  Every candidate receives personalized feedback from a Principal Architect within 24 hours of every interview stage.
                </p>
              </div>
            </div>
            <Link
              href="#roles"
              className="text-xs sm:text-sm font-semibold text-[#0052FF] hover:text-blue-700 hover:underline transition-colors shrink-0 sm:ml-4 inline-flex items-center gap-1"
            >
              <span>View Upcoming Roles</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Senior Engineers Thrive */}
      <section className="w-full bg-[#FAFBFC] border-t border-gray-200/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
            Why Senior Engineers Thrive at Creed Tech
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            We built the engineering organization we always wished we had: intellectual rigor, sovereign autonomy, and genuine respect for deep technical craftsmanship.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16 text-left">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className={`w-10 h-10 rounded-lg ${b.iconBg} flex items-center justify-center text-lg mb-4`}>
                    {b.icon}
                  </div>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">{b.title}</h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-2.5 leading-relaxed font-normal">{b.desc}</p>
                </div>
                <div className={`mt-6 pt-4 border-t border-gray-100 text-[11px] sm:text-xs font-semibold ${b.tagColor}`}>
                  {b.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Roles Section */}
      <UpcomingRolesSection initialDbJobs={dbJobs} />

      {/* Frequently Asked Questions */}
      <section className="w-full bg-[#FAFBFC] border-t border-gray-200/80 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
            CANDIDATE QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-2xl mx-auto">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            Direct answers regarding our hiring process, equipment, working hours, and contracts.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col gap-3.5 max-w-4xl mx-auto text-left">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                open={faq.defaultOpen}
                className="group bg-white rounded-xl border border-gray-200/90 p-5 sm:p-6 shadow-xs transition-all duration-200"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] hover:text-[#0052FF] transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-base text-gray-400 group-open:hidden">+</span>
                  <span className="text-base text-gray-400 hidden group-open:inline">&minus;</span>
                </summary>
                <p className="mt-3.5 text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal border-t border-gray-100 pt-3.5">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Founder Hotline */}
      <section className="w-full bg-[#071120] py-20 sm:py-28 text-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#0052FF]/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] sm:text-xs font-bold text-[#3B82F6] tracking-widest uppercase block mb-3">
            DIRECT FOUNDER HOTLINE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Have a specialized systems architecture proposal?
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed font-normal">
            If you are an exceptional engineer, cryptographer, or distributed systems architect, you can bypass standard recruiting and email our Founders directly.
          </p>
          <div className="mt-8 sm:mt-10">
            <a
              href="mailto:careers@creed-tech.com"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs sm:text-sm font-semibold shadow-md transition-all duration-200 cursor-pointer"
            >
              Email Technical Profile &bull; careers@creed-tech.com &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
