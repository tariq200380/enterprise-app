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
    <header className="bg-[#0B1120] text-white px-7 py-3.5 border-b border-[#1E293B] flex items-center justify-between flex-wrap gap-4 select-none sticky top-0 z-40">
      <div className="flex items-center gap-3.5">
        <span className="text-sm font-extrabold tracking-wider text-white">
          CREED<span className="text-[#FF6B00]">TECH</span>
        </span>
        <span className="h-4 w-[1px] bg-[#334155]" />
        <span className="text-xs font-semibold text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-sm border border-[#38BDF8]/20">
          MASTER CMS 2.0
        </span>
      </div>

      {/* Global Search Input */}
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Search all records, titles, authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#1E293B] border border-[#334155] text-xs text-white placeholder-[#64748B] pl-8 pr-3 py-1.5 rounded outline-none focus:border-[#0052FF]"
        />
        <span className="absolute left-2.5 top-2 text-[#64748B] text-xs">🔍</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1.5 text-xs text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs text-[#94A3B8] font-mono">
            PG18 :5433 ({telemetry?.latencyMs ? `${telemetry.latencyMs}ms` : "ACTIVE"})
          </span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="text-xs font-bold bg-[#1E293B] hover:bg-[#334155] border border-[#334155] px-3 py-1.5 rounded text-white shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <span>Live Site</span>
          <span>↗</span>
        </Link>

        {/* Admin User Profile & Sign Out */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-[#1E293B]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0052FF] to-[#38BDF8] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
            AD
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] font-bold text-white leading-tight">
              {userEmail ? userEmail.split("@")[0] : "Admin"}
            </span>
            <span className="text-[9px] text-[#38BDF8] font-mono leading-tight">Super Admin</span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="ml-1 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1.5 rounded transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Sign Out of Admin Console"
            >
              <span>🚪</span>
              <span className="hidden md:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
