"use client";

import React, { useRef, useState } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";
import { uploadMediaFile } from "@/lib/uploadHelper";
import {
  EmailDepartmentProfile,
  EmailSocialLink,
  DEFAULT_FORMAT2_SOCIAL_LINKS,
} from "@/lib/email-types";

interface Format4ControlsProps {
  editingProfile: EmailDepartmentProfile;
  setEditingProfile: React.Dispatch<React.SetStateAction<EmailDepartmentProfile | null>>;
  showToast?: (msg: string, type?: "success" | "error") => void;
}

export const Format4Controls: React.FC<Format4ControlsProps> = ({
  editingProfile,
  setEditingProfile,
  showToast,
}) => {
  const adminFetch = useAdminFetch();
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const sidebarLogoInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingSidebarLogo, setIsUploadingSidebarLogo] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingAvatar(true);
      const res = await uploadMediaFile(file, adminFetch);
      if (res && res.url) {
        setEditingProfile((prev) => (prev ? { ...prev, signatureAvatar: res.url } : prev));
        if (showToast) showToast("✓ Avatar photo uploaded successfully!");
      }
    } catch (err: any) {
      if (showToast) showToast(`Avatar upload failed: ${err.message}`, "error");
    } finally {
      setIsUploadingAvatar(false);
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = "";
    }
  };

  const handleSidebarLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingSidebarLogo(true);
      const res = await uploadMediaFile(file, adminFetch);
      if (res && res.url) {
        setEditingProfile((prev) => (prev ? { ...prev, sidebarLogo: res.url } : prev));
        if (showToast) showToast("✓ Brand logo uploaded successfully!");
      }
    } catch (err: any) {
      if (showToast) showToast(`Logo upload failed: ${err.message}`, "error");
    } finally {
      setIsUploadingSidebarLogo(false);
      if (sidebarLogoInputRef.current) sidebarLogoInputRef.current.value = "";
    }
  };

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
    <div className="bg-gradient-to-r from-slate-50 via-blue-50/20 to-sky-50/20 border border-blue-200 rounded-xl p-4 space-y-4 shadow-xs">
      <input
        ref={avatarFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarUpload}
      />
      <input
        ref={sidebarLogoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSidebarLogoUpload}
      />

      <div className="flex items-center justify-between border-b border-blue-100 pb-2.5">
        <div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
            <span>💼 Format 4: Executive Signature Banner Settings</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Customize circular avatar, executive credentials, tagline badge, contact grid, company logo &amp; social badges.
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full border border-blue-200">
          Executive Banner
        </span>
      </div>

      {/* Executive Credentials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Executive Name *
          </label>
          <input
            type="text"
            value={editingProfile.signatureName ?? editingProfile.name ?? ""}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                signatureName: e.target.value,
              })
            }
            placeholder="e.g. Tariq Mahmood"
            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 font-semibold"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Job Role / Designation *
          </label>
          <input
            type="text"
            value={editingProfile.signatureRole ?? editingProfile.department ?? ""}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                signatureRole: e.target.value,
              })
            }
            placeholder="e.g. Chief Technical Director"
            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 font-semibold"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Tagline Badge Pill (Airplane / Shield)
          </label>
          <input
            type="text"
            value={editingProfile.signatureTagline ?? ""}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                signatureTagline: e.target.value,
              })
            }
            placeholder="e.g. Designing Experiences • Enterprise Solutions"
            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={editingProfile.signatureCompany ?? "CREED TECH"}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                signatureCompany: e.target.value,
              })
            }
            placeholder="CREED TECH"
            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 font-bold"
          />
        </div>
      </div>

      {/* Avatar & Logo Image Uploaders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
        {/* Avatar */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>Circular Avatar Photo</span>
            {editingProfile.signatureAvatar && (
              <span className="text-[9px] text-emerald-600 font-bold">● Active</span>
            )}
          </label>
          <div className="flex items-center gap-2.5">
            <img
              src={
                editingProfile.signatureAvatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
              }
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-xs shrink-0"
            />
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={editingProfile.signatureAvatar || ""}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    signatureAvatar: e.target.value,
                  })
                }
                placeholder="Avatar Image URL"
                className="w-full px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-mono"
              />
              <button
                type="button"
                onClick={() => avatarFileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 cursor-pointer flex items-center gap-1 transition-colors"
              >
                <span>📷</span>
                <span>{isUploadingAvatar ? "Uploading..." : "Upload Photo"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Company Logo */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>Brand Logo (Right Side)</span>
            {editingProfile.sidebarLogo && (
              <span className="text-[9px] text-emerald-600 font-bold">● Active</span>
            )}
          </label>
          <div className="flex items-center gap-2.5">
            <img
              src={editingProfile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png"}
              alt="Logo"
              className="w-12 h-12 rounded-lg object-contain border border-slate-200 bg-white p-1 shadow-xs shrink-0"
            />
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={editingProfile.sidebarLogo || ""}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    sidebarLogo: e.target.value,
                  })
                }
                placeholder="Brand Logo URL"
                className="w-full px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-mono"
              />
              <button
                type="button"
                onClick={() => sidebarLogoInputRef.current?.click()}
                disabled={isUploadingSidebarLogo}
                className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 cursor-pointer flex items-center gap-1 transition-colors"
              >
                <span>🏢</span>
                <span>{isUploadingSidebarLogo ? "Uploading..." : "Upload Logo"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links List for Format 4 */}
      <div className="pt-2 border-t border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              🌐 Format 4 Social Links (Right Side Badges)
            </span>
            <span className="text-[10.5px] text-slate-500">
              Circular icons for Facebook, LinkedIn, WhatsApp, and Instagram
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
    </div>
  );
};

export default Format4Controls;
