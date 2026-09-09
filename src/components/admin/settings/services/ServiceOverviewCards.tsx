"use client";

import React from "react";
import { ServiceExplorerCardItem } from "../types";

interface Props {
  cards: ServiceExplorerCardItem[];
  onChange: (updatedCards: ServiceExplorerCardItem[]) => void;
}

export default function ServiceOverviewCards({ cards = [], onChange }: Props) {
  const handleCardChange = (index: number, field: keyof ServiceExplorerCardItem, value: string) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddCard = () => {
    const newCard: ServiceExplorerCardItem = {
      badge: "FEATURE",
      title: "New Capability",
      desc: "Detailed description of this engineering capability or benefit.",
    };
    onChange([...cards, newCard]);
  };

  const handleDeleteCard = (index: number) => {
    const updated = cards.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
            🔲
          </span>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">
              Overview Feature &amp; Capability Cards (2x2 Grid)
            </h3>
            <p className="text-xs text-[#64748B]">
              The 4 highlight cards displayed on the overview pane (CUSTOM, SECURE, SCALABLE, MAINTAINABLE).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddCard}
          className="px-3 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
        >
          <span>＋</span>
          <span>Add Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-xs font-bold text-[#0F172A]">
                CARD #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteCard(idx)}
                className="px-2 py-0.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[11px] font-bold rounded cursor-pointer transition-colors"
              >
                ✕ Delete
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
                  Badge Tag <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={card.badge}
                  onChange={(e) => handleCardChange(idx, "badge", e.target.value)}
                  placeholder="CUSTOM"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-bold uppercase text-[#0052FF]"
                />
              </div>

              <div className="sm:col-span-8">
                <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
                  Card Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleCardChange(idx, "title", e.target.value)}
                  placeholder="Business-Focused Solutions"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
                Description Text <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={card.desc}
                onChange={(e) => handleCardChange(idx, "desc", e.target.value)}
                placeholder="Software designed around your workflows operational needs..."
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
