import React from "react";
import Link from "next/link";
import { ORDERED_SUBTABS, type SubTabId } from "../servicesData";

interface Props {
  activeSvcId: string;
  num: string;
  name: string;
  activeSubTab: SubTabId;
  onSelectSubTab: (tab: SubTabId) => void;
  onNavigateSubTab: (dir: "prev" | "next") => void;
  cta: {
    heading: string;
    desc: string;
    btn: string;
    link: string;
  };
}

export default function ServiceSidebar({
  activeSvcId,
  num,
  name,
  activeSubTab,
  onSelectSubTab,
  onNavigateSubTab,
  cta,
}: Props) {
  const activeSubTabIndex = ORDERED_SUBTABS.findIndex((t) => t.id === activeSubTab);

  return (
    <aside className="w-full">
      <div className="relative flex flex-col gap-6 lg:sticky lg:top-[90px]">
        {/* Navigation Card */}
        <div className="bg-white border border-[#D8E2ED] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
          <div
            key={`sb-head-${activeSvcId}`}
            className="pb-4 mb-4 border-b border-[#E2E8F0] animate-header-enter"
          >
            <span className="text-[12px] font-bold text-[#FF6B00] tracking-[0.04em] block mb-1 leading-none">
              {num}
            </span>
            <h3 className="text-[20px] font-bold text-[#0F172A] leading-tight m-0">
              {name}
            </h3>
          </div>

          {/* Mobile Carousel for Subtabs (< md) */}
          <div className="grid grid-cols-[38px_minmax(0,1fr)_38px] gap-2 items-center md:hidden w-full">
            <button
              type="button"
              onClick={() => onNavigateSubTab("prev")}
              aria-label="Previous section"
              disabled={activeSubTabIndex === 0}
              className={`w-[34px] h-[34px] rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,82,255,0.15)] transition-all ${
                activeSubTabIndex === 0
                  ? "invisible pointer-events-none"
                  : "hover:scale-105 active:scale-95 cursor-pointer"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div
              key={`m-tab-${activeSubTab}`}
              className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-3.5 py-2.5 flex items-center justify-center gap-2.5 text-[#0052FF] font-bold text-[16px] animate-header-enter"
            >
              <span className="w-[7px] h-[7px] rounded-full bg-[#FF6B00] shadow-[0_0_0_3px_rgba(255,107,0,0.2)]" />
              <span>{ORDERED_SUBTABS[activeSubTabIndex]?.label}</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigateSubTab("next")}
              aria-label="Next section"
              disabled={activeSubTabIndex === ORDERED_SUBTABS.length - 1}
              className={`w-[34px] h-[34px] rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,82,255,0.15)] transition-all ${
                activeSubTabIndex === ORDERED_SUBTABS.length - 1
                  ? "invisible pointer-events-none"
                  : "hover:scale-105 active:scale-95 cursor-pointer"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Desktop Subsection Buttons Menu (>= md) */}
          <div
            className="hidden md:flex flex-col gap-2 w-full"
            role="tablist"
            aria-label="Service Sections"
          >
            {ORDERED_SUBTABS.map((subTab) => {
              const isTabActive = subTab.id === activeSubTab;
              return (
                <button
                  key={subTab.id}
                  type="button"
                  onClick={() => onSelectSubTab(subTab.id)}
                  role="tab"
                  aria-selected={isTabActive}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border transition-all duration-200 text-left text-[16px] leading-none cursor-pointer active:scale-[0.98] ${
                    isTabActive
                      ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#0052FF] font-bold shadow-xs"
                      : "bg-transparent border-transparent text-[#334155] font-semibold hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  }`}
                >
                  <span
                    className={`w-[7px] h-[7px] rounded-full shrink-0 transition-all duration-200 ${
                      isTabActive
                        ? "bg-[#FF6B00] shadow-[0_0_0_3px_rgba(255,107,0,0.2)]"
                        : "bg-[#CBD5E1]"
                    }`}
                  />
                  <span>{subTab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Start Project Card (Hidden on mobile < md) */}
        <div
          key={`sb-cta-${activeSvcId}`}
          className="hidden md:block bg-white border border-[#D8E2ED] rounded-[14px] p-6 shadow-[0_2px_10px_rgba(15,23,42,0.03)] animate-header-enter"
        >
          <h4 className="text-[18px] font-bold text-[#0F172A] mb-2 leading-snug">
            {cta.heading}
          </h4>
          <p className="text-[15px] text-[#475569] mb-4 leading-relaxed font-normal">
            {cta.desc}
          </p>
          <Link
            href={cta.link || "/contact"}
            className="w-full h-12 px-5 bg-[#0052FF] hover:bg-[#0043D6] text-white font-semibold text-[16px] rounded-lg inline-flex items-center justify-center gap-1.5 shadow-[0_2px_6px_rgba(0,82,255,0.2)] hover:-translate-y-[2px] transition-all"
          >
            <span>{cta.btn}</span>
            <span className="text-[#FF6B00] font-extrabold ml-1.5">&rarr;</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
