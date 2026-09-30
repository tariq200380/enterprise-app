"use client";

import React, { useState } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";
import { uploadImageFile } from "@/lib/uploadHelper";
import {
  EmailDepartmentProfile,
  EmailSocialLink,
  DEFAULT_FORMAT5_SOCIAL_LINKS,
} from "@/lib/email-types";

interface Format5ControlsProps {
  editingProfile: EmailDepartmentProfile;
  setEditingProfile: React.Dispatch<React.SetStateAction<EmailDepartmentProfile | null>>;
  showToast?: (msg: string, type?: "success" | "error") => void;
}

export const Format5Controls: React.FC<Format5ControlsProps> = ({
  editingProfile,
  setEditingProfile,
  showToast,
}) => {
  const adminFetch = useAdminFetch();
  const [f5ActiveTab, setF5ActiveTab] = useState<"header" | "s1" | "s2" | "s3" | "s4" | "footer">("s1");
  const [f5UploadingField, setF5UploadingField] = useState<string | null>(null);

  const handleFormat5ImageUpload = async (
    file: File,
    field: keyof EmailDepartmentProfile,
    toastLabel: string
  ) => {
    if (!file) return;
    setF5UploadingField(field as string);
    try {
      const url = await uploadImageFile(file, adminFetch);
      setEditingProfile((prev) => (prev ? { ...prev, [field]: url } : prev));
      if (showToast) showToast(`${toastLabel} uploaded successfully!`);
    } catch (err: any) {
      if (showToast) showToast(err.message || `Failed to upload ${toastLabel}`, "error");
    } finally {
      setF5UploadingField(null);
    }
  };

  const handleAddF5SocialLink = () => {
    const current = editingProfile.editorialSocialLinks || DEFAULT_FORMAT5_SOCIAL_LINKS;
    const newLink: EmailSocialLink = {
      id: `f5-soc-${Date.now()}`,
      platform: "instagram",
      url: "https://instagram.com",
      label: "Instagram",
    };
    setEditingProfile({
      ...editingProfile,
      editorialSocialLinks: [...current, newLink],
    });
  };

  const handleUpdateF5SocialLink = (
    id: string,
    field: keyof EmailSocialLink,
    value: string
  ) => {
    const current = editingProfile.editorialSocialLinks || DEFAULT_FORMAT5_SOCIAL_LINKS;
    setEditingProfile({
      ...editingProfile,
      editorialSocialLinks: current.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  const handleDeleteF5SocialLink = (id: string) => {
    const current = editingProfile.editorialSocialLinks || DEFAULT_FORMAT5_SOCIAL_LINKS;
    setEditingProfile({
      ...editingProfile,
      editorialSocialLinks: current.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="bg-gradient-to-r from-amber-50/50 via-orange-50/30 to-stone-50/50 border border-orange-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-orange-100 gap-2">
        <div>
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>📰 Format 5: Modern Editorial Newsletter Editor</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Edit all 4 sections, custom images, button links, texts, and footer social links.
          </span>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 bg-orange-100 text-orange-800 rounded-full border border-orange-200 self-start sm:self-auto">
          100% Fully Customizable
        </span>
      </div>

      {/* Sub-tabs for easy section navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 border-b border-orange-100/70 text-xs scrollbar-thin">
        <button
          type="button"
          onClick={() => setF5ActiveTab("header")}
          className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
            f5ActiveTab === "header"
              ? "bg-orange-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
          }`}
        >
          🏷️ Brand &amp; Logo
        </button>
        <button
          type="button"
          onClick={() => setF5ActiveTab("s1")}
          className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
            f5ActiveTab === "s1"
              ? "bg-orange-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
          }`}
        >
          🚀 1. Traveler Offer
        </button>
        <button
          type="button"
          onClick={() => setF5ActiveTab("s2")}
          className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
            f5ActiveTab === "s2"
              ? "bg-orange-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
          }`}
        >
          ⭐ 2. Social Proof
        </button>
        <button
          type="button"
          onClick={() => setF5ActiveTab("s3")}
          className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
            f5ActiveTab === "s3"
              ? "bg-orange-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
          }`}
        >
          🎁 3. Gift Cards
        </button>
        <button
          type="button"
          onClick={() => setF5ActiveTab("s4")}
          className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
            f5ActiveTab === "s4"
              ? "bg-orange-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
          }`}
        >
          💤 4. Sleep Mask
        </button>
        <button
          type="button"
          onClick={() => setF5ActiveTab("footer")}
          className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
            f5ActiveTab === "footer"
              ? "bg-orange-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
          }`}
        >
          🌐 5. Footer &amp; Socials
        </button>
      </div>

      {/* TAB 1: BRAND & LOGO */}
      {f5ActiveTab === "header" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Brand / Newsletter Title
              </label>
              <input
                type="text"
                value={editingProfile.editorialBrandTitle || "TIMESHIFTER"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialBrandTitle: e.target.value,
                  })
                }
                placeholder="TIMESHIFTER"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold tracking-widest uppercase"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Website URL (Default Button Link)
              </label>
              <input
                type="text"
                value={editingProfile.signatureWebsite || "https://timeshifter.com"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    signatureWebsite: e.target.value,
                  })
                }
                placeholder="https://timeshifter.com"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          {/* Logo Upload & URL */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Top Header Logo (Optional image / leave empty for geometric badge)</span>
              {editingProfile.editorialLogoUrl && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialLogoUrl: "",
                    })
                  }
                  className="text-[10px] text-red-600 hover:underline cursor-pointer"
                >
                  Remove custom logo
                </button>
              )}
            </label>
            <div className="flex items-center gap-3">
              {editingProfile.editorialLogoUrl ? (
                <img
                  src={editingProfile.editorialLogoUrl}
                  alt="Brand Logo"
                  className="w-14 h-10 object-contain rounded border border-slate-200 bg-stone-50 p-1 shrink-0"
                />
              ) : (
                <div className="w-14 h-10 rounded border border-dashed border-slate-300 bg-stone-50 flex items-center justify-center text-xs shrink-0 text-slate-400">
                  None
                </div>
              )}
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={editingProfile.editorialLogoUrl || ""}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialLogoUrl: e.target.value,
                    })
                  }
                  placeholder="Logo image URL or click Upload"
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="f5-header-logo-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFormat5ImageUpload(file, "editorialLogoUrl", "Header Logo");
                    }}
                  />
                  <button
                    type="button"
                    disabled={f5UploadingField === "editorialLogoUrl"}
                    onClick={() => document.getElementById("f5-header-logo-upload")?.click()}
                    className="px-2.5 py-1 text-[11px] font-bold bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-md border border-orange-200 cursor-pointer flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <span>📷</span>
                    <span>{f5UploadingField === "editorialLogoUrl" ? "Uploading..." : "Upload Logo Image"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECTION 1 (TRAVELER OFFER) */}
      {f5ActiveTab === "s1" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={editingProfile.editorialS1Headline || editingProfile.editorialHeadline || "More time zones to cross this year?"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS1Headline: e.target.value,
                    editorialHeadline: e.target.value,
                  })
                }
                placeholder="More time zones to cross this year?"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Body Text / Description
              </label>
              <textarea
                rows={3}
                value={
                  editingProfile.editorialS1Text ||
                  "You've already tried Timeshifter once, on us — so you know what it's like to land fresh instead of wrecked. Subscribe now and save 20% on 12 months of unlimited plans."
                }
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS1Text: e.target.value,
                  })
                }
                placeholder="Description text..."
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={editingProfile.editorialS1BtnText || editingProfile.editorialCtaText || "Subscribe and save 20%"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS1BtnText: e.target.value,
                    editorialCtaText: e.target.value,
                  })
                }
                placeholder="Subscribe and save 20%"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                CTA Button Link URL (🔗 Editable Button Link)
              </label>
              <input
                type="text"
                value={editingProfile.editorialS1BtnUrl || ""}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS1BtnUrl: e.target.value,
                  })
                }
                placeholder="https://timeshifter.com/subscribe"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Subtext Note (Below Button)
              </label>
              <input
                type="text"
                value={
                  editingProfile.editorialS1Subtext ||
                  "For first-time subscribers only.<br />Offer ends September 30, 2026"
                }
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS1Subtext: e.target.value,
                  })
                }
                placeholder="For first-time subscribers only.<br />Offer ends September 30, 2026"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500"
              />
            </div>
          </div>

          {/* Section 1 Image Upload */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Section 1 Image / Artwork (Clicking card enlarges this image!)</span>
              {editingProfile.editorialS1ImageUrl && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialS1ImageUrl: "",
                    })
                  }
                  className="text-[10px] text-red-600 hover:underline cursor-pointer"
                >
                  Revert to Default Illustration
                </button>
              )}
            </label>
            <div className="flex items-center gap-3">
              {editingProfile.editorialS1ImageUrl ? (
                <img
                  src={editingProfile.editorialS1ImageUrl}
                  alt="S1 Visual"
                  className="w-16 h-12 object-cover rounded-lg border border-slate-200 bg-stone-50 shrink-0"
                />
              ) : (
                <div className="w-16 h-12 rounded-lg border border-dashed border-slate-300 bg-stone-50 flex items-center justify-center text-[10px] shrink-0 text-slate-400 font-bold">
                  Default SVG
                </div>
              )}
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={editingProfile.editorialS1ImageUrl || ""}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialS1ImageUrl: e.target.value,
                    })
                  }
                  placeholder="Paste Image URL or click Upload"
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="f5-s1-image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFormat5ImageUpload(file, "editorialS1ImageUrl", "Section 1 Image");
                    }}
                  />
                  <button
                    type="button"
                    disabled={f5UploadingField === "editorialS1ImageUrl"}
                    onClick={() => document.getElementById("f5-s1-image-upload")?.click()}
                    className="px-2.5 py-1 text-[11px] font-bold bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-md border border-orange-200 cursor-pointer flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <span>📷</span>
                    <span>{f5UploadingField === "editorialS1ImageUrl" ? "Uploading..." : "Upload Image"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECTION 2 (SOCIAL PROOF) */}
      {f5ActiveTab === "s2" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={editingProfile.editorialS2Headline || "More than 1.7 million travelers trust Timeshifter"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS2Headline: e.target.value,
                  })
                }
                placeholder="More than 1.7 million travelers trust Timeshifter"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Body Text / Description
              </label>
              <textarea
                rows={3}
                value={
                  editingProfile.editorialS2Text ||
                  "Timeshifter is based on the latest science and is trusted by more than 1.7 million travelers to reduce jet lag and arrive at their best."
                }
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS2Text: e.target.value,
                  })
                }
                placeholder="Description text..."
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Rating Badge Text (Over illustration)
              </label>
              <input
                type="text"
                value={editingProfile.editorialS2RatingText || "4.7/5 rating"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS2RatingText: e.target.value,
                  })
                }
                placeholder="4.7/5 rating"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={editingProfile.editorialS2BtnText || "Subscribe and save 20%"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS2BtnText: e.target.value,
                  })
                }
                placeholder="Subscribe and save 20%"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                CTA Button Link URL (🔗 Editable Button Link)
              </label>
              <input
                type="text"
                value={editingProfile.editorialS2BtnUrl || ""}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS2BtnUrl: e.target.value,
                  })
                }
                placeholder="https://timeshifter.com/pricing"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Subtext Note (Below Button)
              </label>
              <input
                type="text"
                value={
                  editingProfile.editorialS2Subtext ||
                  "For first-time subscribers only.<br />Offer ends September 30, 2026"
                }
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS2Subtext: e.target.value,
                  })
                }
                placeholder="For first-time subscribers only.<br />Offer ends September 30, 2026"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500"
              />
            </div>
          </div>

          {/* Section 2 Image Upload */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Section 2 Image / Phones Mockup (Clicking card enlarges this image!)</span>
              {editingProfile.editorialS2ImageUrl && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialS2ImageUrl: "",
                    })
                  }
                  className="text-[10px] text-red-600 hover:underline cursor-pointer"
                >
                  Revert to Default Phones Artwork
                </button>
              )}
            </label>
            <div className="flex items-center gap-3">
              {editingProfile.editorialS2ImageUrl ? (
                <img
                  src={editingProfile.editorialS2ImageUrl}
                  alt="S2 Visual"
                  className="w-16 h-12 object-cover rounded-lg border border-slate-200 bg-stone-50 shrink-0"
                />
              ) : (
                <div className="w-16 h-12 rounded-lg border border-dashed border-slate-300 bg-stone-50 flex items-center justify-center text-[10px] shrink-0 text-slate-400 font-bold">
                  Default 3-Phones
                </div>
              )}
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={editingProfile.editorialS2ImageUrl || ""}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialS2ImageUrl: e.target.value,
                    })
                  }
                  placeholder="Paste Image URL or click Upload"
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="f5-s2-image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFormat5ImageUpload(file, "editorialS2ImageUrl", "Section 2 Image");
                    }}
                  />
                  <button
                    type="button"
                    disabled={f5UploadingField === "editorialS2ImageUrl"}
                    onClick={() => document.getElementById("f5-s2-image-upload")?.click()}
                    className="px-2.5 py-1 text-[11px] font-bold bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-md border border-orange-200 cursor-pointer flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <span>📷</span>
                    <span>{f5UploadingField === "editorialS2ImageUrl" ? "Uploading..." : "Upload Image"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SECTION 3 (GIFT CARDS) */}
      {f5ActiveTab === "s3" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={editingProfile.editorialS3Headline || "Gift cards"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS3Headline: e.target.value,
                  })
                }
                placeholder="Gift cards"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Body Text / Description
              </label>
              <textarea
                rows={3}
                value={
                  editingProfile.editorialS3Text ||
                  "Give a year of unlimited jet lag plans. Send by email to family, friends, or your team — or order physical gift cards, shipped in boxes of 50."
                }
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS3Text: e.target.value,
                  })
                }
                placeholder="Description text..."
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={editingProfile.editorialS3BtnText || "Buy gift cards"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS3BtnText: e.target.value,
                  })
                }
                placeholder="Buy gift cards"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                CTA Button Link URL (🔗 Editable Button Link)
              </label>
              <input
                type="text"
                value={editingProfile.editorialS3BtnUrl || ""}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS3BtnUrl: e.target.value,
                  })
                }
                placeholder="https://timeshifter.com/gift-cards"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          {/* Section 3 Image Upload */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Section 3 Image / Gift Cards Booklet (Clicking card enlarges this image!)</span>
              {editingProfile.editorialS3ImageUrl && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialS3ImageUrl: "",
                    })
                  }
                  className="text-[10px] text-red-600 hover:underline cursor-pointer"
                >
                  Revert to Default Gift Cards Artwork
                </button>
              )}
            </label>
            <div className="flex items-center gap-3">
              {editingProfile.editorialS3ImageUrl ? (
                <img
                  src={editingProfile.editorialS3ImageUrl}
                  alt="S3 Visual"
                  className="w-16 h-12 object-cover rounded-lg border border-slate-200 bg-stone-50 shrink-0"
                />
              ) : (
                <div className="w-16 h-12 rounded-lg border border-dashed border-slate-300 bg-stone-50 flex items-center justify-center text-[10px] shrink-0 text-slate-400 font-bold">
                  Default Gift Cards
                </div>
              )}
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={editingProfile.editorialS3ImageUrl || ""}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialS3ImageUrl: e.target.value,
                    })
                  }
                  placeholder="Paste Image URL or click Upload"
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="f5-s3-image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFormat5ImageUpload(file, "editorialS3ImageUrl", "Section 3 Image");
                    }}
                  />
                  <button
                    type="button"
                    disabled={f5UploadingField === "editorialS3ImageUrl"}
                    onClick={() => document.getElementById("f5-s3-image-upload")?.click()}
                    className="px-2.5 py-1 text-[11px] font-bold bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-md border border-orange-200 cursor-pointer flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <span>📷</span>
                    <span>{f5UploadingField === "editorialS3ImageUrl" ? "Uploading..." : "Upload Image"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SECTION 4 (SLEEP MASK) */}
      {f5ActiveTab === "s4" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={editingProfile.editorialS4Headline || "The best sleep mask for timeshifting"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS4Headline: e.target.value,
                  })
                }
                placeholder="The best sleep mask for timeshifting"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Body Text / Description
              </label>
              <textarea
                rows={3}
                value={
                  editingProfile.editorialS4Text ||
                  "When Timeshifter calls for sleep, staying in the dark is everything. We have tested a lot of masks. The Manta PRO is the one we keep coming back to."
                }
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS4Text: e.target.value,
                  })
                }
                placeholder="Description text..."
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={editingProfile.editorialS4BtnText || "Learn more"}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS4BtnText: e.target.value,
                  })
                }
                placeholder="Learn more"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                CTA Button Link URL (🔗 Editable Button Link)
              </label>
              <input
                type="text"
                value={editingProfile.editorialS4BtnUrl || ""}
                onChange={(e) =>
                  setEditingProfile({
                    ...editingProfile,
                    editorialS4BtnUrl: e.target.value,
                  })
                }
                placeholder="https://timeshifter.com/sleep-mask"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          {/* Section 4 Image Upload */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Section 4 Image / Sleep Mask (Clicking card enlarges this image!)</span>
              {editingProfile.editorialS4ImageUrl && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialS4ImageUrl: "",
                    })
                  }
                  className="text-[10px] text-red-600 hover:underline cursor-pointer"
                >
                  Revert to Default Mask Artwork
                </button>
              )}
            </label>
            <div className="flex items-center gap-3">
              {editingProfile.editorialS4ImageUrl ? (
                <img
                  src={editingProfile.editorialS4ImageUrl}
                  alt="S4 Visual"
                  className="w-16 h-12 object-cover rounded-lg border border-slate-200 bg-stone-50 shrink-0"
                />
              ) : (
                <div className="w-16 h-12 rounded-lg border border-dashed border-slate-300 bg-stone-50 flex items-center justify-center text-[10px] shrink-0 text-slate-400 font-bold">
                  Default Sleep Mask
                </div>
              )}
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={editingProfile.editorialS4ImageUrl || ""}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      editorialS4ImageUrl: e.target.value,
                    })
                  }
                  placeholder="Paste Image URL or click Upload"
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="f5-s4-image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFormat5ImageUpload(file, "editorialS4ImageUrl", "Section 4 Image");
                    }}
                  />
                  <button
                    type="button"
                    disabled={f5UploadingField === "editorialS4ImageUrl"}
                    onClick={() => document.getElementById("f5-s4-image-upload")?.click()}
                    className="px-2.5 py-1 text-[11px] font-bold bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-md border border-orange-200 cursor-pointer flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <span>📷</span>
                    <span>{f5UploadingField === "editorialS4ImageUrl" ? "Uploading..." : "Upload Image"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: FOOTER & SOCIAL LINKS */}
      {f5ActiveTab === "footer" && (
        <div className="space-y-4 animate-in fade-in duration-150 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Regulatory / FDA Disclaimer Box
            </label>
            <textarea
              rows={3}
              value={
                editingProfile.editorialFooterDisclaimer ||
                `These statements have not been evaluated by the Food and Drug Administration. ${
                  editingProfile.editorialBrandTitle || "TIMESHIFTER"
                } is not intended to diagnose, treat, cure or prevent any disease, and is intended for healthy adults, 18 years of age or older. The ${
                  editingProfile.editorialBrandTitle || "TIMESHIFTER"
                } apps are not intended for pilots and flight crews on duty.`
              }
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  editorialFooterDisclaimer: e.target.value,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Company Physical Address
            </label>
            <input
              type="text"
              value={
                editingProfile.editorialFooterAddress ||
                editingProfile.address ||
                "Timeshifter Inc • 28 Hill Street #820 • Southampton, NY 11968 • United States"
              }
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  editorialFooterAddress: e.target.value,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-orange-500"
            />
          </div>

          {/* Social Links Manager */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  🌐 Social Links (Appears at Bottom of Email)
                </span>
                <span className="text-[10.5px] text-slate-500">
                  Add or edit social channels shown as circular badges in the footer.
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddF5SocialLink}
                className="px-2.5 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-[11px] font-bold cursor-pointer transition-colors shadow-2xs flex items-center gap-1"
              >
                <span>➕</span>
                <span>Add Social Link</span>
              </button>
            </div>

            <div className="space-y-2">
              {(
                editingProfile.editorialSocialLinks && editingProfile.editorialSocialLinks.length > 0
                  ? editingProfile.editorialSocialLinks
                  : DEFAULT_FORMAT5_SOCIAL_LINKS
              ).map((soc, idx) => (
                <div
                  key={soc.id || idx}
                  className="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-slate-200"
                >
                  <select
                    value={soc.platform}
                    onChange={(e) =>
                      handleUpdateF5SocialLink(soc.id, "platform", e.target.value)
                    }
                    className="px-2 py-1 text-xs border border-slate-300 rounded bg-white font-bold shrink-0"
                  >
                    <option value="instagram">📷 Instagram</option>
                    <option value="facebook">📘 Facebook</option>
                    <option value="linkedin">💼 LinkedIn</option>
                    <option value="whatsapp">💬 WhatsApp</option>
                    <option value="youtube">▶️ YouTube</option>
                    <option value="twitter">𝕏 Twitter / X</option>
                    <option value="website">🌐 Website</option>
                    <option value="other">🔗 Other</option>
                  </select>
                  <input
                    type="text"
                    value={soc.url}
                    onChange={(e) =>
                      handleUpdateF5SocialLink(soc.id, "url", e.target.value)
                    }
                    placeholder="https://..."
                    className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteF5SocialLink(soc.id)}
                    className="w-7 h-7 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded flex items-center justify-center cursor-pointer transition-colors shrink-0"
                    title="Delete Link"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Format5Controls;
