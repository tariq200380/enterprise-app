"use client";

import React from "react";
import { StoryItem } from "./types";

interface NewsRegionalTabProps {
  regionalWires: Record<string, StoryItem>;
  creatingDraftId: string | null;
  onCreateKnowledgeDraft: (story: StoryItem) => void;
  onOpenEdit: (section: "regional", id: string, story: StoryItem) => void;
}

export default function NewsRegionalTab({
  regionalWires,
  creatingDraftId,
  onCreateKnowledgeDraft,
  onOpenEdit,
}: NewsRegionalTabProps) {
  const entries = Object.entries(regionalWires);

  if (entries.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-xs">
        No regional Pakistani wires found in active cache.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {entries.map(([rKey, wire]) => {
        const imgSrc = wire.image || wire.img || "/uploads/live_news/dawn_duo.webp";

        return (
          <div
            key={rKey}
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
                    (e.currentTarget as HTMLImageElement).src = "/uploads/live_news/dawn_duo.webp";
                  }}
                />
                <span className="absolute top-2.5 left-2.5 bg-[#059669] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase shadow-sm">
                  {wire.brandBadge || wire.category || rKey.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1.5">
                <span className="font-bold text-[#059669]">● {wire.date}</span>
                <span>•</span>
                <span className="font-semibold">{wire.sourceName}</span>
              </div>
              <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] leading-snug mb-2">
                {wire.title}
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-4">
                {wire.summary || wire.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
              <a
                href={wire.sourceUrl || wire.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#059669] hover:underline"
              >
                Read Original ↗
              </a>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={creatingDraftId === (wire.title || rKey)}
                  onClick={() => onCreateKnowledgeDraft(wire)}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold rounded shadow-xs cursor-pointer transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  <span>📝</span>
                  <span>
                    {creatingDraftId === (wire.title || rKey) ? "Drafting..." : "+ Knowledge Draft"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenEdit("regional", rKey, wire)}
                  className="px-3.5 py-1.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded shadow-xs cursor-pointer transition-colors"
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
