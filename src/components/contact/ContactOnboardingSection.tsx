import React from "react";
import { ContactSettingsData } from "@/components/admin/settings/types";

interface ContactOnboardingSectionProps {
  settings?: Partial<ContactSettingsData>;
}

export default function ContactOnboardingSection({ settings }: ContactOnboardingSectionProps) {
  const badge = settings?.stepsBadge || "HOW WE ENGAGE & DELIVER";
  const title = settings?.stepsTitle || "Transparent, Zero-Friction Onboarding";
  const desc =
    settings?.stepsDescription ||
    "From initial technical scoping to dedicated sprint kickoff, our onboarding protocol is engineered for velocity, complete transparency, and architectural rigor.";

  return (
    <section className="w-full py-10 sm:py-12 border-b border-[#E2E8F0] bg-[#F7F6F5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#EA580C] font-mono mb-2 block">
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-[#0F172A] tracking-tight leading-tight mb-3">
            {title}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {desc}
          </p>
        </div>

        {/* 4 Direct Steps Grid (Simple, Editable JSX Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          {/* Step 01 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-3">
                01
              </span>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                Technical Scoping &amp; NDA
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Mutual NDA execution followed by a deep-dive technical review of your system
                parameters, dependencies, and business goals.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-400 border-t border-[#E2E8F0] pt-2.5">
              TIMEFRAME: DAY 1
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-3">
                02
              </span>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                Architecture Blueprint
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Our principal engineers deliver a comprehensive architectural diagram, technology
                matrix, milestone breakdown, and SLA agreement.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-400 border-t border-[#E2E8F0] pt-2.5">
              TIMEFRAME: DAY 2–3
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-3">
                03
              </span>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                Dedicated Pod Formation
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                A bespoke pod of senior principal engineers is locked into your context with
                dedicated Slack channels and synchronized sprint cadences.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-400 border-t border-[#E2E8F0] pt-2.5">
              TIMEFRAME: DAY 4–5
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-3">
                04
              </span>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                Sprint Zero &amp; Production
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Immediate codebase assimilation, CI/CD pipeline automation, and delivery of the
                first functional production milestone with zero lag.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-400 border-t border-[#E2E8F0] pt-2.5">
              TIMEFRAME: WEEK 1
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
