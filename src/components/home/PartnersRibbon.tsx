import React from "react";
import { PartnerLogoItem, DEFAULT_WEBSITE_SETTINGS } from "@/components/admin/settings/types";

interface Props {
  logos?: PartnerLogoItem[];
}

export default function PartnersRibbon({ logos }: Props) {
  const activeLogos = logos && logos.length > 0 ? logos : DEFAULT_WEBSITE_SETTINGS.partnerLogos;

  return (
    <section className="w-full py-6 border-t border-b border-[#D6E4FF] bg-[#F4F8FF] overflow-hidden relative select-none">
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient Edge Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F4F8FF] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F4F8FF] to-transparent" />

        {/* Infinite 4-Set Continuous Marquee Track */}
        <div className="partner-marquee-track items-center gap-14 sm:gap-20 px-6">
          {[1, 2, 3, 4].map((setIndex) => (
            <div key={setIndex} className="flex items-center gap-14 sm:gap-20 shrink-0">
              {activeLogos.map((partner) => (
                <a
                  key={`${setIndex}-${partner.id}`}
                  href={partner.websiteUrl || "#"}
                  target={partner.websiteUrl?.startsWith("http") ? "_blank" : undefined}
                  rel={partner.websiteUrl?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-7 sm:h-9 max-h-10 w-auto object-contain"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
