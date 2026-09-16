import React from "react";
import { ContactSettingsData } from "@/components/admin/settings/types";

interface ContactDirectChannelsProps {
  settings?: Partial<ContactSettingsData>;
  onOpenScheduleModal: () => void;
}

export default function ContactDirectChannels({
  settings,
  onOpenScheduleModal,
}: ContactDirectChannelsProps) {
  const officialEmail = settings?.officialInquiriesEmail || "info@creed-tech.com";
  const phone = settings?.telemetryPhone || "+92 321 9204488";
  const discoveryTitle = settings?.discoveryTitle || "Need a Direct Architectural Call?";
  const discoveryDesc =
    settings?.discoveryDescription ||
    "Skip the formal specification and book a 30-minute technical discovery session directly with one of our Principal Systems Architects.";

  return (
    <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 text-left">
      {/* Card 1: Direct Discovery Call (Dark Card with Orange Radial Glow) */}
      <div
        id="direct-call"
        className="relative bg-[#0B1120] rounded-2xl border border-white/10 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-lg text-white min-h-[320px]"
      >
        {/* Ambient Orange Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_40%,rgba(249,115,22,0.25)_0%,rgba(249,115,22,0.06)_45%,rgba(11,17,32,0)_70%)]"
        />
        {/* Subtle Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.035]"
        />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full text-white/90 text-xs font-mono font-medium mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            INSTANT ARCHITECTURAL DISCOVERY
          </span>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-2">
            {discoveryTitle}
          </h3>

          <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
            {discoveryDesc}
          </p>

          <div className="space-y-2 mb-6 font-mono text-xs text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Direct code &amp; system architecture review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Zero sales reps — 100% senior engineers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Mutual bilateral NDA protection</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between flex-wrap gap-3">
          <div className="text-[11px] font-mono text-white/60">
            Availability: <span className="text-orange-400 font-bold">Available Daily / Flexible</span>
          </div>
          <button
            type="button"
            onClick={onOpenScheduleModal}
            className="inline-flex items-center justify-center gap-1.5 bg-[#EA580C] hover:bg-orange-600 text-white font-bold py-2.5 px-4 min-w-[185px] rounded-lg text-xs tracking-wider uppercase font-mono transition-colors shadow-xs cursor-pointer"
          >
            <span>Book 30-Min Call</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* Card 2: Direct Communication Channels */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#EA580C] font-mono block mb-3">
          DIRECT VERIFICATION CHANNELS
        </span>

        <div className="space-y-4">
          <div className="flex items-start gap-3.5 pb-3.5 border-b border-[#E2E8F0]">
            <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/70 flex items-center justify-center text-base shrink-0 text-[#EA580C]">
              ✉
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A]">
                Official Technical Inquiries
              </div>
              <a
                href={`mailto:${officialEmail}`}
                className="text-xs text-[#0052FF] hover:underline font-mono font-medium"
              >
                {officialEmail}
              </a>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Monitored continuously by on-duty principal architects.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 pb-3.5 border-b border-[#E2E8F0]">
            <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/70 flex items-center justify-center text-base shrink-0 text-[#EA580C]">
              ☎
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A]">
                Direct Engineering Phone
              </div>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="text-xs text-[#0F172A] hover:text-[#EA580C] font-mono font-medium"
              >
                {phone}
              </a>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Mon–Fri, 9:00 AM – 7:00 PM (Direct engineering routing).
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/70 flex items-center justify-center text-base shrink-0 text-[#EA580C]">
              📍
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A]">
                Executive Operations Office
              </div>
              <div className="text-xs text-slate-600 font-medium">
                Office # 02, Main Shopping Center, Sheikhupura.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Engineering Capacity Status */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A] animate-pulse" />
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono">
              Q3 Pod Allocation
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-white bg-[#0F172A] px-2 py-0.5 rounded">
            ACTIVE SPRINT SLOTS
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Principal architect pods across North America, Eastern Europe, and South Asia are
          accepting new system engineering initiatives for immediate architectural discovery.
        </p>
      </div>
    </div>
  );
}
