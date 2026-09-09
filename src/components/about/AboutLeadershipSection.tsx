import React from "react";
import Link from "next/link";
import { AboutLeadershipMemberItem } from "@/components/admin/settings/types";

interface Props {
  badgeTag?: string;
  headline?: string;
  description?: string;
  leadership: AboutLeadershipMemberItem[];
}

export default function AboutLeadershipSection({
  badgeTag = "THE PEOPLE BEHIND THE CODE",
  headline = "Executive Leadership & Technical Custodians",
  description = "Meet the founders and principal architects who guide our engineering vision and mentor our senior pods across 3 global centers.",
  leadership,
}: Props) {
  if (!leadership || leadership.length === 0) return null;

  return (
    <section className="w-full py-16 sm:py-24 border-b border-[#E5E7EB] text-center bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          {badgeTag && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF7ED] border border-[#FFEDD5] text-[#FF6B00] text-[11.5px] font-bold uppercase tracking-wider rounded-sm mb-3">
              <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full inline-block" />
              {badgeTag}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
              {description}
            </p>
          )}
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-left">
          {leadership.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 sm:gap-6"
            >
              <div className="w-full sm:w-44 h-48 sm:h-54 rounded-xl overflow-hidden shrink-0 relative bg-gray-900">
                <img
                  src={member.portraitUrl}
                  alt={member.name}
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                {member.badgeTag && (
                  <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-mono font-semibold">
                    {member.badgeTag}
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                <div>
                  <h3 className="text-xl font-bold text-[#030712] leading-tight">{member.name}</h3>
                  <span className="text-xs font-bold text-[#0052FF] block mt-0.5">{member.role}</span>
                  {member.bio && (
                    <p className="text-[12.5px] text-[#4B5563] leading-relaxed my-2 font-normal">
                      {member.bio}
                    </p>
                  )}
                  {member.quote && (
                    <blockquote className="my-0 px-2.5 py-2 bg-[#F9FAFB] rounded-md border border-[#F3F4F6] text-[11.5px] text-[#374151] italic leading-relaxed">
                      &ldquo;{member.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
                {member.ctaText && (
                  <div className="pt-2 border-t border-[#F3F4F6]">
                    <Link
                      href={member.ctaUrl || "/contact"}
                      className="text-xs font-bold text-[#0052FF] hover:underline"
                    >
                      {member.ctaText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
