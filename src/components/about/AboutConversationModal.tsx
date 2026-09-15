"use client";

import React, { useState, useEffect } from "react";

interface AboutConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export default function AboutConversationModal({
  isOpen,
  onClose,
  defaultTopic = "Enterprise Architecture & Systems",
}: AboutConversationModalProps) {
  const [selectedTopic, setSelectedTopic] = useState(defaultTopic);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (defaultTopic) {
      setSelectedTopic(defaultTopic);
    }
  }, [defaultTopic]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const phone = formData.get("phone") as string;
    const topic = formData.get("topic") as string;
    const message = formData.get("message") as string;
    const needNda = formData.get("needNda") === "on";

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    if (!message) {
      setStatus("error");
      setErrorMessage("Please enter your message or project requirements.");
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
          email,
          phone,
          company: company || "About Page Inquiry",
          service: `Strategic Consultation (${topic})`,
          project_details: message,
          need_nda: needNda,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
        }, 2500);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (err: unknown) {
      setStatus("error");
      const errMessage = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMessage(errMessage);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white text-[#0F172A] rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl border border-slate-200 text-left max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-lg cursor-pointer leading-none p-1.5 rounded-md transition-colors"
          title="Close modal"
        >
          ✕
        </button>

        <span className="text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider font-mono block mb-1">
          ⚡ DIRECT ARCHITECTURAL CONSULTATION
        </span>
        <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-1">
          Start a Conversation
        </h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Connect directly with our engineering leadership to discuss your system architecture, technical constraints, or roadmap.
        </p>

        {status === "success" ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center leading-relaxed">
            ✓ Conversation Request Received! Our senior solutions architect will review your project details and follow up within 24 hours.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
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
                  name="email"
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
                  Organization / Company
                </label>
                <input
                  name="company"
                  disabled={status === "loading"}
                  placeholder="Company Name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                />
              </div>
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
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Primary Topic of Interest
              </label>
              <select
                name="topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={status === "loading"}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white cursor-pointer disabled:opacity-50 transition-all"
              >
                <option value="Enterprise Architecture & Systems">Enterprise Architecture &amp; Systems</option>
                <option value="Cloud Modernization & DevOps">Cloud Modernization &amp; DevOps</option>
                <option value="Scalable Web & Mobile Engineering">Scalable Web &amp; Mobile Engineering</option>
                <option value="AI Integration & Data Pipelines">AI Integration &amp; Data Pipelines</option>
                <option value="Security Audit & Resilience">Security Audit &amp; Resilience</option>
                <option value="General Strategic Inquiry">General Strategic Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Message / Project Context <span className="text-[#EA580C]">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={3}
                disabled={status === "loading"}
                placeholder="Describe your current system challenges, goals, or technical timeline..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50 resize-none"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-0.5">
              <input
                type="checkbox"
                name="needNda"
                disabled={status === "loading"}
                className="accent-[#EA580C] rounded cursor-pointer"
              />
              <span className="text-[11px] text-slate-600 font-medium">
                Request mutual Bilateral NDA prior to discussing sensitive architecture
              </span>
            </label>

            {errorMessage && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                disabled={status === "loading"}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-1.5 bg-[#EA580C] hover:bg-orange-600 text-white font-bold py-2.5 px-5 min-w-[170px] rounded-lg text-xs tracking-wider uppercase font-mono transition-colors shadow-xs cursor-pointer disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span>&rarr;</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
