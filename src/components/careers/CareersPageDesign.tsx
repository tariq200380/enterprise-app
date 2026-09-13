"use client";

import React, { useState } from "react";
import Link from "next/link";
import SecurityComplaintModal from "./SecurityComplaintModal";
import JobApplicationModal from "./JobApplicationModal";

export default function CareersPageDesign() {
  const [activeRoleModal, setActiveRoleModal] = useState<string | null>(null);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F6F5] border-b border-[#E6E4DF] font-sans text-[#0F172A]">
      {/* ---------------------------------------------------- */}
      {/* SECTION 1: HERO & METRICS (Light Offwhite: #F7F6F5) */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full py-12 sm:py-16 overflow-hidden bg-[#F7F6F5] border-b border-[#E6E4DF]">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e5e2db80_1px,transparent_1px),linear-gradient(to_bottom,#e5e2db80_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_65%,transparent_100%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-[#0F172A] tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Build digital<br className="hidden sm:inline" />
            {" "}infrastructure that<br className="hidden sm:inline" />
            {" "}<span className="text-[#FF6B00]">endures.</span> Not just demos.
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal">
            We are an autonomous collective of principal systems architects, AI engineers, and design artisans. Zero micromanagement, zero bureaucratic sprawl, and zero throwaway code.
          </p>

          {/* 4 Connected Metrics Grid */}
          <div className="mt-10 sm:mt-12 max-w-5xl mx-auto bg-white border border-[#E6E4DF] rounded-2xl shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E4DF] text-left">
              {/* Metric 1 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  WORK MODEL
                </span>
                <div className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight leading-snug">
                  100% Remote &amp; Async
                </div>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Germany · Spain · USA · Global hubs
                </p>
              </div>

              {/* Metric 2 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  HIRING SLA
                </span>
                <div className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight leading-snug">
                  7-Day Total Cycle
                </div>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Zero ghosting · Paid practical challenge
                </p>
              </div>

              {/* Metric 3 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  HARDWARE ALLOWANCE
                </span>
                <div className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight leading-snug">
                  $5,000 Gear Budget
                </div>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Apple M-Max / Threadripper · 4K OLED
                </p>
              </div>

              {/* Metric 4 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  AUTONOMY LEVEL
                </span>
                <div className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight leading-snug">
                  Direct Architect-to-Client
                </div>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Zero non-technical middle layers
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <Link
              href="#roles"
              className="w-full sm:w-44 inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#e05d00] active:scale-[0.99] text-white text-sm font-semibold shadow-xs transition-all duration-200"
            >
              Explore &rarr;
            </Link>
            <button
              type="button"
              onClick={() => setActiveRoleModal("Senior Talent Network")}
              className="w-full sm:w-44 inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white hover:bg-[#F4F3F1] active:scale-[0.99] text-slate-800 text-sm font-semibold border border-[#E6E4DF] shadow-2xs transition-all duration-200 cursor-pointer"
            >
              Talent Network
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: WHY SENIOR ENGINEERS THRIVE               */}
      {/* ---------------------------------------------------- */}
      <section className="w-full bg-[#F7F6F5] border-b border-[#E6E4DF] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Creed Tech Hiring Guarantee Banner (Thora Dark Offwhite: #F4F3F1) */}
          <div className="bg-[#F4F3F1] border border-[#E6E4DF] rounded-2xl p-4 sm:p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs mb-12 sm:mb-16">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-[#FF6B00]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">The Creed Tech Hiring Guarantee</h4>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 font-normal">
                  Every candidate receives personalized feedback from a Principal Architect within 24 hours of every interview stage.
                </p>
              </div>
            </div>
            <Link
              href="#roles"
              className="text-xs sm:text-sm font-semibold text-[#FF6B00] hover:text-[#e05d00] hover:underline transition-colors shrink-0 sm:ml-4 inline-flex items-center gap-1"
            >
              <span>View upcoming roles</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F172A] tracking-tight leading-tight">
              Why senior engineers thrive at Creed Tech
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              We built the engineering organization we always wished we had: intellectual rigor, sovereign autonomy, and genuine respect for deep technical craftsmanship.
            </p>
          </div>

          {/* 6 Benefit Cards (Clean White on Light Offwhite) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
            {/* Benefit Card 1 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Autonomous Senior Pods
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                  No non-technical layers assigning arbitrary tickets. You partner directly with client engineering leaders and make architectural choices with sovereign authority.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
                Lead-level ownership · Zero micromanagement
              </div>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                    <line x1="16" y1="8" x2="2" y2="22" />
                    <line x1="17.5" y1="15" x2="9" y2="15" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Deep Asynchronous Focus
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                  We default to clear written RFCs, technical briefs, and asynchronous reviews. We protect 4+ continuous hours of daily deep-maker time with zero meeting intrusions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
                RFC-driven · Minimal meeting fatigue
              </div>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Top-Tier Global Compensation
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                  We calibrate compensation against top global technology hubs. We benchmark salaries transparently against US/European tier-1 levels regardless of where you live.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
                Global tier-1 banding · Regular reviews
              </div>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M2 20h20" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  $5K Gear &amp; Ergonomics Stipend
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                  Choose your battle station: Apple MacBook Pro Max, custom Linux Threadripper workstation, Studio Display, and Herman Miller seating stipend refreshed biennially.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
                Top-spec hardware · Ergonomic support
              </div>
            </div>

            {/* Benefit Card 5 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Annual Learning &amp; Research Fund
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                  Continuous growth is an absolute requirement. Dedicated annual funds for international technical conferences (RustConf, KubeCon, NeurIPS), certifications, and book allowances.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
                Conferences · Open-source sponsorship
              </div>
            </div>

            {/* Benefit Card 6 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                  Comprehensive Health &amp; Unlimited PTO
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                  Full worldwide private health, dental, and vision insurance coverage. Flexible paid time off with mandatory 25+ days minimum annual rest to prevent burn-out.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
                Worldwide coverage · Mandatory rest policy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* SECTION 3: 4-STAGE RESPECTFUL HIRING PROCESS (Thora Dark: #F4F3F1)     */}
      {/* ---------------------------------------------------------------------- */}
      <section className="w-full bg-[#F4F3F1] border-b border-[#E6E4DF] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
            TRANSPARENT &amp; COMPENSATED
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
            Our 4-Stage Respectful Hiring Process
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            We value your craftsmanship and your time. No whiteboard trick riddles, no 8-round fatigue loops. Total turnaround time is strictly under 7 business days.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12 sm:mt-16 text-left">
            {/* Stage 1 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#FF6B00] block tracking-tight">
                  01
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 block">
                  STAGE 1 · 30 MINUTES
                </span>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2.5 leading-snug">
                  Architectural &amp; Values Alignment Call
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-3 leading-relaxed font-normal">
                  An informal, high-level conversation with a Principal Systems Architect. We discuss your technical philosophy, past distributed systems work, and your ideal pod setup.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
                Feedback in &lt; 24 hours
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#FF6B00] block tracking-tight">
                  02
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 block">
                  STAGE 2 · COMPENSATED
                </span>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2.5 leading-snug">
                  Paid Practical Code &amp; System Challenge
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-3 leading-relaxed font-normal">
                  A realistic take-home architecture or coding task mirroring real-world client challenges. We respect your effort and compensate your time regardless of outcome.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
                Paid stipend provided
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#FF6B00] block tracking-tight">
                  03
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 block">
                  STAGE 3 · 45 MINUTES
                </span>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2.5 leading-snug">
                  Interactive Design &amp; Solution Teardown
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-3 leading-relaxed font-normal">
                  A collaborative review session with our Technical Founders to walk through trade-offs, edge-case tuning, scalability bottlenecks, and distributed consensus decisions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
                Peer-to-peer dialogue
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#FF6B00] block tracking-tight">
                  04
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 block">
                  STAGE 4 · &lt; 48 HOURS
                </span>
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mt-2.5 leading-snug">
                  Formal Offer &amp; Custom Hardware Kit
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-3 leading-relaxed font-normal">
                  We present a transparent global compensation offer, equity parameters, and dispatch your $5k custom hardware &amp; ergonomics package prior to your day-one onboarding.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
                Zero bureaucratic offer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* SECTION 4: OPEN ROLES (Light Offwhite: #F7F6F5)                        */}
      {/* ---------------------------------------------------------------------- */}
      <section id="roles" className="w-full bg-[#F7F6F5] border-b border-[#E6E4DF] py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
            OPEN ENGINEERING VACANCIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
            Explore active pod<br className="hidden sm:inline" /> openings &amp; upcoming roles
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Join an active hiring cycle or register for priority notification on upcoming engineering pod positions.
          </p>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 max-w-4xl mx-auto">
            <span className="text-xs px-4 py-1.5 rounded-full bg-[#FF6B00] text-white font-semibold shadow-xs">
              All Departments
            </span>
            <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
              Engineering
            </span>
            <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
              AI &amp; Machine Learning
            </span>
            <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
              UI/UX &amp; Design
            </span>
            <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
              Cloud &amp; SRE
            </span>
            <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
              Solutions &amp; Growth
            </span>
          </div>

          {/* 7 Jobs List (Direct Static JSX Cards) */}
          <div className="flex flex-col gap-3.5 sm:gap-4 mt-10 sm:mt-12 max-w-5xl mx-auto text-left">
            {/* Job 1 */}
            <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Senior Distributed Systems &amp; Rust Architect
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Frankfurt / Remote · Engineering
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoleModal("Senior Distributed Systems & Rust Architect")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Apply</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Job 2 */}
            <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Lead AI Systems Engineer (LLM Inference &amp; CUDA)
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  San Francisco / Hybrid · AI &amp; Machine Learning
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoleModal("Lead AI Systems Engineer (LLM Inference & CUDA)")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Apply</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Job 3 */}
            <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Staff Design Systems Architect (WCAG AAA)
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  London / Remote · UI/UX &amp; Design
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoleModal("Staff Design Systems Architect (WCAG AAA)")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Apply</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Job 4 */}
            <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Cloud DevOps &amp; SRE Architect (Kubernetes &amp; Terraform)
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Berlin / Remote · Cloud &amp; SRE
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoleModal("Cloud DevOps & SRE Architect (Kubernetes & Terraform)")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Apply</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Job 5 */}
            <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Solutions Architect &amp; Technical Engagement Lead
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  New York / Remote · Solutions &amp; Growth
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoleModal("Solutions Architect & Technical Engagement Lead")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Apply</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Job 6 */}
            <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Principal Platform &amp; Linux Kernel Engineer
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Zurich / Remote · Engineering
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoleModal("Principal Platform & Linux Kernel Engineer")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Apply</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Job 7 */}
            <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Senior AI &amp; Deep Learning Research Scientist
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Toronto / Remote · AI &amp; Machine Learning
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoleModal("Senior AI & Deep Learning Research Scientist")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Apply</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          {/* Bottom Talent Network Card */}
          <div className="mt-10 sm:mt-12 rounded-2xl bg-white border border-[#E6E4DF] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left max-w-5xl mx-auto shadow-xs">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Don&apos;t see your exact engineering domain?
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 max-w-2xl leading-relaxed font-normal">
                Register your coordinates with our Senior Talent Network. When new pod requirements open, we contact registered candidates before public listings.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveRoleModal("Senior Talent Network")}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#e05d00] active:scale-[0.99] text-white text-xs font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
            >
              Talent Network
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (Thora Dark: #F4F3F1)            */}
      {/* ---------------------------------------------------------------------- */}
      <section className="w-full bg-[#F4F3F1] border-b border-[#E6E4DF] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
            CANDIDATE QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F172A] tracking-tight leading-tight max-w-2xl mx-auto">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Direct answers regarding our hiring process, equipment, working hours, and contracts.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col gap-3.5 max-w-4xl mx-auto text-left">
            {/* FAQ 1 */}
            <details
              open
              className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
                <span>How does Creed Tech handle remote work and time zones?</span>
                <span className="text-base text-slate-400 group-open:hidden">+</span>
                <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
                We are 100% remote-first and asynchronous. We have team members across Germany, Spain, USA, and global time zones. Rather than demanding rigid 9-to-5 schedules, we require a minimum 3-hour daily overlap with your pod and rely on high-fidelity written documentation (RFCs and PR walkthroughs).
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200">
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
                <span>Is the take-home technical challenge really paid?</span>
                <span className="text-base text-slate-400 group-open:hidden">+</span>
                <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
                Yes, unconditionally. We respect the time and effort required to craft architectural solutions. Candidates who complete our practical take-home challenge receive an honorarium stipend regardless of whether we move forward with an offer.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200">
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
                <span>What contract and employment types do you offer?</span>
                <span className="text-base text-slate-400 group-open:hidden">+</span>
                <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
                We accommodate both full-time permanent contracts through global Employer of Record (EOR) entities in 80+ countries and B2B contractor arrangements with flexible invoicing, depending on your tax and location preferences.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200">
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
                <span>What hardware and software stack do you support?</span>
                <span className="text-base text-slate-400 group-open:hidden">+</span>
                <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
                Engineers receive a $5,000 hardware stipend to configure their choice of Apple Silicon (M3/M4 Max) or custom Linux workstations with high-refresh 4K displays and ergonomic seating. You also receive full access to commercial AI tooling (Copilot, Claude Enterprise) and sovereign cloud dev environments.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200">
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
                <span>What happens after I submit a Vacancy Alert registration?</span>
                <span className="text-base text-slate-400 group-open:hidden">+</span>
                <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
                Your profile is privately indexed in our Principal Talent Registry. When our partners spin up a dedicated engineering pod in your domain, our technical founders reach out to you directly before any role is published publicly.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: DIRECT SECURITY & FOUNDER HOTLINE         */}
      {/* ---------------------------------------------------- */}
      <section className="w-full bg-[#071120] py-20 sm:py-28 text-center text-white relative overflow-hidden">
        {/* Soft Orange Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#FF6B00]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
            DIRECT FOUNDER &amp; SECURITY HOTLINE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Have a specialized systems architecture proposal or security concern?
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed font-normal">
            If you have a security question, technical complaint, vulnerability disclosure, or specialized system proposal, you can email our team directly.
          </p>
          <div className="mt-8 sm:mt-10">
            <button
              type="button"
              onClick={() => setIsSecurityModalOpen(true)}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#e05d00] active:scale-[0.99] text-white text-sm font-semibold shadow-xs shadow-orange-500/20 transition-all duration-200 cursor-pointer"
            >
              Email Technical Profile
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SEPARATE MODAL FORMS                                 */}
      {/* ---------------------------------------------------- */}
      <SecurityComplaintModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      <JobApplicationModal
        isOpen={Boolean(activeRoleModal)}
        roleTitle={activeRoleModal}
        onClose={() => setActiveRoleModal(null)}
      />
    </div>
  );
}
