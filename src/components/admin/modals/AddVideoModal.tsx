"use client";

import React, { useState } from "react";
import { VideoItem } from "@/types/admin";

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoCreated: (video: VideoItem) => void;
  showToast: (msg: string) => void;
}

export default function AddVideoModal({ isOpen, onClose, onVideoCreated, showToast }: AddVideoModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cloud Engineering");
  const [duration, setDuration] = useState("15:00");
  const [embedUrl, setEmbedUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [thumbnailUrl, setThumbnailUrl] = useState("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    try {
      setSaving(true);
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          duration,
          embed_url: embedUrl,
          thumbnail_url: thumbnailUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onVideoCreated(data.video);
        setTitle("");
        onClose();
        showToast("✓ Video added to Knowledge Library!");
      }
    } catch {
      showToast("Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-md w-full p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>
        <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">MEDIA CMS</span>
        <h3 className="text-base font-bold text-[#0F172A] mb-4">Add Video to Knowledge Library</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Video Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus in Cloud Environments"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#FF6B00]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Embed URL (YouTube / Vimeo) *</label>
            <input
              type="url"
              required
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#FF6B00]"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Thumbnail Image URL</label>
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded cursor-pointer shadow"
            >
              {saving ? "Saving..." : "Save Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
