"use client";

import React from "react";
import { WebsiteSettingsData, PortfolioProjectItem, PortfolioShowcaseSettings } from "./types";
import PortfolioShowcaseCard from "./portfolio/PortfolioShowcaseCard";
import PortfolioProjectCard from "./portfolio/PortfolioProjectCard";

interface PortfolioSettingsSectionProps {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function PortfolioSettingsSection({
  settings,
  onChange,
}: PortfolioSettingsSectionProps) {
  const showcase = settings.portfolioShowcase;
  const projects = settings.portfolioProjects || [];

  // Update showcase field
  const handleShowcaseChange = (field: keyof PortfolioShowcaseSettings, value: string) => {
    onChange("portfolioShowcase", {
      ...showcase,
      [field]: value,
    });
  };

  // Update specific field in a project
  const handleProjectChange = (
    index: number,
    field: keyof PortfolioProjectItem,
    value: string
  ) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange("portfolioProjects", updated);
  };

  // Add new project template
  const handleAddProject = () => {
    const newProject: PortfolioProjectItem = {
      id: `case-${Date.now()}`,
      coverImageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
      category: "Enterprise Engineering",
      clientNameLocation: "Global Enterprise Partner • United States",
      imageBadgeTag: "Engineering",
      title: "New Enterprise Project",
      description: "Detailed executive summary describing the mission-critical system, architecture, and business outcome.",
      challenge: "Legacy architecture unable to handle high-concurrency real-time workloads.",
      solution: "Modernized with scalable microservices, containerization, and automated CI/CD.",
      metric1Value: "10x",
      metric1Label: "Velocity Boost",
      metric2Value: "99.99%",
      metric2Label: "Uptime SLA",
      metric3Value: "0 Defect",
      metric3Label: "Code SLA",
      techStack: "Go, Kubernetes, Docker, PostgreSQL, AWS",
    };
    onChange("portfolioProjects", [...projects, newProject]);
  };

  // Delete project
  const handleDeleteProject = (index: number) => {
    if (confirm(`Are you sure you want to delete Case ${index + 1}?`)) {
      const updated = projects.filter((_, i) => i !== index);
      onChange("portfolioProjects", updated);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header with Add Button */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white border border-[#E2E8F0] p-4 rounded-lg shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A]">
            Portfolio Page Architecture &amp; Case Studies
          </h2>
          <p className="text-xs text-[#64748B]">
            Customize top showcase standards and manage all published case study cards dynamically.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add New Project</span>
        </button>
      </div>

      {/* 1. Engineering Standards Showcase Card */}
      <PortfolioShowcaseCard showcase={showcase} onChange={handleShowcaseChange} />

      {/* 2. Dynamic Case Studies & Projects */}
      <div className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <PortfolioProjectCard
            key={project.id || index}
            project={project}
            index={index}
            onChange={(field, value) => handleProjectChange(index, field, value)}
            onDelete={() => handleDeleteProject(index)}
          />
        ))}
      </div>
    </div>
  );
}
