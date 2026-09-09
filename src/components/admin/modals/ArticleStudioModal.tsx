"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArticleItem, BuyButton, SpecItem, SubArticle } from "@/types/admin";

interface ArticleStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingArticle: ArticleItem | null;
  onArticleSaved: (article?: ArticleItem) => void;
  onDeleteArticle?: (id: number) => void;
  showToast: (msg: string) => void;
}

export default function ArticleStudioModal({
  isOpen,
  onClose,
  editingArticle,
  onArticleSaved,
  onDeleteArticle,
  showToast,
}: ArticleStudioModalProps) {
  // Form State
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("HARDWARE & AI WORKSTATIONS");
  const [articleAuthor, setArticleAuthor] = useState("Editorial Desk");
  const [articleReadTime, setArticleReadTime] = useState("5 min read");
  const [articleCover, setArticleCover] = useState("");
  const [articleVideo, setArticleVideo] = useState("");
  const [articleAudio, setArticleAudio] = useState("");
  const [articleNote, setArticleNote] = useState("");
  const [articleStatus, setArticleStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [sourceNews, setSourceNews] = useState<string>("");
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const [pros, setPros] = useState<string[]>([
    "Field-leading battery endurance (21+ hours continuous development)",
    "Vivid 2.8K OLED 120Hz display with 100% DCI-P3 color gamut",
    "Whisper-quiet acoustic fan noise below 24 dB under load",
  ]);

  const [cons, setCons] = useState<string[]>([
    "Plastic keyboard deck could benefit from internal stiffening",
    "Soldered RAM and non-expandable secondary storage bay",
  ]);

  const [specs, setSpecs] = useState<SpecItem[]>([
    { key: "Processor (CPU)", value: "Qualcomm Snapdragon X Elite (12 Cores, up to 3.8 GHz)" },
    { key: "Memory (RAM)", value: "32GB LPDDR5X-8448 MHz Dual Channel" },
    { key: "Battery Life", value: "21 Hours 14 Minutes (Labs Tested)" },
  ]);

  const [buyButtons, setBuyButtons] = useState<BuyButton[]>([
    { store: "Amazon", text: "$899 at Amazon", url: "https://amazon.com", color: "#FF9900" },
    { store: "Walmart", text: "$953 at Walmart", url: "https://walmart.com", color: "#0071DC" },
  ]);

  const [subArticles, setSubArticles] = useState<SubArticle[]>([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  // Sync editing article when opened
  useEffect(() => {
    if (editingArticle) {
      setArticleTitle(editingArticle.title || "");
      setArticleCategory(editingArticle.category || "HARDWARE & AI WORKSTATIONS");
      setArticleAuthor(editingArticle.author || "Editorial Staff");
      setArticleReadTime(editingArticle.read_time || "5 min read");
      setArticleCover(editingArticle.cover_photo_url || "");
      setArticleVideo(editingArticle.video_embed_url || "");
      setArticleAudio(editingArticle.audio_stream_url || "");
      setArticleNote(editingArticle.editor_note || "");
      setArticleStatus(editingArticle.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT");
      setSourceNews(editingArticle.source_news || "");
      try {
        setPros(typeof editingArticle.pros === "string" ? JSON.parse(editingArticle.pros) : editingArticle.pros || []);
        setCons(typeof editingArticle.cons === "string" ? JSON.parse(editingArticle.cons) : editingArticle.cons || []);
        setSpecs(typeof editingArticle.specs === "string" ? JSON.parse(editingArticle.specs) : editingArticle.specs || []);
        setBuyButtons(typeof editingArticle.buy_buttons === "string" ? JSON.parse(editingArticle.buy_buttons) : editingArticle.buy_buttons || []);
      } catch {
        // Fallback
      }
      if (editorRef.current) {
        editorRef.current.innerHTML = editingArticle.content || "<p>Detailed article blueprint content...</p>";
      }
    } else {
      setArticleTitle("");
      setArticleCategory("HARDWARE & AI WORKSTATIONS");
      setArticleAuthor("Dr. Sarah Jenkins (Chief Systems Architect)");
      setArticleReadTime("5 min read");
      setArticleCover("");
      setArticleVideo("");
      setArticleAudio("");
      setArticleNote("");
      setArticleStatus("DRAFT");
      setSourceNews("");
      setPros([
        "Field-leading battery endurance (21+ hours continuous development)",
        "Vivid 2.8K OLED 120Hz display with 100% DCI-P3 color gamut",
      ]);
      setCons([
        "Soldered RAM and non-expandable secondary storage bay",
      ]);
      setSpecs([
        { key: "Architecture", value: "ARMv9 / 3nm Lithography Node" },
      ]);
      setBuyButtons([]);
      setSubArticles([]);
      if (editorRef.current) {
        editorRef.current.innerHTML = "<p>Draft editorial analysis and technical specifications...</p>";
      }
    }
  }, [editingArticle]);

  if (!isOpen) return null;

  // WYSIWYG Helpers
  const formatDoc = (cmd: string, val: string | null = null) => {
    document.execCommand(cmd, false, val ?? undefined);
    editorRef.current?.focus();
  };

  const applyCustomFontSize = (size: string) => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed) {
      document.execCommand("fontSize", false, "4");
      return;
    }
    const range = sel.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = size;
    span.appendChild(range.extractContents());
    range.insertNode(span);
    editorRef.current?.focus();
  };

  const applyGradientText = (gradient: string) => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement("span");
    span.style.background = gradient;
    span.style.webkitBackgroundClip = "text";
    (span.style as unknown as Record<string, string>).webkitTextFillColor = "transparent";
    span.style.fontWeight = "800";
    span.style.display = "inline-block";
    span.appendChild(range.extractContents());
    range.insertNode(span);
    editorRef.current?.focus();
  };

  const insertCalloutBox = (type: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string; title: string }> = {
      info: { bg: "#EFF6FF", border: "#3B82F6", text: "#1E40AF", icon: "ℹ️", title: "Information Note" },
      success: { bg: "#ECFDF5", border: "#10B981", text: "#065F46", icon: "✓", title: "Editor's Verdict / Success" },
      warning: { bg: "#FEFCE8", border: "#F59E0B", text: "#854D0E", icon: "⚠️", title: "Benchmark / Hardware Warning" },
      danger: { bg: "#FEF2F2", border: "#EF4444", text: "#991B1B", icon: "🛑", title: "Caution / Architecture Limitation" },
    };
    const cfg = colors[type] || { bg: "#F8FAFC", border: "#94A3B8", text: "#1E293B", icon: "💡", title: "Key Insight" };
    const html = `<div style="background:${cfg.bg};border-left:4px solid ${cfg.border};padding:14px 18px;border-radius:4px;margin:14px 0;color:${cfg.text};font-size:14px;line-height:1.6;"><strong>${cfg.icon} ${cfg.title}:</strong> Type your highlighted analysis or takeaway here...</div><p><br></p>`;
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, html);
  };

  const insertCustomBullet = (type: string) => {
    const style = type === "circle" ? 'style="list-style-type: circle;"' : 'style="list-style-type: square;"';
    const html = `<ul ${style} style="padding-left:24px;margin:12px 0;"><li>First key takeaway point</li><li>Second architectural insight</li><li>Third benchmark measurement</li></ul><p><br></p>`;
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, html);
  };

  const insertCustomNumbering = (type: string) => {
    const html = `<ol style="list-style-type:${type};padding-left:24px;margin:12px 0;"><li>Phase 1: Lab Environment Setup</li><li>Phase 2: Workload Stress-Testing</li><li>Phase 3: Thermal &amp; Power Efficiency Analysis</li></ol><p><br></p>`;
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, html);
  };

  const promptCustomTableMatrix = () => {
    const rowsStr = prompt("Enter number of Table Rows:", "4") || "4";
    const colsStr = prompt("Enter number of Table Columns:", "4") || "4";
    let rows = parseInt(rowsStr, 10);
    let cols = parseInt(colsStr, 10);
    if (isNaN(rows) || rows < 1) rows = 3;
    if (isNaN(cols) || cols < 1) cols = 3;

    let html = '<div style="overflow-x:auto;margin:16px 0;"><table style="width:100%;border-collapse:collapse;text-align:left;font-size:13px;border:1px solid #CBD5E1;"><thead><tr style="background:#1E293B;color:#FFFFFF;font-weight:700;">';
    for (let c = 0; c < cols; c++) {
      html += `<th style="padding:10px 14px;border:1px solid #CBD5E1;color:#fff;">Column ${c + 1}</th>`;
    }
    html += "</tr></thead><tbody>";
    for (let r = 0; r < rows - 1; r++) {
      const bg = r % 2 === 1 ? "background:#F8FAFC;" : "background:#FFFFFF;";
      html += `<tr style="${bg}">`;
      for (let c = 0; c < cols; c++) {
        html += `<td style="padding:10px 14px;border:1px solid #CBD5E1;">Data (${r + 1}, ${c + 1})</td>`;
      }
      html += "</tr>";
    }
    html += "</tbody></table></div><p><br></p>";
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, html);
  };

  const getActiveTable = () => {
    const sel = window.getSelection();
    if (!sel || !sel.anchorNode) return null;
    const el = sel.anchorNode.nodeType === 1 ? (sel.anchorNode as HTMLElement) : sel.anchorNode.parentElement;
    return el ? (el.closest("table") as HTMLTableElement | null) : null;
  };

  const addTableRow = () => {
    const tbl = getActiveTable() || editorRef.current?.querySelector("table");
    if (!tbl) {
      alert("Please insert or click inside a table first!");
      return;
    }
    const colsCount = tbl.rows[0] ? tbl.rows[0].cells.length : 3;
    const newRow = tbl.insertRow(-1);
    newRow.style.background = tbl.rows.length % 2 === 0 ? "#F8FAFC" : "#FFFFFF";
    for (let i = 0; i < colsCount; i++) {
      const cell = newRow.insertCell(-1);
      cell.style.cssText = "padding:10px 14px;border:1px solid #CBD5E1;";
      cell.textContent = "New Data";
    }
  };

  const addTableCol = () => {
    const tbl = getActiveTable() || editorRef.current?.querySelector("table");
    if (!tbl) {
      alert("Please insert or click inside a table first!");
      return;
    }
    for (let i = 0; i < tbl.rows.length; i++) {
      const isHead = i === 0 && tbl.rows[0].parentElement?.tagName === "THEAD";
      const cell = isHead ? document.createElement("th") : tbl.rows[i].insertCell(-1);
      if (isHead) {
        cell.style.cssText = "padding:10px 14px;border:1px solid #CBD5E1;background:#1E293B;color:#fff;font-weight:700;";
        cell.textContent = "New Col";
        tbl.rows[0].appendChild(cell);
      } else {
        cell.style.cssText = "padding:10px 14px;border:1px solid #CBD5E1;";
        cell.textContent = "Cell";
      }
    }
  };

  const deleteTableRow = () => {
    const tbl = getActiveTable() || editorRef.current?.querySelector("table");
    if (tbl && tbl.rows.length > 1) {
      tbl.deleteRow(tbl.rows.length - 1);
    }
  };

  const deleteTableCol = () => {
    const tbl = getActiveTable() || editorRef.current?.querySelector("table");
    if (tbl) {
      for (let i = 0; i < tbl.rows.length; i++) {
        if (tbl.rows[i].cells.length > 1) {
          tbl.rows[i].deleteCell(tbl.rows[i].cells.length - 1);
        }
      }
    }
  };

  const deleteEntireTable = () => {
    const tbl = getActiveTable() || editorRef.current?.querySelector("table");
    if (tbl) {
      tbl.remove();
    } else {
      alert("No table found in the text editor.");
    }
  };

  const insertWebLink = () => {
    const url = prompt("Enter Web Link / URL:", "https://");
    if (url) {
      editorRef.current?.focus();
      document.execCommand("createLink", false, url);
    }
  };

  const insertInlinePhoto = () => {
    const url = prompt("Enter image URL:", "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000");
    if (url) {
      editorRef.current?.focus();
      document.execCommand("insertImage", false, url);
    }
  };

  // Pros, Cons, Specs & Buy Buttons
  const addPro = () => setPros([...pros, ""]);
  const removePro = (index: number) => setPros(pros.filter((_, i) => i !== index));
  const updatePro = (index: number, val: string) => {
    const updated = [...pros];
    updated[index] = val;
    setPros(updated);
  };

  const addCon = () => setCons([...cons, ""]);
  const removeCon = (index: number) => setCons(cons.filter((_, i) => i !== index));
  const updateCon = (index: number, val: string) => {
    const updated = [...cons];
    updated[index] = val;
    setCons(updated);
  };

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const addBuyButton = () => setBuyButtons([...buyButtons, { store: "Amazon", text: "$999 at Store", url: "https://amazon.com", color: "#FF9900" }]);
  const removeBuyButton = (index: number) => setBuyButtons(buyButtons.filter((_, i) => i !== index));
  const updateBuyButton = (index: number, field: keyof BuyButton, val: string) => {
    const updated = [...buyButtons];
    updated[index][field] = val;
    setBuyButtons(updated);
  };

  const addSubArticle = () => {
    setSubArticles([
      ...subArticles,
      {
        id: Date.now().toString(),
        title: "Dell XPS 16 / ThinkPad P1 Gen 7 (Secondary Benchmark)",
        content: "Detailed testing of the secondary workstation under multi-threaded compilation workloads and GPU thermal limits.",
      },
    ]);
  };

  const removeSubArticle = (id: string) => {
    setSubArticles(subArticles.filter((s) => s.id !== id));
  };

  const updateSubArticle = (id: string, field: "title" | "content", val: string) => {
    setSubArticles(subArticles.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  // Save Handler with status ("DRAFT" | "PUBLISHED")
  const handleSaveWithStatus = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    setSaving(true);
    const contentHtml = editorRef.current?.innerHTML || "";
    const payload = {
      title: articleTitle.trim() || "Untitled Article",
      category: articleCategory.trim() || "GENERAL",
      author: articleAuthor.trim() || "Editorial Staff",
      read_time: articleReadTime.trim() || "5 min read",
      cover_photo_url: articleCover.trim(),
      video_embed_url: articleVideo.trim(),
      audio_stream_url: articleAudio.trim(),
      editor_note: articleNote.trim(),
      content: contentHtml,
      pros,
      cons,
      specs,
      buy_buttons: buyButtons,
      sub_articles: subArticles,
      status: targetStatus,
      source_news: sourceNews,
    };

    try {
      if (editingArticle?.id) {
        const res = await fetch(`/api/admin/articles/${editingArticle.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          onArticleSaved(data.article);
          setSuccess(true);
          setArticleStatus(targetStatus);
          showToast(
            targetStatus === "PUBLISHED"
              ? `✓ Article "${payload.title}" published to Knowledge Center!`
              : `✓ Draft "${payload.title}" saved successfully!`
          );
          setTimeout(() => {
            setSuccess(false);
            onClose();
          }, 900);
        } else {
          throw new Error(data.error || "Failed to update article");
        }
      } else {
        const res = await fetch("/api/admin/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          onArticleSaved(data.article);
          setSuccess(true);
          setArticleStatus(targetStatus);
          showToast(
            targetStatus === "PUBLISHED"
              ? `✓ Article published to Knowledge Center!`
              : `✓ Draft saved to News Editorial Drafts!`
          );
          setTimeout(() => {
            setSuccess(false);
            onClose();
          }, 900);
        } else {
          throw new Error(data.error || "Failed to create article");
        }
      }
    } catch (err: any) {
      showToast(err.message || "Error saving article to database");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDraft = async () => {
    if (!editingArticle?.id) return;
    if (!confirm(`Permanently delete article "${articleTitle || editingArticle.id}"?`)) return;
    try {
      if (onDeleteArticle) {
        onDeleteArticle(editingArticle.id);
        onClose();
      } else {
        const res = await fetch(`/api/admin/articles/${editingArticle.id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          onArticleSaved();
          showToast(`✓ Article #${editingArticle.id} deleted successfully`);
          onClose();
        } else {
          throw new Error(data.error || "Failed to delete");
        }
      }
    } catch (err: any) {
      showToast(err.message || "Failed to delete article");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col text-left">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between sticky top-0 bg-white z-20">
          <div>
            <div className="inline-flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 bg-[#0052FF] text-white text-[10.5px] font-bold uppercase rounded-sm">
                ALL-IN-ONE STUDIO
              </span>
              <span
                className={`px-2.5 py-0.5 text-[10.5px] font-bold uppercase rounded-sm flex items-center gap-1 ${
                  articleStatus === "PUBLISHED"
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-400 text-amber-950"
                }`}
              >
                {articleStatus === "PUBLISHED" ? "🚀 PUBLISHED" : "📝 DRAFT"}
              </span>
              <h3 className="text-lg font-bold text-[#030712]">
                {editingArticle
                  ? `Edit Blueprint Article #${editingArticle.id}`
                  : "Create Knowledge Article Draft"}
              </h3>
            </div>
            <p className="text-xs text-gray-500 font-normal">
              Review wire source, edit editorial analysis, customize benchmark specs, and decide whether to publish or keep as draft.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveWithStatus(articleStatus);
          }}
          className="p-6 flex flex-col gap-6"
        >
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs font-bold rounded">
              ✓ Article successfully saved and stored in PostgreSQL!
            </div>
          )}

          {/* Source News Reference Card (Matching Screenshot 2) */}
          {sourceNews && (
            <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-lg shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded flex items-center gap-1">
                  <span>📰</span> Source News Reference
                </span>
                <span className="text-[11px] font-semibold text-amber-800">
                  Status: <span className="uppercase font-bold">{articleStatus}</span>
                </span>
              </div>
              <div className="text-xs font-bold text-gray-900 leading-snug">
                ORIGINAL WIRE: {sourceNews}
              </div>
              <div className="text-[11px] text-gray-600 flex items-center gap-3">
                <span>Category: <strong className="text-gray-800">{articleCategory}</strong></span>
                <span>•</span>
                <span>Author: <strong className="text-gray-800">{articleAuthor}</strong></span>
                <span>•</span>
                <span>Read Time: <strong className="text-gray-800">{articleReadTime}</strong></span>
              </div>
            </div>
          )}

          {/* 1. ARTICLE HEADLINE & METADATA */}
          <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🖋️</span> <span>1. ARTICLE HEADLINE &amp; METADATA</span>
            </h4>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Article Headline / Title *
              </label>
              <input
                type="text"
                required
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] font-bold"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Category *</label>
                <input
                  type="text"
                  required
                  value={articleCategory}
                  onChange={(e) => setArticleCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Author / Reviewer *</label>
                <input
                  type="text"
                  required
                  value={articleAuthor}
                  onChange={(e) => setArticleAuthor(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Estimated Read Time</label>
                <input
                  type="text"
                  value={articleReadTime}
                  onChange={(e) => setArticleReadTime(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF]"
                />
              </div>
            </div>
          </div>

          {/* 2. MULTIMEDIA SUITE */}
          <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>📷</span> <span>2. MULTIMEDIA SUITE (PICTURE, 4K VIDEO EMBED &amp; AUDIO PODCAST)</span>
            </h4>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">🌄 Cover Photo URL *</label>
              <input
                type="url"
                required
                value={articleCover}
                onChange={(e) => setArticleCover(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  📹 4K Video Embed URL (YouTube / Vimeo)
                </label>
                <input
                  type="text"
                  value={articleVideo}
                  onChange={(e) => setArticleVideo(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  🎙️ Audio Briefing / Podcast Stream URL
                </label>
                <input
                  type="text"
                  value={articleAudio}
                  onChange={(e) => setArticleAudio(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF]"
                />
              </div>
            </div>
          </div>

          {/* 3. FULL-POWER RICH TEXT WYSIWYG & DYNAMIC TABLE STUDIO */}
          <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>✍️</span> <span>3. FULL-POWER RICH TEXT WYSIWYG &amp; DYNAMIC TABLE STUDIO</span>
              </h4>
              <span className="text-[10px] font-bold text-[#0052FF] uppercase">
                FULL STYLING &amp; TABLE CONTROLS ACTIVE
              </span>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Editors&apos; Note / Highlight Banner *
              </label>
              <textarea
                rows={2}
                value={articleNote}
                onChange={(e) => setArticleNote(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] resize-none leading-relaxed"
              />
            </div>

            {/* FULL-POWER INTERACTIVE TOOLBAR */}
            <div className="p-3 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg flex flex-col gap-2 text-xs select-none">
              {/* Row 1: Font Size & Headings */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="flex items-center gap-1 bg-white border border-[#CBD5E1] px-2 py-1 rounded">
                  <span className="text-[11px] font-semibold text-[#64748B]">Size:</span>
                  <select
                    onChange={(e) => applyCustomFontSize(e.target.value)}
                    defaultValue="16px"
                    className="text-xs font-bold border-none outline-none bg-transparent cursor-pointer"
                  >
                    <option value="12px">12 px</option>
                    <option value="14px">14 px</option>
                    <option value="16px">16 px (Normal Body)</option>
                    <option value="18px">18 px</option>
                    <option value="20px">20 px</option>
                    <option value="24px">24 px (H3 Subheading)</option>
                    <option value="32px">32 px (H2 Section)</option>
                    <option value="40px">40 px (H1 Title)</option>
                  </select>
                </div>

                <select
                  onChange={(e) => {
                    formatDoc("formatBlock", e.target.value);
                    e.target.selectedIndex = 0;
                  }}
                  className="px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs font-bold cursor-pointer"
                >
                  <option value="" disabled>Headings ▾</option>
                  <option value="<p>">Paragraph (Normal)</option>
                  <option value="<h1>">Heading 1</option>
                  <option value="<h2>">Heading 2</option>
                  <option value="<h3>">Heading 3</option>
                  <option value="<blockquote>">“ Blockquote</option>
                  <option value="<pre>">💻 Code Block</option>
                </select>

                <button type="button" onClick={() => formatDoc("bold")} className="px-2.5 py-1 bg-white border border-[#CBD5E1] font-extrabold rounded hover:bg-gray-100 cursor-pointer">B</button>
                <button type="button" onClick={() => formatDoc("italic")} className="px-2.5 py-1 bg-white border border-[#CBD5E1] italic font-bold rounded hover:bg-gray-100 cursor-pointer">I</button>
                <button type="button" onClick={() => formatDoc("underline")} className="px-2.5 py-1 bg-white border border-[#CBD5E1] underline font-bold rounded hover:bg-gray-100 cursor-pointer">U</button>
                <button type="button" onClick={() => formatDoc("strikeThrough")} className="px-2.5 py-1 bg-white border border-[#CBD5E1] line-through rounded hover:bg-gray-100 cursor-pointer">S</button>
                <button type="button" onClick={() => formatDoc("subscript")} className="px-2 py-1 bg-white border border-[#CBD5E1] text-[11px] font-bold rounded hover:bg-gray-100 cursor-pointer">X₂</button>
                <button type="button" onClick={() => formatDoc("superscript")} className="px-2 py-1 bg-white border border-[#CBD5E1] text-[11px] font-bold rounded hover:bg-gray-100 cursor-pointer">X²</button>
                <button type="button" onClick={() => formatDoc("removeFormat")} className="px-2 py-1 bg-red-50 text-red-600 border border-red-200 text-[11px] font-bold rounded hover:bg-red-100 cursor-pointer">✓ Clear</button>
              </div>

              {/* Row 2: Colors & Callout Boxes */}
              <div className="flex items-center gap-2 flex-wrap border-t border-[#CBD5E1] pt-1.5">
                <div className="flex items-center gap-1 bg-white border border-[#CBD5E1] px-2 py-0.5 rounded">
                  <span className="text-[11px] font-bold text-[#64748B]">🎨 Text Color:</span>
                  <input
                    type="color"
                    defaultValue="#0F172A"
                    onChange={(e) => formatDoc("foreColor", e.target.value)}
                    className="w-5 h-5 cursor-pointer border-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-1 bg-white border border-[#CBD5E1] px-2 py-0.5 rounded">
                  <span className="text-[11px] font-bold text-[#64748B]">🖍️ Highlight:</span>
                  <input
                    type="color"
                    defaultValue="#FEF08A"
                    onChange={(e) => formatDoc("hiliteColor", e.target.value)}
                    className="w-5 h-5 cursor-pointer border-none bg-transparent"
                  />
                </div>

                <select
                  onChange={(e) => {
                    applyGradientText(e.target.value);
                    e.target.selectedIndex = 0;
                  }}
                  className="px-2 py-1 bg-white border border-[#CBD5E1] rounded text-[11.5px] font-bold text-[#0052FF] cursor-pointer"
                >
                  <option value="" disabled>Gradient Text ▾</option>
                  <option value="linear-gradient(135deg, #FF512F 0%, #DD2476 100%)">🌅 Sunset Flame</option>
                  <option value="linear-gradient(135deg, #0052FF 0%, #00D2FF 100%)">⚡ Electric Cyan-Blue</option>
                  <option value="linear-gradient(135deg, #10B981 0%, #059669 100%)">🌿 Cyber Emerald</option>
                  <option value="linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)">🔮 Neon Purple-Pink</option>
                </select>

                <select
                  onChange={(e) => {
                    insertCalloutBox(e.target.value);
                    e.target.selectedIndex = 0;
                  }}
                  className="px-2 py-1 bg-white border border-[#CBD5E1] rounded text-[11.5px] font-bold cursor-pointer"
                >
                  <option value="" disabled>Insert Alert Box ▾</option>
                  <option value="info">🔵 Info Note (Blue)</option>
                  <option value="success">🟢 Success / Verdict (Green)</option>
                  <option value="warning">🟡 Warning / Benchmark (Yellow)</option>
                  <option value="danger">🔴 Caution / Limitation (Red)</option>
                </select>
              </div>

              {/* Row 3: Bullets & Numbering */}
              <div className="flex items-center gap-1.5 flex-wrap border-t border-[#CBD5E1] pt-1.5">
                <div className="flex items-center gap-1 bg-white border border-[#CBD5E1] px-2 py-0.5 rounded text-[11px] font-bold text-[#64748B]">
                  <span>Bullets:</span>
                  <button type="button" onClick={() => formatDoc("insertUnorderedList")} className="px-1.5 py-0.5 hover:bg-gray-100 rounded">• Disc</button>
                  <button type="button" onClick={() => insertCustomBullet("circle")} className="px-1.5 py-0.5 hover:bg-gray-100 rounded">◦ Circle</button>
                  <button type="button" onClick={() => insertCustomBullet("square")} className="px-1.5 py-0.5 hover:bg-gray-100 rounded">▪ Square</button>
                </div>

                <div className="flex items-center gap-1 bg-white border border-[#CBD5E1] px-2 py-0.5 rounded text-[11px] font-bold text-[#64748B]">
                  <span>Numbers:</span>
                  <button type="button" onClick={() => formatDoc("insertOrderedList")} className="px-1.5 py-0.5 hover:bg-gray-100 rounded">1. 2. 3.</button>
                  <button type="button" onClick={() => insertCustomNumbering("upper-roman")} className="px-1.5 py-0.5 hover:bg-gray-100 rounded">I. II. III.</button>
                  <button type="button" onClick={() => insertCustomNumbering("upper-alpha")} className="px-1.5 py-0.5 hover:bg-gray-100 rounded">A. B. C.</button>
                </div>

                <div className="flex items-center gap-0.5 bg-white border border-[#CBD5E1] px-1.5 py-0.5 rounded font-bold text-xs">
                  <button type="button" onClick={() => formatDoc("justifyLeft")} title="Align Left" className="px-1.5 py-0.5 hover:bg-gray-100 rounded">⇤</button>
                  <button type="button" onClick={() => formatDoc("justifyCenter")} title="Align Center" className="px-1.5 py-0.5 hover:bg-gray-100 rounded">≡</button>
                  <button type="button" onClick={() => formatDoc("justifyRight")} title="Align Right" className="px-1.5 py-0.5 hover:bg-gray-100 rounded">⇥</button>
                </div>

                <button type="button" onClick={() => formatDoc("indent")} className="px-2 py-1 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold hover:bg-gray-100 cursor-pointer">➔ Indent</button>
                <button type="button" onClick={() => formatDoc("outdent")} className="px-2 py-1 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold hover:bg-gray-100 cursor-pointer">⬅ Outdent</button>
              </div>

              {/* Row 4: Table Studio */}
              <div className="flex items-center gap-2 flex-wrap border-t border-[#CBD5E1] pt-1.5 bg-emerald-50/70 p-2 rounded">
                <span className="text-xs font-bold text-emerald-900">📊 Table Studio:</span>
                <button
                  type="button"
                  onClick={promptCustomTableMatrix}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded cursor-pointer shadow-sm"
                >
                  + Create Custom Table Grid
                </button>
                <div className="flex gap-1 ml-auto flex-wrap">
                  <button type="button" onClick={addTableRow} className="px-2 py-0.5 bg-white border border-emerald-300 text-emerald-700 text-[11px] font-bold rounded hover:bg-emerald-50 cursor-pointer">+ Row</button>
                  <button type="button" onClick={addTableCol} className="px-2 py-0.5 bg-white border border-emerald-300 text-emerald-700 text-[11px] font-bold rounded hover:bg-emerald-50 cursor-pointer">+ Col</button>
                  <button type="button" onClick={deleteTableRow} className="px-2 py-0.5 bg-white border border-red-300 text-red-700 text-[11px] font-bold rounded hover:bg-red-50 cursor-pointer">- Row</button>
                  <button type="button" onClick={deleteTableCol} className="px-2 py-0.5 bg-white border border-red-300 text-red-700 text-[11px] font-bold rounded hover:bg-red-50 cursor-pointer">- Col</button>
                  <button type="button" onClick={deleteEntireTable} className="px-2 py-0.5 bg-red-50 border border-red-300 text-red-600 text-[11px] font-extrabold rounded hover:bg-red-100 cursor-pointer">🗑️ Del Table</button>
                </div>
              </div>

              {/* Row 5: Links & Images */}
              <div className="flex items-center gap-2 flex-wrap border-t border-[#CBD5E1] pt-1.5">
                <button
                  type="button"
                  onClick={insertWebLink}
                  className="px-2.5 py-1 bg-blue-50 text-[#0052FF] border border-blue-200 rounded font-bold text-xs hover:bg-blue-100 cursor-pointer flex items-center gap-1"
                >
                  <span>🔗</span> <span>Insert Link</span>
                </button>
                <button
                  type="button"
                  onClick={insertInlinePhoto}
                  className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded font-bold text-xs hover:bg-purple-100 cursor-pointer flex items-center gap-1"
                >
                  <span>🖼️</span> <span>Insert Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => formatDoc("insertHorizontalRule")}
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded font-bold text-xs hover:bg-gray-100 cursor-pointer"
                >
                  <span>—</span> <span>Divider</span>
                </button>
              </div>
            </div>

            {/* LIVE CONTENTEDITABLE CANVAS */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-[260px] max-h-[460px] p-5 bg-white border-2 border-[#CBD5E1] rounded-lg overflow-y-auto leading-relaxed text-[15px] text-[#1E293B] outline-none focus:border-[#0052FF]"
              dangerouslySetInnerHTML={{
                __html: `
                  <p>The HP OmniBook 5 14 marks a seismic transition in the Windows laptop ecosystem. Built around Qualcomm's 4nm Oryon CPU architecture, it eliminates the historical compromise between high-performance computing and true all-day battery life. In our continuous developer workflow benchmark—which simulates running VS Code, simultaneous local Node.js development servers, 35 active browser tabs, and Slack in the background—the OmniBook 5 cruised through an astonishing 21 hours and 14 minutes before reaching zero percent.</p>
                  <p>The 45 TOPS Hexagon NPU is fully utilized by local AI coding copilot extensions like Continue.dev and Ollama, offloading embedding lookups and lightweight autocompletion from the CPU cores without causing any noticeable battery penalty.</p>
                `,
              }}
            />
          </div>

          {/* 4. PROS & CONS BUILDER */}
          <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚖️</span> <span>4. PROS &amp; CONS BUILDER (KEY ADVANTAGES VS LIMITATIONS)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50/50 border border-green-200 rounded-lg flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-green-800 uppercase">+ PROS (ADVANTAGES)</span>
                  <button
                    type="button"
                    onClick={addPro}
                    className="px-2 py-1 bg-green-600 text-white text-[10.5px] font-bold rounded hover:bg-green-700 cursor-pointer"
                  >
                    + Add Pro
                  </button>
                </div>
                {pros.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={p}
                      onChange={(e) => updatePro(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-green-300 rounded text-gray-800 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removePro(idx)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm px-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-red-50/50 border border-red-200 rounded-lg flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-800 uppercase">- CONS (LIMITATIONS)</span>
                  <button
                    type="button"
                    onClick={addCon}
                    className="px-2 py-1 bg-red-600 text-white text-[10.5px] font-bold rounded hover:bg-red-700 cursor-pointer"
                  >
                    + Add Con
                  </button>
                </div>
                {cons.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => updateCon(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-red-300 rounded text-gray-800 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeCon(idx)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm px-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. TECHNICAL SPECIFICATIONS TABLE */}
          <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚙️</span> <span>5. TECHNICAL SPECIFICATIONS TABLE (KEY-VALUE MATRIX)</span>
              </h4>
              <button
                type="button"
                onClick={addSpec}
                className="px-2.5 py-1 bg-gray-900 text-white text-[10.5px] font-bold rounded hover:bg-black cursor-pointer"
              >
                + Add Spec Row
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {specs.map((s, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Feature / Component"
                    value={s.key}
                    onChange={(e) => updateSpec(idx, "key", e.target.value)}
                    className="w-1/3 px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-800 font-semibold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Specification Value"
                    value={s.value}
                    onChange={(e) => updateSpec(idx, "value", e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-800 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(idx)}
                    className="w-8 h-8 flex items-center justify-center bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 font-bold text-xs rounded cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 6. CUSTOM ACTION & BUY BUTTONS GENERATOR */}
          <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>🛒</span> <span>6. CUSTOM ACTION &amp; BUY BUTTONS GENERATOR</span>
              </h4>
              <button
                type="button"
                onClick={addBuyButton}
                className="px-2.5 py-1 bg-[#0052FF] text-white text-[10.5px] font-bold rounded hover:bg-[#0042D0] cursor-pointer"
              >
                + Add Button
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {buyButtons.map((btn, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1.2fr_1.5fr_2fr_1fr_32px] gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Store (e.g. Amazon)"
                    value={btn.store}
                    onChange={(e) => updateBuyButton(idx, "store", e.target.value)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-800 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Text ($899 at Amazon)"
                    value={btn.text}
                    onChange={(e) => updateBuyButton(idx, "text", e.target.value)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-800 font-bold outline-none"
                  />
                  <input
                    type="url"
                    placeholder="URL (https://...)"
                    value={btn.url}
                    onChange={(e) => updateBuyButton(idx, "url", e.target.value)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-800 outline-none"
                  />
                  <select
                    value={btn.color}
                    onChange={(e) => updateBuyButton(idx, "color", e.target.value)}
                    className="px-2.5 py-1.5 text-xs border border-gray-300 rounded text-gray-800 font-bold outline-none bg-white"
                  >
                    <option value="#FF9900">🟠 Amazon Orange</option>
                    <option value="#0071DC">🔵 Walmart Blue</option>
                    <option value="#0052FF">🔵 Creed Blue</option>
                    <option value="#E11D48">🔴 Crimson Red</option>
                    <option value="#10B981">🟢 Forest Green</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeBuyButton(idx)}
                    className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded font-bold text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC MULTI-ARTICLE BUILDER */}
          {subArticles.map((sub, sIdx) => (
            <div key={sub.id} className="p-5 bg-blue-50/40 border border-blue-200 rounded-lg shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <span className="text-xs font-bold text-[#0052FF] uppercase">
                  Laptop / Workstation Review Section #{sIdx + 2}
                </span>
                <button
                  type="button"
                  onClick={() => removeSubArticle(sub.id)}
                  className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer"
                >
                  🗑️ Remove This Laptop Block
                </button>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Workstation Title</label>
                <input
                  type="text"
                  value={sub.title}
                  onChange={(e) => updateSubArticle(sub.id, "title", e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Review &amp; Benchmark Notes</label>
                <textarea
                  rows={3}
                  value={sub.content}
                  onChange={(e) => updateSubArticle(sub.id, "content", e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white leading-relaxed"
                />
              </div>
            </div>
          ))}

          <div className="p-6 bg-blue-50/70 border-2 border-dashed border-blue-400 rounded-xl text-center flex flex-col items-center gap-2">
            <h4 className="text-sm font-extrabold text-blue-900">
              ➕ Add Another Article / Workstation to This Same Page
            </h4>
            <p className="text-xs text-blue-700 max-w-lg">
              Add as many laptop/workstation reviews as you want to this single mega-guide. Each gets its own media, review text, pros/cons, specs table, and buy links!
            </p>
            <button
              type="button"
              onClick={addSubArticle}
              className="mt-2 px-5 py-2.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded-md shadow transition-all cursor-pointer flex items-center gap-2"
            >
              <span>➕</span> <span>Add Next Article / Laptop to This Page</span>
            </button>
          </div>

          {/* Bottom Actions (Matching User Specs & Screenshot 2) */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              {editingArticle && (
                <button
                  type="button"
                  onClick={handleDeleteDraft}
                  className="px-3.5 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>🗑️</span>
                  <span>Delete {articleStatus === "DRAFT" ? "Draft" : "Article"}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="px-3.5 py-2 text-xs font-bold text-[#0052FF] hover:bg-blue-50 border border-blue-200 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>👁️</span>
                <span>Preview Article ↗</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors"
              >
                Cancel
              </button>
              {articleStatus === "PUBLISHED" ? (
                <>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveWithStatus("DRAFT")}
                    className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>↩️</span>
                    <span>{saving ? "Saving..." : "Unpublish to Draft"}</span>
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveWithStatus("PUBLISHED")}
                    className="px-5 py-2 text-xs font-extrabold text-white bg-[#0052FF] hover:bg-[#0042D0] rounded transition-all shadow hover:shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>🚀</span>
                    <span>{saving ? "Saving..." : "Update Published Article"}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveWithStatus("DRAFT")}
                    className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>💾</span>
                    <span>{saving ? "Saving..." : "Save Draft"}</span>
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveWithStatus("PUBLISHED")}
                    className="px-5 py-2 text-xs font-extrabold text-white bg-[#0052FF] hover:bg-[#0042D0] rounded transition-all shadow hover:shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>🚀</span>
                    <span>{saving ? "Publishing..." : "Publish to Knowledge Center"}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1120] text-slate-100 rounded-xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#0B1120] z-20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">ARTICLE PREVIEW</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                    articleStatus === "PUBLISHED"
                      ? "bg-emerald-600 text-white"
                      : "bg-amber-400 text-amber-950"
                  }`}
                >
                  {articleStatus}
                </span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded cursor-pointer"
              >
                ✕ Close Preview
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-6">
              {articleCover && (
                <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden relative">
                  <img
                    src={articleCover}
                    alt={articleTitle}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#0052FF] text-white text-xs font-bold rounded shadow">
                    {articleCategory}
                  </span>
                </div>
              )}

              <div>
                <div className="text-xs text-slate-400 mb-2">
                  By {articleAuthor} • {articleReadTime}
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  {articleTitle || "Untitled Article"}
                </h1>
              </div>

              {articleNote && (
                <div className="p-4 bg-slate-800/80 border-l-4 border-[#0052FF] rounded text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{articleNote}&rdquo;
                </div>
              )}

              {articleVideo && (
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-700">
                  <iframe
                    src={articleVideo}
                    className="w-full h-full"
                    allowFullScreen
                    title="Video Embed"
                  />
                </div>
              )}

              {articleAudio && (
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-xs font-bold text-slate-300 mb-2">🎧 Audio Intelligence Briefing</div>
                  <audio controls src={articleAudio} className="w-full" />
                </div>
              )}

              <div
                className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: editorRef.current?.innerHTML || "<p>No content provided.</p>",
                }}
              />

              {(pros.length > 0 || cons.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-lg">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase mb-3">✓ Advantages</h4>
                    <ul className="space-y-2 text-xs text-slate-200">
                      {pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-rose-950/40 border border-rose-800/50 rounded-lg">
                    <h4 className="text-xs font-bold text-rose-400 uppercase mb-3">✕ Trade-offs</h4>
                    <ul className="space-y-2 text-xs text-slate-200">
                      {cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {specs.length > 0 && (
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase mb-3">⚙ Technical Specifications</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-slate-300">
                      <tbody>
                        {specs.map((s, i) => (
                          <tr key={i} className="border-b border-slate-800/60">
                            <td className="py-2 pr-4 font-semibold text-slate-400 w-1/3">{s.key}</td>
                            <td className="py-2 text-slate-200">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
