"use client";

import React, { useState, useEffect } from "react";
import { Candidate, JobOpening } from "@/types/admin";
import AddJobModal from "../modals/AddJobModal";

interface CareersModuleProps {
  candidates?: Candidate[];
  jobs?: JobOpening[];
  searchQuery?: string;
  onOpenNewJobModal?: () => void;
  onUpdateCandidateStatus?: (id: number, status: string) => void;
  onDeleteCandidate?: (id: number) => void;
  onUpdateJobStatus?: (id: number, status: string) => void;
  onDeleteJob?: (id: number) => void;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onRefresh?: () => void;
}

export default function CareersModule({
  candidates: propCandidates,
  jobs: propJobs,
  searchQuery = "",
  onOpenNewJobModal,
  onUpdateCandidateStatus,
  onDeleteCandidate,
  onUpdateJobStatus,
  onDeleteJob,
  showToast,
  onRefresh,
}: CareersModuleProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(propCandidates || []);
  const [jobs, setJobs] = useState<JobOpening[]>(propJobs || []);
  const [subTab, setSubTab] = useState<"candidates" | "jobs">("candidates");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  const fetchCareersData = async () => {
    try {
      const [candRes, jobsRes] = await Promise.all([
        fetch("/api/admin/candidates"),
        fetch("/api/admin/jobs"),
      ]);
      const candData = await candRes.json();
      const jobsData = await jobsRes.json();
      if (candData.candidates) setCandidates(candData.candidates);
      if (jobsData.jobs) setJobs(jobsData.jobs);
    } catch (err) {
      console.error("Failed to load careers data:", err);
    }
  };

  useEffect(() => {
    if (propCandidates) setCandidates(propCandidates);
    if (propJobs) setJobs(propJobs);
    if (!propCandidates && !propJobs) {
      fetchCareersData();
    }
  }, [propCandidates, propJobs]);

  const handleCandidateStatus = async (id: number, status: string) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    try {
      const res = await fetch("/api/admin/candidates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast?.(`Candidate marked as ${status}`);
        onUpdateCandidateStatus?.(id, status);
        fetchCareersData();
        onRefresh?.();
      } else {
        showToast?.("Failed to update candidate", "error");
      }
    } catch {
      showToast?.("Failed to update candidate", "error");
    }
  };

  const handleDeleteCandidateAction = async (id: number) => {
    if (!confirm(`Delete candidate record #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/candidates?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCandidates((prev) => prev.filter((c) => c.id !== id));
        showToast?.("Candidate deleted");
        onDeleteCandidate?.(id);
        fetchCareersData();
        onRefresh?.();
      } else {
        showToast?.("Failed to delete candidate", "error");
      }
    } catch {
      showToast?.("Failed to delete candidate", "error");
    }
  };

  const handleJobStatus = async (id: number, status: string) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast?.(`Job status: ${status}`);
        onUpdateJobStatus?.(id, status);
        fetchCareersData();
        onRefresh?.();
      } else {
        showToast?.("Failed to update job", "error");
      }
    } catch {
      showToast?.("Failed to update job", "error");
    }
  };

  const handleDeleteJobAction = async (id: number) => {
    if (!confirm(`Delete job opening #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
        showToast?.("Job opening deleted");
        onDeleteJob?.(id);
        fetchCareersData();
        onRefresh?.();
      } else {
        showToast?.("Failed to delete job", "error");
      }
    } catch {
      showToast?.("Failed to delete job", "error");
    }
  };

  const handleJobCreated = (newJob: JobOpening) => {
    setJobs((prev) => [newJob, ...prev]);
    setShowAddJobModal(false);
    fetchCareersData();
    onRefresh?.();
    showToast?.("✓ Career role published to Talent Portal!");
  };

  const getValidUrl = (url?: string) => {
    if (!url || !url.trim()) return null;
    const clean = url.trim();
    if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
    if (clean.includes(".") && !clean.includes(" ")) return `https://${clean}`;
    return null;
  };

  const filteredCandidates = candidates.filter(
    (c) =>
      c.candidate_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.domain_specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter(
    (j) =>
      j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Talent Pool &amp; Job Openings</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Manage vetted systems engineers, applicants, and active job postings.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (onOpenNewJobModal) onOpenNewJobModal();
              else setShowAddJobModal(true);
            }}
            className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow cursor-pointer"
          >
            + Post Job Opening
          </button>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
        <button
          onClick={() => setSubTab("candidates")}
          className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer ${
            subTab === "candidates" ? "bg-[#0052FF] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Vetted Candidates ({candidates.length})
        </button>
        <button
          onClick={() => setSubTab("jobs")}
          className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer ${
            subTab === "jobs" ? "bg-[#0052FF] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Active Job Roles ({jobs.length})
        </button>
      </div>

      {subTab === "candidates" && (
        <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold">
                <th className="p-3.5">Candidate</th>
                <th className="p-3.5">Specialty</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Applied Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((c) => {
                  const validUrl = getValidUrl(c.portfolio_github);
                  return (
                    <tr key={c.id} className="hover:bg-[#F8FAFC]">
                      <td className="p-3.5 font-bold text-[#0F172A]">{c.candidate_name}</td>
                      <td className="p-3.5 font-semibold text-[#0052FF]">{c.domain_specialty}</td>
                      <td className="p-3.5 text-[#64748B]">{c.email}</td>
                      <td className="p-3.5 text-gray-500 font-mono text-[11px]">{c.created_at || "Recent"}</td>
                      <td className="p-3.5">
                        <select
                          value={c.status}
                          onChange={(e) => handleCandidateStatus(c.id, e.target.value)}
                          className="bg-white border border-gray-300 rounded px-2 py-1 font-semibold text-xs cursor-pointer"
                        >
                          <option value="NEW">NEW</option>
                          <option value="PENDING">PENDING</option>
                          <option value="SHORTLISTED">SHORTLISTED</option>
                          <option value="INTERVIEW">INTERVIEW</option>
                          <option value="OFFER">OFFER</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex justify-end gap-1.5 items-center">
                          {validUrl ? (
                            <a
                              href={validUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#0052FF] rounded font-semibold text-xs transition-colors"
                              title={`Open: ${validUrl}`}
                            >
                              Portfolio ↗
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedCandidate(c)}
                              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-semibold text-xs cursor-pointer transition-colors"
                              title={c.portfolio_github ? `Coordinates: ${c.portfolio_github}` : "No link"}
                            >
                              Details ℹ️
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCandidateAction(c.id)}
                            className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold cursor-pointer text-xs transition-colors"
                          >
                            Delete
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
      )}

      {subTab === "jobs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((j) => (
            <div key={j.id} className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0052FF] bg-blue-50 px-2 py-0.5 rounded">
                    {j.department}
                  </span>
                  <select
                    value={j.status}
                    onChange={(e) => handleJobStatus(j.id, e.target.value)}
                    className="text-xs font-bold border border-gray-300 rounded px-2 py-0.5 bg-white cursor-pointer"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PAUSED">PAUSED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">{j.title}</h3>
                <p className="text-xs text-[#64748B] mt-1">{j.location}</p>
                <p className="text-xs text-[#334155] mt-2 leading-relaxed">{j.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {(Array.isArray(j.tags) ? j.tags : []).map((t, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => handleDeleteJobAction(j.id)}
                  className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded cursor-pointer"
                >
                  🗑️ Delete Role
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Candidate Profile / Details Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 p-6 relative text-left">
            <button
              type="button"
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">
              Candidate Profile
            </span>
            <h3 className="text-lg font-bold text-[#0F172A]">{selectedCandidate.candidate_name}</h3>
            <p className="text-xs font-semibold text-[#0052FF] mt-0.5">{selectedCandidate.domain_specialty}</p>

            <div className="mt-4 space-y-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div>
                <span className="text-gray-500 block font-medium">Email Address:</span>
                <span className="text-gray-900 font-semibold">{selectedCandidate.email}</span>
              </div>
              <div>
                <span className="text-gray-500 block font-medium">Portfolio / Coordinates Provided:</span>
                <span className="text-gray-900 font-mono bg-white px-2 py-1 rounded border border-gray-200 block mt-1 break-all">
                  {selectedCandidate.portfolio_github || "No coordinates specified"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block font-medium">Date Registered:</span>
                <span className="text-gray-900">{selectedCandidate.created_at || "Recent"}</span>
              </div>
              <div>
                <span className="text-gray-500 block font-medium mb-1">Application Status:</span>
                <select
                  value={selectedCandidate.status}
                  onChange={(e) => {
                    handleCandidateStatus(selectedCandidate.id, e.target.value);
                    setSelectedCandidate({ ...selectedCandidate, status: e.target.value });
                  }}
                  className="bg-white border border-gray-300 rounded px-2.5 py-1 font-semibold text-xs w-full cursor-pointer"
                >
                  <option value="NEW">NEW</option>
                  <option value="PENDING">PENDING</option>
                  <option value="SHORTLISTED">SHORTLISTED</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="OFFER">OFFER</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Add Job Modal */}
      <AddJobModal
        isOpen={showAddJobModal}
        onClose={() => setShowAddJobModal(false)}
        onJobCreated={handleJobCreated}
        showToast={showToast || (() => {})}
      />
    </div>
  );
}
