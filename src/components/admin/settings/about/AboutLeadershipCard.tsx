"use client";

import React from "react";
import { AboutLeadershipMemberItem, AboutSettingsData } from "../types";

interface Props {
  data: AboutSettingsData;
  onChangeField: (field: keyof AboutSettingsData, value: any) => void;
}

export default function AboutLeadershipCard({ data, onChangeField }: Props) {
  const leadership = data.leadership || [];

  const handleMemberChange = (
    index: number,
    field: keyof AboutLeadershipMemberItem,
    value: string
  ) => {
    const updated = [...leadership];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChangeField("leadership", updated);
  };

  const handleAddMember = () => {
    const newMember: AboutLeadershipMemberItem = {
      id: `leader-${Date.now()}`,
      name: "",
      role: "",
      portraitUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      badgeTag: "",
      bio: "",
      quote: "",
      ctaText: "Connect →",
      ctaUrl: "/contact",
    };
    onChangeField("leadership", [...leadership, newMember]);
  };

  const handleDeleteMember = (index: number) => {
    const updated = leadership.filter((_, i) => i !== index);
    onChangeField("leadership", updated);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
              👥
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">
              Executive Leadership &amp; Technical Custodians
            </h3>
          </div>
          <p className="text-xs text-[#64748B]">
            Manage team names, executive titles, portrait pictures, specializations, biographies, quotes, and connect links.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddMember}
          className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Section Meta Inputs */}
      <div className="flex flex-col gap-4 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Section Badge Tag
            </label>
            <input
              type="text"
              value={data.leadershipBadgeTag || ""}
              onChange={(e) => onChangeField("leadershipBadgeTag", e.target.value)}
              placeholder="THE PEOPLE BEHIND THE CODE"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Section Headline <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.leadershipHeadline || ""}
              onChange={(e) => onChangeField("leadershipHeadline", e.target.value)}
              placeholder="Executive Leadership & Technical Custodians"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Section Description Paragraph
          </label>
          <textarea
            rows={2}
            value={data.leadershipDescription || ""}
            onChange={(e) => onChangeField("leadershipDescription", e.target.value)}
            placeholder="Meet the founders and principal architects who guide our engineering vision and mentor our senior pods across 3 global centers."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white"
          />
        </div>
      </div>

      {/* Leadership Profiles Sub-Header */}
      <div className="pt-2">
        <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-4">
          INDIVIDUAL LEADERSHIP PROFILES
        </h4>

        {/* Dynamic Member Cards List */}
        <div className="flex flex-col gap-5">
          {leadership.map((member, idx) => {
            const memberNum = String(idx + 1).padStart(2, "0");
            const titleLabel = member.name
              ? `MEMBER ${memberNum}: ${member.name}${member.role ? ` — ${member.role}` : ""}`
              : `MEMBER ${memberNum}: New Leadership Profile`;

            return (
              <div
                key={member.id || `member-${idx}`}
                className="bg-white border border-[#CBD5E1] rounded-lg shadow-sm overflow-hidden"
              >
                {/* Member Header */}
                <div className="bg-[#F1F5F9] border-b border-[#CBD5E1] px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#0052FF] text-white text-[11px] font-bold flex items-center justify-center">
                      {memberNum}
                    </span>
                    <h5 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase truncate max-w-[450px]">
                      {titleLabel}
                    </h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteMember(idx)}
                    className="px-3 py-1.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <span>✕</span>
                    <span>Delete Member</span>
                  </button>
                </div>

                {/* Member Fields */}
                <div className="p-5 flex flex-col gap-4">
                  {/* Portrait Photo URL with Live Thumbnail */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Portrait Image URL <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {member.portraitUrl ? (
                        <img
                          src={member.portraitUrl}
                          alt={member.name || "Member Portrait"}
                          className="w-14 h-14 rounded-full object-cover border border-gray-300 shrink-0 bg-gray-100"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full border border-dashed border-gray-300 shrink-0 bg-gray-50 flex items-center justify-center text-[10px] text-gray-400">
                          No img
                        </div>
                      )}
                      <input
                        type="text"
                        value={member.portraitUrl}
                        onChange={(e) => handleMemberChange(idx, "portraitUrl", e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                        placeholder="Alexander Wright"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Executive Designation / Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => handleMemberChange(idx, "role", e.target.value)}
                        placeholder="Founder & Chief Executive Officer"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-medium"
                      />
                    </div>
                  </div>

                  {/* Photo Badge / Specialty Tag */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Photo Badge / Specialty Tag
                    </label>
                    <input
                      type="text"
                      value={member.badgeTag}
                      onChange={(e) => handleMemberChange(idx, "badgeTag", e.target.value)}
                      placeholder="Senior Systems Architect"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>

                  {/* Biography / Background */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Biography / Background Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={member.bio}
                      onChange={(e) => handleMemberChange(idx, "bio", e.target.value)}
                      placeholder="Founded Creed Tech in 2023 with the conviction..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>

                  {/* Executive Quote / Philosophy */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Executive Quote / Philosophy Statement
                    </label>
                    <textarea
                      rows={2}
                      value={member.quote}
                      onChange={(e) => handleMemberChange(idx, "quote", e.target.value)}
                      placeholder="We don't build software to sell and walk away..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] italic"
                    />
                  </div>

                  {/* Connect CTA Link Text & Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Connect CTA Link Text
                      </label>
                      <input
                        type="text"
                        value={member.ctaText}
                        onChange={(e) => handleMemberChange(idx, "ctaText", e.target.value)}
                        placeholder="Connect with Alexander →"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Connect CTA Destination URL
                      </label>
                      <input
                        type="text"
                        value={member.ctaUrl}
                        onChange={(e) => handleMemberChange(idx, "ctaUrl", e.target.value)}
                        placeholder="/contact"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
