"use client";

import React from "react";
import { ContactSettingsData } from "../types";

interface Props {
  data: ContactSettingsData;
  onChange: (field: keyof ContactSettingsData, value: string) => void;
}

export default function ContactDiscoveryChannelsCard({ data, onChange }: Props) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center gap-2">
        <span className="text-sm">💬</span>
        <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
          Direct Communications &amp; Instant Discovery Call
        </h3>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* Discovery Badge & Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Discovery Box Badge
            </label>
            <input
              type="text"
              value={data.discoveryBadge}
              onChange={(e) => onChange("discoveryBadge", e.target.value)}
              placeholder="⚡ INSTANT DISCOVERY"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Discovery Box Title
            </label>
            <input
              type="text"
              value={data.discoveryTitle}
              onChange={(e) => onChange("discoveryTitle", e.target.value)}
              placeholder="Need a Direct Architectural Call?"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
            />
          </div>
        </div>

        {/* Discovery Description */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Discovery Box Description
          </label>
          <textarea
            rows={2}
            value={data.discoveryDescription}
            onChange={(e) => onChange("discoveryDescription", e.target.value)}
            placeholder="Skip the form and schedule a 30-minute discovery call directly with one of our Principal Systems Architects."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
          />
        </div>

        {/* Discovery Booking Email & Official Inquiries Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Discovery Booking Email
            </label>
            <input
              type="text"
              value={data.discoveryBookingEmail}
              onChange={(e) => onChange("discoveryBookingEmail", e.target.value)}
              placeholder="contact@creed-tech.com"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Official Inquiries Email
            </label>
            <input
              type="text"
              value={data.officialInquiriesEmail}
              onChange={(e) => onChange("officialInquiriesEmail", e.target.value)}
              placeholder="contact@creed-tech.com"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>

        {/* Global Telemetry Phone & WhatsApp Number Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Global Telemetry Line Phone
            </label>
            <input
              type="text"
              value={data.telemetryPhone}
              onChange={(e) => onChange("telemetryPhone", e.target.value)}
              placeholder="+1 (415) 890-4820"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              WhatsApp Number Display
            </label>
            <input
              type="text"
              value={data.whatsAppDisplay}
              onChange={(e) => onChange("whatsAppDisplay", e.target.value)}
              placeholder="+1 (415) 890-4820"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
        </div>

        {/* WhatsApp Direct Chat Link URL */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            WhatsApp Direct Chat Link URL
          </label>
          <input
            type="text"
            value={data.whatsAppLinkUrl}
            onChange={(e) => onChange("whatsAppLinkUrl", e.target.value)}
            placeholder="https://wa.me/14158904820"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
          />
        </div>
      </div>
    </div>
  );
}
