"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Inquiry } from "@/types/admin";
import InquiryDetailsModal from "../modals/InquiryDetailsModal";
import { useAdminFetch } from "@/lib/useAdminFetch";

interface VisionRequestsModuleProps {
  searchQuery?: string;
  inquiries?: Inquiry[];
  onSelectInquiry?: (inq: Inquiry) => void;
  onDeleteInquiry?: (id: number) => void;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onRefresh?: () => void;
}

export default function VisionRequestsModule({
  searchQuery = "",
  inquiries: propInquiries,
  onSelectInquiry: propOnSelect,
  onDeleteInquiry: propOnDelete,
  showToast = () => {},
  onRefresh,
}: VisionRequestsModuleProps) {
  const adminFetch = useAdminFetch();
  const [internalItems, setInternalItems] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(!propInquiries);

  const fetchVisionRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await adminFetch("/api/admin/vision-requests", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInternalItems(data.inquiries);
      }
    } catch {
      showToast("Failed to fetch vision requests", "error");
    } finally {
      setIsLoading(false);
    }
  }, [adminFetch, showToast]);

  useEffect(() => {
    if (propInquiries) {
      setInternalItems(
        propInquiries.filter(
          (inq) =>
            inq.project_details ||
            inq.service?.toLowerCase().includes("vision") ||
            inq.service?.toLowerCase().includes("project discussion")
        )
      );
    } else {
      fetchVisionRequests();
      const interval = setInterval(fetchVisionRequests, 15000);
      return () => clearInterval(interval);
    }
  }, [propInquiries, fetchVisionRequests]);

  const handleDelete = async (id: number) => {
    if (propOnDelete) {
      propOnDelete(id);
      return;
    }
    if (!confirm(`Delete vision scoping request #${id}?`)) return;
    try {
      const res = await adminFetch(`/api/admin/vision-requests?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Vision request removed");
        fetchVisionRequests();
      }
    } catch {
      showToast("Failed to delete vision request", "error");
    }
  };

  const handleSelect = (inq: Inquiry) => {
    if (propOnSelect) propOnSelect(inq);
    setSelectedInquiry(inq);
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-outfit text-[#0F172A]">Vision Scoping Requests</h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Dedicated engineering pod engagements and custom high-throughput project architectures.
          </p>
        </div>
        <button
          type="button"
          onClick={async () => {
            await fetchVisionRequests();
            if (onRefresh) onRefresh();
            showToast("Vision requests refreshed", "success");
          }}
          disabled={isLoading}
          className="px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-slate-700 hover:text-[#FF6B00] hover:border-orange-300 transition-all shadow-xs disabled:opacity-60"
          title="Refresh Vision Requests"
        >
          <span className={isLoading ? "animate-spin inline-block" : ""}>🔄</span>
          <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {isLoading && internalItems.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-2xl text-slate-500 text-xs shadow-xs">
          Loading vision scoping requests...
        </div>
      ) : internalItems.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-2xl text-slate-500 text-xs shadow-xs">
          No dedicated vision scoping requests at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internalItems.map((inq) => (
            <div
              key={inq.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-orange-300 hover:shadow-[0_4px_20px_rgba(255,107,0,0.12)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#FF6B00] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    {inq.service}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    #{inq.id} • {inq.created_at?.slice(0, 10)}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A] font-outfit">
                  {inq.client_name} ({inq.company})
                </h3>
                <p className="text-xs text-slate-600 mt-2 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] leading-relaxed font-sans">
                  {inq.project_details ||
                    "Full-lifecycle enterprise architecture migration and sovereign intelligence pod."}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#E2E8F0]">
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span>Status: {inq.status}</span>
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelect(inq)}
                    className="px-3.5 py-1.5 text-xs font-bold bg-[#FF6B00] hover:bg-[#e05d00] text-white rounded-xl shadow-[0_2px_10px_rgba(255,107,0,0.25)] cursor-pointer transition-all active:scale-95"
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(inq.id)}
                    className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl cursor-pointer transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scope Details Modal */}
      <InquiryDetailsModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onInquiryUpdated={fetchVisionRequests}
        showToast={showToast}
        initialMode="reply"
      />
    </div>
  );
}
