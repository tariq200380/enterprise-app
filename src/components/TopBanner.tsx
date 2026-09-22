"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export interface AnnouncementItem {
  id: string;
  badge?: string;
  text: string;
  linkText?: string;
  linkUrl?: string;
}

export interface AnnouncementSettings {
  showAnnouncement?: boolean;
  announcementBadge?: string;
  announcementText?: string;
  announcementLinkText?: string;
  announcementLinkUrl?: string;
  announcements?: AnnouncementItem[];
}

export default function TopBanner({
  initialSettings,
}: {
  initialSettings?: AnnouncementSettings;
}) {
  const parseItems = (s?: AnnouncementSettings): AnnouncementItem[] => {
    if (s?.announcements && Array.isArray(s.announcements) && s.announcements.length > 0) {
      const valid = s.announcements.filter((a) => a.text && a.text.trim() !== "");
      if (valid.length > 0) return valid;
    }
    if (s?.announcementText) {
      return [
        {
          id: "1",
          badge: s.announcementBadge || "LIVE",
          text: s.announcementText,
          linkText: s.announcementLinkText || "Explore Services",
          linkUrl: s.announcementLinkUrl || "#services",
        },
      ];
    }
    return [
      {
        id: "1",
        badge: "LIVE",
        text: "Designing practical and intuitive user experiences for web and mobile.",
        linkText: "Explore Services",
        linkUrl: "#services",
      },
    ];
  };

  const [show, setShow] = useState<boolean>(
    initialSettings?.showAnnouncement !== undefined ? initialSettings.showAnnouncement : true
  );
  const [items, setItems] = useState<AnnouncementItem[]>(() => parseItems(initialSettings));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  // Sync state if initialSettings changes (e.g. during client navigation or RSC revalidation)
  useEffect(() => {
    if (initialSettings) {
      if (initialSettings.showAnnouncement !== undefined) {
        setShow(Boolean(initialSettings.showAnnouncement));
      }
      setItems(parseItems(initialSettings));
    }
  }, [initialSettings]);

  // Carousel rotation timer if more than 1 item
  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setFadeState("in");
      }, 400); // 400ms transition time
    }, 5000); // 5 seconds display per news

    return () => clearInterval(interval);
  }, [items.length]);

  if (show === false || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex] || items[0];
  const badgeLabel = currentItem.badge || "LIVE";

  let linkUrl = currentItem.linkUrl || "#services";
  if (linkUrl && !linkUrl.startsWith("http") && !linkUrl.startsWith("/") && !linkUrl.startsWith("#")) {
    linkUrl = `/${linkUrl}`;
  }

  return (
    <div className="w-full bg-[#090E1A] text-white text-xs sm:text-sm py-2 px-4 overflow-hidden border-b border-gray-800">
      <div className="max-w-[800px] w-full mx-auto flex items-center gap-3 sm:translate-x-10 md:translate-x-12">
        {/* Fixed Stationary Orange Badge - Locked width & position, NEVER shifts */}
        {badgeLabel && (
          <div className="w-[84px] h-[22px] bg-[#EA580C] text-white font-semibold text-xs rounded-full flex items-center justify-center uppercase tracking-wider shrink-0 shadow-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0 mr-1.5"></span>
            <span className="truncate text-center leading-none">{badgeLabel}</span>
          </div>
        )}

        {/* News Content Track - Fixed width track so total bar size is constant, only text changes */}
        <div className="overflow-hidden relative flex-1 min-w-0 flex items-center">
          <div
            className={`w-full flex items-center gap-2 whitespace-nowrap cursor-default transition-all duration-400 ease-in-out ${
              fadeState === "in" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            <span className="text-gray-300 font-normal truncate">
              {currentItem.text}
            </span>
            {currentItem.linkText && (
              <Link
                href={linkUrl}
                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 transition-colors shrink-0"
              >
                {currentItem.linkText} <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
