"use client";

import React from "react";
import { ServiceExplorerItem } from "../types";

interface Props {
  service: ServiceExplorerItem;
  onChange: (field: keyof ServiceExplorerItem, value: string) => void;
}

export default function ServiceGeneralCard({ service, onChange }: Props) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
        <span className="w-8 h-8 rounded bg-[#FFF3EB] text-[#FF6B00] flex items-center justify-center font-bold text-xs">
          {service.num || "01"}
        </span>
        <div>
          <h3 className="text-base font-bold text-[#0F172A]">
            Service Information &amp; Introduction
          </h3>
          <p className="text-xs text-[#64748B]">
            Set the service title, number prefix, tagline subtitle, and core description paragraph.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-3">
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Number Prefix <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={service.num}
            onChange={(e) => onChange("num", e.target.value)}
            placeholder="01"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold"
          />
        </div>

        <div className="sm:col-span-9">
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Service Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={service.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Software Development"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold text-[#0052FF]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#334155] mb-1">
          Subtitle / Tagline <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={service.tagline}
          onChange={(e) => onChange("tagline", e.target.value)}
          placeholder="Reliable Software Built Around Your Business"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-medium"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#334155] mb-1">
          Overview Introduction Paragraph <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          value={service.intro}
          onChange={(e) => onChange("intro", e.target.value)}
          placeholder="We design and develop secure scalable software solutions tailored to real business requirements..."
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
        />
      </div>
    </div>
  );
}
