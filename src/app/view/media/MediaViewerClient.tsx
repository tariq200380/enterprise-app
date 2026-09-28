"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface MediaViewerClientProps {
  type: string;
  src?: string;
  thumb?: string;
  gallery?: string[];
  title: string;
  year?: string;
  condition?: string;
  specs?: string;
  desc?: string;
  desk: string;
  email: string;
  phone?: string;
}

export default function MediaViewerClient({
  type,
  src = "",
  thumb = "",
  gallery = [],
  title,
  year = "",
  condition = "★★★★☆",
  specs = "",
  desc = "",
  desk,
  email,
  phone = "",
}: MediaViewerClientProps) {
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Gallery photos
  const allPhotos: string[] =
    gallery && gallery.length > 0
      ? gallery.includes(src)
        ? gallery
        : src
        ? [src, ...gallery]
        : gallery
      : src
      ? [src]
      : [];

  const [activePhoto, setActivePhoto] = useState<string>(src || allPhotos[0] || "");

  // Check YouTube or Vimeo embed
  const getEmbedUrl = (rawUrl: string): string | null => {
    if (!rawUrl) return null;
    const ytMatch = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/i);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
    }
    const vimeoMatch = rawUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(src);
  const isDirectVideo =
    type === "video" &&
    !embedUrl &&
    (src.includes(".mp4") ||
      src.includes(".webm") ||
      src.includes(".mov") ||
      src.includes("/uploads/") ||
      src.startsWith("blob:") ||
      src.startsWith("data:video/"));

  const isVideo = type === "video" || Boolean(embedUrl) || isDirectVideo;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderConditionStars = (condStr: string) => {
    const num = parseInt(condStr, 10);
    if (!isNaN(num) && num >= 1 && num <= 5) {
      return (
        <span className="text-amber-400 text-sm tracking-widest font-bold">
          {"★".repeat(num)}
          <span className="text-gray-300">{"☆".repeat(5 - num)}</span>
        </span>
      );
    }
    return <span className="text-amber-500 font-bold text-sm">{condStr}</span>;
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb & Desk Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors"
            >
              CREED <span className="text-[#FF6B00]">TECH</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider">
              {isVideo ? "Video Broadcast" : "Current Offers & Equipment Catalog"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              {desk}
            </span>
            <button
              onClick={handleShare}
              className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 font-medium transition-colors cursor-pointer"
            >
              {copied ? "✓ Link Copied" : "🔗 Share Link"}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIDEO MODE                                              */}
        {/* ======================================================== */}
        {isVideo ? (
          <div className="space-y-6">
            <div className="bg-[#0C1222] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {title}
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">
                    Verified Video Presentation • Direct from {desk}
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-bold">
                  ▶ Auto-playing
                </span>
              </div>

              {/* Video Player */}
              <div className="relative rounded-xl overflow-hidden bg-black shadow-inner border border-white/10 aspect-video flex items-center justify-center">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : isDirectVideo || src ? (
                  <video
                    src={src}
                    poster={thumb || undefined}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center p-8 text-gray-400">
                    <p className="text-sm">No video source provided.</p>
                  </div>
                )}
              </div>

              {/* Description & Action Footer */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Presentation Overview
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {desc ||
                      "This video walk-through was shared directly via our enterprise correspondence channel. For technical scoping, blueprint reviews, or dedicated engineering support, please contact our desk."}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent("Inquiry regarding " + title)}`}
                    className="w-full py-2.5 px-4 bg-[#FF6B00] hover:bg-[#ff7b1a] text-white text-xs font-bold rounded-lg text-center shadow-lg shadow-[#FF6B00]/20 transition-colors"
                  >
                    ✉ Reply to Desk ({email})
                  </a>
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold rounded-lg text-center transition-colors"
                    >
                      📞 Direct Line: {phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* IMAGE / MACHINEZ.DE OFFER CARD MODE                      */
          /* ======================================================== */
          <div className="space-y-6">
            <div className="bg-[#0C1222] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Top Banner Header */}
              <div className="bg-gradient-to-r from-[#0C1222] via-[#131C35] to-[#0C1222] p-6 border-b border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest mb-1">
                      Current Offer / Equipment &amp; Solution Details
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {title}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${email}?subject=${encodeURIComponent("Inquiry about " + title)}`}
                      className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#ff7b1a] text-white text-xs font-bold rounded-lg shadow-lg shadow-[#FF6B00]/25 transition-all flex items-center gap-1.5"
                    >
                      <span>Inquire Now</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Main Content: Left Image, Right Specs (2-column on md: preserved) */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Photo Card (matching machinez.de catalog card with multi-photo gallery) */}
                <div className="space-y-3">
                  <div
                    onClick={() => setLightboxOpen(true)}
                    className="relative rounded-xl overflow-hidden bg-black/60 border border-white/10 group cursor-pointer aspect-4/3 flex items-center justify-center shadow-lg"
                  >
                    {activePhoto ? (
                      <img
                        src={activePhoto}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-center p-8 text-gray-500">
                        <span className="text-4xl block mb-2">📷</span>
                        <p className="text-xs">No image provided</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-bold backdrop-blur-xs flex items-center gap-1.5">
                        🔍 Click to Enlarge
                      </span>
                    </div>

                    {allPhotos.length > 1 && (
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white text-xs font-bold border border-white/20">
                        📷 {allPhotos.indexOf(activePhoto) + 1} / {allPhotos.length}
                      </div>
                    )}
                  </div>

                  {/* Multi-Photo Thumbnails Gallery Strip */}
                  {allPhotos.length > 1 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-gray-400 flex items-center justify-between">
                        <span>All Pictures for this Equipment ({allPhotos.length}):</span>
                        <span className="text-[10px] text-gray-500">Click photo to view</span>
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 custom-scrollbar">
                        {allPhotos.map((photo, pIdx) => {
                          const isCurrent = photo === activePhoto;
                          return (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => setActivePhoto(photo)}
                              className={`relative shrink-0 w-16 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                isCurrent
                                  ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/40 scale-102"
                                  : "border-white/20 hover:border-white/50 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img src={photo} alt={`${title} view ${pIdx + 1}`} className="w-full h-full object-cover" />
                              {pIdx === 0 && (
                                <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] font-bold text-white text-center py-0.5 leading-none">
                                  Main
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <span className="text-[11px] text-gray-400">
                      High-resolution visual representation • Click photo to view full size
                    </span>
                  </div>
                </div>

                {/* Product Specifications & Details Table */}
                <div className="space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="border border-white/10 rounded-xl bg-white/5 divide-y divide-white/10 overflow-hidden">
                      {year && (
                        <div className="flex items-center justify-between p-3.5 text-sm">
                          <span className="text-gray-400 font-medium">Year:</span>
                          <span className="font-bold text-white font-mono">{year}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between p-3.5 text-sm">
                        <span className="text-gray-400 font-medium">Condition:</span>
                        <span className="flex items-center gap-1.5 font-semibold">
                          {renderConditionStars(condition)}
                        </span>
                      </div>

                      {specs && (
                        <div className="p-3.5 text-sm">
                          <span className="text-gray-400 font-medium block mb-1">
                            Key Specifications:
                          </span>
                          <div className="text-white font-mono text-xs bg-black/40 p-2.5 rounded border border-white/5 whitespace-pre-wrap leading-relaxed">
                            {specs}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between p-3.5 text-sm">
                        <span className="text-gray-400 font-medium">Availability:</span>
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          Immediate Delivery / Active
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3.5 text-sm">
                        <span className="text-gray-400 font-medium">Managed By:</span>
                        <span className="text-xs font-semibold text-blue-400">{desk}</span>
                      </div>
                    </div>

                    {/* Detailed Notes / Description */}
                    {desc && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                          Description &amp; Detailed Specs
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Contact Desk Actions */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/20 space-y-2">
                    <div className="text-xs font-bold text-blue-300">
                      Need formal quotation or inspection report?
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Reply directly to this correspondence or reach our verified desk:
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <a
                        href={`mailto:${email}?subject=${encodeURIComponent("Quotation Request: " + title)}`}
                        className="px-3 py-1.5 bg-[#FF6B00] hover:bg-[#ff7b1a] text-white text-xs font-bold rounded transition-colors"
                      >
                        ✉ Email Desk ({email})
                      </a>
                      {phone && (
                        <a
                          href={`tel:${phone}`}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded transition-colors"
                        >
                          📞 {phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxOpen && (activePhoto || src) && (
          <div
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-5xl max-h-[90vh]">
              <img
                src={activePhoto || src}
                alt={title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center font-bold text-sm border border-white/20"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
