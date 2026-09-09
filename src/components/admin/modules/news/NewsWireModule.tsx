"use client";

import React, { useState, useEffect, useCallback } from "react";
import { StoryItem, GalleryImage } from "./types";
import NewsBreakingTab from "./NewsBreakingTab";
import NewsBrandTab from "./NewsBrandTab";
import NewsRegionalTab from "./NewsRegionalTab";
import NewsEditModal from "./NewsEditModal";

interface NewsWireModuleProps {
  showToast: (msg: string) => void;
  onDraftCreated?: (art: any) => void;
}

export default function NewsWireModule({ showToast, onDraftCreated }: NewsWireModuleProps) {
  const [activeTab, setActiveTab] = useState<"breaking" | "brand" | "regional">("breaking");
  const [breakingStories, setBreakingStories] = useState<StoryItem[]>([]);
  const [brandWires, setBrandWires] = useState<Record<string, StoryItem>>({});
  const [regionalWires, setRegionalWires] = useState<Record<string, StoryItem>>({});
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [creatingDraftId, setCreatingDraftId] = useState<string | null>(null);

  // Edit Modal State
  const [editingStory, setEditingStory] = useState<{
    section: "breaking" | "brand" | "regional";
    id: string;
    item: StoryItem;
  } | null>(null);

  // Fetch news wire cache & gallery
  const fetchNewsData = useCallback(
    async (triggerRefresh = false) => {
      try {
        if (triggerRefresh) {
          setIsRefreshing(true);
          await fetch("/api/admin/news/refresh", { method: "POST" });
        }

        const [newsRes, galleryRes] = await Promise.all([
          fetch("/api/admin/news?t=" + Date.now(), { cache: "no-store" }).then((r) => r.json()),
          fetch("/api/admin/news/gallery?t=" + Date.now(), { cache: "no-store" }).then((r) => r.json()),
        ]);

        if (newsRes?.success) {
          setBreakingStories(newsRes.breaking_news || []);
          setBrandWires(newsRes.brand_wires || {});
          setRegionalWires(newsRes.regional_wires || {});
        }
        if (galleryRes?.success) {
          setGalleryImages(galleryRes.images || []);
        }

        if (triggerRefresh) {
          showToast("✓ Live tech news feeds refreshed from live network!");
        }
      } catch (err: any) {
        showToast("Error fetching tech wire news: " + err.message);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    fetchNewsData();
    const interval = setInterval(() => fetchNewsData(false), 45000);
    return () => clearInterval(interval);
  }, [fetchNewsData]);

  // Promote a wire into an editorial draft in Knowledge Center
  const handleCreateKnowledgeDraft = async (wire: StoryItem) => {
    const wireTitle = wire.title || "Untitled Wire";
    const wireSource = wire.source || wire.sourceName || "Tech Wire";
    const wireCategory = wire.tag || wire.category || wire.brandBadge || wire.providerLabel || "HARDWARE";
    const wireDesc = wire.desc || wire.summary || "";
    const wireImage = wire.img || wire.image || "";

    try {
      setCreatingDraftId(wireTitle);
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: wireTitle,
          category: wireCategory.toUpperCase(),
          author: `Editorial Desk (${wireSource})`,
          read_time: "5 min read",
          cover_photo_url: wireImage,
          editor_note: wireDesc,
          content: `<p><strong>Original Intelligence Summary:</strong> ${wireDesc}</p><p>Creed Tech Systems Lab is reviewing this blueprint for production architecture compliance and hardware performance benchmarks.</p>`,
          source_news: `${wireTitle} (${wireSource})`,
          status: "DRAFT",
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`✓ Knowledge draft created in "News Editorial Drafts" for review!`);
        if (onDraftCreated) {
          onDraftCreated(data.article);
        }
      } else {
        showToast(data.error || "Failed to create knowledge draft");
      }
    } catch (err: any) {
      showToast("Error creating article draft: " + err.message);
    } finally {
      setCreatingDraftId(null);
    }
  };

  // Pin story to top
  const handlePinStory = async (index: number) => {
    if (index === 0) {
      showToast("Story is already pinned at the top.");
      return;
    }
    const copy = [...breakingStories];
    const [selected] = copy.splice(index, 1);
    copy.unshift(selected);
    setBreakingStories(copy);

    try {
      await fetch("/api/admin/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breaking_news: copy }),
      });
      showToast("✓ Pinned story to top of Breaking News!");
    } catch (err: any) {
      showToast("Failed to pin story: " + err.message);
    }
  };

  // Save story edits
  const handleSaveStory = async (
    section: "breaking" | "brand" | "regional",
    id: string,
    updatedFields: Partial<StoryItem>
  ) => {
    const payload: any = {
      section,
      id,
      item: updatedFields,
    };

    const res = await fetch("/api/admin/news", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to update story");
    }

    // Update local state optimistically
    if (section === "breaking") {
      setBreakingStories((prev) =>
        prev.map((s) => {
          const match = (s.external_id || s.id || s.provider) === id;
          return match ? { ...s, ...updatedFields } : s;
        })
      );
    } else if (section === "brand") {
      setBrandWires((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...updatedFields },
      }));
    } else if (section === "regional") {
      setRegionalWires((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...updatedFields },
      }));
    }

    showToast("✓ Story updated & synced to live website!");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[22px] font-bold text-[#0F172A] m-0">Tech Wire News &amp; Live Stream</h1>
            <span className="bg-[#ECFDF5] text-[#059669] text-[10.5px] font-extrabold px-2 py-0.5 rounded border border-[#A7F3D0]">
              LIVE EDITOR
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-[#64748B] m-0">
            Customize headlines, summaries, sources, and imagery for live website tech feeds. Changes reflect immediately.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => fetchNewsData(true)}
            disabled={isRefreshing}
            className="px-4 py-2 bg-white border border-[#CBD5E1] text-[#334155] text-xs font-bold rounded shadow-xs hover:bg-[#F1F5F9] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span className={isRefreshing ? "animate-spin" : ""}>🔄</span>
            <span>{isRefreshing ? "Refreshing..." : "Refresh Feeds"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#E2E8F0] pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("breaking")}
          className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "breaking"
              ? "bg-[#0052FF] text-white shadow-xs"
              : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🚨 Breaking News Wire</span>
          <span className="bg-white/20 text-current text-[10px] px-1.5 py-0.5 rounded-full">
            {breakingStories.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("brand")}
          className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "brand"
              ? "bg-[#0052FF] text-white shadow-xs"
              : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🌐 Global Brand Wires</span>
          <span className="bg-white/20 text-current text-[10px] px-1.5 py-0.5 rounded-full">
            {Object.keys(brandWires).length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("regional")}
          className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "regional"
              ? "bg-[#0052FF] text-white shadow-xs"
              : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🇵🇰 Pakistan Regional Ecosystem</span>
          <span className="bg-white/20 text-current text-[10px] px-1.5 py-0.5 rounded-full">
            {Object.keys(regionalWires).length}
          </span>
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-sm">
          Loading live tech news stream...
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {activeTab === "breaking" && (
            <NewsBreakingTab
              breakingStories={breakingStories}
              creatingDraftId={creatingDraftId}
              onPinStory={handlePinStory}
              onCreateKnowledgeDraft={handleCreateKnowledgeDraft}
              onOpenEdit={(section, id, story) => setEditingStory({ section, id, item: story })}
            />
          )}

          {activeTab === "brand" && (
            <NewsBrandTab
              brandWires={brandWires}
              creatingDraftId={creatingDraftId}
              onCreateKnowledgeDraft={handleCreateKnowledgeDraft}
              onOpenEdit={(section, id, story) => setEditingStory({ section, id, item: story })}
            />
          )}

          {activeTab === "regional" && (
            <NewsRegionalTab
              regionalWires={regionalWires}
              creatingDraftId={creatingDraftId}
              onCreateKnowledgeDraft={handleCreateKnowledgeDraft}
              onOpenEdit={(section, id, story) => setEditingStory({ section, id, item: story })}
            />
          )}
        </div>
      )}

      {/* Edit Story Modal */}
      {editingStory && (
        <NewsEditModal
          editingStory={editingStory}
          galleryImages={galleryImages}
          onClose={() => setEditingStory(null)}
          onSave={handleSaveStory}
          showToast={showToast}
        />
      )}
    </div>
  );
}
