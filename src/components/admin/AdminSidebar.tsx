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
  founderProposalsCount?: number;
  securityReportsCount?: number;
  visionRequestsCount?: number;
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
  founderProposalsCount = 0,
  securityReportsCount = 0,
  visionRequestsCount = 0,
  subscribersCount,
  portfolioCount,
  telemetry,
}: AdminSidebarProps) {
  const tabs = [
    { id: "dashboard", label: "Executive Dashboard", icon: "📊" },
    { id: "inquiries", label: "Contact Inquiries", icon: "💬", count: inquiriesCount, badgeColor: "bg-orange-50 text-[#FF6B00] border border-orange-200" },
    { id: "security_reports", label: "Security & Complaints", icon: "🛡️", count: securityReportsCount, badgeColor: "bg-red-50 text-red-600 border border-red-200" },
    { id: "vision_requests", label: "Vision Scoping Requests", icon: "🎯", count: visionRequestsCount, badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
    { id: "articles", label: "Knowledge Articles", icon: "📚", count: articlesCount, badgeColor: "bg-blue-50 text-blue-700 border border-blue-200" },
    { id: "videos", label: "Video Library", icon: "🎥", count: videosCount, badgeColor: "bg-orange-50 text-[#FF6B00] border border-orange-200" },
    { id: "news_wire", label: "Tech Wire News", icon: "📰" },
    { id: "reviews", label: "Client Testimonials", icon: "⭐", count: testimonialsCount, badgeColor: "bg-amber-50 text-amber-700 border border-amber-200" },
    {
      id: "article_reviews",
      label: "Article Reviews Moderation",
      icon: "✍️",
      count: reviewsPendingCount > 0 ? `${reviewsPendingCount} Pending` : "All Clear",
      badgeColor: reviewsPendingCount > 0 ? "bg-[#EF4444] text-white" : "bg-emerald-100 text-emerald-800 border border-emerald-200"
    },
    { id: "applicants", label: "Talent Pool / Careers", icon: "💼", count: candidatesCount, badgeColor: "bg-indigo-50 text-indigo-700 border border-indigo-200" },
    { id: "founder_proposals", label: "Founder Proposals", icon: "🔥", count: founderProposalsCount, badgeColor: "bg-orange-50 text-[#FF6B00] border border-orange-200" },
    { id: "subscribers", label: "Newsletter Leads", icon: "📧", count: subscribersCount, badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
    { id: "email_templates", label: "Email Management", icon: "✉️" },
    { id: "website_settings", label: "Website Settings", icon: "🌐" },
    { id: "settings", label: "System & Security", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-[#F7F6F5] text-slate-700 flex flex-col p-4 border-r border-[#E2E8F0] select-none flex-shrink-0 relative overflow-hidden font-sans">
      {/* Ambient Orange Radial Glow at top-left matching main site */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255, 107, 0, 0.08) 0%, rgba(255, 107, 0, 0.01) 50%, transparent 80%)",
        }}
      />

      {/* Header Brand Sub-Bar */}
      <div className="relative z-10 px-3 py-2 mb-3 flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.7)] animate-pulse" />
          <span className="text-[11px] font-extrabold tracking-wider text-[#0F172A] font-outfit uppercase">
            Control <span className="text-[#FF6B00]">Center</span>
          </span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-[#FF6B00] border border-orange-500/20 font-semibold shadow-[0_0_8px_rgba(255,107,0,0.1)]">
          CMS 2.0
        </span>
      </div>

      <div className="relative z-10 text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 mb-2 font-outfit">
        MODULES
      </div>

      <nav className="relative z-10 flex flex-col gap-1 overflow-y-auto pr-1 flex-1 custom-scrollbar">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl transition-all duration-200 text-left font-medium cursor-pointer relative group ${
                isActive
                  ? "bg-white text-[#FF6B00] font-bold border border-orange-300 shadow-[0_2px_10px_rgba(255,107,0,0.12)]"
                  : "text-slate-600 hover:text-[#0F172A] hover:bg-white/80 border border-transparent"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#FF6B00] rounded-r-full shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
              )}
              <span className="text-sm transition-transform duration-200 group-hover:scale-110">{t.icon}</span>
              <span className="truncate">{t.label}</span>
              {t.count !== undefined && (
                <span
                  className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold transition-all ${
                    isActive
                      ? "bg-orange-500/15 text-[#FF6B00] border border-orange-500/30"
                      : t.badgeColor || "bg-[#EBECEF] text-slate-600"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Telemetry Footnote with Soft Glow */}
      <div className="relative z-10 mt-auto pt-3">
        <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-xs text-[11px] font-mono text-slate-500 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-600">DB Cluster:</span>
            </span>
            <span className="text-[#0F172A] font-bold">PG18 :5433</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500">Node Memory:</span>
            <span className="text-slate-800 font-semibold">{telemetry?.memoryHeapUsedMB || 160} MB</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
