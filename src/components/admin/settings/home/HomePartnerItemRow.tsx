"use client";

import React, { useState } from "react";
import { PartnerLogoItem } from "../types";
import { uploadImageFile } from "@/lib/uploadHelper";

interface Props {
  partner: PartnerLogoItem;
  index: number;
  onChange: (field: keyof PartnerLogoItem, value: string) => void;
  onDelete: () => void;
}

export default function HomePartnerItemRow({ partner, index, onChange, onDelete }: Props) {
  const [uploading, setUploading] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const title = partner.name ? `LOGO ${num}: ${partner.name}` : `LOGO ${num}: New Partner`;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        onChange("logoUrl", url);
        if (!partner.name) {
          const rawName = file.name.split(".")[0] || "";
          onChange("name", rawName.charAt(0).toUpperCase() + rawName.slice(1));
        }
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-[#0052FF] text-white text-[10px] font-bold flex items-center justify-center">
            {num}
          </span>
          <span className="text-xs font-bold text-[#0F172A]">{title}</span>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="px-2.5 py-1 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[11px] font-bold rounded cursor-pointer transition-colors flex items-center gap-1"
        >
          <span>✕</span>
          <span>Delete</span>
        </button>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Preview & Name */}
        <div className="sm:col-span-3 flex items-center gap-2">
          <div className="w-20 h-12 rounded border border-gray-300 bg-white flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-xs">
            {partner.logoUrl ? (
              <img
                src={partner.logoUrl}
                alt={partner.name || "Partner logo"}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <span className="text-[9px] text-gray-400 text-center font-medium">No logo</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={partner.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Google"
              className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-semibold"
            />
          </div>
        </div>

        {/* Logo URL & File Upload */}
        <div className="sm:col-span-5">
          <div className="flex items-center justify-between mb-0.5">
            <label className="block text-[11px] font-semibold text-[#334155]">
              Logo Image URL <span className="text-red-500">*</span>
            </label>
            <label className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0052FF] text-[10px] font-bold rounded cursor-pointer transition-colors border border-[#BFDBFE]">
              <span>{uploading ? "⏳ Uploading..." : "📁 Upload from System"}</span>
              <input
                type="file"
                accept="image/*,.svg,.webp"
                className="hidden"
                disabled={uploading}
                onChange={handleFile}
              />
            </label>
          </div>
          <input
            type="text"
            value={partner.logoUrl}
            onChange={(e) => onChange("logoUrl", e.target.value)}
            placeholder="/images/partners/google.webp or https://..."
            className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
          />
        </div>

        {/* Destination URL */}
        <div className="sm:col-span-4">
          <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
            Destination Website URL
          </label>
          <input
            type="text"
            value={partner.websiteUrl}
            onChange={(e) => onChange("websiteUrl", e.target.value)}
            placeholder="https://www.google.com"
            className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
      </div>
    </div>
  );
}
