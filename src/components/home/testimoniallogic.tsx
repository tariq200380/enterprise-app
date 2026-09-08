"use client";

import { useState } from "react";

export interface ReviewItem {
  id: number;
  client_name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  quote: string;
  verified?: boolean;
}

export const BASELINE_REVIEWS: ReviewItem[] = [
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

interface TestimonialLogicProps {
  isReviewOpen: boolean;
  setIsReviewOpen: (open: boolean) => void;
  isConsultOpen: boolean;
  setIsConsultOpen: (open: boolean) => void;
}

export default function TestimonialLogic({
  isReviewOpen,
  setIsReviewOpen,
  isConsultOpen,
  setIsConsultOpen,
}: TestimonialLogicProps) {
  // ================= FORM 1 STATE: REVIEW FORM =================
  const [revName, setRevName] = useState("");
  const [revRole, setRevRole] = useState("");
  const [revLocation, setRevLocation] = useState("");
  const [revRating, setRevRating] = useState("5");
  const [revQuote, setRevQuote] = useState("");
  const [revAvatar, setRevAvatar] = useState("");
  const [revSubmitting, setRevSubmitting] = useState(false);
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [revError, setRevError] = useState("");

  // ================= FORM 2 STATE: CONSULTATION FORM =================
  const [conName, setConName] = useState("");
  const [conEmail, setConEmail] = useState("");
  const [conCompany, setConCompany] = useState("");
  const [conPhone, setConPhone] = useState("");
  const [conService, setConService] = useState("Software Development");
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
    setConService("Software Development");
    setConDetails("");
    setConNda(true);
    setConSubmitted(false);
    setConError("");
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          verified: false,
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

  return (
    <>
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
                              onChange={handleAvatarFileChange}
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
                        <option value="5">★★★★★ (5.0 Excellent - Highly Recommended)</option>
                        <option value="4">★★★★☆ (4.0 Very Good - Great Experience)</option>
                        <option value="3">★★★☆☆ (3.0 Good - Met Expectations)</option>
                        <option value="2">★★☆☆☆ (2.0 Fair - Needs Improvement)</option>
                        <option value="1">★☆☆☆☆ (1.0 Poor - Unsatisfactory)</option>
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
                      Required Service Domain *
                    </label>
                    <select
                      value={conService}
                      onChange={(e) => setConService(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-800 bg-white focus:outline-hidden focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    >
                      <option value="Software Development">Software Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Mobile Applications">Mobile Applications</option>
                      <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                      <option value="Database Management">Database Management</option>
                      <option value="Cybersecurity & QA">Cybersecurity &amp; QA</option>
                      <option value="Artificial Intelligence (AI)">Artificial Intelligence (AI)</option>
                      <option value="Digital Marketing & Branding">Digital Marketing &amp; Branding</option>
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
    </>
  );
}
