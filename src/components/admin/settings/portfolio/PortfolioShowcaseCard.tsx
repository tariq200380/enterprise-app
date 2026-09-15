"use client";

import React, { useState, useRef } from "react";
import { PortfolioShowcaseSettings } from "../types";

interface PortfolioShowcaseCardProps {
  showcase: PortfolioShowcaseSettings;
  onChange: (field: keyof PortfolioShowcaseSettings, value: string) => void;
}

export default function PortfolioShowcaseCard({
  showcase,
  onChange,
}: PortfolioShowcaseCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (JPG, PNG, WebP)");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        onChange("showcasePictureUrl", data.url);
        setUploadSuccess("✓ Image successfully uploaded from your computer!");
        setTimeout(() => setUploadSuccess(null), 4000);
      } else {
        setUploadError(data.error || "Failed to upload image from computer.");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError(err?.message || "Error uploading image from computer.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center gap-2">
        <span className="text-sm">🖼️</span>
        <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
          PORTFOLIO ENGINEERING STANDARDS SHOWCASE SECTION
        </h3>
      </div>

      <div className="p-6 flex flex-col gap-5">
        {/* Section Headline */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Headline
          </label>
          <input
            type="text"
            value={showcase.headline}
            onChange={(e) => onChange("headline", e.target.value)}
            placeholder="Built on Rigorous Enterprise Standards"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
          />
        </div>

        {/* Showcase Picture Upload & URL Section */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <label className="text-xs font-bold text-[#0F172A] block">
                Showcase Picture Visual
              </label>
              <span className="text-[11px] text-slate-500">
                Visual image displayed on the engineering culture card on /portfolio
              </span>
            </div>

            <div className="flex gap-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`px-3 py-1 rounded cursor-pointer transition-colors flex items-center gap-1 ${
                  imageMode === "upload"
                    ? "bg-[#0052FF] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>💻</span>
                <span>Upload from PC</span>
              </button>
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`px-3 py-1 rounded cursor-pointer transition-colors flex items-center gap-1 ${
                  imageMode === "url"
                    ? "bg-[#0052FF] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>🔗</span>
                <span>Image URL</span>
              </button>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {imageMode === "upload" ? (
            <div>
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isUploading
                    ? "border-blue-400 bg-blue-50/50 cursor-wait"
                    : "border-blue-300 hover:border-[#0052FF] bg-white hover:bg-blue-50/40"
                }`}
              >
                <span className="text-2xl">{isUploading ? "⏳" : "📁"}</span>
                <span className="font-bold text-[#0052FF] text-xs">
                  {isUploading
                    ? "Uploading image from computer..."
                    : "Click to Choose Image from System (PC)"}
                </span>
                <span className="text-[11px] text-slate-500">
                  Supports JPG, PNG, WebP, SVG (saved directly into /uploads)
                </span>
              </div>

              {uploadError && (
                <div className="mt-2 text-xs text-red-600 font-semibold bg-red-50 p-2 rounded border border-red-200">
                  {uploadError}
                </div>
              )}
              {uploadSuccess && (
                <div className="mt-2 text-xs text-emerald-600 font-semibold bg-emerald-50 p-2 rounded border border-emerald-200">
                  {uploadSuccess}
                </div>
              )}
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={showcase.showcasePictureUrl}
                onChange={(e) => onChange("showcasePictureUrl", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#0052FF] font-mono text-[11px]"
              />
            </div>
          )}

          {/* Live Image Preview */}
          {showcase.showcasePictureUrl && (
            <div className="mt-1 relative h-40 w-full rounded-lg overflow-hidden border border-slate-300 bg-slate-900 group">
              <img
                src={showcase.showcasePictureUrl}
                alt="Showcase Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded">
                Live Showcase Preview
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-white/95 hover:bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded shadow cursor-pointer transition-colors"
              >
                Change Image 🔄
              </button>
            </div>
          )}
        </div>

        {/* Badge Label & Overlay Metric Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={showcase.badgeLabel}
              onChange={(e) => onChange("badgeLabel", e.target.value)}
              placeholder="ENGINEERING CULTURE"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Overlay Metric Title
            </label>
            <input
              type="text"
              value={showcase.overlayMetricTitle}
              onChange={(e) => onChange("overlayMetricTitle", e.target.value)}
              placeholder="100% Principal Engineer Led"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>

        {/* Description Paragraph */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Description Paragraph
          </label>
          <textarea
            rows={3}
            value={showcase.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Every case study in our portfolio is the direct outcome of disciplined architectural principles..."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
