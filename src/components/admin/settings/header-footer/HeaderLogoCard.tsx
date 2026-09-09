"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { WebsiteSettingsData } from "../types";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function HeaderLogoCard({ settings, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewBg, setPreviewBg] = useState<"light" | "dark">("light");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const logoUrl = settings.headerLogoUrl?.trim() || "/images/logo.webp";
  const logoWidth = settings.headerLogoWidth || 130;
  const logoHeight = settings.headerLogoHeight || 36;
  const showCta = settings.headerShowCta !== false;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, WebP, JPG, SVG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Logo file must be less than 5MB.");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange("headerLogoUrl", data.url);
      } else {
        setUploadError(data.error || "Upload failed. Please try again.");
      }
    } catch {
      setUploadError("Upload network error. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleResetLogoSize = () => {
    onChange("headerLogoWidth", 130);
    onChange("headerLogoHeight", 36);
  };

  const handleResetToDefaultLogo = () => {
    onChange("headerLogoUrl", "/images/logo.webp");
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-5">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
            <span>🎨</span> Header Logo &amp; Dimensions
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Upload your company logo, set an image URL, and adjust width and height in real-time.
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetToDefaultLogo}
          className="text-xs text-[#0052FF] hover:underline font-semibold cursor-pointer"
        >
          ↺ Use Default Logo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Logo Source & Resize Sliders */}
        <div className="flex flex-col gap-4">
          {/* Upload from PC */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Upload New Logo from Computer
            </label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#1E293B] text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <span>💻</span>
                <span>{uploading ? "Uploading..." : "Upload from PC"}</span>
              </button>
              <span className="text-[11px] text-[#64748B]">PNG, WebP, SVG or JPG (Transparent recommended)</span>
            </div>
            {uploadError && (
              <p className="text-xs text-red-600 font-medium mt-1.5">{uploadError}</p>
            )}
          </div>

          {/* Logo URL Input */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Or Enter Logo Image URL / Path
            </label>
            <input
              type="text"
              value={settings.headerLogoUrl || ""}
              placeholder="/images/logo.webp or https://example.com/logo.png"
              onChange={(e) => onChange("headerLogoUrl", e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0052FF]"
            />
          </div>

          {/* Resize Controls */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <span>📐</span> Logo Sizing Controls
              </span>
              <button
                type="button"
                onClick={handleResetLogoSize}
                className="text-[11px] text-[#0052FF] hover:underline font-semibold cursor-pointer"
              >
                ↺ Reset Size (130 × 36)
              </button>
            </div>

            {/* Width Slider & Input */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-[#475569] mb-1">
                <span>Width: <strong className="text-[#0F172A]">{logoWidth}px</strong></span>
                <span className="text-[11px] text-[#94A3B8]">Range: 60px – 360px</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="60"
                  max="360"
                  step="5"
                  value={logoWidth}
                  onChange={(e) => onChange("headerLogoWidth", parseInt(e.target.value, 10))}
                  className="flex-1 accent-[#0052FF] cursor-pointer"
                />
                <input
                  type="number"
                  min="60"
                  max="360"
                  value={logoWidth}
                  onChange={(e) => onChange("headerLogoWidth", Math.max(40, parseInt(e.target.value, 10) || 130))}
                  className="w-16 px-2 py-1 text-xs border border-[#CBD5E1] rounded bg-white text-center font-semibold text-[#0F172A]"
                />
              </div>
            </div>

            {/* Height Slider & Input */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-[#475569] mb-1">
                <span>Height: <strong className="text-[#0F172A]">{logoHeight}px</strong></span>
                <span className="text-[11px] text-[#94A3B8]">Range: 20px – 100px</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="2"
                  value={logoHeight}
                  onChange={(e) => onChange("headerLogoHeight", parseInt(e.target.value, 10))}
                  className="flex-1 accent-[#0052FF] cursor-pointer"
                />
                <input
                  type="number"
                  min="20"
                  max="100"
                  value={logoHeight}
                  onChange={(e) => onChange("headerLogoHeight", Math.max(15, parseInt(e.target.value, 10) || 36))}
                  className="w-16 px-2 py-1 text-xs border border-[#CBD5E1] rounded bg-white text-center font-semibold text-[#0F172A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Visual Preview */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#334155] flex items-center gap-1.5">
              <span>👁️</span> Real-time Navbar Preview
            </span>
            <div className="inline-flex items-center p-0.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setPreviewBg("light")}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  previewBg === "light" ? "bg-white text-[#0F172A] shadow-xs" : "text-[#64748B]"
                }`}
              >
                ☀️ Light Header
              </button>
              <button
                type="button"
                onClick={() => setPreviewBg("dark")}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  previewBg === "dark" ? "bg-[#0B132B] text-white shadow-xs" : "text-[#64748B]"
                }`}
              >
                🌙 Dark Header
              </button>
            </div>
          </div>

          <div
            className={`rounded-lg border p-6 flex flex-col items-center justify-center min-h-[220px] transition-colors ${
              previewBg === "light"
                ? "bg-gray-50 border-gray-200"
                : "bg-[#0B132B] border-slate-700"
            }`}
          >
            {/* Simulated mini navbar */}
            <div
              className={`w-full max-w-md px-4 py-3 rounded-md border flex items-center justify-between shadow-sm ${
                previewBg === "light"
                  ? "bg-white border-gray-200 text-gray-800"
                  : "bg-[#1C2541] border-slate-600 text-white"
              }`}
            >
              <div
                className="flex items-center overflow-hidden"
                style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
              >
                <Image
                  src={logoUrl}
                  alt="Logo Preview"
                  width={logoWidth}
                  height={logoHeight}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] opacity-75 font-medium">
                <span>Home</span>
                <span>•</span>
                <span>Services</span>
                <span>•</span>
                <span>Portfolio</span>
              </div>

              {showCta && (
                <span className="text-[10px] font-bold bg-[#FF6B00] text-white px-2 py-1 rounded">
                  {settings.headerCtaText || "Get Started"}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#64748B]">
              <span className="px-2 py-0.5 bg-white/80 border border-gray-300 rounded text-[#0F172A]">
                Width: <strong>{logoWidth}px</strong>
              </span>
              <span>×</span>
              <span className="px-2 py-0.5 bg-white/80 border border-gray-300 rounded text-[#0F172A]">
                Height: <strong>{logoHeight}px</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
