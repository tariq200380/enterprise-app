"use client";

import { useState } from "react";

export default function DirectCallCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const slot = fd.get("slot") as string;
    const customDate = fd.get("customDate") as string;
    const customTime = fd.get("customTime") as string;
    const timeDetail = isCustom && customDate ? `Custom: ${customDate} at ${customTime || "Flexible"}` : slot;

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fd.get("fullName"),
          email: fd.get("workEmail"),
          phone: fd.get("phone") || "",
          company: "Direct Discovery Call",
          service: "Direct Architectural Discovery Call",
          project_details: `Preferred Slot: ${timeDetail}`,
          need_nda: true,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
          setIsCustom(false);
        }, 2500);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#030712] to-[#111827] text-white p-7 rounded-2xl border border-[#1F2937] shadow-lg">
        <span className="inline-block px-2.5 py-1 bg-white/10 text-[#FB923C] text-[10.5px] font-bold uppercase rounded-sm mb-3">
          ⚡ INSTANT DISCOVERY
        </span>
        <h3 className="text-xl font-bold text-white mb-2">Need a Direct Architectural Call?</h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5 font-normal">
          Skip the form and schedule a 30-minute discovery call directly with one of our Principal Systems Architects.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setStatus("idle");
          }}
          className="w-full h-11 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
        >
          Schedule Discovery Call ⚡
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-[#111827] rounded-xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg cursor-pointer"
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    name="fullName"
                    required
                    placeholder="Full Name *"
                    className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs outline-none focus:border-[#0052FF]"
                  />
                  <input
                    name="workEmail"
                    type="email"
                    required
                    placeholder="Work Email *"
                    className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs outline-none focus:border-[#0052FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    name="phone"
                    placeholder="Phone / WhatsApp"
                    className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs outline-none focus:border-[#0052FF]"
                  />
                  <select
                    name="slot"
                    onChange={(e) => setIsCustom(e.target.value === "Custom")}
                    className="px-2.5 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs outline-none focus:border-[#0052FF] cursor-pointer"
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
                      min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                      defaultValue={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                      className="px-2 py-1.5 bg-white border border-blue-300 rounded text-xs outline-none"
                    />
                    <input
                      type="time"
                      name="customTime"
                      defaultValue="14:00"
                      className="px-2 py-1.5 bg-white border border-blue-300 rounded text-xs outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-10 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer disabled:opacity-50 mt-1"
                >
                  {status === "loading" ? "Scheduling..." : "Confirm Call ⚡"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
