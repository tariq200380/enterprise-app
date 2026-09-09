"use client";

import React from "react";
import { ContactSettingsData } from "../types";

interface Props {
  data: ContactSettingsData;
  onChange: (field: keyof ContactSettingsData, value: string) => void;
}

export default function ContactHeroMetricsCard({ data, onChange }: Props) {
  const metrics = [
    {
      num: 1,
      labelKey: "metric1Label" as const,
      valKey: "metric1Value" as const,
      placeholderLabel: "Average Response",
      placeholderVal: "< 2.4 Hours",
      valColor: "text-[#0052FF]",
    },
    {
      num: 2,
      labelKey: "metric2Label" as const,
      valKey: "metric2Value" as const,
      placeholderLabel: "NDA & IP Protection",
      placeholderVal: "Signed Day 1",
      valColor: "text-[#0F172A]",
    },
    {
      num: 3,
      labelKey: "metric3Label" as const,
      valKey: "metric3Value" as const,
      placeholderLabel: "Verified Ratings",
      placeholderVal: "5.0 Clutch & Google",
      valColor: "text-[#FF6B00]",
    },
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
        <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
          Contact Page Hero &amp; Metrics
        </h3>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* Row 1: Hero Badge & Headline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Hero Badge Tag
            </label>
            <input
              type="text"
              value={data.heroBadge}
              onChange={(e) => onChange("heroBadge", e.target.value)}
              placeholder="DIRECT ARCHITECT ACCESS • 4-HOUR GUARANTEED SLA"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Hero Headline *
            </label>
            <input
              type="text"
              value={data.heroHeadline}
              onChange={(e) => onChange("heroHeadline", e.target.value)}
              placeholder="Let's Build Something Enduring Together"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold text-[#0F172A]"
            />
          </div>
        </div>

        {/* Row 2: Hero Description */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Hero Description Paragraph
          </label>
          <textarea
            rows={2}
            value={data.heroDescription}
            onChange={(e) => onChange("heroDescription", e.target.value)}
            placeholder="Connect directly with senior systems architects and technical leaders..."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
          />
        </div>

        {/* Row 3: 3 Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {metrics.map((m) => (
            <div
              key={m.num}
              className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex flex-col gap-2"
            >
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                  Metric {m.num} Label
                </label>
                <input
                  type="text"
                  value={data[m.labelKey]}
                  onChange={(e) => onChange(m.labelKey, e.target.value)}
                  placeholder={m.placeholderLabel}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                  Metric {m.num} Value
                </label>
                <input
                  type="text"
                  value={data[m.valKey]}
                  onChange={(e) => onChange(m.valKey, e.target.value)}
                  placeholder={m.placeholderVal}
                  className={`w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold ${m.valColor}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
