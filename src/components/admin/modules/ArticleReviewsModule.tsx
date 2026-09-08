"use client";

import React, { useState } from "react";
import { ArticleReview } from "@/types/admin";

interface ArticleReviewsModuleProps {
  articleReviews: ArticleReview[];
  searchQuery: string;
  onUpdateStatus: (id: number, status: "APPROVED" | "REJECTED") => void;
  onDeleteReview: (id: number) => void;
}

export default function ArticleReviewsModule({
  articleReviews,
  searchQuery,
  onUpdateStatus,
  onDeleteReview,
}: ArticleReviewsModuleProps) {
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");

  const filtered = articleReviews.filter((r) => {
    const matchesSearch =
      r.reviewer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.article_title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "ALL" ? true : r.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Article Community Reviews Moderation</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Moderate public feedback, technical verification scores, and commentary on knowledge blueprints.
          </p>
        </div>
        <div className="flex gap-2">
          {(["ALL", "PENDING", "APPROVED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 text-xs font-bold rounded cursor-pointer ${
                filter === st ? "bg-[#0052FF] text-white" : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((rev) => (
          <div key={rev.id} className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#0F172A]">{rev.reviewer_name}</span>
                <span className="text-[11px] text-[#64748B]">({rev.organization})</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  rev.status === "APPROVED" ? "bg-green-100 text-green-800" :
                  rev.status === "REJECTED" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {rev.status}
                </span>
              </div>
              <div className="text-xs text-[#0052FF] font-semibold mb-1">
                Article: {rev.article_title}
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                {rev.details}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {rev.status !== "APPROVED" && (
                <button
                  onClick={() => onUpdateStatus(rev.id, "APPROVED")}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded cursor-pointer"
                >
                  Approve
                </button>
              )}
              {rev.status !== "REJECTED" && (
                <button
                  onClick={() => onUpdateStatus(rev.id, "REJECTED")}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded cursor-pointer"
                >
                  Reject
                </button>
              )}
              <button
                onClick={() => onDeleteReview(rev.id)}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
