import React from "react";
import { ContactSettingsData } from "../admin/settings/types";

interface Props {
  data: ContactSettingsData;
}

export default function ContactRfpSection({ data }: Props) {
  const title = data.rfpBannerTitle || "Prefer direct enterprise correspondence?";
  const description =
    data.rfpBannerDescription ||
    "Send your RFP, architecture specs, or tender documents directly to our senior leadership inbox at projects@creed-tech.com.";
  const buttonText = data.rfpButtonText || "Email RFP / Architecture Docs";
  const targetEmail = data.rfpTargetEmail || "projects@creed-tech.com";

  return (
    <section className="w-full py-14 sm:py-18 bg-[#0052FF] text-white text-center">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed max-w-xl">
          {description}
        </p>
        <div className="pt-2">
          <a
            href={`mailto:${targetEmail}`}
            className="inline-block px-7 py-3 bg-white hover:bg-gray-100 text-[#0052FF] font-bold text-xs uppercase tracking-wider rounded shadow-md transition-colors"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
