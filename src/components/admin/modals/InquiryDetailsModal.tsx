"use client";

import React from "react";
import { Inquiry } from "@/types/admin";

interface InquiryDetailsModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
}

export default function InquiryDetailsModal({ inquiry, onClose }: InquiryDetailsModalProps) {
  if (!inquiry) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-lg w-full p-6 shadow-2xl relative text-left">
        <h3 className="text-base font-bold text-[#030712] mb-1">Inquiry Details</h3>
        <span className="text-xs text-gray-500">ID #{inquiry.id} • {inquiry.created_at}</span>
        <div className="my-4 p-4 bg-gray-50 rounded border border-gray-200 flex flex-col gap-2.5 text-xs">
          <div><strong>Client Name:</strong> {inquiry.client_name}</div>
          <div><strong>Email:</strong> <a href={`mailto:${inquiry.email || ''}`} className="text-[#0052FF] underline">{inquiry.email || "N/A"}</a></div>
          <div><strong>Phone:</strong> {inquiry.phone || "N/A"}</div>
          <div><strong>Company:</strong> {inquiry.company}</div>
          <div><strong>Service:</strong> <span className="text-[#0052FF] font-semibold">{inquiry.service}</span></div>
          <div><strong>NDA Required:</strong> <span className="text-green-700 font-bold">Yes (Non-Disclosure Agreement)</span></div>
          <div><strong>Project Scope / Details:</strong>
            <p className="mt-1 p-2 bg-white rounded border border-gray-200 text-gray-700 leading-relaxed font-normal">
              {inquiry.project_details || "Enterprise high-throughput architecture design and deployment."}
            </p>
          </div>
          <div><strong>Status:</strong> {inquiry.status}</div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <a
            href={`mailto:${inquiry.email || ''}?subject=${encodeURIComponent(`Creed Tech Discovery & Scoping: ${inquiry.service}`)}`}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0052FF] hover:bg-[#0042D0] rounded transition-colors"
          >
            Reply via Email ✉️
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
