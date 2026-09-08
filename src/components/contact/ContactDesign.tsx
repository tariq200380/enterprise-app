import React from "react";

interface ContactDesignProps {
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDismiss: () => void;
}

export default function ContactDesign({
  status,
  errorMessage,
  onSubmit,
  onDismiss,
}: ContactDesignProps) {
  return (
    <div className="w-full">
      {/* Success Notification Banner */}
      {status === "success" && (
        <div className="p-6 mb-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-4 text-left animate-in fade-in duration-300">
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
            onClick={onDismiss}
            className="text-emerald-700 hover:text-emerald-950 font-bold shrink-0 cursor-pointer p-1 leading-none text-base"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Scoping Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* 1. Select the service you need */}
        <div>
          <label className="block text-[11.5px] font-bold text-[#111827] uppercase tracking-wider mb-2.5">
            1. Select the service you need
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value="Software Development"
                defaultChecked
                className="peer sr-only"
              />
              <span className="block p-2.5 text-xs text-center rounded border transition-colors truncate peer-checked:bg-[#0052FF] peer-checked:text-white peer-checked:border-[#0052FF] peer-checked:font-bold bg-[#F9FAFB] text-[#374151] border-[#E5E7EB] font-medium hover:bg-gray-100 peer-checked:hover:bg-[#0052FF]">
                Software Development
              </span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value="UI/UX Design"
                className="peer sr-only"
              />
              <span className="block p-2.5 text-xs text-center rounded border transition-colors truncate peer-checked:bg-[#0052FF] peer-checked:text-white peer-checked:border-[#0052FF] peer-checked:font-bold bg-[#F9FAFB] text-[#374151] border-[#E5E7EB] font-medium hover:bg-gray-100 peer-checked:hover:bg-[#0052FF]">
                UI/UX Design
              </span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value="Mobile Application"
                className="peer sr-only"
              />
              <span className="block p-2.5 text-xs text-center rounded border transition-colors truncate peer-checked:bg-[#0052FF] peer-checked:text-white peer-checked:border-[#0052FF] peer-checked:font-bold bg-[#F9FAFB] text-[#374151] border-[#E5E7EB] font-medium hover:bg-gray-100 peer-checked:hover:bg-[#0052FF]">
                Mobile Application
              </span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value="Cloud Infrastructure"
                className="peer sr-only"
              />
              <span className="block p-2.5 text-xs text-center rounded border transition-colors truncate peer-checked:bg-[#0052FF] peer-checked:text-white peer-checked:border-[#0052FF] peer-checked:font-bold bg-[#F9FAFB] text-[#374151] border-[#E5E7EB] font-medium hover:bg-gray-100 peer-checked:hover:bg-[#0052FF]">
                Cloud Infrastructure
              </span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value="Database Management"
                className="peer sr-only"
              />
              <span className="block p-2.5 text-xs text-center rounded border transition-colors truncate peer-checked:bg-[#0052FF] peer-checked:text-white peer-checked:border-[#0052FF] peer-checked:font-bold bg-[#F9FAFB] text-[#374151] border-[#E5E7EB] font-medium hover:bg-gray-100 peer-checked:hover:bg-[#0052FF]">
                Database Management
              </span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value="Web Development"
                className="peer sr-only"
              />
              <span className="block p-2.5 text-xs text-center rounded border transition-colors truncate peer-checked:bg-[#0052FF] peer-checked:text-white peer-checked:border-[#0052FF] peer-checked:font-bold bg-[#F9FAFB] text-[#374151] border-[#E5E7EB] font-medium hover:bg-gray-100 peer-checked:hover:bg-[#0052FF]">
                Web Development
              </span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value="AI & Automation"
                className="peer sr-only"
              />
              <span className="block p-2.5 text-xs text-center rounded border transition-colors truncate peer-checked:bg-[#0052FF] peer-checked:text-white peer-checked:border-[#0052FF] peer-checked:font-bold bg-[#F9FAFB] text-[#374151] border-[#E5E7EB] font-medium hover:bg-gray-100 peer-checked:hover:bg-[#0052FF]">
                AI &amp; Automation
              </span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value="Digital Growth"
                className="peer sr-only"
              />
              <span className="block p-2.5 text-xs text-center rounded border transition-colors truncate peer-checked:bg-[#0052FF] peer-checked:text-white peer-checked:border-[#0052FF] peer-checked:font-bold bg-[#F9FAFB] text-[#374151] border-[#E5E7EB] font-medium hover:bg-gray-100 peer-checked:hover:bg-[#0052FF]">
                Digital Growth
              </span>
            </label>
          </div>
        </div>

        {/* 2. Your Contact & Company Details */}
        <div className="flex flex-col gap-4">
          <label className="block text-[11.5px] font-bold text-[#111827] uppercase tracking-wider">
            2. Your Contact &amp; Company Details
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              required
              disabled={status === "loading"}
              placeholder="Your Full Name *"
              className="w-full px-3.5 py-3 bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] outline-none rounded focus:border-[#0052FF] transition-colors disabled:opacity-50"
            />
            <input
              type="email"
              name="workEmail"
              required
              disabled={status === "loading"}
              placeholder="Corporate Work Email *"
              className="w-full px-3.5 py-3 bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] outline-none rounded focus:border-[#0052FF] transition-colors disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              disabled={status === "loading"}
              placeholder="Company / Organization Name"
              className="w-full px-3.5 py-3 bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] outline-none rounded focus:border-[#0052FF] transition-colors disabled:opacity-50"
            />
            <input
              type="tel"
              name="phone"
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
              className="w-full px-3.5 py-3 bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] outline-none rounded focus:border-[#0052FF] transition-colors resize-none disabled:opacity-50"
            />
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
        {status === "error" && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg text-left">
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
