"use client";

import { useState } from "react";

export default function DirectCallCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferredSlot, setPreferredSlot] = useState("Today (Within 2-4 Hours)");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    setPreferredSlot("Today (Within 2-4 Hours)");
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullName = (formData.get("fullName") as string)?.trim();
    const workEmail = (formData.get("workEmail") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const slotSelection = (formData.get("preferredSlot") as string)?.trim();
    const customDate = (formData.get("customDate") as string)?.trim();
    const customTime = (formData.get("customTime") as string)?.trim();
    const details = (formData.get("details") as string)?.trim();

    let slotDetails = slotSelection || "As soon as possible";
    if (slotSelection === "Custom Time Window" && customDate) {
      slotDetails = `Custom Scheduled: ${customDate} at ${customTime || "Flexible"}`;
    }

    if (!fullName || !workEmail) {
      setStatus("error");
      setErrorMessage("Please provide your full name and work email.");
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
          phone: phone || "",
          company: "Direct Discovery Call",
          service: "Direct Architectural Discovery Call",
          project_details: `Preferred Slot: ${slotDetails}\nTopic: ${details || "General 30-min architectural scoping."}`,
          need_nda: true,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to schedule call. Please try again.");
      }

      setStatus("success");
      form.reset();

      setTimeout(() => {
        closeModal();
      }, 4000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Direct Booking Card */}
      <div className="bg-gradient-to-br from-[#030712] to-[#111827] text-white p-7 rounded-2xl border border-[#1F2937] shadow-lg">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 text-[#FB923C] text-[10.5px] font-bold uppercase tracking-wider rounded-sm mb-3">
          <span>⚡ INSTANT DISCOVERY</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Need a Direct Architectural Call?
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-5">
          Skip the form and schedule a 30-minute discovery call directly with one of our Principal Systems Architects.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full h-11 inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer shadow-sm"
        >
          Schedule Discovery Call
        </button>
      </div>

      {/* Discovery Call Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white text-[#111827] rounded-xl max-w-lg w-full p-6 sm:p-7 relative border border-gray-200 text-left shadow-2xl my-8">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer leading-none"
              title="Close"
            >
              ✕
            </button>

            {status !== "success" ? (
              <div>
                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-50 text-[#FF6B00] border border-orange-200 text-[10.5px] font-bold uppercase tracking-wider rounded mb-2">
                    ⚡ DIRECT ARCHITECT ACCESS
                  </div>
                  <h3 className="text-xl font-bold text-[#030712] tracking-tight">
                    Schedule 30-Min Discovery Call
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Pick a preferred slot to talk directly with our Principal Solutions Architect under guaranteed mutual NDA.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        required
                        disabled={status === "loading"}
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs sm:text-sm text-gray-900 outline-none focus:border-[#0052FF] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Corporate Email *
                      </label>
                      <input
                        name="workEmail"
                        type="email"
                        required
                        disabled={status === "loading"}
                        placeholder="marcus@enterprise.com"
                        className="w-full px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs sm:text-sm text-gray-900 outline-none focus:border-[#0052FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        disabled={status === "loading"}
                        placeholder="+1 (415) 000-0000"
                        className="w-full px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs sm:text-sm text-gray-900 outline-none focus:border-[#0052FF] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Preferred Call Window
                      </label>
                      <select
                        name="preferredSlot"
                        value={preferredSlot}
                        onChange={(e) => setPreferredSlot(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs sm:text-sm text-gray-900 outline-none focus:border-[#0052FF] transition-colors font-medium cursor-pointer"
                      >
                        <option value="Today (Within 2-4 Hours)">⚡ Today (Within 2-4 Hours)</option>
                        <option value="Tomorrow Morning (9:00 AM CET / UTC+1)">Tomorrow Morning (9:00 AM CET)</option>
                        <option value="Tomorrow Afternoon (2:00 PM EST / UTC-5)">Tomorrow Afternoon (2:00 PM EST)</option>
                        <option value="Custom Time Window">Custom Time Window (Select Date &amp; Time)</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Date & Time Picker */}
                  {preferredSlot === "Custom Time Window" && (
                    <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg flex flex-col gap-2.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider flex items-center gap-1.5">
                          <span>📅</span>
                          <span>Select Your Preferred Date &amp; Time</span>
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          Direct Calendar Invite
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Choose Date *
                          </label>
                          <input
                            type="date"
                            name="customDate"
                            required
                            min={new Date().toISOString().split("T")[0]}
                            defaultValue={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                            disabled={status === "loading"}
                            className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded text-xs text-gray-900 outline-none focus:border-[#0052FF] transition-colors cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Choose Time Slot *
                          </label>
                          <input
                            type="time"
                            name="customTime"
                            defaultValue="14:00"
                            required
                            disabled={status === "loading"}
                            className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded text-xs text-gray-900 outline-none focus:border-[#0052FF] transition-colors cursor-pointer"
                          />
                        </div>
                      </div>
                      <p className="text-[10.5px] text-gray-500 font-normal leading-normal">
                        Select a date from tomorrow onward and your convenient time. A calendar meeting link will be sent to your email.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Brief Architecture / Project Goal (Optional)
                    </label>
                    <textarea
                      name="details"
                      rows={2}
                      disabled={status === "loading"}
                      placeholder="e.g. Multi-cloud migration, sovereign LLM deployment, or dedicated pod..."
                      className="w-full px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs sm:text-sm text-gray-900 outline-none focus:border-[#0052FF] transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-11 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Confirming Call Request...</span>
                        </>
                      ) : (
                        "Confirm 30-Min Discovery Call ⚡"
                      )}
                    </button>

                    <p className="text-[11px] text-gray-400 text-center font-normal">
                      🔒 Zero spam • Direct senior architect invite • NDA protected
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-[#030712] mb-1">
                  Discovery Call Confirmed!
                </h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto mb-5 leading-relaxed">
                  Our Principal Architect team has received your call request. A calendar invitation and discovery agenda have been dispatched to your work email.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 bg-[#030712] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
