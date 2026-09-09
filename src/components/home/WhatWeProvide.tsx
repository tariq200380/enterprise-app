import React from "react";
import Link from "next/link";
import { HomeServiceItem, DEFAULT_WEBSITE_SETTINGS } from "@/components/admin/settings/types";
import HomeServiceIcon from "./HomeServiceIcon";

interface Props {
  headline?: string;
  description?: string;
  services?: HomeServiceItem[];
}

export default function WhatWeProvide({
  headline = DEFAULT_WEBSITE_SETTINGS.servicesHeadline,
  description = DEFAULT_WEBSITE_SETTINGS.servicesDescription,
  services,
}: Props) {
  const activeServices = services && services.length > 0 ? services : DEFAULT_WEBSITE_SETTINGS.homeServices;

  return (
    <section className="w-full bg-[#F8FAFC] pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-gray-200 relative overflow-hidden select-none" id="what-we-provide-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center relative z-10">
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col items-center text-center mb-10 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#0F172A] leading-tight">
            {headline}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* 2 Columns Desktop Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs overflow-hidden p-1.5">
                <HomeServiceIcon
                  iconKey={service.iconKey}
                  customIconUrl={service.customIconUrl}
                  altText={service.title}
                />
              </div>
              <div className="flex-1 flex flex-col h-full">
                <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                  {service.description}
                </p>
                {service.linkUrl && (
                  <Link
                    href={service.linkUrl}
                    className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit"
                  >
                    <span>{service.linkText || "Learn more"}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
