"use client";

import React, { useRef, useState } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";
import { uploadMediaFile, uploadMultipleMediaFiles } from "@/lib/uploadHelper";
import {
  EmailDepartmentProfile,
  EmailSocialLink,
  GalleryRow,
  GalleryRowItem,
  DEFAULT_FORMAT2_SOCIAL_LINKS,
} from "@/lib/email-types";
import { DEFAULT_IMAGE_FALLBACK } from "../constants/presets";

interface Format2ControlsProps {
  editingProfile: EmailDepartmentProfile;
  setEditingProfile: React.Dispatch<React.SetStateAction<EmailDepartmentProfile | null>>;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onEnlargeMedia?: (popup: { imageUrl: string; title?: string; text?: string }) => void;
}

export const Format2Controls: React.FC<Format2ControlsProps> = ({
  editingProfile,
  setEditingProfile,
  showToast,
  onEnlargeMedia,
}) => {
  const adminFetch = useAdminFetch();
  const [format2ContentMode, setFormat2ContentMode] = useState<"separate" | "same">("separate");
  const [format2MasterText, setFormat2MasterText] = useState("");
  const [isUploadingFormat2Gallery, setIsUploadingFormat2Gallery] = useState(false);
  const [uploadingFormat2RowItem, setUploadingFormat2RowItem] = useState<{ rowId: string; itemId: string } | null>(null);
  const [isUploadingSidebarLogo, setIsUploadingSidebarLogo] = useState(false);
  const [isUploadingMainPic, setIsUploadingMainPic] = useState(false);

  const sidebarLogoInputRef = useRef<HTMLInputElement>(null);
  const mainPicInputRef = useRef<HTMLInputElement>(null);
  const format2MultiFileInputRef = useRef<HTMLInputElement>(null);
  const format2SingleItemFileInputRef = useRef<HTMLInputElement>(null);

  const handleSidebarLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingSidebarLogo(true);
      const res = await uploadMediaFile(file, adminFetch);
      if (res && res.url) {
        setEditingProfile((prev) => (prev ? { ...prev, sidebarLogo: res.url } : prev));
        if (showToast) showToast("✓ Logo uploaded successfully!");
      }
    } catch (err: any) {
      if (showToast) showToast(`Logo upload failed: ${err.message}`, "error");
    } finally {
      setIsUploadingSidebarLogo(false);
      if (sidebarLogoInputRef.current) sidebarLogoInputRef.current.value = "";
    }
  };

  const handleMainPicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingMainPic(true);
      const res = await uploadMediaFile(file, adminFetch);
      if (res && res.url) {
        setEditingProfile((prev) => (prev ? { ...prev, featuredMainPicUrl: res.url } : prev));
        if (showToast) showToast("✓ Main banner picture uploaded successfully!");
      }
    } catch (err: any) {
      if (showToast) showToast(`Upload failed: ${err.message}`, "error");
    } finally {
      setIsUploadingMainPic(false);
      if (mainPicInputRef.current) mainPicInputRef.current.value = "";
    }
  };

  const handleAddSocialLink = () => {
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
    const current = editingProfile.sidebarSocialLinks || DEFAULT_FORMAT2_SOCIAL_LINKS;
    setEditingProfile({
      ...editingProfile,
      sidebarSocialLinks: current.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    });
  };

  const handleDeleteSocialLink = (id: string) => {
    const current = editingProfile.sidebarSocialLinks || DEFAULT_FORMAT2_SOCIAL_LINKS;
    setEditingProfile({
      ...editingProfile,
      sidebarSocialLinks: current.filter((s) => s.id !== id),
    });
  };

  const handleAddGalleryRow = () => {
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
    const currentRows = editingProfile.galleryRows || [];
    setEditingProfile({
      ...editingProfile,
      galleryRows: currentRows.filter((r) => r.id !== rowId),
    });
  };

  const handleAddItemToRow = (rowId: string) => {
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
    const currentRows = editingProfile.galleryRows || [];

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

  const handleFormat2BatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);

    try {
      setIsUploadingFormat2Gallery(true);
      if (showToast) showToast(`Uploading ${files.length} pictures concurrently from computer for gallery...`);
      const results = await uploadMultipleMediaFiles(files, adminFetch);
      if (results && results.length > 0) {
        let currentRows = editingProfile.galleryRows && editingProfile.galleryRows.length > 0
          ? [...editingProfile.galleryRows]
          : [];

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

  const handleFormat2SingleItemUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFormat2RowItem) return;

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

  const handleApplyFormat2TextToAll = (overrideText?: string) => {
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

  const handleFormat2MasterTextChange = (newText: string) => {
    setFormat2MasterText(newText);
    if (format2ContentMode === "same") {
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

  return (
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

        {/* Lower Part: Social Links */}
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

      {/* PART 3: GALLERY ROWS (MAX 7 PER ROW) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3.5">
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

        {/* Content Mode Toggle */}
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

        {/* Master Text Input Bar */}
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

                {/* Items in this row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
                  {(row.items || []).map((it, itIdx) => (
                    <div
                      key={it.id || itIdx}
                      className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-2.5 relative group/editcard"
                    >
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

                      <div className="w-full h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative group cursor-pointer">
                        <img
                          src={it.imageUrl}
                          alt={it.text || `Card ${itIdx + 1}`}
                          onError={(e) => {
                            const t = e.currentTarget;
                            if (t.src !== DEFAULT_IMAGE_FALLBACK) t.src = DEFAULT_IMAGE_FALLBACK;
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onClick={() => onEnlargeMedia?.({ imageUrl: it.imageUrl, title: it.title || it.text, text: it.text })}
                          title="Click to enlarge 🔍"
                        />
                        <button
                          type="button"
                          onClick={() => onEnlargeMedia?.({ imageUrl: it.imageUrl, title: it.title || it.text, text: it.text })}
                          className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors backdrop-blur-xs"
                          title="Zoom"
                        >
                          <span>🔍</span>
                          <span>Enlarge</span>
                        </button>
                      </div>

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
  );
};

export default Format2Controls;
