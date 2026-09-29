"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";
import { uploadImageFile, uploadMediaFile, uploadMultipleMediaFiles } from "@/lib/uploadHelper";
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
  SIGNATURE_STYLE_PRESETS,
  EMAIL_FORMATS_METADATA,
  EmailFormatType,
  EmailSocialLink,
  GalleryRow,
  GalleryRowItem,
  DEFAULT_FORMAT2_SOCIAL_LINKS,
  DEFAULT_FORMAT2_GALLERY_ROWS,
} from "@/lib/email-types";
import { Inquiry } from "@/types/admin";
import InquiryDetailsModal from "../modals/InquiryDetailsModal";
import EquipmentOfferDetailModal from "../modals/EquipmentOfferDetailModal";

interface EmailTemplatesModuleProps {
  showToast?: (msg: string, type?: "success" | "error") => void;
  onNavigateTab?: (tab: string) => void;
}

export default function EmailTemplatesModule({ showToast, onNavigateTab }: EmailTemplatesModuleProps) {
  const adminFetch = useAdminFetch();
  const [profiles, setProfiles] = useState<EmailDepartmentProfile[]>(DEFAULT_EMAIL_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("sales");
  const [editingProfile, setEditingProfile] = useState<EmailDepartmentProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [testEmailRecipient, setTestEmailRecipient] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadingItemIndex, setUploadingItemIndex] = useState<number | null>(null);
  const [specsMode, setSpecsMode] = useState<"separate" | "same">("separate");
  const [previewDetailItem, setPreviewDetailItem] = useState<EmailMediaItem | null>(null);
  const [enlargedMediaPopup, setEnlargedMediaPopup] = useState<{
    imageUrl: string;
    title?: string;
    text?: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemFileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const sidebarLogoInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingSidebarLogo, setIsUploadingSidebarLogo] = useState(false);
  const mainPicInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingMainPic, setIsUploadingMainPic] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProfile) return;
    setIsUploadingAvatar(true);
    try {
      const url = await uploadImageFile(file, adminFetch);
      setEditingProfile({ ...editingProfile, signatureAvatar: url });
      if (showToast) showToast("Signature photo uploaded successfully!");
    } catch (err: any) {
      if (showToast) showToast(err.message || "Failed to upload signature photo", "error");
    } finally {
      setIsUploadingAvatar(false);
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = "";
    }
  };

  const handleSidebarLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProfile) return;
    setIsUploadingSidebarLogo(true);
    try {
      const url = await uploadImageFile(file, adminFetch);
      setEditingProfile({ ...editingProfile, sidebarLogo: url });
      if (showToast) showToast("Sidebar company logo uploaded successfully!");
    } catch (err: any) {
      if (showToast) showToast(err.message || "Failed to upload sidebar logo", "error");
    } finally {
      setIsUploadingSidebarLogo(false);
      if (sidebarLogoInputRef.current) sidebarLogoInputRef.current.value = "";
    }
  };

  const handleMainPicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProfile) return;
    setIsUploadingMainPic(true);
    try {
      const url = await uploadImageFile(file, adminFetch);
      setEditingProfile({ ...editingProfile, featuredMainPicUrl: url });
      if (showToast) showToast("Main featured picture uploaded successfully!");
    } catch (err: any) {
      if (showToast) showToast(err.message || "Failed to upload main picture", "error");
    } finally {
      setIsUploadingMainPic(false);
      if (mainPicInputRef.current) mainPicInputRef.current.value = "";
    }
  };

  const handleAddSocialLink = () => {
    if (!editingProfile) return;
    const current = editingProfile.sidebarSocialLinks || DEFAULT_FORMAT2_SOCIAL_LINKS;
    const newLink: EmailSocialLink = {
      id: `soc-${Date.now()}`,
      platform: "website",
      url: "https://",
      label: "Website",
    };
    setEditingProfile({
      ...editingProfile,
      sidebarSocialLinks: [...current, newLink],
    });
  };

  const handleUpdateSocialLink = (id: string, updates: Partial<EmailSocialLink>) => {
    if (!editingProfile) return;
    const current = editingProfile.sidebarSocialLinks || DEFAULT_FORMAT2_SOCIAL_LINKS;
    setEditingProfile({
      ...editingProfile,
      sidebarSocialLinks: current.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    });
  };

  const handleDeleteSocialLink = (id: string) => {
    if (!editingProfile) return;
    const current = editingProfile.sidebarSocialLinks || DEFAULT_FORMAT2_SOCIAL_LINKS;
    setEditingProfile({
      ...editingProfile,
      sidebarSocialLinks: current.filter((s) => s.id !== id),
    });
  };

  const handleAddGalleryRow = () => {
    if (!editingProfile) return;
    const currentRows = editingProfile.galleryRows && editingProfile.galleryRows.length > 0
      ? editingProfile.galleryRows
      : [
          {
            id: "row-1",
            items: [
              { id: "item-1-1", imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop", text: "CNC Miller 5X", title: "CNC Miller 5X High Precision" },
              { id: "item-1-2", imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=400&auto=format&fit=crop", text: "Laser Cutter", title: "Fiber Laser Cutting System" },
            ],
          },
        ];
    const newRow: GalleryRow = {
      id: `row-${Date.now()}`,
      items: [
        {
          id: `item-${Date.now()}-1`,
          imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop",
          text: "Sample Item",
          title: "New Equipment",
        },
      ],
    };
    setEditingProfile({
      ...editingProfile,
      galleryRows: [...currentRows, newRow],
    });
  };

  const handleDeleteGalleryRow = (rowId: string) => {
    if (!editingProfile) return;
    const currentRows = editingProfile.galleryRows || [];
    setEditingProfile({
      ...editingProfile,
      galleryRows: currentRows.filter((r) => r.id !== rowId),
    });
  };

  const handleAddItemToRow = (rowId: string) => {
    if (!editingProfile) return;
    const currentRows = editingProfile.galleryRows && editingProfile.galleryRows.length > 0
      ? editingProfile.galleryRows
      : [
          {
            id: rowId,
            items: [],
          },
        ];
    setEditingProfile({
      ...editingProfile,
      galleryRows: currentRows.map((r) => {
        if (r.id !== rowId) return r;
        if (r.items.length >= 7) {
          if (showToast) showToast("Maximum 7 images allowed per row", "error");
          return r;
        }
        const newItem: GalleryRowItem = {
          id: `item-${Date.now()}-${r.items.length + 1}`,
          imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=400&auto=format&fit=crop",
          text: `Item ${r.items.length + 1}`,
          title: `Item ${r.items.length + 1} Title`,
        };
        return {
          ...r,
          items: [...r.items, newItem],
        };
      }),
    });
  };

  const handleUpdateRowItem = (rowId: string, itemId: string, updates: Partial<GalleryRowItem>) => {
    if (!editingProfile) return;
    const currentRows = editingProfile.galleryRows || [];
    setEditingProfile({
      ...editingProfile,
      galleryRows: currentRows.map((r) => {
        if (r.id !== rowId) return r;
        return {
          ...r,
          items: r.items.map((it) => (it.id === itemId ? { ...it, ...updates } : it)),
        };
      }),
    });
  };

  const handleDeleteRowItem = (rowId: string, itemId: string) => {
    if (!editingProfile) return;
    const currentRows = editingProfile.galleryRows || [];
    setEditingProfile({
      ...editingProfile,
      galleryRows: currentRows.map((r) => {
        if (r.id !== rowId) return r;
        return {
          ...r,
          items: r.items.filter((it) => it.id !== itemId),
        };
      }),
    });
  };

  // Email Management Sub-Tabs & Inquiries State
  const [activeSubTab, setActiveSubTab] = useState<"desks" | "inquiries" | "smtp">("desks");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState<boolean>(false);
  const [inquirySearch, setInquirySearch] = useState<string>("");
  const [inquiryFilter, setInquiryFilter] = useState<"ALL" | "NEW" | "RESPONDED">("ALL");
  const [selectedInquiryForReply, setSelectedInquiryForReply] = useState<Inquiry | null>(null);

  // SMTP Settings State
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState(465);
  const [smtpSecure, setSmtpSecure] = useState(true);
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [smtpFromEmail, setSmtpFromEmail] = useState("");
  const [smtpFromName, setSmtpFromName] = useState("");
  const [isSmtpConfigured, setIsSmtpConfigured] = useState(false);
  const [isSavingSmtp, setIsSavingSmtp] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  // File upload from computer handler (Single or Multi-picture selection for a specific Card)
  const handleItemFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0 || !editingProfile || uploadingItemIndex === null) return;
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

  // General file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProfile) return;
    try {
      setIsUploadingMedia(true);
      const res = await uploadMediaFile(file, adminFetch);
      if (res && res.url) {
        if (res.mediaType === "video") {
          setEditingProfile({
            ...editingProfile,
            mediaType: "video",
            videoUrl: res.url,
            videoThumbnail:
              editingProfile.videoThumbnail ||
              "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
            videoTitle: editingProfile.videoTitle || file.name.replace(/\.[^/.]+$/, ""),
          });
          if (showToast) showToast("✓ Video uploaded successfully! Recipient click will autoplay video.");
        } else {
          setEditingProfile({
            ...editingProfile,
            mediaType: "image",
            videoThumbnail: res.url,
            videoTitle: editingProfile.videoTitle || file.name.replace(/\.[^/.]+$/, ""),
          });
          if (showToast) showToast("✓ Image uploaded successfully! Recipient click will show full details.");
        }
      }
    } catch (err: any) {
      if (showToast) showToast("Upload failed: " + err.message, "error");
    } finally {
      setIsUploadingMedia(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Helper to extract or initialize media items array for the editing profile
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

  const handleBatchFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProfile) return;
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

  // Fetch profiles from database with de-duplication
  const loadProfiles = () => {
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
          // Ensure default Format 2 profile (executive-desk) is available if not in DB
          const defaultDesk2 = DEFAULT_EMAIL_PROFILES.find((p) => p.id === "executive-desk");
          if (defaultDesk2 && !seenIds.has(defaultDesk2.id) && !seenEmails.has((defaultDesk2.email || "").toLowerCase())) {
            uniqueList.push(defaultDesk2);
          }
          const finalProfiles = uniqueList.length > 0 ? uniqueList : data.profiles;
          setProfiles(finalProfiles);
          if (!finalProfiles.some((p: EmailDepartmentProfile) => p.id === selectedProfileId)) {
            setSelectedProfileId(finalProfiles[0].id);
          }
        }
      })
      .catch(() => {});
  };

  // Fetch inquiries from database
  const fetchInquiries = useCallback(async () => {
    try {
      setIsLoadingInquiries(true);
      const res = await adminFetch("/api/admin/inquiries", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch {
      // quiet catch
    } finally {
      setIsLoadingInquiries(false);
    }
  }, [adminFetch]);

  // Fetch SMTP Settings from database
  const fetchSmtpSettings = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/email/settings");
      const data = await res.json();
      if (data.success && data.config) {
        setSmtpHost(data.config.host || "");
        setSmtpPort(data.config.port || 465);
        setSmtpSecure(data.config.secure !== false);
        setSmtpUser(data.config.user || "");
        setSmtpPass(data.config.pass || "");
        setSmtpFromEmail(data.config.from_email || "");
        setSmtpFromName(data.config.from_name || "Creed Tech Executive Desk");
        setIsSmtpConfigured(Boolean(data.config.isConfigured));
      }
    } catch {
      // quiet catch
    }
  }, [adminFetch]);

  useEffect(() => {
    loadProfiles();
    fetchInquiries();
    fetchSmtpSettings();
  }, [adminFetch, fetchInquiries, fetchSmtpSettings]);

  // Save SMTP Settings
  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSavingSmtp(true);
      const res = await adminFetch("/api/admin/email/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: Number(smtpPort),
          secure: smtpSecure,
          user: smtpUser,
          pass: smtpPass,
          from_email: smtpFromEmail,
          from_name: smtpFromName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSmtpConfigured(data.isConfigured);
        if (showToast) showToast("✓ SMTP settings saved successfully!");
      } else {
        throw new Error(data.error || "Failed to save SMTP settings");
      }
    } catch (err: any) {
      if (showToast) showToast(`Error saving SMTP: ${err.message}`, "error");
    } finally {
      setIsSavingSmtp(false);
    }
  };

  // Test SMTP Connection
  const handleTestSmtp = async () => {
    try {
      setIsTestingSmtp(true);
      const res = await adminFetch("/api/admin/email/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: Number(smtpPort),
          secure: smtpSecure,
          user: smtpUser,
          pass: smtpPass,
          from_email: smtpFromEmail,
          from_name: smtpFromName,
          test_email: smtpUser || activeProfile.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (showToast) showToast("✓ SMTP Connection test successful! Server delivered test message.");
      } else {
        throw new Error(data.error || "SMTP test failed");
      }
    } catch (err: any) {
      if (showToast) showToast(`SMTP Test failed: ${err.message}`, "error");
    } finally {
      setIsTestingSmtp(false);
    }
  };

  const activeProfile =
    profiles.find((p) => p.id === selectedProfileId) || profiles[0] || DEFAULT_EMAIL_PROFILES[0];

  // Save / Update profile with strict duplicate prevention
  const handleSaveProfile = async (
    profileToSave: EmailDepartmentProfile,
    stayInEditor = false,
    suppressToast = false
  ) => {
    try {
      setIsSaving(true);

      const normalizedEmail = (profileToSave.email || "").trim().toLowerCase();
      if (!normalizedEmail || !normalizedEmail.includes("@")) {
        if (showToast) showToast("Please enter a valid email address.", "error");
        setIsSaving(false);
        return;
      }

      if (!profileToSave.name || !profileToSave.name.trim()) {
        if (showToast) showToast("Please provide a name for this business email profile.", "error");
        setIsSaving(false);
        return;
      }

      // Prevent duplicate email addresses across profiles
      const duplicateEmail = profiles.some(
        (p) => p.id !== profileToSave.id && (p.email || "").trim().toLowerCase() === normalizedEmail
      );
      if (duplicateEmail) {
        if (showToast) {
          showToast(
            `Business email "${profileToSave.email}" already exists. Duplicate email profiles are not allowed.`,
            "error"
          );
        }
        setIsSaving(false);
        return;
      }

      const exists = profiles.some((p) => p.id === profileToSave.id);
      const updatedList = exists
        ? profiles.map((p) => (p.id === profileToSave.id ? profileToSave : p))
        : [...profiles, profileToSave];

      const res = await adminFetch("/api/admin/email/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles: updatedList }),
      });

      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles || updatedList);
        setSelectedProfileId(profileToSave.id);
        if (!stayInEditor) {
          setEditingProfile(null);
        }
        if (!suppressToast && showToast) {
          showToast(`✓ Email profile "${profileToSave.name}" saved successfully!`);
        }
      } else {
        throw new Error(data.error || "Failed to save profile");
      }
    } catch (err: any) {
      if (!suppressToast && showToast) showToast(`Error: ${err.message}`, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete profile
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
        if (showToast) showToast(`✓ Profile deleted.`);
      }
    } catch (err: any) {
      if (showToast) showToast(`Error: ${err.message}`, "error");
    }
  };

  // Send Test Email
  const handleSendTestEmail = async () => {
    if (!testEmailRecipient || !testEmailRecipient.includes("@")) {
      if (showToast) showToast("Please enter a valid recipient email for the test.", "error");
      return;
    }

    try {
      setIsSendingTest(true);
      const res = await adminFetch("/api/admin/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testEmailRecipient,
          subject: `Test Broadcast from ${activeProfile.name}`,
          message: `This is a live test broadcast demonstrating the branded formatting for ${activeProfile.name} (${activeProfile.email}).\n\nAll layout cards, address details, direct signatures, and video presentation blocks are verified and active.`,
          profileId: activeProfile.id,
          fromEmail: activeProfile.email,
          fromName: activeProfile.name,
          clientName: "Enterprise Client",
          service: "Technical Architecture",
          updateStatus: false,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (showToast) {
          showToast(
            data.delivered
              ? `✓ Test email delivered to ${testEmailRecipient} via ${activeProfile.email}!`
              : `✓ Test triggered! ${data.message}`
          );
        }
      } else {
        throw new Error(data.error || data.message || "Failed to send test email");
      }
    } catch (err: any) {
      if (showToast) showToast(`Failed: ${err.message}`, "error");
    } finally {
      setIsSendingTest(false);
    }
  };

  // Copy Styled HTML to clipboard
  const handleCopyStyledHtml = async (profile: EmailDepartmentProfile) => {
    const htmlContent = generateEmailHtml(profile, {
      clientName: "Enterprise Client",
      message: (profile.defaultMessageTemplate || "Hello Client,\n\nThank you for reaching out.")
        .replace("{client_name}", "Enterprise Client")
        .replace("{service}", "Enterprise Solutions")
        .replace("{id}", "101"),
      subject: (profile.defaultSubjectTemplate || "Re: Creed Tech Discovery")
        .replace("{service}", "Enterprise Solutions")
        .replace("{id}", "101"),
      inquiryId: 101,
      service: "Enterprise Solutions",
    });

    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard && navigator.clipboard.write) {
        const blobHtml = new Blob([htmlContent], { type: "text/html" });
        const blobText = new Blob([profile.defaultMessageTemplate || ""], { type: "text/plain" });
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
        showToast("✓ Styled layout copied to clipboard! Paste (Ctrl+V) directly into Gmail or Outlook.");
      }
    } catch {
      if (showToast) showToast("Copied to clipboard.");
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === "NEW" && inq.status !== "NEW" && inq.status !== "PENDING") return false;
    if (inquiryFilter === "RESPONDED" && inq.status !== "RESPONDED" && inq.status !== "RESOLVED") return false;
    if (!inquirySearch.trim()) return true;
    const q = inquirySearch.toLowerCase();
    return (
      (inq.client_name && inq.client_name.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.service && inq.service.toLowerCase().includes(q)) ||
      (inq.project_details && inq.project_details.toLowerCase().includes(q)) ||
      String(inq.id).includes(q)
    );
  });

  const isEditingEmailDuplicate = Boolean(
    editingProfile &&
    editingProfile.email &&
    profiles.some(
      (p) => p.id !== editingProfile.id && (p.email || "").trim().toLowerCase() === (editingProfile.email || "").trim().toLowerCase()
    )
  );

  const renderMediaPreview = (profile: EmailDepartmentProfile, isSmall = false) => {
    const items: EmailMediaItem[] = getEditingMediaItems(profile);
    if (!items || items.length === 0) return null;

    const alignClass =
      profile.mediaAlignment === "left"
        ? `${isSmall ? "max-w-[280px]" : "max-w-[360px]"} mr-auto`
        : profile.mediaAlignment === "right"
        ? `${isSmall ? "max-w-[280px]" : "max-w-[360px]"} ml-auto`
        : "w-full";

    // Machinez.de style catalog cards grid (2-column responsive grid or centered single card)
    return (
      <div className={`my-3 ${alignClass}`}>
        <div className={`grid ${items.length === 1 ? "grid-cols-1 max-w-[320px] mx-auto" : "grid-cols-2"} gap-2.5`}>
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
                className="bg-white rounded-xl overflow-hidden border border-slate-200 text-left shadow-xs flex flex-col hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div
                  onClick={() => setPreviewDetailItem(item)}
                  className="block relative overflow-hidden bg-slate-900 shrink-0 cursor-pointer"
                  title="Click to open Machine Details Popup"
                >
                  <img
                    src={itemImg}
                    alt={item.title || "Offer"}
                    className={`w-full ${isSmall ? "h-22" : "h-28"} object-cover group-hover:scale-105 transition-transform duration-300`}
                  />
                  {isVideo && (
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md text-xs font-bold"
                      style={{ backgroundColor: profile.accentColor || "#FF6B00" }}
                    >
                      ▶
                    </div>
                  )}
                  {item.year && (
                    <div className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {item.year}
                    </div>
                  )}
                  {Array.isArray(item.galleryUrls) && item.galleryUrls.length > 1 && (
                    <div className="absolute top-1.5 right-1.5 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
                      <span>📷</span>
                      <span>{item.galleryUrls.length}</span>
                    </div>
                  )}
                </div>
                <div className="p-2.5 flex-1 flex flex-col justify-between bg-white text-slate-900">
                  <div>
                    <button
                      type="button"
                      onClick={() => setPreviewDetailItem(item)}
                      className={`font-bold text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors text-left cursor-pointer ${
                        isSmall ? "text-[11px]" : "text-xs"
                      }`}
                    >
                      {item.title || `Offer #${idx + 1}`}
                    </button>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span className="font-semibold text-slate-600">Year: {item.year || "2018"}</span>
                      <span className="text-amber-500 font-bold">{item.condition || "★★★★☆"}</span>
                    </div>
                    {item.specs && (
                      <div className="text-[9px] text-slate-600 bg-slate-50 border border-slate-100 p-1 rounded font-mono mt-1.5 line-clamp-1">
                        {item.specs}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 text-[9px] font-medium">Click to preview</span>
                    <button
                      type="button"
                      onClick={() => setPreviewDetailItem(item)}
                      className="font-bold text-[10px] flex items-center gap-0.5 hover:underline cursor-pointer"
                      style={{ color: profile.accentColor || "#FF6B00" }}
                    >
                      <span>{isVideo ? "▶ Play Video" : "👁️ View Details"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSignaturePreview = (profile: EmailDepartmentProfile, isSmall = false) => {
    const sigStyle = profile.signatureStyle || "modern-curved";
    const sigName = profile.name || "Enterprise Representative";
    const sigRole = profile.signatureRole || profile.department || "Enterprise Solutions Director";
    const sigCompany = profile.signatureCompany || "CREED TECH";
    const sigTagline = profile.signatureTagline || "Enterprise Systems & Cloud Infrastructure";
    const sigPhone = profile.phone || "+1 (888) 492-7330";
    const sigEmail = profile.email || "desk@creed-tech.com";
    const sigWeb = profile.signatureWebsite || "https://creed-tech.com";
    const sigWebDisplay = sigWeb.replace(/^https?:\/\//i, "").replace(/\/$/, "");
    const sigAddress = profile.address || "San Francisco, CA";
    const sigAvatar =
      profile.signatureAvatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
    const accent = profile.accentColor || "#0052FF";

    if (sigStyle === "dark-luxury") {
      return (
        <div className={`mt-4 ${isSmall ? "p-3" : "p-3.5"} rounded-xl border border-white/10 bg-[#0B1120] text-slate-100 shadow-md`}>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 w-14 h-14 rounded-full p-0.5" style={{ background: accent }}>
              <img src={sigAvatar} alt={sigName} className="w-full h-full object-cover rounded-full bg-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black uppercase tracking-wider text-white truncate">{sigName}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 truncate" style={{ color: accent }}>{sigRole}</div>
              <div className="text-[9px] text-slate-400 truncate mb-1.5">{sigTagline}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-slate-300">
                <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>📞</span><span>{sigPhone}</span></div>
                <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>✉️</span><span className="text-sky-400">{sigEmail}</span></div>
                <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>🌐</span><span className="text-sky-400">{sigWebDisplay}</span></div>
                <div className="flex items-center gap-1 truncate text-slate-400"><span style={{ color: accent }}>📍</span><span className="truncate">{sigAddress}</span></div>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-center justify-center p-2 rounded-lg border border-white/10 text-center shrink-0" style={{ background: `${accent}18` }}>
              <div className="text-[11px] font-black tracking-wider text-white">{sigCompany}</div>
              <span className="text-[7px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">OFFICIAL</span>
              <span className="mt-1 px-1.5 py-0.2 rounded-full text-[7px] font-bold text-white bg-white/20">● VERIFIED</span>
            </div>
          </div>
        </div>
      );
    }

    if (sigStyle === "minimal-pill") {
      return (
        <div className={`mt-4 ${isSmall ? "p-2.5" : "p-3"} rounded-lg border border-slate-200 bg-white shadow-2xs`} style={{ borderLeft: `4px solid ${accent}` }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden border-2" style={{ borderColor: accent }}>
              <img src={sigAvatar} alt={sigName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-slate-900 tracking-tight">{sigName}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                {sigRole} • <span className="text-slate-500 font-semibold">{sigCompany}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[9px] text-slate-600 mt-1">
                <span>📞 {sigPhone}</span>
                <span>•</span>
                <span style={{ color: accent }}>✉️ {sigEmail}</span>
                <span>•</span>
                <span>🌐 {sigWebDisplay}</span>
              </div>
              {sigAddress && <div className="text-[8px] text-slate-400 mt-0.5">📍 {sigAddress}</div>}
            </div>
          </div>
        </div>
      );
    }

    if (sigStyle === "classic-corporate") {
      return (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-2xs">
          <div className="h-1.5 w-full" style={{ background: accent }} />
          <div className="p-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden border-2 border-white shadow-xs">
              <img src={sigAvatar} alt={sigName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-slate-900 uppercase">{sigName}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>{sigRole}</div>
              <div className="text-[9px] text-slate-500">{sigCompany} • {sigTagline}</div>
              <div className="flex flex-wrap items-center gap-x-2 text-[9px] text-slate-700 mt-1">
                <span><strong>Tel:</strong> {sigPhone}</span>
                <span>•</span>
                <span style={{ color: accent }}><strong>Email:</strong> {sigEmail}</span>
                <span>•</span>
                <span><strong>Web:</strong> {sigWebDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default: modern-curved (Primary Shutterstock wave style)
    return (
      <div className={`mt-4 ${isSmall ? "p-3" : "p-3.5"} rounded-xl border border-slate-200 bg-gradient-to-r from-white via-slate-50 to-blue-50/30 shadow-xs`}>
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 w-14 h-14 rounded-full p-0.5 shadow-sm" style={{ background: `linear-gradient(135deg, ${accent}, #0F172A)` }}>
            <img src={sigAvatar} alt={sigName} className="w-full h-full object-cover rounded-full bg-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black uppercase tracking-wider text-slate-900 truncate">{sigName}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 truncate" style={{ color: accent }}>{sigRole}</div>
            <div className="text-[9px] text-slate-500 truncate mb-1.5">{sigTagline}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-slate-700">
              <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>📞</span><span>{sigPhone}</span></div>
              <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>✉️</span><span style={{ color: accent }}>{sigEmail}</span></div>
              <div className="flex items-center gap-1 truncate"><span style={{ color: accent }}>🌐</span><span className="text-sky-600">{sigWebDisplay}</span></div>
              <div className="flex items-center gap-1 truncate text-slate-500"><span style={{ color: accent }}>📍</span><span className="truncate">{sigAddress}</span></div>
            </div>
          </div>
          <div
            className="hidden sm:flex flex-col items-center justify-center p-2 rounded-xl text-white text-center shrink-0 shadow-xs"
            style={{ background: `linear-gradient(135deg, ${accent}, #0F172A)` }}
          >
            <div className="text-[11px] font-black tracking-wider uppercase">{sigCompany}</div>
            <span className="text-[7px] font-extrabold uppercase tracking-widest opacity-90 mt-0.5">OFFICIAL</span>
            <span className="mt-1 px-1.5 py-0.2 rounded-full text-[7px] font-bold bg-white/20">VERIFIED</span>
          </div>
        </div>
      </div>
    );
  };

  const renderFormat2Preview = (profile: EmailDepartmentProfile, isSmall = false) => {
    const accent = profile.accentColor || "#0052FF";
    const logo = profile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png";
    const heading = profile.sidebarHeading || profile.name || "CREED TECH";
    const address = profile.sidebarAddress || profile.address || "Industrial Area Phase 2, Karachi";
    const phone = profile.sidebarPhone || profile.phone || "+92 300 1234567";
    const socials =
      profile.sidebarSocialLinks && profile.sidebarSocialLinks.length > 0
        ? profile.sidebarSocialLinks
        : DEFAULT_FORMAT2_SOCIAL_LINKS;

    const mainPic =
      profile.featuredMainPicUrl ||
      (profile.mediaItems && profile.mediaItems[0]?.mediaUrl) ||
      profile.videoThumbnail ||
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
    const mainPicText =
      profile.featuredMainPicText ||
      "Next-Generation Industrial Machinery & Enterprise Engineering Solutions";

    const rows =
      profile.galleryRows && profile.galleryRows.length > 0
        ? profile.galleryRows
        : [
            {
              id: "row-1",
              items: [
                { id: "item-1-1", imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop", text: "CNC Miller 5X", title: "CNC Miller 5X High Precision" },
                { id: "item-1-2", imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=400&auto=format&fit=crop", text: "Laser Cutter", title: "Fiber Laser Cutting System" },
                { id: "item-1-3", imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop", text: "Hydraulic Press", title: "Heavy Duty 200T Hydraulic Press" },
                { id: "item-1-4", imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=400&auto=format&fit=crop", text: "Automated Robot", title: "6-Axis Robotic Arm" },
                { id: "item-1-5", imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop", text: "Injection Mold", title: "Electric Injection Molding Machine" },
                { id: "item-1-6", imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=400&auto=format&fit=crop", text: "Rotary Lathe", title: "Precision Metal Turning Lathe" },
                { id: "item-1-7", imageUrl: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=400&auto=format&fit=crop", text: "Quality Scanner", title: "3D Optical CMM Scanner" },
              ],
            },
          ];

    const getPlatformIcon = (platform: string) => {
      switch (platform.toLowerCase()) {
        case "facebook": return "📘";
        case "linkedin": return "💼";
        case "whatsapp": return "💬";
        case "instagram": return "📷";
        case "twitter": return "🐦";
        case "youtube": return "▶️";
        case "website": return "🌐";
        default: return "🔗";
      }
    };

    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md flex flex-col md:flex-row text-slate-800 my-3">
        {/* LEFT SIDEBAR BAR */}
        <div className={`${isSmall ? "w-full md:w-44" : "w-full md:w-56"} bg-[#0B1120] text-white p-3 flex flex-col justify-between shrink-0 border-r border-slate-800`}>
          {/* Upper: Logo & Heading */}
          <div className="text-center pb-3 border-b border-white/10">
            {logo && (
              <img src={logo} alt={heading} className="max-h-10 max-w-[120px] object-contain mx-auto mb-1.5" />
            )}
            <div className="text-xs font-black tracking-wide uppercase text-white truncate">
              {heading}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color: accent }}>
              {profile.department || "Enterprise Division"}
            </div>
          </div>

          {/* Lower: Address, Phone, Social Links */}
          <div className="pt-2.5 space-y-2">
            {address && (
              <div>
                <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">📍 Address</div>
                <div className="text-[10px] text-slate-300 leading-snug line-clamp-2 mt-0.5">{address}</div>
              </div>
            )}

            {phone && (
              <div>
                <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">📞 Phone</div>
                <div className="text-[10px] font-bold text-sky-400 mt-0.5 font-mono">{phone}</div>
              </div>
            )}

            {/* Dynamic Social Links */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>🌐 Social Links</span>
                <span className="text-[7px] text-slate-500">({socials.length})</span>
              </div>
              <div className="space-y-1">
                {socials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-[10px]">{getPlatformIcon(soc.platform)}</span>
                      <span className="truncate capitalize">{soc.label || soc.platform}</span>
                    </div>
                    <span className="text-[7px] text-slate-400">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / MAIN CONTENT AREA */}
        <div className="flex-1 p-3 bg-slate-50/50 flex flex-col justify-between overflow-x-auto">
          <div>
            {/* Top Featured Main Picture with Text */}
            <div
              onClick={() => setEnlargedMediaPopup({ imageUrl: mainPic, title: heading, text: mainPicText })}
              className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs group cursor-pointer relative mb-3 hover:border-blue-400 hover:shadow-md transition-all"
              title="Click to Enlarge Picture & Text"
            >
              <div className="relative bg-slate-900 overflow-hidden">
                <img
                  src={mainPic}
                  alt="Main"
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <span>🔍</span>
                  <span>Click to Enlarge</span>
                </div>
              </div>
              {mainPicText && (
                <div className="p-2 bg-white text-[11px] font-bold text-slate-800 border-t border-slate-100 flex items-center justify-between">
                  <span className="line-clamp-2">{mainPicText}</span>
                  <span className="text-blue-600 text-xs shrink-0 ml-1.5">↗</span>
                </div>
              )}
            </div>

            {/* LOWER GALLERY ROWS (MAX 7 ITEMS PER ROW, CENTER ADJUSTED) */}
            <div className="pt-2 border-t border-dashed border-slate-300">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  Featured Gallery ({rows.length} {rows.length === 1 ? "Row" : "Rows"})
                </span>
                <span className="text-[8px] text-blue-600 font-bold">
                  Click thumbnail to enlarge 🔍
                </span>
              </div>

              <div className="space-y-2">
                {rows.map((row, rIdx) => {
                  const itemsInRow = (row.items || []).slice(0, 7);
                  return (
                    <div key={row.id || rIdx} className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
                      {/* Centered when fewer than 7 */}
                      <div className="flex flex-wrap items-start justify-center gap-1.5">
                        {itemsInRow.map((it, itIdx) => (
                          <div
                            key={it.id || itIdx}
                            onClick={() => setEnlargedMediaPopup({ imageUrl: it.imageUrl, title: it.title || it.text, text: it.text })}
                            className="w-[66px] shrink-0 text-center cursor-pointer group/card hover:-translate-y-0.5 transition-transform"
                            title="Click to open enlarged popup"
                          >
                            <div className="w-[64px] h-[64px] rounded-lg overflow-hidden border border-slate-200 bg-slate-100 mx-auto shadow-2xs relative group-hover/card:border-blue-500">
                              <img
                                src={it.imageUrl}
                                alt={it.text}
                                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 flex items-center justify-center transition-colors">
                                <span className="opacity-0 group-hover/card:opacity-100 text-white text-xs">🔍</span>
                              </div>
                            </div>
                            <div className="text-[8px] font-bold text-slate-700 leading-tight mt-1 line-clamp-2 group-hover/card:text-blue-600 transition-colors">
                              {it.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const activeModalFormat: EmailFormatType = editingProfile
    ? (editingProfile.formatType ||
      (editingProfile.sidebarLogo || editingProfile.galleryRows || editingProfile.sidebarSocialLinks
        ? "format-executive-signature"
        : "format-catalog"))
    : "format-catalog";

  const activeProfileFormat: EmailFormatType =
    activeProfile.formatType ||
    (activeProfile.sidebarLogo || activeProfile.galleryRows || activeProfile.sidebarSocialLinks
      ? "format-executive-signature"
      : "format-catalog");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 text-[#0F172A] shadow-xs relative overflow-hidden select-none">
        {/* Ambient Orange Radial Glow matching main site */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 85% 25%, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0.02) 50%, transparent 75%)",
          }}
        />

        <div className="relative z-10">
          <h2 className="text-xl font-bold tracking-tight m-0 flex items-center gap-2 text-[#0F172A] font-outfit">
            <span>✉️</span>
            <span>Enterprise Email Management &amp; Operations</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Centralized operations hub to manage multi-department business emails (support@, security@, solutions@, desk5@), custom branded HTML formats, SMTP connection, and replying to client inquiries.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 flex-wrap">
          {/* Main Action Button for replying to inquiries */}
          <button
            type="button"
            onClick={() => {
              setActiveSubTab("inquiries");
              const pending = inquiries.find((i) => i.status === "NEW" || i.status === "PENDING");
              if (pending) {
                setSelectedInquiryForReply(pending);
              }
            }}
            className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-2 shadow-[0_2px_12px_rgba(255,107,0,0.25)] shrink-0 active:scale-95"
            title="Open incoming client inquiries to send branded replies"
          >
            <span>💬</span>
            <span>Reply to Inquiries</span>
            {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-[#FF6B00] shadow-xs">
                {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length} New
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              const existingEmails = new Set(profiles.map((p) => (p.email || "").trim().toLowerCase()));
              let count = profiles.length + 1;
              let nextEmail = `desk${count}@creed-tech.com`;
              while (existingEmails.has(nextEmail.toLowerCase())) {
                count++;
                nextEmail = `desk${count}@creed-tech.com`;
              }
              const nextName = `Creed Tech Desk ${count}`;

              setEditingProfile({
                id: "dept_" + Date.now().toString(36),
                name: nextName,
                email: nextEmail,
                department: "Client Services",
                accentColor: "#FF6B00",
                phone: "+1 (888) 492-7330",
                address: "Creed Tech Global Headquarters, 450 Innovation Parkway, San Francisco, CA",
                videoUrl: "https://creed-tech.com",
                videoThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
                videoTitle: "Watch: Architecture Overview",
                footerDisclaimer: "Creed Tech Sovereign Enterprise Systems. All rights reserved.",
                defaultSubjectTemplate: "Re: Creed Tech Discovery - {service} [Inquiry #{id}]",
                defaultMessageTemplate: `Dear {client_name},\n\nThank you for reaching out to Creed Tech regarding "{service}".\n\nBest regards,\nCreed Tech Team`,
              });
            }}
            className="px-3.5 py-2 bg-[#F1F3F5] hover:bg-[#EBECEF] border border-[#E2E8F0] text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <span>➕</span>
            <span>Add Business Email</span>
          </button>
        </div>
      </div>

      {/* Quick Status Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveSubTab("desks")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeSubTab === "desks"
              ? "bg-white border-orange-300 shadow-[0_2px_12px_rgba(255,107,0,0.15)] ring-1 ring-[#FF6B00]"
              : "bg-white border-[#E2E8F0] hover:border-orange-200 shadow-xs"
          }`}
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>🏢</span>
            <span>Business Desks</span>
          </div>
          <div className="text-2xl font-black text-[#0F172A] font-outfit">{profiles.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Configured Email Profiles</div>
        </div>

        <div
          onClick={() => setActiveSubTab("inquiries")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeSubTab === "inquiries"
              ? "bg-white border-orange-300 shadow-[0_2px_12px_rgba(255,107,0,0.15)] ring-1 ring-[#FF6B00]"
              : "bg-white border-[#E2E8F0] hover:border-orange-200 shadow-xs"
          }`}
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>💬</span>
            <span>Client Inquiries</span>
          </div>
          <div className="text-2xl font-black text-[#0F172A] font-outfit">{inquiries.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Total Inbound Leads</div>
        </div>

        <div
          onClick={() => {
            setActiveSubTab("inquiries");
            setInquiryFilter("NEW");
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0
              ? "bg-amber-50/70 border-amber-300 hover:border-amber-400 shadow-xs"
              : "bg-white border-[#E2E8F0] hover:border-orange-200 shadow-xs"
          }`}
        >
          <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>⏳</span>
            <span>Pending Replies</span>
          </div>
          <div className="text-2xl font-black text-amber-700 font-outfit">
            {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length}
          </div>
          <div className="text-[10px] text-amber-600 mt-0.5 font-medium">Ready for immediate response</div>
        </div>

        <div
          onClick={() => setActiveSubTab("smtp")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeSubTab === "smtp"
              ? "bg-white border-orange-300 shadow-[0_2px_12px_rgba(255,107,0,0.15)] ring-1 ring-[#FF6B00]"
              : "bg-white border-[#E2E8F0] hover:border-orange-200 shadow-xs"
          }`}
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>⚙️</span>
            <span>SMTP Server</span>
          </div>
          <div className="text-sm font-bold flex items-center gap-1.5 mt-1 text-[#0F172A]">
            <span
              className={`w-2.5 h-2.5 rounded-full inline-block ${
                isSmtpConfigured ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span>{isSmtpConfigured ? "Connected" : "Local Mode"}</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-medium font-mono truncate">
            {smtpHost || "mail.server"}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto shadow-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab("desks")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "desks"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_10px_rgba(255,107,0,0.25)]"
              : "text-slate-600 hover:text-[#0F172A] hover:bg-[#F1F3F5]"
          }`}
        >
          <span>🏢</span>
          <span>Business Email Desks &amp; Formats ({profiles.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("inquiries")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "inquiries"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_10px_rgba(255,107,0,0.25)]"
              : "text-slate-600 hover:text-[#0F172A] hover:bg-[#F1F3F5]"
          }`}
        >
          <span>💬</span>
          <span>Client Inquiries &amp; Quick Reply</span>
          {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0 ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
              {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length} New
            </span>
          ) : (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-[#EBECEF] text-slate-600">
              {inquiries.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("smtp")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "smtp"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_10px_rgba(255,107,0,0.25)]"
              : "text-slate-600 hover:text-[#0F172A] hover:bg-[#F1F3F5]"
          }`}
        >
          <span>⚙️</span>
          <span>SMTP Server Settings</span>
          <span
            className={`w-2 h-2 rounded-full inline-block ${
              isSmtpConfigured ? "bg-emerald-500" : "bg-amber-500"
            }`}
            title={isSmtpConfigured ? "SMTP Connected" : "Local Mode"}
          />
        </button>
      </div>

      {/* MODAL: VISUAL DESIGNER FOR ADD / EDIT */}
      {editingProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-6xl w-full p-5 sm:p-6 shadow-2xl relative text-left my-8 max-h-[92vh] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h3 className="text-base font-bold text-gray-900 m-0">
                  {profiles.some((p) => p.id === editingProfile.id)
                    ? `Visual Designer: ${editingProfile.name}`
                    : "Design New Business Email Profile"}
                </h3>
                <span className="text-xs text-gray-500">
                  Select 1 of 5 distinct formats, customize colors, layout &amp; live preview.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="text-sm font-bold text-gray-400 hover:text-gray-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* FORMAT SELECTOR BAR (5 DISTINCT FORMAT SLOTS) */}
            <div className="pt-2.5 pb-2 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎨 Email Template Format:</span>
                  <span className="text-gray-400 font-normal text-[10px]">(5 Format Architecture)</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Active: {activeModalFormat === "format-executive-signature" ? "Format 2 (Executive Desk)" : "Format 1 (Catalog Cards)"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {EMAIL_FORMATS_METADATA.map((fmt) => {
                  const isSelected = activeModalFormat === fmt.id;
                  const isReserved = fmt.status === "RESERVED";
                  return (
                    <button
                      key={fmt.id}
                      type="button"
                      disabled={isReserved}
                      onClick={() => {
                        if (!isReserved) {
                          setEditingProfile({
                            ...editingProfile,
                            formatType: fmt.id,
                            ...(fmt.id === "format-executive-signature"
                              ? {
                                  sidebarHeading: editingProfile.sidebarHeading || editingProfile.name || "CREED TECH",
                                  sidebarLogo: editingProfile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png",
                                  sidebarAddress: editingProfile.sidebarAddress || editingProfile.address || "Industrial Area Phase 2, Karachi",
                                  sidebarPhone: editingProfile.sidebarPhone || editingProfile.phone || "+92 300 1234567",
                                  sidebarSocialLinks:
                                    editingProfile.sidebarSocialLinks && editingProfile.sidebarSocialLinks.length > 0
                                      ? editingProfile.sidebarSocialLinks
                                      : DEFAULT_FORMAT2_SOCIAL_LINKS,
                                  featuredMainPicUrl:
                                    editingProfile.featuredMainPicUrl ||
                                    (editingProfile.mediaItems && editingProfile.mediaItems[0]?.mediaUrl) ||
                                    editingProfile.videoThumbnail ||
                                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                                  featuredMainPicText:
                                    editingProfile.featuredMainPicText ||
                                    "Next-Generation Industrial Machinery & Enterprise Engineering Solutions",
                                  galleryRows:
                                    editingProfile.galleryRows && editingProfile.galleryRows.length > 0
                                      ? editingProfile.galleryRows
                                      : DEFAULT_FORMAT2_GALLERY_ROWS,
                                }
                              : {}),
                          });
                          if (showToast) {
                            showToast(`Template layout switched to: ${fmt.title}`);
                          }
                        }
                      }}
                      className={`p-2 rounded-lg border text-left transition-all relative ${
                        isReserved
                          ? "bg-gray-50/70 border-dashed border-gray-300 opacity-60 cursor-not-allowed"
                          : isSelected
                          ? "bg-blue-50/90 border-[#0052FF] ring-2 ring-blue-400 shadow-xs cursor-pointer"
                          : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs">{fmt.icon}</span>
                        <span
                          className={`text-[8px] font-extrabold uppercase px-1.5 py-0.2 rounded-full ${
                            isReserved
                              ? "bg-gray-200 text-gray-600"
                              : isSelected
                              ? "bg-[#0052FF] text-white"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isReserved ? "Reserved" : isSelected ? "Selected" : "Live"}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-gray-900 truncate">
                        Format {fmt.formatNumber}
                      </div>
                      <div className="text-[9px] text-gray-500 truncate leading-tight">
                        {fmt.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Screen Designer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4 max-h-[calc(90vh-130px)] overflow-y-auto pr-2">
              {/* Controls (6 Cols) */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    1. Identity &amp; Colors
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Profile Name *</label>
                      <input
                        type="text"
                        value={editingProfile.name}
                        onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-medium outline-none focus:border-[#0052FF] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Department Tag *</label>
                      <input
                        type="text"
                        value={editingProfile.department}
                        onChange={(e) => setEditingProfile({ ...editingProfile, department: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-medium outline-none focus:border-[#0052FF] bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Sender Email *</label>
                      <input
                        type="email"
                        value={editingProfile.email}
                        onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                        className={`w-full px-2.5 py-1 text-xs border rounded font-mono outline-none bg-white ${
                          isEditingEmailDuplicate ? "border-red-500 focus:border-red-600 ring-1 ring-red-400" : "border-gray-300 focus:border-[#0052FF]"
                        }`}
                        placeholder="e.g. desk@creed-tech.com"
                      />
                      {isEditingEmailDuplicate && (
                        <span className="text-[10px] text-red-600 font-bold block mt-1 flex items-center gap-1">
                          <span>⚠️</span>
                          <span>This business email already exists in another profile. Duplicate email formats are not allowed.</span>
                        </span>
                      )}
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

                {/* FORMAT 1: MACHINE OFFERS & CATALOG CARDS */}
                {activeModalFormat === "format-catalog" && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
                    <div>
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                        2. Machine Offers &amp; Product Catalog Cards (Email Center)
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Upload single or multiple pictures at once. They will automatically format into clean 2-column multi-rows (Row 1, Row 2, Row 3...).
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
                  <input
                    type="file"
                    ref={avatarFileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
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
                )}

                {/* FORMAT 2 CONTROLS: Left Sidebar Dashboard & 7-Item Multi-Row Gallery */}
                {activeModalFormat === "format-executive-signature" && (
                  <div className="bg-gradient-to-r from-slate-50 via-blue-50/20 to-indigo-50/20 border border-blue-200 rounded-xl p-3.5 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                      <div>
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
                          <span>📊 2. Format 2: Left Sidebar Bar &amp; 7-Item Multi-Row Gallery</span>
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Left bar with logo, heading, address, phone &amp; dynamic social links + Main top pic &amp; 7-item image gallery with enlarge popup modal.
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full border border-blue-200">
                        Format 2 Active
                      </span>
                    </div>

                    {/* PART 1: LEFT SIDEBAR CONFIGURATION */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                          <span>📌 Left Sidebar Bar Configuration</span>
                        </span>
                        <span className="text-[10px] text-slate-400">Upper: Logo &amp; Heading | Lower: Address, Phone &amp; Social Links</span>
                      </div>

                      {/* Upper Part: Logo & Heading */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Logo input & upload */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                            Company Logo (Upper Part)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              ref={sidebarLogoInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={handleSidebarLogoUpload}
                            />
                            <button
                              type="button"
                              disabled={isUploadingSidebarLogo}
                              onClick={() => sidebarLogoInputRef.current?.click()}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors shadow-2xs flex items-center gap-1 disabled:opacity-50"
                            >
                              <span>📷</span>
                              <span>{isUploadingSidebarLogo ? "Uploading..." : "Upload Logo"}</span>
                            </button>
                            <input
                              type="text"
                              value={editingProfile.sidebarLogo || ""}
                              onChange={(e) => setEditingProfile({ ...editingProfile, sidebarLogo: e.target.value })}
                              placeholder="Or paste Logo URL"
                              className="flex-1 px-2 py-1 text-[10px] border border-slate-300 rounded font-mono text-slate-700 bg-white"
                            />
                          </div>
                          {editingProfile.sidebarLogo && (
                            <div className="p-1.5 bg-slate-900 rounded-md w-fit inline-flex items-center gap-2 mt-1">
                              <img src={editingProfile.sidebarLogo} alt="Logo" className="max-h-6 object-contain" />
                              <span className="text-[9px] text-slate-300">Logo preview</span>
                            </div>
                          )}
                        </div>

                        {/* Heading & Subtitle */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                            Company Heading (Upper Part)
                          </label>
                          <input
                            type="text"
                            value={editingProfile.sidebarHeading || ""}
                            onChange={(e) => setEditingProfile({ ...editingProfile, sidebarHeading: e.target.value })}
                            placeholder="e.g. LOADLOGIC or CREED TECH"
                            className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-bold text-slate-800 bg-white"
                          />
                          <div className="text-[10px] text-slate-500">
                            Subtitle: <span className="font-semibold">{editingProfile.department || "Enterprise Division"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Lower Part: Address & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            📍 Address (Lower Part)
                          </label>
                          <input
                            type="text"
                            value={editingProfile.sidebarAddress || ""}
                            onChange={(e) => setEditingProfile({ ...editingProfile, sidebarAddress: e.target.value })}
                            placeholder="e.g. Industrial Area Phase 2, Karachi"
                            className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded text-slate-800 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            📞 Phone Number (Lower Part)
                          </label>
                          <input
                            type="text"
                            value={editingProfile.sidebarPhone || ""}
                            onChange={(e) => setEditingProfile({ ...editingProfile, sidebarPhone: e.target.value })}
                            placeholder="e.g. +92 300 1234567"
                            className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-mono text-slate-800 bg-white"
                          />
                        </div>
                      </div>

                      {/* Lower Part: Social Links (Facebook, LinkedIn, WhatsApp, Instagram, Add / Delete) */}
                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                              🌐 Social Links (Facebook, LinkedIn, WhatsApp, Instagram &amp; more)
                            </label>
                            <span className="text-[10px] text-slate-400">
                              Aap naye social links add kar saktay hain aur delete bi kar saktay hain
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleAddSocialLink}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <span>➕</span>
                            <span>Add Social Link</span>
                          </button>
                        </div>

                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                          {(editingProfile.sidebarSocialLinks && editingProfile.sidebarSocialLinks.length > 0
                            ? editingProfile.sidebarSocialLinks
                            : DEFAULT_FORMAT2_SOCIAL_LINKS
                          ).map((soc, sIdx) => (
                            <div
                              key={soc.id || sIdx}
                              className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200"
                            >
                              <select
                                value={soc.platform}
                                onChange={(e) =>
                                  handleUpdateSocialLink(soc.id, {
                                    platform: e.target.value as any,
                                    label: e.target.value.toUpperCase(),
                                  })
                                }
                                className="text-[11px] font-bold bg-white border border-slate-300 rounded px-2 py-1 text-slate-700 outline-none"
                              >
                                <option value="facebook">📘 Facebook</option>
                                <option value="linkedin">💼 LinkedIn</option>
                                <option value="whatsapp">💬 WhatsApp</option>
                                <option value="instagram">📷 Instagram</option>
                                <option value="twitter">🐦 Twitter / X</option>
                                <option value="youtube">▶️ YouTube</option>
                                <option value="website">🌐 Website</option>
                                <option value="other">🔗 Other</option>
                              </select>

                              <input
                                type="text"
                                value={soc.label || ""}
                                onChange={(e) => handleUpdateSocialLink(soc.id, { label: e.target.value })}
                                placeholder="Label"
                                className="w-24 px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-medium"
                              />

                              <input
                                type="text"
                                value={soc.url}
                                onChange={(e) => handleUpdateSocialLink(soc.id, { url: e.target.value })}
                                placeholder="https://..."
                                className="flex-1 px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-mono text-slate-700"
                              />

                              <button
                                type="button"
                                onClick={() => handleDeleteSocialLink(soc.id)}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                title="Delete social link"
                              >
                                🗑️
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* PART 2: MAIN AREA - TOP FEATURED PICTURE WITH TEXT */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                          <span>🖼️ Main Center Picture With Text (Top Banner)</span>
                        </span>
                        <span className="text-[10px] text-slate-400">Clicking in preview enlarges picture and text</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                            Main Picture
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              ref={mainPicInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={handleMainPicUpload}
                            />
                            <button
                              type="button"
                              disabled={isUploadingMainPic}
                              onClick={() => mainPicInputRef.current?.click()}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors shadow-2xs flex items-center gap-1 disabled:opacity-50"
                            >
                              <span>📁</span>
                              <span>{isUploadingMainPic ? "Uploading..." : "Upload Main Pic"}</span>
                            </button>
                            <input
                              type="text"
                              value={editingProfile.featuredMainPicUrl || ""}
                              onChange={(e) => setEditingProfile({ ...editingProfile, featuredMainPicUrl: e.target.value })}
                              placeholder="Or paste image URL"
                              className="flex-1 px-2 py-1 text-[10px] border border-slate-300 rounded font-mono bg-white"
                            />
                          </div>
                          {editingProfile.featuredMainPicUrl && (
                            <img
                              src={editingProfile.featuredMainPicUrl}
                              alt="Main preview"
                              className="h-20 w-full object-cover rounded-md border border-slate-200 mt-1"
                            />
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                            Main Picture Caption / Text
                          </label>
                          <textarea
                            rows={3}
                            value={editingProfile.featuredMainPicText || ""}
                            onChange={(e) => setEditingProfile({ ...editingProfile, featuredMainPicText: e.target.value })}
                            placeholder="e.g. Next-Generation Industrial Machinery & Enterprise Engineering Solutions..."
                            className="w-full p-2 text-xs border border-slate-300 rounded bg-white text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* PART 3: GALLERY ROWS (MAX 7 PER ROW, CENTER ADJUSTED, ADD/DEL ROWS & IMAGES) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                        <div>
                          <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                            <span>🔲 Multi-Row Image Gallery (Max 7 Images Per Row)</span>
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Aik row mein max 7 images hongi. Agar kam hon gi tou center se adjustment hogi. Rows add aur del ki ja sakti hain.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddGalleryRow}
                          className="px-3 py-1 bg-[#0052FF] hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
                        >
                          <span>➕</span>
                          <span>Add New Row</span>
                        </button>
                      </div>

                      {/* Rows Container */}
                      <div className="space-y-3">
                        {(editingProfile.galleryRows && editingProfile.galleryRows.length > 0
                          ? editingProfile.galleryRows
                          : [
                              {
                                id: "row-1",
                                items: [
                                  { id: "item-1-1", imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop", text: "CNC Miller 5X", title: "CNC Miller 5X High Precision" },
                                  { id: "item-1-2", imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=400&auto=format&fit=crop", text: "Laser Cutter", title: "Fiber Laser Cutting System" },
                                  { id: "item-1-3", imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop", text: "Hydraulic Press", title: "Heavy Duty 200T Hydraulic Press" },
                                  { id: "item-1-4", imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=400&auto=format&fit=crop", text: "Automated Robot", title: "6-Axis Robotic Arm" },
                                  { id: "item-1-5", imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop", text: "Injection Mold", title: "Electric Injection Molding Machine" },
                                  { id: "item-1-6", imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=400&auto=format&fit=crop", text: "Rotary Lathe", title: "Precision Metal Turning Lathe" },
                                  { id: "item-1-7", imageUrl: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=400&auto=format&fit=crop", text: "Quality Scanner", title: "3D Optical CMM Scanner" },
                                ],
                              },
                            ]
                        ).map((row, rIdx) => {
                          const itemsCount = (row.items || []).length;
                          return (
                            <div key={row.id || rIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5">
                              {/* Row Header */}
                              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-800">
                                    Row #{rIdx + 1}
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">
                                    {itemsCount} / 7 Images ({itemsCount < 7 ? "Center Adjusted" : "Full Row"})
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    disabled={itemsCount >= 7}
                                    onClick={() => handleAddItemToRow(row.id)}
                                    className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors disabled:opacity-40"
                                  >
                                    ➕ Add Image ({itemsCount}/7)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteGalleryRow(row.id)}
                                    className="px-2 py-0.5 bg-red-100 hover:bg-red-200 text-red-700 rounded text-[10px] font-bold cursor-pointer transition-colors"
                                  >
                                    🗑️ Delete Row
                                  </button>
                                </div>
                              </div>

                              {/* Items in this row */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                                {(row.items || []).map((it, itIdx) => (
                                  <div
                                    key={it.id || itIdx}
                                    className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs space-y-1.5 flex flex-col justify-between"
                                  >
                                    <div className="w-full h-16 rounded overflow-hidden bg-slate-100 border border-slate-200 relative group">
                                      <img src={it.imageUrl} alt={it.text} className="w-full h-full object-cover" />
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteRowItem(row.id, it.id)}
                                        className="absolute top-1 right-1 w-5 h-5 bg-red-600 hover:bg-red-700 text-white rounded-full text-[10px] flex items-center justify-center cursor-pointer shadow-xs"
                                        title="Delete image"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <input
                                      type="text"
                                      value={it.text}
                                      onChange={(e) => handleUpdateRowItem(row.id, it.id, { text: e.target.value })}
                                      placeholder="Caption"
                                      className="w-full px-1.5 py-0.5 text-[10px] border border-slate-300 rounded font-medium text-slate-800"
                                    />
                                    <input
                                      type="text"
                                      value={it.imageUrl}
                                      onChange={(e) => handleUpdateRowItem(row.id, it.id, { imageUrl: e.target.value })}
                                      placeholder="Img URL"
                                      className="w-full px-1.5 py-0.5 text-[9px] border border-slate-200 rounded font-mono text-slate-500 truncate"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 3: LAYOUT POSITION & ALIGNMENT */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    3. Layout Style, Position &amp; Alignment
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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

                    {/* Media / Video Position (Only for Format 1 Catalog) */}
                    {activeModalFormat === "format-catalog" && (
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                          Catalog Cards Position (Oper, Center, Nechy)
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
                    )}

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

                    {/* Headings & Text Alignment */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Headings &amp; Body Text Alignment
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
                      <div className="flex gap-1.5">
                        {[
                          { id: "dark", label: "⬛ Dark Enterprise" },
                          { id: "light", label: "⬜ Clean Light" },
                          { id: "centered", label: "👑 Centered Brand" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, headerStyle: item.id as any })}
                            className={`flex-1 py-1 px-1 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
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

                {/* SECTION 4: DEFAULT SUBJECT & MESSAGE TEMPLATE */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    4. Default Subject &amp; Message Template
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

              {/* Right Column: Dedicated Real-time Email Preview (6 Cols) */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>👁️ Real-time Email Preview</span>
                    <span className="text-[10px] text-emerald-600 font-medium">● Live</span>
                  </span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {activeModalFormat === "format-executive-signature" ? "Format 2: Sidebar Dashboard" : "Format 1: Catalog Cards"}
                  </span>
                </span>

                {activeModalFormat === "format-executive-signature" ? (
                  <div className="sticky top-1">
                    {renderFormat2Preview(editingProfile, true)}
                  </div>
                ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm sticky top-1">
                  {/* Dynamic Header Style & Alignment */}
                  {(() => {
                    const isLight = editingProfile.headerStyle === "light";
                    const hAlign = editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left");
                    const hBg = isLight ? "#ffffff" : "#090d16";
                    const hText = isLight ? "#090d16" : "#ffffff";
                    const hSubtext = isLight ? "#64748b" : "#94a3b8";
                    const badgeBg = isLight ? "#f1f5f9" : "rgba(255,255,255,0.08)";
                    const badgeText = isLight ? "#475569" : "#cbd5e1";
                    const badgeBorder = isLight ? "#e2e8f0" : "rgba(255,255,255,0.15)";

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
                            {editingProfile.department}
                          </div>
                          <div className="mt-1.5">
                            <span
                              className="px-2 py-0.5 rounded-full text-[9px] font-bold inline-block"
                              style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                            >
                              PREVIEW
                            </span>
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
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                            style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                          >
                            PREVIEW
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-black tracking-wider" style={{ color: hText }}>
                              CREED <span style={{ color: editingProfile.accentColor || "#FF6B00" }}>TECH</span>
                            </div>
                            <div className="text-[9px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                              {editingProfile.department}
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
                            {editingProfile.department}
                          </div>
                        </div>
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                          style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                        >
                          PREVIEW
                        </span>
                      </div>
                    );
                  })()}

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
                        ? editingProfile.defaultSubjectTemplate.replace("{service}", "Enterprise Solutions").replace("{id}", "101")
                        : "Re: Inquiry"}
                    </p>

                    {/* TOP POSITION MEDIA - FORMAT 1 ONLY */}
                    {activeModalFormat === "format-catalog" && editingProfile.mediaPosition === "top" && renderMediaPreview(editingProfile, true)}

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
                        .replace("{client_name}", "Valued Client")
                        .replace("{service}", "Enterprise Solutions")}
                    </div>

                    {/* CENTER POSITION MEDIA - FORMAT 1 ONLY */}
                    {activeModalFormat === "format-catalog" && (editingProfile.mediaPosition || "center") === "center" && renderMediaPreview(editingProfile, true)}

                    {/* FORMAT 1: CLEAN CORPORATE TEXT SIGNOFF */}
                    {activeModalFormat === "format-catalog" && (
                      <div className="mt-4 pt-3 border-t border-gray-200 text-xs">
                        <div className="font-bold text-xs uppercase" style={{ color: editingProfile.textColor || "#1E293B" }}>
                          {editingProfile.name}
                        </div>
                        <div className="text-[10px] font-semibold mt-0.5" style={{ color: editingProfile.accentColor || "#FF6B00" }}>
                          {editingProfile.department}
                        </div>
                        {editingProfile.phone && (
                          <div className="text-[9px] text-gray-500 mt-0.5">
                            <strong>Direct:</strong> {editingProfile.phone}
                          </div>
                        )}
                        <div className="text-[9px] text-gray-500 mt-0.5">
                          <strong>Email:</strong> {editingProfile.email}
                        </div>
                      </div>
                    )}

                    {/* BOTTOM POSITION MEDIA - FORMAT 1 ONLY */}
                    {activeModalFormat === "format-catalog" && editingProfile.mediaPosition === "bottom" && renderMediaPreview(editingProfile, true)}
                  </div>

                  {/* Preview Footer */}
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
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving || isEditingEmailDuplicate || !editingProfile.email || !editingProfile.name}
                onClick={() => handleSaveProfile(editingProfile)}
                className="px-5 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded-md shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : isEditingEmailDuplicate ? "Duplicate Email Detected" : "Save Profile & Design"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Profiles List on Left (5 Cols), Active Profile Preview & Test on Right (7 Cols) */}
      {activeSubTab === "desks" && (
        <div className="space-y-6">
          {/* 5 EMAIL TEMPLATE FORMATS SHOWCASE (VISIBLE IN FRONT / SMNY NAZAR AYE) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block font-outfit flex items-center gap-1.5">
                  <span>🎨 5 Email Template Formats Architecture</span>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                    2 Active Formats • 3 Reserved Slots
                  </span>
                </span>
                <span className="text-[11px] text-slate-500">
                  Har format alag aur independent hai. Select a format card to preview and customize its content:
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {EMAIL_FORMATS_METADATA.map((fmt) => {
                const isFormatActive = activeProfileFormat === fmt.id;
                const isReserved = fmt.status === "RESERVED";

                return (
                  <div
                    key={fmt.id}
                    onClick={() => {
                      if (!isReserved) {
                        const updatedProfile: EmailDepartmentProfile = {
                          ...activeProfile,
                          formatType: fmt.id,
                          ...(fmt.id === "format-executive-signature"
                            ? {
                                sidebarHeading: activeProfile.sidebarHeading || activeProfile.name || "CREED TECH",
                                sidebarLogo: activeProfile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png",
                                sidebarAddress: activeProfile.sidebarAddress || activeProfile.address || "Industrial Area Phase 2, Karachi",
                                sidebarPhone: activeProfile.sidebarPhone || activeProfile.phone || "+92 300 1234567",
                                sidebarSocialLinks:
                                  activeProfile.sidebarSocialLinks && activeProfile.sidebarSocialLinks.length > 0
                                    ? activeProfile.sidebarSocialLinks
                                    : DEFAULT_FORMAT2_SOCIAL_LINKS,
                                featuredMainPicUrl:
                                  activeProfile.featuredMainPicUrl ||
                                  (activeProfile.mediaItems && activeProfile.mediaItems[0]?.mediaUrl) ||
                                  activeProfile.videoThumbnail ||
                                  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                                featuredMainPicText:
                                  activeProfile.featuredMainPicText ||
                                  "Next-Generation Industrial Machinery & Enterprise Engineering Solutions",
                                galleryRows:
                                  activeProfile.galleryRows && activeProfile.galleryRows.length > 0
                                    ? activeProfile.galleryRows
                                    : DEFAULT_FORMAT2_GALLERY_ROWS,
                              }
                            : {}),
                        };

                        const updatedList = profiles.map((p) =>
                          p.id === activeProfile.id ? updatedProfile : p
                        );
                        setProfiles(updatedList);
                        handleSaveProfile(updatedProfile, true, true);
                        if (showToast) showToast(`✓ Switched layout to ${fmt.title}`);
                      }
                    }}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      isReserved
                        ? "bg-slate-50/70 border-dashed border-slate-300 opacity-60 cursor-not-allowed"
                        : isFormatActive
                        ? "bg-blue-50/90 border-[#0052FF] ring-2 ring-blue-400 shadow-xs cursor-pointer"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-base">{fmt.icon}</span>
                        <span
                          className={`text-[8px] font-extrabold uppercase px-1.5 py-0.2 rounded-full ${
                            isReserved
                              ? "bg-slate-200 text-slate-600"
                              : isFormatActive
                              ? "bg-[#0052FF] text-white"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isReserved ? "Reserved Slot" : isFormatActive ? "Selected" : "Live"}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        {fmt.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 leading-snug">
                        {fmt.description}
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] font-semibold text-slate-400">
                        {isReserved ? "Pending design" : fmt.badge}
                      </span>
                      {!isReserved && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const updatedTarget: EmailDepartmentProfile = {
                              ...activeProfile,
                              formatType: fmt.id,
                              ...(fmt.id === "format-executive-signature"
                                ? {
                                    sidebarHeading: activeProfile.sidebarHeading || activeProfile.name || "CREED TECH",
                                    sidebarLogo: activeProfile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png",
                                    sidebarAddress: activeProfile.sidebarAddress || activeProfile.address || "Industrial Area Phase 2, Karachi",
                                    sidebarPhone: activeProfile.sidebarPhone || activeProfile.phone || "+92 300 1234567",
                                    sidebarSocialLinks:
                                      activeProfile.sidebarSocialLinks && activeProfile.sidebarSocialLinks.length > 0
                                        ? activeProfile.sidebarSocialLinks
                                        : DEFAULT_FORMAT2_SOCIAL_LINKS,
                                    featuredMainPicUrl:
                                      activeProfile.featuredMainPicUrl ||
                                      (activeProfile.mediaItems && activeProfile.mediaItems[0]?.mediaUrl) ||
                                      activeProfile.videoThumbnail ||
                                      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                                    featuredMainPicText:
                                      activeProfile.featuredMainPicText ||
                                      "Next-Generation Industrial Machinery & Enterprise Engineering Solutions",
                                    galleryRows:
                                      activeProfile.galleryRows && activeProfile.galleryRows.length > 0
                                        ? activeProfile.galleryRows
                                        : DEFAULT_FORMAT2_GALLERY_ROWS,
                                  }
                                : {}),
                            };
                            setEditingProfile(updatedTarget);
                          }}
                          className="text-[9px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                        >
                          Design ↗
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Side: Profiles Cards (5 Cols) */}
            <div className="md:col-span-5 flex flex-col gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-outfit">
            Active Email Profiles ({profiles.length})
          </div>

          <div className="flex flex-col gap-3">
            {profiles.map((p) => {
              const isSelected = p.id === selectedProfileId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProfileId(p.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-[#0F172A] border-orange-300 shadow-[0_4px_16px_rgba(255,107,0,0.15)] ring-1 ring-[#FF6B00]"
                      : "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-orange-200 hover:shadow-xs shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0"
                        style={{ backgroundColor: p.accentColor }}
                      >
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#0F172A] font-outfit">
                            {p.name}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-semibold text-white"
                            style={{ backgroundColor: p.accentColor }}
                          >
                            {p.department}
                          </span>
                        </div>
                        <div className="font-mono text-xs mt-0.5 text-slate-500">
                          {p.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setEditingProfile(p)}
                        className="px-2.5 py-1 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 border border-[#E2E8F0] rounded-xl font-semibold text-xs cursor-pointer shadow-xs transition-colors"
                        title="Edit design format, images & address"
                      >
                        ✏️ Edit
                      </button>
                      {profiles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteProfile(p.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-semibold text-xs cursor-pointer transition-colors"
                          title="Delete profile"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#E2E8F0] text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{p.phone || "No direct phone"}</span>
                    <span>
                      {p.videoThumbnail || p.videoUrl
                        ? p.mediaType === "image"
                          ? "🖼️ Picture Offer"
                          : "🎬 Video Demo"
                        : "No Media"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Profile Detailed View & Test (7 Cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 font-outfit">
              <span>Live Preview &amp; Actions for:</span>
              <strong className="text-[#0F172A] normal-case font-bold">{activeProfile.name}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingProfile(activeProfile)}
                className="px-3.5 py-1.5 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_2px_10px_rgba(255,107,0,0.25)] active:scale-95"
              >
                <span>✏️</span>
                <span>Edit Format &amp; Design</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopyStyledHtml(activeProfile)}
                className="px-3.5 py-1.5 bg-[#F1F3F5] hover:bg-[#EBECEF] text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 border border-[#E2E8F0] shadow-xs"
              >
                <span>📋</span>
                <span>Copy Styled Format</span>
              </button>
            </div>
          </div>

          {/* Real-time Email Render Box */}
          {activeProfileFormat === "format-executive-signature" ? (
            renderFormat2Preview(activeProfile, false)
          ) : (
          <div className="bg-white rounded-xl border border-gray-300 shadow-xl overflow-hidden text-left">
            {/* Branded Header */}
            {(() => {
              const isLight = activeProfile.headerStyle === "light";
              const hAlign = activeProfile.headerAlignment || (activeProfile.headerStyle === "centered" ? "center" : "left");
              const hBg = isLight ? "#ffffff" : "#090d16";
              const hText = isLight ? "#090d16" : "#ffffff";
              const hSubtext = isLight ? "#64748b" : "#94a3b8";
              const badgeBg = isLight ? "#f1f5f9" : "rgba(255,255,255,0.08)";
              const badgeText = isLight ? "#475569" : "#cbd5e1";
              const badgeBorder = isLight ? "#e2e8f0" : "rgba(255,255,255,0.15)";

              if (hAlign === "center") {
                return (
                  <div
                    className="p-5 text-center"
                    style={{
                      backgroundColor: hBg,
                      borderBottom: `3px solid ${activeProfile.accentColor || "#FF6B00"}`,
                    }}
                  >
                    <div className="text-xl font-black tracking-wider" style={{ color: hText }}>
                      CREED <span style={{ color: activeProfile.accentColor || "#FF6B00" }}>TECH</span>
                    </div>
                    <div className="text-xs uppercase tracking-widest font-semibold mt-1" style={{ color: hSubtext }}>
                      {activeProfile.department}
                    </div>
                    <div className="mt-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold inline-block"
                        style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                      >
                        VERIFIED DESK
                      </span>
                    </div>
                  </div>
                );
              }

              if (hAlign === "right") {
                return (
                  <div
                    className="p-5 flex items-center justify-between"
                    style={{
                      backgroundColor: hBg,
                      borderBottom: `3px solid ${activeProfile.accentColor || "#FF6B00"}`,
                    }}
                  >
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                    >
                      VERIFIED DESK
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-black tracking-wider" style={{ color: hText }}>
                        CREED <span style={{ color: activeProfile.accentColor || "#FF6B00" }}>TECH</span>
                      </div>
                      <div className="text-xs uppercase tracking-widest font-semibold mt-1" style={{ color: hSubtext }}>
                        {activeProfile.department}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  className="p-5 flex items-center justify-between"
                  style={{
                    backgroundColor: hBg,
                    borderBottom: `3px solid ${activeProfile.accentColor || "#FF6B00"}`,
                  }}
                >
                  <div className="text-left">
                    <div className="text-lg font-black tracking-wider" style={{ color: hText }}>
                      CREED <span style={{ color: activeProfile.accentColor || "#FF6B00" }}>TECH</span>
                    </div>
                    <div className="text-xs uppercase tracking-widest font-semibold mt-1" style={{ color: hSubtext }}>
                      {activeProfile.department}
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                  >
                    VERIFIED DESK
                  </span>
                </div>
              );
            })()}

            {/* Email Body Content */}
            <div
              className={`p-6 text-sm leading-relaxed transition-colors ${
                activeProfile.contentAlignment === "center"
                  ? "text-center"
                  : activeProfile.contentAlignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
              style={{
                backgroundColor: activeProfile.backgroundColor || "#FFFFFF",
                color: activeProfile.textColor || "#1E293B",
              }}
            >
              <p
                className="font-bold mb-2"
                style={{ color: activeProfile.textColor || "#1E293B" }}
              >
                {activeProfile.defaultSubjectTemplate
                  ? activeProfile.defaultSubjectTemplate.replace("{service}", "Enterprise Solutions").replace("{id}", "101")
                  : "Re: Inquiry"}
              </p>

              {/* TOP POSITION MEDIA - FORMAT 1 ONLY */}
              {activeProfileFormat === "format-catalog" && activeProfile.mediaPosition === "top" && renderMediaPreview(activeProfile, false)}

              <div
                className="whitespace-pre-wrap font-sans text-xs leading-relaxed p-3 rounded border"
                style={{
                  color: activeProfile.textColor || "#1E293B",
                  backgroundColor: (activeProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (activeProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                  borderColor: (activeProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (activeProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.08)",
                }}
              >
                {(activeProfile.defaultMessageTemplate || "Hello Client,\n\nThank you for reaching out.")
                  .replace("{client_name}", "Valued Enterprise Client")
                  .replace("{service}", "Cloud Architecture & High-Reliability Engineering")
                  .replace("{id}", "101")}
              </div>

              {/* CENTER POSITION MEDIA - FORMAT 1 ONLY */}
              {activeProfileFormat === "format-catalog" && (activeProfile.mediaPosition || "center") === "center" && renderMediaPreview(activeProfile, false)}

              {/* FORMAT 1: CLEAN CORPORATE SIGN-OFF */}
              {activeProfileFormat === "format-catalog" && (
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs">
                  <div className="font-bold text-sm" style={{ color: activeProfile.textColor || "#1E293B" }}>{activeProfile.name}</div>
                  <div className="text-gray-600 font-medium mt-0.5">
                    <span style={{ color: activeProfile.accentColor }}>{activeProfile.email}</span>
                    {activeProfile.phone && ` • Tel: ${activeProfile.phone}`}
                  </div>
                  <div className="text-gray-400 text-[11px] mt-0.5">
                    {activeProfile.department}
                  </div>
                </div>
              )}

              {/* BOTTOM POSITION MEDIA - FORMAT 1 ONLY */}
              {activeProfileFormat === "format-catalog" && activeProfile.mediaPosition === "bottom" && renderMediaPreview(activeProfile, false)}
            </div>

            {/* Footer */}
            <div
              className={`bg-gray-50 p-4 border-t border-gray-200 text-xs text-gray-500 leading-relaxed ${
                activeProfile.contentAlignment === "center"
                  ? "text-center"
                  : activeProfile.contentAlignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {activeProfile.address && (
                <div className="mb-1">
                  <strong>Headquarters:</strong> {activeProfile.address}
                </div>
              )}
              <div>
                <strong>Web:</strong> https://creed-tech.com • <strong>Desk:</strong> {activeProfile.email}
              </div>
              {activeProfile.footerDisclaimer && (
                <div className="mt-2 pt-2 border-t border-gray-200 text-[10px] text-gray-400">
                  {activeProfile.footerDisclaimer}
                </div>
              )}
            </div>
          </div>
          )}

          {/* Test Email Broadcast Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs">
            <span className="text-xs font-bold text-[#0F172A] block mb-2">
              🧪 Test Live Email Delivery for {activeProfile.name}
            </span>
            <div className="flex gap-2">
              <input
                type="email"
                value={testEmailRecipient}
                onChange={(e) => setTestEmailRecipient(e.target.value)}
                placeholder="Enter recipient email (e.g. your-email@gmail.com)"
                className="flex-1 px-3 py-1.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-slate-400 outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
              <button
                type="button"
                disabled={isSendingTest}
                onClick={handleSendTestEmail}
                className="px-4 py-1.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-[0_2px_8px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,0,0.35)] disabled:opacity-50 shrink-0"
              >
                {isSendingTest ? "Sending..." : "Send Test Email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}

      {/* INQUIRIES SUB-TAB */}
      {activeSubTab === "inquiries" && (
        <div className="space-y-4">
          {/* Controls Bar: Search & Status Filters */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
                🔍
              </span>
              <input
                type="text"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search by client name, email, company, service, message, or ID..."
                className="w-full pl-8 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
              {inquirySearch && (
                <button
                  type="button"
                  onClick={() => setInquirySearch("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-[#F1F3F5] p-0.5 rounded-lg border border-[#E2E8F0] text-xs">
                <button
                  type="button"
                  onClick={() => setInquiryFilter("ALL")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                    inquiryFilter === "ALL"
                      ? "bg-[#FF6B00] text-white shadow-xs"
                      : "text-slate-600 hover:text-[#0F172A]"
                  }`}
                >
                  All ({inquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter("NEW")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inquiryFilter === "NEW"
                      ? "bg-amber-500 text-white font-bold shadow-xs"
                      : "text-slate-600 hover:text-[#0F172A]"
                  }`}
                >
                  <span>Pending / New</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white">
                    {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter("RESPONDED")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                    inquiryFilter === "RESPONDED"
                      ? "bg-emerald-600 text-white font-bold shadow-xs"
                      : "text-slate-600 hover:text-[#0F172A]"
                  }`}
                >
                  Responded ({inquiries.filter((i) => i.status === "RESPONDED" || i.status === "RESOLVED").length})
                </button>
              </div>

              <button
                type="button"
                onClick={() => fetchInquiries()}
                className="px-3 py-1.5 bg-[#F1F3F5] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-slate-700 hover:text-[#0F172A] rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5"
                title="Refresh inquiries"
              >
                <span>🔄</span>
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Inquiries Content Area */}
          {isLoadingInquiries ? (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center text-slate-500 shadow-xs">
              <div className="inline-block w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin mb-3" />
              <div className="text-xs font-semibold">Loading client inquiries...</div>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center shadow-xs">
              <div className="text-4xl mb-3">📬</div>
              <h4 className="text-base font-bold text-[#0F172A] mb-1">No Inquiries Found</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                {inquirySearch || inquiryFilter !== "ALL"
                  ? "No client inquiries match the current search keyword or status filter."
                  : "No client inquiries have been submitted yet. Once visitors submit the contact form, their inquiries will appear here ready for branded reply."}
              </p>
              {(inquirySearch || inquiryFilter !== "ALL") && (
                <button
                  type="button"
                  onClick={() => {
                    setInquirySearch("");
                    setInquiryFilter("ALL");
                  }}
                  className="px-4 py-1.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  Reset Filter &amp; View All
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredInquiries.map((inq) => {
                const isPending = inq.status === "NEW" || inq.status === "PENDING";
                const isResponded = inq.status === "RESPONDED";
                const isResolved = inq.status === "RESOLVED";

                return (
                  <div
                    key={inq.id}
                    className={`bg-white border rounded-xl p-4 transition-all hover:border-[#CBD5E1] shadow-xs ${
                      isPending
                        ? "border-amber-300 ring-1 ring-amber-400/20 bg-gradient-to-r from-white to-amber-50/30"
                        : "border-[#E2E8F0]"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Status Badge */}
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${
                            isPending
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : isResponded
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : isResolved
                              ? "bg-indigo-100 text-indigo-800 border border-indigo-300"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {isPending && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />}
                          <span>{inq.status || "NEW"}</span>
                        </span>

                        {/* Reference Badge */}
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F8FAFC] border border-[#E2E8F0] text-slate-700">
                          REF #{inq.id}
                        </span>

                        {/* Service Tag */}
                        {inq.service && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-50 text-[#FF6B00] border border-orange-200">
                            {inq.service}
                          </span>
                        )}

                        <span className="text-[11px] text-slate-500">
                          {inq.created_at ? new Date(inq.created_at).toLocaleString() : "Recently"}
                        </span>
                      </div>

                      {/* Primary Reply Button */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiryForReply(inq)}
                          className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_2px_8px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,0,0.35)]"
                          title="Open Branded Email Reply Composer"
                        >
                          <span>💬</span>
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>

                    {/* Inquiry Body & Client Details */}
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                      <div className="md:col-span-4 space-y-1">
                        <div className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                          <span>{inq.client_name || "Anonymous Client"}</span>
                          {inq.company && (
                            <span className="text-xs font-normal text-slate-500">
                              • {inq.company}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-[#FF6B00]">
                          <a href={`mailto:${inq.email}`} className="hover:underline">
                            {inq.email}
                          </a>
                        </div>
                        {inq.phone && (
                          <div className="text-xs text-slate-500 font-mono">
                            ☎ {inq.phone}
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-8">
                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap max-h-36 overflow-y-auto">
                          {inq.project_details || (
                            <span className="text-slate-400 italic">No message provided.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SMTP SERVER SETTINGS SUB-TAB */}
      {activeSubTab === "smtp" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 text-[#0F172A] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] m-0 flex items-center gap-2">
                  <span>⚙️</span>
                  <span>Outgoing SMTP Mail Server Configuration</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure real mail delivery credentials for enterprise broadcast and automated branded client replies.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    isSmtpConfigured
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSmtpConfigured ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                    }`}
                  />
                  <span>{isSmtpConfigured ? "Active & Configured" : "Local Mode (No SMTP)"}</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveSmtp} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SMTP Host (Mail Server)
                  </label>
                  <input
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="e.g. smtp.gmail.com or mail.creed-tech.com"
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Use <strong className="text-slate-700">smtp.gmail.com</strong> for Google Workspace or personal Gmail.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SMTP Port &amp; Encryption
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(Number(e.target.value))}
                      placeholder="465 or 587"
                      className="w-28 px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                    />
                    <label className="flex items-center gap-2 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-slate-700 cursor-pointer select-none flex-1">
                      <input
                        type="checkbox"
                        checked={smtpSecure}
                        onChange={(e) => setSmtpSecure(e.target.checked)}
                        className="rounded text-[#FF6B00] focus:ring-[#FF6B00]"
                      />
                      <span>SSL / TLS (Port 465)</span>
                    </label>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Port 465 requires SSL enabled; Port 587 uses STARTTLS (uncheck SSL).
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SMTP Username / Email
                  </label>
                  <input
                    type="text"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    placeholder="your-account@gmail.com"
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SMTP Password / App Password
                  </label>
                  <input
                    type="password"
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    placeholder="16-character Google App Password or SMTP key"
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    For Gmail, generate an <strong className="text-slate-700">App Password</strong> in Google Account &gt; Security.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Default &quot;From&quot; Sender Name
                  </label>
                  <input
                    type="text"
                    value={smtpFromName}
                    onChange={(e) => setSmtpFromName(e.target.value)}
                    placeholder="e.g. Creed Tech Executive Desk"
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Default &quot;From&quot; Sender Email Address
                  </label>
                  <input
                    type="email"
                    value={smtpFromEmail}
                    onChange={(e) => setSmtpFromEmail(e.target.value)}
                    placeholder="contact@creed-tech.com or your-verified-sender@domain.com"
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-3 flex-wrap">
                <div className="text-xs text-slate-500">
                  {isSmtpConfigured
                    ? "✓ SMTP credentials are valid and active."
                    : "ℹ Enter valid credentials to send emails without local simulation."}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isTestingSmtp}
                    onClick={handleTestSmtp}
                    className="px-4 py-2 bg-[#F1F3F5] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-slate-700 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>⚡</span>
                    <span>{isTestingSmtp ? "Testing..." : "Test Connection"}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSavingSmtp}
                    className="px-5 py-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_2px_8px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,0,0.35)] disabled:opacity-50"
                  >
                    <span>💾</span>
                    <span>{isSavingSmtp ? "Saving..." : "Save SMTP Settings"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Guide Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 text-[#0F172A] shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <span>💡</span>
              <span>Quick Guide: Configuring Gmail / Google Workspace</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
                <strong className="text-[#0F172A] block mb-1">1. Enable 2-Step Verification</strong>
                Go to your Google Account &gt; Security, and turn on 2-Step Verification if it is not already enabled.
              </div>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
                <strong className="text-[#0F172A] block mb-1">2. Generate App Password</strong>
                Search for &quot;App Passwords&quot; in Google Account settings. Select App: Mail, Device: Other, and click Generate.
              </div>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
                <strong className="text-[#0F172A] block mb-1">3. Enter 16-Character Key</strong>
                Paste the generated 16-character code directly into the SMTP Password field above with Port 465 (SSL checked).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPLY MODAL: FULL BRANDED EMAIL COMPOSER */}
      {selectedInquiryForReply && (
        <InquiryDetailsModal
          inquiry={selectedInquiryForReply}
          onClose={() => setSelectedInquiryForReply(null)}
          initialMode="reply"
          onInquiryUpdated={() => {
            fetchInquiries();
            if (showToast) showToast("✓ Inquiry reply updated successfully!");
          }}
          showToast={showToast}
        />
      )}

      {/* Equipment Offer Details Modal Popup */}
      <EquipmentOfferDetailModal
        isOpen={Boolean(previewDetailItem)}
        onClose={() => setPreviewDetailItem(null)}
        item={previewDetailItem}
        profile={editingProfile}
      />

      {/* FORMAT 2 ENLARGED MEDIA POPUP MODAL ("img py click pop menu open ho ga or img or txt bra ho jy ga") */}
      {enlargedMediaPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setEnlargedMediaPopup(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/70">
              <div className="flex items-center gap-2">
                <span className="text-base">🖼️</span>
                <span className="text-sm font-bold text-white truncate">
                  {enlargedMediaPopup.title || enlargedMediaPopup.text || "Enlarged Image & Details"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEnlargedMediaPopup(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Enlarged Image Display */}
            <div className="bg-black flex items-center justify-center max-h-[60vh] p-2 overflow-hidden">
              <img
                src={enlargedMediaPopup.imageUrl}
                alt={enlargedMediaPopup.title || "Enlarged view"}
                className="max-h-[58vh] max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Enlarged Text Display */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              {enlargedMediaPopup.title && (
                <h3 className="text-base font-bold text-white mb-1">
                  {enlargedMediaPopup.title}
                </h3>
              )}
              {enlargedMediaPopup.text && (
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {enlargedMediaPopup.text}
                </p>
              )}
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setEnlargedMediaPopup(null)}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
