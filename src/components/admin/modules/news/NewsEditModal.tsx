"use client";

import React, { useState, useRef } from "react";
import { StoryItem, GalleryImage } from "./types";

interface NewsEditModalProps {
  editingStory: {
    section: "breaking" | "brand" | "regional";
    id: string;
    item: StoryItem;
  };
  galleryImages: GalleryImage[];
  onClose: () => void;
  onSave: (
    section: "breaking" | "brand" | "regional",
    id: string,
    updatedFields: Partial<StoryItem>
  ) => Promise<void>;
  showToast: (msg: string) => void;
}

export default function NewsEditModal({
  editingStory,
  galleryImages,
  onClose,
  onSave,
  showToast,
}: NewsEditModalProps) {
  const item = editingStory.item;

  const [formTitle, setFormTitle] = useState(item.title || "");
  const [formDesc, setFormDesc] = useState(item.desc || item.summary || "");
  const [formSource, setFormSource] = useState(item.source || item.sourceName || "");
  const [formTag, setFormTag] = useState(item.tag || item.brandBadge || item.category || "");
  const [formLink, setFormLink] = useState(item.link || item.sourceUrl || "");
  const [formImage, setFormImage] = useState(item.img || item.image || "");
  const [formDate, setFormDate] = useState(item.date || "Just Now");

  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/news/gallery", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormImage(data.url);
        showToast("✓ Image uploaded from system!");
      } else {
        showToast(data.error || "Failed to upload image");
      }
    } catch (err: any) {
      showToast(err.message || "Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast("Headline cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);
      const updatedFields: Partial<StoryItem> = {
        title: formTitle.trim(),
        desc: formDesc.trim(),
        summary: formDesc.trim(),
        source: formSource.trim(),
        sourceName: formSource.trim(),
        tag: formTag.trim(),
        category: formTag.trim(),
        brandBadge: formTag.trim(),
        link: formLink.trim(),
        sourceUrl: formLink.trim(),
        img: formImage.trim(),
        image: formImage.trim(),
        date: formDate.trim(),
      };

      await onSave(editingStory.section, editingStory.id, updatedFields);
      onClose();
    } catch {
      // error handled in caller
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#E2E8F0] my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0F172A] m-0">Edit News Wire Story</h3>
            <span className="text-xs text-[#64748B]">
              Section: <strong className="uppercase text-[#0052FF]">{editingStory.section}</strong> • ID: {editingStory.id}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Headline */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Story Headline / Title *
              </label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-xs sm:text-sm font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                placeholder="Enter story headline..."
              />
            </div>

            {/* Summary / Description */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Story Summary / Excerpt *
              </label>
              <textarea
                rows={3}
                required
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-xs sm:text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                placeholder="Enter brief description or summary..."
              />
            </div>

            {/* 2-Column Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Category Tag / Badge
                </label>
                <input
                  type="text"
                  value={formTag}
                  onChange={(e) => setFormTag(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  placeholder="e.g. HARDWARE & AI"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Publication Date / Timestamp
                </label>
                <input
                  type="text"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  placeholder="e.g. September 10, 2026 (Live Wire)"
                />
              </div>
            </div>

            {/* Source & Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Source Outlet Name
                </label>
                <input
                  type="text"
                  value={formSource}
                  onChange={(e) => setFormSource(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  placeholder="e.g. Apple Newsroom, Dawn Sci-Tech"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Canonical Article URL (Link)
                </label>
                <input
                  type="text"
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Image Selection Section */}
            <div className="pt-3 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#0F172A]">
                  Story Visual Asset (Picture / Screenshot)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGalleryPicker(!showGalleryPicker)}
                    className="text-xs font-bold text-[#0052FF] hover:underline cursor-pointer"
                  >
                    {showGalleryPicker ? "Hide Gallery" : "Choose from Gallery 🖼️"}
                  </button>
                  <span className="text-gray-300">•</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-xs font-bold text-[#059669] hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Upload from Computer 📁"}
                  </button>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Direct image input */}
              <div className="mb-3">
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] font-mono focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  placeholder="/uploads/live_news/... or https://..."
                />
              </div>

              {/* Image Live Preview */}
              <div className="relative w-full aspect-[16/9] max-h-[220px] bg-[#0B1120] rounded-lg overflow-hidden border border-[#CBD5E1] flex items-center justify-center">
                {formImage ? (
                  <img
                    src={formImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/uploads/live_news/apple_iphone16_hero.jpg";
                    }}
                  />
                ) : (
                  <span className="text-xs text-[#94A3B8]">No image selected</span>
                )}
                <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  PREVIEW 16:9
                </span>
              </div>

              {/* Gallery Picker Grid */}
              {showGalleryPicker && (
                <div className="mt-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <span className="text-xs font-bold text-[#475569] block mb-2">
                    Click any verified image or screenshot to select it:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[200px] overflow-y-auto pr-1">
                    {galleryImages.map((img) => (
                      <button
                        key={img.filename}
                        type="button"
                        onClick={() => {
                          setFormImage(img.url);
                          setShowGalleryPicker(false);
                        }}
                        className={`aspect-[16/9] rounded-md overflow-hidden border-2 cursor-pointer transition-all relative group bg-[#0F172A] ${
                          formImage === img.url
                            ? "border-[#0052FF] scale-95"
                            : "border-transparent hover:border-[#94A3B8]"
                        }`}
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        <span className="absolute inset-x-0 bottom-0 bg-black/80 text-[8.5px] text-white p-1 truncate block text-left">
                          {img.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 bg-white border border-[#CBD5E1] text-[#475569] hover:bg-[#F1F5F9] text-xs font-bold rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>{isSaving ? "Saving..." : "Save Story Changes"}</span>
              {!isSaving && <span>✓</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
