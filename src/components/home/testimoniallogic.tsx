"use client";

import { useState } from "react";

export default function TestimonialLogic() {
  const [modal, setModal] = useState<"review" | "consult" | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [avatar, setAvatar] = useState("");

  const closeModal = () => {
    setModal(null);
    setStatus("idle");
    setAvatar("");
  };

  // Submit Review form using FormData (simple, easy, zero useEffect)
  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fd.get("name"),
          role: fd.get("role") || "Enterprise Client",
          company: fd.get("location") || "Enterprise Organization",
          rating: Number(fd.get("rating")) || 5,
          quote: fd.get("quote"),
          avatar: avatar,
          verified: false,
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("idle");
    } catch {
      setStatus("idle");
    }
  };

  // Submit Consultation form using FormData (simple, easy, zero useEffect)
  const handleConsultSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company") || "Enterprise Organization",
          phone: fd.get("phone") || "",
          service: fd.get("service") || "Software Development",
          project_details: fd.get("details") || "Discovery session requested via website.",
          need_nda: fd.get("nda") === "on",
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("idle");
    } catch {
      setStatus("idle");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setAvatar(evt.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setModal("consult");
          }}
          className="inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#E05D00] text-white font-semibold text-sm h-10 px-6 rounded transition-colors text-center w-full sm:w-[220px] cursor-pointer shadow-xs"
        >
          Schedule Consultation
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setAvatar("");
            setModal("review");
          }}
          className="inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-black text-white font-semibold text-[13.5px] h-10 px-5 rounded border border-gray-700 transition-colors text-center w-full sm:w-[220px] cursor-pointer shadow-xs"
        >
          <span className="text-[#FFAA00]">★</span>
          <span>Write a Client Review</span>
        </button>
      </div>

      {/* MODAL 1: Review Form */}
      {modal === "review" && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-7 relative border border-slate-200 text-left shadow-2xl my-8">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {status !== "success" ? (
              <div>
                <div className="mb-5">
                  <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider block mb-1">
                    ★ VERIFIED CLIENT ENDORSEMENT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1">
                    Share Your Enterprise Experience
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Your verified review helps global organizations evaluate Creed Tech engineering standards.
                  </p>
                </div>

                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Client Photo (Optional)
                    </label>
                    <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      {avatar ? (
                        <img src={avatar} alt="Preview" className="w-10 h-10 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">
                          📷
                        </div>
                      )}
                      <label className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded cursor-pointer">
                        <span>{avatar ? "Change Photo" : "Upload Photo"}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Role &amp; Company *</label>
                      <input
                        name="role"
                        type="text"
                        required
                        placeholder="e.g. VP of Eng, Apex Global"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Country / Location</label>
                      <input
                        name="location"
                        type="text"
                        placeholder="e.g. Germany / United Kingdom"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Rating Score *</label>
                      <select
                        name="rating"
                        defaultValue="5"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm font-semibold text-[#E67E22] bg-white"
                      >
                        <option value="5">★★★★★ (5.0 Excellent)</option>
                        <option value="4">★★★★☆ (4.0 Very Good)</option>
                        <option value="3">★★★☆☆ (3.0 Good)</option>
                        <option value="2">★★☆☆☆ (2.0 Fair)</option>
                        <option value="1">★☆☆☆☆ (1.0 Poor)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review *</label>
                    <textarea
                      name="quote"
                      rows={4}
                      required
                      placeholder="Describe your experience with Creed Tech engineers, architecture, velocity, or reliability..."
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-xs font-semibold rounded cursor-pointer disabled:opacity-50"
                    >
                      {status === "loading" ? "Submitting..." : "Submit Client Review ★"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Review Submitted!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-5">
                  Thank you. Your review will appear in our verified client highlights once confirmed.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Consultation Form */}
      {modal === "consult" && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-7 relative border border-slate-200 text-left shadow-2xl my-8">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {status !== "success" ? (
              <div>
                <div className="mb-5">
                  <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider block mb-1">
                    ENGINEERING CONSULTATION
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1">
                    Schedule Enterprise Discovery
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Connect directly with our Principal Systems Architects to scope architecture or engineering pods.
                  </p>
                </div>

                <form onSubmit={handleConsultSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="e.g. sarah@enterprise.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Company</label>
                      <input
                        name="company"
                        type="text"
                        placeholder="e.g. Cyberdyne Systems"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="e.g. +1 (555) 019-2834"
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Required Service *</label>
                    <select
                      name="service"
                      defaultValue="Software Development"
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-800 bg-white"
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Scope &amp; Timeline</label>
                    <textarea
                      name="details"
                      rows={3}
                      placeholder="Briefly describe your objectives or team scaling timeline..."
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      name="nda"
                      type="checkbox"
                      id="ndaCheck"
                      defaultChecked
                      className="w-4 h-4 text-[#FF6B00] rounded"
                    />
                    <label htmlFor="ndaCheck" className="text-xs text-slate-600">
                      Execute standard Non-Disclosure Agreement (NDA)
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-xs font-semibold rounded cursor-pointer disabled:opacity-50"
                    >
                      {status === "loading" ? "Submitting..." : "Confirm Consultation Request"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Consultation Request Received!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-5">
                  Thank you. A Systems Architect will reach out within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded cursor-pointer"
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
