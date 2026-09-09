"use client";

import React from "react";
import { PortfolioProjectItem } from "../types";

interface PortfolioProjectCardProps {
  project: PortfolioProjectItem;
  index: number;
  onChange: (field: keyof PortfolioProjectItem, value: string) => void;
  onDelete: () => void;
}

export default function PortfolioProjectCard({
  project,
  index,
  onChange,
  onDelete,
}: PortfolioProjectCardProps) {
  const caseNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-[#0052FF] text-white text-[11px] font-bold flex items-center justify-center">
            {caseNumber}
          </span>
          <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase truncate max-w-[500px]">
            CASE {caseNumber}: {project.title || "New Enterprise Project"}
          </h3>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="px-3 py-1.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1"
        >
          <span>✕</span>
          <span>Delete Project</span>
        </button>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* Cover Image URL with Live Thumbnail */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Cover Image URL
          </label>
          <div className="flex items-center gap-3">
            {project.coverImageUrl ? (
              <img
                src={project.coverImageUrl}
                alt={`Case ${caseNumber} preview`}
                className="w-16 h-12 rounded object-cover border border-gray-300 shrink-0 bg-gray-100"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-16 h-12 rounded border border-dashed border-gray-300 shrink-0 bg-gray-50 flex items-center justify-center text-[10px] text-gray-400">
                No img
              </div>
            )}
            <input
              type="text"
              value={project.coverImageUrl}
              onChange={(e) => onChange("coverImageUrl", e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>

        {/* Category & Client Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Category / Subtitle
            </label>
            <input
              type="text"
              value={project.category}
              onChange={(e) => onChange("category", e.target.value)}
              placeholder="Fintech & Banking Rails"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Client Name &amp; Location
            </label>
            <input
              type="text"
              value={project.clientNameLocation}
              onChange={(e) => onChange("clientNameLocation", e.target.value)}
              placeholder="Apex Global Settlement Rail • United Kingdom"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>

        {/* Badge Tag & Project Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Image Badge Tag
            </label>
            <input
              type="text"
              value={project.imageBadgeTag}
              onChange={(e) => onChange("imageBadgeTag", e.target.value)}
              placeholder="Fintech & Banking"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Project Headline / Title
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Next-Gen Multi-Region High-Frequency Payment Processing Engine"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold text-[#0F172A]"
            />
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Executive Summary / Description
          </label>
          <textarea
            rows={2}
            value={project.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Engineered an ultra-low latency transaction clearing engine..."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
          />
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              The Engineering Challenge
            </label>
            <textarea
              rows={2}
              value={project.challenge}
              onChange={(e) => onChange("challenge", e.target.value)}
              placeholder="Architected an ultra-low latency payment orchestration layer..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Creed Tech Architectural Solution
            </label>
            <textarea
              rows={2}
              value={project.solution}
              onChange={(e) => onChange("solution", e.target.value)}
              placeholder="Deployed Go microservices with distributed CockroachDB..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
            />
          </div>
        </div>

        {/* 3 Impact Metrics Row */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-2">
            3 Impact Metrics (Value &amp; Label)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            {/* Metric 1 */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider">
                Metric 1
              </span>
              <input
                type="text"
                value={project.metric1Value}
                onChange={(e) => onChange("metric1Value", e.target.value)}
                placeholder="Value (e.g. 120k TPS)"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold text-[#0F172A]"
              />
              <input
                type="text"
                value={project.metric1Label}
                onChange={(e) => onChange("metric1Label", e.target.value)}
                placeholder="Label (e.g. Throughput Speed)"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] text-[#64748B]"
              />
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider">
                Metric 2
              </span>
              <input
                type="text"
                value={project.metric2Value}
                onChange={(e) => onChange("metric2Value", e.target.value)}
                placeholder="Value (e.g. -85%)"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold text-[#0F172A]"
              />
              <input
                type="text"
                value={project.metric2Label}
                onChange={(e) => onChange("metric2Label", e.target.value)}
                placeholder="Label (e.g. Latency Drop)"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] text-[#64748B]"
              />
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider">
                Metric 3
              </span>
              <input
                type="text"
                value={project.metric3Value}
                onChange={(e) => onChange("metric3Value", e.target.value)}
                placeholder="Value (e.g. 99.999%)"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-bold text-[#0F172A]"
              />
              <input
                type="text"
                value={project.metric3Label}
                onChange={(e) => onChange("metric3Label", e.target.value)}
                placeholder="Label (e.g. Uptime SLA)"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] text-[#64748B]"
              />
            </div>
          </div>
        </div>

        {/* Architectural Tech Stack */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Architectural Tech Stack (Comma separated)
          </label>
          <input
            type="text"
            value={project.techStack}
            onChange={(e) => onChange("techStack", e.target.value)}
            placeholder="Go, Kubernetes, CockroachDB, Kafka, AWS GovCloud, Redis"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-mono text-[#0F172A]"
          />
        </div>
      </div>
    </div>
  );
}
