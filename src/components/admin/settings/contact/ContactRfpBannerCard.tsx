"use client";

import React from "react";
import { ContactSettingsData } from "../types";

interface Props {
  data: ContactSettingsData;
  onChange: (field: keyof ContactSettingsData, value: string) => void;
}

export default function ContactRfpBannerCard({ data, onChange }: Props) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center gap-2">
        <span className="text-sm">📫</span>
        <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
          Bottom Enterprise RFP Banner
        </h3>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* Banner Title */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            CTA Banner Title
          </label>
          <input
            type="text"
            value={data.rfpBannerTitle}
            onChange={(e) => onChange("rfpBannerTitle", e.target.value)}
            placeholder="Prefer direct enterprise correspondence?"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
          />
        </div>

        {/* Banner Description */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            CTA Banner Description
          </label>
          <textarea
            rows={2}
            value={data.rfpBannerDescription}
            onChange={(e) => onChange("rfpBannerDescription", e.target.value)}
            placeholder="Send your RFP, architecture specs, or tender documents directly to our senior leadership inbox..."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
          />
        </div>

        {/* Button Text & Target Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={data.rfpButtonText}
              onChange={(e) => onChange("rfpButtonText", e.target.value)}
              placeholder="Email RFP / Architecture Docs"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              CTA Target Email
            </label>
            <input
              type="text"
              value={data.rfpTargetEmail}
              onChange={(e) => onChange("rfpTargetEmail", e.target.value)}
              placeholder="projects@creed-tech.com"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
