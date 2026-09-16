import React from "react";

export default function ContactFaqSection() {
  return (
    <section className="w-full py-10 sm:py-12 border-b border-[#E2E8F0] bg-[#F7F6F5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#EA580C] font-mono mb-2 block">
            COMMONLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-[#0F172A] tracking-tight leading-tight mb-3">
            Technical Scoping &amp; Engagement FAQ
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Clear answers regarding our engineering model, intellectual property, and SLA commitments.
          </p>
        </div>

        {/* 4 Direct FAQ Cards (Clean, Editable JSX) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto text-left">
          {/* FAQ 1 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs hover:shadow-xs hover:border-orange-400/50 transition-all">
            <h4 className="text-base font-bold text-[#0F172A] mb-2">
              Who will actually engineer our software platform?
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
              100% of your software is engineered by senior principal architects and domain specialists.
              We have zero non-technical project managers, zero offshore delegation layers, and zero
              junior developer bait-and-switch.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs hover:shadow-xs hover:border-orange-400/50 transition-all">
            <h4 className="text-base font-bold text-[#0F172A] mb-2">
              Who owns the intellectual property and code?
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
              You own 100% of all intellectual property, source code, documentation, and system
              artifacts from day one. All code is committed directly into your private enterprise
              repositories.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs hover:shadow-xs hover:border-orange-400/50 transition-all">
            <h4 className="text-base font-bold text-[#0F172A] mb-2">
              How quickly can a dedicated pod begin execution?
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
              Following mutual NDA and architectural blueprint alignment, dedicated pods deploy
              within 5 to 7 business days, achieving full sprint velocity within the first 48 hours
              of kickoff.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs hover:shadow-xs hover:border-orange-400/50 transition-all">
            <h4 className="text-base font-bold text-[#0F172A] mb-2">
              How do you enforce security and compliance standards?
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
              All development adheres strictly to SOC 2 Type II, ISO 27001, and GDPR controls.
              Every build includes automated static code analysis, vulnerability scanning, and
              cryptographic audit trails.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
