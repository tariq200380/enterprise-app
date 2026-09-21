"use client";

import React, { useState } from "react";

interface ContactScopingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactScopingModal({
  isOpen,
  onClose,
}: ContactScopingModalProps) {
  const [scopingStatus, setScopingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [scopingError, setScopingError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setScopingStatus("idle");
    setScopingError("");
    onClose();
  };

  const handleScopingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fullName = (fd.get("fullName") as string)?.trim();
    const workEmail = (fd.get("workEmail") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim() || "";
    const contactMethod = (fd.get("contactMethod") as string) || "Direct Video Call";
    const architectureNotes = (fd.get("architectureNotes") as string)?.trim() || "";

    if (!fullName) {
      setScopingStatus("error");
      setScopingError("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!workEmail || !emailRegex.test(workEmail)) {
      setScopingStatus("error");
      setScopingError("Please enter a valid work email address.");
      return;
    }

    setScopingStatus("loading");
    setScopingError("");

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fullName,
          email: workEmail,
          phone,
          company: "Direct Technical Scoping",
          service: `Direct Technical Scoping (${contactMethod})`,
          project_details: `Direct Technical Consultation Request\nChannel: ${contactMethod}\nPhone/WhatsApp: ${phone || "Not provided"}\nTechnical Specs: ${architectureNotes || "Architecture review requested"}`,
          need_nda: true,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setScopingStatus("success");
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        setScopingStatus("error");
        setScopingError(data.error || "Failed to submit technical scoping request. Please try again.");
      }
    } catch (err: unknown) {
      setScopingStatus("error");
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setScopingError(msg);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white text-[#0F172A] rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl border border-slate-200 text-left my-8">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-lg cursor-pointer leading-none p-1.5 rounded-md transition-colors"
          title="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <span className="text-[10.5px] font-semibold text-[#EA580C] uppercase tracking-wider block mb-1">
          ⚡ DIRECT TECHNICAL CONSULTATION
        </span>
        <h3 className="text-xl sm:text-2xl font-outfit font-bold text-[#0F172A] mb-1.5 tracking-tight">
          Direct Contact with Lead Architect
        </h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Skip non-technical sales calls. Connect directly with our Principal Solutions Architect to scope your project architecture, tech stack, and sprint roadmap.
        </p>

        {/* Assigned Technical Architect Banner */}
        <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-3 mb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            👨‍💻
          </div>
          <div className="text-xs">
            <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>Principal Solutions Architect</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            </div>
            <div className="text-slate-600 text-[11px]">
              Direct Engineering Channel &bull; Zero Sales Reps &bull; Mutual NDA
            </div>
          </div>
        </div>

        {scopingStatus === "success" ? (
          <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center leading-relaxed">
            ✓ Technical Scoping Request Sent! Our Principal Architect will review your specifications and contact you directly within 2 hours.
          </div>
        ) : (
          <form onSubmit={handleScopingSubmit} noValidate className="flex flex-col gap-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-[#EA580C]">*</span>
                </label>
                <input
                  name="fullName"
                  required
                  autoComplete="name"
                  disabled={scopingStatus === "loading"}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Work Email <span className="text-[#EA580C]">*</span>
                </label>
                <input
                  name="workEmail"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={scopingStatus === "loading"}
                  placeholder="john@company.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  disabled={scopingStatus === "loading"}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Preferred Contact Channel
                </label>
                <select
                  name="contactMethod"
                  disabled={scopingStatus === "loading"}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white cursor-pointer disabled:opacity-50 transition-all"
                >
                  <option value="Direct Video Consultation (Google Meet / Zoom)">📹 1-on-1 Architecture Video Call</option>
                  <option value="Direct WhatsApp / Slack Connect">💬 Direct WhatsApp / Slack</option>
                  <option value="Direct Phone Call">📞 Direct Phone Call</option>
                  <option value="Technical Email Architecture Review">✉️ In-Depth Technical Email</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                System Architecture Challenge / Tech Scope
              </label>
              <textarea
                name="architectureNotes"
                rows={3}
                disabled={scopingStatus === "loading"}
                placeholder="Describe your tech stack, system bottlenecks, scale targets, or mission-critical objectives..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all resize-y disabled:opacity-50"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-normal">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Protected by mutual bilateral NDA confidentiality</span>
            </div>

            {scopingStatus === "error" && scopingError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg text-left">
                {scopingError}
              </div>
            )}

            <button
              type="submit"
              disabled={scopingStatus === "loading"}
              className="w-full h-11 bg-[#EA580C] hover:bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-1 flex items-center justify-center gap-2 shadow-xs"
            >
              {scopingStatus === "loading" ? "Connecting..." : "Request Direct Technical Scoping ⚡"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
