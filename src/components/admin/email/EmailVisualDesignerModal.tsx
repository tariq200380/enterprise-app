"use client";

import React from "react";
import { createPortal } from "react-dom";
import {
  EmailDepartmentProfile,
  EmailFormatType,
  EmailMediaItem,
  EMAIL_FORMATS_METADATA,
  DEFAULT_FORMAT2_SOCIAL_LINKS,
  DEFAULT_FORMAT2_GALLERY_ROWS,
} from "@/lib/email-types";
import {
  ProfileIdentityControls,
  ProfileLayoutTemplatesControls,
} from "./designer/ProfileEssentialsControls";
import { Format1Controls } from "./designer/Format1Controls";
import { Format2Controls } from "./designer/Format2Controls";
import { Format3Controls } from "./designer/Format3Controls";
import { Format4Controls } from "./designer/Format4Controls";
import { Format5Controls } from "./designer/Format5Controls";
import { EmailPreviewRenderer } from "./templates/EmailPreviews";

interface EmailVisualDesignerModalProps {
  mounted: boolean;
  editingProfile: EmailDepartmentProfile | null;
  setEditingProfile: React.Dispatch<React.SetStateAction<EmailDepartmentProfile | null>>;
  profiles: EmailDepartmentProfile[];
  isSaving: boolean;
  isEditingEmailDuplicate: boolean;
  activeModalFormat: EmailFormatType;
  handleSaveProfile: (profile: EmailDepartmentProfile) => void;
  showToast?: (message: string, type?: "success" | "error") => void;
  onPreviewDetailItem?: (item: EmailMediaItem) => void;
  onEnlargeMedia?: (popup: { imageUrl: string; title?: string; text?: string }) => void;
}

