import React from "react";
import { ContactSettingsData } from "@/components/admin/settings/types";

interface ContactHeroSectionProps {
  settings?: Partial<ContactSettingsData>;
}

export default function ContactHeroSection({ settings }: ContactHeroSectionProps) {
  const badge = settings?.heroBadge || "DIRECT SOLUTIONS ARCHITECTURE & ENGINEERING";
  const headline = settings?.heroHeadline || "Let's Architect Your Next Critical Platform.";
  const description =
    settings?.heroDescription ||
    "Connect directly with our senior principal software architects. Skip the sales pitch — receive an actionable architectural scoping blueprint, SLA guarantee, and zero-obligation mutual NDA protection within 2 to 4 hours.";

  const m1Label = settings?.metric1Label || "RESPONSE GUARANTEE";
  const m1Value = settings?.metric1Value || "< 2 Hours";
  const m2Label = settings?.metric2Label || "ENGINEERING PAIRING";
  const m2Value = settings?.metric2Value || "100% Direct";
  const m3Label = settings?.metric3Label || "LEGAL & IP";
  const m3Value = settings?.metric3Value || "Mutual NDA";

  return (
    <section className="w-full bg-[#0B1120] py-10 sm:py-12 px-6 sm:px-10 lg:px-16 relative overflow-hidden text-left border-b border-white/10">
      {/* Ambient Orange Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,107,0,0.17)_0%,rgba(255,107,0,0.05)_45%,rgba(11,17,32,0)_70%),radial-gradient(circle_at_0%_50%,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.05)_40%,rgba(11,17,32,0)_65%),radial-gradient(circle_at_100%_50%,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.05)_40%,rgba(11,17,32,0)_65%)]"
      />
      {/* Subtle 36px Grid Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.035]"
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14 relative z-10">
        {/* Left Column */}
        <div className="w-full md:w-1/2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#AEB6C2] mb-2.5">
            {badge}
          </div>
          <div className="w-[60px] h-[2px] bg-[#FF6B00] opacity-80 mb-6" />

          <h1 className="text-[32px] sm:text-[44px] font-outfit font-bold text-white leading-[1.15] mb-4 tracking-tight">
            {headline.includes(".") ? (
              <>
                <span>{headline.split(".")[0]}.</span>
                {headline.split(".")[1] && (
                  <span className="block text-white/90">{headline.split(".").slice(1).join(".")}</span>
                )}
              </>
            ) : (
              headline
            )}
          </h1>

          <p className="text-base font-normal text-white/75 leading-[1.7] max-w-[520px]">
            {description}
          </p>
        </div>

        {/* Right Column: 4 Stat Metrics (Clean, direct JSX) */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-y-8 gap-x-6 sm:gap-x-10 text-left">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {m1Label}
            </span>
            <div className="text-2xl sm:text-3xl font-outfit font-bold text-white mt-1.5 mb-1 tracking-tight">
              {m1Value}
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              Direct acknowledgment and preliminary review by a principal solutions engineer.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {m2Label}
            </span>
            <div className="text-2xl sm:text-3xl font-outfit font-bold text-white mt-1.5 mb-1 tracking-tight">
              {m2Value}
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              No non-technical account managers. Every conversation is with lead systems architects.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {m3Label}
            </span>
            <div className="text-2xl sm:text-3xl font-outfit font-bold text-white mt-1.5 mb-1 tracking-tight">
              {m3Value}
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              Instant bilateral NDA protection before deep architecture or codebase sharing.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              DELIVERY COMMITMENT
            </span>
            <div className="text-2xl sm:text-3xl font-outfit font-bold text-white mt-1.5 mb-1 tracking-tight">
              99.99% SLA
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              Contractual milestones, sprint cadence, and production uptime backed by guarantees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
