"use client";

import React from "react";
import { AboutEngineeringHubItem, AboutSettingsData } from "../types";

interface Props {
  data: AboutSettingsData;
  onChangeField: (field: keyof AboutSettingsData, value: any) => void;
}

export default function AboutEngineeringHubsCard({ data, onChangeField }: Props) {
  const hubs = data.hubs || [];

  const handleHubChange = (index: number, field: keyof AboutEngineeringHubItem, value: string) => {
    const updated = [...hubs];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChangeField("hubs", updated);
  };

  const handleAddHub = () => {
    const newHub: AboutEngineeringHubItem = {
      id: `hub-${Date.now()}`,
      city: "",
      country: "",
      coverImageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80",
      statusTag: "Active Regional Engineering Pod",
      specialization: "",
      address: "",
    };
    onChangeField("hubs", [...hubs, newHub]);
  };

  const handleDeleteHub = (index: number) => {
    const updated = hubs.filter((_, i) => i !== index);
    onChangeField("hubs", updated);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
              🌐
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">
              Global Engineering Centers &amp; Hubs
            </h3>
          </div>
          <p className="text-xs text-[#64748B]">
            Manage international hub cities, countries, core specializations, addresses, and cover photos shown on the About page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddHub}
          className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add Engineering Center</span>
        </button>
      </div>

      {/* Section Meta Inputs */}
      <div className="flex flex-col gap-4 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Section Badge Tag
            </label>
            <input
              type="text"
              value={data.hubsBadgeTag || ""}
              onChange={(e) => onChangeField("hubsBadgeTag", e.target.value)}
              placeholder="GLOBAL REACH & CONTINUOUS COVERAGE"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Section Headline <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.hubsHeadline || ""}
              onChange={(e) => onChangeField("hubsHeadline", e.target.value)}
              placeholder="Three Specialized Global Engineering Centers"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Description Paragraph
          </label>
          <textarea
            rows={2}
            value={data.hubsDescription || ""}
            onChange={(e) => onChangeField("hubsDescription", e.target.value)}
            placeholder="Operating across multiple time zones to deliver seamless 24/7 technical continuity and deep regional domain expertise."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
      </div>

      {/* Hub Cards Sub-Header */}
      <div className="pt-2">
        <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-4">
          REGIONAL ENGINEERING HUB CARDS
        </h4>

        {/* Dynamic Hub Cards List */}
        <div className="flex flex-col gap-5">
          {hubs.map((hub, idx) => {
            const hubNum = String(idx + 1).padStart(2, "0");
            const titleLabel = hub.city
              ? `HUB ${hubNum}: ${hub.city}${hub.country ? ` (${hub.country})` : ""}`
              : `HUB ${hubNum}: New Engineering Hub`;

            return (
              <div
                key={hub.id || `hub-${idx}`}
                className="bg-white border border-[#CBD5E1] rounded-lg shadow-sm overflow-hidden"
              >
                {/* Hub Card Header */}
                <div className="bg-[#F1F5F9] border-b border-[#CBD5E1] px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#0052FF] text-white text-[11px] font-bold flex items-center justify-center">
                      {hubNum}
                    </span>
                    <h5 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase truncate max-w-[450px]">
                      {titleLabel}
                    </h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteHub(idx)}
                    className="px-3 py-1.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <span>✕</span>
                    <span>Delete Hub</span>
                  </button>
                </div>

                {/* Hub Card Fields */}
                <div className="p-5 flex flex-col gap-4">
                  {/* Cover Image URL with Live Thumbnail */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Cover Image URL <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {hub.coverImageUrl ? (
                        <img
                          src={hub.coverImageUrl}
                          alt={hub.city || "Hub Cover"}
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
                        value={hub.coverImageUrl}
                        onChange={(e) => handleHubChange(idx, "coverImageUrl", e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                  </div>

                  {/* City & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        City / Hub Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={hub.city}
                        onChange={(e) => handleHubChange(idx, "city", e.target.value)}
                        placeholder="Frankfurt"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Country Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={hub.country}
                        onChange={(e) => handleHubChange(idx, "country", e.target.value)}
                        placeholder="Germany"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                  </div>

                  {/* Status Tag */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Status Tag Label
                    </label>
                    <input
                      type="text"
                      value={hub.statusTag}
                      onChange={(e) => handleHubChange(idx, "statusTag", e.target.value)}
                      placeholder="Active Regional Engineering Pod"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>

                  {/* Core Specialization */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Core Specialization Subtitle <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hub.specialization}
                      onChange={(e) => handleHubChange(idx, "specialization", e.target.value)}
                      placeholder="European Cloud Infrastructure & Cyber Defense"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-medium"
                    />
                  </div>

                  {/* Office Address Details */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Office Address Details
                    </label>
                    <input
                      type="text"
                      value={hub.address}
                      onChange={(e) => handleHubChange(idx, "address", e.target.value)}
                      placeholder="Taunusanlage 8, Financial Centre, Frankfurt"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
