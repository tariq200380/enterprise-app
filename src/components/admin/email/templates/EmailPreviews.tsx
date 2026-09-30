"use client";

import React from "react";
import {
  EmailDepartmentProfile,
  EmailMediaItem,
  EmailFormatType,
  buildItemViewerUrl,
  DEFAULT_FORMAT2_SOCIAL_LINKS,
  DEFAULT_FORMAT5_SOCIAL_LINKS,
} from "@/lib/email-types";
import { DEFAULT_IMAGE_FALLBACK } from "../constants/presets";
import { getEditingMediaItems } from "./templates";

export interface EmailPreviewProps {
  profile: EmailDepartmentProfile;
  format?: EmailFormatType;
  isSmall?: boolean;
  customMessage?: string;
  onItemClick?: (item: EmailMediaItem) => void;
  onEnlargeMedia?: (popup: { imageUrl: string; title?: string; text?: string }) => void;
}

// ---------------------------------------------------------------------------
// 1. CATALOG CARDS MEDIA PREVIEW (FORMAT 1)
// ---------------------------------------------------------------------------
export function MediaPreview({
  profile,
  isSmall = false,
  onItemClick,
}: EmailPreviewProps) {
  const items: EmailMediaItem[] = getEditingMediaItems(profile);
  if (!items || items.length === 0) return null;

  const alignClass =
    profile.mediaAlignment === "left"
      ? `${isSmall ? "max-w-[280px]" : "max-w-[360px]"} mr-auto`
      : profile.mediaAlignment === "right"
      ? `${isSmall ? "max-w-[280px]" : "max-w-[360px]"} ml-auto`
      : "w-full";

  return (
    <div className={`my-3 ${alignClass}`}>
      <div className={`grid ${items.length === 1 ? "grid-cols-1 max-w-[320px] mx-auto" : "grid-cols-2"} gap-2.5`}>
        {items.map((item, idx) => {
          const isVideo = item.type === "video";
          const itemImg =
            item.thumbnailUrl ||
            item.mediaUrl ||
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";

          return (
            <div
              key={item.id || idx}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 text-left shadow-xs flex flex-col hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div
                onClick={() => onItemClick?.(item)}
                className="block relative overflow-hidden bg-slate-900 shrink-0 cursor-pointer"
                title="Click to open Machine Details Popup"
              >
                <img
                  src={itemImg}
                  alt={item.title || "Offer"}
                  className={`w-full ${isSmall ? "h-22" : "h-28"} object-cover group-hover:scale-105 transition-transform duration-300`}
                />
                {isVideo && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md text-xs font-bold"
                    style={{ backgroundColor: profile.accentColor || "#FF6B00" }}
                  >
                    ▶
                  </div>
                )}
                {item.year && (
                  <div className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {item.year}
                  </div>
                )}
                {Array.isArray(item.galleryUrls) && item.galleryUrls.length > 1 && (
                  <div className="absolute top-1.5 right-1.5 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
                    <span>📷</span>
                    <span>{item.galleryUrls.length}</span>
                  </div>
                )}
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between bg-white text-slate-900">
                <div>
                  <button
                    type="button"
                    onClick={() => onItemClick?.(item)}
                    className={`font-bold text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors text-left cursor-pointer ${
                      isSmall ? "text-[11px]" : "text-xs"
                    }`}
                  >
                    {item.title || `Offer #${idx + 1}`}
                  </button>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span className="font-semibold text-slate-600">Year: {item.year || "2018"}</span>
                    <span className="text-amber-500 font-bold">{item.condition || "★★★★☆"}</span>
                  </div>
                  {item.specs && (
                    <div className="text-[9px] text-slate-600 bg-slate-50 border border-slate-100 p-1 rounded font-mono mt-1.5 line-clamp-1">
                      {item.specs}
                    </div>
                  )}
                </div>
                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 text-[9px] font-medium">Click to preview</span>
                  <button
                    type="button"
                    onClick={() => onItemClick?.(item)}
                    className="font-bold text-[10px] flex items-center gap-0.5 hover:underline cursor-pointer"
                    style={{ color: profile.accentColor || "#FF6B00" }}
                  >
                    <span>{isVideo ? "▶ Play Video" : "👁️ View Details"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. SIGNATURE PREVIEW (FORMAT 1 & MINIMAL)
// ---------------------------------------------------------------------------
export function SignaturePreview({
  profile,
  isSmall = false,
}: EmailPreviewProps) {
  const sigStyle = profile.signatureStyle || "modern-curved";
  const sigName = profile.name || "Enterprise Representative";
  const sigRole = profile.signatureRole || profile.department || "Enterprise Solutions Director";
  const sigCompany = profile.signatureCompany || "CREED TECH";
  const sigTagline = profile.signatureTagline || "Enterprise Systems & Cloud Infrastructure";
  const sigPhone = profile.phone || "+1 (888) 492-7330";
  const sigEmail = profile.email || "desk@creed-tech.com";
  const sigWeb = profile.signatureWebsite || "https://creed-tech.com";
  const sigWebDisplay = sigWeb.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  const sigAddress = profile.address || "San Francisco, CA";
  const sigAvatar =
    profile.signatureAvatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
  const accent = profile.accentColor || "#0052FF";

  if (sigStyle === "dark-luxury") {
    return (
      <div className={`mt-4 ${isSmall ? "p-3" : "p-3.5"} rounded-xl border border-white/10 bg-[#0B1120] text-slate-100 shadow-md`}>
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 w-14 h-14 rounded-full p-0.5" style={{ background: accent }}>
            <img src={sigAvatar} alt={sigName} className="w-full h-full object-cover rounded-full bg-slate-900" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black uppercase tracking-wider text-white truncate">{sigName}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 truncate" style={{ color: accent }}>{sigRole}</div>
            <div className="text-[9px] text-slate-400 truncate mb-1.5">{sigTagline}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-slate-300">
              <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>📞</span><span>{sigPhone}</span></div>
              <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>✉️</span><span className="text-sky-400">{sigEmail}</span></div>
              <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>🌐</span><span className="text-sky-400">{sigWebDisplay}</span></div>
              <div className="flex items-center gap-1 truncate text-slate-400"><span style={{ color: accent }}>📍</span><span className="truncate">{sigAddress}</span></div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-center justify-center p-2 rounded-lg border border-white/10 text-center shrink-0" style={{ background: `${accent}18` }}>
            <div className="text-[11px] font-black tracking-wider text-white">{sigCompany}</div>
            <span className="text-[7px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">OFFICIAL</span>
            <span className="mt-1 px-1.5 py-0.2 rounded-full text-[7px] font-bold text-white bg-white/20">● VERIFIED</span>
          </div>
        </div>
      </div>
    );
  }

  if (sigStyle === "minimal-pill") {
    return (
      <div className={`mt-4 ${isSmall ? "p-2.5" : "p-3"} rounded-lg border border-slate-200 bg-white shadow-2xs`} style={{ borderLeft: `4px solid ${accent}` }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden border-2" style={{ borderColor: accent }}>
            <img src={sigAvatar} alt={sigName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-slate-900 tracking-tight">{sigName}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
              {sigRole} • <span className="text-slate-500 font-semibold">{sigCompany}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[9px] text-slate-600 mt-1">
              <span>📞 {sigPhone}</span>
              <span>•</span>
              <span style={{ color: accent }}>✉️ {sigEmail}</span>
              <span>•</span>
              <span>🌐 {sigWebDisplay}</span>
            </div>
            {sigAddress && <div className="text-[8px] text-slate-400 mt-0.5">📍 {sigAddress}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (sigStyle === "classic-corporate") {
    return (
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-2xs">
        <div className="h-1.5 w-full" style={{ background: accent }} />
        <div className="p-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden border-2 border-white shadow-xs">
            <img src={sigAvatar} alt={sigName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-slate-900 uppercase">{sigName}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>{sigRole}</div>
            <div className="text-[9px] text-slate-500">{sigCompany} • {sigTagline}</div>
            <div className="flex flex-wrap items-center gap-x-2 text-[9px] text-slate-700 mt-1">
              <span><strong>Tel:</strong> {sigPhone}</span>
              <span>•</span>
              <span style={{ color: accent }}><strong>Email:</strong> {sigEmail}</span>
              <span>•</span>
              <span><strong>Web:</strong> {sigWebDisplay}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: modern-curved (Primary Shutterstock wave style)
  return (
    <div className={`mt-4 ${isSmall ? "p-3" : "p-3.5"} rounded-xl border border-slate-200 bg-gradient-to-r from-white via-slate-50 to-blue-50/30 shadow-xs`}>
      <div className="flex items-center gap-3">
        <div className="relative shrink-0 w-14 h-14 rounded-full p-0.5 shadow-sm" style={{ background: `linear-gradient(135deg, ${accent}, #0F172A)` }}>
          <img src={sigAvatar} alt={sigName} className="w-full h-full object-cover rounded-full bg-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-black uppercase tracking-wider text-slate-900 truncate">{sigName}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 truncate" style={{ color: accent }}>{sigRole}</div>
          <div className="text-[9px] text-slate-500 truncate mb-1.5">{sigTagline}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-slate-700">
            <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>📞</span><span>{sigPhone}</span></div>
            <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>✉️</span><span style={{ color: accent }}>{sigEmail}</span></div>
            <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>🌐</span><span className="text-sky-600">{sigWebDisplay}</span></div>
            <div className="flex items-center gap-1 truncate text-slate-500"><span style={{ color: accent }}>📍</span><span className="truncate">{sigAddress}</span></div>
          </div>
        </div>
        <div
          className="hidden sm:flex flex-col items-center justify-center p-2 rounded-xl text-white text-center shrink-0 shadow-xs"
          style={{ background: `linear-gradient(135deg, ${accent}, #0F172A)` }}
        >
          <div className="text-[11px] font-black tracking-wider uppercase">{sigCompany}</div>
          <span className="text-[7px] font-extrabold uppercase tracking-widest opacity-90 mt-0.5">OFFICIAL</span>
          <span className="mt-1 px-1.5 py-0.2 rounded-full text-[7px] font-bold bg-white/20">VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. FORMAT 2: EXECUTIVE SIDEBAR & 7-ITEM ROWS PREVIEW
// ---------------------------------------------------------------------------
export function Format2Preview({
  profile,
  isSmall = false,
  onEnlargeMedia,
}: EmailPreviewProps) {
  const accent = profile.accentColor || "#0052FF";
  const logo = profile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png";
  const heading = profile.sidebarHeading || profile.name || "CREED TECH";
  const address = profile.sidebarAddress || profile.address || "Industrial Area Phase 2, Karachi";
  const phone = profile.sidebarPhone || profile.phone || "+92 300 1234567";
  const socials =
    profile.sidebarSocialLinks && profile.sidebarSocialLinks.length > 0
      ? profile.sidebarSocialLinks
      : DEFAULT_FORMAT2_SOCIAL_LINKS;

  const mainPic =
    profile.featuredMainPicUrl ||
    (profile.mediaItems && profile.mediaItems[0]?.mediaUrl) ||
    profile.videoThumbnail ||
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
  const mainPicText =
    profile.featuredMainPicText ||
    "Next-Generation Industrial Machinery & Enterprise Engineering Solutions";

  const rows =
    profile.galleryRows && profile.galleryRows.length > 0
      ? profile.galleryRows
      : [
          {
            id: "row-1",
            items: [
              { id: "item-1-1", imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop", text: "CNC Miller 5X", title: "CNC Miller 5X High Precision" },
              { id: "item-1-2", imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=400&auto=format&fit=crop", text: "Laser Cutter", title: "Fiber Laser Cutting System" },
              { id: "item-1-3", imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop", text: "Hydraulic Press", title: "Heavy Duty 200T Hydraulic Press" },
              { id: "item-1-4", imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=400&auto=format&fit=crop", text: "Automated Robot", title: "6-Axis Robotic Arm" },
              { id: "item-1-5", imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop", text: "Injection Mold", title: "Electric Injection Molding Machine" },
              { id: "item-1-6", imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=400&auto=format&fit=crop", text: "Rotary Lathe", title: "Precision Metal Turning Lathe" },
              { id: "item-1-7", imageUrl: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=400&auto=format&fit=crop", text: "Quality Scanner", title: "3D Optical CMM Scanner" },
            ],
          },
        ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook": return "📘";
      case "linkedin": return "💼";
      case "whatsapp": return "💬";
      case "instagram": return "📷";
      case "twitter": return "🐦";
      case "youtube": return "▶️";
      case "website": return "🌐";
      default: return "🔗";
    }
  };

  const sampleMessage = profile.defaultMessageTemplate || 
`Dear Client,

Thank you for reaching out to Creed Tech regarding your enterprise engineering inquiry. We have received your technical specifications and our team is prepared to present an architectural roadmap tailored to your workload.

Please let us know your preferred availability for a technical discovery call this week.

Best regards,
${profile.name || "Executive Management Desk"}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md flex flex-col text-slate-800 my-3 divide-y divide-slate-200">
      {/* 1. TOP EMAIL MESSAGE SECTION */}
      <div className="p-3.5 sm:p-4 bg-white">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
            <span>✉️</span>
            <span>Email Message (Body Text Above Format 2)</span>
          </span>
          <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            Message Content
          </span>
        </div>
        <div className="text-xs font-bold text-slate-900 mb-1.5" style={{ color: profile.textColor || "#0f172a" }}>
          Re: Enterprise Consultation &amp; Technical Scope
        </div>
        <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line font-sans">
          {sampleMessage}
        </div>
      </div>

      {/* 2. FORMAT 2: EXECUTIVE SIGNATURE & PRODUCT SHOWCASE CARD */}
      <div className="flex flex-col md:flex-row">
        {/* LEFT SIDEBAR BAR */}
        <div className={`${isSmall ? "w-full md:w-44" : "w-full md:w-56"} bg-[#0B1120] text-white p-3 flex flex-col justify-between shrink-0 border-r border-slate-800`}>
          <div className="text-center pb-3 border-b border-white/10">
            {logo ? (
              <img
                src={logo}
                alt={heading}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                className="max-h-10 max-w-[120px] object-contain mx-auto mb-1.5"
              />
            ) : null}
            <div className="text-xs font-black tracking-wide uppercase text-white truncate">
              {heading}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color: accent }}>
              {profile.department || "Enterprise Division"}
            </div>
          </div>

          <div className="pt-2.5 space-y-2">
            {address && (
              <div>
                <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">📍 Address</div>
                <div className="text-[10px] text-slate-300 leading-snug line-clamp-2 mt-0.5">{address}</div>
              </div>
            )}

            {phone && (
              <div>
                <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">📞 Phone</div>
                <div className="text-[10px] font-bold text-sky-400 mt-0.5 font-mono">{phone}</div>
              </div>
            )}

            <div className="pt-2 border-t border-white/10">
              <div className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>🌐 Social Links</span>
                <span className="text-[7px] text-slate-500">({socials.length})</span>
              </div>
              <div className="space-y-1">
                {socials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-[10px]">{getPlatformIcon(soc.platform)}</span>
                      <span className="truncate capitalize">{soc.label || soc.platform}</span>
                    </div>
                    <span className="text-[7px] text-slate-400">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / MAIN CONTENT AREA */}
        <div className="flex-1 p-3 bg-slate-50/50 flex flex-col justify-between overflow-x-auto">
          <div>
            <div
              onClick={() => onEnlargeMedia?.({ imageUrl: mainPic, title: heading, text: mainPicText })}
              className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs group cursor-pointer relative mb-3 hover:border-blue-400 hover:shadow-md transition-all"
              title="Click to Enlarge Picture & Text"
            >
              <div className="relative bg-slate-900 overflow-hidden">
                <img
                  src={mainPic}
                  alt="Main"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                  }}
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <span>🔍</span>
                  <span>Click to Enlarge</span>
                </div>
              </div>
              {mainPicText && (
                <div className="p-2 bg-white text-[11px] font-bold text-slate-800 border-t border-slate-100 flex items-center justify-between">
                  <span className="line-clamp-2">{mainPicText}</span>
                  <span className="text-blue-600 text-xs shrink-0 ml-1.5">↗</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-dashed border-slate-300">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  Featured Gallery ({rows.length} {rows.length === 1 ? "Row" : "Rows"})
                </span>
                <span className="text-[8px] text-blue-600 font-bold">
                  Click thumbnail to enlarge 🔍
                </span>
              </div>

              <div className="space-y-2">
                {rows.map((row, rIdx) => {
                  const itemsInRow = (row.items || []).slice(0, 7);
                  return (
                    <div key={row.id || rIdx} className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex flex-wrap items-start justify-center gap-1.5">
                        {itemsInRow.map((it, itIdx) => (
                          <div
                            key={it.id || itIdx}
                            onClick={() => onEnlargeMedia?.({ imageUrl: it.imageUrl, title: it.title || it.text, text: it.text })}
                            className="w-[66px] shrink-0 text-center cursor-pointer group/card hover:-translate-y-0.5 transition-transform"
                            title="Click to open enlarged popup"
                          >
                            <div className="w-[64px] h-[64px] rounded-lg overflow-hidden border border-slate-200 bg-slate-100 mx-auto shadow-2xs relative group-hover/card:border-blue-500">
                              <img
                                src={it.imageUrl}
                                alt={it.text || `Item ${itIdx + 1}`}
                                onError={(e) => {
                                  const t = e.currentTarget;
                                  if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                                }}
                                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 flex items-center justify-center transition-colors">
                                <span className="opacity-0 group-hover/card:opacity-100 text-white text-xs">🔍</span>
                              </div>
                            </div>
                            <div className="text-[8px] font-bold text-slate-700 leading-tight mt-1 line-clamp-2 group-hover/card:text-blue-600 transition-colors break-words">
                              {it.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. FORMAT 3: BRAND HERO & PROMO BANNER PREVIEW
// ---------------------------------------------------------------------------
export function Format3Preview({
  profile,
  isSmall = false,
  customMessage,
  onEnlargeMedia,
}: EmailPreviewProps) {
  const accent = profile.accentColor || "#5c95a2";
  const textColor = profile.textColor || "#1e293b";
  const items: EmailMediaItem[] = getEditingMediaItems(profile);
  const heroItem = items[0];
  const secondaryItem = items[1];
  const extraItems = items.slice(2);

  const topHeroStagingImage =
    profile.featuredMainPicUrl ||
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop";

  const productCutoutImage =
    heroItem?.thumbnailUrl ||
    heroItem?.mediaUrl ||
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop";

  const productStagingImage =
    secondaryItem?.thumbnailUrl ||
    secondaryItem?.mediaUrl ||
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop";

  const panoramicStagingImage =
    extraItems[0]?.thumbnailUrl ||
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop";

  const fbUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "facebook")?.url ||
    "https://facebook.com/creedtechnology";
  const liUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "linkedin")?.url ||
    "https://linkedin.com/company/creedtech";
  const waUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "whatsapp")?.url ||
    (profile.phone
      ? `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`
      : "https://wa.me/923219204488");
  const igUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "instagram")?.url ||
    "https://instagram.com/creed.technologiess";

  const sampleMessage =
    customMessage ||
    profile.defaultMessageTemplate ||
`Dear Client,

Thank you for reaching out to Creed Tech regarding your enterprise machinery and workspace specifications. We have received your project details and our team is prepared to present verified solutions matching your exact parameters.

Please review our featured studio collection below and let us know your team's availability for a technical discovery consultation.

Best regards,
${profile.name || "Executive Design & Operations Desk"}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md flex flex-col text-slate-800 my-3">
      {/* 1. TOP EMAIL MESSAGE SECTION */}
      <div className="p-4 sm:p-5 bg-white border-b-2 border-dashed border-slate-200">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
            <span>✉️</span>
            <span>Direct Email Message (Above Template)</span>
          </span>
          <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            Priority Dispatch
          </span>
        </div>
        <div className="text-xs font-bold text-slate-900 mb-1.5 font-outfit" style={{ color: textColor }}>
          {profile.defaultSubjectTemplate?.replace("{service}", "Executive Studio Collection")?.replace("{id}", "308") || "Re: Technical Discovery & Architecture Showcase"}
        </div>
        <div className="text-[11.5px] text-slate-600 leading-relaxed whitespace-pre-line font-sans">
          {sampleMessage}
        </div>
      </div>

      {/* 2. SECTION 1: HERO BANNER */}
      <div className="bg-gradient-to-b from-[#6c9fa9] to-[#5a909d] p-5 sm:p-7 text-center text-white">
        <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/80 mb-2">
          {profile.department || "CREED TECH ENTERPRISE STUDIO"}
        </div>
        <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight text-white mb-2.5 max-w-md mx-auto">
          {heroItem?.title || "Ac's office dits book I love To lijch"}
        </h3>
        <p className="text-[11.5px] text-white/90 leading-relaxed max-w-sm mx-auto mb-4 font-sans">
          {profile.defaultMessageTemplate ? profile.defaultMessageTemplate.slice(0, 120) + "..." : "Refined architectural aesthetics and certified high-durability performance engineered for enterprise environments."}
        </p>
        <div className="mb-4">
          <button
            type="button"
            className="bg-[#1a2a32] hover:bg-slate-900 text-white font-bold text-[11px] px-6 py-2 rounded-full tracking-wide shadow-md transition-all cursor-pointer"
          >
            Discover Series
          </button>
        </div>

        <div
          onClick={() =>
            onEnlargeMedia?.({
              imageUrl: topHeroStagingImage,
              title: heroItem?.title || "Studio Scene",
              text: "Refined Scandinavian Studio Staging & Architectural Composition",
            })
          }
          className="rounded-xl overflow-hidden shadow-lg border border-white/20 relative group cursor-pointer"
          title="Click to Enlarge Visual"
        >
          <img
            src={topHeroStagingImage}
            alt="Studio Staging"
            onError={(e) => {
              const t = e.currentTarget;
              if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
            }}
            className="w-full h-44 sm:h-56 object-cover group-hover:scale-103 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span>🔍</span>
            <span>Enlarge</span>
          </div>
        </div>
      </div>

      {/* 3. SECTION 2: SPLIT FEATURE 1 */}
      <div className="p-5 sm:p-7 bg-white">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-full sm:w-1/2 text-left">
            <h4 className="font-serif text-base sm:text-xl font-bold text-[#1a2a32] leading-snug mb-2">
              {heroItem?.title || "Get out arows well styler it pieces."}
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
              {heroItem?.specs || heroItem?.details || "Masterfully designed with precision contours, verified load endurance, and minimalist elegance suited for high-tier operations."}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="bg-[#1a2a32] hover:bg-slate-900 text-white font-bold text-[10px] px-5 py-2 rounded-full tracking-wide shadow-xs cursor-pointer"
              >
                View Unit
              </button>
              <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                <span className="text-amber-500">◆</span> Verified
              </span>
            </div>
          </div>

          <div
            onClick={() =>
              onEnlargeMedia?.({
                imageUrl: productCutoutImage,
                title: heroItem?.title || "Product Cutout",
                text: heroItem?.specs || "",
              })
            }
            className="w-full sm:w-1/2 h-36 sm:h-44 flex items-center justify-center relative group cursor-pointer p-2"
            title="Click to Enlarge Picture"
          >
            <img
              src={productCutoutImage}
              alt="Product 1"
              onError={(e) => {
                const t = e.currentTarget;
                if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
              }}
              className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">
              <span>🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECTION 3: SPLIT FEATURE 2 */}
      <div className="p-5 sm:p-7 bg-white border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div
            onClick={() =>
              onEnlargeMedia?.({
                imageUrl: productStagingImage,
                title: secondaryItem?.title || "Product Staging",
                text: secondaryItem?.specs || "",
              })
            }
            className="w-full sm:w-1/2 h-36 sm:h-44 rounded-xl overflow-hidden shadow-md relative group cursor-pointer"
            title="Click to Enlarge Picture"
          >
            <img
              src={productStagingImage}
              alt="Product 2"
              onError={(e) => {
                const t = e.currentTarget;
                if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">
              <span>🔍</span>
            </div>
          </div>

          <div className="w-full sm:w-1/2 text-left">
            <div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
              MODERN COLLECTION
            </div>
            <h4 className="font-serif text-base sm:text-xl font-bold text-[#1a2a32] leading-snug mb-2">
              {secondaryItem?.title || "Peluct oend now"}
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
              {secondaryItem?.specs || secondaryItem?.details || "Tailored ergonomic contours engineered with premium-grade alloy finish for seamless performance in mission-critical facilities."}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="bg-[#1a2a32] hover:bg-slate-900 text-white font-bold text-[10px] px-5 py-2 rounded-full tracking-wide shadow-xs cursor-pointer"
              >
                See Specs
              </button>
              <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                <span className="text-emerald-500">●</span> Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SECTION 4: PANORAMIC BOTTOM SHOWCASE BANNER */}
      <div className="bg-gradient-to-b from-[#6c9fa9] to-[#5a909d] p-5 sm:p-7 text-center text-white">
        <h4 className="font-serif text-base sm:text-xl font-bold text-white mb-2 max-w-sm mx-auto leading-tight">
          {profile.signatureTagline || "Premium Engineering Solutions For Modern High-Performance Workspaces"}
        </h4>
        <p className="text-[11px] text-white/90 mb-3.5 max-w-xs mx-auto">
          Direct enterprise inventory verified under ISO 9001 and strict operational benchmarks.
        </p>
        <div className="mb-4">
          <button
            type="button"
            className="bg-white hover:bg-slate-100 text-[#1a2a32] font-extrabold text-[10.5px] px-6 py-2 rounded-full tracking-wide shadow-md transition-all cursor-pointer"
          >
            Explore All Units →
          </button>
        </div>

        <div
          onClick={() =>
            onEnlargeMedia?.({
              imageUrl: panoramicStagingImage,
              title: "Panoramic Collection",
              text: "Complete Architecture & Equipment Staging",
            })
          }
          className="rounded-xl overflow-hidden shadow-lg border border-white/20 relative group cursor-pointer"
        >
          <img
            src={panoramicStagingImage}
            alt="Panoramic Collection"
            onError={(e) => {
              const t = e.currentTarget;
              if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
            }}
            className="w-full h-32 sm:h-44 object-cover group-hover:scale-103 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span>🔍</span>
          </div>
        </div>
      </div>

      {/* 6. SECTION 5: 4-COLUMN FOOTER */}
      <div className="bg-white p-5 sm:p-6 border-t border-slate-200 text-left">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="font-serif font-bold text-xs text-[#1a2a32] mb-1">
              CREED TECH
            </div>
            <div className="text-[9.5px] text-slate-500 leading-tight">
              We to your rich dispatches. Tailored enterprise engineering.
            </div>
          </div>
          <div>
            <div className="font-bold text-[9.5px] text-[#1a2a32] uppercase mb-1">
              Directory
            </div>
            <div className="text-[9px] text-slate-500 space-y-0.5">
              <div>Equipment</div>
              <div>Catalog</div>
              <div>Warranty</div>
            </div>
          </div>
          <div>
            <div className="font-bold text-[9.5px] text-[#1a2a32] uppercase mb-1">
              Compliance
            </div>
            <div className="text-[9px] text-slate-500 leading-tight">
              Certified standard under stringent industrial tolerance.
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="font-bold text-[9.5px] text-[#1a2a32] uppercase mb-1">
              Direct Desk
            </div>
            <div className="text-[9px] text-slate-500 mb-1.5 truncate">
              {profile.email}
            </div>
            <button
              type="button"
              className="bg-[#1a2a32] text-white text-[9px] font-bold px-3 py-1 rounded-full cursor-pointer hover:bg-slate-900"
            >
              Contact Desk →
            </button>
          </div>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[8.5px] text-slate-400 border-t border-slate-100">
          <span>&copy; {new Date().getFullYear()} Creed Tech Enterprise Solutions. All rights reserved.</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="w-5 h-5 rounded-full bg-[#1a2a32] text-white flex items-center justify-center hover:bg-[#1877F2] transition-all hover:scale-110 shadow-2xs"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={liUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="w-5 h-5 rounded-full bg-[#1a2a32] text-white flex items-center justify-center hover:bg-[#0A66C2] transition-all hover:scale-110 shadow-2xs"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="w-5 h-5 rounded-full bg-[#1a2a32] text-white flex items-center justify-center hover:bg-[#25D366] transition-all hover:scale-110 shadow-2xs"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="w-5 h-5 rounded-full bg-[#1a2a32] text-white flex items-center justify-center hover:bg-[#E4405F] transition-all hover:scale-110 shadow-2xs"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. FORMAT 4: EXECUTIVE SIGNATURE BANNER PREVIEW
// ---------------------------------------------------------------------------
export function Format4Preview({
  profile,
  isSmall = false,
  customMessage,
}: EmailPreviewProps) {
  const name = profile.signatureName || profile.name || "Tariq Mahmood";
  const role = profile.signatureRole || profile.department || "Chief Technical Director";
  const company = profile.signatureCompany || "CREED TECH";
  const phone = profile.phone || "+92 321 9204488";
  const email = profile.email || "solutions@creed-tech.com";
  const website = profile.signatureWebsite || "https://creed-tech.com";
  const websiteDisplay = website.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  const address = profile.address || "Office #02, Main Shopping Center, Sheikhupura, PK";
  const avatar =
    profile.signatureAvatar ||
    profile.sidebarLogo ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
  const companyLogo = profile.sidebarLogo || profile.signatureCompanyLogo || "https://creed-tech.com/icons/icon-192x192.png";

  return (
    <div className="my-3 flex justify-center">
      <div className="relative w-full max-w-[720px] rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm min-h-[220px] sm:min-h-[240px] flex flex-col justify-between select-none">
        <svg
          viewBox="0 0 720 240"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 290 0 C 365 0 355 60 325 115 C 295 165 315 205 385 210 C 475 215 570 190 720 135 L 720 0 Z"
            fill="#DDEAF8"
          />
          <path
            d="M 0 0 L 345 0 C 355 55 310 115 255 152 C 205 186 120 185 0 152 Z"
            fill="#0D62B2"
          />
          <path
            d="M 235 62 A 58 58 0 0 0 216 168 A 62 62 0 0 1 235 62 Z"
            fill="#07447D"
          />
          <g
            transform="translate(665, 58)"
            opacity="0.65"
            stroke="#93C5FD"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          >
            <circle cx="0" cy="0" r="26" strokeDasharray="3 3" opacity="0.4" />
            <path d="M -18 -14 Q -6 -20 6 -14 Q 18 -8 24 -14" />
            <path d="M -22 -7 Q -10 -13 2 -7 Q 14 -1 22 -7" />
            <path d="M -24 0 Q -12 -6 0 0 Q 12 6 24 0" />
            <path d="M -22 7 Q -14 1 0 7 Q 14 13 22 7" />
            <path d="M -18 14 Q -8 8 4 14 Q 16 20 20 14" />
            <path d="M -12 21 Q -2 15 8 21" />
          </g>
        </svg>

        <div className="relative z-10 pt-5 sm:pt-6 pl-8 sm:pl-12 flex items-start">
          <div className="text-center text-white">
            {companyLogo && !companyLogo.includes("default") ? (
              <div className="flex flex-col items-center">
                <img
                  src={companyLogo}
                  alt="Logo"
                  className="w-8 h-8 rounded-full object-contain bg-white/10 p-1 border border-white/40"
                />
                <div className="text-[10px] font-black tracking-widest mt-1 text-white uppercase">
                  {company || "LOGO"}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-[3px] border-white rounded-full flex items-center justify-center">
                  <div className="w-3.5 h-1.5 border-2 border-white rounded-xs" />
                </div>
                <div className="text-[10px] font-black tracking-[0.25em] mt-1.5 uppercase text-white">
                  LOGO
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-1/2 left-[28%] sm:left-[32%] -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 sm:p-1.5 shadow-md flex items-center justify-center border-4 border-white">
            {avatar && !avatar.includes("default") ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                }}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-1 text-center">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 stroke-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="text-[7.5px] sm:text-[8px] font-bold text-slate-500 mt-0.5 tracking-tight leading-none">
                  Place Image Here
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 pb-4 sm:pb-5 pl-8 sm:pl-10 flex items-center gap-3 sm:gap-4 text-slate-700">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            title="Website"
            className="hover:text-blue-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </a>
          <span title={address} className="hover:text-blue-600 transition-colors cursor-pointer">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </span>
          <a
            href={`mailto:${email}`}
            title="Email"
            className="hover:text-blue-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>

        <div className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 w-[52%] sm:w-[50%] z-10 pl-2">
          <div className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900 font-sans leading-tight truncate">
            {name || "NAME SURNAME"}
          </div>
          <div className="text-[10px] sm:text-[11.5px] font-bold uppercase tracking-widest text-[#0066CC] mt-0.5 mb-2.5 sm:mb-3 truncate">
            {role || "GENERAL MANAGER"}
          </div>

          <div className="space-y-1.5 sm:space-y-2 text-[10.5px] sm:text-[11.5px] text-slate-700">
            <div className="flex items-center gap-2 truncate">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#0066CC] shrink-0" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <a href={`tel:${phone}`} className="hover:text-blue-700 font-medium text-slate-800 truncate">
                {phone}
              </a>
            </div>

            <div className="flex items-center gap-2 truncate">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#0066CC] shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <span className="truncate">
                <a href={`mailto:${email}`} className="hover:text-blue-700 font-medium text-slate-800">
                  {email}
                </a>
                <span className="text-slate-400 mx-1">/</span>
                <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 font-medium text-slate-800">
                  {websiteDisplay}
                </a>
              </span>
            </div>

            <div className="flex items-center gap-2 truncate">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#0066CC] shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-slate-600 font-medium truncate" title={address}>
                {address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. FORMAT 5: EDITORIAL NEWSLETTER PREVIEW
// ---------------------------------------------------------------------------
export function Format5Preview({
  profile,
  isSmall = false,
  customMessage,
  onEnlargeMedia,
}: EmailPreviewProps) {
  const brandName = profile.editorialBrandTitle || profile.signatureCompany || "TIMESHIFTER";
  const accent = profile.accentColor || "#EA580C";
  const logo = profile.editorialLogoUrl || profile.sidebarLogo || profile.signatureCompanyLogo;
  const website = profile.signatureWebsite || "https://timeshifter.com";
  const address = profile.editorialFooterAddress || profile.address || "Timeshifter Inc • 28 Hill Street #820 • Southampton, NY 11968 • United States";
  const footerDisclaimer = profile.editorialFooterDisclaimer || `These statements have not been evaluated by the Food and Drug Administration. ${brandName} is not intended to diagnose, treat, cure or prevent any disease, and is intended for healthy adults, 18 years of age or older. The ${brandName} apps are not intended for pilots and flight crews on duty.`;

  // Section 1
  const s1Headline = profile.editorialS1Headline || profile.editorialHeadline || "More time zones to cross this year?";
  const s1Desc = customMessage?.trim() || profile.editorialS1Text || (profile.defaultMessageTemplate?.trim()
    ? (profile.defaultMessageTemplate || "")
        .replace("{client_name}", "Valued Traveler")
        .replace("{service}", "Timeshifter Jet Lag Plan")
        .replace("{id}", "501")
    : "You've already tried Timeshifter once, on us — so you know what it's like to land fresh instead of wrecked. Subscribe now and save 20% on 12 months of unlimited plans.");
  const s1BtnText = profile.editorialS1BtnText || profile.editorialCtaText || "Subscribe and save 20%";
  const s1BtnUrl = profile.editorialS1BtnUrl || website;
  const s1Subtext = profile.editorialS1Subtext || "For first-time subscribers only.<br />Offer ends September 30, 2026";
  const s1Img = profile.editorialS1ImageUrl || profile.editorialHeroImage;

  // Section 2
  const s2Headline = profile.editorialS2Headline || "More than 1.7 million travelers trust Timeshifter";
  const s2Desc = profile.editorialS2Text || "Timeshifter is based on the latest science and is trusted by more than 1.7 million travelers to reduce jet lag and arrive at their best.";
  const s2Rating = profile.editorialS2RatingText || "4.7/5 rating";
  const s2BtnText = profile.editorialS2BtnText || "Subscribe and save 20%";
  const s2BtnUrl = profile.editorialS2BtnUrl || website;
  const s2Subtext = profile.editorialS2Subtext || "For first-time subscribers only.<br />Offer ends September 30, 2026";
  const s2Img = profile.editorialS2ImageUrl || profile.editorialPromoImage;

  // Section 3
  const s3Headline = profile.editorialS3Headline || "Gift cards";
  const s3Desc = profile.editorialS3Text || "Give a year of unlimited jet lag plans. Send by email to family, friends, or your team — or order physical gift cards, shipped in boxes of 50.";
  const s3BtnText = profile.editorialS3BtnText || "Buy gift cards";
  const s3BtnUrl = profile.editorialS3BtnUrl || website;
  const s3Img = profile.editorialS3ImageUrl || profile.editorialProductImage;

  // Section 4
  const s4Headline = profile.editorialS4Headline || "The best sleep mask for timeshifting";
  const s4Desc = profile.editorialS4Text || "When Timeshifter calls for sleep, staying in the dark is everything. We have tested a lot of masks. The Manta PRO is the one we keep coming back to.";
  const s4BtnText = profile.editorialS4BtnText || "Learn more";
  const s4BtnUrl = profile.editorialS4BtnUrl || website;
  const s4Img = profile.editorialS4ImageUrl || profile.editorialSecondaryImage;

  const socialLinks = profile.editorialSocialLinks && profile.editorialSocialLinks.length > 0
    ? profile.editorialSocialLinks
    : (profile.sidebarSocialLinks && profile.sidebarSocialLinks.length > 0 ? profile.sidebarSocialLinks : DEFAULT_FORMAT5_SOCIAL_LINKS);

  return (
    <div className="my-3 flex justify-center w-full">
      <div className={`w-full ${isSmall ? "max-w-[420px]" : "max-w-[560px]"} bg-[#FAF8F5] rounded-2xl border border-stone-200/90 shadow-md overflow-hidden text-center select-none font-sans`}>
        {/* TOP HEADER */}
        <div className="py-6 sm:py-8 px-4 flex items-center justify-center">
          {logo && !logo.includes("default") ? (
            <img src={logo} alt={brandName} className="max-h-7 object-contain" />
          ) : (
            <div className="inline-flex items-center justify-center gap-2">
              <svg width="22" height="18" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="4,18 9,3 13,10" fill="#EA580C" />
                <polygon points="13,10 18,3 22,18" fill="#F59E0B" />
                <polygon points="8,18 13,10 17,18" fill="#0D9488" />
              </svg>
              <span className="text-base sm:text-lg font-black tracking-[0.16em] text-zinc-900 uppercase font-sans">
                {brandName}
              </span>
              <span className="text-[10px] font-bold text-zinc-500 align-super">®</span>
            </div>
          )}
        </div>

        {/* SECTION 1 */}
        <div className="px-4 sm:px-8 pb-8 sm:pb-10">
          <div
            onClick={() =>
              onEnlargeMedia?.({
                imageUrl:
                  s1Img ||
                  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop",
                title: s1Headline.replace(/<[^>]*>/g, ""),
                text: s1Desc,
              })
            }
            className="bg-[#EDE8DF] rounded-2xl overflow-hidden p-4 sm:p-6 mb-5 sm:mb-6 shadow-2xs cursor-pointer group hover:ring-2 hover:ring-orange-400 hover:shadow-lg transition-all relative"
            title="Click to view enlarged image & details"
          >
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10 shadow-sm pointer-events-none">
              <span>🔍</span>
              <span>Click to Enlarge</span>
            </div>
            {s1Img ? (
              <img
                src={s1Img}
                alt={s1Headline.replace(/<[^>]*>/g, "")}
                className="max-h-[220px] w-full object-contain mx-auto rounded-xl transition-transform group-hover:scale-[1.02]"
              />
            ) : (
              <svg width="100%" height={isSmall ? "170" : "210"} viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[440px] mx-auto block">
                <path d="M 60 70 Q 90 40 140 60 Q 180 50 200 80 Q 230 70 240 100 L 40 100 Z" fill="#E4DED4" opacity="0.7"/>
                <path d="M 280 90 Q 320 60 370 75 Q 410 65 440 95 L 260 95 Z" fill="#E4DED4" opacity="0.6"/>
                <g transform="translate(150, 42) scale(0.7) rotate(-8)">
                  <path d="M 0 8 L 36 0 L 32 6 L 16 10 L 22 18 L 18 19 L 12 12 L 4 14 L 0 8 Z" fill="#9CA3AF"/>
                </g>
                <line x1="20" y1="230" x2="460" y2="230" stroke="#DFD7CA" strokeWidth="2" />
                <g transform="translate(195, 20)">
                  <rect x="58" y="115" width="34" height="62" rx="4" fill="#374151"/>
                  <rect x="63" y="122" width="24" height="48" rx="2" fill="#4B5563"/>
                  <path d="M 68 115 L 68 98 L 82 98 L 82 115" stroke="#9CA3AF" strokeWidth="2.5" fill="none"/>
                  <circle cx="66" cy="180" r="3.5" fill="#1F2937"/>
                  <circle cx="84" cy="180" r="3.5" fill="#1F2937"/>
                  <path d="M 45 75 Q 60 88 72 98" stroke="#374151" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M 26 122 L 18 198 L 8 202" stroke="#4B5563" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M 38 122 L 48 194 L 58 197" stroke="#374151" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M 22 55 L 44 55 L 48 120 L 18 120 Z" fill="#F59E0B"/>
                  <polygon points="30,55 33,70 36,55" fill="#D97706"/>
                  <path d="M 22 68 Q 10 75 8 92" stroke="#374151" strokeWidth="5" strokeLinecap="round"/>
                  <rect x="3" y="88" width="8" height="15" rx="1.5" fill="#111827"/>
                  <ellipse cx="33" cy="36" rx="9" ry="11" fill="#FCD34D"/>
                  <rect x="25" y="32" width="16" height="5.5" rx="2" fill="#111827"/>
                  <path d="M 24 30 Q 33 18 42 30 Q 48 45 42 62 Q 38 52 38 42 Z" fill="#1F2937"/>
                </g>
              </svg>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug mb-2.5">
            {s1Headline}
          </h1>
          <p className="text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed max-w-[430px] mx-auto mb-4 sm:mb-5">
            {s1Desc}
          </p>
          <div className="mb-2">
            <a
              href={s1BtnUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: accent }}
              className="inline-block text-white text-xs sm:text-[13.5px] font-bold px-7 sm:px-9 py-2.5 sm:py-3 rounded-full shadow-md hover:brightness-105 transition-all"
            >
              {s1BtnText}
            </a>
          </div>
          <div
            className="text-[10px] sm:text-[10.5px] text-zinc-500 leading-tight"
            dangerouslySetInnerHTML={{ __html: s1Subtext }}
          />
        </div>

        {/* SECTION 2 */}
        <div className="px-4 sm:px-8 pb-8 sm:pb-10">
          <div
            onClick={() =>
              onEnlargeMedia?.({
                imageUrl:
                  s2Img ||
                  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
                title: s2Headline.replace(/<[^>]*>/g, ""),
                text: s2Desc,
              })
            }
            className="bg-[#EDE8DF] rounded-2xl overflow-hidden p-4 sm:p-6 mb-5 sm:mb-6 relative shadow-2xs cursor-pointer group hover:ring-2 hover:ring-orange-400 hover:shadow-lg transition-all"
            title="Click to view enlarged image & details"
          >
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10 shadow-sm pointer-events-none">
              <span>🔍</span>
              <span>Click to Enlarge</span>
            </div>
            {s2Img ? (
              <img
                src={s2Img}
                alt={s2Headline.replace(/<[^>]*>/g, "")}
                className="max-h-[220px] w-full object-contain mx-auto rounded-xl transition-transform group-hover:scale-[1.02]"
              />
            ) : (
              <svg width="100%" height={isSmall ? "170" : "210"} viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[440px] mx-auto block">
                <defs>
                  <clipPath id="m2Center">
                    <rect x="180" y="24" width="120" height="200" rx="18" />
                  </clipPath>
                  <clipPath id="m2Left">
                    <rect x="80" y="44" width="95" height="170" rx="14" />
                  </clipPath>
                  <clipPath id="m2Right">
                    <rect x="305" y="44" width="95" height="170" rx="14" />
                  </clipPath>
                </defs>
                <g opacity="0.38">
                  <rect x="10" y="8" width="52" height="52" rx="6" fill="#D1C7B7" />
                  <circle cx="36" cy="30" r="14" fill="#B8AC9A" />
                  <rect x="70" y="8" width="52" height="52" rx="6" fill="#C9BDAA" />
                  <circle cx="96" cy="30" r="14" fill="#ADA08C" />
                  <rect x="130" y="8" width="52" height="52" rx="6" fill="#D5CBB9" />
                  <circle cx="156" cy="30" r="14" fill="#B8AC9A" />
                  <rect x="298" y="8" width="52" height="52" rx="6" fill="#D1C7B7" />
                  <circle cx="324" cy="30" r="14" fill="#ADA08C" />
                  <rect x="358" y="8" width="52" height="52" rx="6" fill="#C9BDAA" />
                  <circle cx="384" cy="30" r="14" fill="#B8AC9A" />
                  <rect x="418" y="8" width="52" height="52" rx="6" fill="#D5CBB9" />
                  <circle cx="444" cy="30" r="14" fill="#ADA08C" />
                  <rect x="10" y="68" width="52" height="52" rx="6" fill="#C9BDAA" />
                  <rect x="70" y="68" width="52" height="52" rx="6" fill="#D5CBB9" />
                  <rect x="358" y="68" width="52" height="52" rx="6" fill="#D1C7B7" />
                  <rect x="418" y="68" width="52" height="52" rx="6" fill="#C9BDAA" />
                  <rect x="10" y="128" width="52" height="52" rx="6" fill="#D5CBB9" />
                  <rect x="70" y="128" width="52" height="52" rx="6" fill="#D1C7B7" />
                  <rect x="358" y="128" width="52" height="52" rx="6" fill="#D5CBB9" />
                  <rect x="418" y="128" width="52" height="52" rx="6" fill="#D1C7B7" />
                </g>
                <g filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.12))">
                  <rect x="80" y="44" width="95" height="170" rx="14" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4"/>
                  <g clipPath="url(#m2Left)">
                    <rect x="80" y="44" width="95" height="20" fill="#F3F4F6"/>
                    <circle cx="127" cy="115" r="28" fill="#FDE68A" opacity="0.6"/>
                    <circle cx="127" cy="115" r="18" fill="#F59E0B"/>
                    <rect x="94" y="160" width="67" height="6" rx="3" fill="#E5E7EB"/>
                    <rect x="104" y="172" width="47" height="5" rx="2.5" fill="#E5E7EB"/>
                  </g>
                </g>
                <g filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.12))">
                  <rect x="305" y="44" width="95" height="170" rx="14" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4"/>
                  <g clipPath="url(#m2Right)">
                    <rect x="305" y="44" width="95" height="20" fill="#F3F4F6"/>
                    <rect x="345" y="75" width="15" height="70" rx="7" fill="#F59E0B"/>
                    <rect x="348" y="150" width="9" height="35" rx="4.5" fill="#3B82F6"/>
                  </g>
                </g>
                <g filter="drop-shadow(0px 10px 22px rgba(0,0,0,0.18))">
                  <rect x="180" y="24" width="120" height="200" rx="18" fill="#FFFFFF" stroke="#111827" strokeWidth="5"/>
                  <g clipPath="url(#m2Center)">
                    <rect x="180" y="24" width="120" height="24" fill="#FFFFFF"/>
                    <rect x="220" y="32" width="40" height="4" rx="2" fill="#E5E7EB"/>
                    <rect x="226" y="80" width="28" height="65" rx="14" fill="#F59E0B"/>
                    <circle cx="204" cy="112" r="10" fill="#E0E7FF"/>
                    <circle cx="276" cy="112" r="10" fill="#FEF3C7"/>
                    <line x1="180" y1="195" x2="300" y2="195" stroke="#F3F4F6" strokeWidth="1"/>
                    <circle cx="210" cy="207" r="4" fill="#9CA3AF"/>
                    <circle cx="240" cy="207" r="4" fill="#EA580C"/>
                    <circle cx="270" cy="207" r="4" fill="#9CA3AF"/>
                  </g>
                </g>
                <g transform="translate(195, 172)" filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.22))">
                  <rect x="0" y="0" width="90" height="28" rx="7" fill="#18181B"/>
                  <text x="45" y="12" fill="#FBBF24" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">★★★★★</text>
                  <text x="45" y="22" fill="#FFFFFF" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">{s2Rating}</text>
                </g>
              </svg>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug mb-2.5">
            {s2Headline}
          </h2>
          <p className="text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed max-w-[430px] mx-auto mb-4 sm:mb-5">
            {s2Desc}
          </p>
          <div className="mb-2">
            <a
              href={s2BtnUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: accent }}
              className="inline-block text-white text-xs sm:text-[13.5px] font-bold px-7 sm:px-9 py-2.5 sm:py-3 rounded-full shadow-md hover:brightness-105 transition-all"
            >
              {s2BtnText}
            </a>
          </div>
          <div
            className="text-[10px] sm:text-[10.5px] text-zinc-500 leading-tight"
            dangerouslySetInnerHTML={{ __html: s2Subtext }}
          />
        </div>

        {/* SECTION 3 */}
        <div className="px-4 sm:px-8 pb-8 sm:pb-10">
          <div
            onClick={() =>
              onEnlargeMedia?.({
                imageUrl:
                  s3Img ||
                  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop",
                title: s3Headline.replace(/<[^>]*>/g, ""),
                text: s3Desc,
              })
            }
            className="bg-[#EDE8DF] rounded-2xl overflow-hidden p-5 sm:p-7 mb-5 sm:mb-6 shadow-2xs cursor-pointer group hover:ring-2 hover:ring-orange-400 hover:shadow-lg transition-all relative"
            title="Click to view enlarged image & details"
          >
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10 shadow-sm pointer-events-none">
              <span>🔍</span>
              <span>Click to Enlarge</span>
            </div>
            {s3Img ? (
              <img
                src={s3Img}
                alt={s3Headline.replace(/<[^>]*>/g, "")}
                className="max-h-[200px] w-full object-contain mx-auto rounded-xl transition-transform group-hover:scale-[1.02]"
              />
            ) : (
              <svg width="100%" height={isSmall ? "150" : "190"} viewBox="0 0 440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[380px] mx-auto block">
                <g transform="translate(130, 20) rotate(-10)" filter="drop-shadow(0px 8px 18px rgba(0,0,0,0.14))">
                  <rect x="0" y="0" width="105" height="145" rx="6" fill="#EA580C" />
                  <text x="52" y="24" fill="#FFFFFF" fontSize="8.5" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.5">JET LAG IS HISTORY</text>
                  <rect x="22" y="34" width="60" height="85" rx="6" fill="#FFFFFF" />
                  <rect x="30" y="44" width="44" height="24" rx="3" fill="#FDE68A" />
                  <rect x="45" y="74" width="14" height="30" rx="7" fill="#EA580C" />
                </g>
                <g transform="translate(205, 18) rotate(10)" filter="drop-shadow(0px 6px 16px rgba(0,0,0,0.12))">
                  <rect x="0" y="0" width="105" height="145" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1"/>
                  <rect x="0" y="0" width="105" height="14" rx="4" fill="#EA580C" />
                  <circle cx="34" cy="40" r="12" fill="#FDE68A" />
                  <circle cx="72" cy="40" r="12" fill="#E0E7FF" />
                  <rect x="18" y="66" width="68" height="5" rx="2.5" fill="#E5E7EB" />
                  <rect x="18" y="76" width="52" height="5" rx="2.5" fill="#E5E7EB" />
                  <rect x="18" y="86" width="60" height="5" rx="2.5" fill="#E5E7EB" />
                  <rect x="18" y="104" width="68" height="24" rx="3" fill="#F9FAFB" stroke="#E5E7EB"/>
                </g>
              </svg>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug mb-2.5">
            {s3Headline}
          </h2>
          <p className="text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed max-w-[430px] mx-auto mb-4 sm:mb-5">
            {s3Desc}
          </p>
          <div>
            <a
              href={s3BtnUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: accent }}
              className="inline-block text-white text-xs sm:text-[13.5px] font-bold px-7 sm:px-9 py-2.5 sm:py-3 rounded-full shadow-md hover:brightness-105 transition-all"
            >
              {s3BtnText}
            </a>
          </div>
        </div>

        {/* SECTION 4 */}
        <div className="px-4 sm:px-8 pb-8 sm:pb-10">
          <div
            onClick={() =>
              onEnlargeMedia?.({
                imageUrl:
                  s4Img ||
                  "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
                title: s4Headline.replace(/<[^>]*>/g, ""),
                text: s4Desc,
              })
            }
            className="bg-[#EDE8DF] rounded-2xl overflow-hidden p-6 sm:p-8 mb-5 sm:mb-6 shadow-2xs cursor-pointer group hover:ring-2 hover:ring-orange-400 hover:shadow-lg transition-all relative"
            title="Click to view enlarged image & details"
          >
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10 shadow-sm pointer-events-none">
              <span>🔍</span>
              <span>Click to Enlarge</span>
            </div>
            {s4Img ? (
              <img
                src={s4Img}
                alt={s4Headline.replace(/<[^>]*>/g, "")}
                className="max-h-[190px] w-full object-contain mx-auto rounded-xl transition-transform group-hover:scale-[1.02]"
              />
            ) : (
              <svg width="100%" height={isSmall ? "140" : "180"} viewBox="0 0 440 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[380px] mx-auto block">
                <g transform="translate(130, 20)" filter="drop-shadow(0px 10px 20px rgba(0,0,0,0.18))">
                  <path d="M 10 75 Q 90 -10 170 75" stroke="#1F2937" strokeWidth="18" strokeLinecap="round" fill="none" />
                  <path d="M 30 55 Q 90 12 150 55" stroke="#374151" strokeWidth="2" strokeDasharray="3 4" fill="none" />
                  <ellipse cx="90" cy="90" rx="76" ry="42" fill="#111827" />
                  <ellipse cx="90" cy="90" rx="70" ry="38" fill="#1F2937" stroke="#111827" strokeWidth="2" />
                  <ellipse cx="62" cy="92" rx="24" ry="24" fill="#0B0F19" />
                  <ellipse cx="118" cy="92" rx="24" ry="24" fill="#0B0F19" />
                  <path d="M 74 116 Q 90 98 106 116 Z" fill="#EDE8DF" />
                  <path d="M 80 84 Q 90 77 100 84 Q 90 89 80 84 Z" fill="#EF4444" />
                </g>
              </svg>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug mb-2.5">
            {s4Headline}
          </h2>
          <p className="text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed max-w-[430px] mx-auto mb-4 sm:mb-5">
            {s4Desc}
          </p>
          <div>
            <a
              href={s4BtnUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: accent }}
              className="inline-block text-white text-xs sm:text-[13.5px] font-bold px-7 sm:px-9 py-2.5 sm:py-3 rounded-full shadow-md hover:brightness-105 transition-all"
            >
              {s4BtnText}
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-4 sm:px-8 pb-8 pt-2">
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-2.5 mb-5 flex-wrap">
              {socialLinks.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={soc.label || soc.platform}
                  className="w-8 h-8 rounded-full bg-[#EDE8DF] border border-stone-300 text-stone-700 flex items-center justify-center text-xs hover:bg-[#E4DED4] hover:scale-105 transition-all shadow-2xs font-bold"
                >
                  {soc.platform === "instagram" ? "📷" :
                   soc.platform === "facebook" ? "📘" :
                   soc.platform === "linkedin" ? "💼" :
                   soc.platform === "whatsapp" ? "💬" :
                   soc.platform === "youtube" ? "▶️" :
                   soc.platform === "twitter" ? "𝕏" : "🌐"}
                </a>
              ))}
            </div>
          )}

          <div className="mb-4">
            {logo && !logo.includes("default") ? (
              <img src={logo} alt={brandName} className="max-h-6 object-contain mx-auto" />
            ) : (
              <div className="inline-flex items-center justify-center gap-2">
                <svg width="18" height="15" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="4,18 9,3 13,10" fill="#EA580C" />
                  <polygon points="13,10 18,3 22,18" fill="#F59E0B" />
                  <polygon points="8,18 13,10 17,18" fill="#0D9488" />
                </svg>
                <span className="text-sm font-black tracking-[0.16em] text-zinc-800 uppercase font-sans">
                  {brandName}
                </span>
                <span className="text-[9px] font-bold text-zinc-400 align-super">®</span>
              </div>
            )}
          </div>

          <div className="border border-zinc-300 rounded p-2.5 sm:p-3 text-[9px] text-zinc-500 leading-relaxed mb-3">
            {footerDisclaimer}
          </div>

          <div className="text-[10px] text-zinc-400 mb-2 leading-tight">
            {address}
          </div>

          <div className="text-[10px] text-zinc-400">
            <a href={website} target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600 transition-colors">
              Unsubscribe from our emails
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 7. FORMAT 1 FULL PREVIEW (CATALOG CARDS + CORPORATE HEADER/FOOTER)
// ---------------------------------------------------------------------------
export function Format1Preview({
  profile,
  isSmall = false,
  customMessage,
  onItemClick,
}: EmailPreviewProps) {
  const isLight = profile.headerStyle === "light";
  const hAlign = profile.headerAlignment || (profile.headerStyle === "centered" ? "center" : "left");
  const hBg = isLight ? "#ffffff" : "#090d16";
  const hText = isLight ? "#090d16" : "#ffffff";
  const hSubtext = isLight ? "#64748b" : "#94a3b8";
  const badgeBg = isLight ? "#f1f5f9" : "rgba(255,255,255,0.08)";
  const badgeText = isLight ? "#475569" : "#cbd5e1";
  const badgeBorder = isLight ? "#e2e8f0" : "rgba(255,255,255,0.15)";
  const badgeLabel = isSmall ? "PREVIEW" : "VERIFIED DESK";

  return (
    <div className={`bg-white rounded-xl border border-gray-300 ${isSmall ? "shadow-sm" : "shadow-xl"} overflow-hidden text-left`}>
      {/* Branded Header */}
      {hAlign === "center" ? (
        <div
          className={`${isSmall ? "p-3.5" : "p-5"} text-center`}
          style={{
            backgroundColor: hBg,
            borderBottom: `3px solid ${profile.accentColor || "#FF6B00"}`,
          }}
        >
          <div className={`${isSmall ? "text-sm" : "text-xl"} font-black tracking-wider`} style={{ color: hText }}>
            CREED <span style={{ color: profile.accentColor || "#FF6B00" }}>TECH</span>
          </div>
          <div className={`${isSmall ? "text-[9px]" : "text-xs"} uppercase tracking-widest font-semibold mt-${isSmall ? "0.5" : "1"}`} style={{ color: hSubtext }}>
            {profile.department}
          </div>
          <div className={`mt-${isSmall ? "1.5" : "2"}`}>
            <span
              className={`${isSmall ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-xs"} rounded-full font-bold inline-block`}
              style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
            >
              {badgeLabel}
            </span>
          </div>
        </div>
      ) : hAlign === "right" ? (
        <div
          className={`${isSmall ? "p-3.5" : "p-5"} flex items-center justify-between`}
          style={{
            backgroundColor: hBg,
            borderBottom: `3px solid ${profile.accentColor || "#FF6B00"}`,
          }}
        >
          <span
            className={`${isSmall ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-xs"} rounded-full font-bold`}
            style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
          >
            {badgeLabel}
          </span>
          <div className="text-right">
            <div className={`${isSmall ? "text-sm" : "text-lg"} font-black tracking-wider`} style={{ color: hText }}>
              CREED <span style={{ color: profile.accentColor || "#FF6B00" }}>TECH</span>
            </div>
            <div className={`${isSmall ? "text-[9px]" : "text-xs"} uppercase tracking-widest font-semibold mt-${isSmall ? "0.5" : "1"}`} style={{ color: hSubtext }}>
              {profile.department}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${isSmall ? "p-3.5" : "p-5"} flex items-center justify-between`}
          style={{
            backgroundColor: hBg,
            borderBottom: `3px solid ${profile.accentColor || "#FF6B00"}`,
          }}
        >
          <div className="text-left">
            <div className={`${isSmall ? "text-sm" : "text-lg"} font-black tracking-wider`} style={{ color: hText }}>
              CREED <span style={{ color: profile.accentColor || "#FF6B00" }}>TECH</span>
            </div>
            <div className={`${isSmall ? "text-[9px]" : "text-xs"} uppercase tracking-widest font-semibold mt-${isSmall ? "0.5" : "1"}`} style={{ color: hSubtext }}>
              {profile.department}
            </div>
          </div>
          <span
            className={`${isSmall ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-xs"} rounded-full font-bold`}
            style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
          >
            {badgeLabel}
          </span>
        </div>
      )}

      {/* Email Body Content */}
      <div
        className={`${isSmall ? "p-4 text-xs" : "p-6 text-sm"} leading-relaxed transition-colors ${
          profile.contentAlignment === "center"
            ? "text-center"
            : profile.contentAlignment === "right"
            ? "text-right"
            : "text-left"
        }`}
        style={{
          backgroundColor: profile.backgroundColor || "#FFFFFF",
          color: profile.textColor || "#1E293B",
        }}
      >
        <p
          className={`${isSmall ? "font-semibold mb-1 text-[11px]" : "font-bold mb-2"}`}
          style={{ color: profile.textColor || "#1E293B" }}
        >
          {profile.defaultSubjectTemplate
            ? profile.defaultSubjectTemplate.replace("{service}", "Enterprise Solutions").replace("{id}", "101")
            : "Re: Inquiry"}
        </p>

        {/* TOP POSITION MEDIA - FORMAT 1 ONLY */}
        {profile.mediaPosition === "top" && (
          <MediaPreview profile={profile} isSmall={isSmall} onItemClick={onItemClick} />
        )}

        {/* Message Body */}
        <div
          className={`whitespace-pre-wrap font-sans ${isSmall ? "text-[11px] p-2.5" : "text-xs p-3"} leading-relaxed rounded border`}
          style={{
            color: profile.textColor || "#1E293B",
            backgroundColor: (profile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (profile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
            borderColor: (profile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (profile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(0, 0, 0, 0.08)",
          }}
        >
          {customMessage ||
            (profile.defaultMessageTemplate || "Hello Client,\n\nThank you for reaching out.")
              .replace("{client_name}", "Valued Enterprise Client")
              .replace("{service}", "Cloud Architecture & High-Reliability Engineering")
              .replace("{id}", "101")}
        </div>

        {/* CENTER POSITION MEDIA - FORMAT 1 ONLY */}
        {(profile.mediaPosition || "center") === "center" && (
          <MediaPreview profile={profile} isSmall={isSmall} onItemClick={onItemClick} />
        )}

        {/* FORMAT 1: CLEAN CORPORATE SIGN-OFF */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-xs">
          <div className={`font-bold ${isSmall ? "text-xs uppercase" : "text-sm"}`} style={{ color: profile.textColor || "#1E293B" }}>
            {profile.name}
          </div>
          <div className="text-gray-600 font-medium mt-0.5">
            <span style={{ color: profile.accentColor || "#FF6B00" }}>{profile.email}</span>
            {profile.phone && ` • Tel: ${profile.phone}`}
          </div>
          <div className="text-gray-400 text-[11px] mt-0.5">
            {profile.department}
          </div>
        </div>

        {/* BOTTOM POSITION MEDIA - FORMAT 1 ONLY */}
        {profile.mediaPosition === "bottom" && (
          <MediaPreview profile={profile} isSmall={isSmall} onItemClick={onItemClick} />
        )}
      </div>

      {/* Footer */}
      <div
        className={`bg-gray-50 ${isSmall ? "p-3 text-[9px]" : "p-4 text-xs"} border-t border-gray-200 text-gray-500 leading-relaxed ${
          profile.contentAlignment === "center"
            ? "text-center"
            : profile.contentAlignment === "right"
            ? "text-right"
            : "text-left"
        }`}
      >
        {profile.address && (
          <div className="mb-1">
            <strong>Headquarters:</strong> {profile.address}
          </div>
        )}
        <div>
          <strong>Web:</strong> https://creed-tech.com • <strong>Desk:</strong> {profile.email}
        </div>
        {profile.footerDisclaimer && (
          <div className={`mt-2 pt-2 border-t border-gray-200 ${isSmall ? "text-[8px]" : "text-[10px]"} text-gray-400`}>
            {profile.footerDisclaimer}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 8. UNIFIED PREVIEW ROUTER COMPONENT
// ---------------------------------------------------------------------------
export function EmailPreviewRenderer({
  profile,
  format: customFormat,
  isSmall = false,
  customMessage,
  onItemClick,
  onEnlargeMedia,
}: EmailPreviewProps) {
  const format: EmailFormatType =
    customFormat ||
    profile.formatType ||
    (profile.sidebarLogo || profile.galleryRows || profile.sidebarSocialLinks
      ? "format-executive-signature"
      : "format-catalog");

  if (format === "format-executive-signature") {
    return (
      <div className={isSmall ? "sticky top-1" : ""}>
        <Format2Preview
          profile={profile}
          isSmall={isSmall}
          customMessage={customMessage}
          onItemClick={onItemClick}
          onEnlargeMedia={onEnlargeMedia}
        />
      </div>
    );
  }

  if (format === "format-announcement") {
    return (
      <div className={isSmall ? "sticky top-1" : ""}>
        <Format3Preview
          profile={profile}
          isSmall={isSmall}
          customMessage={customMessage}
          onItemClick={onItemClick}
          onEnlargeMedia={onEnlargeMedia}
        />
      </div>
    );
  }

  if (format === "format-minimal") {
    return (
      <div className={isSmall ? "sticky top-1" : ""}>
        <Format4Preview
          profile={profile}
          isSmall={isSmall}
          customMessage={customMessage}
          onItemClick={onItemClick}
          onEnlargeMedia={onEnlargeMedia}
        />
      </div>
    );
  }

  if (format === "format-custom") {
    return (
      <div className={isSmall ? "sticky top-1" : ""}>
        <Format5Preview
          profile={profile}
          isSmall={isSmall}
          customMessage={customMessage}
          onItemClick={onItemClick}
          onEnlargeMedia={onEnlargeMedia}
        />
      </div>
    );
  }

  // Format 1: Catalog Cards + Corporate Preview
  return (
    <div className={isSmall ? "sticky top-1" : ""}>
      <Format1Preview
        profile={profile}
        isSmall={isSmall}
        customMessage={customMessage}
        onItemClick={onItemClick}
        onEnlargeMedia={onEnlargeMedia}
      />
    </div>
  );
}
