"use client";

import React from "react";
import { VideoItem } from "@/types/admin";

interface VideoPreviewModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoPreviewModal({ video, onClose }: VideoPreviewModalProps) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1120] text-white rounded-xl border border-gray-700 max-w-2xl w-full p-5 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg cursor-pointer"
        >
          ✕
        </button>
        <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">
          STREAM PREVIEW
        </span>
        <h3 className="text-base font-bold text-white mb-3">{video.title}</h3>
        <div className="w-full aspect-video bg-black rounded overflow-hidden mb-4">
          <iframe
            src={video.embed_url.replace("watch?v=", "embed/")}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>Category: {video.category} • Duration: {video.duration}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded cursor-pointer"
          >
            Close Player
          </button>
        </div>
      </div>
    </div>
  );
}
