"use client";

import React from "react";
import { StoryItem, PROVIDER_COLORS } from "./types";

const BRAND_FALLBACK_IMAGES: Record<string, string> = {
  apple: "https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg",
  openai: "https://images.ctfassets.net/kftzwdyauwt9/11yqmSO7D1dfYveBnOdmJt/e451277f37f82f51d6d20f2b86826590/advisory-group-on-mathematics-and-artificial-intelligence-seo.png?w=1600&h=900&fit=fill",
  microsoft: "https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-Hero-FINAL-9_17-1024x683.jpg",
  nvidia: "https://blogs.nvidia.com/wp-content/uploads/2026/09/end-to-end-press-dsx-ready-kv-1920x1080-1.png",
  google: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/28525___EDNA_Blog_header_01.max-600x600.format-webp.webp",
  meta: "https://about.fb.com/wp-content/uploads/2026/09/Announcing-Petal-a-First-of-its-Kind-Transoceanic-Subsea-Cable_Header.jpg",
  anthropic: "/uploads/live_news/anthropic_fable_mythos_hero.jpg",
  intel: "/uploads/live_news/intel_ai_infra_summit_2026.jpg",
};

interface NewsBrandTabProps {
  brandWires: Record<string, StoryItem>;
  savedTitles: Set<string>;
  savingStoryId: string | null;
  onSaveNews: (story: StoryItem) => void;
  onOpenEdit: (section: "brand", id: string, story: StoryItem) => void;
}

export default function NewsBrandTab({
  brandWires,
  savedTitles,
  savingStoryId,
  onSaveNews,
  onOpenEdit,
}: NewsBrandTabProps) {
  const entries = Object.entries(brandWires);

  if (entries.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-xs">
        No brand wires found in active cache.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {entries.map(([bKey, wire]) => {
        const pKey = bKey.toLowerCase();
        const pColor = PROVIDER_COLORS[pKey] || "#0052FF";
        const fallback = BRAND_FALLBACK_IMAGES[pKey] || "/uploads/live_news/openai_gpt4o_official.png";
        const raw = (wire.img || wire.image || fallback).trim().replace(/&amp;/g, "&");
        const imgSrc = raw || fallback;
        const isSaved = savedTitles.has((wire.title || "").trim().toLowerCase());
        const isSaving = savingStoryId === wire.title;

        return (
          <div
            key={bKey}
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-[#CBD5E1] transition-all"
          >
            <div>
              {/* Image */}
              <div className="w-full aspect-[16/9] bg-[#0B1120] rounded-lg overflow-hidden mb-4 relative group">
                <img
                  src={imgSrc}
                  alt={wire.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallback;
                  }}
                />
                <span
                  className="absolute top-2.5 left-2.5 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase shadow-sm"
                  style={{ backgroundColor: pColor }}
                >
                  {wire.providerLabel || wire.tag || bKey.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1.5 flex-wrap">
                <span className="font-bold text-[#059669]">● {wire.date}</span>
                <span>•</span>
                <span className="font-semibold">{wire.source}</span>
                {isSaved && (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold px-2 py-0.2 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <span>✓</span>
                    <span>Saved in Database</span>
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] leading-snug mb-2">
                {wire.title}
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-4">
                {wire.desc || wire.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
              <a
                href={wire.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#0052FF] hover:underline"
              >
                Read Original ↗
              </a>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isSaved || isSaving}
                  onClick={() => onSaveNews(wire)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded shadow-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    isSaved
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-300 opacity-90 cursor-default"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95"
                  }`}
                >
                  <span>{isSaved ? "✓" : isSaving ? "⏳" : "💾"}</span>
                  <span>{isSaved ? "Saved in DB" : isSaving ? "Saving..." : "Save News"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenEdit("brand", bKey, wire)}
                  className="px-3.5 py-1.5 bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs font-bold rounded shadow-xs cursor-pointer transition-colors"
                >
                  ✏️ Edit Story
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
