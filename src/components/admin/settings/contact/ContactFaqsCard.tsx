"use client";

import React from "react";
import { ContactFaqItem, ContactSettingsData } from "../types";

interface Props {
  data: ContactSettingsData;
  onChangeField: (field: keyof ContactSettingsData, value: any) => void;
}

export default function ContactFaqsCard({ data, onChangeField }: Props) {
  const faqs = data.faqs || [];

  const handleAddFaq = () => {
    const newFaq: ContactFaqItem = {
      id: `faq-${Date.now()}`,
      question: `New Question #${faqs.length + 1}?`,
      answer: "Clear, concise explanation and answer for clients and enterprise partners.",
    };
    onChangeField("faqs", [...faqs, newFaq]);
  };

  const handleUpdateFaq = (
    index: number,
    field: keyof ContactFaqItem,
    value: string
  ) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    onChangeField("faqs", updated);
  };

  const handleDeleteFaq = (index: number) => {
    if (confirm(`Delete FAQ #${index + 1}?`)) {
      const updated = faqs.filter((_, i) => i !== index);
      onChangeField("faqs", updated);
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">❓</span>
          <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
            Frequently Asked Questions (FAQs)
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddFaq}
          className="px-3.5 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            className="border border-[#E2E8F0] rounded-lg overflow-hidden bg-white"
          >
            {/* FAQ Header */}
            <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#0F172A]">
                FAQ #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteFaq(idx)}
                className="px-2.5 py-1 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[11px] font-bold rounded cursor-pointer transition-colors"
              >
                ✕ Delete
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleUpdateFaq(idx, "question", e.target.value)}
                  placeholder="How quickly can your senior engineering pods be deployed?"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                  Answer *
                </label>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => handleUpdateFaq(idx, "answer", e.target.value)}
                  placeholder="Clear explanation and answer for enterprise partners..."
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
