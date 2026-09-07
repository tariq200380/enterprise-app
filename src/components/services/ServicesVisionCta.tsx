import React from "react";
import Link from "next/link";

export default function ServicesVisionCta() {
  return (
    <section className="relative w-full py-10 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[850px] mx-auto text-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-[0_4px_16px_rgba(15,23,42,0.03)] box-border">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold text-[#0B132B] tracking-[-0.025em] mb-4 leading-tight">
            Let&apos;s Bring Your <span className="text-[#0052FF]">Vision to Life</span>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#475569] leading-relaxed font-normal max-w-[620px] mx-auto mb-8">
            Tell us about your requirements and explore a practical technical approach for your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap w-full">
            <Link
              href="/contact"
              className="w-full sm:w-[230px] max-w-[320px] sm:max-w-none h-[52px] px-5 text-[16px] font-semibold rounded-[10px] inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none bg-[#0052FF] text-white border border-[#0052FF] shadow-[0_2px_6px_rgba(0,82,255,0.18)] hover:bg-[#0043D6] hover:border-[#0043D6] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,82,255,0.25)] transition-all duration-200"
            >
              <span>Discuss Your Project</span>
              <span className="text-[#FF6B00] font-extrabold text-base leading-none">&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-[230px] max-w-[320px] sm:max-w-none h-[52px] px-5 text-[16px] font-semibold rounded-[10px] inline-flex items-center justify-center whitespace-nowrap leading-none bg-white text-[#0B132B] border border-[#CBD5E1] shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:bg-[#F8FAFC] hover:border-[#94A3B8] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-all duration-200"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
