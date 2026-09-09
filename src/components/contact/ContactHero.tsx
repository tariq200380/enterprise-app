import React from "react";
import { ContactSettingsData } from "../admin/settings/types";

interface Props {
  data: ContactSettingsData;
}

export default function ContactHero({ data }: Props) {
  return (
    <section className="w-full bg-gradient-to-b from-[#F2F5FB] via-[#F8FAFC] to-white py-14 sm:py-24 border-b border-[#E5E7EB] relative overflow-hidden text-center">
      {/* Ambient Radial Gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,82,255,0.08)_0%,transparent_60%),radial-gradient(circle_at_85%_60%,rgba(255,107,0,0.06)_0%,transparent_50%)]"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Top Badge */}
        {data.heroBadge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-gray-300 text-[#0052FF] text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full inline-block" />
            <span>{data.heroBadge}</span>
          </div>
        )}

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#030712] tracking-tight leading-tight max-w-4xl mx-auto mb-3">
          {data.heroHeadline}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-[#4B5563] font-normal leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12">
          {data.heroDescription}
        </p>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto text-left">
          {data.metric1Label && (
            <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] rounded-lg shadow-sm">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                {data.metric1Label}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0052FF] mt-1 block">
                {data.metric1Value}
              </span>
            </div>
          )}

          {data.metric2Label && (
            <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] rounded-lg shadow-sm">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                {data.metric2Label}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#030712] mt-1 block">
                {data.metric2Value}
              </span>
            </div>
          )}

          {data.metric3Label && (
            <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] rounded-lg shadow-sm">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                {data.metric3Label}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#FF6B00] mt-1 block">
                {data.metric3Value}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
