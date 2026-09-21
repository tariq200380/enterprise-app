"use client";

import React, { useState } from "react";

interface ContactScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactScheduleModal({
  isOpen,
  onClose,
}: ContactScheduleModalProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
    setIsCustom(false);
    onClose();
  };

  const handleScheduleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fullName = (fd.get("fullName") as string)?.trim();
    const workEmail = (fd.get("workEmail") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim() || "";
    const slot = fd.get("slot") as string;
    const customDate = fd.get("customDate") as string;
    const customTime = fd.get("customTime") as string;
    const timeDetail =
      isCustom && customDate ? `Custom: ${customDate} at ${customTime || "Flexible"}` : slot;

    if (!fullName) {
      setStatus("error");
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!workEmail || !emailRegex.test(workEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fullName,
          email: workEmail,
          phone,
          company: "Direct Discovery Call",
          service: "Direct Architectural Discovery Call",
          project_details: `Preferred Slot: ${timeDetail}`,
          need_nda: true,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to schedule call. Please try again.");
      }
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMessage(msg);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white text-[#0F172A] rounded-2xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl border border-slate-200 text-left">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-lg cursor-pointer leading-none p-1.5 rounded-md transition-colors"
          title="Close modal"
        >
          ✕
        </button>

        <span className="text-[10.5px] font-semibold text-[#EA580C] uppercase tracking-wider block mb-1">
          ⚡ DIRECT ARCHITECTURAL DISCOVERY
        </span>
        <h3 className="text-lg sm:text-xl font-outfit font-bold text-[#0F172A] mb-1">
          Schedule 30-Min Discovery Call
        </h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Pick your preferred time slot to talk directly with our Principal Solutions Architect.
        </p>

        {status === "success" ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center leading-relaxed">
            ✓ Discovery Call Scheduled! A calendar invite and mutual NDA confirmation have been sent to your email.
          </div>
        ) : (
          <form onSubmit={handleScheduleSubmit} noValidate className="flex flex-col gap-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-[#EA580C]">*</span>
                </label>
                <input
                  name="fullName"
                  required
                  autoComplete="name"
                  disabled={status === "loading"}
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
                  disabled={status === "loading"}
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
                  disabled={status === "loading"}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  name="slot"
                  disabled={status === "loading"}
                  onChange={(e) => setIsCustom(e.target.value === "Custom")}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white cursor-pointer disabled:opacity-50 transition-all"
                >
                  <option value="Today (Within 2-4 Hours)">⚡ Today (Within 2–4 Hours)</option>
                  <option value="Tomorrow Morning (9:00 AM EST)">Tomorrow Morning (9:00 AM EST)</option>
                  <option value="Tomorrow Afternoon (2:00 PM EST)">Tomorrow Afternoon (2:00 PM EST)</option>
                  <option value="Custom">Custom Date &amp; Time</option>
                </select>
              </div>
            </div>

            {isCustom && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-orange-50/70 border border-orange-200 rounded-xl">
                <div>
                  <label className="block text-[10.5px] font-semibold text-orange-950 mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    name="customDate"
                    required
                    disabled={status === "loading"}
                    min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                    defaultValue={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                    className="w-full px-2.5 py-1.5 bg-white border border-orange-300 rounded-lg text-xs outline-none focus:border-[#EA580C] disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-orange-950 mb-1">
                    Select Time
                  </label>
                  <input
                    type="time"
                    name="customTime"
                    disabled={status === "loading"}
                    defaultValue="14:00"
                    className="w-full px-2.5 py-1.5 bg-white border border-orange-300 rounded-lg text-xs outline-none focus:border-[#EA580C] disabled:opacity-50"
                  />
                </div>
              </div>
            )}

            {status === "error" && errorMessage && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg text-left">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-11 bg-[#EA580C] hover:bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2 shadow-xs"
            >
              {status === "loading" ? "Scheduling..." : "Confirm Call ⚡"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
