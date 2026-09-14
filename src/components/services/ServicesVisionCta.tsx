"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ServicesVisionCta() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Lock body scroll and handle ESC key when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
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
    const service = String(formData.get("service") || "Software Architecture & Bespoke Engineering");
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
              {/* Discuss Your Project Button (Opens Project Form Modal) */}
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
      {/* DISCUSS YOUR PROJECT FORM MODAL                                           */}
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
          <div className="bg-white text-[#0F172A] rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl border border-[#E2E8F0] text-left my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-lg cursor-pointer leading-none p-1.5 rounded-md transition-colors"
              title="Close modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <span className="text-[10.5px] font-bold text-[#FF6B00] uppercase tracking-wider font-mono block mb-1">
              ⚡ PROJECT SCOPING &amp; CONSULTATION
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-1.5 tracking-tight">
              Discuss Your Project
            </h3>
            <p className="text-xs text-[#5B6472] mb-4 leading-relaxed">
              Share your project requirements, technical challenges, or delivery goals. Our Principal Architecture team will review your scope and provide structured technical guidance.
            </p>

            {/* Architecture Pod Banner */}
            <div className="bg-[#FFF3EB] border border-[#FFD8BE] rounded-xl p-3 mb-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                🚀
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <span>Solutions &amp; Systems Architecture Pod</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                </div>
                <div className="text-[#5B6472] text-[11px]">
                  Direct Technical Channel &bull; Confidential Assessment &bull; Mutual NDA
                </div>
              </div>
            </div>

            {status === "success" ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-base text-emerald-900">
                  Project Discussion Request Submitted!
                </h4>
                <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                  Our Principal Systems Team has received your details. A lead engineer will evaluate your project scope and contact you directly within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-2 inline-flex items-center justify-center px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
                {/* Full Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0F172A] mb-1">
                      Full Name <span className="text-[#FF6B00]">*</span>
                    </label>
                    <input
                      name="fullName"
                      required
                      autoComplete="name"
                      disabled={status === "loading"}
                      placeholder="e.g. Tariq Khan"
                      className="w-full px-3 py-2 bg-[#F7F6F5] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] outline-none focus:border-[#0052FF] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0F172A] mb-1">
                      Work Email <span className="text-[#FF6B00]">*</span>
                    </label>
                    <input
                      name="workEmail"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={status === "loading"}
                      placeholder="tariq@company.com"
                      className="w-full px-3 py-2 bg-[#F7F6F5] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] outline-none focus:border-[#0052FF] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0F172A] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      disabled={status === "loading"}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2 bg-[#F7F6F5] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] outline-none focus:border-[#0052FF] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0F172A] mb-1">
                      Company / Organization
                    </label>
                    <input
                      name="company"
                      disabled={status === "loading"}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-3 py-2 bg-[#F7F6F5] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] outline-none focus:border-[#0052FF] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Service of Interest */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#0F172A] mb-1">
                    Primary Service / Capability
                  </label>
                  <select
                    name="service"
                    disabled={status === "loading"}
                    defaultValue="Software Architecture & Bespoke Engineering"
                    className="w-full px-2.5 py-2 bg-[#F7F6F5] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] outline-none focus:border-[#0052FF] focus:bg-white cursor-pointer disabled:opacity-50 transition-all"
                  >
                    <option value="Software Architecture & Bespoke Engineering">
                      💻 Software Architecture &amp; Bespoke Engineering
                    </option>
                    <option value="Cloud Infrastructure & Kubernetes DevOps">
                      ☁️ Cloud Infrastructure &amp; Kubernetes DevOps
                    </option>
                    <option value="Enterprise AI Automation & Autonomous Agents">
                      🤖 Enterprise AI Automation &amp; Autonomous Agents
                    </option>
                    <option value="Web & Mobile Applications Development">
                      📱 Web &amp; Mobile Applications Development
                    </option>
                    <option value="Database Scaling & High-Throughput Optimization">
                      🗄️ Database Scaling &amp; High-Throughput Optimization
                    </option>
                    <option value="UI/UX Product Design & User Research">
                      🎨 UI/UX Product Design &amp; User Research
                    </option>
                    <option value="Cybersecurity, Compliance & Threat Modeling">
                      🔒 Cybersecurity, Compliance &amp; Threat Modeling
                    </option>
                    <option value="Comprehensive Enterprise Digital Transformation">
                      🌐 Comprehensive Enterprise Digital Transformation
                    </option>
                  </select>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#0F172A] mb-1">
                    Project Requirements / Scope Notes
                  </label>
                  <textarea
                    name="projectDetails"
                    rows={3}
                    disabled={status === "loading"}
                    placeholder="Briefly describe what you're looking to build, technical requirements, timelines, or bottlenecks..."
                    className="w-full px-3 py-2 bg-[#F7F6F5] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] outline-none focus:border-[#0052FF] focus:bg-white transition-all resize-y disabled:opacity-50"
                  />
                </div>

                {/* Mutual NDA Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="needNda"
                    name="needNda"
                    defaultChecked
                    disabled={status === "loading"}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#0052FF] focus:ring-[#0052FF] cursor-pointer"
                  />
                  <label htmlFor="needNda" className="text-[11px] text-[#5B6472] cursor-pointer select-none">
                    Protect details under mutual bilateral Non-Disclosure Agreement (NDA)
                  </label>
                </div>

                {/* Error Banner */}
                {status === "error" && errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg text-left">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-11 bg-[#0052FF] hover:bg-[#0043D6] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50 mt-1 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
                >
                  {status === "loading" ? (
                    <span>Submitting Specifications...</span>
                  ) : (
                    <>
                      <span>Submit Project Discussion Request</span>
                      <span className="text-[#FF6B00] font-extrabold text-sm">&rarr;</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
