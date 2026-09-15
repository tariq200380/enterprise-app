import React from "react";
import Link from "next/link";

export default function AboutLeadershipSection() {
  return (
    <section className="bg-[#EFECE6] py-12 sm:py-14 border-t border-[#E2E8F0]">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
          <div className="text-[13px] text-[#FF5A1F] font-medium mb-3.5">
            The people behind the code
          </div>
          <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
            Executive leadership and technical custodians
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
            Meet the founders and principal architects who guide our engineering vision and
            mentor our senior pods across three global centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Leader 1: Alexander Wright */}
          <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-6 items-center">
            <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1220] flex items-center justify-center relative overflow-hidden">
              <span className="font-serif text-[32px] text-[#C7D2FF] tracking-[0.01em]">
                AW
              </span>
            </div>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="font-serif font-medium text-lg text-[#0F172A] mb-1">
                  Alexander Wright
                </h3>
                <div className="text-[#3D6BFF] text-[13px] font-medium mb-3">
                  Founder &amp; Chief Executive Officer
                </div>
                <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5">
                  Founded Creed Tech with the conviction that next-generation enterprise software
                  should be built with mathematical precision, neural scalability, and
                  uncompromising craftsmanship.
                </p>
                <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                  &ldquo;We don&apos;t build software to sell and walk away. We build digital
                  infrastructure that companies run their entire future on.&rdquo;
                </div>
              </div>
              <Link
                href="/contact"
                className="text-[12.5px] font-medium text-[#3D6BFF] hover:underline"
              >
                Connect with Alexander &rarr;
              </Link>
            </div>
          </div>

          {/* Leader 2: Dr. Elena Rostova */}
          <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-6 items-center">
            <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1220] flex items-center justify-center relative overflow-hidden">
              <span className="font-serif text-[32px] text-[#C7D2FF] tracking-[0.01em]">
                ER
              </span>
            </div>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="font-serif font-medium text-lg text-[#0F172A] mb-1">
                  Dr. Elena Rostova
                </h3>
                <div className="text-[#3D6BFF] text-[13px] font-medium mb-3">
                  Chief Technology Officer
                </div>
                <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5">
                  Directs research in private enterprise LLMs and distributed vector streaming.
                  Champion of vendor-neutral, open cloud architecture.
                </p>
                <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                  &ldquo;The best engineering is invisible — it performs flawlessly under
                  maximum load without ever taking a bow.&rdquo;
                </div>
              </div>
              <Link
                href="/contact"
                className="text-[12.5px] font-medium text-[#3D6BFF] hover:underline"
              >
                Connect with Elena &rarr;
              </Link>
            </div>
          </div>

          {/* Leader 3: Marcus Vance */}
          <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-6 items-center">
            <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1220] flex items-center justify-center relative overflow-hidden">
              <span className="font-serif text-[32px] text-[#C7D2FF] tracking-[0.01em]">
                MV
              </span>
            </div>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="font-serif font-medium text-lg text-[#0F172A] mb-1">
                  Marcus Vance
                </h3>
                <div className="text-[#3D6BFF] text-[13px] font-medium mb-3">
                  Head of Global Security &amp; Governance
                </div>
                <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5">
                  Oversees zero-trust architectures, sovereign data privacy, and SOC 2 Type II
                  governance across all client engagements.
                </p>
                <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                  &ldquo;In high-stakes systems, trust is not a promise — it&apos;s mathematically
                  verified cryptography.&rdquo;
                </div>
              </div>
              <Link
                href="/contact"
                className="text-[12.5px] font-medium text-[#3D6BFF] hover:underline"
              >
                Connect with Marcus &rarr;
              </Link>
            </div>
          </div>

          {/* Leader 4: Sarah Jenkins */}
          <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-6 items-center">
            <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1220] flex items-center justify-center relative overflow-hidden">
              <span className="font-serif text-[32px] text-[#C7D2FF] tracking-[0.01em]">
                SJ
              </span>
            </div>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="font-serif font-medium text-lg text-[#0F172A] mb-1">
                  Sarah Jenkins
                </h3>
                <div className="text-[#3D6BFF] text-[13px] font-medium mb-3">
                  VP of Global Client Engineering
                </div>
                <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5">
                  Directs dedicated senior engineering pods across three global centers,
                  guaranteeing milestone velocity, zero-defect releases, and continuous client
                  alignment.
                </p>
                <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                  &ldquo;Engineering maturity isn&apos;t just about writing code; it&apos;s about
                  delivering business outcomes with absolute predictability.&rdquo;
                </div>
              </div>
              <Link
                href="/contact"
                className="text-[12.5px] font-medium text-[#3D6BFF] hover:underline"
              >
                Connect with Sarah &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
