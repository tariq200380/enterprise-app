"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Inquiry } from "@/types/admin";
import InquiryDetailsModal from "../modals/InquiryDetailsModal";

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
  const [internalItems, setInternalItems] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(!propInquiries);

  const fetchVisionRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/vision-requests", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInternalItems(data.inquiries);
      }
    } catch {
      showToast("Failed to fetch vision requests", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (propInquiries) {
      setInternalItems(
        propInquiries.filter(
          (inq) => inq.project_details || inq.service?.toLowerCase().includes("vision")
        )
      );
    } else {
      fetchVisionRequests();
    }
  }, [propInquiries, fetchVisionRequests]);

  const handleDelete = async (id: number) => {
    if (propOnDelete) {
      propOnDelete(id);
      return;
    }
    if (!confirm(`Delete vision scoping request #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/vision-requests?id=${id}`, { method: "DELETE" });
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
          <h1 className="text-[22px] font-bold text-[#0F172A]">Vision Scoping Requests</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Dedicated engineering pod engagements and custom high-throughput project architectures.
          </p>
        </div>
      </div>

      {isLoading && internalItems.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-xs">
          Loading vision scoping requests...
        </div>
      ) : internalItems.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-xs">
          No dedicated vision scoping requests at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internalItems.map((inq) => (
            <div
              key={inq.id}
              className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0052FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {inq.service}
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    #{inq.id} • {inq.created_at?.slice(0, 10)}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {inq.client_name} ({inq.company})
                </h3>
                <p className="text-xs text-[#64748B] mt-2 p-3 bg-gray-50 rounded border border-gray-200 leading-relaxed font-mono">
                  {inq.project_details ||
                    "Full-lifecycle enterprise architecture migration and sovereign intelligence pod."}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs font-semibold text-emerald-700">
                  Status: {inq.status}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelect(inq)}
                    className="px-3 py-1 text-xs font-bold bg-[#0052FF] text-white rounded hover:bg-[#0042D0] cursor-pointer"
                  >
                    View Scope
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(inq.id)}
                    className="px-2.5 py-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded cursor-pointer"
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
      />
    </div>
  );
}
