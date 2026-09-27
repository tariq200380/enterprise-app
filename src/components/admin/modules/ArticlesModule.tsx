"use client";

import React, { useState, useEffect } from "react";
import { ArticleItem } from "@/types/admin";
import ArticleStudioModal from "../modals/ArticleStudioModal";
import { useAdminFetch } from "@/lib/useAdminFetch";
import DOMPurify from "dompurify";

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
  const adminFetch = useAdminFetch();
  const [articles, setArticles] = useState<ArticleItem[]>(propArticles || []);
  const [subTab, setSubTab] = useState<"blueprints" | "news_drafts" | "all">("news_drafts");
  const [previewArticle, setPreviewArticle] = useState<ArticleItem | null>(null);
  const [showStudio, setShowStudio] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  const fetchArticles = async () => {
    try {
      const res = await adminFetch("/api/admin/articles");
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
      const res = await adminFetch(`/api/admin/articles/${id}`, {
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
      const res = await adminFetch(`/api/admin/articles/${id}`, {
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
      const res = await adminFetch(`/api/admin/articles/${id}`, {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-outfit text-[#0F172A]">Knowledge Center Articles &amp; Editorial Blueprints</h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Publish, update, and manage editorial research, comparison tables, and news-based knowledge articles.
          </p>
        </div>
        <button
          onClick={() => handleOpenStudio()}
          className="px-5 py-2 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl shadow-[0_2px_12px_rgba(255,107,0,0.25)] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <span>+</span> <span>New Blueprint Article</span>
        </button>
      </div>

      {/* Subtabs with modern pills */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3 flex-wrap">
        <button
          type="button"
          onClick={() => setSubTab("news_drafts")}
          className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-2 ${
            subTab === "news_drafts"
              ? "bg-[#FF6B00] text-white shadow-[0_2px_12px_rgba(255,107,0,0.25)]"
              : "bg-white border border-[#E2E8F0] hover:bg-[#F1F3F5] text-slate-700 shadow-xs"
          }`}
        >
          <span>News Editorial Drafts</span>
          <span
            className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
              subTab === "news_drafts" ? "bg-white/20 text-white" : "bg-orange-500/10 text-[#FF6B00] border border-orange-500/20"
            }`}
          >
            {newsDrafts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("blueprints")}
          className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-2 ${
            subTab === "blueprints"
              ? "bg-[#FF6B00] text-white shadow-[0_2px_12px_rgba(255,107,0,0.25)]"
              : "bg-white border border-[#E2E8F0] hover:bg-[#F1F3F5] text-slate-700 shadow-xs"
          }`}
        >
          <span>Core Blueprints</span>
          <span
            className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
              subTab === "blueprints" ? "bg-white/20 text-white" : "bg-[#EBECEF] text-slate-600"
            }`}
          >
            {blueprints.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("all")}
          className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-2 ${
            subTab === "all"
              ? "bg-[#FF6B00] text-white shadow-[0_2px_12px_rgba(255,107,0,0.25)]"
              : "bg-white border border-[#E2E8F0] hover:bg-[#F1F3F5] text-slate-700 shadow-xs"
          }`}
        >
          <span>All Articles</span>
          <span
            className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
              subTab === "all" ? "bg-white/20 text-white" : "bg-[#EBECEF] text-slate-600"
            }`}
          >
            {articles.length}
          </span>
        </button>
      </div>

      {/* Grid of Articles (md:grid-cols-2 lg:grid-cols-3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => {
          const isPub = art.status === "PUBLISHED";

          return (
            <div
              key={art.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(255,107,0,0.15)] hover:border-orange-300 transition-all duration-300 hover:-translate-y-1 group relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B00] to-[#FFA04D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-[0_0_8px_rgba(255,107,0,0.6)]" />

              {/* Card Image */}
              <div className="h-44 bg-[#F1F3F5] relative overflow-hidden">
                <img
                  src={
                    art.cover_photo_url ||
                    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop"
                  }
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#0F172A] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#E2E8F0] shadow-xs font-outfit uppercase tracking-wider">
                  {art.category || "TECHNOLOGY"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Badge Row (Source & Status) */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF6B00] border border-orange-200 truncate max-w-[210px] font-mono">
                      {art.source_news ? `SOURCE: ${art.source_news.toUpperCase()}` : "CORE BLUEPRINT"}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        isPub
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {art.status || "DRAFT"}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 mb-1.5 font-medium">
                    By {art.author} • {art.read_time}
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#FF6B00] transition-colors leading-snug mb-2 line-clamp-2 font-outfit">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {art.editor_note ||
                      "Enterprise architecture blueprint and in-depth technical analysis."}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 mt-5 pt-3.5 border-t border-[#E2E8F0] flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleOpenStudio(art)}
                    className="flex-1 min-w-[95px] py-1.5 px-3 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-semibold rounded-xl cursor-pointer transition-all text-center shadow-[0_2px_8px_rgba(255,107,0,0.25)] active:scale-95"
                  >
                    Edit in Studio
                  </button>

                  {isPub ? (
                    <button
                      type="button"
                      onClick={() => handleUnpublish(art.id)}
                      className="py-1.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-xl border border-amber-200 cursor-pointer transition-colors"
                      title="Demote back to Draft"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePublish(art.id)}
                      className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 cursor-pointer transition-colors"
                      title="Publish live to Knowledge Center"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(art.id)}
                    className="py-1.5 px-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl border border-red-200 cursor-pointer transition-colors"
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewArticle(art)}
                    className="py-1.5 px-3 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 text-xs font-semibold rounded-xl border border-[#E2E8F0] cursor-pointer transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-[#0F172A] rounded-2xl border border-[#E2E8F0] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
            <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 font-outfit uppercase tracking-wider">ARTICLE PREVIEW</span>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase border ${
                    previewArticle.status === "PUBLISHED"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {previewArticle.status || "DRAFT"}
                </span>
              </div>
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-3.5 py-1.5 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 text-xs font-bold rounded-xl border border-[#E2E8F0] cursor-pointer transition-colors"
              >
                ✕ Close Preview
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-6">
              {previewArticle.cover_photo_url && (
                <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden relative shadow-xs">
                  <img
                    src={previewArticle.cover_photo_url}
                    alt={previewArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md text-[#FF6B00] border border-orange-200 text-xs font-bold rounded-full shadow-xs">
                    {previewArticle.category}
                  </span>
                </div>
              )}

              <div>
                <div className="text-xs text-slate-500 mb-2">
                  By {previewArticle.author} • {previewArticle.read_time}
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] leading-tight font-outfit">
                  {previewArticle.title}
                </h1>
              </div>

              {previewArticle.source_news && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs text-[#FF6B00] font-medium">
                  <strong>Source News Wire:</strong> {previewArticle.source_news}
                </div>
              )}

              {previewArticle.editor_note && (
                <div className="p-4 bg-[#F8FAFC] border-l-4 border-[#FF6B00] rounded-r-xl text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;{previewArticle.editor_note}&rdquo;
                </div>
              )}

              {previewArticle.video_embed_url && (
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#E2E8F0] shadow-xs">
                  <iframe
                    src={previewArticle.video_embed_url}
                    className="w-full h-full"
                    allowFullScreen
                    title="Video Embed"
                  />
                </div>
              )}

              {previewArticle.audio_stream_url && (
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <div className="text-xs font-bold text-slate-700 mb-2">🎧 Audio Intelligence Briefing</div>
                  <audio controls src={previewArticle.audio_stream_url} className="w-full" />
                </div>
              )}

              <div
                className="prose max-w-none text-slate-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(previewArticle.content || "<p>No content body available.</p>"),
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
