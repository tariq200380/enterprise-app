import React from "react";
import { ContactSettingsData } from "../admin/settings/types";

interface Props {
  data: ContactSettingsData;
}

export default function ContactOnboardingSection({ data }: Props) {
  const steps = data.onboardingSteps || [];

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-[#E5E7EB] text-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-xl mx-auto mb-12 sm:mb-16">
          {data.stepsBadge && (
            <span className="text-[11.5px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1.5">
              {data.stepsBadge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-2">
            {data.stepsTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-normal leading-relaxed">
            {data.stepsDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {steps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="bg-[#FAFAFC] border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col justify-between min-h-[240px]"
            >
              <div>
                <span className="text-2xl font-bold font-mono text-[#0052FF] block mb-3">
                  {step.number || String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-[#030712] mb-2">
                  {step.headline}
                </h3>
                <p className="text-[13px] text-[#4B5563] leading-relaxed font-normal">
                  {step.explanation}
                </p>
              </div>
              {step.timelineSla && (
                <div className="mt-5 pt-3 border-t border-[#E5E7EB] text-xs font-bold text-[#0052FF]">
                  {step.timelineSla}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
