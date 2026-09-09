"use client";

import React from "react";

interface Props {
  headline: string;
  description: string;
  onChange: (field: "sectionHeadline" | "sectionDescription", value: string) => void;
}

export default function ServicesExplorerHeaderCard({ headline, description, onChange }: Props) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
        <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
          📋
        </span>
        <div>
          <h3 className="text-base font-bold text-[#0F172A]">
            Section Title &amp; Subtitle
          </h3>
          <p className="text-xs text-[#64748B]">
            Configure the main header and description displayed at the top of the interactive services explorer.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Headline <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => onChange("sectionHeadline", e.target.value)}
            placeholder="Enterprise Engineering & Digital Solutions"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Description Paragraph
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => onChange("sectionDescription", e.target.value)}
            placeholder="Select any service below to explore dedicated capabilities, technical benefits, delivery methodology, results, and Tech Ecosystem."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
          />
        </div>
      </div>
    </div>
  );
}
