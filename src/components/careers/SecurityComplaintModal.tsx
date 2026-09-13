"use client";

import React, { useState } from "react";

interface SecurityComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityComplaintModal({ isOpen, onClose }: SecurityComplaintModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const fd = new FormData(e.currentTarget);
    const reporter_name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const category = (fd.get("category") as string)?.trim() || "Security Complaint";
    const severity = (fd.get("severity") as string)?.trim() || "Medium";
    const subject = (fd.get("subject") as string)?.trim() || "Security Report";
    const description = (fd.get("description") as string)?.trim();

    if (!reporter_name || !email || !description) {
      setStatus("error");
      setMsg("Please provide your name, contact email, and security details.");
      return;
    }

    try {
      const res = await fetch("/api/admin/security-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporter_name,
          email,
          category,
          severity,
          subject,
          description,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Submission failed.");

      setStatus("success");
      setMsg("Your security report / question has been securely transmitted. Our Security Team reviews disclosures and responds promptly.");
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
            <h3 className="text-lg font-bold text-slate-900 mb-1">Report Received!</h3>
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
              SECURITY &amp; COMPLIANCE HOTLINE
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
              Security Question or Complaint
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed font-normal">
              Submit technical security vulnerabilities, architectural concerns, or security-related complaints directly to the Creed Tech Security Office.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input name="name" type="text" required placeholder="e.g. Alex Morgan" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email *</label>
                  <input name="email" type="email" required placeholder="alex@domain.com" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select name="category" className={inputClass}>
                    <option value="Security Complaint">Security Complaint</option>
                    <option value="Vulnerability Disclosure">Vulnerability Disclosure</option>
                    <option value="Security Question">Security Question</option>
                    <option value="Compliance & Privacy">Compliance &amp; Privacy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Severity / Urgency</label>
                  <select name="severity" defaultValue="Medium" className={inputClass}>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Affected Component / Subject</label>
                <input
                  name="subject"
                  type="text"
                  placeholder="e.g. Authentication endpoint rate limit / Data access policy"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Complaint / Security Details *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Detail the security question, complaint, impact, or reproduction steps..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-lg outline-none focus:border-[#FF6B00] focus:bg-white transition-colors text-slate-900 resize-none font-normal"
                />
              </div>

              {status === "error" && <p className="text-xs text-red-600 font-medium">{msg}</p>}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#e05d00] active:scale-[0.99] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {status === "loading" ? "Submitting Report..." : "Submit Security Report →"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
