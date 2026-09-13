"use client";

import React, { useState, useEffect } from "react";
import { FounderProposal } from "@/types/admin";

interface FounderProposalsModuleProps {
  searchQuery?: string;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onRefresh?: () => void;
}

export default function FounderProposalsModule({
  searchQuery = "",
  showToast,
  onRefresh,
}: FounderProposalsModuleProps) {
  const [proposals, setProposals] = useState<FounderProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<FounderProposal | null>(null);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/founder-proposals");
      const data = await res.json();
      if (data.success && data.proposals) {
        setProposals(data.proposals);
      }
    } catch (err) {
      console.error("Failed to load founder proposals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    try {
      const res = await fetch("/api/admin/founder-proposals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast?.(`Proposal marked as ${status}`);
        fetchProposals();
        onRefresh?.();
      } else {
        showToast?.("Failed to update status", "error");
      }
    } catch {
      showToast?.("Failed to update status", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`Delete proposal record #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/founder-proposals?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProposals((prev) => prev.filter((p) => p.id !== id));
        showToast?.("Proposal deleted");
        fetchProposals();
        onRefresh?.();
      } else {
        showToast?.("Failed to delete proposal", "error");
      }
    } catch {
      showToast?.("Failed to delete proposal", "error");
    }
  };

  const getValidUrl = (url?: string) => {
    if (!url || !url.trim()) return null;
    const clean = url.trim();
    if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
    if (clean.includes(".") && !clean.includes(" ")) return `https://${clean}`;
    return null;
  };

  const filtered = proposals.filter(
    (p) =>
      p.candidate_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialty_proposal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.proposal_pitch?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newCount = proposals.filter((p) => p.status === "NEW").length;
  const contactedCount = proposals.filter((p) => p.status === "CONTACTED").length;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] flex items-center gap-2">
            <span>Direct Founder Hotline Proposals</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF6B00] font-bold">
              {proposals.length} Total
            </span>
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Specialized systems architecture proposals and direct founder applications from elite engineers.
          </p>
        </div>
        <button
          onClick={() => {
            fetchProposals();
            onRefresh?.();
          }}
          className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded shadow-xs cursor-pointer"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            TOTAL PROPOSALS
          </span>
          <div className="text-2xl font-bold text-slate-900">{proposals.length}</div>
        </div>
        <div className="bg-white border border-orange-100 bg-orange-50/20 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">
            NEW / UNREVIEWED
          </span>
          <div className="text-2xl font-bold text-[#FF6B00]">{newCount}</div>
        </div>
        <div className="bg-white border border-emerald-100 bg-emerald-50/20 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
            CONTACTED / ACCEPTED
          </span>
          <div className="text-2xl font-bold text-emerald-600">{contactedCount}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <th className="p-3.5">Applicant / Engineer</th>
              <th className="p-3.5">Architecture Specialty / Focus</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Proposal Pitch</th>
              <th className="p-3.5">Received</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400">
                  Loading proposals...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400">
                  No founder proposals found.
                </td>
              </tr>
            ) : (
              filtered.map((p) => {
                const validUrl = getValidUrl(p.portfolio_link);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div>{p.candidate_name}</div>
                      {validUrl && (
                        <a
                          href={validUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-semibold text-[#FF6B00] hover:underline inline-flex items-center gap-0.5 mt-0.5"
                        >
                          <span>Profile/RFC &rarr;</span>
                        </a>
                      )}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800 max-w-[200px] truncate">
                      {p.specialty_proposal}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <a href={`mailto:${p.email}`} className="hover:text-[#FF6B00] hover:underline">
                        {p.email}
                      </a>
                    </td>
                    <td className="p-3.5 text-slate-500 max-w-[220px]">
                      {p.proposal_pitch ? (
                        <button
                          type="button"
                          onClick={() => setSelectedProposal(p)}
                          className="text-left font-normal text-slate-600 hover:text-slate-900 cursor-pointer block group"
                        >
                          <span className="line-clamp-2">{p.proposal_pitch}</span>
                          <span className="text-[10px] text-[#FF6B00] font-semibold group-hover:underline block mt-0.5">
                            View Full Pitch &rarr;
                          </span>
                        </button>
                      ) : (
                        <span className="text-slate-400 italic">No message pitch</span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {p.created_at || "Recent"}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <select
                        value={p.status}
                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                        className={`border rounded px-2 py-1 font-semibold text-[11px] cursor-pointer outline-none ${
                          p.status === "NEW"
                            ? "bg-orange-50 border-orange-200 text-[#FF6B00]"
                            : p.status === "CONTACTED"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-white border-slate-300 text-slate-700"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-1.5 items-center">
                        <a
                          href={`mailto:${p.email}?subject=Founder%20Response%20-%20Creed%20Tech&body=Hi%20${encodeURIComponent(p.candidate_name)},%0A%0AThank%20you%20for%20submitting%20your%20technical%20profile%20to%20our%20Founders.`}
                          className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-[#FF6B00] rounded font-semibold text-xs transition-colors cursor-pointer"
                          title="Direct Email Applicant"
                        >
                          Reply
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold text-xs transition-colors cursor-pointer"
                          title="Delete Proposal"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Pitch Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-7 relative text-left">
            <button
              type="button"
              onClick={() => setSelectedProposal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">
              Direct Founder Proposal
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {selectedProposal.candidate_name}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mb-4">
              {selectedProposal.specialty_proposal}
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-5 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-0.5">Email Address:</span>
                <a href={`mailto:${selectedProposal.email}`} className="text-[#FF6B00] hover:underline font-medium">
                  {selectedProposal.email}
                </a>
              </div>
              {selectedProposal.portfolio_link && (
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Portfolio / RFC:</span>
                  <a
                    href={getValidUrl(selectedProposal.portfolio_link) || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FF6B00] hover:underline font-medium break-all"
                  >
                    {selectedProposal.portfolio_link}
                  </a>
                </div>
              )}
              <div>
                <span className="font-bold text-slate-700 block mb-1">Architecture Proposal &amp; Message:</span>
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-800 leading-relaxed whitespace-pre-wrap font-normal max-h-60 overflow-y-auto">
                  {selectedProposal.proposal_pitch || "No written pitch provided."}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400 font-mono">
                Received: {selectedProposal.created_at}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProposal(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedProposal.email}?subject=Founder%20Response%20-%20Creed%20Tech&body=Hi%20${encodeURIComponent(selectedProposal.candidate_name)},%0A%0AThank%20you%20for%20submitting%20your%20technical%20profile%20to%20our%20Founders.`}
                  className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Reply via Email &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
