"use client";

import React, { useRef, useState } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";
import { uploadMultipleMediaFiles } from "@/lib/uploadHelper";
import {
  EmailDepartmentProfile,
  EmailMediaItem,
  EmailFormatType,
  buildItemViewerUrl,
} from "@/lib/email-types";
import { getEditingMediaItems } from "../templates/templates";

interface Format1ControlsProps {
  editingProfile: EmailDepartmentProfile;
  setEditingProfile: React.Dispatch<React.SetStateAction<EmailDepartmentProfile | null>>;
  activeModalFormat: EmailFormatType;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onPreviewDetailItem?: (item: EmailMediaItem) => void;
}

export const Format1Controls: React.FC<Format1ControlsProps> = ({
  editingProfile,
  setEditingProfile,
  activeModalFormat,
  showToast,
  onPreviewDetailItem,
}) => {
  const adminFetch = useAdminFetch();
  const [specsMode, setSpecsMode] = useState<"separate" | "same">("separate");
  const [uploadingItemIndex, setUploadingItemIndex] = useState<number | null>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const itemFileInputRef = useRef<HTMLInputElement>(null);

  const handleApplySpecsToAll = (sourceIndex: number) => {
    const currentList = [...getEditingMediaItems(editingProfile)];
    const source = currentList[sourceIndex];
    if (!source) return;

    const updated = currentList.map((item, i) => {
      if (i === sourceIndex) return item;
      return {
        ...item,
        title: source.title,
        year: source.year,
        condition: source.condition,
        specs: source.specs,
        details: source.details,
      };
    });

    const first = updated[0];
    setEditingProfile({
      ...editingProfile,
      mediaItems: updated,
      videoTitle: first?.title || "",
      mediaYear: first?.year,
      mediaCondition: first?.condition,
      mediaSpecs: first?.specs,
      mediaDetails: first?.details,
    });

    if (showToast) {
      showToast(`✓ Specifications from Card #${sourceIndex + 1} applied to all ${currentList.length} cards!`);
    }
  };

  const handleUpdateAllSpecs = (patch: Partial<EmailMediaItem>) => {
    const currentList = [...getEditingMediaItems(editingProfile)];
    const updated = currentList.map((item) => ({
      ...item,
      ...patch,
    }));

    const first = updated[0];
    setEditingProfile({
      ...editingProfile,
      mediaItems: updated,
      videoTitle: first?.title || "",
      videoThumbnail: first?.thumbnailUrl || first?.mediaUrl || "",
      videoUrl: first?.mediaUrl || "",
      mediaType: first?.type || "image",
      mediaYear: first?.year,
      mediaCondition: first?.condition,
      mediaSpecs: first?.specs,
      mediaDetails: first?.details,
    });
  };

  const handleUpdateItem = (index: number, patch: Partial<EmailMediaItem>) => {
    const currentList = [...getEditingMediaItems(editingProfile)];

    if (
      specsMode === "same" &&
      (patch.title !== undefined ||
        patch.year !== undefined ||
        patch.condition !== undefined ||
        patch.specs !== undefined ||
        patch.details !== undefined)
    ) {
      const updated = currentList.map((item, i) => {
        if (i === index) return { ...item, ...patch };
        return {
          ...item,
          ...(patch.title !== undefined ? { title: patch.title } : {}),
          ...(patch.year !== undefined ? { year: patch.year } : {}),
          ...(patch.condition !== undefined ? { condition: patch.condition } : {}),
          ...(patch.specs !== undefined ? { specs: patch.specs } : {}),
          ...(patch.details !== undefined ? { details: patch.details } : {}),
        };
      });
      const first = updated[0];
      setEditingProfile({
        ...editingProfile,
        mediaItems: updated,
        videoTitle: first?.title || "",
        videoThumbnail: first?.thumbnailUrl || first?.mediaUrl || "",
        videoUrl: first?.mediaUrl || "",
        mediaType: first?.type || "image",
        mediaYear: first?.year,
        mediaCondition: first?.condition,
        mediaSpecs: first?.specs,
        mediaDetails: first?.details,
      });
      return;
    }

    currentList[index] = { ...currentList[index], ...patch };
    const first = currentList[0];
    setEditingProfile({
      ...editingProfile,
      mediaItems: currentList,
      videoTitle: first?.title || "",
      videoThumbnail: first?.thumbnailUrl || first?.mediaUrl || "",
      videoUrl: first?.mediaUrl || "",
      mediaType: first?.type || "image",
      mediaYear: first?.year,
      mediaCondition: first?.condition,
      mediaSpecs: first?.specs,
      mediaDetails: first?.details,
    });
  };

  const handleAddCard = () => {
    const currentList = [...getEditingMediaItems(editingProfile)];
    const count = currentList.length + 1;
    const firstItem = currentList[0];

    const newItem: EmailMediaItem = {
      id: `item-${Date.now()}-${count}`,
      type: "image",
      title: specsMode === "same" && firstItem?.title ? firstItem.title : `Machine / Product Offer #${count}`,
      thumbnailUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      mediaUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      year: specsMode === "same" && firstItem?.year ? firstItem.year : "2018",
      condition: specsMode === "same" && firstItem?.condition ? firstItem.condition : "★★★★☆",
      specs: specsMode === "same" && firstItem?.specs ? firstItem.specs : "Fully inspected, standard configuration",
      details: specsMode === "same" && firstItem?.details ? firstItem.details : "",
    };
    const updated = [...currentList, newItem];
    setEditingProfile({
      ...editingProfile,
      mediaItems: updated,
    });
    if (showToast) showToast(`✓ Added Offer Card #${count}! Total cards: ${updated.length}`);
  };

  const handleRemoveCard = (index: number) => {
    const currentList = [...getEditingMediaItems(editingProfile)];
    if (currentList.length <= 1) {
      if (showToast) showToast("At least 1 card is required.", "error");
      return;
    }
    currentList.splice(index, 1);
    const first = currentList[0];
    setEditingProfile({
      ...editingProfile,
      mediaItems: currentList,
      videoTitle: first?.title || "",
      videoThumbnail: first?.thumbnailUrl || first?.mediaUrl || "",
      videoUrl: first?.mediaUrl || "",
      mediaType: first?.type || "image",
      mediaYear: first?.year,
      mediaCondition: first?.condition,
      mediaSpecs: first?.specs,
      mediaDetails: first?.details,
    });
    if (showToast) showToast(`Card removed. ${currentList.length} card(s) remaining.`);
  };

  const handleBatchFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploadingMedia(true);
      if (showToast) showToast(`Uploading ${files.length} pictures concurrently from computer...`);
      const results = await uploadMultipleMediaFiles(files, adminFetch);
      if (results && results.length > 0) {
        const currentList = [...getEditingMediaItems(editingProfile)];
        const firstItem = currentList[0];

        const newItems: EmailMediaItem[] = results.map((res, i) => {
          const rawName = (res.filename || `Equipment Offer #${currentList.length + i + 1}`)
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]+/g, " ");
          const cleanTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);
          return {
            id: `item-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
            type: res.mediaType,
            title: specsMode === "same" && firstItem?.title ? firstItem.title : cleanTitle,
            thumbnailUrl: res.url,
            mediaUrl: res.url,
            year: specsMode === "same" && firstItem?.year ? firstItem.year : "2018",
            condition: specsMode === "same" && firstItem?.condition ? firstItem.condition : "★★★★☆",
            specs: specsMode === "same" && firstItem?.specs ? firstItem.specs : "Standard configuration, fully inspected",
            details: specsMode === "same" && firstItem?.details ? firstItem.details : "",
          };
        });

        let mergedList = [...currentList];
        if (
          mergedList.length === 1 &&
          (!mergedList[0].thumbnailUrl || mergedList[0].thumbnailUrl.includes("photo-1551434678")) &&
          !mergedList[0].specs
        ) {
          mergedList = newItems;
        } else {
          mergedList = [...mergedList, ...newItems];
        }

        const first = mergedList[0];
        setEditingProfile({
          ...editingProfile,
          mediaItems: mergedList,
          videoTitle: first?.title || "",
          videoThumbnail: first?.thumbnailUrl || first?.mediaUrl || "",
          videoUrl: first?.mediaUrl || "",
          mediaType: first?.type || "image",
          mediaYear: first?.year,
          mediaCondition: first?.condition,
          mediaSpecs: first?.specs,
          mediaDetails: first?.details,
        });

        const rowsCount = Math.ceil(mergedList.length / 2);
        if (showToast) {
          showToast(
            `✓ Successfully uploaded ${results.length} pictures! Added ${rowsCount} catalog rows (${mergedList.length} total cards).`
          );
        }
      }
    } catch (err: any) {
      if (showToast) showToast(`Batch upload failed: ${err.message}`, "error");
    } finally {
      setIsUploadingMedia(false);
      if (multiFileInputRef.current) multiFileInputRef.current.value = "";
    }
  };

  const handleItemFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0 || uploadingItemIndex === null) return;
    const files = Array.from(fileList);

    try {
      setIsUploadingMedia(true);
      const results = await uploadMultipleMediaFiles(files, adminFetch);
      if (!results || results.length === 0) {
        if (showToast) showToast("Upload failed: No file was uploaded.", "error");
        return;
      }

      const currentList: EmailMediaItem[] = [...getEditingMediaItems(editingProfile)];
      const target = currentList[uploadingItemIndex] || {
        id: "item-" + Date.now(),
        type: "image",
      };

      const newUrls = results.map((r) => r.url);
      const existingGallery = Array.isArray(target.galleryUrls)
        ? target.galleryUrls
        : target.thumbnailUrl
        ? [target.thumbnailUrl]
        : [];
      const combinedGallery = Array.from(new Set([...existingGallery, ...newUrls]));

      const firstRes = results[0];
      if (firstRes.mediaType === "video") {
        currentList[uploadingItemIndex] = {
          ...target,
          type: "video",
          mediaUrl: firstRes.url,
          thumbnailUrl:
            target.thumbnailUrl ||
            "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
          title: target.title || firstRes.filename?.replace(/\.[^/.]+$/, "") || target.title,
          galleryUrls: combinedGallery,
        };
      } else {
        currentList[uploadingItemIndex] = {
          ...target,
          type: "image",
          thumbnailUrl: target.thumbnailUrl || firstRes.url,
          mediaUrl: target.mediaUrl || firstRes.url,
          title: target.title || firstRes.filename?.replace(/\.[^/.]+$/, "") || target.title,
          galleryUrls: combinedGallery,
        };
      }

      const first = currentList[0];
      setEditingProfile({
        ...editingProfile,
        mediaItems: currentList,
        videoTitle: first?.title || "",
        videoThumbnail: first?.thumbnailUrl || first?.mediaUrl || "",
        videoUrl: first?.mediaUrl || "",
        mediaType: first?.type || "image",
        mediaYear: first?.year,
        mediaCondition: first?.condition,
        mediaSpecs: first?.specs,
        mediaDetails: first?.details,
      });

      if (showToast) {
        showToast(
          results.length > 1
            ? `✓ ${results.length} pictures uploaded & attached to Card #${uploadingItemIndex + 1}!`
            : `✓ Picture uploaded for Card #${uploadingItemIndex + 1}!`
        );
      }
    } catch (err: any) {
      if (showToast) showToast("Upload failed: " + err.message, "error");
    } finally {
      setIsUploadingMedia(false);
      setUploadingItemIndex(null);
      if (itemFileInputRef.current) itemFileInputRef.current.value = "";
    }
  };

  const handleSetCardCoverPhoto = (cardIdx: number, photoUrl: string) => {
    const currentList = [...getEditingMediaItems(editingProfile)];
    const target = currentList[cardIdx];
    if (!target) return;
    currentList[cardIdx] = {
      ...target,
      thumbnailUrl: photoUrl,
      mediaUrl: target.type === "image" ? photoUrl : target.mediaUrl,
    };
    setEditingProfile({ ...editingProfile, mediaItems: currentList });
    if (showToast) showToast("✓ Main cover photo updated!");
  };

  const handleRemoveCardGalleryPhoto = (cardIdx: number, photoUrl: string) => {
    const currentList = [...getEditingMediaItems(editingProfile)];
    const target = currentList[cardIdx];
    if (!target) return;
    const currentGallery = Array.isArray(target.galleryUrls)
      ? target.galleryUrls
      : target.thumbnailUrl
      ? [target.thumbnailUrl]
      : [];
    const updatedGallery = currentGallery.filter((u) => u !== photoUrl);
    const newCover = target.thumbnailUrl === photoUrl ? updatedGallery[0] || "" : target.thumbnailUrl;
    currentList[cardIdx] = {
      ...target,
      galleryUrls: updatedGallery,
      thumbnailUrl: newCover,
      mediaUrl: target.type === "image" ? newCover || target.mediaUrl : target.mediaUrl,
    };
    setEditingProfile({ ...editingProfile, mediaItems: currentList });
    if (showToast) showToast("✓ Photo removed from card.");
  };

  const handleMoveCard = (index: number, direction: "up" | "down") => {
    const currentList = [...getEditingMediaItems(editingProfile)];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentList.length) return;
    const temp = currentList[index];
    currentList[index] = currentList[targetIdx];
    currentList[targetIdx] = temp;

    const first = currentList[0];
    setEditingProfile({
      ...editingProfile,
      mediaItems: currentList,
      videoTitle: first?.title || "",
      videoThumbnail: first?.thumbnailUrl || first?.mediaUrl || "",
      videoUrl: first?.mediaUrl || "",
      mediaType: first?.type || "image",
      mediaYear: first?.year,
      mediaCondition: first?.condition,
      mediaSpecs: first?.specs,
      mediaDetails: first?.details,
    });
  };

  const handleClearAllCards = () => {
    const defaultOne: EmailMediaItem = {
      id: `item-${Date.now()}-1`,
      type: "image",
      title: "New Equipment Offer",
      thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      year: "2020",
      condition: "★★★★☆",
      specs: "Inspected & ready for production",
    };
    setEditingProfile({
      ...editingProfile,
      mediaItems: [defaultOne],
      videoTitle: defaultOne.title || "",
      videoThumbnail: defaultOne.thumbnailUrl || "",
      videoUrl: defaultOne.mediaUrl || "",
      mediaType: "image",
      mediaYear: defaultOne.year,
      mediaCondition: defaultOne.condition,
      mediaSpecs: defaultOne.specs,
    });
    if (showToast) showToast("Reset to 1 clean card.");
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
        <div>
          <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
            2. Machine Offers &amp; Equipment Showcase Cards ({activeModalFormat === "format-announcement" ? "Format 3 Hero & Units" : "Format 1 Catalog Cards"})
          </span>
          <span className="text-[11px] text-gray-500">
            {activeModalFormat === "format-announcement"
              ? "Card 1 is your Main Hero Machinery showcase, Card 2 is the Secondary Split feature card, and additional cards appear in the inventory grid."
              : "Upload single or multiple pictures at once. They will automatically format into clean 2-column multi-rows (Row 1, Row 2, Row 3...)."}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full border border-blue-200">
            📊 {getEditingMediaItems(editingProfile).length} Cards (
            {Math.ceil(getEditingMediaItems(editingProfile).length / 2)} Rows)
          </span>
        </div>
      </div>

      {/* Hidden inputs */}
      <input
        type="file"
        ref={multiFileInputRef}
        multiple
        accept="image/*,video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={handleBatchFileUpload}
      />
      <input
        type="file"
        ref={itemFileInputRef}
        multiple
        accept="image/*,video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={handleItemFileUpload}
      />

      {/* PROMINENT MULTI-PICTURE BATCH UPLOAD HERO CARD */}
      <div
        onClick={() => multiFileInputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 hover:from-blue-100/60 hover:to-indigo-50/70 rounded-xl p-4 text-center cursor-pointer transition-all shadow-2xs group"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
            📁
          </div>
          <div className="text-left">
            <div className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-2">
              <span>Click to Select Multiple Pictures at Once (from Computer)</span>
              <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider">
                Multi-Select
              </span>
            </div>
            <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
              Hold <kbd className="px-1 py-0.2 bg-white border border-gray-300 rounded font-mono text-[10px]">Ctrl</kbd> or <kbd className="px-1 py-0.2 bg-white border border-gray-300 rounded font-mono text-[10px]">Shift</kbd> to select 2, 4, 6 or more machine pictures together. Each picture creates a catalog card automatically!
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddCard}
            className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>➕</span>
            <span>Add 1 Blank Card</span>
          </button>

          <button
            type="button"
            onClick={() => multiFileInputRef.current?.click()}
            className="px-3 py-1.5 bg-[#0052FF] hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>📁</span>
            <span>Upload More Pictures (Multiple)</span>
          </button>
        </div>

        {getEditingMediaItems(editingProfile).length > 1 && (
          <button
            type="button"
            onClick={handleClearAllCards}
            className="px-2.5 py-1 text-gray-500 hover:text-red-600 text-xs font-semibold cursor-pointer transition-colors"
          >
            Reset / Clear All Cards
          </button>
        )}
      </div>

      {/* Specification Mode Selector Bar */}
      <div className="p-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-200/80 rounded-xl space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>⚙️ Specifications:</span>
            </span>
            <div className="inline-flex rounded-lg bg-white p-0.5 border border-slate-300 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setSpecsMode("separate");
                  if (showToast) showToast("Switched to Separate Specs per Card");
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  specsMode === "separate"
                    ? "bg-[#0052FF] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📝 Separate per Card
              </button>
              <button
                type="button"
                onClick={() => {
                  setSpecsMode("same");
                  handleApplySpecsToAll(0);
                  if (showToast) showToast("Switched to Same Specs for All Cards! Synced across all cards.");
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  specsMode === "same"
                    ? "bg-[#0052FF] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🔗 Same for All Cards
              </button>
            </div>
          </div>

          {getEditingMediaItems(editingProfile).length > 1 && (
            <button
              type="button"
              onClick={() => handleApplySpecsToAll(0)}
              className="px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded-md text-[11px] font-bold cursor-pointer transition-colors shadow-2xs flex items-center gap-1"
              title="Copy title, year, condition and specs from Card #1 to all other cards"
            >
              <span>📋 Copy Card #1 Specs to All</span>
            </button>
          )}
        </div>

        {/* Quick Helper info or Master Edit bar when in 'same' mode */}
        {specsMode === "same" ? (
          <div className="bg-white/95 border border-blue-200 rounded-lg p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Master Specifications (Editing any field updates all {getEditingMediaItems(editingProfile).length} cards automatically)</span>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Machine Title</label>
                <input
                  type="text"
                  value={getEditingMediaItems(editingProfile)[0]?.title || ""}
                  onChange={(e) => handleUpdateAllSpecs({ title: e.target.value })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md outline-none font-bold text-slate-900 focus:border-blue-500 bg-white"
                  placeholder="e.g. Heidelberg CD102-6+LX"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Year</label>
                <input
                  type="text"
                  value={getEditingMediaItems(editingProfile)[0]?.year || ""}
                  onChange={(e) => handleUpdateAllSpecs({ year: e.target.value })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md outline-none font-mono text-center text-slate-900 focus:border-blue-500 bg-white"
                  placeholder="2001"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Condition</label>
                <select
                  value={getEditingMediaItems(editingProfile)[0]?.condition || "★★★★☆"}
                  onChange={(e) => handleUpdateAllSpecs({ condition: e.target.value })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md outline-none text-amber-500 font-bold focus:border-blue-500 bg-white cursor-pointer"
                >
                  <option value="★★★★★">★★★★★ (Like New)</option>
                  <option value="★★★★☆">★★★★☆ (Very Good)</option>
                  <option value="★★★☆☆">★★★☆☆ (Good)</option>
                  <option value="★★☆☆☆">★★☆☆☆ (Fair)</option>
                  <option value="Brand New">Brand New</option>
                  <option value="Overhauled">Refurbished</option>
                </select>
              </div>
              <div className="md:col-span-4">
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Technical Specifications &amp; Features</label>
                <input
                  type="text"
                  value={getEditingMediaItems(editingProfile)[0]?.specs || ""}
                  onChange={(e) => handleUpdateAllSpecs({ specs: e.target.value })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md outline-none font-mono text-slate-800 focus:border-blue-500 bg-white"
                  placeholder="e.g. 4 Colors, Coater, 15000 SPH, Autoplate, Preset Plus Feeder"
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <span>💡</span>
            <span>Har card ki specification separate hy. Agr tamam pictures ki specification aik jaisi ho to <strong>&ldquo;Same for All Cards&rdquo;</strong> select kryn ya kisi bi card pr <strong>&ldquo;Apply Specs to All Cards&rdquo;</strong> click kryn.</span>
          </p>
        )}
      </div>

      {/* Dynamic List of Multi-Row Cards */}
      <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
        {getEditingMediaItems(editingProfile).map((item, idx) => {
          const isItemVideo = item.type === "video";
          const rowNum = Math.floor(idx / 2) + 1;
          const colPos = idx % 2 === 0 ? "Left Column" : "Right Column";
          const itemImg =
            item.thumbnailUrl ||
            item.mediaUrl ||
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";

          return (
            <div
              key={item.id || idx}
              className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs hover:border-blue-400 transition-all space-y-2.5"
            >
              {/* Top Bar: Badge, Media Toggle, Actions */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                    Row {rowNum} • {colPos}
                  </span>
                  <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-md">
                    <button
                      type="button"
                      onClick={() => handleUpdateItem(idx, { type: "image" })}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                        !isItemVideo
                          ? "bg-white text-blue-700 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      🖼️ Image
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateItem(idx, { type: "video" })}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                        isItemVideo
                          ? "bg-white text-blue-700 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      🎬 Video
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveCard(idx, "up")}
                    className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    title="Move card up"
                  >
                    ⬆
                  </button>
                  <button
                    type="button"
                    disabled={idx === getEditingMediaItems(editingProfile).length - 1}
                    onClick={() => handleMoveCard(idx, "down")}
                    className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    title="Move card down"
                  >
                    ⬇
                  </button>
                  {getEditingMediaItems(editingProfile).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCard(idx)}
                      className="w-6 h-6 rounded bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold cursor-pointer flex items-center justify-center transition-colors ml-1"
                      title="Remove this card"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Card Body: Thumbnail & Details */}
              <div className="flex items-start gap-3">
                <div className="shrink-0 flex flex-col items-center gap-1.5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-900 group shadow-2xs">
                    <img
                      src={itemImg}
                      alt={item.title || "Offer"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {isItemVideo && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                        ▶
                      </div>
                    )}
                    <button
                      type="button"
                      disabled={isUploadingMedia}
                      onClick={() => {
                        setUploadingItemIndex(idx);
                        itemFileInputRef.current?.click();
                      }}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[9px] font-bold transition-opacity cursor-pointer text-center p-1"
                    >
                      <span>📷 Select</span>
                      <span>Pictures</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={isUploadingMedia}
                    onClick={() => {
                      setUploadingItemIndex(idx);
                      itemFileInputRef.current?.click();
                    }}
                    className="w-full py-1 px-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[9px] font-bold cursor-pointer transition-colors text-center flex items-center justify-center gap-1"
                    title="Select multiple pictures at once from computer"
                  >
                    <span>📷</span>
                    <span>Multi Select</span>
                  </button>
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                      Machine / Equipment Title *
                    </label>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => handleUpdateItem(idx, { title: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg outline-none bg-white font-bold text-slate-900 focus:border-blue-500"
                      placeholder={isItemVideo ? "Video Presentation Title..." : "e.g. Heidelberg CD102-6+LX"}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Year:</label>
                      <input
                        type="text"
                        value={item.year || ""}
                        onChange={(e) => handleUpdateItem(idx, { year: e.target.value })}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded-lg font-mono outline-none bg-white text-center focus:border-blue-500 font-semibold text-slate-800"
                        placeholder="2001"
                        title="Manufacturing / Model Year"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Condition:</label>
                      <select
                        value={item.condition || "★★★★☆"}
                        onChange={(e) => handleUpdateItem(idx, { condition: e.target.value })}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white outline-none focus:border-blue-500 font-bold text-amber-500 cursor-pointer"
                      >
                        <option value="★★★★★">★★★★★ (Like New)</option>
                        <option value="★★★★☆">★★★★☆ (Very Good)</option>
                        <option value="★★★☆☆">★★★☆☆ (Good)</option>
                        <option value="★★☆☆☆">★★☆☆☆ (Fair)</option>
                        <option value="Brand New">Brand New</option>
                        <option value="Overhauled">Refurbished</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Picture Gallery Strip for this specific Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <span>📷 Machine Pictures ({(item.galleryUrls && item.galleryUrls.length > 0) ? item.galleryUrls.length : (item.thumbnailUrl ? 1 : 0)})</span>
                    <span className="text-[9px] font-normal text-slate-500">(Multiple select enabled)</span>
                  </span>
                  <button
                    type="button"
                    disabled={isUploadingMedia}
                    onClick={() => {
                      setUploadingItemIndex(idx);
                      itemFileInputRef.current?.click();
                    }}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-0.5"
                  >
                    <span>+ Select Multiple</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                  {(item.galleryUrls && item.galleryUrls.length > 0
                    ? item.galleryUrls
                    : item.thumbnailUrl
                    ? [item.thumbnailUrl]
                    : []
                  ).map((pUrl, pIdx) => {
                    const isCover = (item.thumbnailUrl || item.mediaUrl) === pUrl;
                    return (
                      <div
                        key={pIdx}
                        className={`relative shrink-0 w-11 h-11 rounded-md overflow-hidden border group bg-slate-900 ${
                          isCover ? "border-blue-600 ring-2 ring-blue-400" : "border-slate-300"
                        }`}
                      >
                        <img src={pUrl} alt={`Photo ${pIdx + 1}`} className="w-full h-full object-cover" />
                        {isCover && (
                          <span className="absolute bottom-0 inset-x-0 bg-blue-600 text-[7px] text-white font-bold text-center py-0.5 leading-none">
                            Cover
                          </span>
                        )}
                        {!isCover && (
                          <button
                            type="button"
                            onClick={() => handleSetCardCoverPhoto(idx, pUrl)}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[7px] font-bold transition-opacity cursor-pointer text-center p-0.5"
                            title="Click to set as Main Cover Photo"
                          >
                            Set Cover
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveCardGalleryPhoto(idx, pUrl)}
                          className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[7px] font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
                          title="Remove photo from this card"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}

                  {/* Add button inside strip */}
                  <button
                    type="button"
                    disabled={isUploadingMedia}
                    onClick={() => {
                      setUploadingItemIndex(idx);
                      itemFileInputRef.current?.click();
                    }}
                    className="shrink-0 w-11 h-11 rounded-md border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
                    title="Select multiple pictures from computer to add to this card"
                  >
                    <span className="text-xs font-bold leading-none">+</span>
                    <span className="text-[7px] font-semibold mt-0.5">Add</span>
                  </button>
                </div>
              </div>

              {/* Specs */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="block text-[10px] font-semibold text-slate-500">
                    Key Specifications &amp; Features:
                  </label>
                  {specsMode === "same" ? (
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      🔗 Linked (Same for all cards)
                    </span>
                  ) : (
                    getEditingMediaItems(editingProfile).length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleApplySpecsToAll(idx)}
                        className="text-[9px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-0.5 hover:underline"
                        title="Copy this card's Title, Year, Condition, and Specs to all other cards"
                      >
                        <span>📋 Apply Specs to All Cards</span>
                      </button>
                    )
                  )}
                </div>
                <input
                  type="text"
                  value={item.specs || ""}
                  onChange={(e) => handleUpdateItem(idx, { specs: e.target.value })}
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono outline-none bg-white text-slate-800 focus:border-blue-500"
                  placeholder="e.g. 4 Colors, Coater, 15000 SPH, Autoplate"
                />
              </div>

              {/* Link / URL */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
                <input
                  type="text"
                  value={isItemVideo ? item.mediaUrl || "" : item.thumbnailUrl || item.mediaUrl || ""}
                  onChange={(e) => {
                    if (isItemVideo) {
                      handleUpdateItem(idx, { mediaUrl: e.target.value });
                    } else {
                      handleUpdateItem(idx, {
                        thumbnailUrl: e.target.value,
                        mediaUrl: e.target.value,
                      });
                    }
                  }}
                  className="flex-1 min-w-0 px-2.5 py-1 text-[10px] font-mono border border-slate-200 rounded-lg bg-slate-50 text-slate-600 outline-none focus:bg-white focus:border-blue-500"
                  placeholder="Photo URL or upload from computer..."
                />
                <button
                  type="button"
                  onClick={() => onPreviewDetailItem?.(item)}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-colors shrink-0 flex items-center gap-1 cursor-pointer shadow-2xs"
                  title="Open popup with full pictures, specifications and details right here"
                >
                  <span>👁️ View Details</span>
                </button>
                <a
                  href={buildItemViewerUrl(item, editingProfile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-[10px] font-semibold transition-colors shrink-0 flex items-center gap-0.5"
                  title="Open public page in new tab"
                >
                  <span>Page</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Row Catalog Notice */}
      <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between text-xs text-blue-900">
        <span className="font-semibold flex items-center gap-1.5">
          <span>💡</span>
          <span>
            Multi-Row Layout Active: Cards are automatically arranged in 2-column rows in email center.
          </span>
        </span>
        <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-blue-300 shrink-0">
          2 Columns • {Math.ceil(getEditingMediaItems(editingProfile).length / 2)} Rows
        </span>
      </div>
    </div>
  );
};

export default Format1Controls;
