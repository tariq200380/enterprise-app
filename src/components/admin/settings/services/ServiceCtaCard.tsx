"use client";

import React from "react";
import { ServiceExplorerItem } from "../types";

interface Props {
  service: ServiceExplorerItem;
  onChange: (field: keyof ServiceExplorerItem, value: string) => void;
}

export default function ServiceCtaCard({ service, onChange }: Props) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
        <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
          🚀
        </span>
        <div>
          <h3 className="text-base font-bold text-[#0F172A]">
            Left Sidebar: &quot;Start Project&quot; Call to Action
          </h3>
          <p className="text-xs text-[#64748B]">
            Configure the sticky project inquiry card in the Left Sidebar on the public /services page.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            CTA Card Heading <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={service.ctaHeading}
            onChange={(e) => onChange("ctaHeading", e.target.value)}
            placeholder="Have a Software Project in Mind?"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Button Label Text <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={service.ctaBtnText}
            onChange={(e) => onChange("ctaBtnText", e.target.value)}
            placeholder="Start Your Project"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8">
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            CTA Description
          </label>
          <textarea
            rows={2}
            value={service.ctaDesc}
            onChange={(e) => onChange("ctaDesc", e.target.value)}
            placeholder="Share your requirements with our team and explore a practical development approach for your business."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
          />
        </div>

        <div className="sm:col-span-4">
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Button Destination Link
          </label>
          <input
            type="text"
            value={service.ctaBtnUrl || "/contact"}
            onChange={(e) => onChange("ctaBtnUrl", e.target.value)}
            placeholder="/contact"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
          />
        </div>
      </div>
    </div>
  );
}
