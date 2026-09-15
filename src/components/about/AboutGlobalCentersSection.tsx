import React from "react";

export default function AboutGlobalCentersSection() {
  return (
    <section className="py-12 sm:py-14 border-t border-[#E2E8F0]">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
          <div className="text-[13px] text-[#3D6BFF] font-medium mb-3.5">
            Global reach and continuous coverage
          </div>
          <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
            Three specialized global engineering centers
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
            Operating across multiple time zones to deliver seamless 24/7 technical continuity
            and deep regional domain expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2E8F0] border border-[#E2E8F0] mt-2">
          {/* Center 1: North America */}
          <div className="bg-white p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="text-[12.5px] text-[#5B6472] mb-4">North America</div>
              <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-2.5">
                Product strategy &amp; architecture
              </h3>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-5">
                Senior principal engineers shape roadmaps and system design in direct partnership
                with founders and product leadership.
              </p>
            </div>
            <div className="text-[13px] text-[#3D6BFF] font-medium pt-3.5 border-t border-[#E2E8F0]">
              Kickoff &amp; architecture review
            </div>
          </div>

          {/* Center 2: Eastern Europe */}
          <div className="bg-white p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="text-[12.5px] text-[#5B6472] mb-4">Eastern Europe</div>
              <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-2.5">
                Deep systems engineering
              </h3>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-5">
                Core platform, infrastructure, and performance-critical engineering handled by
                specialists in distributed systems.
              </p>
            </div>
            <div className="text-[13px] text-[#3D6BFF] font-medium pt-3.5 border-t border-[#E2E8F0]">
              Build &amp; hardening phase
            </div>
          </div>

          {/* Center 3: South Asia */}
          <div className="bg-white p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="text-[12.5px] text-[#5B6472] mb-4">South Asia</div>
              <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-2.5">
                24/7 operations &amp; QA
              </h3>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-5">
                Continuous monitoring, quality assurance, and incident response so nothing waits
                for business hours to get fixed.
              </p>
            </div>
            <div className="text-[13px] text-[#3D6BFF] font-medium pt-3.5 border-t border-[#E2E8F0]">
              Always-on coverage
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
