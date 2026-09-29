"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
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

const DEFAULT_IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%230f172a' width='400' height='300'/%3E%3Cpath fill='%23334155' d='M160 120a20 20 0 1 1-40 0 20 20 0 0 1 40 0zm-80 90l60-80 50 60 40-50 70 70H80z'/%3E%3Ctext x='50%25' y='82%25' font-family='system-ui,sans-serif' font-weight='bold' font-size='13' fill='%2394a3b8' text-anchor='middle'%3ECREED TECH%3C/text%3E%3C/svg%3E";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (enlargedMediaPopup) {
          setEnlargedMediaPopup(null);
        } else if (previewDetailItem) {
          setPreviewDetailItem(null);
        } else if (editingProfile) {
          setEditingProfile(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedMediaPopup, previewDetailItem, editingProfile]);

  // Format 2: Multi-Picture & Same/Different Content States
  const [format2ContentMode, setFormat2ContentMode] = useState<"separate" | "same">("separate");
  const [format2MasterText, setFormat2MasterText] = useState("");
  const [isUploadingFormat2Gallery, setIsUploadingFormat2Gallery] = useState(false);
  const [uploadingFormat2RowItem, setUploadingFormat2RowItem] = useState<{ rowId: string; itemId: string } | null>(null);
  const format2MultiFileInputRef = useRef<HTMLInputElement>(null);
  const format2SingleItemFileInputRef = useRef<HTMLInputElement>(null);

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

    // If updating text and in 'same' mode, sync to all items
    if (updates.text !== undefined && format2ContentMode === "same") {
      setFormat2MasterText(updates.text);
      setEditingProfile({
        ...editingProfile,
        galleryRows: currentRows.map((r) => ({
          ...r,
          items: r.items.map((it) => ({ ...it, text: updates.text! })),
        })),
      });
      return;
    }

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

  // Format 2: Batch upload multi-pictures from computer
  const handleFormat2BatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0 || !editingProfile) return;
    const files = Array.from(fileList);

    try {
      setIsUploadingFormat2Gallery(true);
      if (showToast) showToast(`Uploading ${files.length} pictures concurrently from computer for gallery...`);
      const results = await uploadMultipleMediaFiles(files, adminFetch);
      if (results && results.length > 0) {
        let currentRows = editingProfile.galleryRows && editingProfile.galleryRows.length > 0
          ? [...editingProfile.galleryRows]
          : [];

        // If currently only default unsplash placeholder, replace it cleanly
        const isPlaceholderOnly =
          currentRows.length === 1 &&
          currentRows[0].items.length > 0 &&
          currentRows[0].items[0].imageUrl.includes("photo-1581092160607");
        if (isPlaceholderOnly) {
          currentRows = [];
        }

        const newItems: GalleryRowItem[] = results.map((res, i) => {
          const rawName = (res.filename || `Item #${i + 1}`)
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]+/g, " ");
          const cleanTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);
          return {
            id: `item-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
            imageUrl: res.url,
            text:
              format2ContentMode === "same" && format2MasterText.trim()
                ? format2MasterText.trim()
                : cleanTitle,
            title: cleanTitle,
          };
        });

        // Combine existing items + new items, and chunk into rows of max 7
        const allItems = currentRows.flatMap((r) => r.items).concat(newItems);
        const newRows: GalleryRow[] = [];
        for (let i = 0; i < allItems.length; i += 7) {
          const chunk = allItems.slice(i, i + 7);
          newRows.push({
            id: `row-${Math.floor(i / 7) + 1}-${Date.now()}`,
            items: chunk,
          });
        }

        setEditingProfile({
          ...editingProfile,
          galleryRows: newRows,
        });

        if (showToast) {
          showToast(
            `✓ Successfully uploaded ${results.length} pictures! Distributed across ${newRows.length} row(s) (max 7 per row).`
          );
        }
      }
    } catch (err: any) {
      if (showToast) showToast(`Batch upload failed: ${err.message}`, "error");
    } finally {
      setIsUploadingFormat2Gallery(false);
      if (format2MultiFileInputRef.current) format2MultiFileInputRef.current.value = "";
    }
  };

  // Format 2: Single item picture change / upload from computer
  const handleFormat2SingleItemUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProfile || !uploadingFormat2RowItem) return;

    try {
      setIsUploadingFormat2Gallery(true);
      const res = await uploadMediaFile(file, adminFetch);
      if (res && res.url) {
        const { rowId, itemId } = uploadingFormat2RowItem;
        handleUpdateRowItem(rowId, itemId, { imageUrl: res.url });
        if (showToast) showToast("✓ Picture updated for this card!");
      }
    } catch (err: any) {
      if (showToast) showToast(`Failed to upload picture: ${err.message}`, "error");
    } finally {
      setIsUploadingFormat2Gallery(false);
      setUploadingFormat2RowItem(null);
      if (format2SingleItemFileInputRef.current) format2SingleItemFileInputRef.current.value = "";
    }
  };

  // Format 2: Apply same text to all cards
  const handleApplyFormat2TextToAll = (overrideText?: string) => {
    if (!editingProfile) return;
    const currentRows = editingProfile.galleryRows || [];
    const firstItem = currentRows[0]?.items[0];
    const targetText = overrideText !== undefined ? overrideText : (firstItem?.text || "");

    const updatedRows = currentRows.map((r) => ({
      ...r,
      items: r.items.map((it) => ({ ...it, text: targetText })),
    }));

    setEditingProfile({
      ...editingProfile,
      galleryRows: updatedRows,
    });
    setFormat2MasterText(targetText);
    if (showToast) showToast(`✓ Synced text "${targetText}" across all gallery cards!`);
  };

  // Format 2: Master text change
  const handleFormat2MasterTextChange = (newText: string) => {
    setFormat2MasterText(newText);
    if (format2ContentMode === "same" && editingProfile) {
      const currentRows = editingProfile.galleryRows || [];
      const updatedRows = currentRows.map((r) => ({
        ...r,
        items: r.items.map((it) => ({ ...it, text: newText })),
      }));
      setEditingProfile({
        ...editingProfile,
        galleryRows: updatedRows,
      });
    }
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

    const sampleMessage = profile.defaultMessageTemplate || 
`Dear Client,

Thank you for reaching out to Creed Tech regarding your enterprise engineering inquiry. We have received your technical specifications and our team is prepared to present an architectural roadmap tailored to your workload.

Please let us know your preferred availability for a technical discovery call this week.

Best regards,
${profile.name || "Executive Management Desk"}`;

    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md flex flex-col text-slate-800 my-3 divide-y divide-slate-200">
        {/* 1. TOP EMAIL MESSAGE SECTION (ALAG SE UPAR) */}
        <div className="p-3.5 sm:p-4 bg-white">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
              <span>✉️</span>
              <span>Email Message (Body Text Above Format 2)</span>
            </span>
            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Message Content
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900 mb-1.5" style={{ color: profile.textColor || "#0f172a" }}>
            Re: Enterprise Consultation &amp; Technical Scope
          </div>
          <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line font-sans">
            {sampleMessage}
          </div>
        </div>

        {/* 2. FORMAT 2: EXECUTIVE SIGNATURE & PRODUCT SHOWCASE CARD (NEECHE) */}
        <div className="flex flex-col md:flex-row">
          {/* LEFT SIDEBAR BAR */}
          <div className={`${isSmall ? "w-full md:w-44" : "w-full md:w-56"} bg-[#0B1120] text-white p-3 flex flex-col justify-between shrink-0 border-r border-slate-800`}>
          {/* Upper: Logo & Heading */}
          <div className="text-center pb-3 border-b border-white/10">
            {logo ? (
              <img
                src={logo}
                alt={heading}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                className="max-h-10 max-w-[120px] object-contain mx-auto mb-1.5"
              />
            ) : null}
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
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                  }}
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
                                alt={it.text || `Item ${itIdx + 1}`}
                                onError={(e) => {
                                  const t = e.currentTarget;
                                  if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                                }}
                                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 flex items-center justify-center transition-colors">
                                <span className="opacity-0 group-hover/card:opacity-100 text-white text-xs">🔍</span>
                              </div>
                            </div>
                            <div className="text-[8px] font-bold text-slate-700 leading-tight mt-1 line-clamp-2 group-hover/card:text-blue-600 transition-colors break-words">
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
    </div>
  );
};

  const renderFormat3Preview = (profile: EmailDepartmentProfile, isSmall = false, customMessage?: string) => {
    const accent = profile.accentColor || "#5c95a2";
    const textColor = profile.textColor || "#1e293b";
    const bgColor = profile.backgroundColor || "#ffffff";
    const heading = profile.name || "CREED TECH";

    const items: EmailMediaItem[] = getEditingMediaItems(profile);
    const heroItem = items[0];
    const secondaryItem = items[1];
    const extraItems = items.slice(2);

    const topHeroStagingImage =
      profile.featuredMainPicUrl ||
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop";

    const productCutoutImage =
      heroItem?.thumbnailUrl ||
      heroItem?.mediaUrl ||
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop";

    const productStagingImage =
      secondaryItem?.thumbnailUrl ||
      secondaryItem?.mediaUrl ||
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop";

    const panoramicStagingImage =
      extraItems[0]?.thumbnailUrl ||
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop";

    const fbUrl =
      profile.sidebarSocialLinks?.find((s) => s.platform === "facebook")?.url ||
      "https://facebook.com/creedtechnology";
    const liUrl =
      profile.sidebarSocialLinks?.find((s) => s.platform === "linkedin")?.url ||
      "https://linkedin.com/company/creedtech";
    const waUrl =
      profile.sidebarSocialLinks?.find((s) => s.platform === "whatsapp")?.url ||
      (profile.phone
        ? `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`
        : "https://wa.me/923219204488");
    const igUrl =
      profile.sidebarSocialLinks?.find((s) => s.platform === "instagram")?.url ||
      "https://instagram.com/creed.technologiess";

    const sampleMessage =
      customMessage ||
      profile.defaultMessageTemplate ||
`Dear Client,

Thank you for reaching out to Creed Tech regarding your enterprise machinery and workspace specifications. We have received your project details and our team is prepared to present verified solutions matching your exact parameters.

Please review our featured studio collection below and let us know your team's availability for a technical discovery consultation.

Best regards,
${profile.name || "Executive Design & Operations Desk"}`;

    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md flex flex-col text-slate-800 my-3">
        {/* 1. TOP EMAIL MESSAGE SECTION (SB SY OPER - ALAG SE) */}
        <div className="p-4 sm:p-5 bg-white border-b-2 border-dashed border-slate-200">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
              <span>✉️</span>
              <span>Direct Email Message (Above Template)</span>
            </span>
            <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Priority Dispatch
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900 mb-1.5 font-outfit" style={{ color: textColor }}>
            {profile.defaultSubjectTemplate?.replace("{service}", "Executive Studio Collection")?.replace("{id}", "308") || "Re: Technical Discovery & Architecture Showcase"}
          </div>
          <div className="text-[11.5px] text-slate-600 leading-relaxed whitespace-pre-line font-sans">
            {sampleMessage}
          </div>
        </div>

        {/* 2. SECTION 1: HERO BANNER (SOFT TEAL STUDIO SCENE) */}
        <div className="bg-gradient-to-b from-[#6c9fa9] to-[#5a909d] p-5 sm:p-7 text-center text-white">
          <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/80 mb-2">
            {profile.department || "CREED TECH ENTERPRISE STUDIO"}
          </div>
          <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight text-white mb-2.5 max-w-md mx-auto">
            {heroItem?.title || "Ac's office dits book I love To lijch"}
          </h3>
          <p className="text-[11.5px] text-white/90 leading-relaxed max-w-sm mx-auto mb-4 font-sans">
            {profile.defaultMessageTemplate ? profile.defaultMessageTemplate.slice(0, 120) + "..." : "Refined architectural aesthetics and certified high-durability performance engineered for enterprise environments."}
          </p>
          <div className="mb-4">
            <button
              type="button"
              className="bg-[#1a2a32] hover:bg-slate-900 text-white font-bold text-[11px] px-6 py-2 rounded-full tracking-wide shadow-md transition-all cursor-pointer"
            >
              Discover Series
            </button>
          </div>

          {/* Staging Photo */}
          <div
            onClick={() =>
              setEnlargedMediaPopup({
                imageUrl: topHeroStagingImage,
                title: heroItem?.title || "Studio Scene",
                text: "Refined Scandinavian Studio Staging & Architectural Composition",
              })
            }
            className="rounded-xl overflow-hidden shadow-lg border border-white/20 relative group cursor-pointer"
            title="Click to Enlarge Visual"
          >
            <img
              src={topHeroStagingImage}
              alt="Studio Staging"
              onError={(e) => {
                const t = e.currentTarget;
                if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
              }}
              className="w-full h-44 sm:h-56 object-cover group-hover:scale-103 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>🔍</span>
              <span>Enlarge</span>
            </div>
          </div>
        </div>

        {/* 3. SECTION 2: SPLIT FEATURE 1 (WHITE BG: TEXT LEFT, PRODUCT RIGHT) */}
        <div className="p-5 sm:p-7 bg-white">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-full sm:w-1/2 text-left">
              <h4 className="font-serif text-base sm:text-xl font-bold text-[#1a2a32] leading-snug mb-2">
                {heroItem?.title || "Get out arows well styler it pieces."}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                {heroItem?.specs || heroItem?.details || "Masterfully designed with precision contours, verified load endurance, and minimalist elegance suited for high-tier operations."}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-[#1a2a32] hover:bg-slate-900 text-white font-bold text-[10px] px-5 py-2 rounded-full tracking-wide shadow-xs cursor-pointer"
                >
                  View Unit
                </button>
                <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                  <span className="text-amber-500">◆</span> Verified
                </span>
              </div>
            </div>

            <div
              onClick={() =>
                setEnlargedMediaPopup({
                  imageUrl: productCutoutImage,
                  title: heroItem?.title || "Product Cutout",
                  text: heroItem?.specs || "",
                })
              }
              className="w-full sm:w-1/2 h-36 sm:h-44 flex items-center justify-center relative group cursor-pointer p-2"
              title="Click to Enlarge Picture"
            >
              <img
                src={productCutoutImage}
                alt="Product 1"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                }}
                className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">
                <span>🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SECTION 3: SPLIT FEATURE 2 (ZIG-ZAG FLIPPED: PRODUCT LEFT ON TEAL BACKDROP, TEXT RIGHT) */}
        <div className="p-5 sm:p-7 bg-white border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div
              onClick={() =>
                setEnlargedMediaPopup({
                  imageUrl: productStagingImage,
                  title: secondaryItem?.title || "Product Staging",
                  text: secondaryItem?.specs || "",
                })
              }
              className="w-full sm:w-1/2 h-36 sm:h-44 rounded-xl overflow-hidden shadow-md relative group cursor-pointer"
              title="Click to Enlarge Picture"
            >
              <img
                src={productStagingImage}
                alt="Product 2"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">
                <span>🔍</span>
              </div>
            </div>

            <div className="w-full sm:w-1/2 text-left">
              <div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                MODERN COLLECTION
              </div>
              <h4 className="font-serif text-base sm:text-xl font-bold text-[#1a2a32] leading-snug mb-2">
                {secondaryItem?.title || "Peluct oend now"}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                {secondaryItem?.specs || secondaryItem?.details || "Tailored ergonomic contours engineered with premium-grade alloy finish for seamless performance in mission-critical facilities."}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-[#1a2a32] hover:bg-slate-900 text-white font-bold text-[10px] px-5 py-2 rounded-full tracking-wide shadow-xs cursor-pointer"
                >
                  See Specs
                </button>
                <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                  <span className="text-emerald-500">●</span> Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. SECTION 4: PANORAMIC BOTTOM SHOWCASE BANNER */}
        <div className="bg-gradient-to-b from-[#6c9fa9] to-[#5a909d] p-5 sm:p-7 text-center text-white">
          <h4 className="font-serif text-base sm:text-xl font-bold text-white mb-2 max-w-sm mx-auto leading-tight">
            {profile.signatureTagline || "Premium Engineering Solutions For Modern High-Performance Workspaces"}
          </h4>
          <p className="text-[11px] text-white/90 mb-3.5 max-w-xs mx-auto">
            Direct enterprise inventory verified under ISO 9001 and strict operational benchmarks.
          </p>
          <div className="mb-4">
            <button
              type="button"
              className="bg-white hover:bg-slate-100 text-[#1a2a32] font-extrabold text-[10.5px] px-6 py-2 rounded-full tracking-wide shadow-md transition-all cursor-pointer"
            >
              Explore All Units →
            </button>
          </div>

          {/* Panoramic Strip */}
          <div
            onClick={() =>
              setEnlargedMediaPopup({
                imageUrl: panoramicStagingImage,
                title: "Panoramic Collection",
                text: "Complete Architecture & Equipment Staging",
              })
            }
            className="rounded-xl overflow-hidden shadow-lg border border-white/20 relative group cursor-pointer"
          >
            <img
              src={panoramicStagingImage}
              alt="Panoramic Collection"
              onError={(e) => {
                const t = e.currentTarget;
                if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
              }}
              className="w-full h-32 sm:h-44 object-cover group-hover:scale-103 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>🔍</span>
            </div>
          </div>
        </div>

        {/* 6. SECTION 5: 4-COLUMN EDITORIAL FOOTER (MATCHING REFERENCE) */}
        <div className="bg-white p-5 sm:p-6 border-t border-slate-200 text-left">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="font-serif font-bold text-xs text-[#1a2a32] mb-1">
                CREED TECH
              </div>
              <div className="text-[9.5px] text-slate-500 leading-tight">
                We to your rich dispatches. Tailored enterprise engineering.
              </div>
            </div>
            <div>
              <div className="font-bold text-[9.5px] text-[#1a2a32] uppercase mb-1">
                Directory
              </div>
              <div className="text-[9px] text-slate-500 space-y-0.5">
                <div>Equipment</div>
                <div>Catalog</div>
                <div>Warranty</div>
              </div>
            </div>
            <div>
              <div className="font-bold text-[9.5px] text-[#1a2a32] uppercase mb-1">
                Compliance
              </div>
              <div className="text-[9px] text-slate-500 leading-tight">
                Certified standard under stringent industrial tolerance.
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-bold text-[9.5px] text-[#1a2a32] uppercase mb-1">
                Direct Desk
              </div>
              <div className="text-[9px] text-slate-500 mb-1.5 truncate">
                {profile.email}
              </div>
              <button
                type="button"
                className="bg-[#1a2a32] text-white text-[9px] font-bold px-3 py-1 rounded-full cursor-pointer hover:bg-slate-900"
              >
                Contact Desk →
              </button>
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[8.5px] text-slate-400 border-t border-slate-100">
            <span>&copy; {new Date().getFullYear()} Creed Tech Enterprise Solutions. All rights reserved.</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-5 h-5 rounded-full bg-[#1a2a32] text-white flex items-center justify-center hover:bg-[#1877F2] transition-all hover:scale-110 shadow-2xs"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={liUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-5 h-5 rounded-full bg-[#1a2a32] text-white flex items-center justify-center hover:bg-[#0A66C2] transition-all hover:scale-110 shadow-2xs"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-5 h-5 rounded-full bg-[#1a2a32] text-white flex items-center justify-center hover:bg-[#25D366] transition-all hover:scale-110 shadow-2xs"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-5 h-5 rounded-full bg-[#1a2a32] text-white flex items-center justify-center hover:bg-[#E4405F] transition-all hover:scale-110 shadow-2xs"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFormat4Preview = (profile: EmailDepartmentProfile, isSmall = false, customMessage?: string) => {
    const accent = profile.accentColor || "#0052FF";
    const name = profile.signatureName || profile.name || "Tariq Mahmood";
    const role = profile.signatureRole || profile.department || "Chief Technical Director";
    const company = profile.signatureCompany || "CREED TECH";
    const tagline = profile.signatureTagline || "Enterprise Engineering & Industrial Systems";
    const phone = profile.phone || "+92 321 9204488";
    const email = profile.email || "solutions@creed-tech.com";
    const website = profile.signatureWebsite || "https://creed-tech.com";
    const websiteDisplay = website.replace(/^https?:\/\//i, "").replace(/\/$/, "");
    const address = profile.address || "Office #02, Main Shopping Center, Sheikhupura, PK";
    const avatar =
      profile.signatureAvatar ||
      profile.sidebarLogo ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
    const companyLogo = profile.sidebarLogo || profile.signatureCompanyLogo || "https://creed-tech.com/icons/icon-192x192.png";

    const fbUrl =
      profile.sidebarSocialLinks?.find((s) => s.platform === "facebook")?.url ||
      "https://facebook.com/creedtechnology";
    const liUrl =
      profile.sidebarSocialLinks?.find((s) => s.platform === "linkedin")?.url ||
      "https://linkedin.com/company/creedtech";
    const waUrl =
      profile.sidebarSocialLinks?.find((s) => s.platform === "whatsapp")?.url ||
      (profile.phone
        ? `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`
        : "https://wa.me/923219204488");
    const igUrl =
      profile.sidebarSocialLinks?.find((s) => s.platform === "instagram")?.url ||
      "https://instagram.com/creed.technologiess";

    const sampleMessage =
      customMessage ||
      (profile.defaultMessageTemplate ||
`Dear Client,

Thank you for contacting Creed Tech. We have received your technical specifications and our engineering department has curated the following verified units for your project.

Please review the attached machinery offers below with full technical specifications and direct inspection records.

Best regards,
${name}`)
        .replace("{client_name}", "Valued Client")
        .replace("{service}", "Enterprise Solutions")
        .replace("{id}", "308");

    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md flex flex-col text-slate-800 my-3">
        {/* 1. TOP BRANDED HEADER (NAVY & ACCENT) */}
        <div className="bg-[#0A192F] p-4 sm:p-5 flex items-center justify-between border-b-2" style={{ borderBottomColor: accent }}>
          <div>
            <div className="text-base sm:text-lg font-black tracking-wider text-white">
              CREED <span style={{ color: accent }}>TECH</span>
            </div>
            <div className="text-[9.5px] uppercase tracking-widest text-slate-300 font-semibold mt-0.5">
              {profile.department || "Enterprise Operations Desk"}
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-sky-200 border border-white/20">
            REF #34 &bull; PRIORITY
          </span>
        </div>

        {/* 2. DIRECT EMAIL MESSAGE BODY */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-100">
          <div className="text-xs font-bold text-slate-900 mb-1.5 font-outfit">
            {profile.defaultSubjectTemplate?.replace("{service}", "Enterprise Machinery Catalog")?.replace("{id}", "308") || "Re: Technical Discovery & Machinery Dispatch"}
          </div>
          <div className="text-[11.5px] text-slate-600 leading-relaxed whitespace-pre-line font-sans">
            {sampleMessage}
          </div>
        </div>

        {/* 3. FORMAT 1 MACHINERY CATALOG CARDS */}
        <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200">
          <div className="flex items-center justify-between mb-2.5 pb-1 border-b border-slate-200">
            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>⚙️</span>
              <span>Attached Equipment Offers (Format 1 Catalog Cards)</span>
            </span>
            <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Verified Units
            </span>
          </div>
          {renderMediaPreview(profile, isSmall)}
        </div>

        {/* 4. MODERN GEOMETRIC EXECUTIVE SIGNATURE BANNER (MATCHING REFERENCE IMAGE) */}
        <div className="p-4 sm:p-5 bg-white">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            {/* Top Horizon Accent Bar */}
            <div className="bg-gradient-to-r from-[#0A192F] via-[#0052FF] to-[#00A3FF] px-4 py-2 flex items-center justify-between text-white">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/90">
                ★ Official Executive Transmission &bull; Direct Desk
              </span>
              <span className="text-[9px] font-mono font-bold text-sky-200">
                {profile.department}
              </span>
            </div>

            {/* Banner Content Grid */}
            <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4 sm:gap-5">
              {/* Left: Avatar with Crescent Accent Arc and Dashed Orbit Ring */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-tr from-[#0052FF] via-[#0A192F] to-[#00A3FF] shadow-lg flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00A3FF] animate-spin-slow pointer-events-none opacity-80" />
                  <img
                    src={avatar}
                    alt={name}
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                    }}
                    className="w-full h-full object-cover rounded-full border-2 border-white relative z-10"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-black shadow-xs z-20">
                    ✓
                  </div>
                </div>
              </div>

              {/* Center: Executive Name, Job Title, Tagline Pill & 2x2 Contact Details */}
              <div className="flex-1 text-center md:text-left min-w-0">
                <div className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-900 font-outfit truncate">
                  {name}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0052FF] mt-0.5 truncate">
                  {role}
                </div>
                <div className="mt-1.5 mb-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 border border-blue-200 rounded-full text-[9.5px] font-bold text-blue-800">
                    <span>✈</span>
                    <span className="truncate">{tagline}</span>
                  </span>
                </div>

                {/* 2x2 Contacts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10.5px] text-slate-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#0052FF] font-bold text-xs shrink-0">📞</span>
                    <a href={`tel:${phone}`} className="hover:text-blue-600 transition-colors font-semibold text-slate-800 truncate">
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#0052FF] font-bold text-xs shrink-0">✉️</span>
                    <a href={`mailto:${email}`} className="hover:text-blue-600 transition-colors font-semibold text-[#0052FF] truncate">
                      {email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#0052FF] font-bold text-xs shrink-0">🌐</span>
                    <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors font-semibold text-slate-800 truncate">
                      {websiteDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#0052FF] font-bold text-xs shrink-0">📍</span>
                    <span className="text-slate-500 truncate" title={address}>
                      {address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Company Logo & 4 Circular Social Badges */}
              <div className="shrink-0 flex flex-col items-center md:items-end justify-center md:border-l md:border-slate-100 md:pl-5 pt-3 md:pt-0 w-full md:w-auto">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={companyLogo}
                    alt={company}
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                    }}
                    className="w-8 h-8 rounded-lg object-contain shadow-2xs border border-slate-100 bg-white p-0.5"
                  />
                  <div className="text-left">
                    <div className="text-xs font-black tracking-wider text-slate-900 leading-tight">
                      CREED <span style={{ color: accent }}>TECH</span>
                    </div>
                    <div className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">
                      ENTERPRISE
                    </div>
                  </div>
                </div>

                {/* 4 Circular Social Badges: FB, LI, WA, IG */}
                <div className="flex items-center gap-1.5 mt-1">
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="w-6 h-6 rounded-full bg-[#0A192F] text-white flex items-center justify-center hover:bg-[#1877F2] transition-all hover:scale-110 shadow-2xs"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href={liUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="w-6 h-6 rounded-full bg-[#0A192F] text-white flex items-center justify-center hover:bg-[#0A66C2] transition-all hover:scale-110 shadow-2xs"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="w-6 h-6 rounded-full bg-[#0A192F] text-white flex items-center justify-center hover:bg-[#25D366] transition-all hover:scale-110 shadow-2xs"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </a>
                  <a
                    href={igUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="w-6 h-6 rounded-full bg-[#0A192F] text-white flex items-center justify-center hover:bg-[#E4405F] transition-all hover:scale-110 shadow-2xs"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. SUB-FOOTER */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 text-[9px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <span>&copy; {new Date().getFullYear()} Creed Tech Enterprise Solutions. All rights reserved.</span>
          <span>Certified Standard Industrial Communications</span>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 text-slate-900 shadow-xs relative overflow-hidden select-none">
        {/* Ambient Orange Radial Glow matching main site */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 85% 25%, rgba(255, 107, 0, 0.08) 0%, rgba(255, 107, 0, 0.015) 50%, transparent 75%)",
          }}
        />

        <div className="relative z-10 flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center text-2xl shadow-xs shrink-0">
            ✉️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight m-0 text-slate-900 font-outfit flex items-center gap-2">
              <span>Enterprise Email Management &amp; Operations</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-600 mt-1 max-w-2xl leading-relaxed font-normal">
              Centralized operations hub to manage multi-department business emails (support@, security@, solutions@, desk5@), custom branded HTML formats, SMTP connection, and replying to client inquiries.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 flex-wrap shrink-0">
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
            className="px-4 py-2.5 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-2 shadow-[0_2px_12px_rgba(255,107,0,0.28)] shrink-0 active:scale-95"
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
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <span className="text-orange-600 font-black">➕</span>
            <span>Add Business Email</span>
          </button>
        </div>
      </div>

      {/* Quick Status Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveSubTab("desks")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
            activeSubTab === "desks"
              ? "bg-white border-orange-400 shadow-[0_4px_16px_rgba(255,107,0,0.15)] ring-2 ring-orange-400/20"
              : "bg-white border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm"
          }`}
        >
          <div className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-xs">🏢</span>
              <span>Business Desks</span>
            </span>
            {activeSubTab === "desks" && (
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">{profiles.length}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Configured Email Profiles</div>
        </div>

        <div
          onClick={() => setActiveSubTab("inquiries")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
            activeSubTab === "inquiries"
              ? "bg-white border-orange-400 shadow-[0_4px_16px_rgba(255,107,0,0.15)] ring-2 ring-orange-400/20"
              : "bg-white border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm"
          }`}
        >
          <div className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-xs">💬</span>
              <span>Client Inquiries</span>
            </span>
            {activeSubTab === "inquiries" && (
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">{inquiries.length}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Total Inbound Leads</div>
        </div>

        <div
          onClick={() => {
            setActiveSubTab("inquiries");
            setInquiryFilter("NEW");
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
            inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0
              ? "bg-gradient-to-br from-amber-50 to-orange-50/60 border-amber-300 hover:border-amber-400 shadow-xs ring-1 ring-amber-400/20"
              : "bg-white border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm"
          }`}
        >
          <div className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100/80 flex items-center justify-center text-xs">⏳</span>
              <span>Pending Replies</span>
            </span>
            {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-900 font-outfit">
            {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length}
          </div>
          <div className="text-xs text-amber-700 mt-1 font-medium">Ready for immediate response</div>
        </div>

        <div
          onClick={() => setActiveSubTab("smtp")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
            activeSubTab === "smtp"
              ? "bg-white border-orange-400 shadow-[0_4px_16px_rgba(255,107,0,0.15)] ring-2 ring-orange-400/20"
              : "bg-white border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-sm"
          }`}
        >
          <div className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-xs">⚙️</span>
              <span>SMTP Server</span>
            </span>
            {activeSubTab === "smtp" && (
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            )}
          </div>
          <div className="text-sm font-bold flex items-center gap-2 mt-1 text-slate-900">
            <span
              className={`w-2.5 h-2.5 rounded-full inline-block ${
                isSmtpConfigured ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="font-outfit">{isSmtpConfigured ? "Connected & Active" : "Local Simulation"}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-medium font-mono truncate">
            {smtpHost || "mail.server"}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200 p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveSubTab("desks")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "desks"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_12px_rgba(255,107,0,0.3)]"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/90"
          }`}
        >
          <span>🏢</span>
          <span>Business Email Desks &amp; Formats ({profiles.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("inquiries")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "inquiries"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_12px_rgba(255,107,0,0.3)]"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/90"
          }`}
        >
          <span>💬</span>
          <span>Client Inquiries &amp; Quick Reply</span>
          {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0 ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950 shadow-2xs">
              {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length} New
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200/80 text-slate-700">
              {inquiries.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("smtp")}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "smtp"
              ? "bg-[#FF6B00] text-white font-bold shadow-[0_2px_12px_rgba(255,107,0,0.3)]"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/90"
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

      {/* MODAL: VISUAL DESIGNER FOR ADD / EDIT (PORTALED TO DOCUMENT BODY) */}
      {mounted && editingProfile && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingProfile(null);
            }
          }}
        >
          <div 
            className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 w-[98vw] sm:w-[96vw] max-w-[1560px] h-[95vh] sm:h-[92vh] max-h-[960px] shadow-[0_25px_70px_rgba(0,0,0,0.45)] relative text-left flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-black/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-[#FF6B00] shrink-0" />

            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-slate-200/90 bg-white/95 backdrop-blur-md z-30 shrink-0">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl sm:text-2xl shadow-md shadow-blue-500/25 ring-4 ring-blue-50 shrink-0">
                  🎨
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 m-0 font-outfit tracking-tight truncate">
                      {profiles.some((p) => p.id === editingProfile.id)
                        ? `Visual Designer: ${editingProfile.name}`
                        : "Design New Business Email Profile"}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono shrink-0">
                      {editingProfile.department || "Profile Editor"}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2 truncate">
                    <span>Select 1 of 5 distinct formats, customize colors, layout &amp; live preview.</span>
                    <span className="hidden md:inline text-slate-300">•</span>
                    <span className="hidden md:inline text-slate-400 font-mono text-[11px]">ID: {editingProfile.id}</span>
                  </div>
                </div>
              </div>

              {/* Top Right Controls & Prominent Close Button */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-3">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Canvas</span>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingProfile(null)}
                  className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 font-bold text-xs sm:text-sm cursor-pointer transition-all duration-150 shadow-xs hover:shadow-sm"
                  title="Close Designer (Esc)"
                  aria-label="Close Designer"
                >
                  <span className="text-base font-black transition-transform group-hover:scale-110 leading-none">✕</span>
                  <span className="font-bold hidden sm:inline text-xs">Close</span>
                  <kbd className="hidden md:inline text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-400 group-hover:text-red-500 group-hover:border-red-200">
                    Esc
                  </kbd>
                </button>
              </div>
            </div>

            {/* FORMAT SELECTOR BAR (5 DISTINCT FORMAT SLOTS) */}
            <div className="px-4 sm:px-8 py-3 border-b border-slate-200 bg-slate-50/80 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                  <span>Email Template Format:</span>
                  <span className="text-slate-500 font-semibold text-[11px]">(5 Format Architecture)</span>
                </span>
                <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                  Active: {activeModalFormat === "format-executive-signature" ? "Format 2 (Executive Desk)" : activeModalFormat === "format-announcement" ? "Format 3 (Brand Hero & Promo)" : activeModalFormat === "format-minimal" ? "Format 4 (Executive Signature Banner)" : "Format 1 (Catalog Cards)"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
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
                              : fmt.id === "format-minimal"
                              ? {
                                  signatureName: editingProfile.signatureName || editingProfile.name || "Tariq Mahmood",
                                  signatureRole: editingProfile.signatureRole || editingProfile.department || "Chief Technical Director",
                                  signatureTagline: editingProfile.signatureTagline || "Enterprise Engineering & Industrial Systems",
                                  signatureAvatar:
                                    editingProfile.signatureAvatar ||
                                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
                                  sidebarLogo:
                                    editingProfile.sidebarLogo ||
                                    "https://creed-tech.com/icons/icon-192x192.png",
                                  sidebarSocialLinks:
                                    editingProfile.sidebarSocialLinks && editingProfile.sidebarSocialLinks.length > 0
                                      ? editingProfile.sidebarSocialLinks
                                      : DEFAULT_FORMAT2_SOCIAL_LINKS,
                                }
                              : {}),
                          });
                          if (showToast) {
                            showToast(`Template layout switched to: ${fmt.title}`);
                          }
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all relative ${
                        isReserved
                          ? "bg-slate-50/70 border-dashed border-slate-300 opacity-60 cursor-not-allowed"
                          : isSelected
                          ? "bg-blue-50/95 border-[#0052FF] ring-2 ring-blue-500/30 shadow-xs cursor-pointer"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-base">{fmt.icon}</span>
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isReserved
                              ? "bg-slate-200 text-slate-600"
                              : isSelected
                              ? "bg-[#0052FF] text-white shadow-2xs"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isReserved ? "Reserved" : isSelected ? "Selected" : "Live"}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Format {fmt.formatNumber}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                        {fmt.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Screen Designer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
              {/* Controls (7 Cols on MD+ for wide, clear, comfortable editing) */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block flex items-center gap-2">
                    <span>👤</span>
                    <span>1. Profile Identity &amp; Color Scheme</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Profile Name *</label>
                      <input
                        type="text"
                        value={editingProfile.name}
                        onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-[13px] border border-slate-300 rounded-xl font-medium outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 bg-white text-slate-900 transition-all"
                        placeholder="e.g. Sales Desk"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Department Tag *</label>
                      <input
                        type="text"
                        value={editingProfile.department}
                        onChange={(e) => setEditingProfile({ ...editingProfile, department: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-[13px] border border-slate-300 rounded-xl font-medium outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 bg-white text-slate-900 transition-all"
                        placeholder="e.g. Industrial Solutions"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sender Email *</label>
                      <input
                        type="email"
                        value={editingProfile.email}
                        onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                        className={`w-full px-3 py-2 text-xs sm:text-[13px] border rounded-xl font-mono outline-none bg-white transition-all text-slate-900 ${
                          isEditingEmailDuplicate ? "border-red-500 focus:border-red-600 ring-2 ring-red-400/20" : "border-slate-300 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                        }`}
                        placeholder="e.g. desk@creed-tech.com"
                      />
                      {isEditingEmailDuplicate && (
                        <span className="text-xs text-red-600 font-bold block mt-1.5 flex items-center gap-1.5">
                          <span>⚠️</span>
                          <span>This business email already exists in another profile. Duplicate email formats are not allowed.</span>
                        </span>
                      )}
                    </div>

                    {/* 1. BRAND ACCENT COLOR PALETTE */}
                    <div className="sm:col-span-2 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <span>✨ Brand Accent Color</span>
                          <span className="text-[11px] font-normal text-slate-500">(Buttons, Links, Borders)</span>
                        </label>
                        <span className="text-xs font-mono text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">{editingProfile.accentColor || "#FF6B00"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {ACCENT_COLOR_PRESETS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, accentColor: c })}
                            className="w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-115 shadow-2xs"
                            style={{
                              backgroundColor: c,
                              border: editingProfile.accentColor === c ? "2px solid #0052FF" : "1px solid #cbd5e1",
                              boxShadow: editingProfile.accentColor === c ? "0 0 0 2px rgba(0,82,255,0.3)" : "none",
                            }}
                            title={c}
                          />
                        ))}
                        <input
                          type="color"
                          value={editingProfile.accentColor || "#FF6B00"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, accentColor: e.target.value })}
                          className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0 ml-1 shadow-2xs"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.accentColor || ""}
                          onChange={(e) => setEditingProfile({ ...editingProfile, accentColor: e.target.value })}
                          className="w-24 px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono font-bold outline-none bg-white text-slate-800 focus:border-[#FF6B00]"
                          placeholder="#FF6B00"
                        />
                      </div>
                    </div>

                    {/* 2. TEXT COLOR PALETTE */}
                    <div className="sm:col-span-2 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🔤 Text Color Palette</span>
                          <span className="text-[11px] font-normal text-slate-500">(Headings, Message &amp; Name)</span>
                        </label>
                        <span className="text-xs font-mono text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">{editingProfile.textColor || "#1E293B"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {TEXT_COLOR_PRESETS.map((item) => (
                          <button
                            key={item.color}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, textColor: item.color })}
                            className="w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-115 shadow-2xs"
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
                          className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0 ml-1 shadow-2xs"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.textColor || "#1E293B"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, textColor: e.target.value })}
                          className="w-24 px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono font-bold outline-none bg-white text-slate-800 focus:border-[#FF6B00]"
                          placeholder="#1E293B"
                        />
                      </div>
                    </div>

                    {/* 3. BACKGROUND COLOR PALETTE */}
                    <div className="sm:col-span-2 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🎨 Background Color Palette</span>
                          <span className="text-[11px] font-normal text-slate-500">(Email Card &amp; Canvas)</span>
                        </label>
                        <span className="text-xs font-mono text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">{editingProfile.backgroundColor || "#FFFFFF"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {BG_COLOR_PRESETS.map((item) => (
                          <button
                            key={item.color}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, backgroundColor: item.color })}
                            className="w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-115 shadow-2xs"
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
                          className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0 ml-1 shadow-2xs"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.backgroundColor || "#FFFFFF"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, backgroundColor: e.target.value })}
                          className="w-24 px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono font-bold outline-none bg-white text-slate-800 focus:border-[#FF6B00]"
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* FORMAT 1, 3 & 4: MACHINE OFFERS & CATALOG CARDS / EQUIPMENT SHOWCASE */}
                {(activeModalFormat === "format-catalog" || activeModalFormat === "format-announcement" || activeModalFormat === "format-minimal") && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
                    <div>
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                        2. Machine Offers &amp; Equipment Showcase Cards ({activeModalFormat === "format-announcement" ? "Format 3 Hero & Units" : activeModalFormat === "format-minimal" ? "Format 4 Catalog Cards" : "Format 1 Catalog Cards"})
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
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3.5">
                      {/* Hidden File Inputs for Format 2 Gallery */}
                      <input
                        type="file"
                        ref={format2MultiFileInputRef}
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFormat2BatchUpload}
                      />
                      <input
                        type="file"
                        ref={format2SingleItemFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFormat2SingleItemUpload}
                      />

                      {/* Header with Title and Primary Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <span>🔲 Multi-Row Image Gallery (Email: Max 7 Cards Per Row)</span>
                            </span>
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-2xs">
                              {(editingProfile.galleryRows || []).length || 1} Row(s) • {(editingProfile.galleryRows || []).reduce((acc, r) => acc + (r.items || []).length, 0)} Total Cards
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-1 leading-snug">
                            In sent emails &amp; live preview, each row displays up to 7 cards side-by-side (center-adjusted if fewer). Below in this editor, cards are laid out spaciously for easy photo review and text editing.
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            disabled={isUploadingFormat2Gallery}
                            onClick={() => format2MultiFileInputRef.current?.click()}
                            className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                            title="Select multiple pictures from your computer at once"
                          >
                            <span>📁</span>
                            <span>{isUploadingFormat2Gallery ? "Uploading..." : "Multi-Picture Select (Computer)"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleAddGalleryRow}
                            className="px-3.5 py-2 bg-[#0052FF] hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
                          >
                            <span>➕</span>
                            <span>Add New Row</span>
                          </button>
                        </div>
                      </div>

                      {/* Content / Caption Mode Toggle (Format 1 Style: Same vs Different Content) */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <span>📝 Caption / Text Mode:</span>
                          </span>
                          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => {
                                setFormat2ContentMode("separate");
                                if (showToast) showToast("Switched to Different Content per Picture");
                              }}
                              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                                format2ContentMode === "separate"
                                  ? "bg-[#0052FF] text-white shadow-2xs"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              📝 Different Text per Pic
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setFormat2ContentMode("same");
                                handleApplyFormat2TextToAll();
                                if (showToast) showToast("Switched to Same Text for All Pictures! Synced across all cards.");
                              }}
                              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                                format2ContentMode === "same"
                                  ? "bg-[#0052FF] text-white shadow-2xs"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              🔗 Same Text for All
                            </button>
                          </div>
                        </div>

                        {((editingProfile.galleryRows || []).reduce((acc, r) => acc + (r.items || []).length, 0)) > 1 && (
                          <button
                            type="button"
                            onClick={() => handleApplyFormat2TextToAll()}
                            className="px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs flex items-center gap-1.5"
                            title="Copy text from Card #1 to all cards"
                          >
                            <span>📋</span>
                            <span>Copy Card #1 Text to All</span>
                          </button>
                        )}
                      </div>

                      {/* Master Text Input Bar when in 'Same' Mode */}
                      {format2ContentMode === "same" && (
                        <div className="bg-blue-50/90 border border-blue-200 rounded-xl p-3.5 space-y-2 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-900 flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>🔗 Master Content Under All Pictures (Editing updates all cards in real-time)</span>
                            </span>
                            <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-100/70 px-2 py-0.5 rounded">
                              Auto-sync active
                            </span>
                          </div>
                          <input
                            type="text"
                            value={format2MasterText}
                            onChange={(e) => handleFormat2MasterTextChange(e.target.value)}
                            placeholder="Type shared caption / text under all pictures..."
                            className="w-full px-3 py-2 text-xs border border-blue-300 rounded-lg bg-white text-slate-800 font-medium shadow-2xs focus:ring-2 focus:ring-blue-400 outline-none"
                          />
                        </div>
                      )}

                      {/* Rows Container */}
                      <div className="space-y-4">
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
                            <div key={row.id || rIdx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-3 shadow-2xs">
                              {/* Row Header */}
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                    <span>Row #{rIdx + 1}</span>
                                  </span>
                                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    {itemsCount} / 7 Cards ({itemsCount < 7 ? "Center Adjusted in Email" : "Full Row in Email"})
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    disabled={itemsCount >= 7}
                                    onClick={() => handleAddItemToRow(row.id)}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors disabled:opacity-40 flex items-center gap-1 shadow-2xs"
                                  >
                                    <span>➕ Add Card</span>
                                    <span>({itemsCount}/7)</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteGalleryRow(row.id)}
                                    className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                  >
                                    🗑️ Del Row
                                  </button>
                                </div>
                              </div>

                              {/* Items in this row: Spacious 2 to 4 column responsive grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
                                {(row.items || []).map((it, itIdx) => (
                                  <div
                                    key={it.id || itIdx}
                                    className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-2.5 relative group/editcard"
                                  >
                                    {/* Card Header: Number & Delete */}
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                                        <span>🖼️</span>
                                        <span>Card #{itIdx + 1}</span>
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteRowItem(row.id, it.id)}
                                        className="w-6 h-6 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                                        title="Delete this image card"
                                      >
                                        ✕
                                      </button>
                                    </div>

                                    {/* Thumbnail Preview */}
                                    <div className="w-full h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative group cursor-pointer">
                                      <img
                                        src={it.imageUrl}
                                        alt={it.text || `Card ${itIdx + 1}`}
                                        onError={(e) => {
                                          const t = e.currentTarget;
                                          if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                                        }}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onClick={() => setEnlargedMediaPopup({ imageUrl: it.imageUrl, title: it.title || it.text, text: it.text })}
                                        title="Click to enlarge 🔍"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setEnlargedMediaPopup({ imageUrl: it.imageUrl, title: it.title || it.text, text: it.text })}
                                        className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors backdrop-blur-xs"
                                        title="Zoom"
                                      >
                                        <span>🔍</span>
                                        <span>Enlarge</span>
                                      </button>
                                    </div>

                                    {/* Change Picture Button */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setUploadingFormat2RowItem({ rowId: row.id, itemId: it.id });
                                        format2SingleItemFileInputRef.current?.click();
                                      }}
                                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                                      title="Pick a different picture from computer for this card"
                                    >
                                      <span>📷</span>
                                      <span>Change Picture</span>
                                    </button>

                                    {/* Text Under Picture */}
                                    <div className="space-y-1 pt-1 border-t border-slate-100">
                                      <div className="flex items-center justify-between">
                                        <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                                          Text Under Picture
                                        </label>
                                        {format2ContentMode === "same" && (
                                          <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded font-mono">
                                            🔗 Synced
                                          </span>
                                        )}
                                      </div>
                                      <input
                                        type="text"
                                        value={it.text}
                                        onChange={(e) => handleUpdateRowItem(row.id, it.id, { text: e.target.value })}
                                        placeholder="Caption / Specs under pic"
                                        className={`w-full px-2.5 py-1.5 text-xs border rounded-lg font-medium text-slate-800 outline-none transition-all ${
                                          format2ContentMode === "same"
                                            ? "border-blue-300 bg-blue-50/50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-400"
                                            : "border-slate-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
                                        }`}
                                      />
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
                )}

                {/* FORMAT 3: FOOTER SOCIAL LINKS CONTROLS */}
                {activeModalFormat === "format-announcement" && editingProfile && (
                  <div className="bg-gradient-to-r from-slate-50 via-teal-50/20 to-blue-50/20 border border-teal-200 rounded-xl p-3.5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-teal-100 pb-2">
                      <div>
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
                          <span>🌐 Format 3: Footer Social Links (Bottom Right)</span>
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Direct links for Facebook, LinkedIn, WhatsApp &amp; Instagram shown at the bottom right of Format 3.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSocialLink}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <span>➕</span>
                        <span>Add Link</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                      {(editingProfile.sidebarSocialLinks && editingProfile.sidebarSocialLinks.length > 0
                        ? editingProfile.sidebarSocialLinks
                        : DEFAULT_FORMAT2_SOCIAL_LINKS
                      ).map((soc, sIdx) => (
                        <div
                          key={soc.id || sIdx}
                          className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs"
                        >
                          <select
                            value={soc.platform}
                            onChange={(e) =>
                              handleUpdateSocialLink(soc.id, {
                                platform: e.target.value as any,
                                label: e.target.value.toUpperCase(),
                              })
                            }
                            className="text-[11px] font-bold bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-700 outline-none"
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
                )}

                {/* FORMAT 4: EXECUTIVE SIGNATURE BANNER SETTINGS */}
                {activeModalFormat === "format-minimal" && editingProfile && (
                  <div className="bg-gradient-to-r from-slate-50 via-blue-50/20 to-sky-50/20 border border-blue-200 rounded-xl p-4 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-2.5">
                      <div>
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
                          <span>💼 Format 4: Executive Signature Banner Settings</span>
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Customize circular avatar, executive credentials, tagline badge, contact grid, company logo &amp; social badges.
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                        Executive Banner
                      </span>
                    </div>

                    {/* Executive Credentials */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Executive Name *
                        </label>
                        <input
                          type="text"
                          value={editingProfile.signatureName ?? editingProfile.name ?? ""}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              signatureName: e.target.value,
                            })
                          }
                          placeholder="e.g. Tariq Mahmood"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Job Role / Designation *
                        </label>
                        <input
                          type="text"
                          value={editingProfile.signatureRole ?? editingProfile.department ?? ""}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              signatureRole: e.target.value,
                            })
                          }
                          placeholder="e.g. Chief Technical Director"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Tagline Badge Pill (Airplane / Shield)
                        </label>
                        <input
                          type="text"
                          value={editingProfile.signatureTagline ?? ""}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              signatureTagline: e.target.value,
                            })
                          }
                          placeholder="e.g. Designing Experiences • Enterprise Solutions"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={editingProfile.signatureCompany ?? "CREED TECH"}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              signatureCompany: e.target.value,
                            })
                          }
                          placeholder="CREED TECH"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 font-bold"
                        />
                      </div>
                    </div>

                    {/* Avatar & Logo Image Uploaders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                      {/* Avatar */}
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                          <span>Circular Avatar Photo</span>
                          {editingProfile.signatureAvatar && (
                            <span className="text-[9px] text-emerald-600 font-bold">● Active</span>
                          )}
                        </label>
                        <div className="flex items-center gap-2.5">
                          <img
                            src={
                              editingProfile.signatureAvatar ||
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
                            }
                            alt="Avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-xs shrink-0"
                          />
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={editingProfile.signatureAvatar || ""}
                              onChange={(e) =>
                                setEditingProfile({
                                  ...editingProfile,
                                  signatureAvatar: e.target.value,
                                })
                              }
                              placeholder="Avatar Image URL"
                              className="w-full px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => avatarFileInputRef.current?.click()}
                              disabled={isUploadingAvatar}
                              className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 cursor-pointer flex items-center gap-1 transition-colors"
                            >
                              <span>📷</span>
                              <span>{isUploadingAvatar ? "Uploading..." : "Upload Photo"}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Company Logo */}
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                          <span>Brand Logo (Right Side)</span>
                          {editingProfile.sidebarLogo && (
                            <span className="text-[9px] text-emerald-600 font-bold">● Active</span>
                          )}
                        </label>
                        <div className="flex items-center gap-2.5">
                          <img
                            src={editingProfile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png"}
                            alt="Logo"
                            className="w-12 h-12 rounded-lg object-contain border border-slate-200 bg-white p-1 shadow-xs shrink-0"
                          />
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={editingProfile.sidebarLogo || ""}
                              onChange={(e) =>
                                setEditingProfile({
                                  ...editingProfile,
                                  sidebarLogo: e.target.value,
                                })
                              }
                              placeholder="Brand Logo URL"
                              className="w-full px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => sidebarLogoInputRef.current?.click()}
                              disabled={isUploadingSidebarLogo}
                              className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 cursor-pointer flex items-center gap-1 transition-colors"
                            >
                              <span>🏢</span>
                              <span>{isUploadingSidebarLogo ? "Uploading..." : "Upload Logo"}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Links List for Format 4 */}
                    <div className="pt-2 border-t border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                            🌐 Format 4 Social Links (Right Side Badges)
                          </span>
                          <span className="text-[10.5px] text-slate-500">
                            Circular icons for Facebook, LinkedIn, WhatsApp, and Instagram
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddSocialLink}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <span>➕</span>
                          <span>Add Link</span>
                        </button>
                      </div>

                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {(editingProfile.sidebarSocialLinks && editingProfile.sidebarSocialLinks.length > 0
                          ? editingProfile.sidebarSocialLinks
                          : DEFAULT_FORMAT2_SOCIAL_LINKS
                        ).map((soc, sIdx) => (
                          <div
                            key={soc.id || sIdx}
                            className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs"
                          >
                            <select
                              value={soc.platform}
                              onChange={(e) =>
                                handleUpdateSocialLink(soc.id, {
                                  platform: e.target.value as any,
                                  label: e.target.value.toUpperCase(),
                                })
                              }
                              className="text-[11px] font-bold bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-700 outline-none"
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
                )}

                {/* SECTION 3: LAYOUT POSITION & ALIGNMENT */}
                <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block flex items-center gap-2">
                    <span>📐</span>
                    <span>3. Layout Style, Position &amp; Alignment</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    {/* Quick 1-Click Master Alignment */}
                    <div className="sm:col-span-2 bg-blue-50/90 border border-blue-200 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-extrabold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                          <span>⚡ One-Click Align All (Logo, Headings &amp; Text)</span>
                        </label>
                        <span className="text-[11px] text-blue-700 font-semibold">Aligns logo, title &amp; all text together</span>
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
                              className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                                isAllActive
                                  ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-blue-100/60"
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
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                              className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-bold border cursor-pointer transition-colors ${
                                (editingProfile.mediaPosition || "center") === item.id
                                  ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
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
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                            className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-bold border cursor-pointer transition-colors ${
                              (editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left")) === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Headings & Text Alignment */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                            className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-bold border cursor-pointer transition-colors ${
                              (editingProfile.contentAlignment || "left") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Header Theme */}
                    <div className="sm:col-span-2 pt-2 border-t border-slate-200">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Header Background Theme
                      </label>
                      <div className="flex gap-2">
                        {[
                          { id: "dark", label: "⬛ Dark Enterprise" },
                          { id: "light", label: "⬜ Clean Light" },
                          { id: "centered", label: "👑 Centered Brand" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, headerStyle: item.id as any })}
                            className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-bold border cursor-pointer transition-colors ${
                              (editingProfile.headerStyle || "dark") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
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
                <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-2xs">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block flex items-center gap-2">
                    <span>💬</span>
                    <span>4. Default Subject &amp; Message Template</span>
                  </span>
                  <div className="flex flex-col gap-3 text-xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subject Template (uses &#123;service&#125; &amp; &#123;id&#125;)
                      </label>
                      <input
                        type="text"
                        value={editingProfile.defaultSubjectTemplate || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, defaultSubjectTemplate: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-[13px] border border-slate-300 rounded-xl outline-none font-medium bg-white text-slate-900 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                        placeholder="Re: Creed Tech Discovery - {service} [Inquiry #{id}]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Message Template Body
                      </label>
                      <textarea
                        rows={4}
                        value={editingProfile.defaultMessageTemplate || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, defaultMessageTemplate: e.target.value })}
                        className="w-full p-3.5 text-xs sm:text-[13px] border border-slate-300 rounded-xl font-mono outline-none bg-white text-slate-900 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all leading-relaxed"
                        placeholder="Dear {client_name}, ..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dedicated Real-time Email Preview (5 Cols on MD+) */}
              <div className="md:col-span-5 flex flex-col gap-3">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>👁️ Real-time Email Preview</span>
                    <span className="text-[11px] text-emerald-600 font-bold">● Live</span>
                  </span>
                  <span className="text-[11px] font-mono text-blue-700 font-bold bg-blue-50 px-3 py-0.5 rounded-full border border-blue-200">
                    {activeModalFormat === "format-executive-signature"
                      ? "Format 2: Sidebar Dashboard"
                      : activeModalFormat === "format-announcement"
                      ? "Format 3: Brand Hero & Promo"
                      : activeModalFormat === "format-minimal"
                      ? "Format 4: Executive Signature Banner"
                      : "Format 1: Catalog Cards"}
                  </span>
                </span>

                {activeModalFormat === "format-executive-signature" ? (
                  <div className="sticky top-1">
                    {renderFormat2Preview(editingProfile, true)}
                  </div>
                ) : activeModalFormat === "format-announcement" ? (
                  <div className="sticky top-1">
                    {renderFormat3Preview(editingProfile, true)}
                  </div>
                ) : activeModalFormat === "format-minimal" ? (
                  <div className="sticky top-1">
                    {renderFormat4Preview(editingProfile, true)}
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

            {/* Modal Bottom Footer */}
            <div className="px-4 sm:px-8 py-3.5 border-t border-slate-200/90 bg-white/95 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <kbd className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-500">
                  Esc
                </kbd>
                <span className="hidden sm:inline">to close without saving</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProfile(null)}
                  className="px-4 sm:px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving || isEditingEmailDuplicate || !editingProfile.email || !editingProfile.name}
                  onClick={() => handleSaveProfile(editingProfile)}
                  className="px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 cursor-pointer disabled:opacity-50 flex items-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span>💾</span>
                  <span>{isSaving ? "Saving..." : isEditingEmailDuplicate ? "Duplicate Email Detected" : "Save Profile & Design"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Main Grid: Profiles List on Left (5 Cols), Active Profile Preview & Test on Right (7 Cols) */}
      {activeSubTab === "desks" && (
        <div className="space-y-6">
          {/* 5 EMAIL TEMPLATE FORMATS SHOWCASE (VISIBLE IN FRONT / SMNY NAZAR AYE) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-slate-100">
              <div>
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block font-outfit flex items-center gap-2">
                  <span>🎨 5 Email Template Formats Architecture</span>
                  <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 font-bold">
                    2 Active Formats • 3 Reserved Slots
                  </span>
                </span>
                <span className="text-xs text-slate-600 mt-1 block leading-relaxed">
                  Har format independent aur unique hai. Kisi bi format card pr click kar ke layout switch kryn ya <strong>Design ↗</strong> pr click kr k live customize kryn:
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
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
                            : fmt.id === "format-minimal"
                            ? {
                                signatureName: activeProfile.signatureName || activeProfile.name || "Tariq Mahmood",
                                signatureRole: activeProfile.signatureRole || activeProfile.department || "Chief Technical Director",
                                signatureTagline: activeProfile.signatureTagline || "Enterprise Engineering & Industrial Systems",
                                signatureAvatar:
                                  activeProfile.signatureAvatar ||
                                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
                                sidebarLogo:
                                  activeProfile.sidebarLogo ||
                                  "https://creed-tech.com/icons/icon-192x192.png",
                                sidebarSocialLinks:
                                  activeProfile.sidebarSocialLinks && activeProfile.sidebarSocialLinks.length > 0
                                    ? activeProfile.sidebarSocialLinks
                                    : DEFAULT_FORMAT2_SOCIAL_LINKS,
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
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between select-none ${
                      isReserved
                        ? "bg-slate-50/70 border-dashed border-slate-300 opacity-60 cursor-not-allowed"
                        : isFormatActive
                        ? "bg-blue-50/90 border-[#0052FF] ring-2 ring-blue-500/30 shadow-sm cursor-pointer"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 cursor-pointer shadow-xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2.5">
                        <span className="text-xl">{fmt.icon}</span>
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isReserved
                              ? "bg-slate-200 text-slate-600"
                              : isFormatActive
                              ? "bg-[#0052FF] text-white shadow-2xs"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isReserved ? "Reserved Slot" : isFormatActive ? "Selected" : "Live"}
                        </span>
                      </div>
                      <div className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-snug font-outfit">
                        {fmt.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {fmt.description}
                      </div>
                    </div>

                    <div className="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">
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
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer hover:underline flex items-center gap-0.5"
                        >
                          <span>Design</span>
                          <span>↗</span>
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
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 font-outfit flex items-center justify-between">
                <span>Active Business Desks ({profiles.length})</span>
                <span className="text-[11px] font-normal text-slate-500">Click to preview</span>
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
                          ? "bg-white text-slate-900 border-orange-400 shadow-[0_4px_16px_rgba(255,107,0,0.14)] ring-2 ring-[#FF6B00]/30"
                          : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-xs shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-xs ring-2 ring-white shrink-0"
                            style={{ backgroundColor: p.accentColor || "#FF6B00" }}
                          >
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-slate-900 font-outfit">
                                {p.name}
                              </span>
                              <span
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-2xs"
                                style={{ backgroundColor: p.accentColor || "#FF6B00" }}
                              >
                                {p.department}
                              </span>
                            </div>
                            <div className="font-mono text-xs mt-0.5 text-slate-600 font-medium">
                              {p.email}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setEditingProfile(p)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-bold text-xs cursor-pointer shadow-2xs transition-colors flex items-center gap-1"
                            title="Edit design format, images & address"
                          >
                            <span>✏️</span>
                            <span>Edit</span>
                          </button>
                          {profiles.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteProfile(p.id)}
                              className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold text-xs cursor-pointer transition-colors flex items-center justify-center shadow-2xs"
                              title="Delete profile"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                        <span className="font-mono text-[11px]">{p.phone || "No direct phone"}</span>
                        <span className="font-medium text-[11px]">
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
              <div className="flex items-center justify-between flex-wrap gap-2 pb-1">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-2 font-outfit">
                  <span>Live Preview &amp; Actions:</span>
                  <span className="text-slate-900 font-black text-sm">{activeProfile.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProfile(activeProfile)}
                    className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_2px_10px_rgba(255,107,0,0.25)] active:scale-95"
                  >
                    <span>✏️</span>
                    <span>Edit Format &amp; Design</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyStyledHtml(activeProfile)}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 border border-slate-200 shadow-xs hover:border-slate-300"
                  >
                    <span>📋</span>
                    <span>Copy Styled Format</span>
                  </button>
                </div>
              </div>

              {/* Real-time Email Render Box */}
              {activeProfileFormat === "format-executive-signature" ? (
                renderFormat2Preview(activeProfile, false)
              ) : activeProfileFormat === "format-announcement" ? (
                renderFormat3Preview(activeProfile, false)
              ) : activeProfileFormat === "format-minimal" ? (
                renderFormat4Preview(activeProfile, false)
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
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span>🧪 Test Live Email Delivery</span>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">({activeProfile.name})</span>
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">Sends realistic rendered email</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={testEmailRecipient}
                onChange={(e) => setTestEmailRecipient(e.target.value)}
                placeholder="Enter recipient email (e.g. your-email@gmail.com)"
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 font-medium outline-none focus:bg-white focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
              />
              <button
                type="button"
                disabled={isSendingTest}
                onClick={handleSendTestEmail}
                className="px-5 py-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-[0_2px_10px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_16px_rgba(255,107,0,0.35)] disabled:opacity-50 shrink-0 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>🚀</span>
                <span>{isSendingTest ? "Sending Test..." : "Send Test Email"}</span>
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
