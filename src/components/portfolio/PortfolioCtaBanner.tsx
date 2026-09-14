"use client";

import React, { useState, useEffect } from "react";

export default function PortfolioCtaBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    setStatus("idle");
    setErrorMessage("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const fullName = String(formData.get("fullName") || "").trim();
    const workEmail = String(formData.get("workEmail") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const contactMethod = String(formData.get("contactMethod") || "Direct Video Consultation (Google Meet / Zoom)");
    const architectureNotes = String(formData.get("architectureNotes") || "").trim();

    if (!fullName || !workEmail) {
      setStatus("error");
      setErrorMessage("Please fill in both your name and work email.");
      return;
    }

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fullName,
          name: fullName,
          fullName: fullName,
          email: workEmail,
          workEmail: workEmail,
          phone: phone || "",
          company: "Portfolio Technical Scoping",
          service: `Technical Team Scoping (${contactMethod})`,
          project_details: architectureNotes || "Direct scoping request from Portfolio Technical Scoping modal.",
          projectScope: architectureNotes,
          architectureNotes: architectureNotes,
          need_nda: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit request. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <section className="w-full bg-[#0B1120] py-14 sm:py-16 text-white text-center relative overflow-hidden border-t border-gray-800">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.22)_0%,transparent_65%)]"
        />
        <div className="max-w-2xl mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
          <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider font-mono">
            HAVE AN AMBITIOUS ENGINEERING INITIATIVE?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Let&apos;s Build Your Next High-Performance Platform
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed font-normal">
            Schedule a confidential sprint architecture consultation with our principal software architects.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={openModal}
              className="h-12 px-8 inline-flex items-center justify-center bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Start Technical Scoping
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TECHNICAL TEAM SCOPING FORM MODAL                                         */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white text-[#0F172A] rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl border border-slate-200 text-left my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-lg cursor-pointer leading-none p-1.5 rounded-md transition-colors"
              title="Close modal"
            >
              ✕
            </button>

            {/* Header */}
            <span className="text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider font-mono block mb-1">
              ⚡ DIRECT TECHNICAL TEAM SCOPING
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-1.5 tracking-tight">
              Connect with Technical Team
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Bypass sales queues. Connect directly with our Principal Software Architects to scope technical constraints, system scale, and delivery roadmaps.
            </p>

            {/* Technical Pod Banner */}
            <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-3 mb-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                ⚙️
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <span>Solutions &amp; Infrastructure Engineering Pod</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                </div>
                <div className="text-slate-600 text-[11px]">
                  Direct Engineering Channel &bull; Sub-2hr Response &bull; Mutual NDA
                </div>
              </div>
            </div>

            {status === "success" ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-base text-emerald-900">
                  Technical Scoping Request Submitted!
                </h4>
                <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                  Our Principal Architecture Team has received your specifications. A lead engineer will review your project and contact you directly within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-2 inline-flex items-center justify-center px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Close Window
                </button>
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#0052FF] focus:bg-white transition-all disabled:opacity-50"
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#0052FF] focus:bg-white transition-all disabled:opacity-50"
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#0052FF] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Preferred Channel
                    </label>
                    <select
                      name="contactMethod"
                      disabled={status === "loading"}
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#0052FF] focus:bg-white cursor-pointer disabled:opacity-50 transition-all"
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
                    disabled={status === "loading"}
                    placeholder="Describe your current tech stack, cloud requirements, scale targets, or engineering bottlenecks..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#0052FF] focus:bg-white transition-all resize-y disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-normal">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Protected by mutual bilateral NDA confidentiality</span>
                </div>

                {status === "error" && errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg text-left">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-11 bg-[#0052FF] hover:bg-[#0042D0] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-1 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
                >
                  {status === "loading" ? "Connecting to Pod..." : "Submit to Technical Team ⚡"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
