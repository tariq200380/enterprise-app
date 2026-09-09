"use client";

import React, { useState, useRef } from "react";
import { VideoItem } from "@/types/admin";

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoCreated: (video: VideoItem) => void;
  showToast: (msg: string) => void;
}

export default function AddVideoModal({
  isOpen,
  onClose,
  onVideoCreated,
  showToast,
}: AddVideoModalProps) {
  // Source Mode: "system" (upload from device) or "embed" (YouTube/Vimeo)
  const [sourceMode, setSourceMode] = useState<"system" | "embed">("system");

  // Common Metadata
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cloud Engineering");
  const [duration, setDuration] = useState("15:00");

  // System Video Upload State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>("");
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  // External Embed State
  const [embedUrl, setEmbedUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

  // Thumbnail State
  const [thumbMode, setThumbMode] = useState<"auto" | "system" | "url">("auto");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  );
  const thumbInputRef = useRef<HTMLInputElement | null>(null);

  // Status
  const [uploadProgress, setUploadProgress] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  // Handle Video File Selection from Local PC
  const handleVideoFileChange = (file: File) => {
    setVideoFile(file);
    const blobUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(blobUrl);

    // Auto populate Title if empty
    if (!title.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    // Auto detect duration & extract auto poster thumbnail
    const tempVideo = document.createElement("video");
    tempVideo.preload = "metadata";
    tempVideo.src = blobUrl;
    tempVideo.onloadedmetadata = () => {
      const mins = Math.floor(tempVideo.duration / 60);
      const secs = Math.floor(tempVideo.duration % 60);
      setDuration(`${mins}:${secs < 10 ? "0" : ""}${secs}`);

      // Seek to 1s or midpoint for poster frame
      tempVideo.currentTime = Math.min(1.5, Math.max(0.5, tempVideo.duration / 4));
    };

    tempVideo.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = tempVideo.videoWidth || 640;
        canvas.height = tempVideo.videoHeight || 360;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const autoThumb = new File([blob], `thumb_${Date.now()}.jpg`, {
                  type: "image/jpeg",
                });
                setThumbnailFile(autoThumb);
                setThumbnailPreviewUrl(URL.createObjectURL(blob));
                setThumbMode("auto");
              }
            },
            "image/jpeg",
            0.88
          );
        }
      } catch (err) {
        console.warn("Could not capture video frame:", err);
      }
    };
  };

  // Upload helper for FormData
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data.success || !data.url) {
      throw new Error(data.error || "Upload failed");
    }
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please provide a video title");
      return;
    }

    if (sourceMode === "system" && !videoFile && !videoPreviewUrl) {
      showToast("Please select a video file from your system");
      return;
    }

    if (sourceMode === "embed" && !embedUrl.trim()) {
      showToast("Please provide an embed URL");
      return;
    }

    try {
      setSaving(true);
      let finalEmbedUrl = embedUrl;
      let finalThumbnailUrl = thumbnailUrl;

      // 1. Upload video file if system file was chosen
      if (sourceMode === "system" && videoFile) {
        setUploadProgress("Uploading video file from system...");
        finalEmbedUrl = await uploadFile(videoFile);
      }

      // 2. Upload thumbnail if custom or auto-captured file exists
      if (thumbnailFile) {
        setUploadProgress("Uploading thumbnail poster...");
        try {
          finalThumbnailUrl = await uploadFile(thumbnailFile);
        } catch {
          // fallback to default image if thumb upload fails
          if (!finalThumbnailUrl) {
            finalThumbnailUrl =
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop";
          }
        }
      } else if (thumbMode === "url" && thumbnailUrl.trim()) {
        finalThumbnailUrl = thumbnailUrl.trim();
      }

      // 3. Save video record into database
      setUploadProgress("Saving video to library...");
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: category.trim() || "Cloud Engineering",
          duration: duration.trim() || "10:00",
          embed_url: finalEmbedUrl,
          thumbnail_url: finalThumbnailUrl,
        }),
      });

      const data = await res.json();
      if (data.success && data.video) {
        onVideoCreated(data.video);
        showToast("✓ Video added successfully to Knowledge Library!");
        handleClose();
      } else {
        showToast(data.error || "Failed to save video");
      }
    } catch (err: any) {
      showToast(err.message || "Failed to upload video from system");
    } finally {
      setSaving(false);
      setUploadProgress("");
    }
  };

  const handleClose = () => {
    setTitle("");
    setVideoFile(null);
    setVideoPreviewUrl("");
    setThumbnailFile(null);
    setThumbnailPreviewUrl("");
    setSaving(false);
    setUploadProgress("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-lg w-full p-6 shadow-2xl relative text-left my-6 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
        >
          ✕
        </button>
        <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">
          MEDIA CMS
        </span>
        <h3 className="text-lg font-bold text-[#0F172A] mb-3">Add Video to Knowledge Library</h3>

        {/* Video Source Selector Tabs */}
        <div className="flex bg-[#F1F5F9] p-1 rounded-lg mb-4 border border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => setSourceMode("system")}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              sourceMode === "system"
                ? "bg-white text-[#0F172A] shadow-sm"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <span>💻</span>
            <span>Upload from System (PC)</span>
          </button>
          <button
            type="button"
            onClick={() => setSourceMode("embed")}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              sourceMode === "embed"
                ? "bg-white text-[#0F172A] shadow-sm"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <span>🔗</span>
            <span>Embed URL (YouTube/Vimeo)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          {/* 1. Title */}
          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Video Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus in Cloud Environments"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#FF6B00] text-xs"
            />
          </div>

          {/* 2. Category & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-white text-xs"
              >
                <option value="Cloud Engineering">Cloud Engineering</option>
                <option value="AI & LLM Systems">AI &amp; LLM Systems</option>
                <option value="DevOps & SRE">DevOps &amp; SRE</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Hardware Architecture">Hardware Architecture</option>
                <option value="Technical Whitepapers">Technical Whitepapers</option>
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#0F172A]">Duration</label>
                {sourceMode === "system" && videoFile && (
                  <span className="text-[10px] text-[#059669] font-bold">Auto-detected</span>
                )}
              </div>
              <input
                type="text"
                placeholder="e.g. 15:00"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none text-xs"
              />
            </div>
          </div>

          {/* 3. Video Source Input */}
          {sourceMode === "system" ? (
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">
                Select Video File from System (PC) *
              </label>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-matroska,.mp4,.webm,.mov,.mkv"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleVideoFileChange(f);
                }}
                className="hidden"
              />

              {!videoFile ? (
                <div
                  onClick={() => videoInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files?.[0];
                    if (f && f.type.startsWith("video/")) handleVideoFileChange(f);
                  }}
                  className="border-2 border-dashed border-gray-300 hover:border-[#FF6B00] rounded-lg p-5 text-center cursor-pointer bg-[#F8FAFC] transition-colors"
                >
                  <div className="text-3xl mb-1">🎬</div>
                  <div className="font-bold text-[#0F172A] text-xs">
                    Click to browse or drag &amp; drop video here
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Supports MP4, WebM, MOV, MKV files
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-3 bg-[#F8FAFC]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-lg">📹</span>
                      <div className="overflow-hidden">
                        <div className="font-bold text-[#0F172A] text-xs truncate">
                          {videoFile.name}
                        </div>
                        <div className="text-[10px] text-[#64748B]">
                          {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoFile(null);
                        setVideoPreviewUrl("");
                      }}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold underline cursor-pointer ml-2 flex-shrink-0"
                    >
                      Change Video
                    </button>
                  </div>

                  {/* Video Preview Player */}
                  {videoPreviewUrl && (
                    <div className="rounded overflow-hidden bg-black aspect-video max-h-40 flex items-center justify-center">
                      <video
                        src={videoPreviewUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">
                Embed URL (YouTube / Vimeo) *
              </label>
              <input
                type="url"
                required
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#FF6B00] text-xs"
              />
              <p className="text-[10px] text-[#64748B] mt-1">
                Paste any YouTube watch link, youtu.be link, or Vimeo stream link.
              </p>
            </div>
          )}

          {/* 4. Thumbnail Section */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-[#0F172A]">Video Poster / Thumbnail</label>
              <div className="flex gap-2 text-[10.5px]">
                <button
                  type="button"
                  onClick={() => thumbInputRef.current?.click()}
                  className="text-[#FF6B00] hover:underline font-bold cursor-pointer"
                >
                  📁 Choose from System
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => setThumbMode(thumbMode === "url" ? "auto" : "url")}
                  className="text-gray-500 hover:underline font-medium cursor-pointer"
                >
                  {thumbMode === "url" ? "Use Auto/Upload" : "Use Image URL"}
                </button>
              </div>
            </div>

            <input
              ref={thumbInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setThumbnailFile(f);
                  setThumbnailPreviewUrl(URL.createObjectURL(f));
                  setThumbMode("system");
                }
              }}
              className="hidden"
            />

            {thumbMode === "url" ? (
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none text-xs"
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-20 h-12 bg-gray-100 rounded border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {thumbnailPreviewUrl || thumbnailUrl ? (
                    <img
                      src={thumbnailPreviewUrl || thumbnailUrl}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No image</span>
                  )}
                </div>
                <div className="flex-1 text-[11px] text-[#64748B]">
                  {thumbnailFile ? (
                    <div>
                      <span className="font-bold text-[#0F172A]">{thumbnailFile.name}</span>
                      <div className="text-[10px] text-[#059669]">
                        ✓ Ready to upload from system
                      </div>
                    </div>
                  ) : (
                    <div>
                      Poster frame will be auto-generated or loaded from default.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Upload Progress Notification */}
          {saving && uploadProgress && (
            <div className="bg-[#FFF7ED] border border-[#FFEDD5] text-[#C2410C] p-2.5 rounded text-xs flex items-center gap-2 animate-pulse">
              <span className="animate-spin">⏳</span>
              <span>{uploadProgress}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 font-semibold cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded cursor-pointer shadow flex items-center gap-1.5 text-xs transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Processing...</span>
                </>
              ) : sourceMode === "system" ? (
                <>
                  <span>📤</span>
                  <span>Upload &amp; Save Video</span>
                </>
              ) : (
                <span>Save Video</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
