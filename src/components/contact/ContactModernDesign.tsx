"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactModernDesign() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [isScopingModalOpen, setIsScopingModalOpen] = useState(false);
  const [scopingStatus, setScopingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [scopingError, setScopingError] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setStatus("idle");
    setErrorMessage("");
    setIsCustom(false);
  };

  const closeScopingModal = () => {
    setIsScopingModalOpen(false);
    setScopingStatus("idle");
    setScopingError("");
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
          closeScopingModal();
        }, 2500);
      } else {
        setScopingStatus("error");
        setScopingError(data.error || "Failed to submit technical scoping request. Please try again.");
      }
    } catch (err: any) {
      setScopingStatus("error");
      setScopingError(err.message || "Network error. Please try again.");
    }
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
    const timeDetail = isCustom && customDate ? `Custom: ${customDate} at ${customTime || "Flexible"}` : slot;

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
          closeModal();
        }, 2500);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to schedule call. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Network error. Please try again.");
    }
  };
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] font-sans antialiased text-left">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (DARK WITH AMBIENT ORANGE GLOW & STAT CARDS)              */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#0B1120] py-14 sm:py-20 px-6 sm:px-10 lg:px-16 relative overflow-hidden text-left border-b border-white/10">
        {/* Ambient Orange Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,107,0,0.17)_0%,rgba(255,107,0,0.05)_45%,rgba(11,17,32,0)_70%),radial-gradient(circle_at_0%_50%,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.05)_40%,rgba(11,17,32,0)_65%),radial-gradient(circle_at_100%_50%,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.05)_40%,rgba(11,17,32,0)_65%)]"
        />
        {/* Subtle 36px Grid Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.035]"
        />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <div className="text-[11px] font-semibold uppercase tracking-[3px] text-[#AEB6C2] mb-2.5 font-mono">
              DIRECT SOLUTIONS ARCHITECTURE &amp; ENGINEERING
            </div>
            <div className="w-[60px] h-[2px] bg-[#FF6B00] opacity-80 mb-6" />

            <h1 className="text-[34px] sm:text-[46px] font-extrabold text-white leading-[1.1] mb-1 tracking-tight">
              Let&apos;s Architect Your
            </h1>
            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-white leading-[1.2] mb-4 tracking-tight">
              Next Critical Platform.
            </h2>

            <p className="text-base font-normal text-white/75 leading-[1.7] max-w-[520px]">
              Connect directly with our senior principal software architects. Skip the sales pitch
              — receive an actionable architectural scoping blueprint, SLA guarantee, and
              zero-obligation mutual NDA protection within 2 to 4 hours.
            </p>
          </div>

          {/* Right Column: 4 Stat Metrics (No Boxes) */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-y-8 gap-x-6 sm:gap-x-10 text-left">
            <div>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                RESPONSE GUARANTEE
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 mb-1">
                &lt; 2 Hours
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                Direct acknowledgment and preliminary review by a principal solutions engineer.
              </p>
            </div>

            <div>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                ENGINEERING PAIRING
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 mb-1">
                100% Direct
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                No non-technical account managers. Every conversation is with lead systems architects.
              </p>
            </div>

            <div>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                LEGAL &amp; IP
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 mb-1">
                Mutual NDA
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                Instant bilateral NDA protection before deep architecture or codebase sharing.
              </p>
            </div>

            <div>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                DELIVERY COMMITMENT
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 mb-1">
                99.99% SLA
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                Contractual milestones, sprint cadence, and production uptime backed by guarantees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN TECHNICAL SCOPING & DIRECT CONTACT HUB                   */}
      {/* ========================================================================= */}
      <section id="scoping-form" className="w-full py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (7 cols): Project Specification Form */}
            <div className="col-span-12 lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-9 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="border-b border-[#E2E8F0] pb-5 mb-7">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#EA580C] font-mono block mb-1">
                  PROJECT SPECIFICATION &amp; SCOPING
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Scope Your Engineering Initiative
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal leading-relaxed">
                  Fill out the parameters below to receive an architectural estimate, technology
                  matrix, and discovery invite from our principal architects.
                </p>
              </div>

              <form action="/api/admin/inquiries" method="POST" className="flex flex-col gap-6">
                {/* 1. Required Capability */}
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">
                    1. Select the primary capability needed
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <label className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="service"
                        value="Software Development"
                        defaultChecked
                        className="peer sr-only"
                      />
                      <span className="block p-2.5 text-xs text-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 font-medium peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-[#0F172A] hover:bg-slate-100 transition-colors truncate">
                        Software Dev
                      </span>
                    </label>

                    <label className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="service"
                        value="Cloud Infrastructure"
                        className="peer sr-only"
                      />
                      <span className="block p-2.5 text-xs text-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 font-medium peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-[#0F172A] hover:bg-slate-100 transition-colors truncate">
                        Cloud &amp; DevOps
                      </span>
                    </label>

                    <label className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="service"
                        value="AI & Automation"
                        className="peer sr-only"
                      />
                      <span className="block p-2.5 text-xs text-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 font-medium peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-[#0F172A] hover:bg-slate-100 transition-colors truncate">
                        AI &amp; Agents
                      </span>
                    </label>

                    <label className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="service"
                        value="Distributed Systems"
                        className="peer sr-only"
                      />
                      <span className="block p-2.5 text-xs text-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 font-medium peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-[#0F172A] hover:bg-slate-100 transition-colors truncate">
                        Distributed Sys
                      </span>
                    </label>

                    <label className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="service"
                        value="Cybersecurity & Zero-Trust"
                        className="peer sr-only"
                      />
                      <span className="block p-2.5 text-xs text-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 font-medium peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-[#0F172A] hover:bg-slate-100 transition-colors truncate">
                        Cybersecurity
                      </span>
                    </label>

                    <label className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="service"
                        value="Database & Replication"
                        className="peer sr-only"
                      />
                      <span className="block p-2.5 text-xs text-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 font-medium peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-[#0F172A] hover:bg-slate-100 transition-colors truncate">
                        Databases
                      </span>
                    </label>

                    <label className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="service"
                        value="High-Throughput APIs"
                        className="peer sr-only"
                      />
                      <span className="block p-2.5 text-xs text-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 font-medium peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-[#0F172A] hover:bg-slate-100 transition-colors truncate">
                        High-Speed APIs
                      </span>
                    </label>

                    <label className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="service"
                        value="Enterprise Modernization"
                        className="peer sr-only"
                      />
                      <span className="block p-2.5 text-xs text-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 font-medium peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-[#0F172A] hover:bg-slate-100 transition-colors truncate">
                        Modernization
                      </span>
                    </label>
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
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all"
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
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all"
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
                        placeholder="e.g. Acme Corp"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        name="timeline"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all"
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
                    placeholder="Describe your architectural challenge, current tech stack, scale targets, or mission-critical objectives..."
                    className="w-full px-3.5 py-3 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all resize-y"
                  />
                </div>

                {/* Security Guarantee Notice */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    <strong className="text-[#0F172A] font-semibold">Zero-Obligation Mutual NDA:</strong> All submitted architecture specs and business context are covered by default confidentiality protocols.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[#0F172A] hover:bg-[#EA580C] text-white font-bold py-2.5 px-4 min-w-[185px] rounded-lg text-xs tracking-wider uppercase font-mono transition-colors duration-200 shadow-xs cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column (5 cols): Direct Discovery Card & Communication Hub */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
              {/* Card 1: Direct Discovery Call (Dark Card with Orange Radial Glow, matching Portfolio preview cards!) */}
              <div
                id="direct-call"
                className="relative bg-[#0B1120] rounded-2xl border border-white/10 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-lg text-white min-h-[320px]"
              >
                {/* Ambient Orange Radial Glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_40%,rgba(249,115,22,0.25)_0%,rgba(249,115,22,0.06)_45%,rgba(11,17,32,0)_70%)]"
                />
                {/* Subtle Grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.035]"
                />

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full text-white/90 text-xs font-mono font-medium mb-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></span>
                    INSTANT ARCHITECTURAL DISCOVERY
                  </span>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-2">
                    Need a Direct Architectural Call?
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
                    Skip the formal specification and book a 30-minute technical discovery session
                    directly with one of our Principal Systems Architects.
                  </p>

                  <div className="space-y-2 mb-6 font-mono text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Direct code &amp; system architecture review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Zero sales reps — 100% senior engineers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Mutual bilateral NDA protection</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between flex-wrap gap-3">
                  <div className="text-[11px] font-mono text-white/60">
                    Availability: <span className="text-orange-400 font-bold">Available Daily / Flexible</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(true);
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#EA580C] hover:bg-orange-600 text-white font-bold py-2.5 px-4 min-w-[185px] rounded-lg text-xs tracking-wider uppercase font-mono transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Book 30-Min Call</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Direct Communication Channels */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#EA580C] font-mono block mb-3">
                  DIRECT VERIFICATION CHANNELS
                </span>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5 pb-3.5 border-b border-[#E2E8F0]">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/70 flex items-center justify-center text-base shrink-0 text-[#EA580C]">
                      ✉
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">
                        Official Technical Inquiries
                      </div>
                      <a
                        href="mailto:info@creed-tech.com"
                        className="text-xs text-[#0052FF] hover:underline font-mono font-medium"
                      >
                        info@creed-tech.com
                      </a>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Monitored continuously by on-duty principal architects.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pb-3.5 border-b border-[#E2E8F0]">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/70 flex items-center justify-center text-base shrink-0 text-[#EA580C]">
                      ☎
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">
                        Direct Engineering Phone
                      </div>
                      <a
                        href="tel:+923219204488"
                        className="text-xs text-[#0F172A] hover:text-[#EA580C] font-mono font-medium"
                      >
                        +92 321 9204488
                      </a>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Mon–Fri, 9:00 AM – 7:00 PM (Direct engineering routing).
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/70 flex items-center justify-center text-base shrink-0 text-[#EA580C]">
                      📍
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">
                        Executive Operations Office
                      </div>
                      <div className="text-xs text-slate-600 font-medium">
                        Office # 02, Main Shopping Center, Sheikhupura.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Engineering Capacity Status */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A] animate-pulse"></span>
                    <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono">
                      Q3 Pod Allocation
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-white bg-[#0F172A] px-2 py-0.5 rounded">
                    ACTIVE SPRINT SLOTS
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Principal architect pods across North America, Eastern Europe, and South Asia are
                  accepting new system engineering initiatives for immediate architectural discovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TRANSPARENT 4-STEP ONBOARDING PROTOCOL                                 */}
      {/* ========================================================================= */}
      <section className="w-full py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#EA580C] font-mono mb-2 block">
              HOW WE ENGAGE &amp; DELIVER
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-[#0F172A] tracking-tight leading-tight mb-3">
              Transparent, Zero-Friction Onboarding
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              From initial technical scoping to dedicated sprint kickoff, our onboarding protocol
              is engineered for velocity, complete transparency, and architectural rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Step 01 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-3">
                  01
                </span>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                  Technical Scoping &amp; NDA
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Mutual NDA execution followed by a deep-dive technical review of your system
                  parameters, dependencies, and business goals.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 border-t border-[#E2E8F0] pt-2.5">
                TIMEFRAME: DAY 1
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-3">
                  02
                </span>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                  Architecture Blueprint
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Our principal engineers deliver a comprehensive architectural diagram, technology
                  matrix, milestone breakdown, and SLA agreement.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 border-t border-[#E2E8F0] pt-2.5">
                TIMEFRAME: DAY 2–3
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-3">
                  03
                </span>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                  Dedicated Pod Formation
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  A bespoke pod of senior principal engineers is locked into your context with
                  dedicated Slack channels and synchronized sprint cadences.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 border-t border-[#E2E8F0] pt-2.5">
                TIMEFRAME: DAY 4–5
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-3">
                  04
                </span>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                  Sprint Zero &amp; Production
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Immediate codebase assimilation, CI/CD pipeline automation, and delivery of the
                  first functional production milestone with zero lag.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 border-t border-[#E2E8F0] pt-2.5">
                TIMEFRAME: WEEK 1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ENTERPRISE TECHNICAL FAQ                                               */}
      {/* ========================================================================= */}
      <section className="w-full py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#EA580C] font-mono mb-2 block">
              COMMONLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-[#0F172A] tracking-tight leading-tight mb-3">
              Technical Scoping &amp; Engagement FAQ
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Clear answers regarding our engineering model, intellectual property, and SLA
              commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs">
              <h4 className="text-base font-bold text-[#0F172A] mb-2">
                Who will actually engineer our software platform?
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                100% of your software is engineered by senior principal architects and domain specialists.
                We have zero non-technical project managers, zero offshore delegation layers, and zero
                junior developer bait-and-switch.
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs">
              <h4 className="text-base font-bold text-[#0F172A] mb-2">
                Who owns the intellectual property and code?
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                You own 100% of all intellectual property, source code, documentation, and system
                artifacts from day one. All code is committed directly into your private enterprise
                repositories.
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs">
              <h4 className="text-base font-bold text-[#0F172A] mb-2">
                How quickly can a dedicated pod begin execution?
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                Following mutual NDA and architectural blueprint alignment, dedicated pods deploy
                within 5 to 7 business days, achieving full sprint velocity within the first 48 hours
                of kickoff.
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs">
              <h4 className="text-base font-bold text-[#0F172A] mb-2">
                How do you enforce security and compliance standards?
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                All development adheres strictly to SOC 2 Type II, ISO 27001, and GDPR controls.
                Every build includes automated static code analysis, vulnerability scanning, and
                cryptographic audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM TECHNICAL RFP CALL TO ACTION BANNER                             */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#0B1120] py-14 sm:py-16 text-white text-center relative overflow-hidden">
        {/* Soft Orange Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.22)_0%,transparent_65%)]"
        />
        <div className="max-w-2xl mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
          <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider font-mono">
            READY TO ELEVATE YOUR SYSTEM ARCHITECTURE?
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
              onClick={() => {
                setIsScopingModalOpen(true);
                setScopingStatus("idle");
                setScopingError("");
              }}
              className="inline-flex items-center justify-center gap-1.5 bg-black hover:bg-[#EA580C] hover:border-[#EA580C] text-white font-bold py-2.5 px-4 rounded-lg text-xs tracking-wider uppercase font-mono border border-white/20 transition-colors shadow-xs cursor-pointer"
            >
              <span>Start Technical Scoping</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE DISCOVERY CALL SCHEDULING MODAL                            */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white text-[#0F172A] rounded-2xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl border border-slate-200 text-left">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-lg cursor-pointer leading-none p-1.5 rounded-md transition-colors"
              title="Close modal"
            >
              ✕
            </button>

            <span className="text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider font-mono block mb-1">
              ⚡ DIRECT ARCHITECTURAL DISCOVERY
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-1">
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
                  className="w-full h-11 bg-[#EA580C] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2 shadow-xs"
                >
                  {status === "loading" ? "Scheduling..." : "Confirm Call ⚡"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. DIRECT TECHNICAL SCOPING CONSULTATION MODAL                            */}
      {/* ========================================================================= */}
      {isScopingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeScopingModal();
          }}
        >
          <div className="bg-white text-[#0F172A] rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl border border-slate-200 text-left my-8">
            <button
              type="button"
              onClick={closeScopingModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-lg cursor-pointer leading-none p-1.5 rounded-md transition-colors"
              title="Close modal"
            >
              ✕
            </button>

            {/* Header */}
            <span className="text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider font-mono block mb-1">
              ⚡ DIRECT TECHNICAL CONSULTATION
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-1.5 tracking-tight">
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
                  className="w-full h-11 bg-[#EA580C] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-1 flex items-center justify-center gap-2 shadow-xs"
                >
                  {scopingStatus === "loading" ? "Connecting..." : "Request Direct Technical Scoping ⚡"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
