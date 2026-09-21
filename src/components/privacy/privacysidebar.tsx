"use client";

import { useEffect, useState } from "react";

const TOC_ITEMS = [
  { id: "overview", num: "1", label: "Overview & Privacy Commitment" },
  { id: "voluntary-info", num: "2", label: "Information You Voluntarily Provide" },
  { id: "security-info", num: "3", label: "Technical & Operational Security" },
  { id: "how-we-use", num: "4", label: "How We Use Your Information" },
  { id: "storage-retention", num: "5", label: "Data Storage, Retention & Protection" },
  { id: "statutory-gdpr", num: "6", label: "Statutory Rights & GDPR" },
  { id: "third-party", num: "7", label: "Third-Party Disclosure & Links" },
  { id: "minors", num: "8", label: "Protection of Minors" },
  { id: "updates", num: "9", label: "Updates to This Policy" },
  { id: "contacts", num: "10", label: "Data Privacy Contacts" },
];

export default function PrivacySidebar() {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    // Initial hash detection (e.g. #security-info)
    const hash = window.location.hash.replace("#", "");
    if (hash && TOC_ITEMS.some((i) => i.id === hash)) {
      setActiveId(hash);
    }

    let ticking = false;
    const handleScroll = () => {
      // Bottom of page: activate last item
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        const lastId = TOC_ITEMS[TOC_ITEMS.length - 1].id;
        setActiveId((prev) => (prev !== lastId ? lastId : prev));
        return;
      }

      // Reverse search: early exit on first matching active section from bottom
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top <= 160) {
          const id = TOC_ITEMS[i].id;
          setActiveId((prev) => (prev !== id ? id : prev));
          return;
        }
      }
    };

    // Frame-synced 60fps scroll throttling
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5 pl-5">
        On this page
      </p>
      <nav className="flex flex-col space-y-3 text-xs border-l border-[#EFECE6] pl-5">
        {TOC_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`flex items-baseline gap-2.5 transition-colors relative ${
                isActive
                  ? "text-[#FF6B00] font-semibold -ml-[21px] pl-5 border-l-2 border-[#FF6B00]"
                  : "text-slate-500 hover:text-[#FF6B00] font-normal"
              }`}
            >
              <span className="text-[11px] font-outfit font-bold w-4 shrink-0 text-[#FF6B00]">
                {item.num}
              </span>
              <span className="leading-snug">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
