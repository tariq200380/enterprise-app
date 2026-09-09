"use client";

import React from "react";
import { WebsiteSettingsData } from "../types";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function FooterBrandCard({ settings, onChange }: Props) {
  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-[#E2E8F0] mb-4 flex items-center gap-2">
        <span>📄</span> Footer Brand Description
      </h3>
      <div>
        <label className="block text-xs font-semibold text-[#334155] mb-1">
          Footer Paragraph 1 (Company Overview)
        </label>
        <textarea
          rows={3}
          value={settings.footerP1 || ""}
          placeholder="Pioneering high-assurance cognitive cloud infrastructure for enterprises."
          onChange={(e) => onChange("footerP1", e.target.value)}
          className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0052FF]"
        />
      </div>
    </div>
  );
}
