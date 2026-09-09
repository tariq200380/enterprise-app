"use client";

import React, { useState, useRef } from "react";
import { ServiceExplorerItem, ServiceTechItem } from "../types";
import { TECH_ICONS } from "@/components/services/servicesData";
import { uploadImageFile } from "@/lib/uploadHelper";

interface Props {
  service: ServiceExplorerItem;
  onChange: (field: keyof ServiceExplorerItem, value: any) => void;
}

export default function ServiceTechStackCard({ service, onChange }: Props) {
  const [newName, setNewName] = useState("");
  const [newIconUrl, setNewIconUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [itemUploadingIdx, setItemUploadingIdx] = useState<number | null>(null);

  // Derive structured items: use techItems if populated, otherwise parse techStack string
  const items: ServiceTechItem[] =
    service.techItems && service.techItems.length > 0
      ? service.techItems
      : (service.techStack || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .map((name) => ({ name }));

  // Helper to commit updated items to both techItems and techStack string
  const commitItems = (updated: ServiceTechItem[]) => {
    onChange("techItems", updated);
    onChange("techStack", updated.map((i) => i.name).join(", "));
  };

  // Remove a technology
  const handleRemoveItem = (indexToRemove: number) => {
    const updated = items.filter((_, i) => i !== indexToRemove);
    commitItems(updated);
  };

  // Add a new technology
  const handleAddItem = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const newItem: ServiceTechItem = {
      name: trimmed,
      ...(newIconUrl ? { iconUrl: newIconUrl } : {}),
    };
    commitItems([...items, newItem]);
    setNewName("");
    setNewIconUrl("");
  };

  // Handle system file upload for the NEW item form
  const handleNewFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        setNewIconUrl(url);
        if (!newName) {
          const raw = file.name.split(".")[0] || "";
          setNewName(raw.charAt(0).toUpperCase() + raw.slice(1));
        }
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Handle system file upload to update an EXISTING item's logo
  const handleExistingItemUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setItemUploadingIdx(index);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        const updated = [...items];
        updated[index] = {
          ...updated[index],
          iconUrl: url,
        };
        commitItems(updated);
      }
    } finally {
      setItemUploadingIdx(null);
      e.target.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  // Check preview logo for new item form
  const newBuiltInSvg = newName ? TECH_ICONS[newName.toUpperCase()] || TECH_ICONS[newName] || null : null;

  return (
    <div className="bg-white border-2 border-[#0052FF]/30 rounded-lg shadow-sm p-6 flex flex-col gap-4">
      {/* Card Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
            🌐
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#0F172A]">
                Tech Ecosystem &amp; Stack Technologies
              </h3>
              <span className="px-2 py-0.5 bg-[#EFF6FF] text-[#0052FF] text-[10px] font-bold rounded-full border border-[#BFDBFE]">
                {items.length} Technologies
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Configure the Tech Ecosystem block for &quot;{service.name}&quot;. You can add technologies, upload custom logos from your system, or use built-in vector logos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            ✓ System Logo Upload Enabled
          </span>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Ecosystem Section Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={service.techEcosystemTitle || "Tech Ecosystem"}
            onChange={(e) => onChange("techEcosystemTitle", e.target.value)}
            placeholder="Tech Ecosystem"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Ecosystem Subtitle
          </label>
          <input
            type="text"
            value={service.techEcosystemSubtitle || ""}
            onChange={(e) => onChange("techEcosystemSubtitle", e.target.value)}
            placeholder={`Technologies and platforms used for ${service.name} solutions.`}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
      </div>

      {/* ADD NEW TECHNOLOGY WITH SYSTEM FILE UPLOAD */}
      <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            ＋ ADD NEW TECHNOLOGY (WITH SYSTEM LOGO UPLOAD)
          </span>
          <span className="text-[11px] text-[#64748B]">
            Upload any SVG, PNG, or WebP logo from your computer
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Logo Preview Box */}
          <div className="sm:col-span-2 flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg border border-[#CBD5E1] bg-white flex items-center justify-center p-1 relative shadow-xs shrink-0">
              {newIconUrl ? (
                <>
                  <img
                    src={newIconUrl}
                    alt="Logo preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setNewIconUrl("")}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold cursor-pointer"
                    title="Remove custom logo"
                  >
                    ✕
                  </button>
                </>
              ) : newBuiltInSvg ? (
                <div
                  className="w-8 h-8 flex items-center justify-center [&>svg]:w-8 [&>svg]:h-8 [&>svg]:object-contain"
                  dangerouslySetInnerHTML={{ __html: newBuiltInSvg }}
                />
              ) : (
                <span className="text-[10px] text-gray-400 font-medium text-center">
                  Logo
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#64748B] leading-tight">
              {newIconUrl ? (
                <span className="text-emerald-600 font-bold">Custom Logo</span>
              ) : newBuiltInSvg ? (
                <span className="text-blue-600 font-bold">Auto Vector</span>
              ) : (
                <span>No Logo</span>
              )}
            </div>
          </div>

          {/* Technology Name Input */}
          <div className="sm:col-span-5">
            <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
              Technology Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Docker, GraphQL, Supabase, Python..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-semibold"
            />
          </div>

          {/* System Upload Button & URL */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
              Logo from System
            </label>
            <label className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-white hover:bg-[#EFF6FF] text-[#0052FF] border border-[#BFDBFE] text-xs font-bold rounded cursor-pointer transition-colors shadow-xs">
              <span>{uploading ? "⏳ Uploading..." : "📁 Upload from System"}</span>
              <input
                type="file"
                accept="image/*,.svg,.webp"
                className="hidden"
                disabled={uploading}
                onChange={handleNewFileUpload}
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 flex items-end">
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full h-9 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-1"
            >
              <span>＋</span>
              <span>Add Tech</span>
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE TECHNOLOGIES GRID WITH LOGO DISPLAY & CHANGE BUTTON */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold text-[#334155]">
            Active Ecosystem Technologies ({items.length})
          </label>
          <span className="text-[11px] text-[#64748B]">
            Click 📁 on any card to upload a new logo from system, or ✕ to delete
          </span>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg">
            {items.map((item, idx) => {
              const builtInSvg = TECH_ICONS[item.name.toUpperCase()] || TECH_ICONS[item.name] || null;
              const isThisUploading = itemUploadingIdx === idx;

              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="p-3 bg-white border border-[#CBD5E1] hover:border-[#0052FF] rounded-lg flex items-center justify-between gap-3 shadow-xs group transition-all"
                >
                  {/* Logo Display */}
                  <div className="w-9 h-9 rounded bg-[#F8FAFC] border border-gray-200 flex items-center justify-center p-1 shrink-0">
                    {item.iconUrl ? (
                      <img
                        src={item.iconUrl}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : builtInSvg ? (
                      <div
                        className="w-7 h-7 flex items-center justify-center [&>svg]:w-7 [&>svg]:h-7 [&>svg]:object-contain"
                        dangerouslySetInnerHTML={{ __html: builtInSvg }}
                      />
                    ) : (
                      <div className="w-7 h-7 rounded bg-blue-50 text-[10px] font-bold text-[#0052FF] flex items-center justify-center">
                        {item.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#0F172A] block truncate" title={item.name}>
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#64748B] block truncate">
                      {item.iconUrl ? "Custom Uploaded" : builtInSvg ? "Vector Icon" : "Text Initials"}
                    </span>
                  </div>

                  {/* Actions: Upload/Change Logo + Delete */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* System Upload Button for this specific item */}
                    <label
                      title="Upload / Change logo from system"
                      className="w-6 h-6 rounded bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0052FF] flex items-center justify-center text-[11px] font-bold cursor-pointer transition-colors border border-[#BFDBFE]"
                    >
                      <span>{isThisUploading ? "⏳" : "📁"}</span>
                      <input
                        type="file"
                        accept="image/*,.svg,.webp"
                        className="hidden"
                        disabled={isThisUploading}
                        onChange={(e) => handleExistingItemUpload(idx, e)}
                      />
                    </label>

                    {/* Delete Item */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="w-6 h-6 rounded bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center text-[11px] font-bold cursor-pointer transition-colors border border-red-200"
                      title={`Delete ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-center text-xs text-gray-500">
            No technologies in this ecosystem yet. Use the form above to add technologies with custom logos.
          </div>
        )}
      </div>

      {/* Direct Comma-Separated Edit */}
      <div>
        <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
          Direct Comma-Separated Names (Batch Edit)
        </label>
        <input
          type="text"
          value={service.techStack || ""}
          onChange={(e) => {
            const val = e.target.value;
            onChange("techStack", val);
            const parsed = val
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
              .map((name) => {
                const existing = items.find((i) => i.name.toLowerCase() === name.toLowerCase());
                return existing || { name };
              });
            onChange("techItems", parsed);
          }}
          placeholder="JAVA, C#, PYTHON, C++, TYPESCRIPT, .NET, SPRING BOOT, GIT"
          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-mono text-[11px] bg-white text-gray-700"
        />
      </div>
    </div>
  );
}
