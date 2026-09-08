"use client";

import React from "react";
import { TelemetryData } from "@/types/admin";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  inquiriesCount: number;
  articlesCount: number;
  videosCount: number;
  testimonialsCount: number;
  reviewsPendingCount: number;
  candidatesCount: number;
  subscribersCount: number;
  portfolioCount: number;
  telemetry: TelemetryData | null;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  inquiriesCount,
  articlesCount,
  videosCount,
  testimonialsCount,
  reviewsPendingCount,
  candidatesCount,
  subscribersCount,
  portfolioCount,
  telemetry,
}: AdminSidebarProps) {
  const tabs = [
    { id: "dashboard", label: "Executive Dashboard", icon: "📊" },
    { id: "inquiries", label: "Contact Inquiries", icon: "💬", count: inquiriesCount, badgeColor: "bg-[#0052FF]/20 text-[#38BDF8]" },
    { id: "vision_requests", label: "Vision Scoping Requests", icon: "🎯" },
    { id: "articles", label: "Knowledge Articles", icon: "📚", count: articlesCount, badgeColor: "bg-blue-900/50 text-blue-200" },
    { id: "videos", label: "Video Library", icon: "🎥", count: videosCount, badgeColor: "bg-orange-950 text-[#FF6B00]" },
    { id: "news_wire", label: "Tech Wire News", icon: "📰" },
    { id: "reviews", label: "Client Testimonials", icon: "⭐", count: testimonialsCount, badgeColor: "bg-amber-950 text-amber-300" },
    { id: "article_reviews", label: "Article Moderation", icon: "✍️", count: reviewsPendingCount > 0 ? `${reviewsPendingCount} Pending` : undefined, badgeColor: "bg-[#10B981] text-white" },
    { id: "applicants", label: "Talent Pool / Careers", icon: "💼", count: candidatesCount, badgeColor: "bg-indigo-950 text-indigo-300" },
    { id: "subscribers", label: "Newsletter Leads", icon: "📧", count: subscribersCount, badgeColor: "bg-emerald-950 text-emerald-300" },
    { id: "portfolio", label: "Portfolio Projects", icon: "💼", count: portfolioCount, badgeColor: "bg-purple-950 text-purple-300" },
    { id: "website_settings", label: "Website Settings", icon: "🌐" },
    { id: "settings", label: "System & Security", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-[#0B1120] text-[#94A3B8] flex flex-col p-4 border-r border-[#1E293B] select-none flex-shrink-0">
      <div className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase px-3 mb-2">
        CONTROL MODULES
      </div>

      <nav className="flex flex-col gap-1 overflow-y-auto pr-1 flex-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs rounded transition-colors text-left font-medium cursor-pointer ${
              activeTab === t.id
                ? "bg-[#0052FF] text-white font-semibold shadow"
                : "hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.count !== undefined && (
              <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded font-bold ${t.badgeColor || "bg-gray-800 text-gray-200"}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Telemetry Footnote */}
      <div className="mt-auto pt-3 border-t border-[#1E293B] text-[11px] text-[#64748B] flex flex-col gap-1 font-mono">
        <div className="flex justify-between">
          <span>Cluster:</span>
          <span className="text-emerald-400 font-bold">PG18 Online</span>
        </div>
        <div className="flex justify-between">
          <span>Heap:</span>
          <span className="text-white">{telemetry?.memoryHeapUsedMB || 160} MB</span>
        </div>
      </div>
    </aside>
  );
}
