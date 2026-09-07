import React from "react";

interface CommitmentItem {
  num: string;
  title: string;
  desc: string;
}

const commitments: CommitmentItem[] = [
  {
    num: "01",
    title: "Clear Requirements",
    desc: "Project scope priorities responsibilities and delivery stages are documented before implementation.",
  },
  {
    num: "02",
    title: "Transparent Progress",
    desc: "Regular updates and review points provide visibility into development decisions and project status.",
  },
  {
    num: "03",
    title: "Quality Review",
    desc: "Important functionality integrations responsive behavior and agreed workflows are reviewed before release.",
  },
  {
    num: "04",
    title: "Continued Support",
    desc: "Maintenance improvements and technical support can be provided according to the agreed service arrangement.",
  },
];

export default function DeliveryCommitment() {
  return (
    <section id="delivery-commitment" className="relative w-full py-12 lg:py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[52rem] mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold text-[#0F172A] tracking-[-0.02em] mb-3 leading-tight">
            Our Delivery <span className="text-[#0052FF]">Commitment</span>
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed font-normal m-0">
            We follow a clear and collaborative delivery process focused on agreed requirements reliable implementation transparent communication and responsible quality review.
          </p>
        </div>

        {/* 4 Commitment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {commitments.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] border-t-[3.5px] border-t-[#0052FF] hover:border-t-[#FF6B00] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out cursor-default"
            >
              <span className="text-[11px] font-extrabold text-[#0052FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2 py-0.5 rounded tracking-[0.04em] mb-4 inline-block w-max">
                COMMITMENT {item.num}
              </span>
              <h3 className="text-[18px] font-semibold text-[#0F172A] mb-3 leading-snug m-0">
                {item.title}
              </h3>
              <p className="text-[15px] text-[#475569] leading-relaxed m-0 font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footnote Disclaimer */}
        <div className="text-center">
          <p className="text-[14px] text-[#64748B] italic m-0">
            Final scope timelines support terms and acceptance criteria are defined separately for each project.
          </p>
        </div>
      </div>
    </section>
  );
}
