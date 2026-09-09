"use client";

import React from "react";
import { WebsiteSettingsData } from "../types";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function HeaderCtaCard({ settings, onChange }: Props) {
  const showCta = settings.headerShowCta !== false;

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
            <span>🔘</span> Header CTA Button
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Control the primary action button located at the right side of the navbar.
          </p>
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showCta}
            onChange={(e) => onChange("headerShowCta", e.target.checked)}
            className="w-4 h-4 rounded text-[#0052FF] accent-[#0052FF] cursor-pointer"
          />
          <span className="text-xs font-bold text-[#1E293B]">Show CTA Button</span>
        </label>
      </div>

      {showCta && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={settings.headerCtaText || ""}
              placeholder="Get Started"
              onChange={(e) => onChange("headerCtaText", e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              CTA Button Target URL
            </label>
            <input
              type="text"
              value={settings.headerCtaUrl || ""}
              placeholder="/contact"
              onChange={(e) => onChange("headerCtaUrl", e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
