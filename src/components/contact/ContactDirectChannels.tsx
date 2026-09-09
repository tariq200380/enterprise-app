import React from "react";
import { ContactSettingsData } from "../admin/settings/types";

interface Props {
  data: ContactSettingsData;
}

export default function ContactDirectChannels({ data }: Props) {
  const officialEmail = data.officialInquiriesEmail || "contact@creed-tech.com";
  const phone = data.telemetryPhone || "+1 (415) 890-4820";
  const whatsAppDisplay = data.whatsAppDisplay || "+1 (415) 890-4820";
  const whatsAppLink = data.whatsAppLinkUrl || "https://wa.me/14158904820";

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col gap-5">
      <h4 className="text-[11.5px] font-bold text-[#030712] uppercase tracking-wider pb-3 border-b border-[#F3F4F6]">
        Direct Communications
      </h4>

      <div className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center text-base shrink-0 font-bold rounded-md">
            ✉
          </div>
          <div className="min-w-0">
            <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
              Official Inquiries
            </span>
            <a
              href={`mailto:${officialEmail}`}
              className="text-sm font-semibold text-gray-900 hover:text-[#0052FF] transition-colors break-all"
            >
              {officialEmail}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center text-base shrink-0 font-bold rounded-md">
            📞
          </div>
          <div className="min-w-0">
            <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
              Direct Phone Line
            </span>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="text-sm font-semibold text-gray-900 hover:text-[#0052FF] transition-colors"
            >
              {phone}
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#ECFDF5] text-[#059669] flex items-center justify-center text-base shrink-0 font-bold rounded-md">
            💬
          </div>
          <div className="min-w-0">
            <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
              WhatsApp Architect Hotline
            </span>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-900 hover:text-[#059669] transition-colors"
            >
              {whatsAppDisplay} (Direct Chat)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
