"use client";

import React, { useState } from "react";
import { HomeServiceItem } from "../types";
import { uploadImageFile } from "@/lib/uploadHelper";

export const SERVICE_ICON_OPTIONS = [
  { value: "code", label: "💻 Code / Software Development" },
  { value: "design", label: "🎨 UI/UX Design" },
  { value: "mobile", label: "📱 Mobile Applications" },
  { value: "cloud", label: "☁️ Cloud Infrastructure" },
  { value: "database", label: "🗄️ Database Management" },
  { value: "security", label: "🛡️ Cybersecurity & QA" },
  { value: "ai", label: "🧠 Artificial Intelligence (AI)" },
  { value: "marketing", label: "📈 Digital Marketing & Branding" },
];

interface Props {
  service: HomeServiceItem;
  index: number;
  onChange: (field: keyof HomeServiceItem, value: string) => void;
  onDelete: () => void;
}

export default function HomeServiceItemCard({ service, index, onChange, onDelete }: Props) {
  const [uploading, setUploading] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const title = service.title ? `SERVICE ${num}: ${service.title}` : `SERVICE ${num}: New Service Domain`;

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        onChange("customIconUrl", url);
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#F1F5F9] border-b border-[#CBD5E1] px-5 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-[#0052FF] text-white text-[11px] font-bold flex items-center justify-center">
            {num}
          </span>
          <h5 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase truncate max-w-[450px]">
            {title}
          </h5>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="px-3 py-1.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1"
        >
          <span>✕</span>
          <span>Delete Service</span>
        </button>
      </div>

      {/* Fields */}
      <div className="p-5 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Service Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={service.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Software Development"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-[#334155]">
                Service Icon (Upload or Preset)
              </label>
              <label className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0052FF] text-[10px] font-bold rounded cursor-pointer transition-colors border border-[#BFDBFE]">
                <span>{uploading ? "⏳ Uploading..." : "📁 Upload from System"}</span>
                <input
                  type="file"
                  accept="image/*,.svg,.webp"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleIconUpload}
                />
              </label>
            </div>

            {service.customIconUrl ? (
              <div className="flex items-center gap-2 p-1.5 bg-[#F0F5FF] border border-[#BFDBFE] rounded">
                <img
                  src={service.customIconUrl}
                  alt="Custom icon"
                  className="w-7 h-7 object-contain rounded bg-white p-0.5 border border-gray-200 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="text-xs text-[#0052FF] font-semibold flex-1 truncate">
                  Custom Uploaded Icon
                </span>
                <button
                  type="button"
                  onClick={() => onChange("customIconUrl", "")}
                  className="text-[10px] text-red-600 hover:text-red-800 font-bold px-1.5 py-0.5 bg-red-50 hover:bg-red-100 rounded border border-red-200 cursor-pointer"
                >
                  ✕ Use Preset
                </button>
              </div>
            ) : (
              <select
                value={service.iconKey || "code"}
                onChange={(e) => onChange("iconKey", e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white cursor-pointer"
              >
                {SERVICE_ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={2}
            value={service.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Custom web and mobile applications engineered for reliability..."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Link Text
            </label>
            <input
              type="text"
              value={service.linkText}
              onChange={(e) => onChange("linkText", e.target.value)}
              placeholder="Learn more"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Destination URL
            </label>
            <input
              type="text"
              value={service.linkUrl}
              onChange={(e) => onChange("linkUrl", e.target.value)}
              placeholder="/services#software-development"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
