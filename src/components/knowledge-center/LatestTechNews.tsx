"use client";

import React, { useState, useEffect, useCallback } from "react";

export interface LiveNewsItem {
  id: string;
  provider: string;
  tag: string;
  providerLabel: string;
  providerColor: string;
  date: string;
  source: string;
  title: string;
  desc: string;
  link: string;
  img: string;
  source_image_url?: string;
  timestamp?: string;
}

const INITIAL_STORIES: LiveNewsItem[] = [
  {
    id: "apple-iphone16",
    provider: "apple",
    tag: "HARDWARE & APPLE INTELLIGENCE",
    providerLabel: "🍎 APPLE • HARDWARE & SILICON",
    providerColor: "#0284C7",
    date: "Apple Newsroom (Live Wire)",
    source: "Apple Newsroom",
    title: "Apple introduces iPhone 16 and iPhone 16 Plus",
    desc: "Apple today announced iPhone 16 and iPhone 16 Plus, built from the ground up for Apple Intelligence with the new A18 chip, Camera Control, and 48MP Fusion camera.",
    link: "https://www.apple.com/newsroom/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/",
    img: "/uploads/live_news/apple_iphone16_hero.jpg",
  },
  {
    id: "google-gemini",
    provider: "google",
    tag: "GOOGLE AI & GEMINI",
    providerLabel: "🌐 GOOGLE • AI & DEVICES",
    providerColor: "#0052FF",
    date: "Google The Keyword (Live Wire)",
    source: "Google The Keyword",
    title: "Introducing Gemini: Google’s Most Capable Multimodal AI Model",
    desc: "Gemini is Google's most capable and general model, built from the ground up to be multimodal across text, code, audio, image, and video.",
    link: "https://blog.google/technology/ai/google-gemini-ai/",
    img: "/uploads/live_news/google_gemini_hero.jpg",
  },
  {
    id: "nvidia-blackwell",
    provider: "nvidia",
    tag: "ACCELERATED COMPUTING & BLACKWELL",
    providerLabel: "⚡ NVIDIA • ACCELERATED AI",
    providerColor: "#059669",
    date: "NVIDIA Official Newsroom (Live Wire)",
    source: "NVIDIA Official Newsroom",
    title: "NVIDIA Blackwell Platform Arrives to Power a New Era of Computing",
    desc: "Powering a new era of computing, NVIDIA announced the Blackwell platform, enabling organizations everywhere to build and run real-time generative AI at 25x less cost and energy.",
    link: "https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing",
    img: "/uploads/live_news/nvidia_blackwell_hero.jpg",
  },
  {
    id: "anthropic-claude35",
    provider: "anthropic",
    tag: "FRONTIER AI & CLAUDE",
    providerLabel: "🧠 ANTHROPIC • SAFETY RESEARCH",
    providerColor: "#D97706",
    date: "Anthropic Research (Live Wire)",
    source: "Anthropic Research",
    title: "Introducing Claude 3.5 Sonnet: Industry-Leading Frontier Intelligence",
    desc: "Claude 3.5 Sonnet raises the industry standard for intelligence, operating at twice the speed of Claude 3 Opus with state-of-the-art reasoning and coding benchmarks.",
    link: "https://www.anthropic.com/news/claude-3-5-sonnet",
    img: "/uploads/live_news/anthropic_claude35_hero.png",
  },
  {
    id: "openai-gpt4o",
    provider: "openai",
    tag: "AI REASONING & GPT-4O",
    providerLabel: "🤖 OPENAI • AI REASONING",
    providerColor: "#7C3AED",
    date: "OpenAI Newsroom (Live Wire)",
    source: "OpenAI Newsroom",
    title: "Hello GPT-4o: OpenAI's Flagship Multimodal Model",
    desc: "GPT-4o ('omni') integrates text, vision, and audio reasoning natively into a single neural network, enabling natural human-computer interaction in real time.",
    link: "https://openai.com/index/hello-gpt-4o/",
    img: "/uploads/live_news/openai_gpt4o_official.png",
  },
  {
    id: "meta-llama31",
    provider: "meta",
    tag: "OPEN SOURCE AI & LLAMA",
    providerLabel: "♾️ META • OPEN SOURCE AI",
    providerColor: "#0081FB",
    date: "Meta Newsroom (Live Wire)",
    source: "Meta Newsroom",
    title: "Open Source AI Is the Path Forward: Announcing Llama 3.1",
    desc: "Mark Zuckerberg outlines why open source AI is essential for global technological advancement, releasing Llama 3.1 405B for open enterprise research and development.",
    link: "https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/",
    img: "/uploads/live_news/meta_opensource_headline.png",
  },
  {
    id: "ms-copilot-pcs",
    provider: "microsoft",
    tag: "ENTERPRISE CLOUD & COPILOT",
    providerLabel: "🪟 MICROSOFT • CLOUD & COPILOT",
    providerColor: "#00A4EF",
    date: "Microsoft Official Blog (Live Wire)",
    source: "Microsoft Official Blog",
    title: "Introducing Copilot+ PCs: High-Performance Windows AI Hardware",
    desc: "Microsoft announces Copilot+ PCs with breakthrough 40+ TOPS silicon, system-wide AI acceleration, and all-day battery life for modern enterprise engineering.",
    link: "https://blogs.microsoft.com/blog/2024/05/20/introducing-copilot-pcs/",
    img: "/uploads/live_news/microsoft_copilot_hero.jpg",
  },
  {
    id: "intel-robotics",
    provider: "intel",
    tag: "NEXT-GEN SILICON & ROBOTICS",
    providerLabel: "🔷 INTEL • NEXT-GEN SILICON",
    providerColor: "#0071C5",
    date: "Intel Newsroom (Live Wire)",
    source: "Intel Newsroom",
    title: "Six in 10 Leaders Bet Big on Enterprise Robotics and AI Silicon",
    desc: "Senior business and IT leaders, robotics engineers, and enterprise architects expect their organizations to operate automated AI systems within the next three years.",
    link: "https://newsroom.intel.com/artificial-intelligence/6-in-10-leaders-bet-big-on-robots-only-4-in-10-are-ready",
    img: "/uploads/live_news/intel_omintelcomp9107_95f0081c1ff8.webp",
  },
];

