"use client";

import React, { useState } from "react";
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

const regionalWires: RegionalWireItem[] = [
  {
    id: "dawn",
    name: "Dawn Sci-Tech",
    icon: "🇵🇰",
    brandBadge: "🇵🇰 DAWN TECH",
    category: "PAKISTAN TECH & SCIENCE",
    date: "1 hour ago • Dawn Sci-Tech (Live RSS)",
    title:
      "Chinese robot beats Usain Bolt's 100m world record at Beijing games",
    summary:
      "A Chinese humanoid robot ran 100 metres in 9.39 seconds in a preliminary heat at the World Humanoid Robot Games in Beijing on Saturday, faster than the men's world record held by Jamaican sprinting great Usain Bolt. Tiangong Ultra, deve...",
    sourceName: "Dawn Sci-Tech",
    sourceUrl:
      "https://www.dawn.com/news/2024598/chinese-robot-beats-usain-bolts-100m-world-record-at-beijing-games",
    image: "/uploads/live_news/dawn_awncomnews2024598_b99d926180de.webp",
  },
  {
    id: "brecorder",
    name: "Business Recorder",
    icon: "📈",
    brandBadge: "🇵🇰 B-RECORDER",
    category: "PAKISTAN FINTECH & BUSINESS",
    date: "4 hours ago • Business Recorder (Live RSS)",
    title:
      "Putin says Ukraine opened 'Pandora's box' with strikes on economic targets",
    summary:
      "Russian President Vladimir Putin said in comments published on Saturday that Kyiv had opened “Pandora’s box” with its strikes on Russian economic targets, saying that Russia would hit back at Ukraine’s “most sensitive economic sectors”. ...",
    sourceName: "Business Recorder",
    sourceUrl:
      "https://www.brecorder.com/news/40436083/putin-says-ukraine-opened-pandoras-box-with-strikes-on-economic-targets",
    image: "/uploads/live_news/brecorder_ercomnews40436083_44ece3e9dffe.webp",
  },
  {
    id: "propakistani",
    name: "ProPakistani",
    icon: "📱",
    brandBadge: "🇵🇰 PROPAKISTANI",
    category: "PAKISTAN DIGITAL ECOSYSTEM",
    date: "3 hours ago • ProPakistani (Live RSS)",
    title: "Pakistan Railways to Restore 2 More Trains",
    summary:
      "Federal Minister for Railways Muhammad Hanif Abbasi has announced plans to restore two more train services as part of the ongoing infrastructure modernization and digital ticketing upgrades.",
    sourceName: "ProPakistani",
    sourceUrl:
      "https://propakistani.pk/2026/08/22/pakistan-railways-to-restore-2-more-trains/",
    image: "/uploads/live_news/propakistani_istanipkp1069238_d4d8a8289228.jpg",
  },
  {
    id: "tribune",
    name: "The Express Tribune",
    icon: "🚀",
    brandBadge: "🇵🇰 TRIBUNE",
    category: "PAKISTAN AEROSPACE & TECH",
    date: "9 hours ago • The Express Tribune (Live RSS)",
    title:
      "Let there be sunlight: Vatican plans solar and agriculture plant to cover its electricity needs",
    summary:
      "The Vatican has announced plans to construct a state-of-the-art solar and sustainable agricultural plant designed to cover 100% of its electrical and environmental power requirements.",
    sourceName: "The Express Tribune",
    sourceUrl:
      "https://tribune.com.pk/story/2625274/let-there-be-sunlight-vatican-plans-solar-and-agriculture-plant-to-cover-its-electricity-needs",
    image: "/uploads/live_news/tribune_necompkp2625274_562e6126ce44.jpg",
  },
];

export default function RegionalTechEcosystem() {
  const [selectedTab, setSelectedTab] = useState("dawn");
  const activeStory =
    regionalWires.find((item) => item.id === selectedTab) || regionalWires[0];

  return (
    <section className="w-full py-12 sm:py-14 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center max-w-[48rem] mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 rounded-full mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
            <span className="text-[10.5px] font-bold text-[#065F46] uppercase tracking-[0.06em]">
              LIVE PAKISTANI MEDIA RSS SYNC
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-[#0F172A] tracking-[-0.02em] m-0">
            Pakistan &amp; Regional Tech Ecosystem
          </h2>
        </div>

        {/* 4 Pakistani Media Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {regionalWires.map((tab) => {
            const isActive = tab.id === selectedTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#059669] text-white shadow-[0_4px_6px_-1px_rgba(5,150,105,0.3)]"
                    : "bg-white text-[#475569] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Regional Story Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-center bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          {/* Visual Container */}
          <div className="relative w-full aspect-[16/9] min-h-[240px] sm:min-h-[280px] rounded-xl overflow-hidden bg-[#0B1120]">
            <Image
              src={activeStory.image}
              alt={activeStory.title}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center transition-all duration-300"
              priority
            />
            {/* Top right floating badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#065F46] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                {activeStory.brandBadge}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
              <span className="bg-[#D1FAE5] text-[#065F46] text-[10px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase">
                {activeStory.category}
              </span>
              <span className="text-xs text-[#64748B]">
                {activeStory.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-[1.35] mb-2.5">
              {activeStory.title}
            </h3>

            <p className="text-[14.5px] sm:text-[15px] text-[#475569] leading-relaxed mb-4">
              {activeStory.summary}
            </p>

            <div>
              <a
                href={activeStory.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#059669] hover:text-[#047857] hover:underline transition-colors"
              >
                <span>Read Original on {activeStory.sourceName}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
