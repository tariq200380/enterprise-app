"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Inquiry } from "@/types/admin";
import { useAdminFetch } from "@/lib/useAdminFetch";

const InquiryDetailsModal = dynamic(() => import("../modals/InquiryDetailsModal"), { ssr: false });

interface InquiriesModuleProps {
  searchQuery?: string;
  showToast?: (msg: string, type?: "success" | "error") => void;
  // Optional controlled props
  inquiries?: Inquiry[];
  onSelectInquiry?: (inq: Inquiry) => void;
  onUpdateStatus?: (id: number, status: string) => void;
  onDeleteInquiry?: (id: number) => void;
  onRefresh?: () => void;
}

type InquiryFilter = "ALL" | "NEW" | "IN_REVIEW" | "COMPLETED" | "ARCHIVED";

export default function InquiriesModule({
  searchQuery = "",
  showToast = () => {},
  inquiries: propInquiries,
  onSelectInquiry: propOnSelect,
  onUpdateStatus: propOnUpdateStatus,
  onDeleteInquiry: propOnDeleteInquiry,
  onRefresh,
}: InquiriesModuleProps) {
  const adminFetch = useAdminFetch();
  const [internalInquiries, setInternalInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryFilter>("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/inquiries", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInternalInquiries(data.inquiries);
      }
    } catch {
      showToast("Failed to fetch inquiries", "error");
    }
  }, [adminFetch, showToast]);

  useEffect(() => {
    if (propInquiries) {
      setInternalInquiries(propInquiries);
    } else {
      fetchInquiries();
    }
  }, [propInquiries, fetchInquiries]);

  const activeInquiries = propInquiries || internalInquiries;

  const handleUpdateStatus = async (id: number, status: string) => {
    if (propOnUpdateStatus) {
      propOnUpdateStatus(id, status);
      return;
    }
    try {
      const res = await adminFetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast(`Inquiry #${id} updated to ${status}`);
        if (onRefresh) onRefresh();
        else fetchInquiries();
      }
    } catch {
      showToast("Failed to update inquiry", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (propOnDeleteInquiry) {
      propOnDeleteInquiry(id);
      return;
    }
    if (!confirm(`Delete inquiry #${id}?`)) return;
    try {
      const res = await adminFetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Inquiry deleted");
        if (onRefresh) onRefresh();
        else fetchInquiries();
      }
    } catch {
      showToast("Failed to delete inquiry", "error");
    }
  };

  const handleSelect = (inq: Inquiry) => {
    if (propOnSelect) propOnSelect(inq);
    setSelectedInquiry(inq);
  };

  const getCount = (st: InquiryFilter) => {
    if (st === "ALL") return activeInquiries.length;
    if (st === "NEW") return activeInquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length;
    return activeInquiries.filter((i) => i.status === st).length;
  };

  const filtered = activeInquiries.filter((inq) => {
    const matchesSearch =
      inq.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "ALL"
        ? true
        : filter === "NEW"
        ? inq.status === "NEW" || inq.status === "PENDING"
        : inq.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-outfit text-[#0F172A] tracking-tight">Inbound Contact Inquiries</h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Live client messages and scoping requests from the public contact forms.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          {(["ALL", "NEW", "IN_REVIEW", "COMPLETED", "ARCHIVED"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer inline-flex items-center gap-2 transition-all duration-200 ${
                filter === st
                  ? "bg-[#FF6B00] text-white shadow-[0_2px_14px_rgba(255,107,0,0.35)]"
                  : "bg-white border border-[#E2E8F0] text-slate-700 hover:text-[#0F172A] hover:bg-[#F1F3F5] shadow-xs"
              }`}
            >
              <span>{st}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  filter === st ? "bg-white/20 text-white" : "bg-[#F1F3F5] text-slate-600"
                }`}
              >
                {getCount(st)}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={async () => {
              setIsRefreshing(true);
              await fetchInquiries();
              if (onRefresh) onRefresh();
              setIsRefreshing(false);
              showToast("Inquiries refreshed", "success");
            }}
            disabled={isRefreshing}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-slate-700 hover:text-[#FF6B00] hover:border-orange-300 transition-all shadow-xs disabled:opacity-60"
            title="Refresh Inquiries"
          >
            <span className={isRefreshing ? "animate-spin inline-block" : ""}>🔄</span>
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-xs text-left border-collapse font-sans">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-slate-500 font-bold uppercase tracking-wider text-[11px] font-outfit">
              <th className="p-4">ID</th>
              <th className="p-4">Client &amp; Company</th>
              <th className="p-4">Requested Service</th>
              <th className="p-4">Email / Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]/70">
            {filtered.map((inq) => (
              <tr key={inq.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="p-4 font-bold text-[#0F172A] font-mono">#{inq.id}</td>
                <td className="p-4">
                  <div className="font-bold text-[#0F172A] text-[13px]">{inq.client_name}</div>
                  <div className="text-[11px] text-slate-500">{inq.company}</div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B00] font-semibold border border-orange-200 shadow-2xs">
                    {inq.service}
                  </span>
                </td>
                <td className="p-4 text-slate-700">
                  <div className="font-medium text-[#0F172A]">{inq.email || "N/A"}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{inq.phone || ""}</div>
                </td>
                <td className="p-4">
                  <select
                    value={inq.status === "PENDING" ? "NEW" : inq.status}
                    onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                    className="bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#FF6B00] rounded-xl px-2.5 py-1 font-semibold text-xs text-[#0F172A] outline-none transition-all cursor-pointer shadow-2xs"
                  >
                    <option value="NEW" className="bg-white text-slate-900">NEW</option>
                    <option value="IN_REVIEW" className="bg-white text-slate-900">IN_REVIEW</option>
                    <option value="RESPONDED" className="bg-white text-slate-900">RESPONDED</option>
                    <option value="COMPLETED" className="bg-white text-slate-900">COMPLETED</option>
                    <option value="ARCHIVED" className="bg-white text-slate-900">ARCHIVED</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelect(inq)}
                      className="px-3.5 py-1.5 bg-[#FF6B00] text-white rounded-xl font-bold hover:bg-[#e05d00] cursor-pointer shadow-[0_2px_10px_rgba(255,107,0,0.25)] transition-all text-xs active:scale-95"
                    >
                      Reply
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold hover:bg-red-100 cursor-pointer transition-all text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-slate-500">
                  No inquiries found matching current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Embedded Modal */}
      {selectedInquiry && (
        <InquiryDetailsModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onInquiryUpdated={() => {
            if (onRefresh) onRefresh();
            else fetchInquiries();
          }}
          showToast={showToast}
          initialMode="reply"
        />
      )}
    </div>
  );
}
