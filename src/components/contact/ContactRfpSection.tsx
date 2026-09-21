import React from "react";
import { ContactSettingsData } from "@/components/admin/settings/types";

interface ContactRfpSectionProps {
  settings?: Partial<ContactSettingsData>;
  onOpenScopingModal: () => void;
}

export default function ContactRfpSection({
  settings,
  onOpenScopingModal,
}: ContactRfpSectionProps) {
  const title =
    settings?.rfpBannerTitle || "Let's Build Your Next High-Performance Platform";
  const description =
    settings?.rfpBannerDescription ||
    "Schedule a confidential sprint architecture consultation with our principal software architects.";

  return (
    <section className="w-full bg-[#0B1120] py-10 sm:py-12 text-white text-center relative overflow-hidden border-t border-white/10">
      {/* Soft Orange Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.22)_0%,transparent_65%)]"
      />
      <div className="max-w-2xl mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
        <span className="text-[11px] font-semibold text-[#FF6B00] uppercase tracking-wider">
          READY TO ELEVATE YOUR SYSTEM ARCHITECTURE?
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-bold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed font-normal">
          {description}
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenScopingModal}
            className="inline-flex items-center justify-center gap-1.5 bg-black hover:bg-[#EA580C] hover:border-[#EA580C] text-white font-semibold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase border border-white/20 transition-colors shadow-xs cursor-pointer"
          >
            <span>Start Technical Scoping</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
