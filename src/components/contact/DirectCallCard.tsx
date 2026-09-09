"use client";

import { useState } from "react";

interface DirectCallCardProps {
  badge?: string;
  title?: string;
  description?: string;
}

export default function DirectCallCard({
  badge = "⚡ INSTANT DISCOVERY",
  title = "Need a Direct Architectural Call?",
  description = "Skip the form and schedule a 30-minute discovery call directly with one of our Principal Systems Architects.",
}: DirectCallCardProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    setStatus("idle");
    setErrorMessage("");
    setIsCustom(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <>
      <div className="bg-gradient-to-br from-[#030712] to-[#111827] text-white p-7 rounded-2xl border border-[#1F2937] shadow-lg">
        <span className="inline-block px-2.5 py-1 bg-white/10 text-[#FB923C] text-[10.5px] font-bold uppercase rounded-sm mb-3">
          {badge}
        </span>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5 font-normal">
          {description}
        </p>
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setStatus("idle");
            setErrorMessage("");
          }}
          className="w-full h-11 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
        >
          Schedule Discovery Call ⚡
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeModal();
          }}
          tabIndex={-1}
        >
          <div className="bg-white text-[#111827] rounded-xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg cursor-pointer leading-none p-1"
              title="Close modal"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-[#030712] mb-1">Schedule 30-Min Discovery Call</h3>
            <p className="text-xs text-gray-500 mb-4">Pick a slot to talk directly with our Principal Solutions Architect.</p>

            {status === "success" ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded text-center">
                ✓ Discovery Call Scheduled! Calendar invite will be sent to your email.
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    name="fullName"
                    required
                    autoComplete="name"
                    disabled={status === "loading"}
                    placeholder="Full Name *"
                    className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs outline-none focus:border-[#0052FF] disabled:opacity-50"
                  />
                  <input
                    name="workEmail"
                    type="email"
                    required
                    autoComplete="email"
                    disabled={status === "loading"}
                    placeholder="Work Email *"
                    className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs outline-none focus:border-[#0052FF] disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    disabled={status === "loading"}
                    placeholder="Phone / WhatsApp"
                    className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs outline-none focus:border-[#0052FF] disabled:opacity-50"
                  />
                  <select
                    name="slot"
                    disabled={status === "loading"}
                    onChange={(e) => setIsCustom(e.target.value === "Custom")}
                    className="px-2.5 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs outline-none focus:border-[#0052FF] cursor-pointer disabled:opacity-50"
                  >
                    <option value="Today (Within 2-4 Hours)">⚡ Today (2-4 Hours)</option>
                    <option value="Tomorrow Morning (9:00 AM)">Tomorrow Morning (9:00 AM)</option>
                    <option value="Tomorrow Afternoon (2:00 PM)">Tomorrow Afternoon (2:00 PM)</option>
                    <option value="Custom">Custom Date &amp; Time</option>
                  </select>
                </div>

                {isCustom && (
                  <div className="grid grid-cols-2 gap-2.5 p-2.5 bg-blue-50/70 border border-blue-200 rounded">
                    <input
                      type="date"
                      name="customDate"
                      required
                      disabled={status === "loading"}
                      min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                      defaultValue={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                      className="px-2 py-1.5 bg-white border border-blue-300 rounded text-xs outline-none disabled:opacity-50"
                    />
                    <input
                      type="time"
                      name="customTime"
                      disabled={status === "loading"}
                      defaultValue="14:00"
                      className="px-2 py-1.5 bg-white border border-blue-300 rounded text-xs outline-none disabled:opacity-50"
                    />
                  </div>
                )}

                {status === "error" && errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded text-left">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-10 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer disabled:opacity-50 mt-1 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    "Confirm Call ⚡"
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
