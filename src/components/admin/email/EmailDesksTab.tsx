"use client";

import React from "react";
import {
  EmailDepartmentProfile,
  EmailMediaItem,
  EmailFormatType,
  EMAIL_FORMATS_METADATA,
  DEFAULT_FORMAT2_SOCIAL_LINKS,
  DEFAULT_FORMAT2_GALLERY_ROWS,
} from "@/lib/email-types";
import { EmailPreviewRenderer } from "./templates/EmailPreviews";

interface EmailDesksTabProps {
  profiles: EmailDepartmentProfile[];
  setProfiles: React.Dispatch<React.SetStateAction<EmailDepartmentProfile[]>>;
  activeProfile: EmailDepartmentProfile;
  selectedProfileId: string;
  setSelectedProfileId: (id: string) => void;
  activeProfileFormat: EmailFormatType;
  onEditProfile: (profile: EmailDepartmentProfile) => void;
  onDeleteProfile: (id: string) => void;
  onCopyStyledHtml: (profile: EmailDepartmentProfile) => void;
  onSaveProfile: (profile: EmailDepartmentProfile, showNotice?: boolean, silent?: boolean) => void;
  testEmailRecipient: string;
  setTestEmailRecipient: (val: string) => void;
  isSendingTest: boolean;
  onSendTestEmail: () => void;
  showToast?: (msg: string) => void;
  onPreviewItem?: (item: EmailMediaItem) => void;
  onEnlargeMedia?: (popup: { imageUrl: string; title?: string; text?: string }) => void;
}

