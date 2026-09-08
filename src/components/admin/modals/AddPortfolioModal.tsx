"use client";

import React, { useState } from "react";
import { PortfolioItem } from "@/types/admin";

interface AddPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPortfolioCreated: (project: PortfolioItem) => void;
  showToast: (msg: string) => void;
}

export default function AddPortfolioModal({ isOpen, onClose, onPortfolioCreated, showToast }: AddPortfolioModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("CLOUD & ENTERPRISE");
  const [client, setClient] = useState("Global Enterprise");
  const [summary, setSummary] = useState("");
  const [stack, setStack] = useState("Next.js, PostgreSQL, Docker, Kubernetes");
  const [liveUrl, setLiveUrl] = useState("https://creedtech.com");
  const [githubUrl, setGithubUrl] = useState("https://github.com/creed-tech");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

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
        onClose();
        showToast("✓ Portfolio project published!");
      }
    } catch {
      showToast("Failed to create portfolio project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-lg w-full p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>
        <span className="text-[10px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">PORTFOLIO CMS</span>
        <h3 className="text-base font-bold text-[#0F172A] mb-4">Add Portfolio Case Study</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Project Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Core Banking Hub"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#0052FF]"
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
              <label className="block font-semibold mb-1">Client Name</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Project Summary</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Executive architectural delivery summary..."
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
              className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white font-bold rounded cursor-pointer shadow"
            >
              {saving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
