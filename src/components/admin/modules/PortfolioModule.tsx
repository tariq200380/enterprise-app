"use client";

import React from "react";
import { PortfolioItem } from "@/types/admin";

interface PortfolioModuleProps {
  portfolioProjects: PortfolioItem[];
  searchQuery: string;
  onOpenAddModal: () => void;
  onDeletePortfolio: (id: number) => void;
}

export default function PortfolioModule({
  portfolioProjects,
  searchQuery,
  onOpenAddModal,
  onDeletePortfolio,
}: PortfolioModuleProps) {
  const filtered = portfolioProjects.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Portfolio &amp; Case Studies CMS</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Showcase enterprise deployments, distributed system builds, and client proofs.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow cursor-pointer"
        >
          + Add Portfolio Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="h-44 bg-[#0B1120] relative">
              <img src={p.image_url} alt="" className="w-full h-full object-cover opacity-80" />
              <span className="absolute top-2.5 left-2.5 bg-[#0052FF] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {p.category}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] text-[#64748B] mb-1">Client: {p.client}</div>
                <h3 className="text-base font-bold text-[#0F172A]">{p.title}</h3>
                <p className="text-xs text-[#475569] mt-2 leading-relaxed">{p.summary}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {(Array.isArray(p.stack) ? p.stack : []).map((s, idx) => (
                    <span key={idx} className="bg-blue-50 text-[#0052FF] text-[10px] px-2 py-0.5 rounded font-mono font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-100">
                <div className="flex gap-2 text-xs">
                  {p.live_url && (
                    <a href={p.live_url} target="_blank" rel="noreferrer" className="text-[#0052FF] font-bold hover:underline">
                      Live Site ↗
                    </a>
                  )}
                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noreferrer" className="text-gray-600 font-bold hover:underline">
                      GitHub ↗
                    </a>
                  )}
                </div>
                <button
                  onClick={() => onDeletePortfolio(p.id)}
                  className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded font-semibold cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
