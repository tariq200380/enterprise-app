import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Please read these Terms and Conditions carefully before using Creed Tech's website and online communication channels.",
};

export default function TermsPage() {
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
            LEGAL FRAMEWORK
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed mb-4 font-normal">
            Please read these Terms and Conditions carefully before using Creed Tech&apos;s website and online communication channels.
          </p>

          {/* Last Updated */}
          <p className="text-slate-500 text-xs sm:text-[13px] font-medium">
            Last Updated: August 21, 2026
          </p>
        </div>
      </section>

      {/* Terms Content Card */}
      <section className="w-full pt-8 pb-4 sm:pt-10 sm:pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-xl p-6 sm:p-10 md:p-12 shadow-sm space-y-10">
          {/* 1. Acceptance of Terms */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">1.</span>
              Acceptance of Terms
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              By accessing or using the website located at{" "}
              <Link
                href="/"
                className="text-[#0052FF] font-semibold underline hover:text-[#0043D1] transition-colors"
              >
                creed-tech.com
              </Link>{" "}
              (the &ldquo;Website&rdquo;), you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please discontinue use of the Website immediately.
            </p>
          </div>

          {/* 2. Relationship to Formal Client Agreements */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE]/80 rounded-lg p-6 sm:p-7 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">2.</span>
              Relationship to Formal Client Agreements
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
              These Website Terms govern general public access, content review, and preliminary electronic inquiry submissions. They do not replace, alter, or supersede separate, individually executed Master Services Agreements (MSAs), Statements of Work (SOWs), Non-Disclosure Agreements (NDAs), Service Level Agreements (SLAs), or Data Processing Agreements (DPAs) signed between Creed Tech and its commercial clients. In the event of any direct conflict between these Website Terms and a signed client contract, the specific terms of the signed client contract shall govern.
            </p>
          </div>

          {/* 3. Use of Website & Informational Scope */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">3.</span>
              Use of Website &amp; Informational Scope
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              The Website is provided solely for informational, technical research, and commercial discovery purposes. Creed Tech provides information regarding its software engineering capabilities, cloud infrastructure, AI orchestration, cybersecurity, and tech industry research.
            </p>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              Nothing on the Website constitutes a binding commercial quote, financial warranty, or unconditional commitment to accept a particular project until formalized through direct consultation and executed agreement.
            </p>
          </div>

          {/* 4. Information Submitted Through Forms */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">4.</span>
              Information Submitted Through Forms
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              When you submit information via our Contact, Get Started, Vision Scope Estimation, Careers/Talent, or Newsletter forms:
            </p>
            <ul className="space-y-3 list-disc list-outside pl-5 text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed">
              <li>
                You agree to provide accurate, current, and genuine contact and project information.
              </li>
              <li>
                You represent that you hold the legal authority to share any business requirements, documents, or files uploaded through the forms.
              </li>
              <li>
                Project inquiries submitted with an NDA request are handled in accordance with our strict data protection protocols and bilateral confidentiality standards.
              </li>
              <li>
                For detailed information regarding how form submissions are processed and protected, please review our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#0052FF] font-semibold underline hover:text-[#0043D1] transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </li>
            </ul>
          </div>

          {/* 5. Intellectual Property & Content Rights */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">5.</span>
              Intellectual Property &amp; Content Rights
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              All original text, architectural diagrams, layout designs, software code, logos, trademarks, and multimedia assets published on the Website are the exclusive intellectual property of Creed Tech or its respective licensors and are protected by applicable copyright, trademark, and intellectual property laws.
            </p>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from the Website without prior written consent from Creed Tech.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
