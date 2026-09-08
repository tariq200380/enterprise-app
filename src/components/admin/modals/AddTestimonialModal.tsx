"use client";

import React, { useState } from "react";
import { Testimonial } from "@/types/admin";

interface AddTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestimonialCreated: (testimonial: Testimonial) => void;
  showToast: (msg: string) => void;
}

export default function AddTestimonialModal({ isOpen, onClose, onTestimonialCreated, showToast }: AddTestimonialModalProps) {
  const [clientName, setClientName] = useState("");
  const [role, setRole] = useState("VP of Engineering");
  const [company, setCompany] = useState("Global Systems Corp");
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [verified, setVerified] = useState(true);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !quote) return;
    try {
      setSaving(true);
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: clientName,
          role,
          company,
          avatar,
          rating,
          quote,
          verified,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onTestimonialCreated(data.testimonial);
        setClientName("");
        setQuote("");
        onClose();
        showToast("✓ Client testimonial published!");
      }
    } catch {
      showToast("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-md w-full p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>
        <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">SOCIAL PROOF</span>
        <h3 className="text-base font-bold text-[#0F172A] mb-4">Add Client Testimonial</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Client Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Marcus Vance"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#FF6B00]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Job Title / Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Endorsement Quote *</label>
            <textarea
              rows={3}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Direct client endorsement quote..."
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none leading-relaxed"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded cursor-pointer shadow"
            >
              {saving ? "Saving..." : "Save Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
