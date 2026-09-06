import Image from "next/image";
import Link from "next/link";

export default function TrustSecurity() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 border-b border-gray-100 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT VISUAL: Exact 3D Security Illustration Card */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <div className="relative w-full max-w-[480px] rounded-[28px] overflow-hidden bg-white shadow-[0_15px_40px_-10px_rgba(0,82,255,0.08)] border border-[#E2E8F0]/90 group hover:shadow-[0_20px_50px_-10px_rgba(0,82,255,0.14)] transition-all duration-300">
              <Image
                src="/images/trust-security-3d-test.webp"
                alt="Secure Engineering - 99.99% Reliability SLA"
                width={480}
                height={500}
                className="w-full h-auto object-contain block select-none"
              />
            </div>
          </div>

          {/* RIGHT CONTENT: Badge, Heading, Description, Stats & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Pre-title Pill / Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#EBF3FF] text-[#0052FF] text-xs font-medium tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
              <span>TRUST &amp; SECURITY</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[28px] sm:text-4xl lg:text-[42px] font-medium text-[#0F172A] tracking-tight leading-tight mb-5">
              <span className="block">Enterprise engineering built on</span>
              <span className="block mt-2.5 sm:mt-3">security reliability and trust</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed mb-8 max-w-lg font-normal">
              We combine deep technical expertise with industry-leading security practices to deliver reliable, scalable, and future-ready solutions for your business.
            </p>

            {/* Stats Grid */}
            <div className="flex items-center gap-10 sm:gap-14 mb-8">
              {/* Stat 1: 10+ Years Experience */}
              <div className="flex flex-col">
                <div className="flex items-baseline mb-1">
                  <span className="text-4xl sm:text-5xl font-medium text-[#0F172A] tracking-tight">10</span>
                  <span className="text-3xl sm:text-4xl font-medium text-[#0052FF] ml-0.5">+</span>
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#64748B] uppercase tracking-wider">
                  YEARS EXPERIENCE
                </span>
              </div>

              {/* Vertical Divider */}
              <div className="w-[1.5px] h-12 bg-gray-200" />

              {/* Stat 2: 99.99% Reliability SLA */}
              <div className="flex flex-col">
                <div className="flex items-baseline mb-1">
                  <span className="text-4xl sm:text-5xl font-medium text-[#0F172A] tracking-tight">99.99</span>
                  <span className="text-2xl sm:text-3xl font-medium text-[#0052FF] ml-0.5">%</span>
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#64748B] uppercase tracking-wider">
                  RELIABILITY SLA
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/security"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[4px] bg-[#0052FF] hover:bg-[#0042D0] text-white text-sm font-semibold transition-colors duration-150 group"
              >
                <span>Security &amp; Trust</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
