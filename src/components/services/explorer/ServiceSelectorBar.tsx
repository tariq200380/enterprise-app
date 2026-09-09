import React from "react";
import ServiceSelectorIcon from "./ServiceSelectorIcon";

interface ServiceItemSummary {
  id: string;
  num: string;
  name: string;
}

interface Props {
  availableServices: ServiceItemSummary[];
  activeSvcId: string;
  activeSvcIndex: number;
  activeSvcNum: string;
  activeSvcName: string;
  onSelectService: (id: string) => void;
  onNavigateService: (dir: "prev" | "next") => void;
}

export default function ServiceSelectorBar({
  availableServices,
  activeSvcId,
  activeSvcIndex,
  activeSvcNum,
  activeSvcName,
  onSelectService,
  onNavigateService,
}: Props) {
  return (
    <div className="relative w-full mb-8">
      {/* Mobile 1-Item Carousel Layout (< md) */}
      <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] gap-2 items-center md:hidden w-full">
        {/* Mobile Left Arrow */}
        <button
          type="button"
          onClick={() => onNavigateService("prev")}
          aria-label="Previous service"
          disabled={activeSvcIndex === 0}
          className={`w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_4px_14px_rgba(15,23,42,0.15)] transition-all ${
            activeSvcIndex === 0
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
            className="w-5 h-5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Mobile Active Service Card Display */}
        <div
          key={`m-${activeSvcId}`}
          className="relative bg-white border-2 border-[#0052FF] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2.5 shadow-[0_10px_24px_-4px_rgba(0,82,255,0.22)] h-[160px] animate-header-enter"
        >
          <div className="absolute top-0 left-[18%] right-[18%] h-[3.5px] rounded-b-[4px] bg-[#FF6B00]" />
          <div className="w-[46px] h-[46px] rounded-xl bg-[#0052FF] text-white flex items-center justify-center shadow-sm">
            <ServiceSelectorIcon id={activeSvcId} />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[12px] font-bold text-[#FF6B00] tracking-[0.04em] leading-none mb-1">
              {activeSvcNum}
            </span>
            <span className="text-[16px] font-bold text-[#0052FF] leading-snug">
              {activeSvcName}
            </span>
          </div>
        </div>

        {/* Mobile Right Arrow */}
        <button
          type="button"
          onClick={() => onNavigateService("next")}
          aria-label="Next service"
          disabled={activeSvcIndex === availableServices.length - 1}
          className={`w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_4px_14px_rgba(15,23,42,0.15)] transition-all ${
            activeSvcIndex === availableServices.length - 1
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
            className="w-5 h-5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Desktop & Tablet Column Grid (>= md) */}
      <div
        className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-3 w-full"
        role="tablist"
        aria-label="Services"
      >
        {availableServices.map((serviceItem) => {
          const id = serviceItem.id;
          const isActive = id === activeSvcId;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectService(id)}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`group relative bg-white rounded-xl py-3 px-2 flex flex-col items-center text-center gap-1.5 cursor-pointer outline-none transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? "border-2 border-[#0052FF] shadow-[0_12px_28px_-4px_rgba(0,82,255,0.25)] -translate-y-1.5"
                  : "border border-[#D8E2ED] shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:-translate-y-1 hover:border-[#0052FF] hover:shadow-[0_10px_24px_-4px_rgba(15,23,42,0.1)]"
              }`}
            >
              {/* Top Bar Accent */}
              <div
                className={`absolute top-0 left-[18%] right-[18%] h-[3.5px] rounded-b-[4px] transition-all duration-300 ${
                  isActive
                    ? "bg-[#FF6B00] opacity-100 scale-x-100"
                    : "bg-transparent opacity-0 scale-x-50"
                }`}
              />

              {/* Icon Box */}
              <div
                className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-[#0052FF] border border-[#0052FF] text-white shadow-sm scale-105"
                    : "bg-[#FFF3EB] border border-[#FFE4D3] text-[#FF6B00] group-hover:border-[#FFB787] group-hover:scale-105"
                }`}
              >
                <ServiceSelectorIcon id={id} />
              </div>

              {/* Step & Title */}
              <div className="flex flex-col items-center">
                <span className="text-[12px] font-bold text-[#FF6B00] tracking-[0.04em] leading-none mb-0.5">
                  {serviceItem.num}
                </span>
                <span
                  className={`text-[13px] leading-tight transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[#0052FF]"
                      : "font-semibold text-[#0F172A] group-hover:text-[#0052FF]"
                  }`}
                >
                  {serviceItem.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
