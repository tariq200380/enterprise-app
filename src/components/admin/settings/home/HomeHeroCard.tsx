"use client";

import React from "react";
import { WebsiteSettingsData } from "../types";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function HomeHeroCard({ settings, onChange }: Props) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col gap-5">
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
        <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
          🚀
        </span>
        <div>
          <h3 className="text-base font-bold text-[#0F172A]">Homepage Hero Content</h3>
          <p className="text-xs text-[#64748B]">
            Configure the main headline, description, and call-to-action buttons for the top hero banner.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#334155] mb-1">
          Hero Headline <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={settings.heroHeadline || ""}
          onChange={(e) => onChange("heroHeadline", e.target.value)}
          placeholder="Engineering Scalable Enterprise Systems..."
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded font-bold outline-none focus:border-[#0052FF]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#334155] mb-1">
          Hero Subheadline / Description
        </label>
        <textarea
          rows={3}
          value={settings.heroSubheadline || ""}
          onChange={(e) => onChange("heroSubheadline", e.target.value)}
          placeholder="We design, architect, and deploy production-grade software solutions..."
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Primary CTA Button Text</label>
          <input
            type="text"
            value={settings.heroCta1Text || ""}
            onChange={(e) => onChange("heroCta1Text", e.target.value)}
            placeholder="Get Started"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Primary CTA URL</label>
          <input
            type="text"
            value={settings.heroCta1Url || ""}
            onChange={(e) => onChange("heroCta1Url", e.target.value)}
            placeholder="/contact"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Secondary CTA Button Text</label>
          <input
            type="text"
            value={settings.heroCta2Text || ""}
            onChange={(e) => onChange("heroCta2Text", e.target.value)}
            placeholder="Explore Services"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Secondary CTA URL</label>
          <input
            type="text"
            value={settings.heroCta2Url || ""}
            onChange={(e) => onChange("heroCta2Url", e.target.value)}
            placeholder="/services"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
      </div>
    </div>
  );
}
