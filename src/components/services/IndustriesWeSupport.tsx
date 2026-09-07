import React from "react";

interface IndustryItem {
  name: string;
  icon: React.ReactNode;
}

const industries: IndustryItem[] = [
  {
    name: "Manufacturing",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 20h18" />
        <path d="M5 20V8l4 3V8l4 3V4l6 4v12" />
      </svg>
    ),
  },
  {
    name: "Healthcare",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    name: "Retail & E-Commerce",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
  },
  {
    name: "Education",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    name: "Telecommunications",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
        <circle cx="12" cy="12" r="2" />
        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
      </svg>
    ),
  },
  {
    name: "Property & Housing",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Insurance & Financial Services",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: "Professional Services",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

export default function IndustriesWeSupport() {
  return (
    <section
      id="industries"
      className="relative w-full py-12 lg:py-16 bg-[#0B132B] text-white overflow-hidden border-t border-b border-[#1E293B]"
    >
      {/* Background grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[size:40px_40px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 1px, transparent 1px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-[52rem] mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold text-white tracking-[-0.02em] mb-3 leading-tight">
            Industries We <span className="text-[#FF6B00]">Support</span>
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#94A3B8] leading-relaxed font-normal m-0">
            Our technology services can be adapted to the workflows users data and operational requirements of different industries.
          </p>
        </div>

        {/* 8 Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((item) => (
            <div
              key={item.name}
              className="bg-[#111C38] border border-[#1E2E56] rounded-[14px] p-5 sm:py-6 sm:px-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-[3px] hover:border-[#2D437A] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
            >
              <div className="p-2 bg-[rgba(255,107,0,0.12)] border border-[rgba(255,107,0,0.25)] rounded-lg shrink-0 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-[17px] font-semibold text-[#F1F5F9] leading-[1.35]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
