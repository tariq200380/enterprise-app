"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const INPUT_CLASS =
  "w-full px-3.5 py-2.5 text-sm bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] text-[#0F172A] placeholder:text-slate-400";
const LABEL_CLASS = "block text-xs font-semibold text-[#0F172A] mb-1.5";

const CAPABILITY_OPTIONS = [
  "Software Architecture & Bespoke Engineering",
  "UI/UX Product Design Systems",
  "Mobile Applications (iOS & Android)",
  "Cloud Infrastructure & Multi-Region DevOps",
  "Database Optimization & High Availability",
  "High-Throughput Web Development",
  "Enterprise AI, LLMs & Workflow Automation",
  "Digital Growth & Core Web Vitals",
];

export default function ServicesVision() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Lock body scroll and handle ESC key when modal is open
  useEffect(() => {
    if (!isModalOpen) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
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
    const company = String(formData.get("company") || "").trim();
    const service = String(formData.get("service") || CAPABILITY_OPTIONS[0]);
    const projectDetails = String(formData.get("projectDetails") || "").trim();
    const needNda = formData.get("needNda") === "on";

    if (!fullName || !workEmail) {
      setStatus("error");
      setErrorMessage("Please provide both your full name and work email.");
      return;
    }

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fullName,
          name: fullName,
          fullName,
          email: workEmail,
          workEmail,
          phone: phone || "",
          company: company || "Services Project Discussion",
          service: `Vision & Project Discussion: ${service}`,
          project_details: projectDetails || "Project discussion request submitted via Services page.",
          message: projectDetails,
          need_nda: needNda,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit project discussion request.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* SERVICES VISION CTA BANNER                                                */}
      {/* ========================================================================= */}
      <section className="relative w-full py-10 sm:py-12 lg:py-16 bg-[#F7F6F5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[850px] mx-auto text-center bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-[0_4px_16px_rgba(15,23,42,0.03)] box-border">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold text-[#0F172A] tracking-[-0.025em] mb-4 leading-tight">
              Let&apos;s Bring Your <span className="text-[#0052FF]">Vision to Life</span>
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#5B6472] leading-relaxed font-normal max-w-[620px] mx-auto mb-8">
              Tell us about your requirements and explore a practical technical approach for your project.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap w-full">
              <button
                type="button"
                onClick={openModal}
                className="w-full sm:w-[230px] max-w-[320px] sm:max-w-none h-[52px] px-5 text-[16px] font-semibold rounded-[10px] inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none bg-[#0052FF] text-white border border-[#0052FF] shadow-[0_2px_6px_rgba(0,82,255,0.18)] hover:bg-[#0043D6] hover:border-[#0043D6] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,82,255,0.25)] transition-all duration-200 cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <span className="text-[#FF6B00] font-extrabold text-base leading-none">&rarr;</span>
              </button>

              <Link
                href="/contact"
                className="w-full sm:w-[230px] max-w-[320px] sm:max-w-none h-[52px] px-5 text-[16px] font-semibold rounded-[10px] inline-flex items-center justify-center whitespace-nowrap leading-none bg-white text-[#0F172A] border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:bg-[#EFECE6] hover:border-[#CBD5E1] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-all duration-200"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE PROJECT DISCUSSION MODAL                                      */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-xl bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E2E8F0] bg-white flex items-center justify-between sticky top-0 z-20">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-[#0052FF] uppercase block mb-0.5">
                  Direct Engineering Channel
                </span>
                <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                  Discuss Your Project Scope
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {status === "success" ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-[#0F172A] mb-2">
                    Inquiry Received
                  </h4>
                  <p className="text-[15px] text-[#5B6472] max-w-md mx-auto leading-relaxed mb-6">
                    Thank you for reaching out. Our engineering directors will evaluate your requirements and contact you within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-[#0052FF] hover:bg-[#0043D6] text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-lg">
                      {errorMessage || "Failed to submit project request. Please verify inputs."}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL_CLASS}>
                        Full Name <span className="text-[#FF6B00]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Alex Morgan"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>
                        Work Email <span className="text-[#FF6B00]">*</span>
                      </label>
                      <input
                        type="email"
                        name="workEmail"
                        required
                        placeholder="alex@enterprise.com"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL_CLASS}>
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Vanguard Dynamics"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>
                      Target Capability Area
                    </label>
                    <select
                      name="service"
                      defaultValue={CAPABILITY_OPTIONS[0]}
                      className={INPUT_CLASS}
                    >
                      {CAPABILITY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>
                      Project Goals &amp; Timeline
                    </label>
                    <textarea
                      name="projectDetails"
                      rows={3}
                      placeholder="Briefly describe what you are building, target delivery window, and key architectural goals..."
                      className={`${INPUT_CLASS} resize-none`}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="needNda"
                      name="needNda"
                      className="w-4 h-4 text-[#0052FF] rounded border-gray-300 focus:ring-[#0052FF]"
                    />
                    <label htmlFor="needNda" className="text-xs text-slate-600 select-none">
                      Mutual NDA required prior to architectural review
                    </label>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-6 py-2.5 bg-[#0052FF] hover:bg-[#0043D6] disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Transmit Scope Request &rarr;</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
