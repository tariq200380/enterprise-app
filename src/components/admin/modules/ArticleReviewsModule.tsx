"use client";

import React, { useState, useEffect } from "react";
import { ArticleReview } from "@/types/admin";

interface ArticleReviewsModuleProps {
  articleReviews?: ArticleReview[];
  searchQuery?: string;
  onUpdateStatus?: (id: number, status: "APPROVED" | "PENDING" | "REJECTED") => void;
  onDeleteReview?: (id: number) => void;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onRefresh?: () => void;
}

export default function ArticleReviewsModule({
  articleReviews: propReviews,
  searchQuery = "",
  onUpdateStatus,
  onDeleteReview,
  showToast,
  onRefresh,
}: ArticleReviewsModuleProps) {
  const [articleReviews, setArticleReviews] = useState<ArticleReview[]>(propReviews || []);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED">("ALL");

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (data.reviews) setArticleReviews(data.reviews);
    } catch (err) {
      console.error("Failed to load article reviews:", err);
    }
  };

  useEffect(() => {
    if (propReviews) {
      setArticleReviews(propReviews);
    } else {
      fetchReviews();
    }
  }, [propReviews]);

  const handleUpdateStatusAction = async (id: number, status: "APPROVED" | "PENDING" | "REJECTED") => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setArticleReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
        showToast?.(`Review #${id} status: ${status}`);
        onUpdateStatus?.(id, status);
        fetchReviews();
        onRefresh?.();
      } else {
        showToast?.("Failed to update review", "error");
      }
    } catch {
      showToast?.("Failed to update review", "error");
    }
  };

  const handleDeleteReviewAction = async (id: number) => {
    if (!confirm(`Delete review #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticleReviews((prev) => prev.filter((r) => r.id !== id));
        showToast?.("Review deleted");
        onDeleteReview?.(id);
        fetchReviews();
        onRefresh?.();
      } else {
        showToast?.("Failed to delete review", "error");
      }
    } catch {
      showToast?.("Failed to delete review", "error");
    }
  };

  const pendingCount = articleReviews.filter(
    (r) => (r.status || "PENDING").toUpperCase() === "PENDING"
  ).length;
  const approvedCount = articleReviews.filter(
    (r) => (r.status || "APPROVED").toUpperCase() === "APPROVED"
  ).length;

  const filtered = articleReviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    const name = (r.reviewer_name || r.name || "").toLowerCase();
    const org = (r.organization || r.role || "").toLowerCase();
    const title = (r.review_title || r.title || r.article_title || "").toLowerCase();
    const text = (r.details || r.comment || "").toLowerCase();

    const matchesSearch =
      !q ||
      name.includes(q) ||
      org.includes(q) ||
      title.includes(q) ||
      text.includes(q);

    const st = (r.status || "PENDING").toUpperCase();
    if (filter === "PENDING") return matchesSearch && st === "PENDING";
    if (filter === "APPROVED") return matchesSearch && st === "APPROVED";
    return matchesSearch;
  });

  const formatDate = (raw?: string) => {
    if (!raw) return "Aug 16, 2026";
    if (raw.includes("Aug") || raw.includes("Sep") || raw.includes("Jul")) return raw;
    try {
      const d = new Date(raw);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    } catch {
      // ignore
    }
    return raw;
  };

  const getAvatar = (r: ArticleReview, index: number) => {
    if (r.avatar && r.avatar.startsWith("http")) return r.avatar;
    const pool = [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=180&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
    ];
    return pool[index % pool.length];
  };

  return (
    <div>
      {/* Header Section matching reference admin.php */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#0052FF] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-[2px] tracking-wider uppercase">
              MODERATION DESK
            </span>
            <h1 className="text-[22px] font-bold text-[#0F172A] m-0">
              Article &amp; Hardware Reviews Moderation
            </h1>
          </div>
          <p className="text-[13px] text-[#64748B] m-0">
            Inspect, approve, or reject user-submitted article telemetry reviews before they go live on the public website.
          </p>
        </div>

        {/* Filter Buttons matching reference admin.php */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter("ALL")}
            className={`px-3.5 py-1.5 text-[11px] font-bold rounded cursor-pointer transition-all ${
              filter === "ALL"
                ? "bg-[#0F172A] text-white shadow-sm"
                : "bg-white text-[#475569] border border-[#CBD5E1] hover:bg-slate-50"
            }`}
          >
            All Reviews
          </button>
          <button
            type="button"
            onClick={() => setFilter("PENDING")}
            className={`px-3.5 py-1.5 text-[11px] font-bold rounded cursor-pointer transition-all border ${
              filter === "PENDING"
                ? "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A] shadow-sm font-extrabold"
                : "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]/60 hover:bg-[#FEF3C7]/40"
            }`}
          >
            Pending Approval {pendingCount > 0 && `(${pendingCount})`}
          </button>
          <button
            type="button"
            onClick={() => setFilter("APPROVED")}
            className={`px-3.5 py-1.5 text-[11px] font-bold rounded cursor-pointer transition-all border ${
              filter === "APPROVED"
                ? "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0] shadow-sm font-extrabold"
                : "bg-[#F0FDF4] text-[#047857] border-[#A7F3D0]/60 hover:bg-[#ECFDF5]/40"
            }`}
          >
            Live on Site
          </button>
        </div>
      </div>

      {/* Main Table matching admin.php */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b-2 border-[#E2E8F0] text-[#64748B] text-[11px] uppercase tracking-wide select-none">
                <th className="py-3 px-4 font-bold">Reviewer &amp; Organization</th>
                <th className="py-3 px-4 font-bold">Rating &amp; Title</th>
                <th className="py-3 px-4 font-bold">Review Details / Telemetry</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Submitted</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Live Status</th>
                <th className="py-3 px-4 font-bold text-right whitespace-nowrap">Moderation Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#64748B]">
                    No article reviews found in this filter category.
                  </td>
                </tr>
              ) : (
                filtered.map((r, index) => {
                  const st = (r.status || "PENDING").toUpperCase();
                  const ratingNum = Math.min(5, Math.max(1, r.rating || 5));
                  const stars = "★".repeat(ratingNum) + "☆".repeat(5 - ratingNum);
                  const reviewerName = r.reviewer_name || r.name || "Verified Reviewer";
                  const organization = r.organization || r.role || "Enterprise Engineering Squad";
                  const title = r.review_title || r.title || "Telemetry Benchmark Evaluation";
                  const details = r.details || r.comment || "";
                  const dateStr = r.date || formatDate(r.submitted_at);
                  const avatarUrl = getAvatar(r, index);

                  return (
                    <tr
                      key={r.id}
                      className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]/50 transition-colors"
                    >
                      {/* Reviewer & Organization */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={avatarUrl}
                            alt={reviewerName}
                            className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0] flex-shrink-0"
                          />
                          <div>
                            <div className="font-bold text-[#0F172A] text-[13px] leading-tight">
                              {reviewerName}
                            </div>
                            <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                              {organization}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Rating & Title */}
                      <td className="py-3.5 px-4 align-top min-w-[200px]">
                        <div className="text-[#E11D48] text-[12px] font-bold mb-0.5 tracking-tight">
                          {stars} ({ratingNum}/5)
                        </div>
                        <div className="font-semibold text-[#0F172A] text-[12px] leading-snug">
                          {title}
                        </div>
                        {r.article_title && (
                          <div className="text-[10.5px] text-[#0052FF] font-medium mt-0.5">
                            Target: {r.article_title}
                          </div>
                        )}
                      </td>

                      {/* Review Details / Telemetry */}
                      <td className="py-3.5 px-4 align-top max-w-[340px]">
                        <p className="text-[12px] text-[#334155] leading-[1.5] m-0 line-clamp-3 hover:line-clamp-none transition-all">
                          {details}
                        </p>
                      </td>

                      {/* Submitted */}
                      <td className="py-3.5 px-4 align-top text-[#64748B] text-[12px] whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Live Status */}
                      <td className="py-3.5 px-4 align-top whitespace-nowrap">
                        {st === "APPROVED" ? (
                          <span className="inline-flex items-center px-2 py-1 text-[11px] font-extrabold rounded-[2px] bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                            ✓ LIVE ON SITE
                          </span>
                        ) : st === "PENDING" ? (
                          <span className="inline-flex items-center px-2 py-1 text-[11px] font-extrabold rounded-[2px] bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                            ⏳ PENDING APPROVAL
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 text-[11px] font-extrabold rounded-[2px] bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                            REJECTED
                          </span>
                        )}
                      </td>

                      {/* Moderation Actions */}
                      <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                        {st === "APPROVED" ? (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatusAction(r.id, "PENDING")}
                            className="px-2.5 py-1 bg-[#F59E0B] hover:bg-[#D97706] text-white text-[11px] font-bold rounded-[2px] cursor-pointer mr-1.5 transition-colors shadow-sm"
                            title="Hide from public site and mark pending"
                          >
                            ⏸️ Hide (Pending)
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatusAction(r.id, "APPROVED")}
                            className="px-2.5 py-1 bg-[#059669] hover:bg-[#047857] text-white text-[11px] font-bold rounded-[2px] cursor-pointer mr-1.5 transition-colors shadow-sm"
                            title="Approve review and publish live on site"
                          >
                            ✓ Approve &amp; Make Live
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteReviewAction(r.id)}
                          className="px-2 py-1 bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] text-[11px] font-bold rounded-[2px] cursor-pointer transition-colors shadow-sm"
                          title="Permanently remove review"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
