"use client";

import React, { useState } from "react";
import { Candidate, JobOpening } from "@/types/admin";

interface CareersModuleProps {
  candidates: Candidate[];
  jobs: JobOpening[];
  searchQuery: string;
  onOpenNewJobModal: () => void;
  onUpdateCandidateStatus: (id: number, status: string) => void;
  onDeleteCandidate: (id: number) => void;
  onUpdateJobStatus: (id: number, status: string) => void;
  onDeleteJob: (id: number) => void;
}

export default function CareersModule({
  candidates,
  jobs,
  searchQuery,
  onOpenNewJobModal,
  onUpdateCandidateStatus,
  onDeleteCandidate,
  onUpdateJobStatus,
  onDeleteJob,
}: CareersModuleProps) {
  const [subTab, setSubTab] = useState<"candidates" | "jobs">("candidates");

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
            onClick={onOpenNewJobModal}
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
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredCandidates.map((c) => (
                <tr key={c.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3.5 font-bold text-[#0F172A]">{c.candidate_name}</td>
                  <td className="p-3.5 font-semibold text-[#0052FF]">{c.domain_specialty}</td>
                  <td className="p-3.5 text-[#64748B]">{c.email}</td>
                  <td className="p-3.5">
                    <select
                      value={c.status}
                      onChange={(e) => onUpdateCandidateStatus(c.id, e.target.value)}
                      className="bg-white border border-gray-300 rounded px-2 py-1 font-semibold text-xs cursor-pointer"
                    >
                      <option value="NEW">NEW</option>
                      <option value="INTERVIEW">INTERVIEW</option>
                      <option value="OFFER">OFFER</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href={c.portfolio_github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded font-semibold text-gray-700"
                      >
                        Portfolio ↗
                      </a>
                      <button
                        onClick={() => onDeleteCandidate(c.id)}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                    onChange={(e) => onUpdateJobStatus(j.id, e.target.value)}
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
                  onClick={() => onDeleteJob(j.id)}
                  className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded cursor-pointer"
                >
                  🗑️ Delete Role
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
