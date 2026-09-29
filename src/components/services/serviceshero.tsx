import Link from "next/link";
import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F8F5F0] py-14 sm:py-16 lg:py-20 border-b border-[#E8E2D9]">
      <Image
        src="/images/services-hero-bg.webp"
        alt=""
        aria-hidden="true"
        priority={true}
        fill
        sizes="100vw"
        className="object-cover object-right -z-10 select-none pointer-events-none"
      />
      {/* Soft white gradient overlay on the left to guarantee optimal text contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.93)_45%,rgba(255,255,255,0.8)_75%,rgba(255,255,255,0.5)_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-[38rem] text-left">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#CBD5E1] text-[#0F172A] text-[11.5px] font-semibold uppercase tracking-wider mb-3 rounded shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#FF6B00] inline-block shrink-0"></span>
            <span>ENTERPRISE CAPABILITIES &amp; SOLUTIONS</span>
          </div>

          {/* H1 Heading */}
          <h1 className="font-outfit font-bold tracking-tight text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-3">
            Enterprise Software Architecture &amp; Cloud Infrastructure Services
          </h1>

          {/* Contextual Lead Paragraph */}
          <p className="text-[15px] sm:text-[15.5px] font-normal text-[#3E3E3E] leading-relaxed mb-1.5">
            End-to-end cloud infrastructure, bespoke software engineering, autonomous AI agents, and zero-trust cybersecurity audits.
          </p>

          <p className="text-[14.5px] sm:text-[15px] font-normal text-[#5B6472] leading-relaxed mb-5">
            Engineered with dedicated engineering pods for unprecedented scalability, 99.99% mission-critical uptime SLAs, and cryptographic data protection.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 max-w-sm sm:max-w-md">
            <Link
              href="/contact"
              aria-label="Schedule Consultation with Creed Tech Engineering Team"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm h-10 sm:h-11 px-3 sm:px-5 rounded-md shadow-sm transition-all duration-200 text-center whitespace-nowrap"
            >
              Schedule Consultation
            </Link>
            <Link
              href="#software-development"
              aria-label="Explore Creed Tech Core Enterprise Services"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 border-2 border-[#0052FF] text-[#0052FF] hover:text-[#0043D6] font-semibold text-xs sm:text-sm h-10 sm:h-11 px-3 sm:px-5 rounded-md shadow-sm transition-all duration-200 text-center whitespace-nowrap"
            >
              Explore Services &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
