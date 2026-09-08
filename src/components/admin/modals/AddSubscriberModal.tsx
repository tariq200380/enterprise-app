"use client";

import React, { useState } from "react";
import { SubscriberItem } from "@/types/admin";

interface AddSubscriberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscriberCreated: (subscriber: SubscriberItem) => void;
  showToast: (msg: string) => void;
}

export default function AddSubscriberModal({ isOpen, onClose, onSubscriberCreated, showToast }: AddSubscriberModalProps) {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("Admin Manual Entry");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      setSaving(true);
      const res = await fetch("/api/admin/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.success) {
        onSubscriberCreated(data.subscriber);
        setEmail("");
        onClose();
        showToast(`✓ Subscriber "${email}" enrolled!`);
      }
    } catch {
      showToast("Failed to add subscriber");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-sm w-full p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>
        <h3 className="text-base font-bold text-[#0F172A] mb-3">Add Newsletter Subscriber</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Subscriber Email Address *</label>
            <input
              type="email"
              required
              placeholder="lead@enterprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Source / Attribution</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
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
              className="px-5 py-2 bg-[#0052FF] text-white font-bold rounded cursor-pointer shadow"
            >
              {saving ? "Adding..." : "Add Subscriber"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
