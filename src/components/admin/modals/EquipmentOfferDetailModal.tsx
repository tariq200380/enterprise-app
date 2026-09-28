"use client";

import React, { useState, useEffect } from "react";
import { EmailMediaItem, EmailDepartmentProfile, buildItemViewerUrl } from "@/lib/email-types";

interface EquipmentOfferDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: EmailMediaItem | null;
  profile: Partial<EmailDepartmentProfile> | null;
}

export default function EquipmentOfferDetailModal({
  isOpen,
  onClose,
  item,
  profile,
}: EquipmentOfferDetailModalProps) {
  const [activePhoto, setActivePhoto] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isLightbox, setIsLightbox] = useState(false);

  useEffect(() => {
    if (item) {
      const initial =
        item.thumbnailUrl ||
        item.mediaUrl ||
        (Array.isArray(item.galleryUrls) && item.galleryUrls[0]) ||
        "";
      setActivePhoto(initial);
      setCopied(false);
      setIsLightbox(false);
    }
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightbox) {
          setIsLightbox(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLightbox, onClose]);

  if (!isOpen || !item) return null;

  const allPhotos: string[] = Array.from(
    new Set(
      [
        item.thumbnailUrl,
        item.mediaUrl,
        ...(Array.isArray(item.galleryUrls) ? item.galleryUrls : []),
      ].filter((u): u is string => Boolean(u && u.trim()))
    )
  );

  const isVideo = item.type === "video";
  const currentPhoto = activePhoto || allPhotos[0] || "";

  // Video embed check
  const getEmbedUrl = (rawUrl: string): string | null => {
    if (!rawUrl) return null;
    const ytMatch = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/i);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    const vimeoMatch = rawUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    return null;
  };
  const embedUrl = isVideo && item.mediaUrl ? getEmbedUrl(item.mediaUrl) : null;
  const isDirectVideo =
    isVideo &&
    item.mediaUrl &&
    !embedUrl &&
    (item.mediaUrl.endsWith(".mp4") ||
      item.mediaUrl.endsWith(".webm") ||
      item.mediaUrl.includes("/uploads/"));

  const publicViewerUrl = buildItemViewerUrl(
    item,
    profile || {},
    typeof window !== "undefined" ? window.location.origin : undefined
  );

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(publicViewerUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-4 sm:p-5 text-white flex items-center justify-between gap-3 border-b border-slate-700">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {isVideo ? "🎬 Video Walk-through" : "📷 Equipment Specification"}
                </span>
                {allPhotos.length > 1 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-slate-200">
                    {allPhotos.length} Attached Photos
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white truncate">
                {item.title || "Equipment Offer Details"}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 text-lg"
              title="Close modal (Esc)"
            >
              ✕
            </button>
          </div>

          {/* Modal Body: 2-Columns on md: */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* Left: Media Display + Thumbnails Strip */}
            <div className="md:col-span-7 space-y-3">
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 aspect-4/3 flex items-center justify-center group shadow-inner">
                {isVideo ? (
                  embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={item.title || "Video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : isDirectVideo && item.mediaUrl ? (
                    <video
                      src={item.mediaUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-6 text-slate-400">
                      <p className="text-xs">No video source found</p>
                    </div>
                  )
                ) : currentPhoto ? (
                  <>
                    <img
                      src={currentPhoto}
                      alt={item.title || "Offer"}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setIsLightbox(true)}
                    />
                    <div
                      onClick={() => setIsLightbox(true)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    >
                      <span className="px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-bold backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
                        🔍 Click to Enlarge Photo
                      </span>
                    </div>
                    {allPhotos.length > 1 && (
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold">
                        📷 {allPhotos.indexOf(currentPhoto) + 1} / {allPhotos.length}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center p-8 text-slate-400">
                    <span className="text-4xl block mb-2">📷</span>
                    <p className="text-xs">No photo available</p>
                  </div>
                )}
              </div>

              {/* Multi-Photo Thumbnails Gallery Strip */}
              {allPhotos.length > 1 && (
                <div className="space-y-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">
                      Machine Gallery ({allPhotos.length} photos):
                    </span>
                    <span className="text-slate-500 text-[10px]">Click thumbnail to view</span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                    {allPhotos.map((photo, pIdx) => {
                      const isSelected = photo === currentPhoto;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setActivePhoto(photo)}
                          className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-blue-600 ring-2 ring-blue-300 scale-102"
                              : "border-slate-300 hover:border-slate-400 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={photo}
                            alt={`Photo ${pIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Technical Specifications & Information */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5">
                {/* Title & Basic Specs Grid */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {item.title || "Equipment Offer"}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Year of Mfg
                      </span>
                      <span className="text-sm font-black text-slate-900 font-mono">
                        {item.year || "N/A"}
                      </span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Condition
                      </span>
                      <span className="text-sm font-black text-amber-500">
                        {item.condition || "★★★★☆"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Technical Specifications Box */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Technical Specifications:
                  </label>
                  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3 text-xs font-mono text-slate-800 leading-relaxed">
                    {item.specs || "Standard configuration, inspected and ready for operation."}
                  </div>
                </div>

                {/* Details / Description if any */}
                {item.details && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Additional Details:
                    </label>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                )}

                {/* Desk / Department Info */}
                {profile && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span>
                      Desk: <strong>{profile.department || "Sales Desk"}</strong>
                    </span>
                    {profile.email && (
                      <span className="font-mono text-[10px] text-blue-600 truncate max-w-[160px]">
                        {profile.email}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>{copied ? "✓ Copied!" : "📋 Copy Link"}</span>
                  </button>

                  <a
                    href={publicViewerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Open Web Page</span>
                    <span>↗</span>
                  </a>
                </div>

                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(
                      "Inquiry regarding " + (item.title || "Equipment")
                    )}`}
                    className="w-full py-2.5 px-4 bg-[#0052FF] hover:bg-blue-700 text-white text-xs font-bold rounded-xl text-center shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>✉ Direct Inquiry to Desk</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox for Enlarged Photo View */}
      {isLightbox && currentPhoto && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setIsLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white text-xl flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
          <img
            src={currentPhoto}
            alt={item.title || "Enlarged photo"}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
