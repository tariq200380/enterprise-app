"use client";

import React from "react";
import { ContactGlobalHubItem, ContactSettingsData } from "../types";

interface Props {
  data: ContactSettingsData;
  onChangeField: (field: keyof ContactSettingsData, value: any) => void;
}

export default function ContactGlobalHubsCard({ data, onChangeField }: Props) {
  const hubs = data.globalHubs || [];

  const handleAddHub = () => {
    const newHub: ContactGlobalHubItem = {
      id: `hub-${Date.now()}`,
      countryCity: "🌐 New City, Country",
      timezone: "UTC+0",
      address: "Enterprise Tower, Business District",
    };
    onChangeField("globalHubs", [...hubs, newHub]);
  };

  const handleUpdateHub = (
    index: number,
    field: keyof ContactGlobalHubItem,
    value: string
  ) => {
    const updated = [...hubs];
    updated[index] = { ...updated[index], [field]: value };
    onChangeField("globalHubs", updated);
  };

  const handleDeleteHub = (index: number) => {
    if (confirm(`Delete Hub #${index + 1}?`)) {
      const updated = hubs.filter((_, i) => i !== index);
      onChangeField("globalHubs", updated);
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">🌍</span>
          <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
            Global Engineering Hubs (Offices &amp; Locations)
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddHub}
          className="px-3.5 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add Global Hub</span>
        </button>
      </div>

      <div className="p-6 flex flex-col gap-5">
        {/* Section Title */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Hubs Section Title
          </label>
          <input
            type="text"
            value={data.hubsTitle || "Three Global Engineering Hubs"}
            onChange={(e) => onChangeField("hubsTitle", e.target.value)}
            placeholder="Three Global Engineering Hubs"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
          />
        </div>

        {/* Hubs Items List */}
        <div className="flex flex-col gap-4">
          {hubs.map((hub, idx) => (
            <div
              key={hub.id || idx}
              className="border border-[#E2E8F0] rounded-lg overflow-hidden bg-white"
            >
              {/* Hub Item Header */}
              <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0F172A]">
                  Hub #{idx + 1}: {hub.countryCity || "Untitled Hub"}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteHub(idx)}
                  className="px-2.5 py-1 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[11px] font-bold rounded cursor-pointer transition-colors"
                >
                  ✕ Delete
                </button>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {/* Country & City + Timezone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                      Country &amp; City (with Flag Emoji)
                    </label>
                    <input
                      type="text"
                      value={hub.countryCity}
                      onChange={(e) => handleUpdateHub(idx, "countryCity", e.target.value)}
                      placeholder="🇩🇪 Frankfurt, Germany"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                      Timezone
                    </label>
                    <input
                      type="text"
                      value={hub.timezone}
                      onChange={(e) => handleUpdateHub(idx, "timezone", e.target.value)}
                      placeholder="CET (UTC+1)"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] text-[#0052FF] font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                    Physical Address / Office Location
                  </label>
                  <input
                    type="text"
                    value={hub.address}
                    onChange={(e) => handleUpdateHub(idx, "address", e.target.value)}
                    placeholder="Taunusanlage 8, Financial Centre, Frankfurt"
                    className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] text-[#334155]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
