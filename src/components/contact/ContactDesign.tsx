"use client";

import React from "react";
import { useContactLogic } from "./contactlogic";

export default function ContactDesign() {
  const {
    status,
    errorMessage,
    fieldErrors,
    selectedService,
    setSelectedService,
    handleSubmit,
    handleDismiss,
  } = useContactLogic();

  const services = [
    "Software Development",
    "UI/UX Design",
    "Mobile Application",
    "Cloud Infrastructure",
    "Database Management",
    "Web Development",
    "AI & Automation",
    "Digital Growth",
  ];

  return (
    <div className="w-full">
      {/* Success Notification Banner */}
      {status === "success" && (
        <div
          role="alert"
          aria-live="polite"
          className="p-6 mb-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-4 text-left animate-in fade-in duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-emerald-900 mb-1">
                Technical Inquiry Submitted Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed font-normal">
                Our principal solutions architects have received your project parameters. A guaranteed architectural estimate and NDA confirmation will be delivered within 2-4 hours.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-emerald-700 hover:text-emerald-950 font-bold shrink-0 cursor-pointer p-1 leading-none text-base"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Scoping Form */}
      <form id="contact-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* 1. Select the service you need */}
        <div>
          <label className="block text-[11.5px] font-bold text-[#111827] uppercase tracking-wider mb-2.5">
            1. Select the service you need
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {services.map((svc) => {
              const isSelected = selectedService === svc;
              return (
                <label key={svc} className="cursor-pointer select-none">
                  <input
                    type="radio"
                    name="service"
                    value={svc}
                    checked={isSelected}
                    onChange={() => setSelectedService(svc)}
                    disabled={status === "loading"}
                    className="peer sr-only"
                  />
                  <span
                    className={`block p-2.5 text-xs text-center rounded border transition-colors truncate font-medium hover:bg-gray-100 ${
                      isSelected
                        ? "bg-[#0052FF] text-white border-[#0052FF] font-bold hover:bg-[#0052FF]"
                        : "bg-[#F9FAFB] text-[#374151] border-[#E5E7EB]"
                    }`}
                  >
                    {svc}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 2. Your Contact & Company Details */}
        <div className="flex flex-col gap-4">
          <label className="block text-[11.5px] font-bold text-[#111827] uppercase tracking-wider">
            2. Your Contact &amp; Company Details
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                disabled={status === "loading"}
                placeholder="Your Full Name *"
                aria-invalid={!!fieldErrors?.fullName}
                className={`w-full px-3.5 py-3 bg-[#F9FAFB] border text-sm text-[#111827] outline-none rounded transition-colors disabled:opacity-50 ${
                  fieldErrors?.fullName
                    ? "border-red-400 focus:border-red-500 bg-red-50/20"
                    : "border-[#E5E7EB] focus:border-[#0052FF]"
                }`}
              />
              {fieldErrors?.fullName && (
                <span className="text-[11px] text-red-600 mt-1 block">
                  {fieldErrors.fullName}
                </span>
              )}
            </div>

            <div>
              <input
                type="email"
                name="workEmail"
                required
                autoComplete="email"
                disabled={status === "loading"}
                placeholder="Corporate Work Email *"
                aria-invalid={!!fieldErrors?.workEmail}
                className={`w-full px-3.5 py-3 bg-[#F9FAFB] border text-sm text-[#111827] outline-none rounded transition-colors disabled:opacity-50 ${
                  fieldErrors?.workEmail
                    ? "border-red-400 focus:border-red-500 bg-red-50/20"
                    : "border-[#E5E7EB] focus:border-[#0052FF]"
                }`}
              />
              {fieldErrors?.workEmail && (
                <span className="text-[11px] text-red-600 mt-1 block">
                  {fieldErrors.workEmail}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              autoComplete="organization"
              disabled={status === "loading"}
              placeholder="Company / Organization Name"
              className="w-full px-3.5 py-3 bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] outline-none rounded focus:border-[#0052FF] transition-colors disabled:opacity-50"
            />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              disabled={status === "loading"}
              placeholder="Phone / WhatsApp Number"
              className="w-full px-3.5 py-3 bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] outline-none rounded focus:border-[#0052FF] transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <textarea
              name="projectDetails"
              rows={4}
              required
              disabled={status === "loading"}
              placeholder="Tell us about your project goals, technical requirements, or current architecture challenges... *"
              aria-invalid={!!fieldErrors?.projectDetails}
              className={`w-full px-3.5 py-3 bg-[#F9FAFB] border text-sm text-[#111827] outline-none rounded transition-colors resize-none disabled:opacity-50 ${
                fieldErrors?.projectDetails
                  ? "border-red-400 focus:border-red-500 bg-red-50/20"
                  : "border-[#E5E7EB] focus:border-[#0052FF]"
              }`}
            />
            {fieldErrors?.projectDetails && (
              <span className="text-[11px] text-red-600 mt-1 block">
                {fieldErrors.projectDetails}
              </span>
            )}
          </div>
        </div>

        {/* NDA Checkbox */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="needNda"
              defaultChecked
              disabled={status === "loading"}
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0052FF] focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-[#374151] font-medium leading-normal">
              Execute a mutual non-disclosure agreement (NDA) prior to our discovery call.
            </span>
          </label>
        </div>

        {/* Error message banner */}
        {status === "error" && errorMessage && (
          <div
            role="alert"
            className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg text-left"
          >
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full h-12 bg-[#0052FF] hover:bg-[#0042D0] text-white font-semibold text-sm uppercase tracking-wider rounded transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting Technical Inquiry...</span>
              </>
            ) : (
              "Submit Technical Inquiry"
            )}
          </button>
          <p className="text-[11px] text-gray-400 text-center font-normal mt-2.5">
            🔒 256-Bit Encrypted Transmission • Zero Spam Policy • 100% Confidential
          </p>
        </div>
      </form>
    </div>
  );
}
