"use client";

import React, { useState } from "react";
import Image from "next/image";

interface NewsStory {
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
}

const newsStories: NewsStory[] = [
  {
    provider: "google",
    tag: "GOOGLE AI & DEVICES",
    providerLabel: "🌐 GOOGLE • AI & DEVICES",
    providerColor: "#0052FF",
    date: "1 day ago • Google The Keyword (Live RSS)",
    source: "Google The Keyword",
    title:
      "Enter Google Play's sweepstakes to win legendary experiences and collectibles with your Play Points.",
    desc: "Redeem Google Play Points in the sweepstakes to win a trip to New York Comic Con, rare collectibles, gaming gear, and more.",
    link: "https://blog.google/products-and-platforms/platforms/google-play/google-play-sweepstakes/",
    img: "/uploads/live_news/google_le-play-sweepstakes_4683461c45eb.webp",
  },
  {
    provider: "microsoft",
    tag: "ENTERPRISE CLOUD & AI",
    providerLabel: "🪟 MICROSOFT • CLOUD & COPILOT",
    providerColor: "#00A4EF",
    date: "1 day ago • Microsoft News Center (Live RSS)",
    source: "Microsoft News Center",
    title: "Reflections on the 5th anniversary of Windows 365",
    desc: "Windows 365 turns five: cloud PCs enable secure, scalable enterprise workspaces across distributed global teams.",
    link: "https://blogs.windows.com/windowsexperience/2026/08/20/windows-365-turns-five-cloud-pcs-enable-workspaces-at-scale/",
    img: "/uploads/live_news/microsoft_comsourcep25445_a569df1c5e5e.png",
  },
  {
    provider: "nvidia",
    tag: "ACCELERATED COMPUTING & AI",
    providerLabel: "⚡ NVIDIA • ACCELERATED AI",
    providerColor: "#059669",
    date: "2 days ago • NVIDIA Official Blog (Live RSS)",
    source: "NVIDIA Official Blog",
    title:
      "Bring the Fire: Play Games on GeForce NOW With New Firefox Browser Support",
    desc: "GeForce NOW welcomes Firefox support to the cloud, opening up high-performance PC gaming straight from the browser.",
    link: "https://blogs.nvidia.com/blog/geforce-now-thursday-firefox/",
    img: "/uploads/live_news/nvidia_nvidiacomp97798_23872e9ee67b.jpg",
  },
  {
    provider: "intel",
    tag: "NEXT-GEN SILICON & SEMICONDUCTORS",
    providerLabel: "🔷 INTEL • NEXT-GEN SILICON",
    providerColor: "#0071C5",
    date: "2 days ago • Intel Newsroom (Live RSS)",
    source: "Intel Newsroom",
    title: "Six in 10 Leaders Bet Big on Robots. Only Four in 10 Are Ready.",
    desc: "Six in 10 senior business and IT leaders, robotics specialists, and government officials expect their organizations to operate robot fleets within five years.",
    link: "https://newsroom.intel.com/artificial-intelligence/6-in-10-leaders-bet-big-on-robots-only-4-in-10-are-ready",
    img: "/uploads/live_news/intel_omintelcomp9107_95f0081c1ff8.webp",
  },
  {
    provider: "openai",
    tag: "GENERATIVE AI & REASONING",
    providerLabel: "🤖 OPENAI • AI REASONING",
    providerColor: "#7C3AED",
    date: "2 days ago • OpenAI Newsroom (Live RSS)",
    source: "OpenAI Newsroom",
    title: "Introducing AI Futures",
    desc: "Introducing AI Futures, exploring how transformative AI systems could reshape power, governance, the economy, and individual freedom.",
    link: "https://openai.com/index/introducing-ai-futures",
    img: "/uploads/live_news/openai_troducing-ai-futures_4571444e8abb.png",
  },
  {
    provider: "meta",
    tag: "OPEN SOURCE AI & INFRASTRUCTURE",
    providerLabel: "♾️ META • OPEN SOURCE AI",
    providerColor: "#0081FB",
    date: "3 days ago • Meta Newsroom (Live RSS)",
    source: "Meta Newsroom",
    title:
      "Launching 'Meta Startup School' to Accelerate Growth For Early-Stage Startups",
    desc: "We are launching Meta Startup School, a three-month programme designed to help early-stage consumer brands accelerate growth.",
    link: "https://about.fb.com/news/2026/08/launching-meta-startup-school-to-accelerate-growth-for-early-stage-startups/",
    img: "/uploads/live_news/meta_boutfbcomp49978_e466d8d14977.webp",
  },
  {
    provider: "apple",
    tag: "HARDWARE & SILICON",
    providerLabel: "🍎 APPLE • HARDWARE & SILICON",
    providerColor: "#0284C7",
    date: "4 days ago • Apple Newsroom (Live RSS)",
    source: "Apple Newsroom",
    title: "Apple announces changes for apps in the European Union",
    desc: "Apple announces changes for apps in the European Union in compliance with regional regulations and standards.",
    link: "https://www.apple.com/newsroom/2026/08/apple-announces-changes-for-apps-in-the-european-union/",
    img: "/uploads/live_news/apple_-the-european-union_9b5b740d847f.jpg",
  },
];

