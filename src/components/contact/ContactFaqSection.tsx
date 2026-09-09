import React from "react";
import { ContactFaqItem } from "../admin/settings/types";

interface Props {
  faqs: ContactFaqItem[];
}

export default function ContactFaqSection({ faqs }: Props) {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAFAFC] border-b border-[#E5E7EB] text-center">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="mb-10 sm:mb-12">
          <span className="text-[11.5px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1.5">
            ANSWERS &amp; ASSURANCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-normal">
            Everything you need to know about working with our senior engineering pods and custodians.
          </p>
        </div>

        <div className="flex flex-col gap-3.5 text-left">
          {faqs.map((faq, idx) => (
            <details
              key={faq.id || idx}
              className="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden"
              open={idx === 0}
            >
              <summary className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#030712] cursor-pointer select-none list-none">
                <span>{faq.question}</span>
                <span className="text-xl font-mono text-gray-400 group-open:rotate-45 transition-transform shrink-0">
                  +
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 text-[13px] sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F3F4F6] pt-3">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
