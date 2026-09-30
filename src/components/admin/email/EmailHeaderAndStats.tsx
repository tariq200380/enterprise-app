"use client";

import React from "react";
import { Inquiry } from "@/types/admin";

interface EmailHeaderAndStatsProps {
  profilesCount: number;
  inquiries: Inquiry[];
  activeSubTab: "desks" | "inquiries" | "smtp";
  setActiveSubTab: (tab: "desks" | "inquiries" | "smtp") => void;
  setInquiryFilter: (filter: "ALL" | "NEW" | "RESPONDED") => void;
  isSmtpConfigured: boolean;
  smtpHost: string;
  onReplyClick: () => void;
  onAddBusinessEmail: () => void;
}

export const EmailHeaderAndStats: React.FC<EmailHeaderAndStatsProps> = ({
  profilesCount,
  inquiries,
  activeSubTab,
  setActiveSubTab,
  setInquiryFilter,
  isSmtpConfigured,
  smtpHost,
  onReplyClick,
  onAddBusinessEmail,
}) => {
  const pendingCount = inquiries.filter(
    (i) => i.status === "NEW" || i.status === "PENDING"
  ).length;

  return (
    <>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 text-slate-900 shadow-xs relative overflow-hidden select-none">
        {/* Ambient Orange Radial Glow matching main site */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 85% 25%, rgba(255, 107, 0, 0.08) 0%, rgba(255, 107, 0, 0.015) 50%, transparent 75%)",
          }}
        />

        <div className="relative z-10 flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center text-2xl shadow-xs shrink-0">
            ✉️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight m-0 text-slate-900 font-outfit flex items-center gap-2">
              <span>Enterprise Email Management &amp; Operations</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-600 mt-1 max-w-2xl leading-relaxed font-normal">
              Centralized operations hub to manage multi-department business emails (support@, security@, solutions@, desk5@), custom branded HTML formats, SMTP connection, and replying to client inquiries.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 flex-wrap shrink-0">
          {/* Main Action Button for replying to inquiries */}
          <button
            type="button"
            onClick={onReplyClick}
            className="px-4 py-2.5 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-2 shadow-[0_2px_12px_rgba(255,107,0,0.28)] shrink-0 active:scale-95"
            title="Open incoming client inquiries to send branded replies"
          >
            <span>💬</span>
            <span>Reply to Inquiries</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-[#FF6B00] shadow-xs">
                {pendingCount} New
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onAddBusinessEmail}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <span className="text-orange-600 font-black">➕</span>
            <span>Add Business Email</span>
          </button>
        </div>
      </div>

      {/* Quick Status Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveSubTab("desks")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
            activeSubTab === "desks"
              ? "bg-white border-orange-400 shadow-[0_4px_16px_rgba(255,107,0,0.15)] ring-2 ring-orange-400/20"
              : "bg-white border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm"
          }`}
        >
          <div className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-xs">🏢</span>
              <span>Business Desks</span>
            </span>
            {activeSubTab === "desks" && (
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">{profilesCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Configured Email Profiles</div>
        </div>

        <div
          onClick={() => setActiveSubTab("inquiries")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
            activeSubTab === "inquiries"
              ? "bg-white border-orange-400 shadow-[0_4px_16px_rgba(255,107,0,0.15)] ring-2 ring-orange-400/20"
              : "bg-white border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm"
          }`}
        >
          <div className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-xs">💬</span>
              <span>Client Inquiries</span>
            </span>
            {activeSubTab === "inquiries" && (
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">{inquiries.length}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Total Inbound Leads</div>
        </div>

        <div
          onClick={() => {
            setActiveSubTab("inquiries");
            setInquiryFilter("NEW");
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
            pendingCount > 0
              ? "bg-gradient-to-br from-amber-50 to-orange-50/60 border-amber-300 hover:border-amber-400 shadow-xs ring-1 ring-amber-400/20"
              : "bg-white border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm"
          }`}
        >
          <div className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100/80 flex items-center justify-center text-xs">⏳</span>
              <span>Pending Replies</span>
            </span>
            {pendingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-900 font-outfit">
            {pendingCount}
          </div>
          <div className="text-xs text-amber-700 mt-1 font-medium">Ready for immediate response</div>
        </div>

        <div
          onClick={() => setActiveSubTab("smtp")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
            activeSubTab === "smtp"
              ? "bg-white border-orange-400 shadow-[0_4px_16px_rgba(255,107,0,0.15)] ring-2 ring-orange-400/20"
              : "bg-white border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm"
          }`}
        >
          <div className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-xs">⚙️</span>
              <span>SMTP Server</span>
            </span>
            {activeSubTab === "smtp" && (
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            )}
          </div>
          <div className="text-sm font-bold flex items-center gap-2 mt-1 text-slate-900">
            <span
              className={`w-2.5 h-2.5 rounded-full inline-block ${
                isSmtpConfigured ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="font-outfit">{isSmtpConfigured ? "Connected & Active" : "Local Simulation"}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-medium font-mono truncate">
            {smtpHost || "mail.server"}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200 p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveSubTab("desks")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "desks"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_12px_rgba(255,107,0,0.3)]"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/90"
          }`}
        >
          <span>🏢</span>
          <span>Business Email Desks &amp; Formats ({profilesCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("inquiries")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "inquiries"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_12px_rgba(255,107,0,0.3)]"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/90"
          }`}
        >
          <span>💬</span>
          <span>Client Inquiries &amp; Quick Reply</span>
          {pendingCount > 0 ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950 shadow-2xs">
              {pendingCount} New
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200/80 text-slate-700">
              {inquiries.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("smtp")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "smtp"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_12px_rgba(255,107,0,0.3)]"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/90"
          }`}
        >
          <span>⚙️</span>
          <span>SMTP Server Settings</span>
          <span
            className={`w-2 h-2 rounded-full inline-block ${
              isSmtpConfigured ? "bg-emerald-500" : "bg-amber-500"
            }`}
            title={isSmtpConfigured ? "SMTP Connected" : "Local Mode"}
          />
        </button>
      </div>
    </>
  );
};
