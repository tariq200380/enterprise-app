import React from "react";
import Link from "next/link";

interface AboutServicesSectionProps {
  onOpenModal?: (topic?: string) => void;
}

export default function AboutServicesSection({ onOpenModal }: AboutServicesSectionProps) {
  return (
    <section className="py-12 sm:py-14 border-t border-[#E2E8F0]">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
          <div className="text-[13px] text-[#3D6BFF] font-medium mb-3.5">
            Services and expertise
          </div>
          <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
            What we do
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
            We help businesses turn technology into their biggest competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {/* Service 1: Software development */}
          <div className="border border-[#E2E8F0] p-6 sm:p-7 flex flex-col bg-white">
            <div className="w-11 h-11 rounded-[6px] flex items-center justify-center mb-6 bg-[#3D6BFF]/10">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 6 L2 12 L8 18" stroke="#3D6BFF" strokeWidth="1.8" />
                <path d="M16 6 L22 12 L16 18" stroke="#3D6BFF" strokeWidth="1.8" />
              </svg>
            </div>
            <h3 className="font-serif font-medium text-[19px] mb-2.5 text-[#0F172A]">
              Software development
            </h3>
            <p className="text-[#5B6472] text-sm leading-[1.65] mb-7 grow">
              Scalable, high-performance web, cloud, and enterprise software tailored to accelerate
              your business goals.
            </p>
            <button
              type="button"
              onClick={() => onOpenModal?.("Scalable Web & Mobile Engineering")}
              className="self-start inline-flex items-center justify-center min-w-[185px] text-[13px] font-medium text-[#F7F6F5] bg-[#0F172A] hover:bg-[#1B3A8C] px-5 py-2.5 rounded-[2px] transition-colors cursor-pointer text-center whitespace-nowrap"
            >
              Quick Inquiry
            </button>
          </div>

          {/* Service 2: AI solutions */}
          <div className="border border-[#E2E8F0] p-6 sm:p-7 flex flex-col bg-white">
            <div className="w-11 h-11 rounded-[6px] flex items-center justify-center mb-6 bg-[#FF5A1F]/10">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="#FF5A1F" strokeWidth="1.8" />
                <path
                  d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                  stroke="#FF5A1F"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
            <h3 className="font-serif font-medium text-[19px] mb-2.5 text-[#0F172A]">
              AI solutions
            </h3>
            <p className="text-[#5B6472] text-sm leading-[1.65] mb-7 grow">
              Smarter decision-making, predictive machine learning, and autonomous AI-driven
              automation built for enterprise workflows.
            </p>
            <Link
              href="/services#what-we-provide"
              className="self-start inline-flex items-center justify-center gap-1.5 min-w-[185px] text-[13px] font-medium text-[#F7F6F5] bg-[#0F172A] hover:bg-[#1B3A8C] px-5 py-2.5 rounded-[2px] transition-colors cursor-pointer text-center whitespace-nowrap"
            >
              <span>View All Services</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Service 3: Digital growth */}
          <div className="border border-[#E2E8F0] p-6 sm:p-7 flex flex-col bg-white">
            <div className="w-11 h-11 rounded-[6px] flex items-center justify-center mb-6 bg-[#0F7A5F]/10">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 17 L10 10 L14 14 L21 6" stroke="#0F7A5F" strokeWidth="1.8" />
                <path d="M15 6h6v6" stroke="#0F7A5F" strokeWidth="1.8" />
              </svg>
            </div>
            <h3 className="font-serif font-medium text-[19px] mb-2.5 text-[#0F172A]">
              Digital growth
            </h3>
            <p className="text-[#5B6472] text-sm leading-[1.65] mb-7 grow">
              Data-driven SEO strategies, conversion rate optimization, and multi-channel brand
              scaling that maximize your digital ROI.
            </p>
            <Link
              href="/contact"
              className="self-start inline-flex items-center justify-center gap-1.5 min-w-[185px] text-[13px] font-medium text-[#F7F6F5] bg-[#0F172A] hover:bg-[#1B3A8C] px-5 py-2.5 rounded-[2px] transition-colors cursor-pointer text-center whitespace-nowrap"
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
