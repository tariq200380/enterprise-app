"use client";

import React from "react";
import { Inquiry } from "@/types/admin";

interface VisionRequestsModuleProps {
  inquiries: Inquiry[];
  onSelectInquiry: (inq: Inquiry) => void;
  onDeleteInquiry: (id: number) => void;
}

export default function VisionRequestsModule({
  inquiries,
  onSelectInquiry,
  onDeleteInquiry,
}: VisionRequestsModuleProps) {
  const visionItems = inquiries.filter(
    (inq) => inq.project_details || inq.service?.toLowerCase().includes("vision")
  );

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Vision Scoping Requests</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Dedicated engineering pod engagements and custom high-throughput project architectures.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visionItems.map((inq) => (
          <div key={inq.id} className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0052FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {inq.service}
                </span>
                <span className="text-[11px] text-[#64748B]">#{inq.id} • {inq.created_at?.slice(0, 10)}</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">{inq.client_name} ({inq.company})</h3>
              <p className="text-xs text-[#64748B] mt-2 p-3 bg-gray-50 rounded border border-gray-200 leading-relaxed font-mono">
                {inq.project_details || "Full-lifecycle enterprise architecture migration and sovereign intelligence pod."}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <span className="text-xs font-semibold text-emerald-700">Status: {inq.status}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onSelectInquiry(inq)}
                  className="px-3 py-1 text-xs font-bold bg-[#0052FF] text-white rounded hover:bg-[#0042D0] cursor-pointer"
                >
                  View Scope
                </button>
                <button
                  onClick={() => onDeleteInquiry(inq.id)}
                  className="px-2.5 py-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
