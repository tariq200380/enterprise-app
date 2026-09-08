"use client";

import React, { useState } from "react";
import { Inquiry } from "@/types/admin";

interface InquiriesModuleProps {
  inquiries: Inquiry[];
  searchQuery: string;
  onSelectInquiry: (inq: Inquiry) => void;
  onUpdateStatus: (id: number, status: string) => void;
  onDeleteInquiry: (id: number) => void;
}

export default function InquiriesModule({
  inquiries,
  searchQuery,
  onSelectInquiry,
  onUpdateStatus,
  onDeleteInquiry,
}: InquiriesModuleProps) {
  const [filter, setFilter] = useState<"ALL" | "NEW" | "IN_REVIEW" | "COMPLETED">("ALL");

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "ALL" ? true : inq.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Inbound Contact Inquiries</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Live client messages and scoping requests from the public contact forms.
          </p>
        </div>
        <div className="flex gap-1.5">
          {(["ALL", "NEW", "IN_REVIEW", "COMPLETED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 text-xs font-bold rounded cursor-pointer ${
                filter === st ? "bg-[#0052FF] text-white" : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold">
              <th className="p-3.5">ID</th>
              <th className="p-3.5">Client &amp; Company</th>
              <th className="p-3.5">Requested Service</th>
              <th className="p-3.5">Email / Phone</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {filtered.map((inq) => (
              <tr key={inq.id} className="hover:bg-[#F8FAFC]">
                <td className="p-3.5 font-bold text-[#0F172A]">#{inq.id}</td>
                <td className="p-3.5">
                  <div className="font-bold text-[#0F172A]">{inq.client_name}</div>
                  <div className="text-[11px] text-[#64748B]">{inq.company}</div>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0052FF] font-semibold border border-blue-200">
                    {inq.service}
                  </span>
                </td>
                <td className="p-3.5 text-[#64748B]">
                  <div>{inq.email || "N/A"}</div>
                  <div className="text-[10px]">{inq.phone || ""}</div>
                </td>
                <td className="p-3.5">
                  <select
                    value={inq.status}
                    onChange={(e) => onUpdateStatus(inq.id, e.target.value)}
                    className="bg-white border border-gray-300 rounded px-2 py-1 font-semibold text-xs outline-none focus:border-[#0052FF] cursor-pointer"
                  >
                    <option value="NEW">NEW</option>
                    <option value="IN_REVIEW">IN_REVIEW</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </td>
                <td className="p-3.5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onSelectInquiry(inq)}
                      className="px-2.5 py-1 bg-[#0052FF] text-white rounded font-bold hover:bg-[#0042D0] cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onDeleteInquiry(inq.id)}
                      className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded font-bold hover:bg-red-100 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-[#64748B]">
                  No inquiries found matching current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
