"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { BrandWireItem, brandWires } from "./knowledgeCenterData";
export type { BrandWireItem };
export { brandWires };

function safeImageUrl(url: string | undefined, fallback: string): string {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;
  if (trimmed.endsWith(".mp4") || trimmed.endsWith(".webm") || trimmed.includes(".mp4?") || trimmed.includes(".webm?")) {
    return fallback;
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }
  return `/${trimmed}`;
}

export default function BrandTechWires({ initialWires }: { initialWires?: BrandWireItem[] } = {}) {
  const [wires, setWires] = useState<BrandWireItem[]>(initialWires && initialWires.length > 0 ? initialWires : brandWires);
  const [activeBrandId, setActiveBrandId] = useState<string>("apple");

  useEffect(() => {
    fetch(`/api/live-news?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.brand_wires && typeof data.brand_wires === "object") {
          setWires((prev) =>
            prev.map((item) => {
              const live = data.brand_wires[item.id];
              if (!live) return item;
              return {
                ...item,
                title: live.title || item.title,
                summary: live.desc || live.summary || item.summary,
                date: live.date || item.date,
                link: live.link || item.link,
                img: safeImageUrl(live.img, item.img),
                cat: live.tag || live.category || item.cat,
              };
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-12 sm:py-14 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center max-w-[48rem] mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-1 rounded-full mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span className="text-[10.5px] font-semibold text-[#1E40AF] uppercase tracking-wider">
              LIVE 8-PROVIDER OFFICIAL RSS WIRE
            </span>
          </div>
          <h2 className="font-outfit font-bold text-2xl sm:text-3xl lg:text-[2.2rem] text-[#0F172A] tracking-tight m-0">
            Frontier AI &amp; Enterprise Tech Wires
          </h2>
        </div>

        {/* 8 Verified Provider Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {wires.map((brand) => {
            const isSelected = activeBrandId === brand.id;
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => setActiveBrandId(brand.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? "bg-[#0052FF] text-white shadow-sm ring-2 ring-[#0052FF]/20 scale-105"
                    : "bg-[#F7F6F5] text-[#5B6472] border border-[#E2E8F0] hover:bg-[#EFECE6] hover:text-[#0F172A]"
                }`}
              >
                <span>{brand.icon}</span>
                <span>{brand.name}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Cards */}
        <div>
          {wires.map((wire) => {
            const isSelected = activeBrandId === wire.id;
            return (
              <div
                key={wire.id}
                className={`${
                  isSelected ? "grid" : "hidden"
                } grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-center bg-[#F7F6F5] border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(15,23,42,0.03)]`}
              >
                {/* Visual Container */}
                <div className="relative w-full aspect-[16/9] min-h-[240px] sm:min-h-[280px] rounded-xl overflow-hidden bg-[#0B1120]">
                  {(() => {
                    const defaultProviderImg = brandWires.find((b) => b.id === wire.id)?.img || wire.img;
                    return (
                      <Image
                        src={safeImageUrl(wire.img, defaultProviderImg)}
                        alt={wire.title}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover object-center transition-all duration-300"
                        priority={wire.id === "apple" || wire.id === "google"}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (defaultProviderImg && !target.src.endsWith(defaultProviderImg)) {
                            target.src = defaultProviderImg;
                          }
                        }}
                      />
                    );
                  })()}
                  {/* Top right floating badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#0F172A] text-[11px] font-semibold px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                      {wire.brandBadge}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                    <span className="bg-[#DBEAFE] text-[#1E40AF] text-[10px] font-semibold px-2 py-0.5 rounded-[3px] uppercase tracking-wider">
                      {wire.cat}
                    </span>
                    <span className="text-xs text-[#5B6472]">
                      {wire.date}
                    </span>
                  </div>

                  <h3 className="font-outfit font-bold text-xl sm:text-2xl text-[#0F172A] leading-[1.35] mb-2.5 tracking-tight">
                    {wire.title}
                  </h3>

                  <p className="text-[14.5px] sm:text-[15px] text-[#5B6472] leading-relaxed mb-4">
                    {wire.summary}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-[#E2E8F0]">
                    <a
                      href={wire.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0052FF] hover:text-[#0043D6] hover:underline"
                    >
                      <span>Read Full Wire ({wire.name} Official) &rarr;</span>
                    </a>
                    <span className="text-[11px] text-[#94A3B8] font-semibold tracking-wider">
                      VERIFIED OFFICIAL LINK
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
