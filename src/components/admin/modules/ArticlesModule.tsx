"use client";

import React, { useState, useEffect } from "react";
import { ArticleItem } from "@/types/admin";
import ArticleStudioModal from "../modals/ArticleStudioModal";

interface ArticlesModuleProps {
  articles?: ArticleItem[];
  searchQuery?: string;
  onOpenNewModal?: () => void;
  onEditArticle?: (art: ArticleItem) => void;
  onDeleteArticle?: (id: number) => void;
  onPublishArticle?: (id: number) => void;
  onUnpublishArticle?: (id: number) => void;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onRefresh?: () => void;
}

export default function ArticlesModule({
  articles: propArticles,
  searchQuery = "",
  onOpenNewModal,
  onEditArticle,
  onDeleteArticle,
  onPublishArticle,
  onUnpublishArticle,
  showToast,
  onRefresh,
}: ArticlesModuleProps) {
  const [articles, setArticles] = useState<ArticleItem[]>(propArticles || []);
  const [subTab, setSubTab] = useState<"blueprints" | "news_drafts" | "all">("news_drafts");
  const [previewArticle, setPreviewArticle] = useState<ArticleItem | null>(null);
  const [showStudio, setShowStudio] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/admin/articles");
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    }
  };

  useEffect(() => {
    if (propArticles) {
      setArticles(propArticles);
    } else {
      fetchArticles();
    }
  }, [propArticles]);

  const handleOpenStudio = (art?: ArticleItem) => {
    if (onEditArticle && art) {
      onEditArticle(art);
    } else if (onOpenNewModal && !art) {
      onOpenNewModal();
    } else {
      setEditingArticle(art || null);
      setShowStudio(true);
    }
  };

  const handlePublish = async (id: number) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, status: "PUBLISHED" } : art))
    );
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "PUBLISHED" }),
      });
      if (res.ok) {
        showToast?.("✓ Article published live to Knowledge Center!");
        onPublishArticle?.(id);
        fetchArticles();
        onRefresh?.();
      } else {
        showToast?.("Failed to publish article", "error");
        fetchArticles();
      }
    } catch {
      showToast?.("Failed to publish article", "error");
      fetchArticles();
    }
  };

  const handleUnpublish = async (id: number) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, status: "DRAFT" } : art))
    );
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "DRAFT" }),
      });
      if (res.ok) {
        showToast?.("✓ Article unpublished (demoted to Draft)");
        onUnpublishArticle?.(id);
        fetchArticles();
        onRefresh?.();
      } else {
        showToast?.("Failed to unpublish article", "error");
        fetchArticles();
      }
    } catch {
      showToast?.("Failed to unpublish article", "error");
      fetchArticles();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
        showToast?.("Article deleted successfully");
        onDeleteArticle?.(id);
        setShowStudio(false);
        setEditingArticle(null);
        fetchArticles();
        onRefresh?.();
      } else {
        showToast?.("Failed to delete article", "error");
      }
    } catch {
      showToast?.("Failed to delete article", "error");
    }
  };

  const handleArticleSaved = () => {
    setShowStudio(false);
    setEditingArticle(null);
    fetchArticles();
    onRefresh?.();
    showToast?.("Article saved successfully!");
  };

  // Group by category/source, NOT by status, so publishing never makes an item disappear from its tab!
  const isNewsDraft = (a: ArticleItem) => Boolean(a.source_news && a.source_news.trim() !== "");
  const isBlueprint = (a: ArticleItem) => !isNewsDraft(a);

  const blueprints = articles.filter(isBlueprint);
  const newsDrafts = articles.filter(isNewsDraft);

  const currentList =
    subTab === "blueprints"
      ? blueprints
      : subTab === "news_drafts"
      ? newsDrafts
      : articles;

  const filtered = currentList.filter(
    (a) =>
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.source_news?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Knowledge Center Articles &amp; Editorial Blueprints</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Publish, update, and manage editorial research, comparison tables, and news-based knowledge articles.
          </p>
        </div>
        <button
          onClick={() => handleOpenStudio()}
          className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <span>+</span> <span>New Blueprint Article</span>
        </button>
      </div>

      {/* Subtabs matching localhost:3000/admin.php reference */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-2 flex-wrap">
        <button
          type="button"
          onClick={() => setSubTab("news_drafts")}
          className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer transition-all flex items-center gap-2 ${
            subTab === "news_drafts"
              ? "bg-[#0052FF] text-white shadow-xs"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <span>News Editorial Drafts</span>
          <span
            className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
              subTab === "news_drafts" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-900 border border-amber-300"
            }`}
          >
            {newsDrafts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("blueprints")}
          className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer transition-all flex items-center gap-2 ${
            subTab === "blueprints"
              ? "bg-[#0052FF] text-white shadow-xs"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <span>Core Blueprints</span>
          <span
            className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
              subTab === "blueprints" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {blueprints.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("all")}
          className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer transition-all flex items-center gap-2 ${
            subTab === "all"
              ? "bg-[#0052FF] text-white shadow-xs"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <span>All Articles</span>
          <span
            className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
              subTab === "all" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {articles.length}
          </span>
        </button>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => {
          const isPub = art.status === "PUBLISHED";

          return (
            <div
              key={art.id}
              className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              {/* Card Image */}
              <div className="h-44 bg-[#0B1120] relative overflow-hidden">
                <img
                  src={
                    art.cover_photo_url ||
                    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop"
                  }
                  alt={art.title}
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#0052FF] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {art.category || "TECHNOLOGY"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Badge Row (Source & Status) */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#0052FF] border border-[#BFDBFE] truncate max-w-[210px]">
                      {art.source_news ? `SOURCE: ${art.source_news.toUpperCase()}` : "CORE BLUEPRINT"}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        isPub
                          ? "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]"
                          : "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]"
                      }`}
                    >
                      {art.status || "DRAFT"}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#64748B] mb-1">
                    By {art.author} • {art.read_time}
                  </div>

                  <h3 className="text-sm font-bold text-[#0F172A] leading-snug mb-2 line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {art.editor_note ||
                      "Enterprise architecture blueprint and in-depth technical analysis."}
                  </p>
                </div>

                {/* Card Actions: All 4 Buttons in ONE Place at the Bottom */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#F1F5F9] flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleOpenStudio(art)}
                    className="flex-1 min-w-[95px] py-1.5 px-3 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-semibold rounded cursor-pointer transition-colors text-center shadow-xs"
                  >
                    Edit in Studio
                  </button>

                  {isPub ? (
                    <button
                      type="button"
                      onClick={() => handleUnpublish(art.id)}
                      className="py-1.5 px-3 bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] text-xs font-semibold rounded border border-[#FCD34D] cursor-pointer transition-colors"
                      title="Demote back to Draft"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePublish(art.id)}
                      className="py-1.5 px-3 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] text-xs font-bold rounded border border-[#A7F3D0] cursor-pointer transition-colors"
                      title="Publish live to Knowledge Center"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(art.id)}
                    className="py-1.5 px-2.5 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] text-xs font-semibold rounded border border-[#FECACA] cursor-pointer transition-colors"
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewArticle(art)}
                    className="py-1.5 px-3 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0052FF] text-xs font-semibold rounded border border-[#BFDBFE] cursor-pointer transition-colors"
                  >
                    Preview ↗
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 p-12 text-center bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-sm font-semibold text-gray-600 mb-1">
              {subTab === "news_drafts"
                ? "No news editorial drafts found."
                : subTab === "blueprints"
                ? "No core blueprints found."
                : "No articles match your search."}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              {subTab === "news_drafts"
                ? "Visit the Tech Wire News tab and click \"+ Knowledge Draft\" on any wire to create one."
                : "Create a new blueprint article using the button below."}
            </p>
            <button
              onClick={() => handleOpenStudio()}
              className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors"
            >
              + Create Blueprint Article
            </button>
          </div>
        )}
      </div>

      {/* Interactive Article Preview Modal */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1120] text-slate-100 rounded-xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#0B1120] z-20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">ARTICLE PREVIEW</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                    previewArticle.status === "PUBLISHED"
                      ? "bg-emerald-600 text-white"
                      : "bg-amber-400 text-amber-950"
                  }`}
                >
                  {previewArticle.status || "DRAFT"}
                </span>
              </div>
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded cursor-pointer"
              >
                ✕ Close Preview
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-6">
              {previewArticle.cover_photo_url && (
                <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden relative">
                  <img
                    src={previewArticle.cover_photo_url}
                    alt={previewArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#0052FF] text-white text-xs font-bold rounded shadow">
                    {previewArticle.category}
                  </span>
                </div>
              )}

              <div>
                <div className="text-xs text-slate-400 mb-2">
                  By {previewArticle.author} • {previewArticle.read_time}
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  {previewArticle.title}
                </h1>
              </div>

              {previewArticle.source_news && (
                <div className="p-3 bg-amber-950/40 border border-amber-600/40 rounded text-xs text-amber-300">
                  <strong>Source News Wire:</strong> {previewArticle.source_news}
                </div>
              )}

              {previewArticle.editor_note && (
                <div className="p-4 bg-slate-800/80 border-l-4 border-[#0052FF] rounded text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{previewArticle.editor_note}&rdquo;
                </div>
              )}

              {previewArticle.video_embed_url && (
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-700">
                  <iframe
                    src={previewArticle.video_embed_url}
                    className="w-full h-full"
                    allowFullScreen
                    title="Video Embed"
                  />
                </div>
              )}

              {previewArticle.audio_stream_url && (
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-xs font-bold text-slate-300 mb-2">🎧 Audio Intelligence Briefing</div>
                  <audio controls src={previewArticle.audio_stream_url} className="w-full" />
                </div>
              )}

              <div
                className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: previewArticle.content || "<p>No content body available.</p>",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Studio Editor Modal */}
      <ArticleStudioModal
        isOpen={showStudio}
        onClose={() => {
          setShowStudio(false);
          setEditingArticle(null);
        }}
        editingArticle={editingArticle}
        onArticleSaved={handleArticleSaved}
        onDeleteArticle={handleDelete}
        showToast={showToast || (() => {})}
      />
    </div>
  );
}
