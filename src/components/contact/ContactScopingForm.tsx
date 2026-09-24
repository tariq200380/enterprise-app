"use client";

import React, { useState } from "react";

const CAPABILITIES = [
  { id: "software-dev", label: "Software Dev", value: "Software Development" },
  { id: "cloud-devops", label: "Cloud & DevOps", value: "Cloud Infrastructure" },
  { id: "ai-agents", label: "AI & Agents", value: "AI & Automation" },
  { id: "dist-sys", label: "Distributed Sys", value: "Distributed Systems" },
  { id: "cybersec", label: "Cybersecurity", value: "Cybersecurity & Zero-Trust" },
  { id: "databases", label: "Databases", value: "Database & Replication" },
  { id: "high-speed-apis", label: "High-Speed APIs", value: "High-Throughput APIs" },
  { id: "modernization", label: "Modernization", value: "Enterprise Modernization" },
];

export default function ContactScopingForm() {
  const [selectedService, setSelectedService] = useState("Software Development");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const company = (fd.get("company") as string)?.trim() || "Confidential Enterprise";
    const timeline = (fd.get("timeline") as string) || "Immediate (< 2 weeks)";
    const message = (fd.get("message") as string)?.trim();

    if (!name) {
      setStatus("error");
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    if (!message) {
      setStatus("error");
      setErrorMessage("Please provide a brief technical architecture overview.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: name,
          email,
          company,
          service: selectedService,
          project_details: `Timeline: ${timeline}\n\nTechnical Overview:\n${message}`,
          need_nda: true,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        form.reset();
        setSelectedService("Software Development");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit technical inquiry. Please try again.");
      }
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="col-span-12 md:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-9 shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-left">
      <div className="border-b border-[#E2E8F0] pb-5 mb-7">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#EA580C] block mb-1">
          PROJECT SPECIFICATION &amp; SCOPING
        </span>
        <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-[#0F172A] tracking-tight">
          Scope Your Engineering Initiative
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal leading-relaxed">
          Fill out the parameters below to receive an architectural estimate, technology matrix,
          and discovery invite from our principal architects.
        </p>
      </div>

      {status === "success" && (
        <div
          role="alert"
          className="p-5 mb-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-4 text-left animate-in fade-in duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
            </div>
            <div>
              <h4 className="text-sm font-outfit font-bold text-emerald-900 mb-1">
                Technical Inquiry Submitted Successfully!
              </h4>
              <p className="text-xs text-emerald-700 leading-relaxed font-normal">
                Our principal solutions architects have received your project parameters. A guaranteed
                architectural estimate and mutual NDA confirmation will be delivered within 2–4 hours.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-emerald-700 hover:text-emerald-950 font-bold shrink-0 cursor-pointer p-1 leading-none text-base"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* 1. Required Capability */}
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">
            1. Select the primary capability needed
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CAPABILITIES.map((cap) => {
              const isSelected = selectedService === cap.value;
              return (
                <label key={cap.id} className="cursor-pointer select-none">
                  <input
                    type="radio"
                    name="service"
                    value={cap.value}
                    checked={isSelected}
                    onChange={() => setSelectedService(cap.value)}
                    disabled={status === "loading"}
                    className="peer sr-only"
                  />
                  <span
                    className={`block p-2.5 text-xs text-center rounded-lg border transition-colors truncate font-medium ${
                      isSelected
                        ? "bg-[#0F172A] text-white border-[#0F172A] font-semibold"
                        : "border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {cap.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 2. Contact & Organization */}
        <div className="flex flex-col gap-4">
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            2. Contact &amp; Organization Details
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Full Name <span className="text-[#EA580C]">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                disabled={status === "loading"}
                placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Work Email <span className="text-[#EA580C]">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={status === "loading"}
                placeholder="john@company.com"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                disabled={status === "loading"}
                placeholder="e.g. Acme Corp"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Target Timeline
              </label>
              <select
                name="timeline"
                disabled={status === "loading"}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all cursor-pointer disabled:opacity-50"
              >
                <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                <option value="1-2 Months">1–2 Months</option>
                <option value="Quarterly Roadmap">Quarterly Roadmap</option>
                <option value="Exploratory Architecture">Exploratory Architecture</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Requirements Overview */}
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
            3. Technical Architecture Overview <span className="text-[#EA580C]">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={4}
            disabled={status === "loading"}
            placeholder="Describe your architectural challenge, current tech stack, scale targets, or mission-critical objectives..."
            className="w-full px-3.5 py-3 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all resize-y disabled:opacity-50"
          />
        </div>

        {/* Security Guarantee Notice */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <p className="text-xs text-slate-600 font-normal leading-relaxed">
            <strong className="text-[#0F172A] font-semibold">Zero-Obligation Mutual NDA:</strong> All submitted
            architecture specs and business context are covered by default confidentiality protocols.
          </p>
        </div>

        {status === "error" && errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg text-left">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-1">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center bg-[#0F172A] hover:bg-[#EA580C] text-white font-semibold py-2.5 px-6 min-w-[200px] rounded-lg text-xs tracking-wider uppercase transition-colors duration-200 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {status === "loading" ? "Submitting Inquiry..." : "Submit Scoping Request →"}
          </button>
        </div>
      </form>
    </div>
  );
}
