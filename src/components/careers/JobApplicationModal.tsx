"use client";

import React, { useState } from "react";

interface JobApplicationModalProps {
  isOpen: boolean;
  roleTitle: string | null;
  onClose: () => void;
}

export default function JobApplicationModal({ isOpen, roleTitle, onClose }: JobApplicationModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  if (!isOpen) return null;

  const isTalentNetwork = roleTitle === "Senior Talent Network";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const fd = new FormData(e.currentTarget);
    const candidate_name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const domain_specialty = (fd.get("specialty") as string)?.trim() || roleTitle || "Engineering";
    const portfolio_github = (fd.get("portfolio") as string)?.trim() || "";

    if (!candidate_name || !email) {
      setStatus("error");
      setMsg("Please provide your name and email.");
      return;
    }

    try {
      const res = await fetch("/api/admin/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidate_name,
          email,
          domain_specialty,
          portfolio_github,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Registration failed.");

      setStatus("success");
      setMsg("Registration received! You are on our priority hiring alert list.");
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 3500);
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message || "Something went wrong.");
    }
  };

  const inputClass = "w-full h-11 px-3.5 bg-[#F7F6F5] border border-[#E6E4DF] text-sm rounded-lg outline-none focus:border-[#FF6B00] focus:bg-white transition-colors text-slate-900";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E6E4DF] p-6 sm:p-8 relative text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 bg-orange-50 text-[#FF6B00] border border-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Registration Confirmed!</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">{msg}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">
              PRIORITY TALENT REGISTRATION
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
              {isTalentNetwork ? "Join Senior Talent Network" : `Apply / Register: ${roleTitle}`}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed font-normal">
              Submit your coordinates to receive priority dispatch when this pod opens for interview scheduling.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input name="name" type="text" required placeholder="e.g. Alex Henderson" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email Address *</label>
                <input name="email" type="email" required placeholder="alex@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Specialty *</label>
                <input
                  name="specialty"
                  type="text"
                  defaultValue={roleTitle || "Engineering"}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Portfolio URL</label>
                <input name="portfolio" type="text" placeholder="github.com/username" className={inputClass} />
              </div>

              {status === "error" && <p className="text-xs text-red-600 font-medium">{msg}</p>}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {status === "loading" ? "Submitting..." : "Submit Registration"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
