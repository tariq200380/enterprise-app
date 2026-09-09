"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  KnowledgeArticle,
  PeerReview,
  ARTICLES_STORE,
  POST_REVIEWS_STORE,
  SIDEBAR_BRAND_WIRES,
} from "../knowledgeArticlesData";

interface Props {
  articleId: number;
  onCloseReader: () => void;
  onSelectArticle: (id: number) => void;
}

export default function DynamicArticleReader({
  articleId,
  onCloseReader,
  onSelectArticle,
}: Props) {
  // Find current article or fallback to first
  const currentArticle =
    ARTICLES_STORE.find((a) => a.id === articleId) || ARTICLES_STORE[0];

  // Local state for reviews
  const [reviewsMap, setReviewsMap] = useState<Record<number, PeerReview[]>>(POST_REVIEWS_STORE);
  const currentReviews = reviewsMap[currentArticle.id] || POST_REVIEWS_STORE[1];

  // Search filter in left sidebar
  const [searchQuery, setSearchQuery] = useState("");

  // Copy link status
  const [copied, setCopied] = useState(false);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(735); // default ~12:15 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Add Review Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [revName, setRevName] = useState("");
  const [revRole, setRevRole] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [revTitle, setRevTitle] = useState("");
  const [revComment, setRevComment] = useState("");
  const [helpfulClicked, setHelpfulClicked] = useState<Record<number, boolean>>({});

  // Live tech news from API
  const [liveNews, setLiveNews] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/live-news")
      .then((res) => res.json())
      .then((data) => {
        if (data.breaking_news && Array.isArray(data.breaking_news)) {
          setLiveNews(data.breaking_news);
        }
      })
      .catch(() => {});
  }, []);

  // Reset audio when article changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentArticle.id]);

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeekAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const newTime = (val / 100) * duration;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSetSpeed = (spd: number) => {
    setPlaybackSpeed(spd);
    if (audioRef.current) {
      audioRef.current.playbackRate = spd;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/knowledge-center?id=${currentArticle.id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revTitle.trim() || !revComment.trim()) return;

    const newReview: PeerReview = {
      article_id: currentArticle.id,
      name: revName.trim(),
      role: revRole.trim() || "Enterprise Architect",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
      rating: revRating,
      date: "Just Now",
      title: revTitle.trim(),
      comment: revComment.trim(),
      helpful: 1,
    };

    setReviewsMap((prev) => {
      const existing = prev[currentArticle.id] || [];
      return {
        ...prev,
        [currentArticle.id]: [newReview, ...existing],
      };
    });

    setRevName("");
    setRevRole("");
    setRevTitle("");
    setRevComment("");
    setIsReviewModalOpen(false);
  };

  // Filtered sidebar articles
  const filteredArticles = ARTICLES_STORE.filter((art) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.author.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full text-left">
      {/* 1. BREADCRUMB / RETURN NAVIGATION BAR */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-7 border-b-2 border-[#E2E8F0]">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#64748B]">
          <button
            type="button"
            onClick={onCloseReader}
            className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-md text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>&larr;</span>
            <span>Back to Grid Overview</span>
          </button>
          <span>/</span>
          <span className="text-[#0052FF] font-extrabold uppercase tracking-wide">
            {currentArticle.category}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyLink}
          className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-[#CBD5E1] rounded-md text-xs font-bold text-[#334155] cursor-pointer inline-flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <span>{copied ? "✓ Copied!" : "🔗 Copy Direct Link"}</span>
        </button>
      </div>

      {/* 2. RESPONSIVE 3-COLUMN STUDIO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_300px] gap-6 items-start w-full">
        {/* ================= COLUMN 1: LEFT NAVIGATOR ================= */}
        <aside className="w-full flex flex-col gap-4 lg:sticky lg:top-[90px] max-h-[85vh] overflow-y-auto pr-1">
          {/* Search Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-extrabold text-[#0052FF] uppercase tracking-wider mb-2">
              📚 ALL ARTICLES &amp; BLUEPRINTS
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-3 py-1.5 border border-[#CBD5E1] rounded-md text-xs bg-[#F8FAFC] focus:outline-none focus:border-[#0052FF]"
            />
          </div>

          {/* Articles Quick Switch List */}
          <div className="flex flex-col gap-2">
            {filteredArticles.map((art) => {
              const isActive = art.id === currentArticle.id;
              const catShort = art.category.split("&")[0].trim();
              return (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => onSelectArticle(art.id)}
                  className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isActive
                      ? "bg-[#EFF6FF] border-[#0052FF] shadow-xs"
                      : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-gray-50/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[9.5px] font-extrabold uppercase tracking-wide ${
                        isActive ? "text-[#0052FF]" : "text-[#475569]"
                      }`}
                    >
                      {catShort}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-medium">
                      {art.read_time}
                    </span>
                  </div>
                  <h5
                    className={`text-[12px] font-bold leading-snug line-clamp-2 m-0 ${
                      isActive ? "text-[#0F172A]" : "text-[#334155]"
                    }`}
                  >
                    {art.title}
                  </h5>
                </button>
              );
            })}
          </div>

          {/* Breaking Brand Wires Widget */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-extrabold text-[#EF4444] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping"></span>
                ⚡ LIVE BRAND WIRES
              </span>
              <span className="text-[9.5px] font-mono text-[#10B981] font-bold">● LIVE</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {liveNews.length > 0
                ? liveNews.slice(0, 6).map((wire, idx) => (
                    <a
                      key={idx}
                      href={wire.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-[#F0F7FF] border border-transparent hover:border-[#BFDBFE] cursor-pointer transition-all flex items-center gap-2.5 text-left group"
                    >
                      <div className="w-11 h-11 rounded-md overflow-hidden bg-[#0B1120] shrink-0">
                        <img
                          src={wire.img || "/uploads/live_news/apple_iphone16_hero.jpg"}
                          alt={wire.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-[9px] font-extrabold uppercase tracking-wide block truncate"
                          style={{ color: wire.providerColor || "#0052FF" }}
                        >
                          {wire.providerLabel || wire.tag}
                        </span>
                        <h5 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0052FF] leading-tight line-clamp-2 transition-colors">
                          {wire.title}
                        </h5>
                      </div>
                    </a>
                  ))
                : SIDEBAR_BRAND_WIRES.map((wire, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded hover:bg-[#F8FAFC] cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                    >
                      <span className="text-xs font-bold text-[#0052FF] block truncate">
                        {wire.icon} {wire.title}
                      </span>
                      <span className="text-[10px] text-[#64748B] uppercase font-semibold block truncate">
                        {wire.category}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </aside>

        {/* ================= COLUMN 2: EXPANSIVE CENTER READING STUDIO ================= */}
        <main className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* Header Metadata */}
          <div className="mb-6 pb-5 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2 flex-wrap mb-3 text-xs text-[#64748B]">
              <span className="bg-[#EF4444] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wide">
                {currentArticle.category}
              </span>
              <span>•</span>
              <span>{currentArticle.date}</span>
              <span>•</span>
              <span className="font-semibold text-[#0F172A]">
                ⏱️ {currentArticle.read_time}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-[#0F172A] tracking-[-0.025em] leading-[1.25] mb-4">
              {currentArticle.title}
            </h1>

            {/* Author Profile */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0052FF] text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                CT
              </div>
              <div>
                <div className="text-sm font-bold text-[#0F172A]">
                  {currentArticle.author}
                </div>
                <div className="text-xs text-[#64748B]">
                  {currentArticle.author_role || "Senior Systems Architecture Fellow"}
                </div>
              </div>
            </div>
          </div>

          {/* Editors Note Box */}
          {currentArticle.editors_note && (
            <div className="bg-[#FFF5F5] border-l-4 border-[#E11D48] rounded-r-lg p-4 sm:p-5 mb-6">
              <div className="text-[11px] font-extrabold text-[#E11D48] uppercase tracking-wider mb-1">
                EDITORS&apos; NOTE &amp; LABS METHODOLOGY
              </div>
              <p className="text-[13.5px] text-[#334155] leading-relaxed italic m-0">
                {currentArticle.editors_note}
              </p>
            </div>
          )}

          {/* Intro Paragraphs */}
          <div className="space-y-4 mb-7 text-[15px] sm:text-[15.5px] text-[#334155] leading-relaxed">
            {currentArticle.intro_paragraphs.map((para, idx) => (
              <p key={idx} className="m-0">
                {para}
              </p>
            ))}
          </div>

          {/* Audio Player */}
          <div className="bg-[#0F172A] text-white rounded-xl p-5 sm:p-6 mb-7 border border-[#1E293B]">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <span className="text-[13.5px] font-bold text-[#F8FAFC]">
                🎧 Audio Briefing Podcast &amp; Teardown
              </span>
              <span className="text-[11px] text-[#94A3B8] font-mono">
                Studio 96kHz Master
              </span>
            </div>

            <audio
              ref={audioRef}
              src={currentArticle.audio_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
              onTimeUpdate={handleAudioTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />

            <div className="flex items-center gap-3.5 flex-wrap">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlayAudio}
                className="w-10 h-10 rounded-full bg-[#0052FF] hover:bg-[#0043D6] text-white flex items-center justify-center text-sm font-bold shadow-md cursor-pointer transition-colors shrink-0"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              {/* Scrubber & Time */}
              <div className="flex-1 min-w-[180px] flex flex-col gap-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeekAudio}
                  className="w-full cursor-pointer accent-[#0052FF]"
                />
                <div className="flex justify-between text-[11px] text-[#94A3B8] font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Speed Controls */}
              <div className="flex items-center gap-1">
                {[1.0, 1.5, 2.0].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => handleSetSpeed(spd)}
                    className={`px-2 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                      playbackSpeed === spd
                        ? "bg-[#0052FF] text-white"
                        : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    {spd.toFixed(1)}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product / Blueprint Breakdown Cards */}
          {currentArticle.products && currentArticle.products.length > 0 && (
            <div className="space-y-7 mb-8">
              {currentArticle.products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs"
                >
                  {/* Visual + Title Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-5 mb-5 items-center">
                    <div className="h-48 rounded-lg overflow-hidden bg-[#0B1120] relative">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-[#E11D48] uppercase tracking-wider block mb-1">
                        {prod.award}
                      </span>
                      <h3 className="text-xl sm:text-[1.35rem] font-extrabold text-[#0F172A] leading-tight mb-2">
                        {prod.name}
                      </h3>
                      <div className="text-sm font-extrabold text-[#0052FF] mb-3">
                        {prod.price} • ★★★★★ ({prod.rating})
                      </div>
                      <div className="text-[13.5px] text-[#475569] leading-relaxed">
                        {prod.long_text || prod.description}
                      </div>
                    </div>
                  </div>

                  {/* Two-Column Pros & Cons Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    {/* Pros */}
                    <div className="p-4 rounded-lg bg-[#F0FDF4] border border-[#86EFAC]">
                      <div className="text-[11px] font-black text-[#166534] uppercase tracking-wider mb-2">
                        PROS (KEY ADVANTAGES)
                      </div>
                      <ul className="space-y-1.5 m-0 p-0 list-none">
                        {prod.pros.map((pro, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-[#14532D] leading-snug"
                          >
                            <span className="text-[#16A34A] font-extrabold">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="p-4 rounded-lg bg-[#FEF2F2] border border-[#FECACA]">
                      <div className="text-[11px] font-black text-[#991B1B] uppercase tracking-wider mb-2">
                        CONS (LIMITATIONS)
                      </div>
                      <ul className="space-y-1.5 m-0 p-0 list-none">
                        {prod.cons.map((con, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-[#7F1D1D] leading-snug"
                          >
                            <span className="text-[#DC2626] font-extrabold">&minus;</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hardware & Architectural Specifications */}
                  {prod.specs && Object.keys(prod.specs).length > 0 && (
                    <div className="mb-5">
                      <div className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-2">
                        📊 Hardware &amp; Architectural Specifications
                      </div>
                      <div className="overflow-hidden border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
                        <table className="w-full text-xs text-left border-collapse">
                          <tbody>
                            {Object.entries(prod.specs).map(([k, v], sIdx) => (
                              <tr
                                key={sIdx}
                                className="border-b border-[#F1F5F9] last:border-0"
                              >
                                <td className="p-2.5 sm:p-3 font-bold text-[#0F172A] w-[35%] bg-white/60">
                                  {k}
                                </td>
                                <td className="p-2.5 sm:p-3 text-[#475569]">{v}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Buy / Consultation Links */}
                  {prod.buy_links && prod.buy_links.length > 0 && (
                    <div className="flex items-center gap-2.5 flex-wrap pt-3 border-t border-[#F1F5F9]">
                      {prod.buy_links.map((btn, bIdx) => (
                        <Link
                          key={bIdx}
                          href={btn.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ backgroundColor: btn.color }}
                          className="px-4 py-2 text-white text-xs font-bold rounded shadow-xs hover:opacity-95 transition-opacity inline-flex items-center gap-1.5"
                        >
                          <span>{btn.price}</span>
                          <span>&rarr;</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ================= POST REVIEWS & PEER DISCUSSION ================= */}
          <section className="mt-8 pt-6 border-t-2 border-[#F1F5F9]">
            {/* Header + Add Review Button */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-[#E2E8F0]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold text-[#0052FF] bg-[#EFF6FF] px-2 py-0.5 rounded uppercase tracking-wider">
                    VERIFIED PEER REVIEWS
                  </span>
                  <span className="text-xs text-[#64748B]">•</span>
                  <span className="text-xs text-[#059669] font-bold">
                    ★★★★★ 5.0 / 5.0 (Peer Rated)
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] m-0">
                  Peer Reviews on this Research Post
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs font-bold rounded-md shadow-sm cursor-pointer transition-colors inline-flex items-center gap-1.5"
              >
                <span>✍️</span>
                <span>Add Review</span>
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {currentReviews.map((rev, rIdx) => {
                const isHelpfulMarked = helpfulClicked[rIdx];
                return (
                  <div
                    key={rIdx}
                    className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2.5 mb-2.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            rev.avatar ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80"
                          }
                          alt={rev.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#E2E8F0]"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-[13.5px] font-extrabold text-[#0F172A] m-0">
                              {rev.name}
                            </h4>
                            <span className="bg-[#DCFCE7] text-[#15803D] text-[9.5px] font-bold px-1.5 py-0.2 rounded">
                              ✓ VERIFIED ARCHITECT
                            </span>
                          </div>
                          <span className="text-[11.5px] text-[#64748B] font-medium block">
                            {rev.role}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[#F59E0B] text-xs tracking-wider">
                          {"★".repeat(rev.rating)}
                        </div>
                        <span className="text-[10.5px] text-[#94A3B8]">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <h5 className="text-[13.5px] font-bold text-[#0F172A] leading-snug mb-1.5">
                      {rev.title}
                    </h5>
                    <p className="text-[13px] text-[#475569] leading-relaxed mb-3">
                      {rev.comment}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F8FAFC] text-[11px] text-[#94A3B8]">
                      <span>
                        💡 Helpful: {rev.helpful + (isHelpfulMarked ? 1 : 0)} engineers found this constructive
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setHelpfulClicked((prev) => ({
                            ...prev,
                            [rIdx]: !prev[rIdx],
                          }))
                        }
                        className="text-[#64748B] hover:text-[#0052FF] font-semibold cursor-pointer transition-colors"
                      >
                        {isHelpfulMarked ? "✓ Thank you" : "Helpful?"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* ================= COLUMN 3: RIGHT SIDEBAR ================= */}
        <aside className="w-full flex flex-col gap-6 text-left lg:sticky lg:top-[90px]">
          {/* WIDGET 1: TOP STORIES */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F3F4F6]">
              <h4 className="text-[13px] font-extrabold text-[#030712] uppercase m-0 tracking-wider">
                Top Stories
              </h4>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              {ARTICLES_STORE.map((topStory) => {
                const icon =
                  topStory.id === 1 ? "💻" : topStory.id === 2 ? "🤖" : "📈";
                const bg =
                  topStory.id === 1
                    ? "bg-[#1E293B]"
                    : topStory.id === 2
                    ? "bg-[#312E81]"
                    : "bg-[#0F766E]";
                return (
                  <button
                    key={topStory.id}
                    type="button"
                    onClick={() => onSelectArticle(topStory.id)}
                    className="flex items-center gap-3 text-left group cursor-pointer border-b border-[#F9FAFB] pb-3 last:border-0 last:pb-0"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${bg} shrink-0 flex items-center justify-center text-xl`}
                    >
                      {icon}
                    </div>
                    <div>
                      <h5 className="text-[12px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-snug mb-0.5 line-clamp-2 transition-colors">
                        {topStory.title}
                      </h5>
                      <span className="text-[10px] text-[#9CA3AF] font-semibold block">
                        {topStory.date}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* WIDGET 2: SPECIAL FEATURE 1 */}
          <div className="bg-[#0B1120] text-white rounded-2xl p-6 relative overflow-hidden border border-[#1F2937] shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4ADE80] via-[#22D3EE] to-[#3B82F6]"></div>
            <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
              Special Feature
            </span>
            <p className="text-[12.5px] text-[#D1D5DB] leading-relaxed mb-4">
              Watch our exclusive video briefings &amp; live architecture teardowns.
            </p>
            <Link
              href="/contact"
              className="inline-block px-5 py-2 bg-[#E53935] hover:bg-[#C62828] text-white font-bold text-xs rounded-sm shadow-[0_4px_6px_-1px_rgba(229,57,53,0.4)] transition-colors text-center"
            >
              Watch Now
            </Link>
          </div>

          {/* WIDGET 3: NEWEST VIDEOS */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F3F4F6]">
              <h4 className="text-[13px] font-extrabold text-[#030712] uppercase m-0 tracking-wider">
                Newest Videos
              </h4>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { title: "WHAT ARE SOCIAL ADVERTISING?", date: "25-Apr-2024" },
                { title: "ENTERPRISE AI ARCHITECTURE", date: "18-Apr-2024" },
                { title: "HYBRID CLOUD DEVOPS TEARDOWN", date: "12-May-2024" },
              ].map((vid, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#312E81] shrink-0 flex items-center justify-center text-white text-xs group-hover:scale-105 transition-transform">
                    ▶
                  </div>
                  <div>
                    <h5 className="text-[11.5px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-snug mb-0.5 uppercase transition-colors">
                      {vid.title}
                    </h5>
                    <span className="text-[10px] text-[#9CA3AF] font-semibold block">
                      {vid.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WIDGET 4: SPECIAL FEATURE 2 */}
          <div className="bg-[#0B1120] text-white rounded-2xl p-6 relative overflow-hidden border border-[#1F2937] shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FB923C] via-[#EF4444] to-[#EC4899]"></div>
            <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
              Special Feature
            </span>
            <p className="text-[12.5px] text-[#D1D5DB] leading-relaxed mb-4">
              Explore our high-throughput AI infrastructure benchmarks.
            </p>
            <Link
              href="/contact"
              className="inline-block px-5 py-2 bg-[#E53935] hover:bg-[#C62828] text-white font-bold text-xs rounded-sm shadow-[0_4px_6px_-1px_rgba(229,57,53,0.4)] transition-colors text-center"
            >
              Watch Now
            </Link>
          </div>

          {/* WIDGET 5: UPCOMING EVENTS */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F3F4F6]">
              <h4 className="text-[13px] font-extrabold text-[#030712] uppercase m-0 tracking-wider">
                Upcoming Events
              </h4>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { day: "13", mon: "APR", title: "International Conference on World Cloud Architecture", date: "25-Apr-2026" },
                { day: "28", mon: "MAY", title: "Global AI & Autonomous Agents Summit 2026", date: "28-May-2026" },
                { day: "15", mon: "JUN", title: "Enterprise Cybersecurity & Threat Modeling Workshop", date: "15-Jun-2026" },
              ].map((ev, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[12px] font-black text-[#0F172A] leading-none">
                      {ev.day}
                    </span>
                    <span className="text-[9px] font-extrabold text-[#0052FF] uppercase mt-0.5">
                      {ev.mon}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-[11.5px] font-bold text-[#111827] leading-snug mb-0.5 line-clamp-2">
                      {ev.title}
                    </h5>
                    <span className="text-[10px] text-[#9CA3AF] font-semibold block">
                      {ev.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 3. ADD REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#E2E8F0] max-w-lg w-full p-6 sm:p-7 rounded-2xl relative shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-gray-600 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-extrabold text-[#0052FF] uppercase tracking-wider block mb-0.5">
                COMMUNITY FEEDBACK
              </span>
              <h3 className="text-xl font-extrabold text-[#0F172A] m-0">
                Write a Verified Peer Review
              </h3>
              <p className="text-xs text-[#64748B] mt-1 m-0 truncate">
                Post: {currentArticle.title}
              </p>
            </div>

            <form onSubmit={handleAddReviewSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={revName}
                    onChange={(e) => setRevName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Role &amp; Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={revRole}
                    onChange={(e) => setRevRole(e.target.value)}
                    placeholder="e.g. Senior Architect @ CloudNet"
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:border-[#0052FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Star Rating
                </label>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:border-[#0052FF]"
                >
                  <option value={5}>★★★★★ (5/5) Exceptional &amp; Authoritative</option>
                  <option value={4}>★★★★☆ (4/5) Very Good Benchmark</option>
                  <option value={3}>★★★☆☆ (3/5) Average Analysis</option>
                  <option value={2}>★★☆☆☆ (2/5) Needs Improvement</option>
                  <option value={1}>★☆☆☆☆ (1/5) Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  value={revTitle}
                  onChange={(e) => setRevTitle(e.target.value)}
                  placeholder="e.g. Accurate latency benchmarks for Kubernetes workloads"
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:border-[#0052FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Detailed Review &amp; Insights *
                </label>
                <textarea
                  required
                  rows={3}
                  value={revComment}
                  onChange={(e) => setRevComment(e.target.value)}
                  placeholder="Share your architectural experience regarding this post..."
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:border-[#0052FF] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0052FF] hover:bg-[#0043D6] text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                Post Verified Review &rarr;
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