export default function LatestTechNews() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentStory = newsStories[activeIdx];

  // Right list contains stories except currently featured (or all 6 companion stories)
  // Matching prototype: items 1..6 are listed on the right
  const companionStories = newsStories.slice(1, 7);

  return (
    <section className="w-full py-12 sm:py-14 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b-2 border-[#E2E8F0]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-[#EF4444] text-white text-[10px] font-extrabold px-2 py-1 rounded-[2px] tracking-[0.08em] uppercase">
              LIVE BREAKING NEWS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold text-[#0F172A] m-0 tracking-[-0.02em]">
              Latest IT &amp; Business Intelligence
            </h2>
          </div>
          <span className="text-[11.5px] text-[#64748B] font-mono font-semibold">
            ⚡ REAL-TIME ENTERPRISE RSS SYNC
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[7.5fr_4.5fr] gap-6 lg:gap-8 items-start">
          {/* Left Main Breaking Card (Interactive Display) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col w-full">
            {/* Visual Container with True 16:9 Landscape Proportion */}
            <div className="relative w-full aspect-[16/9] bg-[#0B1120] overflow-hidden">
              <Image
                src={currentStory.img}
                alt={currentStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center transition-all duration-300"
                priority
              />
              <span className="absolute top-4 left-4 bg-[#0052FF] text-white text-[10.5px] font-bold px-2.5 py-1 rounded-[2px] uppercase tracking-[0.05em] shadow-sm z-10">
                {currentStory.tag}
              </span>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2 flex-wrap font-medium">
                <span>{currentStory.date}</span>
                <span>•</span>
                <span>{currentStory.source}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-[1.35] mb-2.5">
                {currentStory.title}
              </h3>

              <p className="text-[14.5px] sm:text-[15px] text-[#475569] leading-relaxed mb-5">
                {currentStory.desc}
              </p>

              <div className="mt-auto flex items-center justify-between flex-wrap gap-2.5 pt-2 border-t border-[#F1F5F9]">
                <a
                  href={currentStory.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-[#0052FF] hover:text-[#0043D6] hover:underline inline-flex items-center gap-1 transition-colors"
                >
                  Read Full Wire &rarr;
                </a>
                <span className="text-[11px] text-[#94A3B8] font-mono tracking-wider">
                  VERIFIED BY LABS
                </span>
              </div>
            </div>
          </div>

          {/* Right 6 Stacked Stories (Clickable to switch main featured story) */}
          <div className="flex flex-col gap-3 w-full">
            {companionStories.map((story, i) => {
              const actualIdx = i + 1;
              const isSelected = activeIdx === actualIdx;
              return (
                <div
                  key={story.title}
                  onClick={() => setActiveIdx(actualIdx)}
                  className={`bg-white border rounded-[10px] p-3 cursor-pointer transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] w-full box-border ${
                    isSelected
                      ? "border-[#0052FF] ring-1 ring-[#0052FF]/20 -translate-y-[1px]"
                      : "border-[#E2E8F0] hover:border-[#0052FF] hover:-translate-y-[1px]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[60px] h-[60px] rounded-[6px] overflow-hidden bg-[#0B1120] shrink-0 relative">
                      <Image
                        src={story.img}
                        alt={story.title}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[9.5px] font-extrabold uppercase tracking-[0.04em] block mb-0.5 truncate"
                        style={{ color: story.providerColor }}
                      >
                        {story.providerLabel}
                      </span>
                      <h4 className="text-[13.5px] font-bold text-[#0F172A] leading-[1.3] mb-1 line-clamp-2">
                        {story.title}
                      </h4>
                      <span className="text-[10.5px] text-[#64748B] block">
                        {story.date}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
