"use client";

import React, { useState } from "react";
import { JobOpening } from "@/types/admin";

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (job: JobOpening) => void;
  showToast: (msg: string) => void;
}

export default function AddJobModal({ isOpen, onClose, onJobCreated, showToast }: AddJobModalProps) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Cloud Architecture");
  const [location, setLocation] = useState("Remote / Global");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("Rust, Distributed Systems");
  const [status, setStatus] = useState("ACTIVE");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    try {
      setSaving(true);
      const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          department,
          location,
          status,
          description: description || "Senior engineering role responsible for critical infrastructure.",
          tags: tagsArray,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onJobCreated(data.job);
        setTitle("");
        setDescription("");
        onClose();
        showToast("✓ Career role published to Talent Portal!");
      }
    } catch {
      showToast("Failed to create job opening");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-lg w-full p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>
        <span className="text-[10px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">CAREERS CMS</span>
        <h3 className="text-base font-bold text-[#0F172A] mb-4">Post New Job Opening</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Job Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Lead Distributed Systems Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#0052FF]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Department</label>
              <input
                type="text"
                list="dept-options"
                value={department}
                placeholder="Select or enter department"
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
              <datalist id="dept-options">
                <option value="Engineering" />
                <option value="AI & Machine Learning" />
                <option value="UI/UX & Design" />
                <option value="Cloud & SRE" />
                <option value="Solutions & Growth" />
              </datalist>
            </div>
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                value={location}
                placeholder="e.g. Remote / Global"
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Opening Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-white cursor-pointer"
              >
                <option value="ACTIVE">ACTIVE (Open)</option>
                <option value="URGENT">URGENT (Priority)</option>
                <option value="PAUSED">PAUSED</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Skills / Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                placeholder="e.g. Rust, Docker, Kubernetes"
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Job Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Core responsibilities and architectural domain..."
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white font-bold rounded cursor-pointer shadow"
            >
              {saving ? "Publishing..." : "Publish Opening"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
