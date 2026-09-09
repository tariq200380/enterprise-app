"use client";

import React, { useState, useEffect, useCallback } from "react";
import { VideoItem } from "@/types/admin";
import AddVideoModal from "../modals/AddVideoModal";
import VideoPreviewModal from "../modals/VideoPreviewModal";

interface VideosModuleProps {
  searchQuery?: string;
  showToast?: (msg: string, type?: "success" | "error") => void;
  // Optional controlled props if parent passes them
  videos?: VideoItem[];
  onRefresh?: () => void;
}

export default function VideosModule({
  searchQuery = "",
  showToast = () => {},
  videos: propVideos,
  onRefresh,
}: VideosModuleProps) {
  const [internalVideos, setInternalVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(!propVideos);
  const [showAddModal, setShowAddModal] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<VideoItem | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/videos", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.videos) {
        setInternalVideos(data.videos);
      }
    } catch {
      showToast("Failed to load videos", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (propVideos) {
      setInternalVideos(propVideos);
    } else {
      fetchVideos();
    }
  }, [propVideos, fetchVideos]);

  const activeVideos = propVideos || internalVideos;

  const handleDelete = async (id: number) => {
    if (!confirm(`Are you sure you want to delete video #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Video deleted successfully");
        if (onRefresh) onRefresh();
        else fetchVideos();
      } else {
        showToast(data.error || "Failed to delete video", "error");
      }
    } catch {
      showToast("Failed to delete video", "error");
    }
  };

  const handleVideoCreated = (newVid: VideoItem) => {
    setInternalVideos((prev) => [newVid, ...prev]);
    if (onRefresh) onRefresh();
  };

  const filtered = activeVideos.filter(
    (v) =>
      v.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Video Knowledge Library</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Curated technical video streams, deep architecture breakdowns, and conference keynote recordings.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold rounded shadow flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <span>+</span> <span>Add Video</span>
        </button>
      </div>

      {isLoading && activeVideos.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-xs">
          Loading video library...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-xs">
          No videos found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vid) => (
            <div
              key={vid.id}
              className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="h-44 bg-[#0B1120] relative group">
                <img
                  src={
                    vid.thumbnail_url ||
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                  }
                  alt=""
                  className="w-full h-full object-cover opacity-80"
                />
                <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {vid.duration}
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewVideo(vid)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors cursor-pointer text-3xl text-white"
                >
                  ▶
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#FF6B00] uppercase block mb-1">
                    {vid.category}
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A] leading-snug mb-1">
                    {vid.title}
                  </h4>
                  <span className="text-[11px] text-[#64748B]">{vid.views || 1200} Views</span>
                </div>
                <div className="flex gap-2 pt-3 mt-3 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setPreviewVideo(vid)}
                    className="flex-1 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] text-xs font-semibold rounded border border-[#CBD5E1] cursor-pointer transition-colors"
                  >
                    Watch Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(vid.id)}
                    className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded border border-red-200 cursor-pointer transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Modals */}
      <AddVideoModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onVideoCreated={handleVideoCreated}
        showToast={showToast}
      />

      <VideoPreviewModal
        video={previewVideo}
        onClose={() => setPreviewVideo(null)}
      />
    </div>
  );
}
