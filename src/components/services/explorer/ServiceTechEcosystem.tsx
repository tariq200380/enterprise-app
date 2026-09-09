import React from "react";
import { ServiceTechItem } from "@/components/admin/settings/types";
import { TECH_ICONS } from "../servicesData";

interface Props {
  activeSvcId: string;
  title: string;
  subtitle: string;
  techItems: ServiceTechItem[];
}

export default function ServiceTechEcosystem({
  activeSvcId,
  title,
  subtitle,
  techItems,
}: Props) {
  return (
    <div className="bg-white border border-[#D8E2ED] rounded-2xl p-7 sm:p-8 shadow-[0_4px_16px_rgba(15,23,42,0.03)] transition-all duration-300">
      <div
        key={`tech-hdr-${activeSvcId}`}
        className="text-center max-w-[850px] mx-auto mb-8 animate-header-enter"
      >
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-[-0.02em] mb-1.5 leading-tight">
          {title}
        </h3>
        <p className="text-[14.5px] text-[#475569] m-0 font-normal">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5">
        {techItems.map((tech, idx) => {
          const iconSvg =
            TECH_ICONS[tech.name.toUpperCase()] ||
            TECH_ICONS[tech.name] ||
            null;

          return (
            <div
              key={`${activeSvcId}-${tech.name}-${idx}`}
              style={{ animationDelay: `${idx * 35}ms` }}
              className="bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center h-full min-h-[104px] shadow-[0_2px_6px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 hover:shadow-[0_10px_22px_-2px_rgba(0,82,255,0.15)] transition-all duration-300 ease-out animate-card-enter cursor-default"
            >
              <div className="w-10 h-10 flex items-center justify-center mb-3 [&>svg]:w-9 [&>svg]:h-9 [&>svg]:object-contain">
                {tech.iconUrl ? (
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    className="w-9 h-9 object-contain"
                  />
                ) : iconSvg ? (
                  <div
                    className="w-9 h-9 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: iconSvg }}
                  />
                ) : (
                  <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-[11px] font-bold text-slate-700">
                    {tech.name.substring(0, 3)}
                  </div>
                )}
              </div>
              <span className="text-[13px] font-semibold text-[#1E293B] leading-tight text-center break-words">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
