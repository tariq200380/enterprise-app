"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  RegionalWireItem,
  INITIAL_REGIONAL_WIRES,
} from "./knowledgeCenterData";

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
        setWires((prev) => {
          return order
            .map((key) => {
              const item = data.regional_wires[key];
              const existing = prev.find((w) => w.id === key);
              if (item) {
                const rawImg = (item.image || item.img || "").trim();
                const finalImg =
                  rawImg.startsWith("http://") || rawImg.startsWith("https://") || rawImg.startsWith("/")
                    ? rawImg
                    : `/${rawImg}`;
                return {
                  id: key,
                  name: item.name || existing?.name || key.toUpperCase(),
                  icon: item.icon || existing?.icon || "🇵🇰",
                  brandBadge: item.brandBadge || existing?.brandBadge || `🇵🇰 ${key.toUpperCase()}`,
                  category: item.category || existing?.category || "PAKISTAN TECH",
                  date: item.date || existing?.date || "Live Wire",
                  title: item.title || existing?.title || "",
                  summary: item.summary || existing?.summary || "",
                  sourceName: item.sourceName || existing?.sourceName || item.name,
                  sourceUrl: item.sourceUrl || existing?.sourceUrl || "#",
                  image: finalImg || existing?.image || "/uploads/live_news/apple_iphone16_hero.jpg",
                };
              }
              return existing || INITIAL_REGIONAL_WIRES.find((w) => w.id === key)!;
            })
            .filter(Boolean);
        });
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
    <section className="w-full py-12 sm:py-16 bg-[#F7F6F5] border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[10.5px] font-semibold text-[#065F46] uppercase tracking-wider">
              REGIONAL INTELLIGENCE WIRE
            </span>
          </div>
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-[#0F172A] tracking-tight m-0">
            Pakistan Regional Tech Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6472] mt-2 max-w-xl font-normal">
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? "bg-[#059669] text-white shadow-sm ring-2 ring-[#059669]/30 scale-105"
                    : "bg-white text-[#5B6472] border border-[#E2E8F0] hover:bg-[#EFECE6] hover:text-[#0F172A]"
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
              <span className="absolute top-3 left-3 bg-[#059669] text-white text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded shadow-sm uppercase">
                {activeWire.brandBadge}
              </span>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#5B6472] mb-2">
                  <span className="font-semibold text-[#059669]">● {activeWire.date}</span>
                  <span>•</span>
                  <span>{activeWire.sourceName}</span>
                </div>
                <h3 className="font-outfit text-xl sm:text-2xl font-bold text-[#0F172A] leading-tight tracking-tight mb-3">
                  {activeWire.title}
                </h3>
                <p className="text-sm text-[#5B6472] leading-relaxed mb-6 font-normal">
                  {activeWire.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                <a
                  href={activeWire.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#059669] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Read Official Source ({activeWire.sourceName}) &rarr;</span>
                </a>
                <span className="text-[10px] text-[#94A3B8] uppercase font-semibold tracking-wider">
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
