"use client";

import React from "react";
import { HomeServiceItem, WebsiteSettingsData } from "../types";
import HomeServiceItemCard from "./HomeServiceItemCard";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function HomeServicesCard({ settings, onChange }: Props) {
  const services = settings.homeServices || [];

  const handleServiceChange = (
    index: number,
    field: keyof HomeServiceItem,
    value: string
  ) => {
    const updated = [...services];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("homeServices", updated);
  };

  const handleAddService = () => {
    const newService: HomeServiceItem = {
      id: `service-${Date.now()}`,
      title: "",
      description: "",
      linkText: "Learn more",
      linkUrl: "/services",
      iconKey: "code",
      customIconUrl: "",
    };
    onChange("homeServices", [...services, newService]);
  };

  const handleDeleteService = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    onChange("homeServices", updated);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
              ⚙️
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">
              Services Showcase (&quot;What We Provide&quot;)
            </h3>
          </div>
          <p className="text-xs text-[#64748B]">
            Manage the specialized engineering domains displayed on the homepage. Upload custom icons directly from your computer or pick built-in SVG presets.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddService}
          className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add Service</span>
        </button>
      </div>

      {/* Section Meta */}
      <div className="flex flex-col gap-4 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Headline <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={settings.servicesHeadline || ""}
            onChange={(e) => onChange("servicesHeadline", e.target.value)}
            placeholder="What We Provide"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Description Paragraph
          </label>
          <textarea
            rows={2}
            value={settings.servicesDescription || ""}
            onChange={(e) => onChange("servicesDescription", e.target.value)}
            placeholder="Eight specialized engineering domains tailored for mission-critical enterprise scale..."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
      </div>

      {/* Services List Sub-Header */}
      <div className="pt-2">
        <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-4">
          INDIVIDUAL SERVICE DOMAIN CARDS
        </h4>

        {/* Dynamic Services List */}
        <div className="flex flex-col gap-5">
          {services.map((service, idx) => (
            <HomeServiceItemCard
              key={service.id || `service-${idx}`}
              service={service}
              index={idx}
              onChange={(field, val) => handleServiceChange(idx, field, val)}
              onDelete={() => handleDeleteService(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
