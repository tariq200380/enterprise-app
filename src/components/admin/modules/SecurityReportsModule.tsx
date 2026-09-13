"use client";

import React, { useState, useEffect } from "react";
import { SecurityReport } from "@/types/admin";

interface SecurityReportsModuleProps {
  searchQuery?: string;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onRefresh?: () => void;
}

export default function SecurityReportsModule({
  searchQuery = "",
  showToast,
  onRefresh,
}: SecurityReportsModuleProps) {
  const [reports, setReports] = useState<SecurityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<SecurityReport | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/security-reports");
      const data = await res.json();
      if (data.success && data.reports) {
        setReports(data.reports);
      }
    } catch (err) {
      console.error("Failed to load security reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      const res = await fetch("/api/admin/security-reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast?.(`Report #${id} marked as ${status}`);
        fetchReports();
        onRefresh?.();
      } else {
        showToast?.("Failed to update status", "error");
      }
    } catch {
      showToast?.("Failed to update status", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`Permanently delete security report #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/security-reports?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setReports((prev) => prev.filter((r) => r.id !== id));
        if (selectedReport?.id === id) setSelectedReport(null);
        showToast?.("Security report deleted");
        fetchReports();
        onRefresh?.();
      } else {
        showToast?.("Failed to delete security report", "error");
      }
    } catch {
      showToast?.("Failed to delete security report", "error");
    }
  };

  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.reporter_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = filterCategory === "ALL" || r.category === filterCategory;
    const matchesSev = filterSeverity === "ALL" || r.severity?.toLowerCase() === filterSeverity.toLowerCase();

    return matchesSearch && matchesCat && matchesSev;
  });

  const totalCount = reports.length;
  const newCount = reports.filter((r) => r.status === "NEW").length;
  const criticalCount = reports.filter(
    (r) => r.severity?.toLowerCase() === "critical" || r.severity?.toLowerCase() === "high"
  ).length;
  const resolvedCount = reports.filter(
    (r) => r.status === "RESOLVED" || r.status === "CLOSED"
  ).length;

  const getSeverityBadge = (severity?: string) => {
    const s = severity?.toLowerCase();
    if (s === "critical") {
      return "bg-red-50 text-red-700 border-red-200";
    }
    if (s === "high") {
      return "bg-orange-50 text-[#FF6B00] border-orange-200";
    }
    if (s === "medium") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] flex items-center gap-2">
            <span>🛡️ Security Questions &amp; Complaints</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF6B00] font-bold">
              {totalCount} Total
            </span>
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Dedicated triage for security questions, vulnerability reports, and technical complaints. Isolated from general inquiries.
          </p>
        </div>
        <button
          onClick={() => {
            fetchReports();
            onRefresh?.();
          }}
          className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded shadow-xs cursor-pointer"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            TOTAL SECURITY REPORTS
          </span>
          <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
        </div>
        <div className="bg-white border border-red-100 bg-red-50/20 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-1">
            CRITICAL / HIGH SEVERITY
          </span>
          <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
        </div>
        <div className="bg-white border border-orange-100 bg-orange-50/20 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">
            NEW / UNTRIAGED
          </span>
          <div className="text-2xl font-bold text-[#FF6B00]">{newCount}</div>
        </div>
        <div className="bg-white border border-emerald-100 bg-emerald-50/20 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
            RESOLVED / CLOSED
          </span>
          <div className="text-2xl font-bold text-emerald-600">{resolvedCount}</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-3 mb-4 flex-wrap text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-500">Category:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-slate-200 bg-white rounded px-2.5 py-1 text-slate-700 outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Security Complaint">Security Complaint</option>
            <option value="Vulnerability Disclosure">Vulnerability Disclosure</option>
            <option value="Security Question">Security Question</option>
            <option value="Compliance & Privacy">Compliance &amp; Privacy</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-500">Severity:</span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="border border-slate-200 bg-white rounded px-2.5 py-1 text-slate-700 outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <th className="p-3.5">Reporter &amp; Email</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Severity</th>
              <th className="p-3.5">Subject &amp; Details</th>
              <th className="p-3.5">Logged At</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400">
                  Loading security records...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400">
                  No security reports matching criteria.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">
                    <div>{r.reporter_name}</div>
                    <a
                      href={`mailto:${r.email}`}
                      className="text-[11px] font-normal text-slate-500 hover:text-[#FF6B00] hover:underline"
                    >
                      {r.email}
                    </a>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700 whitespace-nowrap">
                    {r.category}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityBadge(
                        r.severity
                      )}`}
                    >
                      {r.severity || "Medium"}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-[260px]">
                    <div className="font-semibold text-slate-900 truncate mb-0.5">{r.subject}</div>
                    <button
                      type="button"
                      onClick={() => setSelectedReport(r)}
                      className="text-left font-normal text-slate-500 hover:text-slate-900 cursor-pointer block group"
                    >
                      <span className="line-clamp-2">{r.description}</span>
                      <span className="text-[10px] text-[#FF6B00] font-semibold group-hover:underline block mt-0.5">
                        Read Full Details &rarr;
                      </span>
                    </button>
                  </td>
                  <td className="p-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {r.created_at || "Recent"}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className={`border rounded px-2 py-1 font-semibold text-[11px] cursor-pointer outline-none ${
                        r.status === "NEW"
                          ? "bg-orange-50 border-orange-200 text-[#FF6B00]"
                          : r.status === "INVESTIGATING"
                          ? "bg-amber-50 border-amber-200 text-amber-700"
                          : r.status === "RESOLVED"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <option value="NEW">NEW</option>
                      <option value="INVESTIGATING">INVESTIGATING</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="DISMISSED">DISMISSED</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-1.5 items-center">
                      <a
                        href={`mailto:${r.email}?subject=${encodeURIComponent(
                          "Re: Security Report - " + (r.subject || "Security Complaint")
                        )}&body=Dear%20${encodeURIComponent(
                          r.reporter_name
                        )},%0A%0AThank%20you%20for%20contacting%20the%20Creed%20Tech%20Security%20Office%20regarding:%20${encodeURIComponent(
                          r.subject || ""
                        )}.%0A%0A`}
                        className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-[#FF6B00] rounded font-semibold text-xs transition-colors cursor-pointer"
                        title="Direct Email Reporter"
                      >
                        Reply
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold text-xs transition-colors cursor-pointer"
                        title="Delete Report"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-7 relative text-left">
            <button
              type="button"
              onClick={() => setSelectedReport(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider">
                🛡️ Security Incident &amp; Complaint
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityBadge(
                  selectedReport.severity
                )}`}
              >
                {selectedReport.severity}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {selectedReport.subject || "Security Report #" + selectedReport.id}
            </h3>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 my-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Reporter Name:</span>
                  <span className="text-slate-900 font-semibold">{selectedReport.reporter_name}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Email Contact:</span>
                  <a
                    href={`mailto:${selectedReport.email}`}
                    className="text-[#FF6B00] hover:underline font-medium"
                  >
                    {selectedReport.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Category:</span>
                  <span className="text-slate-800">{selectedReport.category}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Current Status:</span>
                  <span className="font-bold text-[#FF6B00]">{selectedReport.status}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60">
                <span className="font-bold text-slate-700 block mb-1">
                  Full Complaint / Vulnerability Details:
                </span>
                <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-slate-800 leading-relaxed whitespace-pre-wrap font-mono text-xs max-h-64 overflow-y-auto">
                  {selectedReport.description}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400 font-mono">
                Logged: {selectedReport.created_at}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedReport.email}?subject=${encodeURIComponent(
                    "Re: Security Report - " + (selectedReport.subject || "Security Complaint")
                  )}&body=Dear%20${encodeURIComponent(
                    selectedReport.reporter_name
                  )},%0A%0AThank%20you%20for%20contacting%20the%20Creed%20Tech%20Security%20Office%20regarding:%20${encodeURIComponent(
                    selectedReport.subject || ""
                  )}.%0A%0A`}
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
