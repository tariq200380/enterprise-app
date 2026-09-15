import React from "react";
import Link from "next/link";

export default function AboutMetricsSection() {
  return (
    <section className="py-12 sm:py-14 text-center border-t border-[#E2E8F0]">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
          <div className="text-[13px] text-[#3D6BFF] font-medium mb-3.5">
            Data driven
          </div>
          <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
            Leading you to digital growth
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
            Our proven expertise and cutting-edge technology have driven measurable success —
            see the numbers that showcase our impact.
          </p>
        </div>

        {/* 4-Item Metric Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E2E8F0] border border-[#E2E8F0] max-w-[760px] mx-auto mb-8">
          {/* Stat 1 */}
          <div className="bg-white p-7 sm:p-8">
            <svg className="mx-auto mb-3 w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2 L14.6 8.8 L22 9.3 L16.3 13.9 L18.2 21 L12 17 L5.8 21 L7.7 13.9 L2 9.3 L9.4 8.8 Z"
                stroke="#3D6BFF"
                strokeWidth="1.4"
              />
            </svg>
            <div className="font-serif text-3xl font-medium text-[#0F172A]">99%</div>
            <div className="text-[12.5px] text-[#5B6472] mt-1">Job success rate</div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-7 sm:p-8">
            <svg className="mx-auto mb-3 w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#3D6BFF" strokeWidth="1.4" />
              <path d="M12 7v5l3 3" stroke="#3D6BFF" strokeWidth="1.4" />
            </svg>
            <div className="font-serif text-3xl font-medium text-[#0F172A]">15,000+</div>
            <div className="text-[12.5px] text-[#5B6472] mt-1">Working hours</div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-7 sm:p-8">
            <svg className="mx-auto mb-3 w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 21 C4 15 8 13 12 13 C16 13 20 15 20 21"
                stroke="#3D6BFF"
                strokeWidth="1.4"
              />
              <circle cx="12" cy="7" r="4" stroke="#3D6BFF" strokeWidth="1.4" />
            </svg>
            <div className="font-serif text-3xl font-medium text-[#0F172A]">300+</div>
            <div className="text-[12.5px] text-[#5B6472] mt-1">Satisfied clients</div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white p-7 sm:p-8">
            <svg className="mx-auto mb-3 w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="8" cy="9" r="3.2" stroke="#3D6BFF" strokeWidth="1.4" />
              <circle cx="17" cy="9" r="3.2" stroke="#3D6BFF" strokeWidth="1.4" />
              <path d="M2 21c0-4.5 2.7-7 6-7s6 2.5 6 7M12 21c0-4.5 2.2-7 5-7s5 2.5 5 7" stroke="#3D6BFF" strokeWidth="1.4" />
            </svg>
            <div className="font-serif text-3xl font-medium text-[#0F172A]">80+</div>
            <div className="text-[12.5px] text-[#5B6472] mt-1">Professional team</div>
          </div>
        </div>


        <div className="flex gap-3.5 justify-center flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-w-[220px] text-center bg-[#0F172A] hover:bg-[#1B3A8C] text-[#F7F6F5] px-7 py-3.5 rounded-[2px] text-[14.5px] font-medium border border-[#0F172A] transition-colors"
          >
            Get free consultation
          </Link>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center min-w-[220px] text-center px-7 py-3.5 rounded-[2px] text-[14.5px] font-medium border border-[#CBD5E1] hover:border-[#0F172A] text-[#0F172A] bg-white transition-colors"
          >
            Hire top talent
          </Link>
        </div>
      </div>
    </section>
  );
}
