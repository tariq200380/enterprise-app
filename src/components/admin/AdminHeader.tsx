"use client";

import React from "react";
import Link from "next/link";
import { TelemetryData } from "@/types/admin";

interface AdminHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  telemetry: TelemetryData | null;
  onLogout?: () => void;
  userEmail?: string;
}

export default function AdminHeader({
  searchQuery,
  setSearchQuery,
  telemetry,
  onLogout,
  userEmail,
}: AdminHeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-md text-[#0F172A] px-6 sm:px-8 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between flex-wrap gap-4 select-none sticky top-0 z-40 shadow-xs">
      <div className="flex items-center gap-3">
        <span className="text-base font-extrabold tracking-wider text-[#0F172A] font-outfit">
          CREED<span className="text-[#FF6B00]">TECH</span>
        </span>
        <span className="h-4 w-[1px] bg-[#E2E8F0]" />
        <span className="text-[11px] font-bold text-[#FF6B00] bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 font-outfit uppercase tracking-wider shadow-[0_0_8px_rgba(255,107,0,0.1)]">
          Master CMS
        </span>
      </div>

      {/* Global Search Input with Dark Offwhite Fill & Soft Orange Glow on Focus */}
      <div className="relative w-full sm:w-80 order-3 sm:order-2">
        <input
          type="text"
          placeholder="Search records, titles, authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F1F3F5] hover:bg-[#EBECEF] focus:bg-white border border-[#E2E8F0] focus:border-[#FF6B00] text-xs text-slate-800 placeholder-slate-400 pl-8 pr-8 py-2 rounded-xl outline-none focus:shadow-[0_0_15px_rgba(255,107,0,0.15)] transition-all duration-200 font-jakarta"
        />
        <span className="absolute left-2.5 top-2.5 text-slate-400 text-xs pointer-events-none">🔍</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center gap-3.5 order-2 sm:order-3 ml-auto sm:ml-0">
        {/* Telemetry Badge with Soft Orange Glow */}
        <div className="hidden md:flex items-center gap-2 bg-[#F1F3F5] text-slate-700 px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="text-[11px] font-mono font-medium text-slate-700">
            PG18 :5433 <span className="text-[#FF6B00]">({telemetry?.latencyMs ? `${telemetry.latencyMs}ms` : "ACTIVE"})</span>
          </span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="text-xs font-semibold bg-white hover:bg-orange-50/50 hover:text-[#FF6B00] hover:border-orange-300 border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl text-slate-700 shadow-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer group"
        >
          <span>Live Site</span>
          <span className="text-[#FF6B00] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </Link>

        {/* Admin User Profile & Sign Out */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#FFA04D] flex items-center justify-center text-xs font-bold text-white shadow-[0_2px_8px_rgba(255,107,0,0.3)]">
            AD
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 leading-tight">
              {userEmail ? userEmail.split("@")[0] : "Admin"}
            </span>
            <span className="text-[10px] text-[#FF6B00] font-mono leading-tight font-semibold">Super Admin</span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="ml-1 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              title="Sign Out of Admin Console"
            >
              <span>🚪</span>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
