"use client";

import { useState } from "react";

export default function NewsletterLogic() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string)?.trim();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid work email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/admin/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "Website Enterprise Insights Newsletter",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Subscription failed. Please try again.");
      }

      setStatus("success");
      setMessage("Thank you for subscribing! Quarterly enterprise insights will be delivered to your inbox.");
      form.reset();

      // Automatically disappear after 4 seconds and return to form
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to subscribe. Please try again.");
    }
  };

  if (status === "success") {
    return (
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
          className="text-sm text-emerald-700 hover:text-emerald-950 font-bold shrink-0 cursor-pointer px-1 leading-none"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <input
          name="email"
          type="email"
          placeholder="Enter your work email"
          required
          disabled={status === "loading"}
          onChange={() => {
            if (status === "error") setStatus("idle");
          }}
          className="w-full flex-1 h-14 px-5 bg-[#F4F6F8] border border-[#E5E8EB] text-[#1A1A1A] placeholder-gray-400 text-sm rounded outline-none focus:border-[#0052FF] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-[180px] h-14 px-6 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold rounded inline-flex items-center justify-center transition-colors shrink-0 shadow-none cursor-pointer disabled:opacity-50"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-600 font-medium text-left pl-1">
          {message}
        </p>
      )}
    </form>
  );
}
