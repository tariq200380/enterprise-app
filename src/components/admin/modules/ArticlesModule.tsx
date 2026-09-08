"use client";

import React, { useState } from "react";
import { ArticleItem } from "@/types/admin";

interface ArticlesModuleProps {
  articles: ArticleItem[];
  searchQuery: string;
  onOpenNewModal: () => void;
  onEditArticle: (art: ArticleItem) => void;
  onDeleteArticle: (id: number) => void;
}

export default function ArticlesModule({
  articles,
  searchQuery,
  onOpenNewModal,
  onEditArticle,
  onDeleteArticle,
}: ArticlesModuleProps) {
  const [subTab, setSubTab] = useState<"blueprints" | "drafts">("blueprints");

  const filtered = articles.filter(
    (a) =>
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Knowledge Center Blueprint Articles</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Publish in-depth technical guides, benchmark specs, pros/cons, and affiliate buy generators.
          </p>
        </div>
        <button
          onClick={onOpenNewModal}
          className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow flex items-center gap-1.5 cursor-pointer"
        >
          <span>+</span> <span>New Blueprint Article</span>
        </button>
      </div>

      {/* Subtabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
        <button
          onClick={() => setSubTab("blueprints")}
          className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer ${
            subTab === "blueprints" ? "bg-[#0052FF] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Published Blueprints ({articles.length})
        </button>
        <button
          onClick={() => setSubTab("drafts")}
          className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer ${
            subTab === "drafts" ? "bg-[#0052FF] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Drafts / Under Review (0)
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <div key={art.id} className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="h-44 bg-[#0B1120] relative overflow-hidden">
              <img
                src={art.cover_photo_url || "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop"}
                alt=""
                className="w-full h-full object-cover opacity-85"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#0052FF] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                {art.category}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] text-[#64748B] mb-1">
                  By {art.author} • {art.read_time}
                </div>
                <h3 className="text-sm font-bold text-[#0F172A] leading-snug mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {art.editor_note || "Enterprise architecture guide with verified benchmarks and hardware specifications."}
                </p>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-[#F1F5F9]">
                <button
                  onClick={() => onEditArticle(art)}
                  className="flex-1 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] text-xs font-semibold rounded border border-[#CBD5E1] cursor-pointer"
                >
                  Edit in Studio
                </button>
                <button
                  onClick={() => onDeleteArticle(art.id)}
                  className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded border border-red-200 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 p-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-xs text-gray-500 mb-3">No articles match your criteria.</p>
            <button
              onClick={onOpenNewModal}
              className="px-4 py-2 bg-[#0052FF] text-white text-xs font-bold rounded cursor-pointer"
            >
              Create First Article
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
