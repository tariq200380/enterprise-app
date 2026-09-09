"use client";

import React, { useState, useRef } from "react";
import { PortfolioItem } from "@/types/admin";

interface AddPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPortfolioCreated: (project: PortfolioItem) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
}

export default function AddPortfolioModal({
  isOpen,
  onClose,
  onPortfolioCreated,
  showToast,
}: AddPortfolioModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("CLOUD & ENTERPRISE");
  const [client, setClient] = useState("Global Enterprise");
  const [summary, setSummary] = useState("");
  const [stack, setStack] = useState("Next.js, PostgreSQL, Docker, Kubernetes");
  const [liveUrl, setLiveUrl] = useState("https://creedtech.com");
  const [githubUrl, setGithubUrl] = useState("https://github.com/creed-tech");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image format
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file (JPG, PNG, WebP)", "error");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        setImageUrl(data.url);
        showToast("✓ Image uploaded successfully from system!");
      } else {
        showToast("Failed to upload image from system", "error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast("Failed to upload image from system", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    try {
      setSaving(true);
      const stackArr = stack.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          client,
          summary: summary || "High-performance enterprise cloud delivery.",
          stack: stackArr,
          live_url: liveUrl,
          github_url: githubUrl,
          image_url: imageUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onPortfolioCreated(data.project);
        setTitle("");
        setSummary("");
        setImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop");
        onClose();
        showToast("✓ Portfolio project published!");
      }
    } catch {
      showToast("Failed to create portfolio project", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111827] rounded-2xl border border-gray-200 max-w-lg w-full p-6 shadow-2xl relative text-left my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
        >
          ✕
        </button>
        <span className="text-[10px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">
          PORTFOLIO CMS
        </span>
        <h3 className="text-base font-bold text-[#0F172A] mb-4">Add Portfolio Case Study</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          {/* Image Upload from System Section */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-[#0F172A] text-xs">
                Project Cover Visual *
              </label>
              <div className="flex gap-2 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    imageMode === "upload"
                      ? "bg-[#0052FF] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  💻 Upload from PC
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    imageMode === "url"
                      ? "bg-[#0052FF] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  🔗 Image URL
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
              <div className="flex flex-col gap-2">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-blue-300 hover:border-[#0052FF] bg-white hover:bg-blue-50/40 rounded-lg p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5"
                >
                  <span className="text-2xl">📁</span>
                  <span className="font-bold text-[#0052FF]">
                    {isUploading ? "Uploading from PC..." : "Click to Choose Image from System (PC)"}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Supports JPG, PNG, WebP, GIF (High Resolution)
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none font-mono text-[11px] focus:border-[#0052FF]"
                />
              </div>
            )}

            {/* Live Image Preview */}
            {imageUrl && (
              <div className="mt-3 relative h-36 w-full rounded-lg overflow-hidden border border-slate-300 bg-slate-900 group">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Cover Preview
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded shadow cursor-pointer"
                >
                  Change Image 🔄
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Project Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Core Banking Hub"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0052FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. CLOUD & ENTERPRISE"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0052FF]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Client Name</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Swiss MedTech Consortium"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0052FF]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              placeholder="Next.js, PostgreSQL, Docker, Kubernetes"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0052FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Live Demo / Site URL</label>
              <input
                type="text"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://creedtech.com/portfolio/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0052FF]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">GitHub Repository URL</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/creed-tech/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0052FF]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Project Summary</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Executive architectural delivery summary..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0052FF]"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || isUploading}
              className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white font-bold rounded-lg cursor-pointer shadow text-xs transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : isUploading ? "Uploading Image..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
