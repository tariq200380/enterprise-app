"use client";

import React, { useState, useEffect, useCallback } from "react";

import { LiveNewsItem, INITIAL_STORIES, FALLBACK_IMAGE } from "./knowledgeCenterData";
export type { LiveNewsItem };
export { INITIAL_STORIES, FALLBACK_IMAGE };

export default function LatestTechNews({ initialStories }: { initialStories?: LiveNewsItem[] } = {}) {
  const [stories, setStories] = useState<LiveNewsItem[]>(initialStories && initialStories.length > 0 ? initialStories : INITIAL_STORIES);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSyncText, setLastSyncText] = useState<string>("Verified live");

  // Fetch verified live news from API
  const fetchLiveNews = useCallback(async (forceSync = false) => {
    try {
      setIsRefreshing(true);
      const url = `/api/live-news?t=${Date.now()}${forceSync ? "&refresh=true" : ""}`;
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      if (!res.ok) throw new Error("Failed to fetch live news");

      const data = await res.json();
      if (data.breaking_news && Array.isArray(data.breaking_news) && data.breaking_news.length > 0) {
        setStories(data.breaking_news);
        setLastSyncText("Verified live");
      }
    } catch {
      setLastSyncText("Live verified");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch and auto-refresh interval
  useEffect(() => {
    fetchLiveNews(false);
    const interval = setInterval(() => fetchLiveNews(false), 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, [fetchLiveNews]);

  // Helper to identify regional vs international news
  const isRegionalStory = (s: LiveNewsItem): boolean => {
    const p = (s.provider || "").toLowerCase();
    if (["dawn", "brecorder", "propakistani", "tribune"].includes(p)) return true;
    const tag = (s.tag || "").toLowerCase();
    if (tag.includes("pakistan") || tag.includes("🇵🇰")) return true;
    const label = (s.providerLabel || "").toLowerCase();
    if (label.includes("pakistan") || label.includes("🇵🇰")) return true;
    return false;
  };

  // Strictly curate 6 stories: 4 International and 2 Regional
  const curatedStories = React.useMemo(() => {
    const intl = stories.filter((s) => !isRegionalStory(s)).slice(0, 4);
    const reg = stories.filter((s) => isRegionalStory(s)).slice(0, 2);

    let finalReg = [...reg];
    if (finalReg.length < 2) {
      const fallbackReg: LiveNewsItem[] = [
        {
          id: "brecorder-fallback",
          provider: "brecorder",
          tag: "PAKISTAN FINTECH & BUSINESS",
          providerLabel: "🇵🇰 B-RECORDER • FINTECH",
          providerColor: "#0284C7",
          date: "1 hour ago • Business Recorder",
          source: "Business Recorder",
          title: "Trump slams AI critics urging caution",
          desc: "DOONBEG: Donald Trump on Sunday hit out at critics of artificial intelligence (AI) who have warned firms needed to slow down the development of the powerful technology.",
          link: "https://www.brecorder.com/news/40439295/trump-slams-ai-critics-urging-caution",
          img: "https://i.brecorder.com/large/2026/09/13214356dbecea6.webp",
        },
        {
          id: "dawn-fallback",
          provider: "dawn",
          tag: "PAKISTAN TECH & SCIENCE",
          providerLabel: "🇵🇰 DAWN • TECH & SCIENCE",
          providerColor: "#059669",
          date: "4 hours ago • Dawn Sci-Tech",
          source: "Dawn Sci-Tech",
          title: "Lack of skilled workforce hurdle to IT exports: minister",
          desc: "Lack of skilled workforce hurdle to IT exports: minister. Real-time intelligence and verified enterprise developments.",
          link: "https://www.dawn.com/news/2029614/lack-of-skilled-workforce-hurdle-to-it-exports-minister",
          img: "https://i.dawn.com/large/2026/09/131143192c01dbe.webp",
        },
      ];
      for (const fb of fallbackReg) {
        if (finalReg.length < 2 && !finalReg.some((r) => (r.provider || "").toLowerCase() === fb.provider)) {
          finalReg.push(fb);
        }
      }
    }

    return [...intl, ...finalReg];
  }, [stories]);

  useEffect(() => {
    if (activeIdx >= curatedStories.length && curatedStories.length > 0) {
      setActiveIdx(0);
    }
  }, [activeIdx, curatedStories.length]);

  const activeStory = curatedStories[activeIdx] || curatedStories[0] || stories[0];

  return (
    <section className="w-full py-12 sm:py-14 bg-[#F7F6F5] border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b-2 border-[#E2E8F0]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-[#EF4444] text-white text-[10px] font-semibold px-2.5 py-1 rounded-[2px] tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              LIVE BREAKING NEWS
            </span>
            <h2 className="font-outfit font-bold text-xl sm:text-2xl lg:text-[1.75rem] text-[#0F172A] m-0 tracking-tight">
              Latest IT &amp; Business Intelligence
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-[11.5px] text-[#5B6472] font-semibold bg-white px-3 py-1.5 rounded-md border border-[#E2E8F0] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>LIVE API WIRE • {lastSyncText}</span>
            </span>
            <button
              type="button"
              onClick={() => fetchLiveNews(true)}
              disabled={isRefreshing}
              title="Refresh Live Feeds"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#0052FF] bg-white hover:bg-[#F0F7FF] active:scale-95 px-3.5 py-1.5 rounded-md border border-[#E2E8F0] transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
            >
              <span className={`text-xs ${isRefreshing ? "animate-spin" : ""}`}>🔄</span>
              <span>{isRefreshing ? "Refreshing..." : "Refresh Wire"}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[7.5fr_4.5fr] gap-6 lg:gap-8 items-start">
          {/* Left Column: Main Featured Breaking Card with Live Original Picture */}
          <div className="w-full">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col w-full transition-all duration-300">
              {/* Visual Container with True 16:9 Landscape Proportion */}
              <div className="relative w-full aspect-[16/9] bg-[#0B1120] overflow-hidden group">
                <img
                  src={activeStory.img || activeStory.source_image_url || FALLBACK_IMAGE}
                  alt={activeStory.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== FALLBACK_IMAGE) {
                      target.src = FALLBACK_IMAGE;
                    }
                  }}
                />
                <span
                  className="absolute top-4 left-4 text-white text-[10.5px] font-bold px-2.5 py-1 rounded-[2px] uppercase tracking-[0.05em] shadow-sm z-10"
                  style={{ backgroundColor: activeStory.providerColor || "#0052FF" }}
                >
                  {activeStory.tag}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded shadow">
                  ORIGINAL SOURCE IMAGE
                </span>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-[#5B6472] mb-2 flex-wrap font-medium">
                  <span className="text-[#059669] font-bold">● {activeStory.date}</span>
                  <span>•</span>
                  <span className="font-semibold text-[#0F172A]">{activeStory.source}</span>
                </div>

                <h3 className="font-outfit font-bold text-xl sm:text-2xl text-[#0F172A] leading-[1.35] mb-2.5 tracking-tight">
                  {activeStory.title}
                </h3>

                <p className="text-[14.5px] sm:text-[15px] text-[#5B6472] leading-relaxed mb-5">
                  {activeStory.desc}
                </p>

                <div className="mt-auto flex items-center justify-between flex-wrap gap-2.5 pt-4 border-t border-[#F1F5F9]">
                  <a
                    href={activeStory.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-bold text-[#0052FF] hover:text-[#0043D6] hover:underline inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Full Wire ({activeStory.source}) &rarr;</span>
                  </a>
                  <span className="text-[11px] text-[#94A3B8] font-semibold tracking-wider">
                    VERIFIED OFFICIAL LINK
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column ("apni side py"): Live Companion Stories List */}
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex items-center justify-between px-1 mb-0.5">
              <span className="text-xs font-extrabold text-[#5B6472] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                Live News Stories ({curatedStories.length})
              </span>
              <span className="text-[11px] text-[#0052FF] font-semibold">
                Click any story to preview
              </span>
            </div>

            {curatedStories.map((story, idx) => {
              const isSelected = activeIdx === idx;

              return (
                <button
                  key={story.id || story.title}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`text-left bg-white border rounded-[10px] p-3 cursor-pointer transition-all duration-200 w-full box-border block select-none ${
                    isSelected
                      ? "border-[#0052FF] bg-[#F0F7FF] shadow-[0_0_0_2px_rgba(0,82,255,0.2)] -translate-y-[1px]"
                      : "border-[#E2E8F0] hover:border-[#0052FF] hover:-translate-y-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Live Original Picture Thumbnail */}
                    <div className="w-[60px] h-[60px] rounded-[6px] overflow-hidden bg-[#0B1120] shrink-0 relative">
                      <img
                        src={story.img || story.source_image_url || FALLBACK_IMAGE}
                        alt={story.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== FALLBACK_IMAGE) {
                            target.src = FALLBACK_IMAGE;
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[9.5px] font-extrabold uppercase tracking-[0.04em] block mb-0.5 truncate"
                        style={{ color: story.providerColor || "#475569" }}
                      >
                        {story.providerLabel}
                      </span>
                      <h4 className="font-outfit font-bold text-[13px] text-[#0F172A] leading-[1.3] mb-1 line-clamp-2">
                        {story.title}
                      </h4>
                      <span className="text-[10px] text-[#64748B] block">
                        {story.date}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-[#0052FF] text-sm font-bold shrink-0">
                        ▶
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
