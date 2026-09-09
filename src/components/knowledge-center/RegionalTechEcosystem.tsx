"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface RegionalWireItem {
  id: string;
  name: string;
  icon: string;
  brandBadge: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  image: string;
}

const INITIAL_REGIONAL_WIRES: RegionalWireItem[] = [
  {
    id: "dawn",
    name: "Dawn Sci-Tech",
    icon: "🇵🇰",
    brandBadge: "🇵🇰 DAWN TECH",
    category: "PAKISTAN TECH & SCIENCE",
    date: "September 10, 2026 (Live Wire)",
    title: "Apple debuts passport-shaped foldable phone, called Duo",
    summary:
      "Apple unveiled a passport-shaped foldable phone called the Duo, marking the tech giant's first foray into foldable smartphones alongside next-generation AI silicon.",
    sourceName: "Dawn Sci-Tech",
    sourceUrl: "https://www.dawn.com/news/2028667/apple-debuts-passport-shaped-foldable-phone-called-duo",
    image: "/uploads/live_news/dawn_duo.webp",
  },
  {
    id: "propakistani",
    name: "ProPakistani",
    icon: "📱",
    brandBadge: "🇵🇰 PROPAKISTANI",
    category: "PAKISTAN DIGITAL ECOSYSTEM",
    date: "September 10, 2026 (Live Wire)",
    title: "iPhone Duo Launches as Apple’s First-Ever Foldable Smartphone",
    summary:
      "Apple officially announced the iPhone Duo, its first foldable smartphone, featuring an innovative dual-hinge design and next-generation A19 Pro chip.",
    sourceName: "ProPakistani",
    sourceUrl: "https://propakistani.pk/2026/09/10/iphone-duo-launches-as-apples-first-ever-foldable-smartphone/",
    image: "/uploads/live_news/propakistani_duo.jpg",
  },
  {
    id: "brecorder",
    name: "Business Recorder",
    icon: "📈",
    brandBadge: "🇵🇰 B-RECORDER",
    category: "PAKISTAN FINTECH & BUSINESS",
    date: "September 10, 2026 (Live Wire)",
    title: "Apple joins foldable phone race with $1,999 passport-shaped iPhone Duo",
    summary:
      "Apple has joined the competitive foldable smartphone landscape, launching the passport-proportioned iPhone Duo starting at $1,999 with on-device generative intelligence.",
    sourceName: "Business Recorder",
    sourceUrl: "https://www.brecorder.com/news/40438680/apple-joins-foldable-phone-race-with-1999-passport-shaped-iphone-duo",
    image: "/uploads/live_news/brecorder_duo.webp",
  },
  {
    id: "tribune",
    name: "The Express Tribune",
    icon: "🚀",
    brandBadge: "🇵🇰 TRIBUNE",
    category: "PAKISTAN AEROSPACE & TECH",
    date: "September 10, 2026 (Live Wire)",
    title: "Google to invest $15 billion in AI infrastructure and clean power",
    summary:
      "Google plans to invest $15 billion into expanding European artificial intelligence data centers, securing direct long-term clean power to fuel sovereign enterprise AI computing.",
    sourceName: "The Express Tribune",
    sourceUrl: "https://tribune.com.pk/story/2628394/google-to-invest-15-billion-in-ai-infrastructure-and-buy-nuclear-power-in-finland",
    image: "/uploads/live_news/tribune_google_ai.jpg",
  },
];

