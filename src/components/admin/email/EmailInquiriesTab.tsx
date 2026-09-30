"use client";

import React, { useMemo } from "react";
import { Inquiry } from "@/types/admin";

interface EmailInquiriesTabProps {
  inquiries: Inquiry[];
  isLoadingInquiries: boolean;
  inquirySearch: string;
  setInquirySearch: (val: string) => void;
  inquiryFilter: "ALL" | "NEW" | "RESPONDED";
  setInquiryFilter: (val: "ALL" | "NEW" | "RESPONDED") => void;
  onSelectInquiryForReply: (inquiry: Inquiry) => void;
  onRefreshInquiries: () => void;
}

export const EmailInquiriesTab: React.FC<EmailInquiriesTabProps> = ({
  inquiries,
  isLoadingInquiries,
  inquirySearch,
  setInquirySearch,
  inquiryFilter,
  setInquiryFilter,
  onSelectInquiryForReply,
  onRefreshInquiries,
}) => {
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      if (inquiryFilter === "NEW" && inq.status !== "NEW" && inq.status !== "PENDING") return false;
      if (inquiryFilter === "RESPONDED" && inq.status !== "RESPONDED" && inq.status !== "RESOLVED") return false;
      if (!inquirySearch.trim()) return true;
      const q = inquirySearch.toLowerCase();
      return (
        (inq.client_name && inq.client_name.toLowerCase().includes(q)) ||
        (inq.email && inq.email.toLowerCase().includes(q)) ||
        (inq.company && inq.company.toLowerCase().includes(q)) ||
        (inq.service && inq.service.toLowerCase().includes(q)) ||
        (inq.project_details && inq.project_details.toLowerCase().includes(q)) ||
        String(inq.id).includes(q)
      );
    });
  }, [inquiries, inquiryFilter, inquirySearch]);

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search & Status Filters */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
            🔍
          </span>
          <input
            type="text"
            value={inquirySearch}
            onChange={(e) => setInquirySearch(e.target.value)}
            placeholder="Search by client name, email, company, service, message, or ID..."
            className="w-full pl-8 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
          />
          {inquirySearch && (
            <button
              type="button"
              onClick={() => setInquirySearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-[#F1F3F5] p-0.5 rounded-lg border border-[#E2E8F0] text-xs">
            <button
              type="button"
              onClick={() => setInquiryFilter("ALL")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                inquiryFilter === "ALL"
                  ? "bg-[#FF6B00] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#0F172A]"
              }`}
            >
              All ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setInquiryFilter("NEW")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                inquiryFilter === "NEW"
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-[#0F172A]"
              }`}
            >
              <span>Pending / New</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white">
                {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setInquiryFilter("RESPONDED")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                inquiryFilter === "RESPONDED"
                  ? "bg-emerald-600 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-[#0F172A]"
              }`}
            >
              Responded ({inquiries.filter((i) => i.status === "RESPONDED" || i.status === "RESOLVED").length})
            </button>
          </div>

          <button
            type="button"
            onClick={onRefreshInquiries}
            className="px-3 py-1.5 bg-[#F1F3F5] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-slate-700 hover:text-[#0F172A] rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5"
            title="Refresh inquiries"
          >
            <span>🔄</span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Inquiries Content Area */}
      {isLoadingInquiries ? (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center text-slate-500 shadow-xs">
          <div className="inline-block w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin mb-3" />
          <div className="text-xs font-semibold">Loading client inquiries...</div>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center shadow-xs">
          <div className="text-4xl mb-3">📬</div>
          <h4 className="text-base font-bold text-[#0F172A] mb-1">No Inquiries Found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            {inquirySearch || inquiryFilter !== "ALL"
              ? "No client inquiries match the current search keyword or status filter."
              : "No client inquiries have been submitted yet. Once visitors submit the contact form, their inquiries will appear here ready for branded reply."}
          </p>
          {(inquirySearch || inquiryFilter !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setInquirySearch("");
                setInquiryFilter("ALL");
              }}
              className="px-4 py-1.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
            >
              Reset Filter &amp; View All
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredInquiries.map((inq) => {
            const isPending = inq.status === "NEW" || inq.status === "PENDING";
            const isResponded = inq.status === "RESPONDED";
            const isResolved = inq.status === "RESOLVED";

            return (
              <div
                key={inq.id}
                className={`bg-white border rounded-xl p-4 transition-all hover:border-[#CBD5E1] shadow-xs ${
                  isPending
                    ? "border-amber-300 ring-1 ring-amber-400/20 bg-gradient-to-r from-white to-amber-50/30"
                    : "border-[#E2E8F0]"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${
                        isPending
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : isResponded
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : isResolved
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-300"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {isPending && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />}
                      <span>{inq.status || "NEW"}</span>
                    </span>

                    {/* Reference Badge */}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F8FAFC] border border-[#E2E8F0] text-slate-700">
                      REF #{inq.id}
                    </span>

                    {/* Service Tag */}
                    {inq.service && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-50 text-[#FF6B00] border border-orange-200">
                        {inq.service}
                      </span>
                    )}

                    <span className="text-[11px] text-slate-500">
                      {inq.created_at ? new Date(inq.created_at).toLocaleString() : "Recently"}
                    </span>
                  </div>

                  {/* Primary Reply Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onSelectInquiryForReply(inq)}
                      className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_2px_8px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,0,0.35)]"
                      title="Open Branded Email Reply Composer"
                    >
                      <span>💬</span>
                      <span>Reply</span>
                    </button>
                  </div>
                </div>

                {/* Inquiry Body & Client Details */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                  <div className="md:col-span-4 space-y-1">
                    <div className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                      <span>{inq.client_name || "Anonymous Client"}</span>
                      {inq.company && (
                        <span className="text-xs font-normal text-slate-500">
                          • {inq.company}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-[#FF6B00]">
                      <a href={`mailto:${inq.email}`} className="hover:underline">
                        {inq.email}
                      </a>
                    </div>
                    {inq.phone && (
                      <div className="text-xs text-slate-500 font-mono">
                        ☎ {inq.phone}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-8">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap max-h-36 overflow-y-auto">
                      {inq.project_details || (
                        <span className="text-slate-400 italic">No message provided.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmailInquiriesTab;
