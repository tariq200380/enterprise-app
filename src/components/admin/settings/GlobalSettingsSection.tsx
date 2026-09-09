"use client";

import React from "react";
import { WebsiteSettingsData, AnnouncementItem, SocialLinkItem } from "./types";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function GlobalSettingsSection({ settings, onChange }: Props) {
  // Handlers for Announcements
  const handleAddAnnouncement = () => {
    const newItem: AnnouncementItem = {
      id: Date.now().toString(),
      badge: "UPDATE",
      text: "New milestone release launched successfully.",
      linkText: "Learn More",
      linkUrl: "/services",
    };
    onChange("announcements", [...settings.announcements, newItem]);
  };

  const handleRemoveAnnouncement = (id: string) => {
    onChange(
      "announcements",
      settings.announcements.filter((item) => item.id !== id)
    );
  };

  const handleUpdateAnnouncement = (
    id: string,
    field: keyof AnnouncementItem,
    val: string
  ) => {
    onChange(
      "announcements",
      settings.announcements.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      )
    );
  };

  // Handlers for Social Links
  const handleAddSocialLink = () => {
    const newLink: SocialLinkItem = {
      id: Date.now().toString(),
      platform: "LinkedIn",
      url: "https://linkedin.com/company/creedtech",
    };
    onChange("socialLinks", [...settings.socialLinks, newLink]);
  };

  const handleRemoveSocialLink = (id: string) => {
    onChange(
      "socialLinks",
      settings.socialLinks.filter((item) => item.id !== id)
    );
  };

  const handleUpdateSocialLink = (
    id: string,
    field: keyof SocialLinkItem,
    val: string
  ) => {
    onChange(
      "socialLinks",
      settings.socialLinks.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. General Site Information & Branding */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-3.5 mb-5 border-b border-[#F1F5F9]">
          <span className="text-xl">🏢</span>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">General Site Information &amp; Branding</h3>
            <p className="text-xs text-[#64748B]">Core company details and primary identity.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">Website / Brand Name *</label>
            <input
              type="text"
              required
              value={settings.siteName}
              onChange={(e) => onChange("siteName", e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">Company Tagline / Slogan</label>
            <input
              type="text"
              value={settings.siteTagline}
              onChange={(e) => onChange("siteTagline", e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">Support Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => onChange("contactEmail", e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">Phone Number</label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) => onChange("contactPhone", e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">Primary Office Address</label>
            <textarea
              rows={2}
              value={settings.officeAddress}
              onChange={(e) => onChange("officeAddress", e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>
      </div>

      {/* 2. Top Live Announcement Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#F1F5F9] flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📢</span>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Top Live Announcement Bar</h3>
              <p className="text-xs text-[#64748B]">Rotate multiple news headlines every 5 seconds on all public pages.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={settings.showAnnouncement}
                onChange={(e) => onChange("showAnnouncement", e.target.checked)}
                className="w-4 h-4 text-[#0052FF] rounded cursor-pointer"
              />
              <span className="text-xs font-bold text-[#0F172A]">Show Announcement Bar</span>
            </label>
            <button
              type="button"
              onClick={handleAddAnnouncement}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0052FF] hover:bg-[#0042D0] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>+</span>
              <span>Add News Item</span>
            </button>
          </div>
        </div>

        {settings.announcements.length === 0 ? (
          <div className="p-4 border border-dashed border-[#CBD5E1] rounded-md text-center text-xs text-[#64748B]">
            No news items configured. Click &quot;+ Add News Item&quot; to add one.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {settings.announcements.map((item, index) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex flex-col gap-2.5 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider">
                    News Item #{index + 1}
                  </span>
                  {settings.announcements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAnnouncement(item.id)}
                      className="px-2 py-0.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>✕ Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr_130px_150px] gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">Badge</label>
                    <input
                      type="text"
                      value={item.badge}
                      onChange={(e) => handleUpdateAnnouncement(item.id, "badge", e.target.value)}
                      placeholder="e.g. LIVE / NEW"
                      className="w-full px-2.5 py-1.5 text-xs border border-[#CBD5E1] rounded bg-white font-bold outline-none focus:border-[#0052FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">News Text *</label>
                    <input
                      type="text"
                      required
                      value={item.text}
                      onChange={(e) => handleUpdateAnnouncement(item.id, "text", e.target.value)}
                      placeholder="Enter announcement text..."
                      className="w-full px-3 py-1.5 text-xs border border-[#CBD5E1] rounded bg-white outline-none focus:border-[#0052FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">Link Text</label>
                    <input
                      type="text"
                      value={item.linkText}
                      onChange={(e) => handleUpdateAnnouncement(item.id, "linkText", e.target.value)}
                      placeholder="e.g. Explore Services"
                      className="w-full px-2.5 py-1.5 text-xs border border-[#CBD5E1] rounded bg-white outline-none focus:border-[#0052FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">Link URL</label>
                    <input
                      type="text"
                      value={item.linkUrl}
                      onChange={(e) => handleUpdateAnnouncement(item.id, "linkUrl", e.target.value)}
                      placeholder="e.g. /services"
                      className="w-full px-2.5 py-1.5 text-xs border border-[#CBD5E1] rounded bg-white outline-none focus:border-[#0052FF]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Footer Information & Social Links */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-3.5 mb-5 border-b border-[#F1F5F9]">
          <span className="text-xl">🔗</span>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Footer Information &amp; Social Links</h3>
            <p className="text-xs text-[#64748B]">Official corporate social profiles and copyright notice.</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">Copyright Notice</label>
            <input
              type="text"
              value={settings.copyrightText}
              onChange={(e) => onChange("copyrightText", e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
            />
          </div>

          <div className="pt-3 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Social Media Accounts
                </label>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-blue-50 text-[#0052FF] border border-blue-200">
                  {settings.socialLinks.length} Accounts
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddSocialLink}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0052FF] hover:bg-[#0042D0] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>+</span>
                <span>Add Social Account</span>
              </button>
            </div>

            {settings.socialLinks.length === 0 ? (
              <div className="p-4 border border-dashed border-[#CBD5E1] rounded-md text-center text-xs text-[#64748B]">
                No social accounts configured. Click &quot;+ Add Social Account&quot; to add one.
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {settings.socialLinks.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md"
                  >
                    <div className="w-full sm:w-44 shrink-0">
                      <select
                        value={item.platform}
                        onChange={(e) => handleUpdateSocialLink(item.id, "platform", e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded outline-none focus:border-[#0052FF] font-medium text-[#1E293B]"
                      >
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="X (Twitter)">X (Twitter)</option>
                        <option value="GitHub">GitHub</option>
                        <option value="YouTube">YouTube</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Pinterest">Pinterest</option>
                        <option value="Discord">Discord</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Reddit">Reddit</option>
                        <option value="Threads">Threads</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="flex-1">
                      <input
                        type="url"
                        value={item.url}
                        onChange={(e) => handleUpdateSocialLink(item.id, "url", e.target.value)}
                        placeholder={`https://${item.platform.toLowerCase().replace(/[^a-z]/g, "")}.com/...`}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded outline-none focus:border-[#0052FF] text-[#1E293B]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSocialLink(item.id)}
                      title="Remove account"
                      className="px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1"
                    >
                      <span>✕</span>
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
