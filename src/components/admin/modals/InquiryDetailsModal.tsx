"use client";

import React, { useState, useEffect, useRef } from "react";
import { Inquiry } from "@/types/admin";
import { useAdminFetch } from "@/lib/useAdminFetch";
import {
  EmailDepartmentProfile,
  EmailMediaItem,
  DEFAULT_EMAIL_PROFILES,
  generateEmailHtml,
  buildMediaViewerUrl,
  buildItemViewerUrl,
  ACCENT_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
  BG_COLOR_PRESETS,
} from "@/lib/email-types";
import { uploadImageFile, uploadMediaFile, uploadMultipleMediaFiles } from "@/lib/uploadHelper";
import EquipmentOfferDetailModal from "./EquipmentOfferDetailModal";

interface InquiryDetailsModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onInquiryUpdated?: () => void;
  showToast?: (msg: string, type?: "success" | "error") => void;
  initialMode?: "details" | "reply" | "settings" | "manage_profiles" | "edit_profile";
}

export default function InquiryDetailsModal({
  inquiry,
  onClose,
  onInquiryUpdated,
  showToast,
  initialMode = "details",
}: InquiryDetailsModalProps) {
  const adminFetch = useAdminFetch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemFileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const replyMultiFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadingItemIndex, setUploadingItemIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<
    "details" | "reply" | "settings" | "manage_profiles" | "edit_profile"
  >(initialMode);

  useEffect(() => {
    if (initialMode) {
      setViewMode(initialMode);
    }
  }, [initialMode, inquiry]);

  // Email Profiles Management
  const [profiles, setProfiles] = useState<EmailDepartmentProfile[]>(DEFAULT_EMAIL_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("sales");
  const [activeReplyTab, setActiveReplyTab] = useState<"edit" | "preview">("edit");
  const [editingProfile, setEditingProfile] = useState<EmailDepartmentProfile | null>(null);
  const [specsMode, setSpecsMode] = useState<"separate" | "same">("separate");
  const [previewDetailItem, setPreviewDetailItem] = useState<EmailMediaItem | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Helper to extract or initialize media items array for any profile
  const getEditingMediaItems = (p: EmailDepartmentProfile): EmailMediaItem[] => {
    if (Array.isArray(p.mediaItems) && p.mediaItems.length > 0) {
      return p.mediaItems;
    }
    if (p.videoThumbnail || p.videoUrl || p.videoTitle) {
      return [
        {
          id: "item-1",
          type: p.mediaType || "image",
          title: p.videoTitle || "Heidelberg CD102-6+LX",
          thumbnailUrl: p.videoThumbnail || p.videoUrl || "",
          mediaUrl: p.videoUrl || p.videoThumbnail || "",
          year: p.mediaYear || "2001",
          condition: p.mediaCondition || "★★★★☆",
          specs: p.mediaSpecs || "4 Colors, Coater, 15000 SPH, Autoplate",
          details: p.mediaDetails || "",
        },
      ];
    }
    return [
      {
        id: "item-1",
        type: "image",
        title: "Heidelberg CD102-6+LX",
        thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        year: "2001",
        condition: "★★★★☆",
        specs: "4 Colors, Coater, 15000 SPH, Autoplate",
        details: "Clean cylinders, tested and ready for production",
      },
    ];
  };

  // Apply specifications from a specific card to all cards
  const handleApplySpecsToAll = (sourceIndex: number) => {
    if (!editingProfile) return;
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

  // Synchronize master specifications to all cards
  const handleUpdateAllSpecs = (patch: Partial<EmailMediaItem>) => {
    if (!editingProfile) return;
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

  // Single card computer file upload
  // File upload from computer handler (Single or Multi-picture selection for a specific Card)
  const handleItemFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0 || !editingProfile || uploadingItemIndex === null) return;
    const files = Array.from(fileList);

    try {
      setIsUploadingImage(true);
      const results = await uploadMultipleMediaFiles(files, adminFetch);
      if (!results || results.length === 0) {
        if (showToast) showToast("Upload failed: No file was uploaded.", "error");
        return;
      }

      const currentList = [...getEditingMediaItems(editingProfile)];
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
      setIsUploadingImage(false);
      setUploadingItemIndex(null);
      if (itemFileInputRef.current) itemFileInputRef.current.value = "";
    }
  };

  const handleSetCardCoverPhoto = (cardIdx: number, photoUrl: string) => {
    if (!editingProfile) return;
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
    if (!editingProfile) return;
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

  // Batch multi-picture computer upload (Multiple files at once)
  const handleBatchFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProfile) return;
    try {
      setIsUploadingImage(true);
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
            `✓ Successfully uploaded ${results.length} pictures! Created ${rowsCount} catalog rows (${mergedList.length} total cards).`
          );
        }
      }
    } catch (err: any) {
      if (showToast) showToast(`Batch upload failed: ${err.message}`, "error");
    } finally {
      setIsUploadingImage(false);
      if (multiFileInputRef.current) multiFileInputRef.current.value = "";
    }
  };

  // Upload multiple images directly from the Reply screen and attach as catalog cards
  const handleReplyBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploadingImage(true);
      if (showToast) showToast(`Uploading ${files.length} picture(s)...`);

      const results = await uploadMultipleMediaFiles(files, adminFetch);
      if (results.length > 0) {
        const newItems: EmailMediaItem[] = results.map((res, i) => {
          const rawName = (res.filename || `Machine Offer #${i + 1}`)
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]+/g, " ");
          const cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
          return {
            id: `item-${Date.now()}-${i}`,
            type: "image",
            title: cleanName || `Machine Offer #${i + 1}`,
            thumbnailUrl: res.url,
            mediaUrl: res.url,
            year: "2018",
            condition: "★★★★☆",
            specs: "Standard configuration, fully inspected",
            details: "",
          };
        });

        const currentItems = getEditingMediaItems(currentProfile);
        let mergedList = [...currentItems];
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
        const updatedProfile: EmailDepartmentProfile = {
          ...currentProfile,
          mediaItems: mergedList,
          videoTitle: first?.title || "",
          videoThumbnail: first?.thumbnailUrl || first?.mediaUrl || "",
          videoUrl: first?.mediaUrl || "",
          mediaType: first?.type || "image",
          mediaYear: first?.year,
          mediaCondition: first?.condition,
          mediaSpecs: first?.specs,
          mediaDetails: first?.details,
        };

        const updatedProfiles = profiles.map((p) =>
          p.id === currentProfile.id ? updatedProfile : p
        );
        setProfiles(updatedProfiles);
        handleSaveProfile(updatedProfile, false);

        const rowsCount = Math.ceil(mergedList.length / 2);
        if (showToast) {
          showToast(
            `✓ Successfully uploaded and attached ${results.length} pictures! (${mergedList.length} cards in ${rowsCount} rows)`
          );
        }
      }
    } catch (err: any) {
      if (showToast) showToast(`Batch upload failed: ${err.message}`, "error");
    } finally {
      setIsUploadingImage(false);
      if (replyMultiFileInputRef.current) replyMultiFileInputRef.current.value = "";
    }
  };

  const handleUpdateItem = (index: number, patch: Partial<EmailMediaItem>) => {
    if (!editingProfile) return;
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
    if (!editingProfile) return;
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
    if (!editingProfile) return;
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

  const handleMoveCard = (index: number, direction: "up" | "down") => {
    if (!editingProfile) return;
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
    if (!editingProfile) return;
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

  // Render 2-Column Multi-Row Catalog Grid in live preview
  const renderMediaPreview = (profile: EmailDepartmentProfile, isSmall = false) => {
    const items: EmailMediaItem[] =
      Array.isArray(profile.mediaItems) && profile.mediaItems.length > 0
        ? profile.mediaItems
        : profile.videoThumbnail || profile.videoUrl
        ? [
            {
              id: "item-1",
              type: profile.mediaType || "image",
              title: profile.videoTitle || "Equipment / Solution Overview",
              thumbnailUrl: profile.videoThumbnail || profile.videoUrl || "",
              mediaUrl: profile.videoUrl || profile.videoThumbnail || "",
              year: profile.mediaYear,
              condition: profile.mediaCondition,
              specs: profile.mediaSpecs,
              details: profile.mediaDetails,
            },
          ]
        : [];

    if (items.length === 0) return null;

    const alignClass =
      profile.mediaAlignment === "left"
        ? `${isSmall ? "max-w-[280px]" : "max-w-[360px]"} mr-auto`
        : profile.mediaAlignment === "right"
        ? `${isSmall ? "max-w-[280px]" : "max-w-[360px]"} ml-auto`
        : "w-full";

    if (items.length > 1) {
      return (
        <div className={`my-3 ${alignClass}`}>
          <div className="grid grid-cols-2 gap-2">
            {items.map((item, idx) => {
              const isVideo = item.type === "video";
              const itemImg =
                item.thumbnailUrl ||
                item.mediaUrl ||
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
              const targetUrl = buildItemViewerUrl(item, profile);

              return (
                <div
                  key={item.id || idx}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 text-left shadow-xs flex flex-col hover:border-gray-300 transition-colors"
                >
                  <div
                    onClick={() => setPreviewDetailItem(item)}
                    className="block relative group shrink-0 cursor-pointer"
                    title="Click to open Machine Details Popup"
                  >
                    <div className="relative bg-gray-900 overflow-hidden">
                      <img
                        src={itemImg}
                        alt={item.title || "Offer"}
                        className={`w-full ${isSmall ? "h-20" : "h-28"} object-cover group-hover:scale-105 transition-transform duration-200`}
                      />
                      {isVideo && (
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md text-xs font-bold"
                          style={{ backgroundColor: profile.accentColor || "#FF6B00" }}
                        >
                          ▶
                        </div>
                      )}
                      {Array.isArray(item.galleryUrls) && item.galleryUrls.length > 1 && (
                        <div className="absolute top-1.5 right-1.5 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
                          <span>📷</span>
                          <span>{item.galleryUrls.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-2 flex-1 flex flex-col justify-between bg-white text-gray-900">
                    <div>
                      <button
                        type="button"
                        onClick={() => setPreviewDetailItem(item)}
                        className={`font-bold text-gray-900 line-clamp-1 hover:underline text-left cursor-pointer ${
                          isSmall ? "text-[11px]" : "text-xs"
                        }`}
                      >
                        {item.title || `Offer #${idx + 1}`}
                      </button>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-0.5">
                        <span>{item.year ? `Year: ${item.year}` : "Offer"}</span>
                        <span className="text-amber-500 font-bold">{item.condition || "★★★★☆"}</span>
                      </div>
                      {item.specs && (
                        <div className="text-[9px] text-gray-600 bg-gray-50 p-1 rounded font-mono mt-1 line-clamp-1">
                          {item.specs}
                        </div>
                      )}
                    </div>
                    <div className="mt-1.5 pt-1 border-t border-gray-100 flex items-center justify-between text-[10px]">
                      <span className="text-gray-400 text-[9px]">Click to preview</span>
                      <button
                        type="button"
                        onClick={() => setPreviewDetailItem(item)}
                        className="font-bold text-[10px] cursor-pointer hover:underline"
                        style={{ color: profile.accentColor || "#FF6B00" }}
                      >
                        {isVideo ? "▶ Play ↗" : "👁️ View Details"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    const single = items[0];
    const mediaSrc = single.thumbnailUrl || single.mediaUrl || "";
    if (!mediaSrc) return null;

    const isVideo =
      single.type === "video" ||
      Boolean(
        single.mediaUrl &&
          (single.mediaUrl.includes("youtu") ||
            single.mediaUrl.includes("vimeo") ||
            single.mediaUrl.endsWith(".mp4") ||
            single.mediaUrl.endsWith(".webm"))
      );

    const targetUrl = buildItemViewerUrl(single, profile);

    if (!isVideo) {
      return (
        <div className={`my-3 bg-white rounded-lg overflow-hidden border border-gray-200 text-left shadow-xs ${alignClass}`}>
          <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="block relative group">
            <img
              src={mediaSrc}
              alt={single.title || "Offer Showcase"}
              className={`w-full ${isSmall ? "h-24" : "h-36"} object-cover`}
            />
            <div className="p-2.5 bg-white text-gray-900">
              <div className={`font-bold text-gray-900 truncate ${isSmall ? "text-[11px]" : "text-xs"}`}>
                {single.title || "Equipment / Solution Overview"}
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                <span>{single.year ? `Year: ${single.year}` : "Current Offer"}</span>
                <span className="text-amber-500 font-bold">{single.condition || "★★★★☆"}</span>
              </div>
              {single.specs && (
                <div className="text-[9px] text-gray-600 bg-gray-50 p-1 rounded font-mono mt-1 truncate">
                  {single.specs}
                </div>
              )}
              <div className="mt-1.5 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[10px]">
                <span className="text-gray-400 font-medium">Click to view details</span>
                <span className="font-bold" style={{ color: profile.accentColor || "#FF6B00" }}>
                  View Details ↗
                </span>
              </div>
            </div>
          </a>
        </div>
      );
    }

    return (
      <div className={`my-3 bg-gray-900 rounded-lg overflow-hidden border border-gray-200 text-left shadow-xs ${alignClass}`}>
        <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="block relative group">
          <div className="relative">
            <img
              src={mediaSrc}
              alt="Video Presentation"
              className={`w-full ${isSmall ? "h-24" : "h-36"} object-cover opacity-85 group-hover:opacity-95 transition-opacity`}
            />
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                isSmall ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"
              } rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110`}
              style={{ backgroundColor: profile.accentColor || "#FF6B00" }}
            >
              ▶
            </div>
          </div>
          <div className="p-2 bg-[#0b1120] text-white flex items-center justify-between text-[10px]">
            <span className="font-semibold truncate max-w-[170px]">
              {single.title || "Watch Presentation"}
            </span>
            <span className="font-bold shrink-0 text-[#FF6B00]" style={{ color: profile.accentColor || "#FF6B00" }}>
              ▶ Play Video ↗
            </span>
          </div>
        </a>
      </div>
    );
  };

  // General single file upload fallback
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProfile) return;
    try {
      setIsUploadingImage(true);
      const uploadedUrl = await uploadImageFile(file, adminFetch);
      if (uploadedUrl) {
        setEditingProfile({
          ...editingProfile,
          videoThumbnail: uploadedUrl,
        });
        if (showToast) showToast("✓ Image uploaded from computer successfully!");
      }
    } catch (err: any) {
      if (showToast) showToast("Upload failed: " + err.message, "error");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Email Composer Form
  const [toEmail, setToEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [autoUpdateStatus, setAutoUpdateStatus] = useState(true);
  const [showReferenceBadge, setShowReferenceBadge] = useState(true);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendResultMsg, setSendResultMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // SMTP Settings Form
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState(465);
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [smtpFromName, setSmtpFromName] = useState("Creed Tech Enterprise");
  const [smtpFromEmail, setSmtpFromEmail] = useState("contact@creed-tech.com");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [smtpStatusMsg, setSmtpStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Load configured profiles from database with de-duplication
  useEffect(() => {
    adminFetch("/api/admin/email/profiles")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.profiles) && data.profiles.length > 0) {
          const uniqueList: EmailDepartmentProfile[] = [];
          const seenEmails = new Set<string>();
          const seenIds = new Set<string>();
          for (const p of data.profiles) {
            const emailKey = (p.email || "").trim().toLowerCase();
            if (p.id && emailKey && !seenEmails.has(emailKey) && !seenIds.has(p.id)) {
              seenEmails.add(emailKey);
              seenIds.add(p.id);
              uniqueList.push(p);
            }
          }
          const finalProfiles = uniqueList.length > 0 ? uniqueList : data.profiles;
          setProfiles(finalProfiles);
          const defaultOrSales =
            finalProfiles.find((p: EmailDepartmentProfile) => p.isDefault) ||
            finalProfiles.find((p: EmailDepartmentProfile) => p.id === "sales") ||
            finalProfiles[0];
          if (defaultOrSales) {
            setSelectedProfileId(defaultOrSales.id);
          }
        }
      })
      .catch(() => {});
  }, [adminFetch]);

  // Load existing SMTP settings
  useEffect(() => {
    adminFetch("/api/admin/email/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.config) {
          setSmtpHost(data.config.host || "smtp.gmail.com");
          setSmtpPort(data.config.port || 465);
          setSmtpUser(data.config.user || "");
          setSmtpFromName(data.config.from_name || "Creed Tech Enterprise");
          setSmtpFromEmail(data.config.from_email || "contact@creed-tech.com");
          setIsConfigured(Boolean(data.config.isConfigured));
        }
      })
      .catch(() => {});
  }, [adminFetch]);

  // Resolve current active profile
  const currentProfile: EmailDepartmentProfile =
    profiles.find((p) => p.id === selectedProfileId) || profiles[0] || DEFAULT_EMAIL_PROFILES[0];

  // Initialize Reply fields whenever an inquiry opens or active profile switches
  useEffect(() => {
    if (inquiry) {
      setToEmail(inquiry.email || "");
      setReferenceNumber(
        currentProfile.referenceBadgeText
          ? currentProfile.referenceBadgeText.replace("{id}", String(inquiry.id))
          : `REF #${inquiry.id}`
      );
      setShowReferenceBadge(currentProfile.showReferenceBadge !== false);
      
      const subject = (currentProfile.defaultSubjectTemplate || "Re: Creed Tech Discovery & Scoping - {service} [Inquiry #{id}]")
        .replace("{service}", inquiry.service || "Enterprise Service")
        .replace("{id}", String(inquiry.id));
      setEmailSubject(subject);

      const body = (currentProfile.defaultMessageTemplate ||
`Dear {client_name},

Thank you for reaching out to Creed Tech regarding your inquiry for "{service}".

We have received and reviewed your project details:
"${inquiry.project_details || "Technical architecture and engineering scoping"}"

Our senior systems engineering team would be pleased to proceed with this session. Please let us know your preferred meeting schedule or if you require an NDA executed prior to our technical discovery call.

Best regards,

${currentProfile.name}
Website: https://creed-tech.com
Desk: ${currentProfile.email}`)
        .replace("{client_name}", inquiry.client_name || "Client")
        .replace("{service}", inquiry.service || "Enterprise Service")
        .replace("{id}", String(inquiry.id));

      setEmailBody(body);
      setSendResultMsg(null);
    }
  }, [inquiry, selectedProfileId, profiles]);

  if (!inquiry) return null;

  // Switch active profile in reply composer
  const handleSelectProfile = (pId: string) => {
    setSelectedProfileId(pId);
    const target = profiles.find((p) => p.id === pId);
    if (target && inquiry) {
      setShowReferenceBadge(target.showReferenceBadge !== false);
      if (target.referenceBadgeText) {
        setReferenceNumber(
          target.referenceBadgeText.replace("{id}", String(inquiry.id))
        );
      } else {
        setReferenceNumber(`REF #${inquiry.id}`);
      }
      if (target.defaultSubjectTemplate) {
        setEmailSubject(
          target.defaultSubjectTemplate
            .replace("{service}", inquiry.service || "Enterprise Service")
            .replace("{id}", String(inquiry.id))
        );
      }
      const targetBody = (target.defaultMessageTemplate ||
`Dear {client_name},

Thank you for reaching out to Creed Tech regarding "{service}".

We have received and reviewed your project details. Our enterprise engineering team would be pleased to proceed with this session.

Best regards,

${target.name}
Desk: ${target.email}`)
        .replace("{client_name}", inquiry.client_name || "Client")
        .replace("{service}", inquiry.service || "Enterprise Service")
        .replace("{id}", String(inquiry.id));
      setEmailBody(targetBody);
    }
  };

  // Preset Template Quick Actions
  const applyTemplate = (type: "confirm" | "scoping" | "nda") => {
    if (type === "confirm") {
      setEmailSubject(`Confirmation: Technical Discovery Call - Creed Tech [Inquiry #${inquiry.id}]`);
      setEmailBody(
`Dear ${inquiry.client_name},

We are pleased to confirm your discovery call for "${inquiry.service}".

Scheduled Scope:
${inquiry.project_details || "30-min technical architecture scoping session"}

A Google Meet video invitation has been reserved for your team. Please let us know if any team members need to be added to the calendar invite.

Best regards,
${currentProfile.name}`
      );
    } else if (type === "scoping") {
      setEmailSubject(`Action Required: Project Scoping Questionnaire - Creed Tech [Inquiry #${inquiry.id}]`);
      setEmailBody(
`Dear ${inquiry.client_name},

Thank you for your interest in Creed Tech's ${inquiry.service}.

To prepare an accurate engineering roadmap and infrastructure estimate, could you please provide a few additional details:
1. Target deployment cloud/infrastructure (AWS / GCP / Azure / On-Premise)
2. Expected monthly throughput or concurrent user load
3. Anticipated timeline for architecture deployment

Looking forward to your response.

Best regards,
${currentProfile.name}`
      );
    } else if (type === "nda") {
      setEmailSubject(`Mutual NDA & Technical Scoping - Creed Tech [Inquiry #${inquiry.id}]`);
      setEmailBody(
`Dear ${inquiry.client_name},

We noted that an NDA is requested for your project "${inquiry.service}".

Creed Tech standardizes on mutual confidential protection for all proprietary enterprise architectures. Please review the attached agreement or send over your corporate NDA for execution.

Best regards,
${currentProfile.name}`
      );
    }
  };

  // Copy Rich Styled HTML To Clipboard (paste directly into Gmail / Outlook)
  const handleCopyStyledHtml = async () => {
    const htmlContent = generateEmailHtml(currentProfile, {
      clientName: inquiry.client_name,
      message: emailBody,
      subject: emailSubject,
      inquiryId: inquiry.id,
      service: inquiry.service,
      referenceBadge: showReferenceBadge && referenceNumber.trim() ? referenceNumber.trim() : null,
      showReferenceBadge,
    });

    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard && navigator.clipboard.write) {
        const blobHtml = new Blob([htmlContent], { type: "text/html" });
        const blobText = new Blob([emailBody], { type: "text/plain" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blobHtml,
            "text/plain": blobText,
          }),
        ]);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(htmlContent);
      }
      if (showToast) {
        showToast("✓ Styled email format copied! Press Ctrl+V inside Gmail or Outlook to paste rich design.");
      }
    } catch {
      if (showToast) {
        showToast("✓ Message text copied to clipboard.");
      }
      navigator.clipboard?.writeText(emailBody);
    }
  };

  // 1-Click Open in Gmail Web + Pre-fill + Rich Design Copy
  const handleOpenGmailWeb = async () => {
    await handleCopyStyledHtml();

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      toEmail
    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(gmailUrl, "_blank");

    if (autoUpdateStatus) {
      adminFetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inquiry.id, status: "RESPONDED" }),
      }).then(() => {
        if (onInquiryUpdated) onInquiryUpdated();
        if (showToast) {
          showToast(`✓ Gmail opened! Formatted design copied to clipboard (press Ctrl+V to paste).`);
        }
      });
    }
  };

  // Send Email via Server SMTP
  const handleSendServerEmail = async () => {
    if (!toEmail || !toEmail.includes("@")) {
      setSendResultMsg({ text: "Please enter a valid recipient email address.", isError: true });
      return;
    }
    if (!emailBody.trim()) {
      setSendResultMsg({ text: "Message body cannot be empty.", isError: true });
      return;
    }

    try {
      setIsSending(true);
      setSendResultMsg(null);

      const res = await adminFetch("/api/admin/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryId: inquiry.id,
          to: toEmail,
          subject: emailSubject,
          message: emailBody,
          updateStatus: autoUpdateStatus,
          profileId: currentProfile.id,
          fromEmail: currentProfile.email,
          fromName: currentProfile.name,
          clientName: inquiry.client_name,
          service: inquiry.service,
          referenceBadge: showReferenceBadge && referenceNumber.trim() ? referenceNumber.trim() : null,
          showReferenceBadge,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSendResultMsg({
          text: data.delivered
            ? `✓ Email delivered successfully to ${toEmail} from ${currentProfile.email}!`
            : `✓ Reply logged! ${data.message}`,
          isError: false,
        });

        if (showToast) {
          showToast(
            data.delivered
              ? `✓ Reply email delivered to ${toEmail} via ${currentProfile.email}!`
              : `✓ Inquiry #${inquiry.id} updated to RESPONDED!`
          );
        }

        if (onInquiryUpdated) onInquiryUpdated();
      } else {
        throw new Error(data.error || data.message || "Failed to send email");
      }
    } catch (err: any) {
      setSendResultMsg({ text: `Failed: ${err.message}`, isError: true });
    } finally {
      setIsSending(false);
    }
  };

  // Save/Update Email Profile (Add or Edit)
  const handleSaveProfile = async (profileToSave: EmailDepartmentProfile, stayInEditor = false) => {
    try {
      setIsSavingProfile(true);
      const profileWithBadge: EmailDepartmentProfile = {
        ...profileToSave,
        showReferenceBadge: showReferenceBadge,
        referenceBadgeText: referenceNumber,
      };

      const normalizedEmail = (profileWithBadge.email || "").trim().toLowerCase();
      if (!normalizedEmail || !normalizedEmail.includes("@")) {
        if (showToast) showToast("Please provide a valid email address.", "error");
        setIsSavingProfile(false);
        return;
      }

      const duplicateEmail = profiles.some(
        (p) => p.id !== profileWithBadge.id && (p.email || "").trim().toLowerCase() === normalizedEmail
      );
      if (duplicateEmail) {
        if (showToast) {
          showToast(
            `Business email "${profileWithBadge.email}" already exists. Duplicate email profiles are not allowed.`,
            "error"
          );
        }
        setIsSavingProfile(false);
        return;
      }

      const exists = profiles.some((p) => p.id === profileWithBadge.id);
      const updatedList = exists
        ? profiles.map((p) => (p.id === profileWithBadge.id ? profileWithBadge : p))
        : [...profiles, profileWithBadge];

      const res = await adminFetch("/api/admin/email/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles: updatedList }),
      });

      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles || updatedList);
        setSelectedProfileId(profileWithBadge.id);
        if (stayInEditor) {
          setEditingProfile(profileWithBadge);
        } else {
          setViewMode("reply");
          setEditingProfile(null);
          if (inquiry) {
            if (profileWithBadge.defaultSubjectTemplate) {
              setEmailSubject(
                profileWithBadge.defaultSubjectTemplate
                  .replace("{service}", inquiry.service || "Enterprise Service")
                  .replace("{id}", String(inquiry.id))
              );
            }
            if (profileWithBadge.defaultMessageTemplate) {
              setEmailBody(
                profileWithBadge.defaultMessageTemplate
                  .replace("{client_name}", inquiry.client_name || "Client")
                  .replace("{service}", inquiry.service || "Enterprise Service")
                  .replace("{id}", String(inquiry.id))
              );
            }
          }
        }
        if (showToast) showToast(`✓ Email profile "${profileWithBadge.name}" saved successfully!`);
      } else {
        throw new Error(data.error || "Failed to save email profile");
      }
    } catch (err: any) {
      if (showToast) showToast(`Error saving profile: ${err.message}`, "error");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Add a brand new business email profile
  const handleAddNewEmailProfile = async () => {
    try {
      const newId = "dept_" + Date.now().toString(36);
      const count = profiles.length + 1;
      const newProfile: EmailDepartmentProfile = {
        id: newId,
        name: `Creed Tech Desk ${count}`,
        email: `desk${count}@creed-tech.com`,
        department: "Customer Operations",
        accentColor: "#0052FF",
        phone: "+1 (888) 492-7330",
        address: "Creed Tech Global Headquarters, 450 Innovation Parkway, San Francisco, CA 94105",
        videoUrl: "https://creed-tech.com",
        videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        videoTitle: "Machine & Equipment Catalog Presentation",
        mediaType: "image",
        mediaYear: "2018",
        mediaCondition: "★★★★☆",
        mediaSpecs: "Standard configuration, fully inspected",
        mediaItems: [
          {
            id: `item-${newId}-1`,
            type: "image",
            title: "Heidelberg CD102-6+LX",
            thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
            mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
            year: "2001",
            condition: "★★★★☆",
            specs: "4 Colors, Coater, 15000 SPH, Autoplate",
            details: "Fully inspected, ready for dispatch",
          },
          {
            id: `item-${newId}-2`,
            type: "image",
            title: "Komori Lithrone GL-540+C",
            thumbnailUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
            mediaUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
            year: "2015",
            condition: "★★★★★",
            specs: "5 Colors + Coater, High-Speed, PDC-SX",
            details: "Excellent condition, European origin",
          },
        ],
        footerDisclaimer: "Creed Tech Sovereign Enterprise Systems. Confidentiality and NDA protected. All rights reserved.",
        defaultSubjectTemplate: "Re: Creed Tech Scoping - {service} [Inquiry #{id}]",
        defaultMessageTemplate: `Dear {client_name},\n\nThank you for reaching out to Creed Tech regarding your inquiry for "{service}".\n\nWe have received and reviewed your project requirements. Our enterprise engineering team is prepared to present an architectural roadmap tailored to your workload specifications.\n\nPlease let us know your preferred availability for a technical discovery call this week.\n\nBest regards,\n\nCreed Tech Desk ${count} Team\nhttps://creed-tech.com`,
        showReferenceBadge: true,
        referenceBadgeText: "REF #{id}",
      };

      const updatedList = [...profiles, newProfile];
      setProfiles(updatedList);
      setSelectedProfileId(newId);
      setEditingProfile(newProfile);
      setShowReferenceBadge(true);
      setReferenceNumber(`REF #${inquiry?.id || "34"}`);
      if (inquiry) {
        if (newProfile.defaultSubjectTemplate) {
          setEmailSubject(
            newProfile.defaultSubjectTemplate
              .replace("{service}", inquiry.service || "Enterprise Service")
              .replace("{id}", String(inquiry.id))
          );
        }
        if (newProfile.defaultMessageTemplate) {
          setEmailBody(
            newProfile.defaultMessageTemplate
              .replace("{client_name}", inquiry.client_name || "Client")
              .replace("{service}", inquiry.service || "Enterprise Service")
              .replace("{id}", String(inquiry.id))
          );
        }
      }

      const res = await adminFetch("/api/admin/email/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles: updatedList }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.profiles)) {
        setProfiles(data.profiles);
      }
      if (showToast) showToast(`✓ Added new business email: ${newProfile.email}`);
    } catch (err: any) {
      if (showToast) showToast(`Error adding email: ${err.message}`, "error");
    }
  };

  // Delete Email Profile
  const handleDeleteProfile = async (profileId: string) => {
    if (profiles.length <= 1) {
      if (showToast) showToast("At least one business email profile must remain.", "error");
      return;
    }

    const target = profiles.find((p) => p.id === profileId);
    if (!window.confirm(`Are you sure you want to delete profile "${target?.name || profileId}"?`)) {
      return;
    }

    try {
      const updatedList = profiles.filter((p) => p.id !== profileId);
      const res = await adminFetch("/api/admin/email/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles: updatedList }),
      });

      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles || updatedList);
        if (selectedProfileId === profileId) {
          setSelectedProfileId(updatedList[0]?.id || "sales");
        }
        if (editingProfile && editingProfile.id === profileId) {
          const next = updatedList[0];
          setEditingProfile(next || null);
          if (next) {
            setSelectedProfileId(next.id);
            if (next.showReferenceBadge !== undefined) setShowReferenceBadge(next.showReferenceBadge);
            if (next.referenceBadgeText) setReferenceNumber(next.referenceBadgeText.replace("{id}", String(inquiry?.id || "34")));
          }
        }
        if (showToast) showToast(`✓ Profile deleted.`);
      }
    } catch (err: any) {
      if (showToast) showToast(`Error deleting profile: ${err.message}`, "error");
    }
  };

  // Save SMTP Settings
  const handleSaveSmtp = async () => {
    try {
      setIsSavingSettings(true);
      setSmtpStatusMsg(null);

      const res = await adminFetch("/api/admin/email/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: smtpPort,
          user: smtpUser,
          pass: smtpPass,
          from_name: smtpFromName,
          from_email: smtpFromEmail,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsConfigured(data.isConfigured);
        setSmtpStatusMsg({ text: "✓ Email connection settings saved successfully!", isError: false });
        if (showToast) showToast("✓ SMTP settings saved!");
      } else {
        throw new Error(data.error || "Failed to save settings");
      }
    } catch (err: any) {
      setSmtpStatusMsg({ text: `Save error: ${err.message}`, isError: true });
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Test SMTP Connection
  const handleTestSmtp = async () => {
    if (!smtpUser) {
      setSmtpStatusMsg({ text: "Please enter your SMTP Username / Email.", isError: true });
      return;
    }

    try {
      setIsTestingSmtp(true);
      setSmtpStatusMsg(null);

      const res = await adminFetch("/api/admin/email/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: smtpPort,
          user: smtpUser,
          pass: smtpPass,
          from_name: smtpFromName,
          from_email: smtpFromEmail,
          test_email: smtpUser,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsConfigured(true);
        setSmtpStatusMsg({ text: `✓ SMTP Connection Verified! Test email sent to ${smtpUser}.`, isError: false });
      } else {
        setSmtpStatusMsg({ text: `Connection test failed: ${data.message || data.error}`, isError: true });
      }
    } catch (err: any) {
      setSmtpStatusMsg({ text: `Test failed: ${err.message}`, isError: true });
    } finally {
      setIsTestingSmtp(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className={`bg-white text-[#0F172A] rounded-2xl border border-[#E2E8F0] shadow-2xl ${viewMode === "edit_profile" || viewMode === "reply" ? "max-w-5xl h-[92vh] max-h-[92vh] p-3 sm:p-4 pb-2" : "max-w-2xl max-h-[92vh] p-5 sm:p-6"} w-full relative text-left my-auto flex flex-col overflow-hidden transition-all`}>
        
        {/* ============================================================ */}
        {/* VIEW 1: INQUIRY DETAILS                                      */}
        {/* ============================================================ */}
        {viewMode === "details" && (
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] mb-0.5 font-outfit">Inquiry Details</h3>
                <span className="text-xs text-slate-500">ID #{inquiry.id} • {inquiry.created_at}</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase border ${
                  inquiry.status === "NEW"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : inquiry.status === "RESPONDED"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {inquiry.status}
              </span>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-600">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Client</span>
                <span className="font-semibold text-[#0F172A] text-sm">{inquiry.client_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Email</span>
                  <a href={`mailto:${inquiry.email}`} className="text-[#FF6B00] hover:underline font-medium">
                    {inquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Phone</span>
                  <span className="font-medium text-[#0F172A]">{inquiry.phone || "Not specified"}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Service</span>
                  <span className="inline-block px-2.5 py-0.5 bg-orange-50 border border-orange-200 rounded-full text-[#FF6B00] font-semibold text-[11px]">
                    {inquiry.service}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Company</span>
                  <span className="font-medium text-[#0F172A]">{inquiry.company || "Direct Enterprise"}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Project Scope</span>
                <p className="mt-1 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-slate-700 leading-relaxed font-normal whitespace-pre-wrap max-h-40 overflow-y-auto custom-scrollbar">
                  {inquiry.project_details}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("reply")}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#e05d00] rounded-xl shadow-[0_2px_12px_rgba(255,107,0,0.25)] cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <span>Reply to Client</span>
                  <span>✉</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingProfile(currentProfile);
                    if (currentProfile.showReferenceBadge !== undefined) {
                      setShowReferenceBadge(currentProfile.showReferenceBadge);
                    } else {
                      setShowReferenceBadge(true);
                    }
                    if (currentProfile.referenceBadgeText) {
                      setReferenceNumber(currentProfile.referenceBadgeText.replace("{id}", String(inquiry.id)));
                    } else {
                      setReferenceNumber(`REF #${inquiry.id}`);
                    }
                    setViewMode("edit_profile");
                  }}
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-[#F1F3F5] hover:bg-[#EBECEF] border border-[#E2E8F0] rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                  title="Open the complete 5-section format design form"
                >
                  <span>🎨 Full Format Form</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-[#F1F3F5] text-slate-700 hover:text-[#0F172A] hover:bg-[#EBECEF] rounded-xl cursor-pointer transition-colors border border-[#E2E8F0]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: EMAIL REPLY COMPOSER & BRANDED FORMAT                */}
        {/* ============================================================ */}
        {viewMode === "reply" && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] shrink-0">
              <div className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-xs shrink-0"
                  style={{ backgroundColor: currentProfile.accentColor || "#FF6B00" }}
                >
                  ✉
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] m-0 font-outfit">
                    Reply to {inquiry.client_name}
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Inquiry #{inquiry.id} • {inquiry.service}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProfile(currentProfile);
                    if (currentProfile.showReferenceBadge !== undefined) {
                      setShowReferenceBadge(currentProfile.showReferenceBadge);
                    } else {
                      setShowReferenceBadge(true);
                    }
                    if (currentProfile.referenceBadgeText) {
                      setReferenceNumber(currentProfile.referenceBadgeText.replace("{id}", String(inquiry.id)));
                    } else {
                      setReferenceNumber(`REF #${inquiry.id}`);
                    }
                    setViewMode("edit_profile");
                  }}
                  className="text-xs font-bold text-slate-700 bg-[#F1F3F5] hover:bg-[#EBECEF] border border-[#E2E8F0] px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                  title="Open the complete 5-section format design form"
                >
                  <span>🎨 Full Format Form</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("manage_profiles")}
                  className="text-[11px] font-semibold text-slate-700 hover:text-[#0F172A] flex items-center gap-1 cursor-pointer bg-[#F1F3F5] hover:bg-[#EBECEF] px-2.5 py-1 rounded-xl transition-colors border border-[#E2E8F0]"
                  title="Add, edit or delete business email profiles"
                >
                  <span>⚙️ Profiles</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("settings")}
                  className="text-[11px] font-semibold text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                  title="Configure SMTP Server connection"
                >
                  <span>SMTP</span>
                  {isConfigured && <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" title="SMTP Connected"></span>}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-400 hover:text-[#0F172A] px-1.5 py-0.5 rounded cursor-pointer ml-1"
                  title="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {sendResultMsg && (
              <div
                className={`p-2.5 text-xs rounded-xl border font-medium ${
                  sendResultMsg.isError
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {sendResultMsg.text}
              </div>
            )}

            {/* Department / Business Email Selector */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <span>🏢 Send As (Business Email Profile):</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {currentProfile.email}
                </span>
              </div>

              <div className="flex gap-1.5 flex-wrap items-center">
                {profiles.map((p) => {
                  const isSelected = p.id === selectedProfileId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectProfile(p.id)}
                      className={`px-2.5 py-1 text-xs rounded-xl font-semibold cursor-pointer transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? "bg-white text-[#FF6B00] border-orange-300 shadow-[0_2px_8px_rgba(255,107,0,0.15)] ring-1 ring-[#FF6B00]"
                          : "bg-white text-slate-700 border-[#E2E8F0] hover:bg-[#F1F3F5]"
                      }`}
                      style={{
                        borderColor: isSelected ? p.accentColor : undefined,
                        boxShadow: isSelected ? `0 2px 8px ${p.accentColor}33` : undefined,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: p.accentColor }}
                      ></span>
                      <span>{p.name.replace("Creed Tech ", "")}</span>
                      <span className="text-[10px] opacity-60">({p.email.split("@")[0]}@)</span>
                    </button>
                  );
                })}

                {/* Direct Add New Email Profile Button */}
                <button
                  type="button"
                  onClick={handleAddNewEmailProfile}
                  className="px-2.5 py-1 text-xs rounded-xl font-bold bg-[#FF6B00] hover:bg-[#e05d00] text-white cursor-pointer transition-all flex items-center gap-1 shadow-[0_2px_8px_rgba(255,107,0,0.25)] ml-1 active:scale-95"
                  title="Add a new business email identity and design format"
                >
                  <span>➕ Add Email</span>
                </button>

                {/* Direct Edit Selected Email Design Button */}
                <button
                  type="button"
                  onClick={() => {
                    setEditingProfile(currentProfile);
                    if (currentProfile.showReferenceBadge !== undefined) {
                      setShowReferenceBadge(currentProfile.showReferenceBadge);
                    } else {
                      setShowReferenceBadge(true);
                    }
                    if (currentProfile.referenceBadgeText) {
                      setReferenceNumber(currentProfile.referenceBadgeText.replace("{id}", String(inquiry.id)));
                    } else {
                      setReferenceNumber(`REF #${inquiry.id}`);
                    }
                    setViewMode("edit_profile");
                  }}
                  className="px-2.5 py-1 text-xs rounded-xl font-semibold bg-white hover:bg-[#F1F3F5] text-slate-700 border border-[#E2E8F0] cursor-pointer transition-all flex items-center gap-1 shadow-xs"
                  title="Edit format design, pictures, address and video demo for this email"
                >
                  <span>✏️ Edit Format &amp; Design</span>
                </button>

                {/* Delete Selected Email Button */}
                {profiles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteProfile(currentProfile.id)}
                    className="px-2 py-1 text-xs rounded-xl font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 cursor-pointer transition-all flex items-center gap-1"
                    title={`Delete ${currentProfile.name}`}
                  >
                    <span>🗑️ Delete</span>
                  </button>
                )}
              </div>
            </div>

            {/* View Mode Toggle: Form Composer vs Live Branded HTML Preview */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-1 shrink-0 mb-1.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveReplyTab("edit")}
                  className={`text-xs font-bold pb-1 px-1 border-b-2 transition-colors cursor-pointer ${
                    activeReplyTab === "edit"
                      ? "text-[#FF6B00] border-[#FF6B00]"
                      : "text-slate-500 border-transparent hover:text-[#0F172A]"
                  }`}
                >
                  ✍️ Compose Message
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReplyTab("preview")}
                  className={`text-xs font-bold pb-1 px-1 border-b-2 transition-colors cursor-pointer ${
                    activeReplyTab === "preview"
                      ? "text-[#FF6B00] border-[#FF6B00]"
                      : "text-slate-500 border-transparent hover:text-[#0F172A]"
                  }`}
                >
                  👁️ Live Branded Preview
                </button>
              </div>

              {/* Quick Actions in tab row */}
              <div className="flex items-center gap-2">
                {activeReplyTab === "edit" ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => applyTemplate("confirm")}
                      className="px-2 py-1 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 border border-[#E2E8F0] text-[10px] font-medium rounded-lg cursor-pointer transition-colors"
                      title="Insert Discovery Confirmation"
                    >
                      📅 Confirm Call
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTemplate("scoping")}
                      className="px-2 py-1 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 border border-[#E2E8F0] text-[10px] font-medium rounded-lg cursor-pointer transition-colors"
                      title="Insert Scoping Questionnaire"
                    >
                      📋 Scope
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTemplate("nda")}
                      className="px-2 py-1 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 border border-[#E2E8F0] text-[10px] font-medium rounded-lg cursor-pointer transition-colors"
                      title="Insert NDA"
                    >
                      📄 NDA
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProfile(currentProfile);
                      if (currentProfile.showReferenceBadge !== undefined) {
                        setShowReferenceBadge(currentProfile.showReferenceBadge);
                      } else {
                        setShowReferenceBadge(true);
                      }
                      if (currentProfile.referenceBadgeText) {
                        setReferenceNumber(currentProfile.referenceBadgeText.replace("{id}", String(inquiry.id)));
                      } else {
                        setReferenceNumber(`REF #${inquiry.id}`);
                      }
                      setViewMode("edit_profile");
                    }}
                    className="text-xs font-bold text-slate-700 bg-[#F1F3F5] hover:bg-[#EBECEF] border border-[#E2E8F0] px-3 py-1 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Open the full 5-section format customizer form"
                  >
                    <span>🎨</span>
                    <span>Open Full Format Form (All 5 Sections) ↗</span>
                  </button>
                )}
              </div>
            </div>

            {/* SCROLLABLE MAIN CONTENT AREA */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-2 custom-scrollbar">
            {activeReplyTab === "edit" && (
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">To Recipient Email *</label>
                    <input
                      type="email"
                      value={toEmail}
                      onChange={(e) => setToEmail(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#FF6B00] text-[#0F172A] placeholder-slate-400 rounded-xl outline-none font-medium focus:shadow-[0_0_12px_rgba(255,107,0,0.15)] transition-all"
                      placeholder="client@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Subject Line *</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#FF6B00] text-[#0F172A] placeholder-slate-400 rounded-xl outline-none font-bold focus:shadow-[0_0_12px_rgba(255,107,0,0.15)] transition-all"
                      placeholder="Re: Project Inquiry..."
                    />
                  </div>
                </div>

                {/* Reference Number Control (Editable & Optional) */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-orange-900 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={showReferenceBadge}
                        onChange={(e) => setShowReferenceBadge(e.target.checked)}
                        className="rounded text-[#FF6B00] focus:ring-0 w-3.5 h-3.5 cursor-pointer accent-[#FF6B00]"
                      />
                      <span>Header Reference Badge</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-normal">
                      (Optional - uncheck to hide badge completely)
                    </span>
                  </div>

                  {showReferenceBadge && (
                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      <label className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">
                        Edit Badge Text:
                      </label>
                      <input
                        type="text"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        placeholder={`REF #${inquiry.id}`}
                        className="px-2.5 py-1 text-xs border border-orange-300 rounded-xl font-bold text-[#0F172A] bg-white outline-none focus:ring-2 focus:ring-[#FF6B00] w-36 shadow-xs"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[11px] font-semibold text-slate-700">Email Message Body *</label>
                    <span className="text-[10px] text-slate-500">
                      Header banner, logo, video card &amp; footer are attached automatically
                    </span>
                  </div>
                  <textarea
                    rows={7}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#FF6B00] text-[#0F172A] placeholder-slate-400 rounded-xl outline-none font-mono leading-relaxed resize-vertical focus:shadow-[0_0_12px_rgba(255,107,0,0.15)] custom-scrollbar"
                    placeholder="Type your reply message here..."
                  />
                </div>

                {/* ATTACHED MACHINE OFFERS & CATALOG CARDS (MULTI-ROW) */}
                <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 border border-blue-200/90 rounded-xl p-3 shadow-xs space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-blue-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                        <span>📸 Attached Machine Offers (Multi-Row Grid)</span>
                      </span>
                      <span className="text-[10px] bg-blue-600 text-white font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
                        {getEditingMediaItems(currentProfile).length} {getEditingMediaItems(currentProfile).length === 1 ? "Card" : "Cards"} ({Math.ceil(getEditingMediaItems(currentProfile).length / 2)} {Math.ceil(getEditingMediaItems(currentProfile).length / 2) === 1 ? "Row" : "Rows"})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
                      {/* Hidden multi-file input */}
                      <input
                        type="file"
                        ref={replyMultiFileInputRef}
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleReplyBatchUpload}
                      />
                      <button
                        type="button"
                        disabled={isUploadingImage}
                        onClick={() => replyMultiFileInputRef.current?.click()}
                        className="px-2.5 py-1 bg-[#0052FF] hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1 shadow-xs disabled:opacity-50"
                        title="Upload multiple pictures from computer at once (Hold Ctrl / Shift)"
                      >
                        <span>📁</span>
                        <span>{isUploadingImage ? "⏳ Uploading..." : "Upload Multiple Pictures"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingProfile(currentProfile);
                          setViewMode("edit_profile");
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-gray-100 text-slate-700 border border-gray-300 text-[11px] font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                        title="Customize card titles, model years, specs or reorder"
                      >
                        <span>✏️</span>
                        <span>Customize Cards</span>
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Row Preview with Row badges */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1 custom-scrollbar">
                    {getEditingMediaItems(currentProfile).map((card, idx) => {
                      const rowNum = Math.floor(idx / 2) + 1;
                      const colSide = idx % 2 === 0 ? "Left" : "Right";
                      const img =
                        card.thumbnailUrl ||
                        card.mediaUrl ||
                        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
                      return (
                        <div
                          key={card.id || idx}
                          className="shrink-0 w-28 bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs text-left group hover:border-blue-400 transition-colors"
                        >
                          <div className="relative w-full h-14 rounded overflow-hidden bg-gray-900 mb-1">
                            <img
                              src={img}
                              alt={card.title || "Offer"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <span className="absolute top-0.5 left-0.5 bg-black/75 text-white font-mono text-[9px] font-bold px-1 rounded">
                              R{rowNum}:{colSide}
                            </span>
                          </div>
                          <div className="text-[10px] font-bold text-gray-900 truncate" title={card.title}>
                            {card.title || `Offer #${idx + 1}`}
                          </div>
                          <div className="text-[9px] text-gray-500 truncate">
                            {card.year || "2018"} • {card.condition || "★★★★☆"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoUpdateStatus}
                    onChange={(e) => setAutoUpdateStatus(e.target.checked)}
                    className="rounded text-[#FF6B00] focus:ring-0 accent-[#FF6B00]"
                  />
                  <span>Automatically mark inquiry status as <strong className="text-white">RESPONDED</strong> upon sending</span>
                </label>
              </div>
            )}

            {/* TAB CONTENT: LIVE BRANDED HTML PREVIEW */}
            {activeReplyTab === "preview" && (
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-3 shadow-xs flex flex-col gap-2.5">
                {/* Visual Designer Action Banner */}
                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-2.5 shadow-xs flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: currentProfile.accentColor }}
                    />
                    <span className="font-bold text-blue-900">Format for {currentProfile.name}:</span>
                    <span className="text-blue-700 font-mono text-[11px]">{currentProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const targetSubj = (currentProfile.defaultSubjectTemplate || "Re: Creed Tech Scoping - {service} [Inquiry #{id}]")
                          .replace("{service}", inquiry.service || "Enterprise Service")
                          .replace("{id}", String(inquiry.id));
                        setEmailSubject(targetSubj);

                        const targetBody = (currentProfile.defaultMessageTemplate ||
`Dear {client_name},

Thank you for reaching out to Creed Tech regarding your inquiry for "{service}".

We have received and reviewed your project requirements. Our enterprise engineering team is prepared to present an architectural roadmap tailored to your workload specifications.

Please let us know your preferred availability for a technical discovery call this week.

Best regards,

${currentProfile.name}
Desk: ${currentProfile.email}`)
                          .replace("{client_name}", inquiry.client_name || "Client")
                          .replace("{service}", inquiry.service || "Enterprise Service")
                          .replace("{id}", String(inquiry.id));
                        setEmailBody(targetBody);
                        if (showToast) showToast(`✓ Form template reset to ${currentProfile.name}`);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs font-semibold rounded cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                      title="Reset message text and subject to this profile's default template"
                    >
                      <span>🔄</span>
                      <span>Reset Template</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingProfile(currentProfile);
                        if (currentProfile.showReferenceBadge !== undefined) {
                          setShowReferenceBadge(currentProfile.showReferenceBadge);
                        } else {
                          setShowReferenceBadge(true);
                        }
                        if (currentProfile.referenceBadgeText) {
                          setReferenceNumber(currentProfile.referenceBadgeText.replace("{id}", String(inquiry.id)));
                        } else {
                          setReferenceNumber(`REF #${inquiry.id}`);
                        }
                        setViewMode("edit_profile");
                      }}
                      className="px-3 py-1 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>✏️ Change / Customize This Design</span>
                    </button>
                  </div>
                </div>

                {/* COMPLETE EMAIL PREVIEW CARD (NO INNER SCROLL) */}
                <div
                  className="rounded-lg shadow-sm bg-white text-left border border-gray-200 overflow-hidden"
                >
                  {/* Branded Header */}
                  {(() => {
                    const isLight = currentProfile.headerStyle === "light";
                    const hAlign = currentProfile.headerAlignment || (currentProfile.headerStyle === "centered" ? "center" : "left");
                    const hBg = isLight ? "#ffffff" : "#090d16";
                    const hText = isLight ? "#090d16" : "#ffffff";
                    const hSubtext = isLight ? "#64748b" : "#94a3b8";
                    const badgeBg = isLight ? "#f1f5f9" : "rgba(255,255,255,0.08)";
                    const badgeText = isLight ? "#475569" : "#cbd5e1";
                    const badgeBorder = isLight ? "#e2e8f0" : "rgba(255,255,255,0.15)";
                    const cornerBadgeElement = (
                      <div className="flex items-center gap-1">
                        {showReferenceBadge ? (
                          <div
                            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all shadow-xs"
                            style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                          >
                            <input
                              type="text"
                              value={referenceNumber}
                              onChange={(e) => setReferenceNumber(e.target.value)}
                              placeholder="REF #..."
                              className="bg-transparent font-bold outline-none w-20 text-center text-[10px] uppercase tracking-wider border-b border-transparent hover:border-white/40 focus:border-white focus:bg-white/10 rounded px-1 transition-colors"
                              style={{ color: badgeText }}
                              title="Click to edit reference badge text (e.g. REF #33)"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowReferenceBadge(false);
                              }}
                              className="text-gray-400 hover:text-red-400 hover:bg-white/10 rounded px-1 py-0.2 cursor-pointer font-extrabold text-[11px] transition-colors leading-none"
                              title="Remove reference badge"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setShowReferenceBadge(true);
                              if (!referenceNumber.trim()) {
                                setReferenceNumber(`REF #${inquiry?.id || "34"}`);
                              }
                            }}
                            className="px-2 py-0.5 rounded text-[9px] font-semibold text-gray-400 hover:text-white border border-dashed border-gray-600 hover:border-gray-400 transition-colors flex items-center gap-1 cursor-pointer bg-white/5 hover:bg-white/10"
                            title="Add reference badge"
                          >
                            <span>+ Add REF</span>
                          </button>
                        )}
                      </div>
                    );

                    if (hAlign === "center") {
                      return (
                        <div
                          className="p-4 text-center"
                          style={{
                            backgroundColor: hBg,
                            borderBottom: `3px solid ${currentProfile.accentColor || "#FF6B00"}`,
                          }}
                        >
                          <div className="text-base font-black tracking-wider" style={{ color: hText }}>
                            CREED <span style={{ color: currentProfile.accentColor || "#FF6B00" }}>TECH</span>
                          </div>
                          <div className="text-[10px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                            {currentProfile.department}
                          </div>
                          <div className="mt-2 flex items-center justify-center">
                            {cornerBadgeElement}
                          </div>
                        </div>
                      );
                    }

                    if (hAlign === "right") {
                      return (
                        <div
                          className="p-4 flex items-center justify-between"
                          style={{
                            backgroundColor: hBg,
                            borderBottom: `3px solid ${currentProfile.accentColor || "#FF6B00"}`,
                          }}
                        >
                          {cornerBadgeElement}
                          <div className="text-right">
                            <div className="text-base font-black tracking-wider" style={{ color: hText }}>
                              CREED <span style={{ color: currentProfile.accentColor || "#FF6B00" }}>TECH</span>
                            </div>
                            <div className="text-[10px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                              {currentProfile.department}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        className="p-4 flex items-center justify-between"
                        style={{
                          backgroundColor: hBg,
                          borderBottom: `3px solid ${currentProfile.accentColor || "#FF6B00"}`,
                        }}
                      >
                        <div className="text-left">
                          <div className="text-base font-black tracking-wider" style={{ color: hText }}>
                            CREED <span style={{ color: currentProfile.accentColor || "#FF6B00" }}>TECH</span>
                          </div>
                          <div className="text-[10px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                            {currentProfile.department}
                          </div>
                        </div>
                        {cornerBadgeElement}
                      </div>
                    );
                  })()}

                  {/* Subject Line Bar */}
                  <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/70 text-xs font-bold text-gray-800 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject:</span>
                      <span className="font-semibold text-gray-900">{emailSubject || "Re: Technical Discovery & Scoping"}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">Recipient: {toEmail}</span>
                  </div>

                  {/* Body Content with Dynamic Media Card Positioning */}
                  <div
                    className={`p-5 text-xs leading-relaxed transition-colors ${
                      currentProfile.contentAlignment === "center"
                        ? "text-center"
                        : currentProfile.contentAlignment === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                    style={{
                      backgroundColor: currentProfile.backgroundColor || "#ffffff",
                      color: currentProfile.textColor || "#1e293b",
                    }}
                  >
                    {/* TOP MEDIA CARD (if mediaPosition === "top") */}
                    {currentProfile.mediaPosition === "top" && renderMediaPreview(currentProfile, false)}

                    {/* Email Message Text */}
                    <div className="whitespace-pre-wrap font-sans leading-relaxed text-[12px]">
                      {emailBody.trim() ? (
                        emailBody
                      ) : (
                        (currentProfile.defaultMessageTemplate ||
`Dear {client_name},

Thank you for reaching out to Creed Tech regarding your inquiry for "{service}".

We have received and reviewed your project parameters and our team is prepared to present an enterprise engineering roadmap tailored to your workload specifications.

Please let us know your team's availability for a technical discovery call this week.

Best regards,

${currentProfile.name}
Website: https://creed-tech.com
Desk: ${currentProfile.email}`)
                          .replace("{client_name}", inquiry.client_name || "Client")
                          .replace("{service}", inquiry.service || "Enterprise Service")
                          .replace("{id}", String(inquiry.id))
                      )}
                    </div>

                    {/* CENTER MEDIA CARD (if mediaPosition is center or undefined) */}
                    {(currentProfile.mediaPosition || "center") === "center" && renderMediaPreview(currentProfile, false)}

                    {/* BOTTOM MEDIA CARD (if mediaPosition === "bottom") */}
                    {currentProfile.mediaPosition === "bottom" && renderMediaPreview(currentProfile, false)}

                    {/* Signature */}
                    <div className="mt-4 pt-3.5 border-t border-gray-100 text-xs">
                      <div className="font-bold text-gray-900 text-sm">{currentProfile.name}</div>
                      <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                        <span style={{ color: currentProfile.accentColor || "#0052FF" }}>{currentProfile.email}</span>
                        {currentProfile.phone && ` • Tel: ${currentProfile.phone}`}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        Enterprise Systems &amp; High-Reliability Architecture
                      </div>
                    </div>
                  </div>

                  {/* Headquarters & Legal Footer */}
                  <div className="bg-gray-50 p-4 border-t border-gray-200 text-[10px] text-gray-500 leading-relaxed">
                    <div className="mb-1">
                      <strong>Headquarters:</strong> {currentProfile.address || "Creed Tech Global Headquarters, 450 Innovation Parkway, San Francisco, CA 94105"}
                    </div>
                    <div>
                      <strong>Web:</strong> https://creed-tech.com • <strong>Desk:</strong> {currentProfile.email}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200 text-[9px] text-gray-400">
                      {currentProfile.footerDisclaimer || "Creed Tech Sovereign Enterprise Systems. Confidentiality and NDA protected. All rights reserved."}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PINNED BOTTOM ACTION FOOTER BAR */}
          <div className="shrink-0 pt-2.5 pb-1 border-t border-[#E2E8F0] bg-white flex items-center justify-between flex-wrap gap-2 z-10">
            <button
              type="button"
              onClick={() => setViewMode("details")}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0F172A] bg-[#F1F3F5] hover:bg-[#EBECEF] border border-[#E2E8F0] rounded-xl cursor-pointer transition-colors"
            >
              ← Back
            </button>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Direct Open Format Form Button */}
              <button
                type="button"
                onClick={() => {
                  setEditingProfile(currentProfile);
                  if (currentProfile.showReferenceBadge !== undefined) {
                    setShowReferenceBadge(currentProfile.showReferenceBadge);
                  } else {
                    setShowReferenceBadge(true);
                  }
                  if (currentProfile.referenceBadgeText) {
                    setReferenceNumber(currentProfile.referenceBadgeText.replace("{id}", String(inquiry.id)));
                  } else {
                    setReferenceNumber(`REF #${inquiry.id}`);
                  }
                  setViewMode("edit_profile");
                }}
                className="px-3 py-1.5 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors flex items-center gap-1 border border-[#E2E8F0] shadow-xs"
                title="Open the complete 5-section format design form"
              >
                <span>🎨</span>
                <span>Full Format Form</span>
              </button>

              {/* 1-Click Copy Styled HTML for Gmail/Outlook */}
              <button
                type="button"
                onClick={handleCopyStyledHtml}
                className="px-3 py-1.5 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors flex items-center gap-1 border border-[#E2E8F0] shadow-xs"
                title="Copies complete styled format with logo, video card & footer to clipboard"
              >
                <span>📋</span>
                <span>Copy Styled Format</span>
              </button>

              {/* 1-Click Open in Gmail Button */}
              <button
                type="button"
                onClick={handleOpenGmailWeb}
                className="px-3.5 py-1.5 bg-[#EA4335] hover:bg-[#D93025] text-white text-xs font-bold rounded-xl shadow-[0_2px_8px_rgba(234,67,53,0.25)] cursor-pointer transition-colors flex items-center gap-1.5"
                title="Opens Google Mail pre-filled and copies rich format to clipboard"
              >
                <span>Open in Gmail</span>
                <span>↗</span>
              </button>

              {/* Server SMTP Send */}
              <button
                type="button"
                disabled={isSending}
                onClick={handleSendServerEmail}
                className="px-4 py-1.5 text-white text-xs font-bold rounded-xl shadow-[0_2px_12px_rgba(255,107,0,0.25)] cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50 bg-[#FF6B00] hover:bg-[#e05d00] active:scale-95"
              >
                <span>{isSending ? "Sending..." : `Send as ${currentProfile.email.split("@")[0]}`}</span>
                <span>📤</span>
              </button>
            </div>
          </div>
        </div>
      )}

        {/* ============================================================ */}
        {/* VIEW 4: MANAGE BUSINESS EMAIL PROFILES (CRUD)                */}
        {/* ============================================================ */}
        {viewMode === "manage_profiles" && (
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] m-0">Business Email Profiles &amp; Templates</h3>
                <p className="text-[11px] text-[#64748B] m-0">
                  Manage different department emails, addresses, video demos, and branded signatures.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const ts = Date.now();
                  setEditingProfile({
                    id: "dept_" + ts.toString(36),
                    name: "Creed Tech Solutions",
                    email: "solutions@creed-tech.com",
                    department: "Enterprise Solutions",
                    accentColor: "#FF6B00",
                    phone: "+1 (888) 492-7330",
                    address: "Creed Tech Global Headquarters, San Francisco, CA",
                    videoUrl: "https://creed-tech.com",
                    videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                    videoTitle: "Machine & Equipment Catalog Presentation",
                    mediaType: "image",
                    mediaYear: "2018",
                    mediaCondition: "★★★★☆",
                    mediaSpecs: "Standard configuration, fully inspected",
                    mediaItems: [
                      {
                        id: `item-${ts}-1`,
                        type: "image",
                        title: "Heidelberg CD102-6+LX",
                        thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                        mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                        year: "2001",
                        condition: "★★★★☆",
                        specs: "4 Colors, Coater, 15000 SPH, Autoplate",
                        details: "Fully inspected, ready for dispatch",
                      },
                      {
                        id: `item-${ts}-2`,
                        type: "image",
                        title: "Komori Lithrone GL-540+C",
                        thumbnailUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
                        mediaUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
                        year: "2015",
                        condition: "★★★★★",
                        specs: "5 Colors + Coater, High-Speed, PDC-SX",
                        details: "Excellent condition, European origin",
                      },
                    ],
                    footerDisclaimer: "Creed Tech Sovereign Enterprise Systems. All rights reserved.",
                    defaultSubjectTemplate: "Re: Creed Tech Discovery - {service} [Inquiry #{id}]",
                    defaultMessageTemplate: `Dear {client_name},\n\nThank you for reaching out to Creed Tech regarding "{service}".\n\nBest regards,\nCreed Tech Team`,
                  });
                  setViewMode("edit_profile");
                }}
                className="px-3 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>+</span>
                <span>Add Email Profile</span>
              </button>
            </div>

            {/* Profiles List */}
            <div className="flex flex-col gap-2.5 max-h-[420px] overflow-y-auto pr-1">
              {profiles.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0"
                      style={{ backgroundColor: p.accentColor }}
                    >
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{p.name}</span>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-semibold text-white"
                          style={{ backgroundColor: p.accentColor }}
                        >
                          {p.department}
                        </span>
                        {p.isDefault && (
                          <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500 font-mono text-[11px] mt-0.5">
                        {p.email} {p.phone && `• ${p.phone}`}
                      </div>
                      {p.address && (
                        <div className="text-gray-400 text-[10px] truncate max-w-sm">
                          📍 {p.address}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProfile(p);
                        if (p.showReferenceBadge !== undefined) {
                          setShowReferenceBadge(p.showReferenceBadge);
                        } else {
                          setShowReferenceBadge(true);
                        }
                        if (p.referenceBadgeText) {
                          setReferenceNumber(p.referenceBadgeText.replace("{id}", String(inquiry?.id || "34")));
                        } else {
                          setReferenceNumber(`REF #${inquiry?.id || "34"}`);
                        }
                        setViewMode("edit_profile");
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded font-semibold text-xs cursor-pointer transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProfile(p.id)}
                      disabled={profiles.length <= 1}
                      className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded font-semibold text-xs cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      title={profiles.length <= 1 ? "Cannot delete the only profile" : "Delete Profile"}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setViewMode("reply")}
                className="px-3.5 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 rounded cursor-pointer"
              >
                ← Back to Reply
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 5: EDIT / ADD PROFILE FORM                              */}
        {/* ============================================================ */}
        {viewMode === "edit_profile" && editingProfile && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 shrink-0">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] m-0">
                  {profiles.some((p) => p.id === editingProfile.id)
                    ? `Edit Profile: ${editingProfile.name}`
                    : "Add New Business Email Profile"}
                </h3>
                <span className="text-[11px] text-[#64748B]">
                  Customize sender address, branded banner, video card and templates.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("reply")}
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
                title="Close and return to reply"
              >
                ✕ Close
              </button>
            </div>

            {/* QUICK SWITCH / SELECT BUSINESS EMAIL BAR */}
            {(() => {
              const displayProfiles = profiles.some((p) => p.id === editingProfile.id)
                ? profiles.map((p) => (p.id === editingProfile.id ? editingProfile : p))
                : [...profiles, editingProfile];

              return (
                <div className="p-2.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-slate-50 border border-blue-200 rounded-lg flex flex-wrap items-center justify-between gap-2 shadow-2xs shrink-0 my-2">
                  <div className="flex items-center gap-2.5 flex-wrap flex-1">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5 shrink-0">
                      <span>🏢</span>
                      <span>Select Business Email to Customize:</span>
                    </span>

                    {/* Dropdown Selector */}
                    <select
                      value={editingProfile.id}
                      onChange={(e) => {
                        const selected = displayProfiles.find((p) => p.id === e.target.value);
                        if (selected) {
                          setEditingProfile(selected);
                          if (selected.showReferenceBadge !== undefined) {
                            setShowReferenceBadge(selected.showReferenceBadge);
                          } else {
                            setShowReferenceBadge(true);
                          }
                          if (selected.referenceBadgeText) {
                            setReferenceNumber(selected.referenceBadgeText.replace("{id}", String(inquiry?.id || "34")));
                          } else {
                            setReferenceNumber(`REF #${inquiry?.id || "34"}`);
                          }
                        }
                      }}
                      className="px-2.5 py-1 text-xs border border-blue-300 rounded-md font-bold text-[#0052FF] bg-white outline-none focus:ring-2 focus:ring-[#0052FF] cursor-pointer shadow-2xs"
                      title="Switch to another business email"
                    >
                      {displayProfiles.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.email})
                        </option>
                      ))}
                    </select>

                    {/* Quick-Click Buttons */}
                    <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                      {displayProfiles.map((p) => {
                        const isCurrent = p.id === editingProfile.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setEditingProfile(p);
                              if (p.showReferenceBadge !== undefined) {
                                setShowReferenceBadge(p.showReferenceBadge);
                              } else {
                                setShowReferenceBadge(true);
                              }
                              if (p.referenceBadgeText) {
                                setReferenceNumber(p.referenceBadgeText.replace("{id}", String(inquiry?.id || "34")));
                              } else {
                                setReferenceNumber(`REF #${inquiry?.id || "34"}`);
                              }
                            }}
                            className={`px-2.5 py-1 text-xs rounded-md font-semibold cursor-pointer transition-all flex items-center gap-1.5 border shadow-2xs ${
                              isCurrent
                                ? "bg-white text-gray-900 border-[#0052FF] ring-2 ring-[#0052FF]/30 font-bold"
                                : "bg-white/80 text-gray-700 border-gray-300 hover:bg-white hover:text-gray-900"
                            }`}
                          >
                            <span
                              className="w-2 h-2 rounded-full inline-block shrink-0"
                              style={{ backgroundColor: p.accentColor }}
                            />
                            <span>{p.name.replace("Creed Tech ", "")}</span>
                            <span className="text-[10px] text-gray-500 font-mono">
                              ({p.email.split("@")[0]}@)
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {profiles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteProfile(editingProfile.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        title="Delete currently selected business email"
                      >
                        <span>🗑️ Delete</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleAddNewEmailProfile}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#0052FF] hover:bg-[#0042D0] rounded-md transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                      title="Add a new business email profile and format immediately"
                    >
                      <span>➕ Add New Email</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Scrollable Form Body & Live Preview */}
            <div className="flex-1 overflow-y-auto pr-1.5 min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-3">
              {/* LEFT COLUMN: DESIGN CONTROLS (6 Cols) */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    1. Identity &amp; Branding Colors
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Profile / Desk Name *</label>
                      <input
                        type="text"
                        value={editingProfile.name}
                        onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-medium outline-none focus:border-[#0052FF] bg-white"
                        placeholder="e.g. Creed Tech Enterprise Sales"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Department Tag *</label>
                      <input
                        type="text"
                        value={editingProfile.department}
                        onChange={(e) => setEditingProfile({ ...editingProfile, department: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-medium outline-none focus:border-[#0052FF] bg-white"
                        placeholder="e.g. Enterprise Sales & Growth"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Sender Email Address *</label>
                      <input
                        type="email"
                        value={editingProfile.email}
                        onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-mono outline-none focus:border-[#0052FF] bg-white"
                        placeholder="sales@creed-tech.com"
                      />
                    </div>

                    {/* 1. BRAND ACCENT COLOR PALETTE */}
                    <div className="sm:col-span-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span>✨ Brand Accent Color</span>
                          <span className="text-[9px] font-normal text-gray-500">(Buttons, Links, Borders)</span>
                        </label>
                        <span className="text-[10px] font-mono text-gray-600 font-semibold">{editingProfile.accentColor || "#FF6B00"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {ACCENT_COLOR_PRESETS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, accentColor: c })}
                            className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-xs"
                            style={{
                              backgroundColor: c,
                              border: editingProfile.accentColor === c ? "2px solid #0052FF" : "1px solid #d1d5db",
                              boxShadow: editingProfile.accentColor === c ? "0 0 0 2px rgba(0,82,255,0.3)" : "none",
                            }}
                            title={c}
                          />
                        ))}
                        <input
                          type="color"
                          value={editingProfile.accentColor || "#FF6B00"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, accentColor: e.target.value })}
                          className="w-6 h-6 rounded cursor-pointer border border-gray-300 p-0 ml-1"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.accentColor || ""}
                          onChange={(e) => setEditingProfile({ ...editingProfile, accentColor: e.target.value })}
                          className="w-20 px-2 py-0.5 text-[11px] border border-gray-300 rounded font-mono outline-none bg-white focus:border-[#0052FF]"
                          placeholder="#FF6B00"
                        />
                      </div>
                    </div>

                    {/* 2. TEXT COLOR PALETTE (TXT COLOR PLATE PORI HO) */}
                    <div className="sm:col-span-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🔤 Text Color Palette</span>
                          <span className="text-[9px] font-normal text-gray-500">(Headings, Message &amp; Name)</span>
                        </label>
                        <span className="text-[10px] font-mono text-gray-600 font-semibold">{editingProfile.textColor || "#1E293B"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {TEXT_COLOR_PRESETS.map((item) => (
                          <button
                            key={item.color}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, textColor: item.color })}
                            className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-xs"
                            style={{
                              backgroundColor: item.color,
                              border: (editingProfile.textColor || "#1E293B").toLowerCase() === item.color.toLowerCase() ? "2px solid #0052FF" : "1px solid #94a3b8",
                              boxShadow: (editingProfile.textColor || "#1E293B").toLowerCase() === item.color.toLowerCase() ? "0 0 0 2px rgba(0,82,255,0.3)" : "none",
                            }}
                            title={`${item.label} (${item.color})`}
                          />
                        ))}
                        <input
                          type="color"
                          value={editingProfile.textColor || "#1E293B"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, textColor: e.target.value })}
                          className="w-6 h-6 rounded cursor-pointer border border-gray-300 p-0 ml-1"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.textColor || "#1E293B"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, textColor: e.target.value })}
                          className="w-20 px-2 py-0.5 text-[11px] border border-gray-300 rounded font-mono outline-none bg-white focus:border-[#0052FF]"
                          placeholder="#1E293B"
                        />
                      </div>
                    </div>

                    {/* 3. BACKGROUND COLOR PALETTE (BACKGROUND COLOR PLATE) */}
                    <div className="sm:col-span-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🎨 Background Color Palette</span>
                          <span className="text-[9px] font-normal text-gray-500">(Email Card &amp; Canvas)</span>
                        </label>
                        <span className="text-[10px] font-mono text-gray-600 font-semibold">{editingProfile.backgroundColor || "#FFFFFF"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {BG_COLOR_PRESETS.map((item) => (
                          <button
                            key={item.color}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, backgroundColor: item.color })}
                            className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-xs"
                            style={{
                              backgroundColor: item.color,
                              border: (editingProfile.backgroundColor || "#FFFFFF").toLowerCase() === item.color.toLowerCase() ? "2px solid #0052FF" : "1px solid #cbd5e1",
                              boxShadow: (editingProfile.backgroundColor || "#FFFFFF").toLowerCase() === item.color.toLowerCase() ? "0 0 0 2px rgba(0,82,255,0.3)" : "none",
                            }}
                            title={`${item.label} (${item.color})`}
                          />
                        ))}
                        <input
                          type="color"
                          value={editingProfile.backgroundColor || "#FFFFFF"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, backgroundColor: e.target.value })}
                          className="w-6 h-6 rounded cursor-pointer border border-gray-300 p-0 ml-1"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.backgroundColor || "#FFFFFF"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, backgroundColor: e.target.value })}
                          className="w-20 px-2 py-0.5 text-[11px] border border-gray-300 rounded font-mono outline-none bg-white focus:border-[#0052FF]"
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: MULTI-IMAGE / MULTI-ROW CATALOG & VIDEO PRESENTATION */}
                <div className="bg-gradient-to-br from-blue-50/70 to-slate-50 border border-blue-200/80 rounded-xl p-3.5 space-y-3 shadow-xs">
                  {/* Header & Row Summary */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-blue-100">
                    <div>
                      <span className="text-[12px] font-extrabold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                        <span>📸 2. Machine Pictures &amp; Multi-Row Catalog</span>
                        <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                          {getEditingMediaItems(editingProfile).length} {getEditingMediaItems(editingProfile).length === 1 ? "Card" : "Cards"} ({Math.ceil(getEditingMediaItems(editingProfile).length / 2)} {Math.ceil(getEditingMediaItems(editingProfile).length / 2) === 1 ? "Row" : "Rows"})
                        </span>
                      </span>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Upload 1, 2, 4, 6 or more pictures. They automatically organize into a clean 2-column multi-row catalog grid!
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      {/* Batch upload input (multiple files) */}
                      <input
                        type="file"
                        ref={multiFileInputRef}
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleBatchFileUpload}
                      />
                      {/* Single item replace or multi-picture input */}
                      <input
                        type="file"
                        ref={itemFileInputRef}
                        multiple
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleItemFileUpload}
                      />
                    </div>
                  </div>

                  {/* PROMINENT BATCH UPLOAD HERO CARD */}
                  <div
                    onClick={() => multiFileInputRef.current?.click()}
                    className="border-2 border-dashed border-blue-400/80 hover:border-blue-600 rounded-xl p-3.5 bg-white/90 hover:bg-blue-50/50 cursor-pointer transition-all text-center group shadow-2xs"
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
                                  disabled={isUploadingImage}
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
                                disabled={isUploadingImage}
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
                                disabled={isUploadingImage}
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
                                disabled={isUploadingImage}
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
                              onClick={() => setPreviewDetailItem(item)}
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
                </div>

                {/* SECTION 3: LAYOUT POSITION & ALIGNMENT (Center, Oper, Nechy, Left, Right) */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    3. Layout Style, Position &amp; Alignment
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Media / Video Position */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Banner / Video Position (Oper, Center, Nechy)
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: "top", label: "⬆️ Oper (Top)" },
                          { id: "center", label: "↔️ Center" },
                          { id: "bottom", label: "⬇️ Nechy (Bottom)" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, mediaPosition: item.id as any })}
                            className={`flex-1 py-1 px-1.5 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.mediaPosition || "center") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Media Alignment */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Banner Alignment (Left, Center, Right)
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: "left", label: "⬅️ Left Side" },
                          { id: "center", label: "⏺️ Center" },
                          { id: "right", label: "➡️ Right Side" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, mediaAlignment: item.id as any })}
                            className={`flex-1 py-1 px-1.5 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.mediaAlignment || "center") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick 1-Click Master Alignment */}
                    <div className="sm:col-span-2 bg-blue-50/80 border border-blue-200 rounded-md p-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <span>⚡ One-Click Align All (Logo, Headings &amp; Text)</span>
                        </label>
                        <span className="text-[9px] text-blue-700 font-medium">Aligns logo, title &amp; all text together</span>
                      </div>
                      <div className="flex gap-2">
                        {[
                          { id: "left", label: "⬅️ All Left" },
                          { id: "center", label: "⏺️ All Center" },
                          { id: "right", label: "➡️ All Right" },
                        ].map((item) => {
                          const isAllActive =
                            (editingProfile.contentAlignment || "left") === item.id &&
                            (editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left")) === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() =>
                                setEditingProfile({
                                  ...editingProfile,
                                  contentAlignment: item.id as any,
                                  headerAlignment: item.id as any,
                                })
                              }
                              className={`flex-1 py-1 px-2 text-[10px] font-bold rounded border cursor-pointer transition-all ${
                                isAllActive
                                  ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100/60"
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Logo & Header Alignment */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Logo &amp; Header Alignment (Left, Center, Right)
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: "left", label: "⬅️ Left Logo" },
                          { id: "center", label: "⏺️ Center Logo" },
                          { id: "right", label: "➡️ Right Logo" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              setEditingProfile({
                                ...editingProfile,
                                headerAlignment: item.id as any,
                              })
                            }
                            className={`flex-1 py-1 px-1 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left")) === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Heading & Text Alignment */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Headings &amp; Body Text Alignment (Left, Center, Right)
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: "left", label: "⬅️ Left Text" },
                          { id: "center", label: "⏺️ Center Text" },
                          { id: "right", label: "➡️ Right Text" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, contentAlignment: item.id as any })}
                            className={`flex-1 py-1 px-1 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.contentAlignment || "left") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Header Theme */}
                    <div className="sm:col-span-2 pt-1 border-t border-gray-200">
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Header Background Theme
                      </label>
                      <div className="flex gap-2">
                        {[
                          { id: "dark", label: "⬛ Dark Enterprise Theme" },
                          { id: "light", label: "⬜ Clean Light Theme" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, headerStyle: item.id as any })}
                            className={`flex-1 py-1 px-2 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.headerStyle || "dark") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: LIVE REAL-TIME VISUAL PREVIEW & TEMPLATES (6 Cols) */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span>👁️ Live Format Preview</span>
                    <span className="text-[10px] text-emerald-600 font-medium">● Real-time</span>
                  </span>
                  <span className="text-[10px] text-gray-400">Position: {editingProfile.mediaPosition || "center"}</span>
                </div>

                {/* Top-Right Reference Badge Edit & Remove Quick Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-lg text-xs shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1">
                      <span>🏷️ Corner Ref Badge:</span>
                    </span>
                    {showReferenceBadge ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={referenceNumber}
                          onChange={(e) => setReferenceNumber(e.target.value)}
                          placeholder={`REF #${inquiry?.id || "34"}`}
                          className="px-2.5 py-1 text-xs border border-blue-300 rounded font-bold text-[#0052FF] bg-white outline-none focus:ring-2 focus:ring-blue-400 w-32 shadow-2xs"
                          title="Edit corner reference badge text"
                        />
                        <button
                          type="button"
                          onClick={() => setShowReferenceBadge(false)}
                          className="px-2.5 py-1 text-[11px] font-bold text-red-600 hover:text-white hover:bg-red-600 bg-red-50 rounded border border-red-200 transition-colors cursor-pointer flex items-center gap-1"
                          title="Remove reference badge"
                        >
                          <span>✕ Remove</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 italic">(Hidden / Removed)</span>
                        <button
                          type="button"
                          onClick={() => {
                            setShowReferenceBadge(true);
                            if (!referenceNumber.trim()) {
                              setReferenceNumber(`REF #${inquiry?.id || "34"}`);
                            }
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold text-[#0052FF] bg-blue-100 hover:bg-blue-200 text-blue-800 rounded border border-blue-300 transition-colors cursor-pointer flex items-center gap-1"
                          title="Add / Show reference badge"
                        >
                          <span>➕ Add REF Badge</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-blue-700 font-medium">Top-Right Corner Control</span>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                  {/* Dynamic Branded Header with Logo Alignment */}
                  {(() => {
                    const isLight = editingProfile.headerStyle === "light";
                    const hAlign = editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left");
                    const hBg = isLight ? "#ffffff" : "#090d16";
                    const hText = isLight ? "#090d16" : "#ffffff";
                    const hSubtext = isLight ? "#64748b" : "#94a3b8";
                    const badgeBg = isLight ? "#f1f5f9" : "rgba(255,255,255,0.08)";
                    const badgeText = isLight ? "#475569" : "#cbd5e1";
                    const badgeBorder = isLight ? "#e2e8f0" : "rgba(255,255,255,0.15)";

                    const cornerBadgeElement = (
                      <div className="flex items-center gap-1">
                        {showReferenceBadge ? (
                          <div
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs"
                            style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                          >
                            <input
                              type="text"
                              value={referenceNumber}
                              onChange={(e) => setReferenceNumber(e.target.value)}
                              placeholder="REF #..."
                              className="bg-transparent font-bold outline-none w-20 text-center text-[9px] uppercase tracking-wider border-b border-transparent hover:border-white/40 focus:border-white focus:bg-white/10 rounded px-1 transition-colors"
                              style={{ color: badgeText }}
                              title="Click to edit reference badge text (e.g. REF #33)"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowReferenceBadge(false);
                              }}
                              className="text-gray-400 hover:text-red-400 hover:bg-white/10 rounded px-1 py-0.2 cursor-pointer font-extrabold text-[10px] transition-colors leading-none"
                              title="Remove reference badge"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setShowReferenceBadge(true);
                              if (!referenceNumber.trim()) {
                                setReferenceNumber(`REF #${inquiry?.id || "34"}`);
                              }
                            }}
                            className="px-2 py-0.5 rounded text-[9px] font-semibold text-gray-400 hover:text-white border border-dashed border-gray-600 hover:border-gray-400 transition-colors flex items-center gap-1 cursor-pointer bg-white/5 hover:bg-white/10"
                            title="Add reference badge"
                          >
                            <span>+ Add REF</span>
                          </button>
                        )}
                      </div>
                    );

                    if (hAlign === "center") {
                      return (
                        <div
                          className="p-3.5 text-center"
                          style={{
                            backgroundColor: hBg,
                            borderBottom: `3px solid ${editingProfile.accentColor || "#FF6B00"}`,
                          }}
                        >
                          <div className="text-sm font-black tracking-wider" style={{ color: hText }}>
                            CREED <span style={{ color: editingProfile.accentColor || "#FF6B00" }}>TECH</span>
                          </div>
                          <div className="text-[9px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                            {editingProfile.department || "Enterprise Department"}
                          </div>
                          <div className="mt-1.5 flex items-center justify-center">
                            {cornerBadgeElement}
                          </div>
                        </div>
                      );
                    }

                    if (hAlign === "right") {
                      return (
                        <div
                          className="p-3.5 flex items-center justify-between"
                          style={{
                            backgroundColor: hBg,
                            borderBottom: `3px solid ${editingProfile.accentColor || "#FF6B00"}`,
                          }}
                        >
                          {cornerBadgeElement}
                          <div className="text-right">
                            <div className="text-sm font-black tracking-wider" style={{ color: hText }}>
                              CREED <span style={{ color: editingProfile.accentColor || "#FF6B00" }}>TECH</span>
                            </div>
                            <div className="text-[9px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                              {editingProfile.department || "Enterprise Department"}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        className="p-3.5 flex items-center justify-between"
                        style={{
                          backgroundColor: hBg,
                          borderBottom: `3px solid ${editingProfile.accentColor || "#FF6B00"}`,
                        }}
                      >
                        <div className="text-left">
                          <div className="text-sm font-black tracking-wider" style={{ color: hText }}>
                            CREED <span style={{ color: editingProfile.accentColor || "#FF6B00" }}>TECH</span>
                          </div>
                          <div className="text-[9px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                            {editingProfile.department || "Enterprise Department"}
                          </div>
                        </div>
                        {cornerBadgeElement}
                      </div>
                    );
                  })()}

                  {/* Body Preview with Dynamic Positioning and Alignment */}
                  <div
                    className={`p-4 text-xs leading-relaxed transition-colors ${
                      editingProfile.contentAlignment === "center"
                        ? "text-center"
                        : editingProfile.contentAlignment === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                    style={{
                      backgroundColor: editingProfile.backgroundColor || "#FFFFFF",
                      color: editingProfile.textColor || "#1E293B",
                    }}
                  >
                    <p
                      className="font-semibold mb-1 text-[11px]"
                      style={{ color: editingProfile.textColor || "#1E293B" }}
                    >
                      {editingProfile.defaultSubjectTemplate
                        ? editingProfile.defaultSubjectTemplate.replace("{service}", inquiry?.service || "Solutions").replace("{id}", String(inquiry?.id || "34"))
                        : "Re: Project Inquiry"}
                    </p>

                    {/* RENDER MEDIA CARD AT TOP IF POSITION IS TOP */}
                    {editingProfile.mediaPosition === "top" && renderMediaPreview(editingProfile, true)}

                    {/* Message Body */}
                    <div
                      className="whitespace-pre-wrap font-sans text-[11px] p-2.5 rounded border leading-relaxed"
                      style={{
                        color: editingProfile.textColor || "#1E293B",
                        backgroundColor: (editingProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (editingProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)",
                        borderColor: (editingProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (editingProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      {(editingProfile.defaultMessageTemplate || "Hello Client,\n\nThank you for reaching out.")
                        .replace("{client_name}", inquiry?.client_name || "Client")
                        .replace("{service}", inquiry?.service || "Solutions")}
                    </div>

                    {/* RENDER MEDIA CARD AT CENTER (MIDDLE) IF POSITION IS CENTER (DEFAULT) */}
                    {(editingProfile.mediaPosition || "center") === "center" && renderMediaPreview(editingProfile, true)}

                    {/* Signature */}
                    <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px]">
                      <div className="font-bold" style={{ color: editingProfile.textColor || "#1E293B" }}>{editingProfile.name}</div>
                      <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                        <span style={{ color: editingProfile.accentColor }}>{editingProfile.email}</span>
                        {editingProfile.phone && ` • Tel: ${editingProfile.phone}`}
                      </div>
                      <div className="text-[9px] text-gray-400 mt-0.5">
                        Enterprise Systems &amp; Architecture
                      </div>
                    </div>

                    {/* RENDER MEDIA CARD AT BOTTOM IF POSITION IS BOTTOM */}
                    {editingProfile.mediaPosition === "bottom" && renderMediaPreview(editingProfile, true)}
                  </div>

                  {/* Footer */}
                  <div
                    className={`bg-gray-50 p-3 border-t border-gray-200 text-[9px] text-gray-500 leading-relaxed ${
                      editingProfile.contentAlignment === "center"
                        ? "text-center"
                        : editingProfile.contentAlignment === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {editingProfile.address && (
                      <div className="mb-0.5">
                        <strong>Headquarters:</strong> {editingProfile.address}
                      </div>
                    )}
                    <div>
                      <strong>Web:</strong> https://creed-tech.com • <strong>Desk:</strong> {editingProfile.email}
                    </div>
                    {editingProfile.footerDisclaimer && (
                      <div className="mt-1.5 pt-1.5 border-t border-gray-200 text-[8px] text-gray-400">
                        {editingProfile.footerDisclaimer}
                      </div>
                    )}
                  </div>
                </div>

                {/* SECTION 4: ADDRESS, PHONE & LEGAL FOOTER (RIGHT SIDE UNDER IMAGE / PREVIEW) */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    4. Address, Phone &amp; Legal Footer
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Direct Phone / Hotline</label>
                      <input
                        type="text"
                        value={editingProfile.phone || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none bg-white"
                        placeholder="+1 (888) 492-7330"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Headquarters Address</label>
                      <input
                        type="text"
                        value={editingProfile.address || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, address: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none bg-white"
                        placeholder="450 Innovation Parkway, San Francisco, CA"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Footer Disclaimer / Confidentiality</label>
                      <input
                        type="text"
                        value={editingProfile.footerDisclaimer || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, footerDisclaimer: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none bg-white"
                        placeholder="This communication is confidential..."
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 5: DEFAULT SUBJECT & MESSAGE TEMPLATE (RIGHT SIDE UNDER IMAGE / PREVIEW) */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    5. Default Subject &amp; Message Template
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Subject Template (uses &#123;service&#125; &amp; &#123;id&#125;)</label>
                      <input
                        type="text"
                        value={editingProfile.defaultSubjectTemplate || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, defaultSubjectTemplate: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none font-medium bg-white"
                        placeholder="Re: Creed Tech Discovery - {service} [Inquiry #{id}]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Message Template Body</label>
                      <textarea
                        rows={3}
                        value={editingProfile.defaultMessageTemplate || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, defaultMessageTemplate: e.target.value })}
                        className="w-full p-2 text-xs border border-gray-300 rounded font-mono outline-none bg-white"
                        placeholder="Dear {client_name}, ..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* PINNED BOTTOM FOOTER ACTION BAR */}
            <div className="pt-3.5 pb-3 px-1 border-t border-gray-200 flex justify-between items-center shrink-0 bg-white z-10 mt-auto">
              <button
                type="button"
                onClick={() => setViewMode("reply")}
                className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors shadow-2xs"
              >
                ← Back to Reply
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={isSavingProfile}
                  onClick={() => handleSaveProfile(editingProfile, true)}
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs font-bold rounded-lg shadow-2xs cursor-pointer transition-colors disabled:opacity-50"
                  title="Save changes and continue customizing other emails"
                >
                  {isSavingProfile ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  disabled={isSavingProfile}
                  onClick={() => handleSaveProfile(editingProfile, false)}
                  className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors disabled:opacity-50"
                  title="Save changes and return to reply composer"
                >
                  {isSavingProfile ? "Saving..." : "Save & Back to Reply"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: EMAIL & SMTP CONNECTION SETTINGS                     */}
        {/* ============================================================ */}
        {viewMode === "settings" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] m-0">Connect Email &amp; SMTP Provider</h3>
                <p className="text-[11px] text-[#64748B] m-0">
                  Connect your Gmail, Outlook, or custom SMTP server to send live emails directly from the admin panel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("reply")}
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {smtpStatusMsg && (
              <div
                className={`p-3 text-xs rounded-md border font-medium ${
                  smtpStatusMsg.isError
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}
              >
                {smtpStatusMsg.text}
              </div>
            )}

            {/* Quick Provider Presets */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs">
              <span className="font-bold text-blue-900 block mb-1.5">⚡ Choose Your Provider:</span>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setSmtpHost("smtp.gmail.com");
                    setSmtpPort(465);
                  }}
                  className="px-2.5 py-1 bg-white border border-blue-300 hover:bg-blue-100 rounded text-blue-900 text-xs font-semibold cursor-pointer"
                >
                  Gmail (smtp.gmail.com : 465)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSmtpHost("smtp.office365.com");
                    setSmtpPort(587);
                  }}
                  className="px-2.5 py-1 bg-white border border-blue-300 hover:bg-blue-100 rounded text-blue-900 text-xs font-semibold cursor-pointer"
                >
                  Outlook / Office 365 (587)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSmtpHost("mail.creed-tech.com");
                    setSmtpPort(465);
                  }}
                  className="px-2.5 py-1 bg-white border border-blue-300 hover:bg-blue-100 rounded text-blue-900 text-xs font-semibold cursor-pointer"
                >
                  Custom Mail Server
                </button>
              </div>
            </div>

            {/* Instructions Callout */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 leading-relaxed">
              <strong>💡 How to Connect Gmail:</strong><br />
              1. Go to your <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-950">Google Account &gt; Security &gt; App Passwords</a>.<br />
              2. Generate an App Password for &ldquo;Creed Tech&rdquo; (16 letters).<br />
              3. Paste the 16-letter App Password below.
            </div>

            {/* Settings Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">SMTP Host *</label>
                <input
                  type="text"
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded font-mono text-xs outline-none focus:border-[#0052FF]"
                  placeholder="smtp.gmail.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">SMTP Port *</label>
                <input
                  type="number"
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(parseInt(e.target.value, 10) || 465)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded font-mono text-xs outline-none focus:border-[#0052FF]"
                  placeholder="465 or 587"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Username / Email Address *</label>
                <input
                  type="email"
                  value={smtpUser}
                  onChange={(e) => setSmtpUser(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#0052FF]"
                  placeholder="your-email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Password / App Password *</label>
                <input
                  type="password"
                  value={smtpPass}
                  onChange={(e) => setSmtpPass(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded font-mono text-xs outline-none focus:border-[#0052FF]"
                  placeholder="16-letter App Password"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Sender Name</label>
                <input
                  type="text"
                  value={smtpFromName}
                  onChange={(e) => setSmtpFromName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#0052FF]"
                  placeholder="Creed Tech Enterprise"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Default From Email Address</label>
                <input
                  type="email"
                  value={smtpFromEmail}
                  onChange={(e) => setSmtpFromEmail(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#0052FF]"
                  placeholder="contact@creed-tech.com"
                />
              </div>
            </div>

            {/* Settings Actions */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setViewMode("reply")}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 rounded cursor-pointer"
              >
                ← Back to Reply
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isTestingSmtp}
                  onClick={handleTestSmtp}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  <span>🧪</span>
                  <span>{isTestingSmtp ? "Testing..." : "Test Connection"}</span>
                </button>

                <button
                  type="button"
                  disabled={isSavingSettings}
                  onClick={handleSaveSmtp}
                  className="px-4 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow-xs cursor-pointer transition-colors disabled:opacity-50"
                >
                  {isSavingSettings ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Equipment Offer Details Modal Popup */}
        <EquipmentOfferDetailModal
          isOpen={Boolean(previewDetailItem)}
          onClose={() => setPreviewDetailItem(null)}
          item={previewDetailItem}
          profile={editingProfile}
        />
      </div>
    </div>
  );
}
