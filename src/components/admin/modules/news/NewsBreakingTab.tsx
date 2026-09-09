"use client";

import React from "react";
import { StoryItem, PROVIDER_COLORS } from "./types";

interface NewsBreakingTabProps {
  breakingStories: StoryItem[];
  creatingDraftId: string | null;
  onPinStory: (index: number) => void;
  onCreateKnowledgeDraft: (story: StoryItem) => void;
  onOpenEdit: (section: "breaking", id: string, story: StoryItem) => void;
}

export default function NewsBreakingTab({
  breakingStories,
  creatingDraftId,
  onPinStory,
  onCreateKnowledgeDraft,
  onOpenEdit,
}: NewsBreakingTabProps) {
  if (breakingStories.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-xs">
        No breaking stories found in active cache.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {breakingStories.map((story, idx) => {
        const pColor = PROVIDER_COLORS[story.provider.toLowerCase()] || "#0052FF";
        const storyId = story.external_id || story.id || story.provider;
        const imgSrc = story.img || "/uploads/live_news/apple_iphone16_hero.jpg";

        return (
          <div
            key={storyId + idx}
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col md:flex-row gap-5 items-start hover:border-[#CBD5E1] transition-all"
          >
            {/* Visual Thumbnail */}
            <div className="w-full md:w-[220px] aspect-[16/9] bg-[#0B1120] rounded-lg overflow-hidden shrink-0 relative group">
              <img
                src={imgSrc}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/uploads/live_news/apple_iphone16_hero.jpg";
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
                  {idx === 0 && (
                    <span className="bg-[#EF4444] text-white text-[9px] font-extrabold px-2 py-0.2 rounded-full uppercase tracking-wider">
                      PINNED TOP STORY
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
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => onPinStory(idx)}
                      className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-xs font-bold rounded cursor-pointer transition-colors"
                    >
                      📌 Pin to Top
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={creatingDraftId === (story.title || storyId)}
                    onClick={() => onCreateKnowledgeDraft(story)}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold rounded shadow-xs cursor-pointer transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <span>📝</span>
                    <span>
                      {creatingDraftId === (story.title || storyId) ? "Drafting..." : "+ Knowledge Draft"}
                    </span>
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
  );
}