export const EmailVisualDesignerModal: React.FC<EmailVisualDesignerModalProps> = ({
  mounted,
  editingProfile,
  setEditingProfile,
  profiles,
  isSaving,
  isEditingEmailDuplicate,
  activeModalFormat,
  handleSaveProfile,
  showToast,
  onPreviewDetailItem,
  onEnlargeMedia,
}) => {
  if (!mounted || !editingProfile) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setEditingProfile(null);
        }
      }}
    >
      <div
        className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 w-[98vw] sm:w-[96vw] max-w-[1560px] h-[95vh] sm:h-[92vh] max-h-[960px] shadow-[0_25px_70px_rgba(0,0,0,0.45)] relative text-left flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Brand Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-[#FF6B00] shrink-0" />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-slate-200/90 bg-white/95 backdrop-blur-md z-30 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl sm:text-2xl shadow-md shadow-blue-500/25 ring-4 ring-blue-50 shrink-0">
              🎨
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 m-0 font-outfit tracking-tight truncate">
                  {profiles.some((p) => p.id === editingProfile.id)
                    ? `Visual Designer: ${editingProfile.name}`
                    : "Design New Business Email Profile"}
                </h3>
                <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono shrink-0">
                  {editingProfile.department || "Profile Editor"}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2 truncate">
                <span>Select 1 of 5 distinct formats, customize colors, layout &amp; live preview.</span>
                <span className="hidden md:inline text-slate-300">•</span>
                <span className="hidden md:inline text-slate-400 font-mono text-[11px]">ID: {editingProfile.id}</span>
              </div>
            </div>
          </div>

          {/* Top Right Controls & Prominent Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Canvas</span>
            </div>

            <button
              type="button"
              onClick={() => setEditingProfile(null)}
              className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 font-bold text-xs sm:text-sm cursor-pointer transition-all duration-150 shadow-xs hover:shadow-sm"
              title="Close Designer (Esc)"
              aria-label="Close Designer"
            >
              <span className="text-base font-black transition-transform group-hover:scale-110 leading-none">✕</span>
              <span className="font-bold hidden sm:inline text-xs">Close</span>
              <kbd className="hidden md:inline text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-400 group-hover:text-red-500 group-hover:border-red-200">
                Esc
              </kbd>
            </button>
          </div>
        </div>

        {/* FORMAT SELECTOR BAR (5 DISTINCT FORMAT SLOTS) */}
        <div className="px-4 sm:px-8 py-3 border-b border-slate-200 bg-slate-50/80 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Email Template Format:</span>
              <span className="text-slate-500 font-semibold text-[11px]">(5 Format Architecture)</span>
            </span>
            <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
              Active:{" "}
              {activeModalFormat === "format-executive-signature"
                ? "Format 2 (Executive Desk)"
                : activeModalFormat === "format-announcement"
                ? "Format 3 (Brand Hero & Promo)"
                : activeModalFormat === "format-minimal"
                ? "Format 4 (Executive Signature Banner)"
                : activeModalFormat === "format-custom"
                ? "Format 5 (Editorial Newsletter)"
                : "Format 1 (Catalog Cards)"}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {EMAIL_FORMATS_METADATA.map((fmt) => {
              const isSelected = activeModalFormat === fmt.id;
              const isReserved = fmt.status === "RESERVED";
              return (
                <button
                  key={fmt.id}
                  type="button"
                  disabled={isReserved}
                  onClick={() => {
                    if (!isReserved) {
                      setEditingProfile({
                        ...editingProfile,
                        formatType: fmt.id,
                        ...(fmt.id === "format-executive-signature"
                          ? {
                              sidebarHeading: editingProfile.sidebarHeading || editingProfile.name || "CREED TECH",
                              sidebarLogo: editingProfile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png",
                              sidebarAddress: editingProfile.sidebarAddress || editingProfile.address || "Industrial Area Phase 2, Karachi",
                              sidebarPhone: editingProfile.sidebarPhone || editingProfile.phone || "+92 300 1234567",
                              sidebarSocialLinks:
                                editingProfile.sidebarSocialLinks && editingProfile.sidebarSocialLinks.length > 0
                                  ? editingProfile.sidebarSocialLinks
                                  : DEFAULT_FORMAT2_SOCIAL_LINKS,
                              featuredMainPicUrl:
                                editingProfile.featuredMainPicUrl ||
                                (editingProfile.mediaItems && editingProfile.mediaItems[0]?.mediaUrl) ||
                                editingProfile.videoThumbnail ||
                                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                              featuredMainPicText:
                                editingProfile.featuredMainPicText ||
                                "Next-Generation Industrial Machinery & Enterprise Engineering Solutions",
                              galleryRows:
                                editingProfile.galleryRows && editingProfile.galleryRows.length > 0
                                  ? editingProfile.galleryRows
                                  : DEFAULT_FORMAT2_GALLERY_ROWS,
                            }
                          : fmt.id === "format-minimal"
                          ? {
                              signatureName: editingProfile.signatureName || editingProfile.name || "Tariq Mahmood",
                              signatureRole: editingProfile.signatureRole || editingProfile.department || "Chief Technical Director",
                              signatureTagline: editingProfile.signatureTagline || "Enterprise Engineering & Industrial Systems",
                              signatureAvatar:
                                editingProfile.signatureAvatar ||
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
                              sidebarLogo:
                                editingProfile.sidebarLogo ||
                                "https://creed-tech.com/icons/icon-192x192.png",
                              sidebarSocialLinks:
                                editingProfile.sidebarSocialLinks && editingProfile.sidebarSocialLinks.length > 0
                                  ? editingProfile.sidebarSocialLinks
                                  : DEFAULT_FORMAT2_SOCIAL_LINKS,
                            }
                          : {}),
                      });
                      if (showToast) {
                        showToast(`Template layout switched to: ${fmt.title}`);
                      }
                    }
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    isReserved
                      ? "bg-slate-50/70 border-dashed border-slate-300 opacity-60 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-50/95 border-[#0052FF] ring-2 ring-blue-500/30 shadow-xs cursor-pointer"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-base">{fmt.icon}</span>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isReserved
                          ? "bg-slate-200 text-slate-600"
                          : isSelected
                          ? "bg-[#0052FF] text-white shadow-2xs"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isReserved ? "Reserved" : isSelected ? "Selected" : "Live"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    Format {fmt.formatNumber}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                    {fmt.badge}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Screen Designer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Controls (7 Cols on MD+ for wide, clear, comfortable editing) */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Section 1: Profile Identity & Color Scheme */}
            <ProfileIdentityControls
              editingProfile={editingProfile}
              setEditingProfile={setEditingProfile}
              isEditingEmailDuplicate={isEditingEmailDuplicate}
            />

            {/* Section 2: Format Specific Controls */}
            {(activeModalFormat === "format-catalog" || activeModalFormat === "format-announcement") && (
              <Format1Controls
                editingProfile={editingProfile}
                setEditingProfile={setEditingProfile}
                activeModalFormat={activeModalFormat}
                showToast={showToast}
                onPreviewDetailItem={onPreviewDetailItem}
              />
            )}

            {activeModalFormat === "format-executive-signature" && (
              <Format2Controls
                editingProfile={editingProfile}
                setEditingProfile={setEditingProfile}
                showToast={showToast}
                onEnlargeMedia={onEnlargeMedia}
              />
            )}

            {activeModalFormat === "format-announcement" && (
              <Format3Controls
                editingProfile={editingProfile}
                setEditingProfile={setEditingProfile}
              />
            )}

            {activeModalFormat === "format-minimal" && (
              <Format4Controls
                editingProfile={editingProfile}
                setEditingProfile={setEditingProfile}
                showToast={showToast}
              />
            )}

            {activeModalFormat === "format-custom" && (
              <Format5Controls
                editingProfile={editingProfile}
                setEditingProfile={setEditingProfile}
                showToast={showToast}
              />
            )}

            {/* Sections 3 & 4: Layout & Templates */}
            <ProfileLayoutTemplatesControls
              editingProfile={editingProfile}
              setEditingProfile={setEditingProfile}
              activeModalFormat={activeModalFormat}
            />
          </div>

          {/* Right Column: Dedicated Real-time Email Preview (5 Cols on MD+) */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span>👁️ Real-time Email Preview</span>
                <span className="text-[11px] text-emerald-600 font-bold">● Live</span>
              </span>
              <span className="text-[11px] font-mono text-blue-700 font-bold bg-blue-50 px-3 py-0.5 rounded-full border border-blue-200">
                {activeModalFormat === "format-executive-signature"
                  ? "Format 2: Sidebar Dashboard"
                  : activeModalFormat === "format-announcement"
                  ? "Format 3: Brand Hero & Promo"
                  : activeModalFormat === "format-minimal"
                  ? "Format 4: Executive Signature Banner"
                  : activeModalFormat === "format-custom"
                  ? "Format 5: Modern Editorial Newsletter"
                  : "Format 1: Catalog Cards"}
              </span>
            </span>

            <div className="sticky top-1">
              <EmailPreviewRenderer
                profile={editingProfile}
                format={activeModalFormat}
                isSmall={true}
                onItemClick={onPreviewDetailItem}
                onEnlargeMedia={onEnlargeMedia}
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-4 sm:px-8 py-3.5 border-t border-slate-200/90 bg-white/95 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <kbd className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-500">
              Esc
            </kbd>
            <span className="hidden sm:inline">to close without saving</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setEditingProfile(null)}
              className="px-4 sm:px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSaving || isEditingEmailDuplicate || !editingProfile.email || !editingProfile.name}
              onClick={() => handleSaveProfile(editingProfile)}
              className="px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 cursor-pointer disabled:opacity-50 flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>💾</span>
              <span>{isSaving ? "Saving..." : isEditingEmailDuplicate ? "Duplicate Email Detected" : "Save Profile & Design"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
