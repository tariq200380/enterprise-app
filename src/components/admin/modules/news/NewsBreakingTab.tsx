"use client";

import React, { useState } from "react";
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

interface NewsBreakingTabProps {
  breakingStories: StoryItem[];
  savedTitles: Set<string>;
  savingStoryId: string | null;
  onPinStory: (index: number) => void;
  onSaveNews: (story: StoryItem) => void;
  onOpenEdit: (section: "breaking", id: string, story: StoryItem) => void;
}

export default function NewsBreakingTab({
  breakingStories,
  savedTitles,
  savingStoryId,
  onPinStory,
  onSaveNews,
  onOpenEdit,
}: NewsBreakingTabProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  if (breakingStories.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-xs">
        No breaking stories found in active cache.
      </div>
    );
  }

  const totalPages = Math.ceil(breakingStories.length / pageSize);
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleStories = breakingStories.slice(startIndex, startIndex + pageSize);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Pagination Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-1 text-xs text-[#64748B]">
        <span className="font-medium">
          Showing <strong className="text-[#0F172A]">{startIndex + 1}</strong>–
          <strong className="text-[#0F172A]">{Math.min(startIndex + pageSize, breakingStories.length)}</strong> of{" "}
          <strong className="text-[#0F172A]">{breakingStories.length}</strong> total verified dispatches
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded text-xs font-semibold text-[#334155] disabled:opacity-40 hover:bg-[#F8FAFC] cursor-pointer"
            >
              ← Prev
            </button>
            <span className="px-2 font-bold text-[#0F172A]">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded text-xs font-semibold text-[#334155] disabled:opacity-40 hover:bg-[#F8FAFC] cursor-pointer"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {visibleStories.map((story, localIdx) => {
          const globalIdx = startIndex + localIdx;
          const pKey = (story.provider || "google").toLowerCase();
          const pColor = PROVIDER_COLORS[pKey] || "#0052FF";
          const storyId = story.external_id || story.id || story.provider;
          const fallback = BRAND_FALLBACK_IMAGES[pKey] || "/uploads/live_news/apple_iphone16_hero.jpg";
          const raw = (story.img || story.image || fallback).trim().replace(/&amp;/g, "&");
          const imgSrc = raw || fallback;
          const isSaved = savedTitles.has((story.title || "").trim().toLowerCase());
          const isSaving = savingStoryId === story.title;

          return (
            <div
              key={storyId + "-" + globalIdx}
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col md:flex-row gap-5 items-start hover:border-[#CBD5E1] transition-all"
            >
              {/* Visual Thumbnail */}
              <div className="w-full md:w-[220px] aspect-[16/9] bg-[#0B1120] rounded-lg overflow-hidden shrink-0 relative group">
                <img
                  src={imgSrc}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallback;
                  }}
                />
                <span
                  className="absolute top-2 left-2 text-white text-[9.5px] font-extrabold px-2 py-0.5 rounded uppercase shadow-sm"
                  style={{ backgroundColor: pColor }}
                >
                  {story.tag || story.provider.toUpperCase()}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-[#64748B] mb-1.5">
                    <span className="font-bold text-[#059669]">● {story.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#334155]">{story.source}</span>
                    {globalIdx === 0 && (
                      <span className="bg-[#EF4444] text-white text-[9px] font-extrabold px-2 py-0.2 rounded-full uppercase tracking-wider">
                        PINNED TOP STORY
                      </span>
                    )}
                    {isSaved && (
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold px-2 py-0.2 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <span>✓</span>
                        <span>Saved in Database</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] leading-snug mb-1.5">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed line-clamp-2">
                    {story.desc}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between flex-wrap gap-2 mt-4 pt-3 border-t border-[#F1F5F9]">
                  <a
                    href={story.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#0052FF] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Source Article ↗</span>
                  </a>

                  <div className="flex items-center gap-2">
                    {globalIdx !== 0 && (
                      <button
                        type="button"
                        onClick={() => onPinStory(globalIdx)}
                        className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-xs font-bold rounded cursor-pointer transition-colors"
                      >
                        📌 Pin to Top
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={isSaved || isSaving}
                      onClick={() => onSaveNews(story)}
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
                      onClick={() => onOpenEdit("breaking", storyId, story)}
                      className="px-4 py-1.5 bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs font-bold rounded shadow-xs cursor-pointer transition-colors flex items-center gap-1"
                    >
                      <span>✏️ Edit Story</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-3">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-xs font-bold text-[#334155] disabled:opacity-40 hover:bg-[#F8FAFC] cursor-pointer"
          >
            ← Previous Page
          </button>
          <span className="text-xs text-[#64748B] font-medium px-2">
            Page <strong className="text-[#0F172A]">{safePage}</strong> of {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-xs font-bold text-[#334155] disabled:opacity-40 hover:bg-[#F8FAFC] cursor-pointer"
          >
            Next Page →
          </button>
        </div>
      )}
    </div>
  );
}
