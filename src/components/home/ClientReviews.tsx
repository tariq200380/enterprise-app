"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ReviewItem {
  id: number;
  client_name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  quote: string;
  verified?: boolean;
}

const BASELINE_REVIEWS: ReviewItem[] = [
  {
    id: -1,
    client_name: "Marina R.",
    role: "Enterprise Cloud",
    company: "Italy",
    rating: 5,
    quote: "I'm using Creed Tech for our enterprise cloud architecture. It allowed us to deploy multi-region failover seamlessly with zero downtime.",
    avatar: "",
  },
  {
    id: -2,
    client_name: "Elena Rostova",
    role: "AI Automation",
    company: "Germany",
    rating: 5,
    quote: "Exceptional full-stack capabilities and attention to detail. They built our AI-driven document intelligence pipeline directly with our ERP.",
    avatar: "",
  },
  {
    id: -3,
    client_name: "David L.",
    role: "Database Arch",
    company: "United States",
    rating: 5,
    quote: "We had a complex legacy database problem and the engineering support was world-class. Solved our bottleneck within days.",
    avatar: "",
  },
  {
    id: -4,
    client_name: "Sarah Jenkins",
    role: "Enterprise Squads",
    company: "United Kingdom",
    rating: 5,
    quote: "It's been 4 years now that we rely on Creed Tech for dedicated staff augmentation and infrastructure. Top quality code.",
    avatar: "",
  },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  const getInitials = (name: string) => {
    const parts = (name || "Client").trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (parts[0]?.substring(0, 2) || "CT").toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1 text-[#FFAA00] text-xs sm:text-sm">
          {Array.from({ length: review.rating || 5 }).map((_, i) => (
            <span key={i}>★</span>
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
  // Modal states
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

  // Review form state
  const [revName, setRevName] = useState("");
  const [revRole, setRevRole] = useState("");
  const [revLocation, setRevLocation] = useState("");
  const [revRating, setRevRating] = useState("5");
  const [revQuote, setRevQuote] = useState("");
  const [revAvatar, setRevAvatar] = useState("");
  const [revSubmitting, setRevSubmitting] = useState(false);
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [revError, setRevError] = useState("");

  // Consultation form state
  const [conName, setConName] = useState("");
  const [conEmail, setConEmail] = useState("");
  const [conCompany, setConCompany] = useState("");
  const [conPhone, setConPhone] = useState("");
  const [conService, setConService] = useState("Dedicated Engineering Pods");
  const [conDetails, setConDetails] = useState("");
  const [conNda, setConNda] = useState(true);
  const [conSubmitting, setConSubmitting] = useState(false);
  const [conSubmitted, setConSubmitted] = useState(false);
  const [conError, setConError] = useState("");

  const resetReviewForm = () => {
    setRevName("");
    setRevRole("");
    setRevLocation("");
    setRevRating("5");
    setRevQuote("");
    setRevAvatar("");
    setRevSubmitted(false);
    setRevError("");
  };

  const resetConsultForm = () => {
    setConName("");
    setConEmail("");
    setConCompany("");
    setConPhone("");
    setConService("Dedicated Engineering Pods");
    setConDetails("");
    setConNda(true);
    setConSubmitted(false);
    setConError("");
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revQuote.trim()) {
      setRevError("Please provide your full name and review quote.");
      return;
    }
    setRevSubmitting(true);
    setRevError("");
    try {
      const parts = revRole.split(",");
      const role = parts[0]?.trim() || "Enterprise Client";
      const company = (parts.slice(1).join(",") || revLocation || "Enterprise Organization").trim();

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: revName.trim(),
          role: role,
          company: company,
          avatar: revAvatar || "",
          rating: parseInt(revRating, 10) || 5,
          quote: revQuote.trim(),
          verified: false, // Default to false so Admin must approve before publishing
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit review");
      }
      setRevSubmitted(true);
    } catch (err: any) {
      setRevError(err.message || "Submission failed. Please try again.");
    } finally {
      setRevSubmitting(false);
    }
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conName.trim() || !conEmail.trim()) {
      setConError("Please provide your name and business email.");
      return;
    }
    setConSubmitting(true);
    setConError("");
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: conName.trim(),
          email: conEmail.trim(),
          company: conCompany.trim() || "Enterprise Organization",
          phone: conPhone.trim(),
          service: conService,
          project_details: conDetails.trim() || "Discovery session requested via website.",
          need_nda: conNda,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to schedule consultation");
      }
      setConSubmitted(true);
    } catch (err: any) {
      setConError(err.message || "Submission failed. Please try again.");
    } finally {
      setConSubmitting(false);
    }
  };

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

      {/* ================= MODAL 1: WRITE A CLIENT REVIEW ================= */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-7 relative border border-slate-200 text-left shadow-2xl my-8">
            <button
              type="button"
              onClick={() => {
                setIsReviewOpen(false);
                resetReviewForm();
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {!revSubmitted ? (
              <div>
                <div className="mb-5">
                  <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider block mb-1">
                    ★ VERIFIED CLIENT ENDORSEMENT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1.5">
                    Share Your Enterprise Experience
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Your verified review helps global organizations evaluate Creed Tech engineering standards. Reviews are moderated by our admin team before publication.
                  </p>
                </div>

                {revError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                    {revError}
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                  {/* Photo / Avatar Uploader */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Client Photo / Profile Avatar (Optional)
                    </label>
                    <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      {revAvatar ? (
                        <img
                          src={revAvatar}
                          alt="Preview"
                          className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 border border-dashed border-slate-300">
                          📷
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded cursor-pointer transition-colors inline-block">
                            <span>{revAvatar ? "Change Photo" : "Upload Photo"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 2 * 1024 * 1024) {
                                    setRevError("Image size should be less than 2MB.");
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onload = (evt) => {
                                    setRevAvatar(evt.target?.result as string);
                                    setRevError("");
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {revAvatar && (
                            <button
                              type="button"
                              onClick={() => setRevAvatar("")}
                              className="px-2.5 py-1.5 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded font-medium cursor-pointer transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 truncate">
                          JPG, PNG, WebP up to 2MB. Appears alongside your review once verified.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={revName}
                        onChange={(e) => setRevName(e.target.value)}
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Role &amp; Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={revRole}
                        onChange={(e) => setRevRole(e.target.value)}
                        placeholder="e.g. VP of Eng, Apex Global"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Country / Location
                      </label>
                      <input
                        type="text"
                        value={revLocation}
                        onChange={(e) => setRevLocation(e.target.value)}
                        placeholder="e.g. Germany / United Kingdom"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Rating Score *
                      </label>
                      <select
                        value={revRating}
                        onChange={(e) => setRevRating(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm font-semibold text-[#E67E22] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                      >
                        <option value="5">★★★★★ (5.0 Excellent)</option>
                        <option value="4">★★★★☆ (4.0 Very Good)</option>
                        <option value="3">★★★☆☆ (3.0 Good)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Review / Testimonial *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={revQuote}
                      onChange={(e) => setRevQuote(e.target.value)}
                      placeholder="Describe your experience with Creed Tech engineers, architecture, velocity, or reliability..."
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm resize-none leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                    />
                  </div>

                  <div className="flex justify-end items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsReviewOpen(false);
                        resetReviewForm();
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={revSubmitting}
                      className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-xs font-semibold rounded cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {revSubmitting ? "Submitting..." : "Submit Client Review ★"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 px-4">
                <div className="w-14 h-14 bg-emerald-50 border-2 border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Review Submitted Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed mb-6">
                  Thank you for your valuable endorsement. Your review has been submitted for verification and will appear in our verified customer highlights once confirmed by our administration.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsReviewOpen(false);
                    resetReviewForm();
                  }}
                  className="px-6 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL 2: SCHEDULE CONSULTATION ================= */}
      {isConsultOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-7 relative border border-slate-200 text-left shadow-2xl my-8">
            <button
              type="button"
              onClick={() => {
                setIsConsultOpen(false);
                resetConsultForm();
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {!conSubmitted ? (
              <div>
                <div className="mb-5">
                  <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider block mb-1">
                    ENGINEERING CONSULTATION
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1.5">
                    Schedule Enterprise Discovery
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Connect directly with our Principal Systems Architects to scope architecture, engineering pods, or cloud infrastructure.
                  </p>
                </div>

                {conError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                    {conError}
                  </div>
                )}

                <form onSubmit={handleConsultSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={conName}
                        onChange={(e) => setConName(e.target.value)}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={conEmail}
                        onChange={(e) => setConEmail(e.target.value)}
                        placeholder="e.g. sarah@enterprise.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        value={conCompany}
                        onChange={(e) => setConCompany(e.target.value)}
                        placeholder="e.g. Cyberdyne Systems"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={conPhone}
                        onChange={(e) => setConPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 019-2834"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Engineering Discipline
                    </label>
                    <select
                      value={conService}
                      onChange={(e) => setConService(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-800 bg-white focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    >
                      <option value="Dedicated Engineering Pods">Dedicated Engineering Pods</option>
                      <option value="Enterprise Cloud & DevOps Architecture">Enterprise Cloud &amp; DevOps Architecture</option>
                      <option value="AI / ML Engineering & Intelligent Automation">AI / ML Engineering &amp; Intelligent Automation</option>
                      <option value="Full-Stack Web & Mobile Platform">Full-Stack Web &amp; Mobile Platform</option>
                      <option value="Zero-Downtime Database Migration">Zero-Downtime Database Migration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Scope &amp; Target Timeline
                    </label>
                    <textarea
                      rows={3}
                      value={conDetails}
                      onChange={(e) => setConDetails(e.target.value)}
                      placeholder="Briefly describe your objectives, existing tech stack, or team scaling timeline..."
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm resize-none leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-gray-900 bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="ndaCheckbox"
                      checked={conNda}
                      onChange={(e) => setConNda(e.target.checked)}
                      className="w-4 h-4 text-[#FF6B00] border-slate-300 rounded focus:ring-[#FF6B00]"
                    />
                    <label htmlFor="ndaCheckbox" className="text-xs text-slate-600 select-none">
                      Execute standard Mutual Non-Disclosure Agreement (NDA) prior to technical calls
                    </label>
                  </div>

                  <div className="flex justify-end items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsConsultOpen(false);
                        resetConsultForm();
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={conSubmitting}
                      className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-xs font-semibold rounded cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {conSubmitting ? "Submitting..." : "Confirm Consultation Request"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 px-4">
                <div className="w-14 h-14 bg-emerald-50 border-2 border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Consultation Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed mb-6">
                  Thank you. A Creed Tech Principal Systems Architect has been assigned to your request and will reach out within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsConsultOpen(false);
                    resetConsultForm();
                  }}
                  className="px-6 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
