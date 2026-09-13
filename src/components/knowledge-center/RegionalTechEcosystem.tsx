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
    date: "Dawn Sci-Tech (Live Wire)",
    title: "Anthropic boss calls for AI slowdown, Altman and Musk agree",
    summary:
      "Dario Amodei, the CEO of Claude maker Anthropic, has joined rival tech executives calling for a measured approach to frontier model capabilities, cautioning against rushed deployments.",
    sourceName: "Dawn Sci-Tech",
    sourceUrl: "https://www.dawn.com/news/2029312/anthropic-boss-calls-for-ai-slowdown-altman-and-musk-agree",
    image: "/uploads/live_news/dawn_anthropic_slowdown.webp",
  },
  {
    id: "brecorder",
    name: "Business Recorder",
    icon: "📈",
    brandBadge: "🇵🇰 B-RECORDER",
    category: "PAKISTAN FINTECH & BUSINESS",
    date: "Business Recorder (Live Wire)",
    title: "Anthropic CEO urges AI companies to slow model development amid fears over misuse",
    summary:
      "Anthropic CEO Dario Amodei has urged frontier artificial intelligence companies to slow development of high-risk capabilities, emphasizing biological risk and cyber defense concerns.",
    sourceName: "Business Recorder",
    sourceUrl: "https://www.brecorder.com/news/40439167/anthropic-ceo-urges-ai-companies-to-slow-model-development-amid-fears-over-misuse",
    image: "/uploads/live_news/brecorder_anthropic_slowdown.webp",
  },
  {
    id: "propakistani",
    name: "ProPakistani",
    icon: "📱",
    brandBadge: "🇵🇰 PROPAKISTANI",
    category: "PAKISTAN DIGITAL ECOSYSTEM",
    date: "ProPakistani (Live Wire)",
    title: "Even iPhone Duo Does Not Fix The Biggest Problems With Foldables",
    summary:
      "Hardware engineers explore Apple's dual-display and foldable patent innovations, evaluating hinge durability, display creasing, and operating system multitasking optimizations.",
    sourceName: "ProPakistani",
    sourceUrl: "https://propakistani.pk/2026/09/12/even-iphone-duo-does-not-fix-the-biggest-problems-with-foldables/",
    image: "/uploads/live_news/propakistani_iphone_duo.jpg",
  },
  {
    id: "tribune",
    name: "The Express Tribune",
    icon: "🚀",
    brandBadge: "🇵🇰 TRIBUNE",
    category: "PAKISTAN AEROSPACE & TECH",
    date: "The Express Tribune (Live Wire)",
    title: "China, Iran among countries that have used AI to aid spying, Anthropic says",
    summary:
      "Foreign state-linked intelligence operatives have increasingly attempted to leverage frontier AI systems for automated vulnerability discovery, social engineering, and cyber espionage, according to an Anthropic threat report.",
    sourceName: "The Express Tribune",
    sourceUrl: "https://tribune.com.pk/story/2628789/china-iran-among-countries-that-have-used-ai-to-aid-spying-anthropic-says",
    image: "/uploads/live_news/tribune_anthropic_spying.jpg",
  },
];

export type { RegionalWireItem };
export { INITIAL_REGIONAL_WIRES };

export default function RegionalTechEcosystem({ initialWires }: { initialWires?: RegionalWireItem[] } = {}) {
  const [wires, setWires] = useState<RegionalWireItem[]>(initialWires && initialWires.length > 0 ? initialWires : INITIAL_REGIONAL_WIRES);
  const [activeWireId, setActiveWireId] = useState<string>("dawn");
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
        const order = ["dawn", "brecorder", "propakistani", "tribune"];
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
              image: (() => {
                const img = (item.image || item.img || "").trim();
                if (!img) return "/uploads/live_news/dawn_it_exports_headline.png";
                if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) return img;
                return `/${img}`;
              })(),
            });
          }
        }
        if (updated.length > 0) {
          setWires(updated);
        }
      }
    } catch {
      // Keep existing wires
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRegionalWires(false);
    const interval = setInterval(() => fetchRegionalWires(false), 30000);
    return () => clearInterval(interval);
  }, []);

  const activeWire = wires.find((w) => w.id === activeWireId) || wires[0];

  return (
    <section className="w-full py-12 sm:py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[10.5px] font-bold text-[#065F46] uppercase tracking-wider">
              REGIONAL INTELLIGENCE WIRE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-[#0F172A] tracking-[-0.02em] m-0">
            Pakistan Regional Tech Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-2 max-w-xl">
            Live technological transformation, fintech advancements, and venture capital flows across Pakistan's digital economy.
          </p>
        </div>

        {/* Regional Provider Selector */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-8">
          {wires.map((wire) => {
            const isSelected = wire.id === activeWireId;
            return (
              <button
                key={wire.id}
                type="button"
                onClick={() => setActiveWireId(wire.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? "bg-[#059669] text-white shadow-sm ring-2 ring-[#059669]/30 scale-105"
                    : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                }`}
              >
                <span>{wire.icon}</span>
                <span>{wire.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Regional Card */}
        {activeWire && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
            <div className="lg:col-span-5 aspect-[16/10] bg-[#0B1120] rounded-xl overflow-hidden relative">
              <img
                src={activeWire.image}
                alt={activeWire.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/uploads/live_news/apple_iphone16_hero.jpg";
                }}
              />
              <span className="absolute top-3 left-3 bg-[#059669] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase">
                {activeWire.brandBadge}
              </span>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2 font-mono">
                  <span className="font-bold text-[#059669]">● {activeWire.date}</span>
                  <span>•</span>
                  <span>{activeWire.sourceName}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-tight mb-3">
                  {activeWire.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  {activeWire.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                <a
                  href={activeWire.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#059669] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Read Official Source ({activeWire.sourceName}) &rarr;</span>
                </a>
                <span className="text-[10px] text-[#94A3B8] uppercase font-mono">
                  Verified Ecosystem Wire
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
