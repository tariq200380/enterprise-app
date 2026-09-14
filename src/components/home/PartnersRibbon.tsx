import React from "react";

export default function PartnersRibbon({ logos }: { logos?: any }) {
  return (
    <section className="relative w-full bg-[#F7F6F5] py-6 sm:py-7 border-t border-b border-[#E2E8F0] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Left Side: Reviewed and recommended on */}
          <div className="text-[#5B6472] text-sm sm:text-base font-medium tracking-wide text-center md:text-left whitespace-nowrap">
            Reviewed and recommended on
          </div>

          {/* Right Side: Platform Links with Uniform Font Style */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 lg:gap-11">
            <a
              href="https://themanifest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0F172A] hover:text-[#0052FF] transition-colors text-sm sm:text-base font-semibold tracking-tight cursor-pointer"
            >
              The Manifest
            </a>
            <a
              href="https://www.shopify.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0F172A] hover:text-[#0052FF] transition-colors text-sm sm:text-base font-semibold tracking-tight cursor-pointer"
            >
              Shopify Partners
            </a>
            <a
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0F172A] hover:text-[#0052FF] transition-colors text-sm sm:text-base font-semibold tracking-tight cursor-pointer"
            >
              Trustpilot
            </a>
            <a
              href="https://clutch.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0F172A] hover:text-[#0052FF] transition-colors text-sm sm:text-base font-semibold tracking-tight cursor-pointer"
            >
              Clutch
            </a>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0F172A] hover:text-[#0052FF] transition-colors text-sm sm:text-base font-semibold tracking-tight cursor-pointer"
            >
              Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
