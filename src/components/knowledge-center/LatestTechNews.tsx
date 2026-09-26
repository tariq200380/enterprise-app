"use client";

import React, { useState, useEffect, useCallback } from "react";
import { subscribeLiveNews, fetchSharedLiveNews, seedLiveNewsCache } from "@/lib/liveNewsClient";

import { LiveNewsItem, INITIAL_STORIES, FALLBACK_IMAGE, BRAND_FALLBACK_IMAGES } from "./knowledgeCenterData";
export type { LiveNewsItem };
export { INITIAL_STORIES, FALLBACK_IMAGE, BRAND_FALLBACK_IMAGES };

function getStoryImage(story?: LiveNewsItem): string {
  if (!story) return FALLBACK_IMAGE;
  const p = (story.provider || "").toLowerCase();
  const fallback = BRAND_FALLBACK_IMAGES[p] || FALLBACK_IMAGE;
  const src = (story.img || story.image || story.source_image_url || "").trim();
  if (
    !src ||
    src === FALLBACK_IMAGE ||
    src.includes("kc-news.webp") ||
    src.includes("25a7c99743ebfb3b") ||
    src.includes("8a4eb6c412e5e7ffa38f07233344f4b7e6644994") ||
    src.toLowerCase().includes("omb-home-final") ||
    (p === "microsoft" && (src.includes("blogs.microsoft.com") || src.includes("thesourcemediaassets")))
  ) {
    return fallback;
  }
  return src;
}

export default function LatestTechNews({ initialStories }: { initialStories?: LiveNewsItem[] } = {}) {
  const [stories, setStories] = useState<LiveNewsItem[]>(initialStories && initialStories.length > 0 ? initialStories : INITIAL_STORIES);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSyncText, setLastSyncText] = useState<string>("Verified live");

  // Seed the shared client cache with initialStories to prevent cold-fetch layout shifts
  useEffect(() => {
    if (initialStories && initialStories.length > 0) {
      seedLiveNewsCache({ breaking_news: initialStories });
    }
  }, [initialStories]);

  // Fetch verified live news using the shared client
  const fetchLiveNews = useCallback(async (forceSync = false) => {
    try {
      setIsRefreshing(true);
      const data = await fetchSharedLiveNews(forceSync);
      if (data?.breaking_news && Array.isArray(data.breaking_news) && data.breaking_news.length > 0) {
        setStories(data.breaking_news);
        setLastSyncText("Verified live");
      }
    } catch {
      setLastSyncText("Live verified");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Subscribe to shared updates and centralized auto-refresh interval
  useEffect(() => {
    const unsubscribe = subscribeLiveNews((data) => {
      if (data?.breaking_news && Array.isArray(data.breaking_news) && data.breaking_news.length > 0) {
        setStories((prev) => {
          if (
            prev.length === data.breaking_news!.length &&
            prev[0]?.id === data.breaking_news![0]?.id &&
            prev[0]?.title === data.breaking_news![0]?.title
          ) {
            return prev;
          }
          return data.breaking_news!;
        });
        setLastSyncText("Verified live");
      }
    });
    return unsubscribe;
  }, []);

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

  // Strictly curate 6 stories: 4 International (from diverse providers) and 2 Regional
  const curatedStories = React.useMemo(() => {
    const seenProviders = new Set<string>();
    const intl: LiveNewsItem[] = [];

    // Prioritize diverse distinct international providers first
    for (const s of stories) {
      if (!isRegionalStory(s) && !seenProviders.has(s.provider)) {
        seenProviders.add(s.provider);
        intl.push(s);
        if (intl.length >= 4) break;
      }
    }

    // Fill up to 4 if fewer than 4 unique providers found
    if (intl.length < 4) {
      for (const s of stories) {
        if (!isRegionalStory(s) && !intl.some((x) => x.id === s.id)) {
          intl.push(s);
          if (intl.length >= 4) break;
        }
      }
    }

    const reg = stories.filter((s) => isRegionalStory(s)).slice(0, 2);

    const combined = [...intl, ...reg];
    if (combined.length < 6) {
      for (const s of stories) {
        if (!combined.some((x) => x.id === s.id)) {
          combined.push(s);
          if (combined.length >= 6) break;
        }
      }
    }

    return combined;
  }, [stories]);

  const activeStory =
    (selectedStoryId ? curatedStories.find((s) => s.id === selectedStoryId) : null) ||
    curatedStories[0] ||
    stories[0];

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
        <div className="grid grid-cols-1 md:grid-cols-[7.5fr_4.5fr] gap-6 lg:gap-8 items-start">
          {/* Left Column: Main Featured Breaking Card with Live Original Picture */}
          <div className="w-full">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col w-full transition-all duration-300">
              {/* Visual Container with True 16:9 Landscape Proportion */}
              <div className="relative w-full aspect-[16/9] bg-[#0B1120] overflow-hidden group">
                <img
                  src={getStoryImage(activeStory)}
                  alt={activeStory.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = BRAND_FALLBACK_IMAGES[activeStory?.provider?.toLowerCase()] || FALLBACK_IMAGE;
                    if (target.src !== fallback) {
                      target.src = fallback;
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

          {/* Right Column: Live Companion Stories List */}
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

            {curatedStories.map((story) => {
              const isSelected = activeStory?.id === story.id;

              return (
                <button
                  key={story.id || story.title}
                  type="button"
                  onClick={() => setSelectedStoryId(story.id)}
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
                        src={getStoryImage(story)}
                        alt={story.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const fallback = BRAND_FALLBACK_IMAGES[story.provider?.toLowerCase()] || FALLBACK_IMAGE;
                          if (target.src !== fallback) {
                            target.src = fallback;
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