export default function RegionalTechEcosystem() {
  const [wires, setWires] = useState<RegionalWireItem[]>(INITIAL_REGIONAL_WIRES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRegionalWires = async (forceSync = false) => {
    try {
      setIsRefreshing(true);
      const res = await fetch(`/api/live-news?t=${Date.now()}${forceSync ? "&refresh=true" : ""}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.regional_wires && typeof data.regional_wires === "object") {
        const order = ["dawn", "propakistani", "brecorder", "tribune"];
        const updated: RegionalWireItem[] = [];
        for (const key of order) {
          const item = data.regional_wires[key];
          if (item) {
            updated.push({
              id: key,
              name: item.name || key.toUpperCase(),
              icon: item.icon || "🇵🇰",
              brandBadge: item.brandBadge || `🇵🇰 ${key.toUpperCase()}`,
              category: item.category || "PAKISTAN TECH",
              date: item.date || "Live Wire",
              title: item.title,
              summary: item.summary,
              sourceName: item.sourceName || item.name,
              sourceUrl: item.sourceUrl,
              image: item.image?.startsWith("/") ? item.image : `/${item.image}`,
            });
          }
        }
        if (updated.length > 0) {
          setWires(updated);
        }
      }
    } catch {} finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRegionalWires(false);
    const interval = setInterval(() => fetchRegionalWires(false), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-12 sm:py-14 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      {/* Hidden Radio Buttons for Pure CSS Tabs (Zero useState, Zero JS) */}
      {wires.map((tab, idx) => (
        <input
          key={tab.id}
          type="radio"
          name="regional-wire-tab"
          id={`regional-tab-${tab.id}`}
          defaultChecked={idx === 0}
          className="hidden"
        />
      ))}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Live Wire Badge and Refresh button */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b-2 border-[#E2E8F0]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-[#059669] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-[2px] tracking-[0.08em] uppercase flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              LIVE REGIONAL WIRES
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold text-[#0F172A] m-0 tracking-[-0.02em]">
              Pakistan Regional Tech Ecosystem
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-[11.5px] text-[#475569] font-mono font-semibold bg-white px-3 py-1.5 rounded-md border border-[#CBD5E1] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse"></span>
              <span>LIVE WIRE • Verified Live</span>
            </span>
            <button
              type="button"
              onClick={() => fetchRegionalWires(true)}
              disabled={isRefreshing}
              title="Refresh Regional Feeds"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#059669] bg-[#ECFDF5] hover:bg-[#D1FAE5] active:scale-95 px-3.5 py-1.5 rounded-md border border-[#A7F3D0] transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
            >
              <span className={`text-xs ${isRefreshing ? "animate-spin" : ""}`}>🔄</span>
              <span>{isRefreshing ? "Refreshing..." : "Refresh Regional"}</span>
            </button>
          </div>
        </div>

        {/* 4 Provider Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {wires.map((tab) => (
            <label
              key={tab.id}
              htmlFor={`regional-tab-${tab.id}`}
              className={`regional-btn-${tab.id} inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer select-none bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#059669] hover:text-[#059669]`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </label>
          ))}
        </div>

        {/* Showcase Panes (Controlled by Pure CSS) */}
        <div>
          {wires.map((wire) => (
            <div
              key={wire.id}
              className={`regional-pane-${wire.id} hidden grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-center bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(15,23,42,0.03)]`}
            >
              {/* Visual Container with True 16:9 Landscape Proportion */}
              <div className="relative w-full aspect-[16/9] min-h-[240px] sm:min-h-[280px] rounded-xl overflow-hidden bg-[#0B1120]">
                <Image
                  src={wire.image}
                  alt={wire.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-all duration-300"
                  priority={wire.id === "dawn"}
                />
                {/* Top right floating badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#065F46] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                    {wire.brandBadge}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                  <span className="bg-[#D1FAE5] text-[#065F46] text-[10px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase">
                    {wire.category}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    {wire.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-[1.35] mb-2.5">
                  {wire.title}
                </h3>

                <p className="text-[14.5px] sm:text-[15px] text-[#475569] leading-relaxed mb-4">
                  {wire.summary}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-[#E2E8F0]">
                  <a
                    href={wire.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:text-[#047857] hover:underline"
                  >
                    <span>Read Full Wire ({wire.sourceName}) &rarr;</span>
                  </a>
                  <span className="text-[11px] text-[#94A3B8] font-mono">
                    VERIFIED REGIONAL DISPATCH
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
