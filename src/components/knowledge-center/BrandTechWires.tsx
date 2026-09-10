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
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }
  return `/${trimmed}`;
}

export default function BrandTechWires({ initialWires }: { initialWires?: BrandWireItem[] } = {}) {
  const [wires, setWires] = useState<BrandWireItem[]>(initialWires && initialWires.length > 0 ? initialWires : brandWires);

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
      {/* Hidden Radio Buttons for Pure CSS Tabs (Zero useState, Zero JS) */}
      {wires.map((brand, i) => (
        <input
          key={brand.id}
          type="radio"
          name="brand-tab"
          id={`brand-tab-${brand.id}`}
          defaultChecked={i === 0}
          className="hidden"
        />
      ))}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center max-w-[48rem] mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-1 rounded-full mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span className="text-[10.5px] font-bold text-[#1E40AF] uppercase tracking-[0.06em]">
              LIVE 8-PROVIDER OFFICIAL RSS WIRE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-[#0F172A] tracking-[-0.02em] m-0">
            Frontier AI &amp; Enterprise Tech Wires
          </h2>
        </div>

        {/* 8 Verified Provider Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {wires.map((brand) => (
            <label
              key={brand.id}
              htmlFor={`brand-tab-${brand.id}`}
              className={`brand-btn-${brand.id} inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer select-none bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]`}
            >
              <span>{brand.icon}</span>
              <span>{brand.name}</span>
            </label>
          ))}
        </div>

        {/* Showcase Cards (Controlled by Pure CSS) */}
        <div>
          {wires.map((wire) => (
            <div
              key={wire.id}
              className={`brand-pane-${wire.id} hidden grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(15,23,42,0.03)]`}
            >
              {/* Visual Container */}
              <div className="relative w-full aspect-[16/9] min-h-[240px] sm:min-h-[280px] rounded-xl overflow-hidden bg-[#0B1120]">
                <Image
                  src={safeImageUrl(wire.img, "/uploads/live_news/apple_iphone16_hero.jpg")}
                  alt={wire.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-all duration-300"
                  priority={wire.id === "google"}
                />
                {/* Top right floating badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#0F172A] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                    {wire.brandBadge}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                  <span className="bg-[#DBEAFE] text-[#1E40AF] text-[10px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase">
                    {wire.cat}
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
                    href={wire.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052FF] hover:text-[#0043D6] hover:underline"
                  >
                    <span>Read Full Wire ({wire.name} Official) &rarr;</span>
                  </a>
                  <span className="text-[11px] text-[#94A3B8] font-mono">
                    VERIFIED WIRE
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
