import React from "react";
import { AboutEngineeringHubItem } from "@/components/admin/settings/types";

interface AboutGlobalCentersSectionProps {
  badgeTag?: string;
  headline?: string;
  description?: string;
  hubs?: AboutEngineeringHubItem[];
}

const DEFAULT_HUBS: AboutEngineeringHubItem[] = [
  {
    id: "hub-01",
    city: "North America",
    country: "United States",
    coverImageUrl: "",
    statusTag: "Kickoff & architecture review",
    specialization: "Product strategy & architecture",
    address:
      "Senior principal engineers shape roadmaps and system design in direct partnership with founders and product leadership.",
  },
  {
    id: "hub-02",
    city: "Eastern Europe",
    country: "Regional Hub",
    coverImageUrl: "",
    statusTag: "Build & hardening phase",
    specialization: "Deep systems engineering",
    address:
      "Core platform, infrastructure, and performance-critical engineering handled by specialists in distributed systems.",
  },
  {
    id: "hub-03",
    city: "South Asia",
    country: "Regional Hub",
    coverImageUrl: "",
    statusTag: "Always-on coverage",
    specialization: "24/7 operations & QA",
    address:
      "Continuous monitoring, quality assurance, and incident response so nothing waits for business hours to get fixed.",
  },
];

export default function AboutGlobalCentersSection({
  badgeTag,
  headline,
  description,
  hubs,
}: AboutGlobalCentersSectionProps) {
  const displayHubs =
    Array.isArray(hubs) && hubs.length > 0 ? hubs : DEFAULT_HUBS;

  return (
    <section className="w-full py-10 sm:py-12 border-b border-[#E2E8F0] bg-[#F7F6F5]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-10 sm:mb-12 text-center">
          <div className="text-[11px] text-[#3D6BFF] font-semibold uppercase tracking-wider mb-3">
            {badgeTag || "GLOBAL REACH • CONTINUOUS COVERAGE"}
          </div>
          <h2 className="font-outfit text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-[1.15] mb-4">
            {headline || "Three specialized global engineering centers"}
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7] font-normal">
            {description ||
              "Operating across multiple time zones to deliver seamless 24/7 technical continuity and deep regional domain expertise."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {displayHubs.map((hub, idx) => {
            const locationLabel =
              hub.city && hub.country && !hub.city.includes("(")
                ? `${hub.city} (${hub.country})`
                : hub.city || hub.country || `Center 0${idx + 1}`;
            const ctaLabel = hub.statusTag || "Active Regional Center";

            return (
              <div
                key={hub.id || `hub-${idx}`}
                className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#3D6BFF]/40 transition-all"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#3D6BFF]/10 text-[#3D6BFF] text-xs font-semibold tracking-wider mb-4">
                    <span>📍 {locationLabel}</span>
                  </div>
                  <h3 className="font-outfit text-xl font-bold text-[#0F172A] mb-2.5 tracking-tight">
                    {hub.specialization || "Engineering Operations"}
                  </h3>
                  <p className="text-[#5B6472] text-sm leading-[1.65] mb-5 font-normal">
                    {hub.address ||
                      "Operating across multiple time zones to deliver continuous delivery and technical continuity."}
                  </p>
                </div>
                <div className="text-[13px] text-[#3D6BFF] font-semibold pt-3.5 border-t border-[#E2E8F0]">
                  {ctaLabel} &rarr;
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
