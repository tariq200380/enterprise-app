import React from "react";
import Link from "next/link";
import { AboutLeadershipMemberItem } from "@/components/admin/settings/types";

const DEFAULT_LEADERS: AboutLeadershipMemberItem[] = [
  {
    id: "leader-01",
    name: "Alexander Wright",
    role: "Founder & Chief Executive Officer",
    portraitUrl: "",
    badgeTag: "Founder",
    bio: "Founded Creed Tech with the conviction that next-generation enterprise software should be built with mathematical precision, neural scalability, and uncompromising craftsmanship.",
    quote: "We don't build software to sell and walk away. We build digital infrastructure that companies run their entire future on.",
    ctaText: "Connect with Alexander →",
    ctaUrl: "/contact",
  },
  {
    id: "leader-02",
    name: "Dr. Elena Rostova",
    role: "Chief Technology Officer",
    portraitUrl: "",
    badgeTag: "Ph.D. Distributed Systems",
    bio: "Directs research in private enterprise LLMs and distributed vector streaming. Champion of vendor-neutral, open cloud architecture.",
    quote: "The best engineering is invisible — it performs flawlessly under maximum load without ever taking a bow.",
    ctaText: "Connect with Elena →",
    ctaUrl: "/contact",
  },
  {
    id: "leader-03",
    name: "Marcus Vance",
    role: "Head of Global Security & Governance",
    portraitUrl: "",
    badgeTag: "Ex-Defense Cryptographer",
    bio: "Oversees zero-trust architectures, sovereign data privacy, and SOC 2 Type II governance across all client engagements.",
    quote: "In high-stakes systems, trust is not a promise — it's mathematically verified cryptography.",
    ctaText: "Connect with Marcus →",
    ctaUrl: "/contact",
  },
  {
    id: "leader-04",
    name: "Sarah Jenkins",
    role: "VP of Global Client Engineering",
    portraitUrl: "",
    badgeTag: "14+ Yrs Agile Delivery",
    bio: "Directs dedicated senior engineering pods across three global centers, guaranteeing milestone velocity, zero-defect releases, and continuous client alignment.",
    quote: "Engineering maturity isn't just about writing code; it's about delivering business outcomes with absolute predictability.",
    ctaText: "Connect with Sarah →",
    ctaUrl: "/contact",
  },
];

function getInitials(name: string): string {
  if (!name) return "CT";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface AboutLeadershipSectionProps {
  badgeTag?: string;
  headline?: string;
  description?: string;
  members?: AboutLeadershipMemberItem[];
}

export default function AboutLeadershipSection({
  badgeTag,
  headline,
  description,
  members,
}: AboutLeadershipSectionProps) {
  const displayMembers =
    Array.isArray(members) && members.length > 0 ? members : DEFAULT_LEADERS;

  return (
    <section className="w-full py-10 sm:py-12 border-b border-[#E2E8F0] bg-[#F7F6F5]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="max-w-[640px] mx-auto mb-10 sm:mb-12 text-center">
          <div className="text-[11px] text-[#FF5A1F] font-semibold uppercase tracking-wider mb-3">
            {badgeTag || "THE PEOPLE BEHIND THE CODE"}
          </div>
          <h2 className="font-outfit text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-[1.15] mb-4">
            {headline || "Executive leadership and technical custodians"}
          </h2>
          <p className="text-[#5B6472] text-[15.5px] leading-[1.7] font-normal">
            {description ||
              "Meet the founders and principal architects who guide our engineering vision and mentor our senior pods across three global centers."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {displayMembers.map((member, idx) => {
            const initials = getInitials(member.name);
            const connectText = member.ctaText || `Connect with ${member.name?.split(" ")[0] || "Team"} →`;
            const connectUrl = member.ctaUrl || "/contact";

            return (
              <div
                key={member.id || `leader-${idx}`}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6 items-center shadow-xs hover:shadow-md hover:border-[#3D6BFF]/40 transition-all"
              >
                {/* Portrait container: image if available, else stylish initial box */}
                <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1120] rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-sm">
                  {member.portraitUrl ? (
                    <img
                      src={member.portraitUrl}
                      alt={member.name || "Leader Portrait"}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <span className="font-outfit font-bold text-[32px] text-[#C7D2FF] tracking-tight">
                      {initials}
                    </span>
                  )}
                  {member.badgeTag && (
                    <div className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-semibold tracking-wider uppercase text-white text-center truncate">
                      {member.badgeTag}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-outfit text-lg font-bold text-[#0F172A] mb-1 tracking-tight">
                      {member.name || "Leadership Team Member"}
                    </h3>
                    <div className="text-[#3D6BFF] text-[13px] font-semibold mb-3">
                      {member.role || "Executive Leadership"}
                    </div>
                    {member.bio && (
                      <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5 font-normal">
                        {member.bio}
                      </p>
                    )}
                    {member.quote && (
                      <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                        &ldquo;{member.quote}&rdquo;
                      </div>
                    )}
                  </div>
                  <Link
                    href={connectUrl}
                    className="text-[12.5px] font-semibold text-[#3D6BFF] hover:underline"
                  >
                    {connectText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
