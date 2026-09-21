import React from "react";
import Link from "next/link";

interface AboutServicesSectionProps {
  onOpenModal?: (topic?: string) => void;
}

export default function AboutServicesSection({ onOpenModal }: AboutServicesSectionProps) {
  return (
    <section className="w-full py-10 sm:py-12 border-b border-[#E2E8F0] bg-[#F7F6F5]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-10 sm:mb-12 text-center">
          <div className="text-[11px] text-[#3D6BFF] font-semibold uppercase tracking-wider mb-3">
            SERVICES AND EXPERTISE
          </div>
          <h2 className="font-outfit text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-[1.15] mb-4">
            What we do
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7] font-normal">
            We help businesses turn technology into their biggest competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {/* Service 1: Software development (White Card) */}
          <div className="border border-[#E2E8F0] rounded-xl p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#3D6BFF]/40 transition-all">
            <div>
              <div className="w-11 h-11 rounded-[8px] flex items-center justify-center mb-6 bg-[#3D6BFF]/10">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 6 L2 12 L8 18" stroke="#3D6BFF" strokeWidth="1.8" />
                  <path d="M16 6 L22 12 L16 18" stroke="#3D6BFF" strokeWidth="1.8" />
                </svg>
              </div>
              <h3 className="font-outfit text-[19px] font-bold mb-2.5 text-[#0F172A] tracking-tight">
                Software development
              </h3>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-7 font-normal">
                Scalable, high-performance web, cloud, and enterprise software tailored to accelerate
                your business goals.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal?.("Scalable Web & Mobile Engineering")}
              className="self-start inline-flex items-center justify-center min-w-[185px] text-[13px] font-semibold text-[#F7F6F5] bg-[#0F172A] hover:bg-[#1B3A8C] px-5 py-2.5 rounded-[4px] transition-colors cursor-pointer text-center whitespace-nowrap"
            >
              Quick Inquiry
            </button>
          </div>

          {/* Service 2: AI solutions (High-Tech Dark Card with Ambient Glow) */}
          <div className="relative border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between bg-[#0B1120] text-white shadow-lg overflow-hidden group hover:border-orange-500/50 transition-all">
            {/* Ambient Orange Glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.2)_0%,transparent_60%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.03]"
            />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-[8px] flex items-center justify-center mb-6 bg-[#FF5A1F]/20 border border-[#FF5A1F]/30">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="#FF5A1F" strokeWidth="1.8" />
                  <path
                    d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                    stroke="#FF5A1F"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-outfit text-[19px] font-bold text-white tracking-tight">
                  AI solutions
                </h3>
                <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  FEATURED
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-[1.65] mb-7 font-normal">
                Smarter decision-making, predictive machine learning, and autonomous AI-driven
                automation built for enterprise workflows.
              </p>
            </div>
            <Link
              href="/services#what-we-provide"
              className="relative z-10 self-start inline-flex items-center justify-center gap-1.5 min-w-[185px] text-[13px] font-semibold text-white bg-[#EA580C] hover:bg-orange-600 px-5 py-2.5 rounded-[4px] transition-colors cursor-pointer text-center whitespace-nowrap shadow-sm"
            >
              <span>View All Services</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Service 3: Digital growth (White Card) */}
          <div className="border border-[#E2E8F0] rounded-xl p-6 sm:p-7 flex flex-col justify-between bg-white shadow-xs hover:shadow-md hover:border-[#0F7A5F]/40 transition-all">
            <div>
              <div className="w-11 h-11 rounded-[8px] flex items-center justify-center mb-6 bg-[#0F7A5F]/10">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 17 L10 10 L14 14 L21 6" stroke="#0F7A5F" strokeWidth="1.8" />
                  <path d="M15 6h6v6" stroke="#0F7A5F" strokeWidth="1.8" />
                </svg>
              </div>
              <h3 className="font-outfit text-[19px] font-bold mb-2.5 text-[#0F172A] tracking-tight">
                Digital growth
              </h3>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-7 font-normal">
                Data-driven SEO strategies, conversion rate optimization, and multi-channel brand
                scaling that maximize your digital ROI.
              </p>
            </div>
            <Link
              href="/contact"
              className="self-start inline-flex items-center justify-center gap-1.5 min-w-[185px] text-[13px] font-semibold text-[#F7F6F5] bg-[#0F172A] hover:bg-[#1B3A8C] px-5 py-2.5 rounded-[4px] transition-colors cursor-pointer text-center whitespace-nowrap"
            >
              <span>Contact Our Team</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