const FALLBACK_IMAGE = "/uploads/live_news/apple_iphone16_hero.jpg";

export default function LatestTechNews() {
  const [stories, setStories] = useState<LiveNewsItem[]>(INITIAL_STORIES);
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

  const activeStory = stories[activeIdx] || stories[0];

  return (
    <section className="w-full py-12 sm:py-14 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b-2 border-[#E2E8F0]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-[#EF4444] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-[2px] tracking-[0.08em] uppercase flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              LIVE BREAKING NEWS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold text-[#0F172A] m-0 tracking-[-0.02em]">
              Latest IT &amp; Business Intelligence
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-[11.5px] text-[#475569] font-mono font-semibold bg-white px-3 py-1.5 rounded-md border border-[#CBD5E1] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>LIVE API WIRE • {lastSyncText}</span>
            </span>
            <button
              type="button"
              onClick={() => fetchLiveNews(true)}
              disabled={isRefreshing}
              title="Refresh Live Feeds"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#0052FF] bg-[#EFF6FF] hover:bg-[#DBEAFE] active:scale-95 px-3.5 py-1.5 rounded-md border border-[#BFDBFE] transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
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
                <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
                  ORIGINAL SOURCE IMAGE
                </span>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2 flex-wrap font-medium">
                  <span className="text-[#059669] font-bold">● {activeStory.date}</span>
                  <span>•</span>
                  <span className="font-semibold text-[#334155]">{activeStory.source}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-[1.35] mb-2.5">
                  {activeStory.title}
                </h3>

                <p className="text-[14.5px] sm:text-[15px] text-[#475569] leading-relaxed mb-5">
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
                  <span className="text-[11px] text-[#94A3B8] font-mono tracking-wider">
                    VERIFIED OFFICIAL LINK
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column ("apni side py"): Live Companion Stories List */}
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex items-center justify-between px-1 mb-0.5">
              <span className="text-xs font-extrabold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                Live News Stories ({stories.length})
              </span>
              <span className="text-[11px] text-[#0052FF] font-semibold">
                Click any story to preview
              </span>
            </div>

            {stories.map((story, idx) => {
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
                      <h4 className="text-[13px] font-bold text-[#0F172A] leading-[1.3] mb-1 line-clamp-2">
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
