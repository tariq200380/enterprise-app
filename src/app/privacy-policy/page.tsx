import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Transparent principles governing how Creed Tech respects, processes, and secures information submitted through our website and engineering communication channels.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="w-full bg-[#0B1220] pt-16 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0, 82, 255, 0.35), transparent 75%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-md bg-[#0052FF]/15 border border-[#0052FF]/35 text-[#3B82F6] text-xs font-bold tracking-wider uppercase mb-5">
            DATA GOVERNANCE &amp; TRUST
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed mb-4 font-normal">
            Transparent principles governing how Creed Tech respects, processes, and secures information submitted through our website and engineering communication channels.
          </p>

          {/* Last Updated */}
          <p className="text-slate-500 text-xs sm:text-[13px] font-medium">
            Last Updated: August 21, 2026
          </p>
        </div>
      </section>
    </div>
  );
}