export const EmailDesksTab: React.FC<EmailDesksTabProps> = ({
  profiles,
  setProfiles,
  activeProfile,
  selectedProfileId,
  setSelectedProfileId,
  activeProfileFormat,
  onEditProfile,
  onDeleteProfile,
  onCopyStyledHtml,
  onSaveProfile,
  testEmailRecipient,
  setTestEmailRecipient,
  isSendingTest,
  onSendTestEmail,
  showToast,
  onPreviewItem,
  onEnlargeMedia,
}) => {
  return (
    <div className="space-y-6">
      {/* 5 EMAIL TEMPLATE FORMATS SHOWCASE */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-slate-100">
          <div>
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block font-outfit flex items-center gap-2">
              <span>🎨 5 Email Template Formats Architecture</span>
              <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 font-bold">
                2 Active Formats • 3 Reserved Slots
              </span>
            </span>
            <span className="text-xs text-slate-600 mt-1 block leading-relaxed">
              Har format independent aur unique hai. Kisi bi format card pr click kar ke layout switch kryn ya <strong>Design ↗</strong> pr click kr k live customize kryn:
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
          {EMAIL_FORMATS_METADATA.map((fmt) => {
            const isFormatActive = activeProfileFormat === fmt.id;
            const isReserved = fmt.status === "RESERVED";

            return (
              <div
                key={fmt.id}
                onClick={() => {
                  if (!isReserved) {
                    const updatedProfile: EmailDepartmentProfile = {
                      ...activeProfile,
                      formatType: fmt.id,
                      ...(fmt.id === "format-executive-signature"
                        ? {
                            sidebarHeading: activeProfile.sidebarHeading || activeProfile.name || "CREED TECH",
                            sidebarLogo: activeProfile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png",
                            sidebarAddress: activeProfile.sidebarAddress || activeProfile.address || "Industrial Area Phase 2, Karachi",
                            sidebarPhone: activeProfile.sidebarPhone || activeProfile.phone || "+92 300 1234567",
                            sidebarSocialLinks:
                              activeProfile.sidebarSocialLinks && activeProfile.sidebarSocialLinks.length > 0
                                ? activeProfile.sidebarSocialLinks
                                : DEFAULT_FORMAT2_SOCIAL_LINKS,
                            featuredMainPicUrl:
                              activeProfile.featuredMainPicUrl ||
                              (activeProfile.mediaItems && activeProfile.mediaItems[0]?.mediaUrl) ||
                              activeProfile.videoThumbnail ||
                              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                            featuredMainPicText:
                              activeProfile.featuredMainPicText ||
                              "Next-Generation Industrial Machinery & Enterprise Engineering Solutions",
                            galleryRows:
                              activeProfile.galleryRows && activeProfile.galleryRows.length > 0
                                ? activeProfile.galleryRows
                                : DEFAULT_FORMAT2_GALLERY_ROWS,
                          }
                        : fmt.id === "format-minimal"
                        ? {
                            signatureName: activeProfile.signatureName || activeProfile.name || "Tariq Mahmood",
                            signatureRole: activeProfile.signatureRole || activeProfile.department || "Chief Technical Director",
                            signatureTagline: activeProfile.signatureTagline || "Enterprise Engineering & Industrial Systems",
                            signatureAvatar:
                              activeProfile.signatureAvatar ||
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
                            sidebarLogo:
                              activeProfile.sidebarLogo ||
                              "https://creed-tech.com/icons/icon-192x192.png",
                            sidebarSocialLinks:
                              activeProfile.sidebarSocialLinks && activeProfile.sidebarSocialLinks.length > 0
                                ? activeProfile.sidebarSocialLinks
                                : DEFAULT_FORMAT2_SOCIAL_LINKS,
                          }
                        : {}),
                    };

                    const updatedList = profiles.map((p) =>
                      p.id === activeProfile.id ? updatedProfile : p
                    );
                    setProfiles(updatedList);
                    onSaveProfile(updatedProfile, true, true);
                    if (showToast) showToast(`✓ Switched layout to ${fmt.title}`);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between select-none ${
                  isReserved
                    ? "bg-slate-50/70 border-dashed border-slate-300 opacity-60 cursor-not-allowed"
                    : isFormatActive
                    ? "bg-blue-50/90 border-[#0052FF] ring-2 ring-blue-500/30 shadow-sm cursor-pointer"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 cursor-pointer shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <span className="text-xl">{fmt.icon}</span>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isReserved
                          ? "bg-slate-200 text-slate-600"
                          : isFormatActive
                          ? "bg-[#0052FF] text-white shadow-2xs"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isReserved ? "Reserved Slot" : isFormatActive ? "Selected" : "Live"}
                    </span>
                  </div>
                  <div className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-snug font-outfit">
                    {fmt.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {fmt.description}
                  </div>
                </div>

                <div className="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">
                    {isReserved ? "Pending design" : fmt.badge}
                  </span>
                  {!isReserved && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedTarget: EmailDepartmentProfile = {
                          ...activeProfile,
                          formatType: fmt.id,
                          ...(fmt.id === "format-executive-signature"
                            ? {
                                sidebarHeading: activeProfile.sidebarHeading || activeProfile.name || "CREED TECH",
                                sidebarLogo: activeProfile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png",
                                sidebarAddress: activeProfile.sidebarAddress || activeProfile.address || "Industrial Area Phase 2, Karachi",
                                sidebarPhone: activeProfile.sidebarPhone || activeProfile.phone || "+92 300 1234567",
                                sidebarSocialLinks:
                                  activeProfile.sidebarSocialLinks && activeProfile.sidebarSocialLinks.length > 0
                                    ? activeProfile.sidebarSocialLinks
                                    : DEFAULT_FORMAT2_SOCIAL_LINKS,
                                featuredMainPicUrl:
                                  activeProfile.featuredMainPicUrl ||
                                  (activeProfile.mediaItems && activeProfile.mediaItems[0]?.mediaUrl) ||
                                  activeProfile.videoThumbnail ||
                                  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                                featuredMainPicText:
                                  activeProfile.featuredMainPicText ||
                                  "Next-Generation Industrial Machinery & Enterprise Engineering Solutions",
                                galleryRows:
                                  activeProfile.galleryRows && activeProfile.galleryRows.length > 0
                                    ? activeProfile.galleryRows
                                    : DEFAULT_FORMAT2_GALLERY_ROWS,
                              }
                            : {}),
                        };
                        onEditProfile(updatedTarget);
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer hover:underline flex items-center gap-0.5"
                    >
                      <span>Design</span>
                      <span>↗</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Profiles Cards (5 Cols) */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 font-outfit flex items-center justify-between">
            <span>Active Business Desks ({profiles.length})</span>
            <span className="text-[11px] font-normal text-slate-500">Click to preview</span>
          </div>

          <div className="flex flex-col gap-3">
            {profiles.map((p) => {
              const isSelected = p.id === selectedProfileId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProfileId(p.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-slate-900 border-orange-400 shadow-[0_4px_16px_rgba(255,107,0,0.14)] ring-2 ring-[#FF6B00]/30"
                      : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-xs shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-xs ring-2 ring-white shrink-0"
                        style={{ backgroundColor: p.accentColor || "#FF6B00" }}
                      >
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900 font-outfit">
                            {p.name}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-2xs"
                            style={{ backgroundColor: p.accentColor || "#FF6B00" }}
                          >
                            {p.department}
                          </span>
                        </div>
                        <div className="font-mono text-xs mt-0.5 text-slate-600 font-medium">
                          {p.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onEditProfile(p)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-bold text-xs cursor-pointer shadow-2xs transition-colors flex items-center gap-1"
                        title="Edit design format, images & address"
                      >
                        <span>✏️</span>
                        <span>Edit</span>
                      </button>
                      {profiles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onDeleteProfile(p.id)}
                          className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold text-xs cursor-pointer transition-colors flex items-center justify-center shadow-2xs"
                          title="Delete profile"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                    <span className="font-mono text-[11px]">{p.phone || "No direct phone"}</span>
                    <span className="font-medium text-[11px]">
                      {p.videoThumbnail || p.videoUrl
                        ? p.mediaType === "image"
                          ? "🖼️ Picture Offer"
                          : "🎬 Video Demo"
                        : "No Media"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Profile Detailed View & Test (7 Cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-1">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-2 font-outfit">
              <span>Live Preview &amp; Actions:</span>
              <span className="text-slate-900 font-black text-sm">{activeProfile.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEditProfile(activeProfile)}
                className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_2px_10px_rgba(255,107,0,0.25)] active:scale-95"
              >
                <span>✏️</span>
                <span>Edit Format &amp; Design</span>
              </button>
              <button
                type="button"
                onClick={() => onCopyStyledHtml(activeProfile)}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 border border-slate-200 shadow-xs hover:border-slate-300"
              >
                <span>📋</span>
                <span>Copy Styled Format</span>
              </button>
            </div>
          </div>

          {/* Real-time Email Render Box */}
          <EmailPreviewRenderer
            profile={activeProfile}
            isSmall={false}
            onItemClick={onPreviewItem}
            onEnlargeMedia={onEnlargeMedia}
          />

          {/* Test Email Broadcast Box */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span>🧪 Test Live Email Delivery</span>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">({activeProfile.name})</span>
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">Sends realistic rendered email</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={testEmailRecipient}
                onChange={(e) => setTestEmailRecipient(e.target.value)}
                placeholder="Enter recipient email (e.g. your-email@gmail.com)"
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 font-medium outline-none focus:bg-white focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
              />
              <button
                type="button"
                disabled={isSendingTest}
                onClick={onSendTestEmail}
                className="px-5 py-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-[0_2px_10px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_16px_rgba(255,107,0,0.35)] disabled:opacity-50 shrink-0 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>🚀</span>
                <span>{isSendingTest ? "Sending Test..." : "Send Test Email"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDesksTab;
