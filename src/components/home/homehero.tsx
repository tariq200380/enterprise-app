import Link from "next/link";
import Image from "next/image";

export default function Homehero() {
  return (
    <section
      className="w-full pt-8 pb-8 lg:pt-12 lg:pb-12 m-0 border-b border-gray-100 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/microsoft-hero-bg.webp')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* LEFT — Text & CTA */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
          <h1 className="font-outfit font-bold tracking-tight text-white text-4xl sm:text-5xl leading-[1.15]">
            Your infrastructure supercharged
          </h1>

          <p className="text-base sm:text-lg text-white/90 leading-[1.75] mt-4 max-w-lg font-normal">
            Creed Tech delivers enterprise software architecture, robust cloud infrastructure, advanced cybersecurity, and AI solutions all in one platform.
          </p>

          <div className="mt-7 w-full flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
            <button
              type="button"
              data-modal="project"
              className="w-full sm:w-[185px] h-11 inline-flex items-center justify-center bg-blue-600 text-white font-medium hover:bg-blue-700 rounded transition-colors shadow-none cursor-pointer text-center whitespace-nowrap"
            >
              Start Your Project
            </button>
            <Link
              href="/services"
              className="w-full sm:w-[185px] h-11 inline-flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-300 text-[#0F172A] hover:border-[#0052FF] hover:text-[#0052FF] text-sm font-semibold rounded transition-all shadow-none cursor-pointer text-center whitespace-nowrap"
            >
              Explore Solutions &rarr;
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
