import React from "react";

export default function AboutPhilosophySection() {
  return (
    <section className="w-full py-10 sm:py-12 bg-[#F7F6F5] scroll-mt-24 border-b border-[#E2E8F0]" id="journey">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        {/* Simple, Elegant Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 text-left sm:text-center sm:mx-auto">
          <div className="text-[11px] font-mono font-bold uppercase tracking-[2.5px] text-[#EA580C] mb-3">
            ENGINEERING ETHOS &bull; OUR PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-5">
            Discipline over hype. Architecture over shortcuts.
          </h2>
          <p className="text-[#5B6472] text-base sm:text-lg leading-[1.7]">
            We build mission-critical enterprise systems with{" "}
            <strong className="text-[#0F172A] font-semibold">mathematical rigor</strong> — eliminating technical debt while bridging deep computer science with real-world enterprise velocity.
          </p>
        </div>

        {/* 6 Minimalist Core Pillars (Simple, Direct Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {/* Pillar 1 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#EA580C]/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2.5">
                01 / PROGRESS
              </span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Continuous Innovation
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                Enduring partnerships built on{" "}
                <strong className="text-[#0F172A] font-semibold">technical transparency</strong>, rapid release cycles, and measurable architectural reliability.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#EA580C]/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2.5">
                02 / FOCUS
              </span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Laser Discipline
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                We prioritize{" "}
                <strong className="text-[#0F172A] font-semibold">absolute mastery</strong> in our domain, communicating transparently the moment a problem falls outside our core specialization.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#EA580C]/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2.5">
                03 / ADAPTABILITY
              </span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Modular Architecture
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                Client-centric systems without compromise —{" "}
                <strong className="text-[#0F172A] font-semibold">specialized engineering pods</strong> tailored to your team&apos;s exact technical constraints.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#EA580C]/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2.5">
                04 / PERFORMANCE
              </span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Sub-Second Ergonomics
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                Intuitive developer ergonomics,{" "}
                <strong className="text-[#0F172A] font-semibold">sub-second response latencies</strong>, and friction-free user journeys across all digital touchpoints.
              </p>
            </div>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#EA580C]/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2.5">
                05 / ALIGNMENT
              </span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Co-Engineering Alliance
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                We operate as{" "}
                <strong className="text-[#0F172A] font-semibold">long-term technical allies</strong>, scaling alongside you through architecture reviews, compliance, and enterprise growth.
              </p>
            </div>
          </div>

          {/* Pillar 6 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#EA580C]/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2.5">
                06 / R&amp;D
              </span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Future-Proof R&amp;D
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                Proactively staying ahead of paradigm shifts — engineering{" "}
                <strong className="text-[#0F172A] font-semibold">autonomous AI pipelines</strong> and robust distributed consensus infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
