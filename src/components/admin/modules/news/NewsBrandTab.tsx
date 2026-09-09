"use client";

import React from "react";
import { StoryItem, PROVIDER_COLORS } from "./types";

interface NewsBrandTabProps {
  brandWires: Record<string, StoryItem>;
  creatingDraftId: string | null;
  onCreateKnowledgeDraft: (story: StoryItem) => void;
  onOpenEdit: (section: "brand", id: string, story: StoryItem) => void;
}

export default function NewsBrandTab({
  brandWires,
  creatingDraftId,
  onCreateKnowledgeDraft,
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
        const pColor = PROVIDER_COLORS[bKey.toLowerCase()] || "#0052FF";
        const imgSrc = wire.img || "/uploads/live_news/apple_iphone16_hero.jpg";

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
                    (e.currentTarget as HTMLImageElement).src = "/uploads/live_news/apple_iphone16_hero.jpg";
                  }}
                />
                <span
                  className="absolute top-2.5 left-2.5 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase shadow-sm"
                  style={{ backgroundColor: pColor }}
                >
                  {wire.providerLabel || wire.tag || bKey.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1.5">
                <span className="font-bold text-[#059669]">● {wire.date}</span>
                <span>•</span>
                <span className="font-semibold">{wire.source}</span>
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
                  disabled={creatingDraftId === (wire.title || bKey)}
                  onClick={() => onCreateKnowledgeDraft(wire)}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold rounded shadow-xs cursor-pointer transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  <span>📝</span>
                  <span>
                    {creatingDraftId === (wire.title || bKey) ? "Drafting..." : "+ Knowledge Draft"}
                  </span>
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
