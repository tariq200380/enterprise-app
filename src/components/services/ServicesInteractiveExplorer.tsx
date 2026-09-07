"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ORDERED_SVCS,
  ORDERED_SUBTABS,
  SVCS,
  TECH_ICONS,
  type ServiceId,
  type SubTabId,
} from "./servicesData";

// Vector icons for the 8 top service selector cards
function ServiceSelectorIcon({ id }: { id: ServiceId }) {
  switch (id) {
    case "software-development":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "ui-ux-design":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case "mobile-application":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case "cloud-infrastructure":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "database-management":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "web-development":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "ai-automation":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "digital-growth":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
  }
}

export default function ServicesInteractiveExplorer() {
  const [activeSvcId, setActiveSvcId] = useState<ServiceId>("software-development");
  const [displayedSvcId, setDisplayedSvcId] = useState<ServiceId>("software-development");
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>("overview");
  const [displayedSubTab, setDisplayedSubTab] = useState<SubTabId>("overview");
  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with URL Hash on Mount and PopState
  useEffect(() => {
    function parseHash(hashString: string): ServiceId {
      const clean = hashString.replace(/^#/, "").trim().toLowerCase();
      const aliases: Record<string, ServiceId> = {
        software: "software-development",
        "ui-ux": "ui-ux-design",
        mobile: "mobile-application",
        "mobile-applications": "mobile-application",
        cloud: "cloud-infrastructure",
        database: "database-management",
        web: "web-development",
        ai: "ai-automation",
        growth: "digital-growth",
      };

      if (aliases[clean]) return aliases[clean];
      if ((ORDERED_SVCS as readonly string[]).includes(clean)) {
        return clean as ServiceId;
      }
      return "software-development";
    }

    const initial = parseHash(window.location.hash);
    if (initial) {
      setActiveSvcId(initial);
      setDisplayedSvcId(initial);
    }

    const handleHashChange = () => {
      const updated = parseHash(window.location.hash);
      if (updated && updated !== activeSvcId) {
        handleSelectSvc(updated);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
      if (switchTimerRef.current) {
        clearTimeout(switchTimerRef.current);
      }
    };
  }, [activeSvcId]);

  const handleSelectSvc = (id: ServiceId) => {
    if (id === activeSvcId && id === displayedSvcId) return;

    // 1. Instantly update active highlight on the selector card
    setActiveSvcId(id);
    setActiveSubTab("overview");

    try {
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`);
      }
    } catch {}

    // 2. Smoothly fade out both main content and tech stack
    if (switchTimerRef.current) {
      clearTimeout(switchTimerRef.current);
    }
    setIsSwitching(true);

    // 3. Swap the displayed content after fade out duration (140ms)
    switchTimerRef.current = setTimeout(() => {
      setDisplayedSvcId(id);
      setDisplayedSubTab("overview");

      // 4. Smoothly fade in and slide up
      requestAnimationFrame(() => {
        setIsSwitching(false);
      });
    }, 140);
  };

  const handleSelectSubTab = (tab: SubTabId) => {
    if (tab === activeSubTab && tab === displayedSubTab) return;

    // 1. Instantly highlight subtab button
    setActiveSubTab(tab);

    // 2. Smoothly fade out content
    if (switchTimerRef.current) {
      clearTimeout(switchTimerRef.current);
    }
    setIsSwitching(true);

    // 3. Swap subtab content after fade out
    switchTimerRef.current = setTimeout(() => {
      setDisplayedSubTab(tab);

      // 4. Fade in
      requestAnimationFrame(() => {
        setIsSwitching(false);
      });
    }, 140);
  };

  const handleNavigateService = (dir: "prev" | "next") => {
    const curIdx = ORDERED_SVCS.indexOf(activeSvcId);
    const nextIdx = dir === "next" ? curIdx + 1 : curIdx - 1;
    if (nextIdx >= 0 && nextIdx < ORDERED_SVCS.length) {
      handleSelectSvc(ORDERED_SVCS[nextIdx]);
    }
  };

  const handleNavigateSubTab = (dir: "prev" | "next") => {
    const curIdx = ORDERED_SUBTABS.findIndex((t) => t.id === activeSubTab);
    const nextIdx = dir === "next" ? curIdx + 1 : curIdx - 1;
    if (nextIdx >= 0 && nextIdx < ORDERED_SUBTABS.length) {
      handleSelectSubTab(ORDERED_SUBTABS[nextIdx].id);
    }
  };

  const svc = SVCS[displayedSvcId];
  const activeSvcIndex = ORDERED_SVCS.indexOf(activeSvcId);
  const activeSubTabIndex = ORDERED_SUBTABS.findIndex((t) => t.id === activeSubTab);

  // Dynamic header text based on selected subtab
  let paneTitle = svc.name;
  let paneSubtitle = svc.tagline || "";
  let paneDesc = svc.intro || "";

  if (displayedSubTab === "services" && svc.subHeadings.services) {
    paneTitle = svc.subHeadings.services;
    paneSubtitle = "";
    paneDesc = svc.subHeadings.servicesDesc || "";
  } else if (displayedSubTab === "benefits" && svc.subHeadings.benefits) {
    paneTitle = svc.subHeadings.benefits;
    paneSubtitle = "";
    paneDesc = svc.subHeadings.benefitsDesc || "";
  } else if (displayedSubTab === "process" && svc.subHeadings.process) {
    paneTitle = svc.subHeadings.process;
    paneSubtitle = "";
    paneDesc = svc.subHeadings.processDesc || "";
  } else if (displayedSubTab === "proven" && svc.subHeadings.results) {
    paneTitle = svc.subHeadings.results;
    paneSubtitle = "";
    paneDesc = svc.subHeadings.resultsDesc || "";
  }

  return (
    <section id="what-we-provide" className="relative w-full py-12 lg:py-16 bg-white overflow-hidden">
      {/* Background blueprint grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,82,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,82,255,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[52rem] mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold text-[#0F172A] tracking-[-0.02em] mb-2 leading-tight">
            Enterprise Engineering &amp;{" "}
            <span className="text-[#0052FF]">Digital Solutions</span>
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed font-normal m-0">
            Select any service below to explore dedicated capabilities, technical benefits, delivery methodology, results, and Tech Ecosystem.
          </p>
        </div>

        {/* 8 HORIZONTAL SERVICE SELECTOR */}
        <div className="relative w-full mb-8">
          {/* Mobile 1-Item Carousel Layout (< md) */}
          <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] gap-2 items-center md:hidden w-full">
            {/* Mobile Left Arrow */}
            <button
              type="button"
              onClick={() => handleNavigateService("prev")}
              aria-label="Previous service"
              disabled={activeSvcIndex === 0}
              className={`w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_4px_14px_rgba(15,23,42,0.15)] transition-all ${
                activeSvcIndex === 0 ? "invisible pointer-events-none" : "hover:scale-105 active:scale-95"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Mobile Active Service Card Display */}
            <div className="relative bg-white border-2 border-[#0052FF] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2.5 shadow-[0_10px_24px_-4px_rgba(0,82,255,0.22)] h-[160px] transition-all duration-200">
              <div className="absolute top-0 left-[18%] right-[18%] h-[3.5px] rounded-b-[4px] bg-[#FF6B00]" />
              <div className="w-[46px] h-[46px] rounded-xl bg-[#0052FF] text-white flex items-center justify-center">
                <ServiceSelectorIcon id={activeSvcId} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[12px] font-bold text-[#FF6B00] tracking-[0.04em] leading-none mb-1">
                  {SVCS[activeSvcId].num}
                </span>
                <span className="text-[16px] font-bold text-[#0052FF] leading-snug">
                  {SVCS[activeSvcId].name}
                </span>
              </div>
            </div>

            {/* Mobile Right Arrow */}
            <button
              type="button"
              onClick={() => handleNavigateService("next")}
              aria-label="Next service"
              disabled={activeSvcIndex === ORDERED_SVCS.length - 1}
              className={`w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_4px_14px_rgba(15,23,42,0.15)] transition-all ${
                activeSvcIndex === ORDERED_SVCS.length - 1 ? "invisible pointer-events-none" : "hover:scale-105 active:scale-95"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Desktop & Tablet 8-Column Grid (>= md) */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-3 w-full" role="tablist" aria-label="Services">
            {ORDERED_SVCS.map((id) => {
              const item = SVCS[id];
              const isActive = id === activeSvcId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectSvc(id)}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`group relative bg-white rounded-xl py-3 px-2 flex flex-col items-center text-center gap-1.5 cursor-pointer outline-none transition-all duration-200 ${
                    isActive
                      ? "border-2 border-[#0052FF] shadow-[0_10px_24px_-4px_rgba(0,82,255,0.22)] -translate-y-1"
                      : "border border-[#D8E2ED] shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:-translate-y-[3px] hover:border-[#0052FF] hover:shadow-[0_10px_24px_-4px_rgba(15,23,42,0.1)]"
                  }`}
                >
                  {/* Top Bar Accent */}
                  <div
                    className={`absolute top-0 left-[18%] right-[18%] h-[3.5px] rounded-b-[4px] transition-colors duration-200 ${
                      isActive ? "bg-[#FF6B00]" : "bg-transparent"
                    }`}
                  />

                  {/* Icon Box */}
                  <div
                    className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? "bg-[#0052FF] border border-[#0052FF] text-white"
                        : "bg-[#FFF3EB] border border-[#FFE4D3] text-[#FF6B00] group-hover:border-[#FFB787]"
                    }`}
                  >
                    <ServiceSelectorIcon id={id} />
                  </div>

                  {/* Step & Title */}
                  <div className="flex flex-col items-center">
                    <span className="text-[12px] font-bold text-[#FF6B00] tracking-[0.04em] leading-none mb-0.5">
                      {item.num}
                    </span>
                    <span
                      className={`text-[13px] leading-tight transition-colors ${
                        isActive ? "font-bold text-[#0052FF]" : "font-semibold text-[#0F172A] group-hover:text-[#0052FF]"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SERVICE DETAIL SECTION: TWO-COLUMN STICKY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-6 mb-8 items-start">
          {/* Left Column: Sticky Sub-Navigation */}
          <aside className="w-full">
            <div className="relative flex flex-col gap-6 lg:sticky lg:top-[90px]">
              {/* Navigation Card */}
              <div className="bg-white border border-[#D8E2ED] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
                <div
                  className={`pb-4 mb-4 border-b border-[#E2E8F0] transition-opacity duration-200 ${
                    isSwitching ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <span className="text-[12px] font-bold text-[#FF6B00] tracking-[0.04em] block mb-1 leading-none">
                    {svc.num}
                  </span>
                  <h3 className="text-[20px] font-bold text-[#0F172A] leading-tight m-0">
                    {svc.name}
                  </h3>
                </div>

                {/* Mobile Carousel for Subtabs (< md) */}
                <div className="grid grid-cols-[38px_minmax(0,1fr)_38px] gap-2 items-center md:hidden w-full">
                  <button
                    type="button"
                    onClick={() => handleNavigateSubTab("prev")}
                    aria-label="Previous section"
                    disabled={activeSubTabIndex === 0}
                    className={`w-[34px] h-[34px] rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,82,255,0.15)] transition-all ${
                      activeSubTabIndex === 0 ? "invisible pointer-events-none" : "hover:scale-105 active:scale-95"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-3.5 py-2.5 flex items-center justify-center gap-2.5 text-[#0052FF] font-bold text-[16px]">
                    <span className="w-[7px] h-[7px] rounded-full bg-[#FF6B00] shadow-[0_0_0_3px_rgba(255,107,0,0.2)]" />
                    <span>{ORDERED_SUBTABS[activeSubTabIndex].label}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavigateSubTab("next")}
                    aria-label="Next section"
                    disabled={activeSubTabIndex === ORDERED_SUBTABS.length - 1}
                    className={`w-[34px] h-[34px] rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,82,255,0.15)] transition-all ${
                      activeSubTabIndex === ORDERED_SUBTABS.length - 1 ? "invisible pointer-events-none" : "hover:scale-105 active:scale-95"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                {/* Desktop Subsection Buttons Menu (>= md) */}
                <div className="hidden md:flex flex-col gap-2 w-full" role="tablist" aria-label="Service Sections">
                  {ORDERED_SUBTABS.map((subTab) => {
                    const isTabActive = subTab.id === activeSubTab;
                    return (
                      <button
                        key={subTab.id}
                        type="button"
                        onClick={() => handleSelectSubTab(subTab.id)}
                        role="tab"
                        aria-selected={isTabActive}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border transition-all duration-200 text-left text-[16px] leading-none ${
                          isTabActive
                            ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#0052FF] font-bold"
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

              {/* Sticky Start Project Card (Hidden on mobile < lg) */}
              <div
                className={`hidden lg:block bg-white border border-[#D8E2ED] rounded-[14px] p-6 shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition-all duration-300 ease-out ${
                  isSwitching ? "opacity-40 translate-y-1" : "opacity-100 translate-y-0"
                }`}
              >
                <h4 className="text-[18px] font-bold text-[#0F172A] mb-2 leading-snug">
                  {svc.cta.heading}
                </h4>
                <p className="text-[15px] text-[#475569] mb-4 leading-relaxed font-normal">
                  {svc.cta.desc}
                </p>
                <Link
                  href="/contact"
                  className="w-full h-12 px-5 bg-[#0052FF] hover:bg-[#0043D6] text-white font-semibold text-[16px] rounded-lg inline-flex items-center justify-center gap-1.5 shadow-[0_2px_6px_rgba(0,82,255,0.2)] hover:-translate-y-[2px] transition-all"
                >
                  <span>{svc.cta.btn}</span>
                  <span className="text-[#FF6B00] font-extrabold ml-1.5">&rarr;</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Column: Dynamic Content Pane with Silky Smooth Transition */}
          <main className="w-full">
            <div
              className={`bg-white border border-[#D8E2ED] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] min-h-[400px] transition-all duration-300 ease-out will-change-[opacity,transform] ${
                isSwitching ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"
              }`}
            >
              {/* Header Badge + Title + Subtitle + Description + Divider */}
              <div className="pb-6 mb-6 border-b border-[#E2E8F0]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF3EB] border border-[#FFD8BE] rounded-md text-[#FF6B00] text-[12px] font-bold tracking-[0.04em] leading-none mb-3">
                  <span>SERVICE {svc.num} / 08</span>
                </div>
                <h3 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-[#0F172A] tracking-[-0.025em] mb-2 leading-tight">
                  {paneTitle}
                </h3>
                {paneSubtitle && (
                  <p className="text-[18px] font-semibold text-[#0052FF] mb-3 leading-snug">
                    {paneSubtitle}
                  </p>
                )}
                <p className="text-[17px] text-[#475569] leading-relaxed max-w-[850px] m-0">
                  {paneDesc}
                </p>
              </div>

              {/* TAB 1: OVERVIEW (4 Cards: 2-Column Grid) */}
              {displayedSubTab === "overview" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {svc.overview.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-extrabold text-[#0052FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-1 rounded uppercase tracking-[0.04em]">
                          {item.badge}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#FF6B00] inline-block" />
                      </div>
                      <h4 className="text-[18px] font-semibold text-[#0F172A] mb-3 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[15px] text-[#475569] leading-relaxed m-0 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: SERVICES (6 Cards: 3-Column Grid) */}
              {displayedSubTab === "services" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {svc.servicesList.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] transition-all"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#0052FF] shrink-0">
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <h4 className="text-[18px] font-semibold text-[#0F172A] leading-snug m-0">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[15px] text-[#475569] leading-relaxed pl-10 m-0 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: BENEFITS (6 Cards: 3-Column Grid) */}
              {displayedSubTab === "benefits" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {svc.benefitCards.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] transition-all"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#0052FF] shrink-0">
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <h4 className="text-[18px] font-semibold text-[#0F172A] leading-snug m-0">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[15px] text-[#475569] leading-relaxed pl-10 m-0 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: PROCESS (6 Step Cards: 3-Column Grid) */}
              {displayedSubTab === "process" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {svc.process.map((st, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] border-t-[3.5px] border-t-[#0052FF] hover:border-t-[#FF6B00] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[11px] font-extrabold text-[#0052FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2 py-0.5 rounded">
                          STEP {st.step}
                        </span>
                        <h4 className="text-[17px] font-bold text-[#0F172A] leading-snug m-0">
                          {st.title}
                        </h4>
                      </div>
                      <p className="text-[15px] text-[#475569] leading-relaxed mt-2 m-0 font-normal">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: RESULTS (6 Cards: 3-Column Grid, Premium Light-Blue Style) */}
              {displayedSubTab === "proven" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {svc.resultCards.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F0F7FF] border border-[#CFE2FE] border-t-[3.5px] border-t-[#FF6B00] hover:border-[#0052FF] rounded-[14px] p-7 h-full flex flex-col shadow-[0_4px_14px_rgba(0,82,255,0.05)] hover:-translate-y-[3px] hover:shadow-[0_10px_24px_-2px_rgba(0,82,255,0.12)] transition-all"
                    >
                      <div className="flex items-start gap-3.5 mb-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#BFDBFE] text-[#0052FF] shrink-0">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                          </svg>
                        </span>
                        <h4 className="text-[18px] font-semibold text-[#0F172A] leading-snug m-0">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[15px] text-[#334155] leading-relaxed pl-11 m-0 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* TECH STACK SECTION: TECH ECOSYSTEM with Synchronized Smooth Transition */}
        <div
          className={`bg-white border border-[#D8E2ED] rounded-2xl p-7 sm:p-8 shadow-[0_4px_16px_rgba(15,23,42,0.03)] transition-all duration-300 ease-out will-change-[opacity,transform] ${
            isSwitching ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"
          }`}
        >
          <div className="text-center max-w-[850px] mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-[-0.02em] mb-1.5 leading-tight">
              Tech <span className="text-[#0052FF]">Ecosystem</span>
            </h3>
            <p className="text-[14.5px] text-[#475569] m-0 font-normal">
              Technologies and platforms used for{" "}
              <strong className="text-[#0F172A] font-bold">{svc.name}</strong>{" "}
              solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5">
            {svc.techStack.map((techName) => {
              const iconSvg =
                TECH_ICONS[techName.toUpperCase()] ||
                TECH_ICONS[techName] ||
                null;

              return (
                <div
                  key={techName}
                  className="bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center h-full min-h-[104px] shadow-[0_2px_6px_rgba(15,23,42,0.02)] hover:-translate-y-[3px] hover:shadow-[0_8px_18px_-2px_rgba(0,82,255,0.12)] transition-all cursor-default"
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-3 [&>svg]:w-9 [&>svg]:h-9 [&>svg]:object-contain">
                    {iconSvg ? (
                      <div
                        className="w-9 h-9 flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: iconSvg }}
                      />
                    ) : (
                      <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-[11px] font-bold text-slate-700">
                        {techName.substring(0, 3)}
                      </div>
                    )}
                  </div>
                  <span className="text-[13px] font-semibold text-[#1E293B] leading-tight text-center break-words">
                    {techName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
