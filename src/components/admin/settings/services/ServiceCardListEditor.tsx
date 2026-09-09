"use client";

import React from "react";
import { ServiceExplorerCardItem } from "../types";

interface Props {
  title: string;
  description: string;
  icon?: string;
  items: ServiceExplorerCardItem[];
  showBadge?: boolean;
  showStep?: boolean;
  sectionHeading?: string;
  sectionDesc?: string;
  onHeadingChange?: (heading: string, desc: string) => void;
  onChange: (updatedItems: ServiceExplorerCardItem[]) => void;
}

export default function ServiceCardListEditor({
  title,
  description,
  icon = "🔲",
  items = [],
  showBadge = false,
  showStep = false,
  sectionHeading,
  sectionDesc,
  onHeadingChange,
  onChange,
}: Props) {
  const handleItemChange = (index: number, field: keyof ServiceExplorerCardItem, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddItem = () => {
    const newItem: ServiceExplorerCardItem = {
      title: "New Item Title",
      desc: "Detailed description for this item.",
      ...(showBadge ? { badge: "FEATURE" } : {}),
      ...(showStep ? { step: `0${items.length + 1}` } : {}),
    };
    onChange([...items, newItem]);
  };

  const handleDeleteItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
            {icon}
          </span>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">{title}</h3>
            <p className="text-xs text-[#64748B]">{description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="px-3 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
        >
          <span>＋</span>
          <span>Add Item</span>
        </button>
      </div>

      {/* Optional Subheading and Section Description */}
      {onHeadingChange && (
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3.5 flex flex-col gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
              Sub-tab Title Heading
            </label>
            <input
              type="text"
              value={sectionHeading || ""}
              onChange={(e) => onHeadingChange(e.target.value, sectionDesc || "")}
              placeholder="Section heading displayed when this tab is selected..."
              className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
              Sub-tab Description Paragraph
            </label>
            <textarea
              rows={2}
              value={sectionDesc || ""}
              onChange={(e) => onHeadingChange(sectionHeading || "", e.target.value)}
              placeholder="Section description paragraph..."
              className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
            />
          </div>
        </div>
      )}

      {/* Dynamic Items Grid */}
      {items.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
          <p className="text-xs text-[#64748B] mb-2">No items added to this section yet.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-3 py-1 bg-[#EFF6FF] text-[#0052FF] hover:bg-[#DBEAFE] text-xs font-bold rounded cursor-pointer"
          >
            ＋ Add First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-xs font-bold text-[#0F172A]">
                  ITEM #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(idx)}
                  className="px-2 py-0.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[11px] font-bold rounded cursor-pointer transition-colors"
                >
                  ✕ Delete
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {showBadge && (
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
                      Badge Tag
                    </label>
                    <input
                      type="text"
                      value={item.badge || ""}
                      onChange={(e) => handleItemChange(idx, "badge", e.target.value)}
                      placeholder="CUSTOM"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-bold uppercase text-[#0052FF]"
                    />
                  </div>
                )}

                {showStep && (
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
                      Step #
                    </label>
                    <input
                      type="text"
                      value={item.step || `0${idx + 1}`}
                      onChange={(e) => handleItemChange(idx, "step", e.target.value)}
                      placeholder="01"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-bold text-[#FF6B00]"
                    />
                  </div>
                )}

                <div className={showBadge ? "sm:col-span-8" : showStep ? "sm:col-span-9" : "sm:col-span-12"}>
                  <label className="block text-[11px] font-semibold text-[#334155] mb-0.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(idx, "title", e.target.value)}
                    placeholder="Item Title"
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
                  value={item.desc}
                  onChange={(e) => handleItemChange(idx, "desc", e.target.value)}
                  placeholder="Detailed description..."
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
