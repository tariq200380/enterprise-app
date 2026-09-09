import React from "react";
import { ContactSettingsData } from "../admin/settings/types";

interface Props {
  data: ContactSettingsData;
}

export default function ContactGlobalHubsSection({ data }: Props) {
  const hubs =
    data.globalHubs && data.globalHubs.length > 0
      ? data.globalHubs
      : [
          {
            id: "1",
            countryCity: "🇩🇪 Frankfurt, Germany",
            timezone: "CET (UTC+1)",
            address: "Taunusanlage 8, Financial Centre, Frankfurt",
          },
          {
            id: "2",
            countryCity: "🇪🇸 Madrid, Spain",
            timezone: "CET (UTC+1)",
            address: "Paseo de la Castellana 95, Madrid",
          },
          {
            id: "3",
            countryCity: "🇺🇸 San Francisco, USA",
            timezone: "PST (UTC-8)",
            address: "500 Howard Street, SoMa Tech District, SF",
          },
        ];

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col gap-3.5">
      <h4 className="text-[11.5px] font-bold text-[#030712] uppercase tracking-wider pb-3 border-b border-[#F3F4F6]">
        {data.hubsTitle || "Three Global Engineering Hubs"}
      </h4>

      <div className="flex flex-col gap-2.5 text-xs">
        {hubs.map((hub, idx) => (
          <div
            key={hub.id || idx}
            className="p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-md"
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-bold text-[#030712]">{hub.countryCity}</span>
              <span className="text-[10.5px] text-gray-400 font-mono">{hub.timezone}</span>
            </div>
            <p className="text-[11.5px] text-gray-500 m-0">{hub.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
