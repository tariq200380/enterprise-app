import React from "react";

export default function PartnersRibbon({ logos }: { logos?: any }) {
  return (
    <section className="relative w-full bg-[#0B1220] py-6 sm:py-7 border-t border-b border-slate-800/80 overflow-hidden select-none">
      {/* Subtle Ambient Orange Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 107, 0, 0.18) 0%, rgba(255, 107, 0, 0.04) 50%, transparent 85%)",
        }}
      />

      {/* Centered Soft Orange Glow Light Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] h-[60px] sm:h-[85px] bg-[#FF6B00]/14 rounded-full blur-[55px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Left Side: Reviewed and recommended on */}
          <div className="text-white/85 text-sm sm:text-base font-normal tracking-wide text-center md:text-left whitespace-nowrap">
            Reviewed and recommended on
          </div>

          {/* Right Side: Platform Links with Uniform Font Style */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 lg:gap-11">
            <a
              href="https://themanifest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-medium tracking-tight cursor-pointer"
            >
              The Manifest
            </a>
            <a
              href="https://www.shopify.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-medium tracking-tight cursor-pointer"
            >
              Shopify Partners
            </a>
            <a
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-medium tracking-tight cursor-pointer"
            >
              Trustpilot
            </a>
            <a
              href="https://clutch.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-medium tracking-tight cursor-pointer"
            >
              Clutch
            </a>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-medium tracking-tight cursor-pointer"
            >
              Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
