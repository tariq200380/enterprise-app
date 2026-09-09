"use client";

import React from "react";
import { PortfolioShowcaseSettings } from "../types";

interface PortfolioShowcaseCardProps {
  showcase: PortfolioShowcaseSettings;
  onChange: (field: keyof PortfolioShowcaseSettings, value: string) => void;
}

export default function PortfolioShowcaseCard({
  showcase,
  onChange,
}: PortfolioShowcaseCardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center gap-2">
        <span className="text-sm">🖼️</span>
        <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
          PORTFOLIO ENGINEERING STANDARDS SHOWCASE SECTION
        </h3>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* Section Headline */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Headline
          </label>
          <input
            type="text"
            value={showcase.headline}
            onChange={(e) => onChange("headline", e.target.value)}
            placeholder="Built on Rigorous Enterprise Standards"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
          />
        </div>

        {/* Showcase Picture URL with Preview */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Showcase Picture URL
          </label>
          <div className="flex items-center gap-3">
            {showcase.showcasePictureUrl ? (
              <img
                src={showcase.showcasePictureUrl}
                alt="Showcase Preview"
                className="w-16 h-12 rounded object-cover border border-gray-300 shrink-0 bg-gray-100"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-16 h-12 rounded border border-dashed border-gray-300 shrink-0 bg-gray-50 flex items-center justify-center text-[10px] text-gray-400">
                No img
              </div>
            )}
            <input
              type="text"
              value={showcase.showcasePictureUrl}
              onChange={(e) => onChange("showcasePictureUrl", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>

        {/* Badge Label & Overlay Metric Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={showcase.badgeLabel}
              onChange={(e) => onChange("badgeLabel", e.target.value)}
              placeholder="ENGINEERING CULTURE"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Overlay Metric Title
            </label>
            <input
              type="text"
              value={showcase.overlayMetricTitle}
              onChange={(e) => onChange("overlayMetricTitle", e.target.value)}
              placeholder="100% Principal Engineer Led"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>

        {/* Description Paragraph */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Description Paragraph
          </label>
          <textarea
            rows={3}
            value={showcase.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Every case study in our portfolio is the direct outcome of disciplined architectural principles..."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
