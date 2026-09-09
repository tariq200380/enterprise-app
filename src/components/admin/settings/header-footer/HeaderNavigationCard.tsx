"use client";

import React from "react";
import { WebsiteSettingsData, HeaderNavLinkItem, DEFAULT_HEADER_NAV_LINKS } from "../types";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function HeaderNavigationCard({ settings, onChange }: Props) {
  const navLinks = settings.headerNavLinks && settings.headerNavLinks.length > 0
    ? settings.headerNavLinks
    : DEFAULT_HEADER_NAV_LINKS;

  const handleAddLink = () => {
    const newId = `nav-${Date.now()}`;
    const newLinks: HeaderNavLinkItem[] = [
      ...navLinks,
      { id: newId, label: "New Page", url: "/", enabled: true, openInNewTab: false },
    ];
    onChange("headerNavLinks", newLinks);
  };

  const handleUpdateLink = (id: string, updates: Partial<HeaderNavLinkItem>) => {
    const newLinks = navLinks.map((item) => (item.id === id ? { ...item, ...updates } : item));
    onChange("headerNavLinks", newLinks);
  };

  const handleDeleteLink = (id: string) => {
    const newLinks = navLinks.filter((item) => item.id !== id);
    onChange("headerNavLinks", newLinks);
  };

  const handleMoveLink = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= navLinks.length) return;
    const newLinks = [...navLinks];
    const [moved] = newLinks.splice(index, 1);
    newLinks.splice(targetIndex, 0, moved);
    onChange("headerNavLinks", newLinks);
  };

  const handleResetNavLinks = () => {
    onChange("headerNavLinks", DEFAULT_HEADER_NAV_LINKS);
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
            <span>🧭</span> Header Navigation Menu Builder
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Add new pages, remove pages, reorder navigation tabs, or temporarily hide items from the navbar.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetNavLinks}
            className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#334155] text-xs font-semibold rounded cursor-pointer transition-colors"
          >
            ↺ Reset to 6 Default Pages
          </button>
          <button
            type="button"
            onClick={handleAddLink}
            className="px-3.5 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>+</span> <span>Add Page / Link</span>
          </button>
        </div>
      </div>

      {/* Navigation Items List */}
      <div className="flex flex-col gap-2.5">
        {navLinks.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-[#CBD5E1] rounded-lg text-xs text-[#64748B]">
            No menu items configured. Click <strong>+ Add Page / Link</strong> or <strong>Reset to 6 Default Pages</strong>.
          </div>
        ) : (
          navLinks.map((link, idx) => (
            <div
              key={link.id || idx}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                link.enabled !== false
                  ? "bg-[#F8FAFC] border-[#E2E8F0]"
                  : "bg-gray-100 border-gray-200 opacity-60"
              }`}
            >
              {/* Reorder Buttons */}
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveLink(idx, "up")}
                  className="p-1 hover:bg-[#E2E8F0] rounded text-[10px] text-[#475569] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Move Up"
                >
                  ▲
                </button>
                <button
                  type="button"
                  disabled={idx === navLinks.length - 1}
                  onClick={() => handleMoveLink(idx, "down")}
                  className="p-1 hover:bg-[#E2E8F0] rounded text-[10px] text-[#475569] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Move Down"
                >
                  ▼
                </button>
              </div>

              {/* Visibility Toggle */}
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={link.enabled !== false}
                  onChange={(e) => handleUpdateLink(link.id, { enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0052FF] accent-[#0052FF] cursor-pointer"
                />
                <span className="text-[11px] font-semibold text-[#475569]">
                  {link.enabled !== false ? "Active" : "Hidden"}
                </span>
              </label>

              {/* Label Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={link.label}
                  placeholder="Page Name (e.g. Services)"
                  onChange={(e) => handleUpdateLink(link.id, { label: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs font-semibold text-[#0F172A] border border-[#CBD5E1] rounded bg-white focus:outline-none focus:border-[#0052FF]"
                />
              </div>

              {/* URL Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={link.url}
                  placeholder="Path / URL (e.g. /services)"
                  onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs text-[#0F172A] border border-[#CBD5E1] rounded bg-white font-mono focus:outline-none focus:border-[#0052FF]"
                />
              </div>

              {/* Open in New Tab */}
              <label className="flex items-center gap-1.5 text-[11px] text-[#475569] whitespace-nowrap cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={Boolean(link.openInNewTab)}
                  onChange={(e) => handleUpdateLink(link.id, { openInNewTab: e.target.checked })}
                  className="w-3.5 h-3.5 rounded text-[#0052FF] accent-[#0052FF] cursor-pointer"
                />
                <span>New Tab</span>
              </label>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDeleteLink(link.id)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer transition-colors"
                title="Remove Page"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
