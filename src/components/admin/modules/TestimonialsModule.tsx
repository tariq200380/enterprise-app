"use client";

import React from "react";
import { Testimonial } from "@/types/admin";

interface TestimonialsModuleProps {
  testimonials: Testimonial[];
  onOpenAddModal: () => void;
  onToggleVerified: (id: number, current: boolean) => void;
  onDeleteTestimonial: (id: number) => void;
}

export default function TestimonialsModule({
  testimonials,
  onOpenAddModal,
  onToggleVerified,
  onDeleteTestimonial,
}: TestimonialsModuleProps) {
  const getInitials = (name: string) => {
    const parts = (name || "Client").trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (parts[0]?.substring(0, 2) || "CT").toUpperCase();
  };

  const pendingCount = testimonials.filter((t) => !t.verified).length;
  const publishedCount = testimonials.filter((t) => t.verified).length;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] flex items-center gap-3">
            <span>Client Testimonials &amp; Social Proof</span>
            {pendingCount > 0 && (
              <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-300 animate-pulse">
                {pendingCount} Pending Moderation
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Verified endorsements from enterprise CTOs, VPs of Engineering, and clients. Reviews submitted from the website require confirmation before publishing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-xs">
            <span className="text-emerald-600 font-bold">{publishedCount} Live</span>
            <span>•</span>
            <span className="text-amber-600 font-bold">{pendingCount} Pending</span>
          </div>
          <button
            onClick={onOpenAddModal}
            className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>+</span> <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`bg-white border rounded-lg p-5 shadow-xs flex flex-col justify-between transition-all ${
              t.verified ? "border-[#E2E8F0]" : "border-amber-300 bg-amber-50/20 ring-1 ring-amber-200"
            }`}
          >
            <div>
              {/* Header with Avatar, Details and Live Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.client_name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-11 h-11 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700 ${
                      t.avatar ? "hidden" : "flex"
                    }`}
                  >
                    {getInitials(t.client_name)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0F172A] truncate">{t.client_name}</h4>
                    <span className="text-[11px] text-[#64748B] block truncate">
                      {t.role}, {t.company}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                {t.verified ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shrink-0">
                    ✓ Published
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded shrink-0">
                    ⏳ Pending
                  </span>
                )}
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < (t.rating || 5) ? "text-amber-400 text-xs" : "text-slate-200 text-xs"}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs text-[#334155] leading-relaxed italic line-clamp-4">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Bottom Actions: Approve/Publish or Unpublish, and Delete */}
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-100 text-xs">
              {!t.verified ? (
                <button
                  onClick={() => onToggleVerified(t.id, t.verified)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <span>✓</span>
                  <span>Approve &amp; Publish</span>
                </button>
              ) : (
                <button
                  onClick={() => onToggleVerified(t.id, t.verified)}
                  className="px-2.5 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-medium text-[11px] rounded border border-slate-200 cursor-pointer transition-colors"
                >
                  Unpublish
                </button>
              )}

              <button
                onClick={() => onDeleteTestimonial(t.id)}
                className="text-red-600 hover:text-red-700 hover:underline font-semibold cursor-pointer text-xs"
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
