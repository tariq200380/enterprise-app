import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-white pt-8 pb-8 lg:pt-12 lg:pb-12 m-0 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* LEFT — Text & CTA */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
          <h1 className="font-normal text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight leading-[1.15]">
            Your infrastructure supercharged
          </h1>

          <p className="text-base sm:text-lg text-[#3E3E3E] leading-[1.75] mt-4 max-w-lg font-normal">
            Creed Tech delivers enterprise software architecture, robust cloud infrastructure, advanced cybersecurity, and AI solutions all in one platform.
          </p>

          <div className="mt-7 w-full flex justify-center lg:justify-start">
            <Link
              href="#services"
              className="inline-flex items-center justify-center bg-[#0052FF] hover:bg-[#0042D0] text-white text-sm font-semibold h-10 px-[22px] rounded transition-colors shadow-none"
            >
              Explore Solutions
            </Link>
          </div>
        </div>

        {/* RIGHT — Hero Graphic */}
        <div className="w-full lg:w-[48%] flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[620px] flex items-center justify-center">
            <Image
              src="/images/hero-services-web-q90.webp"
              alt="Creed Tech Cloud, AI, and Software Architecture Solutions"
              width={620}
              height={520}
              priority
              className="w-full h-auto object-contain block transition-transform duration-700 hover:scale-105 select-none"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
