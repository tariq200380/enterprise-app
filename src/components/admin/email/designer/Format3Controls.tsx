"use client";

import React from "react";
import {
  EmailDepartmentProfile,
  EmailSocialLink,
  DEFAULT_FORMAT2_SOCIAL_LINKS,
} from "@/lib/email-types";

interface Format3ControlsProps {
  editingProfile: EmailDepartmentProfile;
  setEditingProfile: React.Dispatch<React.SetStateAction<EmailDepartmentProfile | null>>;
}

export const Format3Controls: React.FC<Format3ControlsProps> = ({
  editingProfile,
  setEditingProfile,
}) => {
  const handleAddSocialLink = () => {
    const current = editingProfile.sidebarSocialLinks || DEFAULT_FORMAT2_SOCIAL_LINKS;
    const newLink: EmailSocialLink = {
      id: `soc-${Date.now()}`,
      platform: "website",
      url: "https://",
      label: "Website",
    };
    setEditingProfile({
      ...editingProfile,
      sidebarSocialLinks: [...current, newLink],
    });
  };

  const handleUpdateSocialLink = (id: string, updates: Partial<EmailSocialLink>) => {
    const current = editingProfile.sidebarSocialLinks || DEFAULT_FORMAT2_SOCIAL_LINKS;
    setEditingProfile({
      ...editingProfile,
      sidebarSocialLinks: current.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    });
  };

  const handleDeleteSocialLink = (id: string) => {
    const current = editingProfile.sidebarSocialLinks || DEFAULT_FORMAT2_SOCIAL_LINKS;
    setEditingProfile({
      ...editingProfile,
      sidebarSocialLinks: current.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 via-teal-50/20 to-blue-50/20 border border-teal-200 rounded-xl p-3.5 space-y-3 shadow-xs">
      <div className="flex items-center justify-between border-b border-teal-100 pb-2">
        <div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
            <span>🌐 Format 3: Footer Social Links (Bottom Right)</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Direct links for Facebook, LinkedIn, WhatsApp &amp; Instagram shown at the bottom right of Format 3.
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddSocialLink}
          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
        >
          <span>➕</span>
          <span>Add Link</span>
        </button>
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
        {(editingProfile.sidebarSocialLinks && editingProfile.sidebarSocialLinks.length > 0
          ? editingProfile.sidebarSocialLinks
          : DEFAULT_FORMAT2_SOCIAL_LINKS
        ).map((soc, sIdx) => (
          <div
            key={soc.id || sIdx}
            className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs"
          >
            <select
              value={soc.platform}
              onChange={(e) =>
                handleUpdateSocialLink(soc.id, {
                  platform: e.target.value as any,
                  label: e.target.value.toUpperCase(),
                })
              }
              className="text-[11px] font-bold bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-700 outline-none"
            >
              <option value="facebook">📘 Facebook</option>
              <option value="linkedin">💼 LinkedIn</option>
              <option value="whatsapp">💬 WhatsApp</option>
              <option value="instagram">📷 Instagram</option>
              <option value="twitter">🐦 Twitter / X</option>
              <option value="youtube">▶️ YouTube</option>
              <option value="website">🌐 Website</option>
              <option value="other">🔗 Other</option>
            </select>

            <input
              type="text"
              value={soc.label || ""}
              onChange={(e) => handleUpdateSocialLink(soc.id, { label: e.target.value })}
              placeholder="Label"
              className="w-24 px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-medium"
            />

            <input
              type="text"
              value={soc.url}
              onChange={(e) => handleUpdateSocialLink(soc.id, { url: e.target.value })}
              placeholder="https://..."
              className="flex-1 px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-mono text-slate-700"
            />

            <button
              type="button"
              onClick={() => handleDeleteSocialLink(soc.id)}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
              title="Delete social link"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Format3Controls;
