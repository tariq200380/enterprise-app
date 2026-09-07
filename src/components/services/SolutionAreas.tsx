import React from "react";
import Link from "next/link";

interface SolutionItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const solutions: SolutionItem[] = [
  {
    title: "Business Platforms",
    desc: "Custom systems for managing workflows information users and everyday business operations.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Customer Portals",
    desc: "Secure digital experiences that help customers access services information requests and account features.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Process Automation",
    desc: "Connected workflows that reduce repetitive steps and improve the movement of information between systems.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20v-6M6 20V10M18 20V4" />
      </svg>
    ),
  },
  {
    title: "Data Solutions",
    desc: "Structured applications for storing organizing accessing and presenting authorized business data.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    title: "Digital Commerce",
    desc: "Web and mobile experiences supporting products services payments orders and customer interactions.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
  },
  {
    title: "AI-Assisted Tools",
    desc: "Task-focused AI features developed with defined data sources validation controls and human oversight.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

export default function SolutionAreas() {
  return (
    <section id="solution-areas" className="relative w-full py-12 lg:py-16 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[52rem] mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold text-[#0F172A] tracking-[-0.02em] mb-3 leading-tight">
            Solution <span className="text-[#0052FF]">Areas</span>
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed font-normal m-0">
            Practical digital solutions designed around different operational and customer-facing business requirements.
          </p>
        </div>

        {/* 6 Solution Cards Grid (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {solutions.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out cursor-default"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-[18px] font-semibold text-[#0F172A] leading-snug m-0">
                  {item.title}
                </h3>
              </div>
              <p className="text-[15px] text-[#475569] leading-relaxed m-0 font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Center CTA Button */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="min-w-[230px] h-[52px] px-7 bg-[#0052FF] hover:bg-[#0043D6] text-white font-semibold text-[16px] rounded-[10px] inline-flex items-center justify-center gap-2 shadow-[0_2px_6px_rgba(0,82,255,0.2)] hover:-translate-y-[2px] transition-all duration-200"
          >
            <span>Explore Our Portfolio</span>
            <span className="text-[#FF6B00] font-extrabold ml-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
