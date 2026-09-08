"use client";

import { useState } from "react";

export default function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid work email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/admin/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          source: "Website Enterprise Insights Newsletter",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Subscription failed. Please try again.");
      }

      setStatus("success");
      setMessage("Thank you for subscribing! Quarterly enterprise insights will be delivered to your inbox.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#F4F6F8] pt-4 pb-14 sm:pt-6 sm:pb-16">
      <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mx-auto">
        
        {/* Main Card */}
        <div className="bg-white border border-[#E5E8EB] p-6 sm:p-8 md:p-10 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          
          {/* Left Text */}
          <div className="w-full md:w-1/2 flex flex-col text-left">
            <h2 className="text-xl md:text-2xl font-medium text-[#1A1A1A] mb-2 tracking-tight">
              Subscribe to Enterprise Insights
            </h2>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed max-w-md font-normal">
              Get quarterly whitepapers, architectural blueprints, and technology benchmarks directly to your inbox.
            </p>
          </div>
          
          {/* Vertical Separator for Desktop */}
          <div className="hidden md:block w-[1px] h-20 bg-[#E5E8EB] shrink-0"></div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 flex flex-col">
            {status === "success" ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-3 text-left">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-base leading-none mt-0.5">✓</span>
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-900 mb-0.5">
                      Subscribed Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      {message}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setMessage("");
                  }}
                  className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold underline shrink-0 cursor-pointer pt-0.5"
                >
                  Add another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Enter your work email"
                    required
                    disabled={loading}
                    className="w-full flex-1 h-14 px-5 bg-[#F4F6F8] border border-[#E5E8EB] text-[#1A1A1A] placeholder-gray-400 text-sm rounded outline-none focus:border-[#0052FF] transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-[180px] h-14 px-6 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold rounded inline-flex items-center justify-center transition-colors shrink-0 shadow-none cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-600 font-medium text-left pl-1">
                    {message}
                  </p>
                )}
              </form>
            )}
          </div>

        </div>

        {/* Orange Accent Line */}
        <div className="w-full h-[3px] bg-[#FF6A00] mt-8 rounded-[2px]"></div>

      </div>
    </section>
  );
}
