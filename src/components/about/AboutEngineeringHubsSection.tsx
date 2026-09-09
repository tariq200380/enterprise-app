import React from "react";
import { AboutEngineeringHubItem } from "@/components/admin/settings/types";

interface Props {
  badgeTag?: string;
  headline?: string;
  description?: string;
  hubs: AboutEngineeringHubItem[];
}

export default function AboutEngineeringHubsSection({
  badgeTag = "GLOBAL REACH & CONTINUOUS COVERAGE",
  headline = "Three Specialized Global Engineering Centers",
  description = "Operating across multiple time zones to deliver seamless 24/7 technical continuity and deep regional domain expertise.",
  hubs,
}: Props) {
  if (!hubs || hubs.length === 0) return null;

  return (
    <section className="w-full py-16 sm:py-24 border-b border-[#E5E7EB] text-center bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          {badgeTag && (
            <span className="text-[11.5px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1.5">
              {badgeTag}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
              {description}
            </p>
          )}
        </div>

        {/* Dynamic Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {hubs.map((hub) => (
            <div
              key={hub.id}
              className="bg-[#FAFAFC] rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-44 relative overflow-hidden bg-gray-900">
                  <img
                    src={hub.coverImageUrl}
                    alt={hub.city}
                    width={380}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-lg font-bold block leading-tight">{hub.city}</span>
                    {hub.country && (
                      <span className="text-xs text-gray-300 font-medium">{hub.country}</span>
                    )}
                  </div>
                </div>
                <div className="p-5 pb-3 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider">
                    Core Specialization:
                  </span>
                  <p className="text-[13px] text-gray-900 font-bold leading-snug">
                    {hub.specialization}
                  </p>
                  {hub.address && (
                    <p className="text-[11.5px] text-gray-500 pt-1.5 mt-1 border-t border-[#F3F4F6]">
                      📍 {hub.address}
                    </p>
                  )}
                </div>
              </div>
              {hub.statusTag && (
                <div className="px-5 pb-5">
                  <span className="text-[11.5px] font-bold text-[#059669] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full inline-block" />
                    {hub.statusTag}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
