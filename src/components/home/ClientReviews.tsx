"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TestimonialLogic, { BASELINE_REVIEWS, ReviewItem } from "./testimoniallogic";

function ReviewCard({ review }: { review: ReviewItem }) {
  const getInitials = (name: string) => {
    const parts = (name || "Client").trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (parts[0]?.substring(0, 2) || "CT").toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-0.5 text-xs sm:text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < (review.rating || 5) ? "text-[#FFAA00]" : "text-slate-300"}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
          Verified Client
        </span>
      </div>
      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.client_name}
            className="w-9 h-9 rounded-full object-cover border border-blue-200 shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const next = e.currentTarget.nextElementSibling as HTMLElement;
              if (next) next.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full ${
            review.avatar ? "hidden" : "flex"
          }`}
        >
          {getInitials(review.client_name)}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
            {review.client_name}
          </h4>
          <p className="text-[11px] text-gray-500 font-normal truncate">
            {review.company} &bull; {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ClientReviews() {
  // Modal visibility states
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  // Dynamic verified live reviews from database
  const [liveReviews, setLiveReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/testimonials?verified=true")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.testimonials)) {
          setLiveReviews(d.testimonials);
        }
      })
      .catch(() => {});
  }, []);

  // Merge live verified reviews with curated baseline reviews
  const allReviews = [...liveReviews, ...BASELINE_REVIEWS];
  const col1 = allReviews.filter((_, idx) => idx % 2 === 0);
  const col2 = allReviews.filter((_, idx) => idx % 2 !== 0);

  // Duplicate items to ensure smooth, gapless infinite vertical scrolling
  const col1Items = [...col1, ...col1];
  const col2Items = [...col2, ...col2];

  return (
    <section
      id="client-reviews"
      className="w-full py-16 sm:py-20 bg-[#E2E8F0] text-gray-900 border-b border-slate-300 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Narrative and CTA */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="text-xs sm:text-[13px] font-semibold text-[#E67E22] uppercase tracking-wider block mb-2">
                Enterprise Client Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-gray-950 tracking-tight leading-tight">
                <span className="block">What Our Clients Say</span>
                <span className="block mt-2 sm:mt-2.5">About Creed Tech</span>
              </h2>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <span className="text-[#E67E22] font-semibold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800 leading-snug">
                  Dedicated Principal Engineers on Every Project.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E67E22] font-semibold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800 leading-snug">
                  The Ability to Scale Engineering Pods in Real Time.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E67E22] font-semibold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800 leading-snug">
                  99.8% On-Time Deployment &amp; Strict SLA Controls.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E67E22] font-semibold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800 leading-snug">
                  Zero-Defect Code Audits &amp; SOC 2 Compliance.
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#E05D00] text-white font-semibold text-sm h-10 px-6 rounded transition-colors text-center w-full sm:w-[220px] cursor-pointer shadow-xs"
                >
                  Schedule Consultation
                </button>
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-black text-white font-semibold text-[13.5px] h-10 px-5 rounded border border-gray-700 transition-colors text-center w-full sm:w-[220px] cursor-pointer shadow-xs"
                >
                  <span className="text-[#FFAA00]">★</span>
                  <span>Write a Client Review</span>
                </button>
              </div>

              <div>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-900 hover:text-[#E67E22] border-b-2 border-gray-900 hover:border-[#E67E22] pb-0.5 transition-colors"
                >
                  View Client Portfolio &rarr;
                </Link>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 font-normal pt-2">
              Verified Enterprise Customer Reviews on Clutch &amp; Trustpilot.
            </p>
          </div>

          {/* RIGHT COLUMN: Dual-Direction Vertical Scrolling Marquee */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[520px] overflow-hidden rounded-2xl p-2 select-none">
            {/* Top & Bottom Gradient Edge Fade Masks */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#E2E8F0] via-[#E2E8F0]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#E2E8F0] via-[#E2E8F0]/80 to-transparent z-20 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              
              {/* LEFT MARQUEE COLUMN: Moves DOWN Continuously */}
              <div className="relative overflow-hidden h-full">
                <div className="reviews-col-down">
                  {col1Items.map((rev, index) => (
                    <div key={`col1-${rev.id}-${index}`} className="mb-4">
                      <ReviewCard review={rev} />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT MARQUEE COLUMN: Moves UP Continuously */}
              <div className="hidden sm:block relative overflow-hidden h-full">
                <div className="reviews-col-up">
                  {col2Items.map((rev, index) => (
                    <div key={`col2-${rev.id}-${index}`} className="mb-4">
                      <ReviewCard review={rev} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Dedicated Testimonial & Consultation Forms Logic Module */}
      <TestimonialLogic
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
        isConsultOpen={isConsultOpen}
        setIsConsultOpen={setIsConsultOpen}
      />

    </section>
  );
}
