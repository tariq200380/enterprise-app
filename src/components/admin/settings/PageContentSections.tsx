"use client";

import React from "react";
import { WebsiteSettingsData } from "./types";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export function HeaderFooterSection({ settings, onChange }: Props) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-sm font-bold text-[#0F172A] border-b pb-3">Header Navigation &amp; Footer Text</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Header Logo URL</label>
          <input
            type="text"
            value={settings.headerLogoUrl}
            onChange={(e) => onChange("headerLogoUrl", e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Header CTA Text</label>
          <input
            type="text"
            value={settings.headerCtaText}
            onChange={(e) => onChange("headerCtaText", e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Footer Paragraph 1</label>
        <input
          type="text"
          value={settings.footerP1}
          onChange={(e) => onChange("footerP1", e.target.value)}
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
        />
      </div>
    </div>
  );
}
