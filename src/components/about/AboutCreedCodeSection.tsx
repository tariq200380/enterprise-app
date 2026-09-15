import React from "react";

export default function AboutCreedCodeSection() {
  return (
    <section className="bg-[#EFECE6] py-12 sm:py-14 border-t border-[#E2E8F0]">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
          <div className="text-[13px] text-[#FF5A1F] font-medium mb-3.5">
            The Creed code
          </div>
          <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
            Our four pillars of uncompromising engineering
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
            The fundamental principles that govern every technical decision, sprint review, and
            architectural deployment at Creed Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Pillar 01 */}
          <div className="bg-white border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-serif text-[22px] text-[#3D6BFF]">01</span>
                <span className="text-[11.5px] text-[#3D6BFF] border border-[#3D6BFF]/30 bg-[#3D6BFF]/[0.06] px-2.5 py-1 rounded-[3px]">
                  Pillar of excellence
                </span>
              </div>
              <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-1.5">
                Architectural integrity over shortcuts
              </h3>
              <div className="text-[#FF5A1F] text-[13px] font-medium mb-3.5">
                We build for decades, not for quick demos.
              </div>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-4">
                Software is the central nervous system of modern business. We reject fragile
                hacks, unnecessary dependencies, and opaque abstractions — every line of code is
                structured to withstand massive scale.
              </p>
            </div>
            <div className="text-[13px] text-[#0F172A] pt-4 border-t border-[#E2E8F0] flex gap-2 items-start">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7 L5.5 10.5 L12 3" stroke="#3D6BFF" strokeWidth="1.6" />
              </svg>
              <span>Clean, deterministic, and self-documenting codebases.</span>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="bg-white border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-serif text-[22px] text-[#3D6BFF]">02</span>
                <span className="text-[11.5px] text-[#3D6BFF] border border-[#3D6BFF]/30 bg-[#3D6BFF]/[0.06] px-2.5 py-1 rounded-[3px]">
                  Pillar of excellence
                </span>
              </div>
              <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-1.5">
                Direct architect-to-client pairing
              </h3>
              <div className="text-[#FF5A1F] text-[13px] font-medium mb-3.5">
                No layers of non-technical middlemen.
              </div>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-4">
                When you collaborate with Creed Tech, your product roadmap is shaped directly by
                senior principal engineers who have built high-scale systems — eliminating
                translation friction from day one.
              </p>
            </div>
            <div className="text-[13px] text-[#0F172A] pt-4 border-t border-[#E2E8F0] flex gap-2 items-start">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7 L5.5 10.5 L12 3" stroke="#3D6BFF" strokeWidth="1.6" />
              </svg>
              <span>100% principal engineer involvement from kickoff to launch.</span>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="bg-white border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-serif text-[22px] text-[#3D6BFF]">03</span>
                <span className="text-[11.5px] text-[#3D6BFF] border border-[#3D6BFF]/30 bg-[#3D6BFF]/[0.06] px-2.5 py-1 rounded-[3px]">
                  Pillar of excellence
                </span>
              </div>
              <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-1.5">
                Zero-trust &amp; sovereign privacy
              </h3>
              <div className="text-[#FF5A1F] text-[13px] font-medium mb-3.5">
                Security is non-negotiable; it is our foundation.
              </div>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-4">
                In an era of relentless cyber threats and sensitive AI models, we treat data
                sovereignty as a fundamental duty — embedding zero-knowledge cryptography and
                immutable audit trails into every platform.
              </p>
            </div>
            <div className="text-[13px] text-[#0F172A] pt-4 border-t border-[#E2E8F0] flex gap-2 items-start">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7 L5.5 10.5 L12 3" stroke="#3D6BFF" strokeWidth="1.6" />
              </svg>
              <span>Cryptographic data protection built into core architecture.</span>
            </div>
          </div>

          {/* Pillar 04 */}
          <div className="bg-white border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-serif text-[22px] text-[#3D6BFF]">04</span>
                <span className="text-[11.5px] text-[#3D6BFF] border border-[#3D6BFF]/30 bg-[#3D6BFF]/[0.06] px-2.5 py-1 rounded-[3px]">
                  Pillar of excellence
                </span>
              </div>
              <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-1.5">
                Empathetic craftsmanship
              </h3>
              <div className="text-[#FF5A1F] text-[13px] font-medium mb-3.5">
                Engineering with a deep respect for the end user.
              </div>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-4">
                Brilliant engineering means nothing if the interface creates friction. We unite
                deep backend computer science with intuitive, human-centric product design,
                creating platforms that people love.
              </p>
            </div>
            <div className="text-[13px] text-[#0F172A] pt-4 border-t border-[#E2E8F0] flex gap-2 items-start">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7 L5.5 10.5 L12 3" stroke="#3D6BFF" strokeWidth="1.6" />
              </svg>
              <span>Intuitive micro-interactions powered by resilient backend logic.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
