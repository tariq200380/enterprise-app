import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Please read these Terms and Conditions carefully before using Creed Tech's website and online communication channels.",
};

export default function TermsPage() {
  return (
    <div className="w-full bg-[#F7F6F5] min-h-screen text-[#0F172A] font-sans antialiased selection:bg-[#FF6B00] selection:text-white">
      {/* ====================================================================== */}
      {/* 1. HERO HEADER (Subtle Security-style Grid Pattern & Refined Pills)   */}
      {/* ====================================================================== */}
      <section className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-[#E6E4DF] overflow-hidden bg-[#F7F6F5]">
        {/* Subtle Engineering Grid Backdrop */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e5e2db80_1px,transparent_1px),linear-gradient(to_bottom,#e5e2db80_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_65%,transparent_100%)]" />

        <div className="relative max-w-3xl mx-auto flex flex-col items-center z-10">
          {/* Category Tag Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[11px] font-bold text-[#FF6B00] tracking-wider uppercase mb-4">
            <span>&bull;</span>
            <span>Legal Framework &amp; Master Terms</span>
          </div>

          {/* Page Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed max-w-2xl font-normal mb-6">
            Binding terms governing access to Creed Tech&apos;s digital infrastructure, public technical research, commercial discovery channels, and preliminary scoping requests.
          </p>

          {/* Dual Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-500">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E6E4DF] shadow-2xs">
              <span className="text-slate-400">Effective:</span>
              <span className="font-semibold text-[#FF6B00]">August 21, 2026</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E6E4DF] shadow-2xs">
              <span className="text-slate-400">Standard:</span>
              <span className="font-semibold text-slate-700">Cross-Border MSA Precedence</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. TWO-COLUMN LAYOUT: STICKY TOC + CARD-BASED EDITORIAL CONTENT        */}
      {/* ====================================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">
          {/* ------------------------------------------------------------------ */}
          {/* LEFT SIDEBAR: STICKY TOC WITH COMPACT BADGES                      */}
          {/* ------------------------------------------------------------------ */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28 self-start space-y-5">
            <div className="bg-white border border-[#E6E4DF] rounded-2xl p-5 shadow-2xs">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 pb-2 border-b border-[#F0EEEA]">
                Navigation Index
              </p>
              <nav className="flex flex-col space-y-1.5 text-xs">
                <a
                  href="#acceptance-of-terms"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span className="truncate">Acceptance of Terms</span>
                </a>

                <a
                  href="#client-agreements"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span className="truncate">Client Agreements &amp; MSAs</span>
                </a>

                <a
                  href="#informational-scope"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span className="truncate">Informational Scope</span>
                </a>

                <a
                  href="#form-submissions"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    4
                  </span>
                  <span className="truncate">Information via Forms</span>
                </a>

                <a
                  href="#intellectual-property"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    5
                  </span>
                  <span className="truncate">Intellectual Property</span>
                </a>

                <a
                  href="#third-party-links"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    6
                  </span>
                  <span className="truncate">Third-Party Attribution</span>
                </a>

                <a
                  href="#prohibited-conduct"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    7
                  </span>
                  <span className="truncate">Acceptable Use &amp; Abuse</span>
                </a>

                <a
                  href="#disclaimer-warranties"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    8
                  </span>
                  <span className="truncate">Disclaimer of Warranties</span>
                </a>

                <a
                  href="#limitation-liability"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    9
                  </span>
                  <span className="truncate">Limitation of Liability</span>
                </a>

                <a
                  href="#modifications"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    10
                  </span>
                  <span className="truncate">Modifications to Terms</span>
                </a>

                <a
                  href="#legal-inquiries"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-mono font-bold text-[#FF6B00] flex items-center justify-center shrink-0">
                    11
                  </span>
                  <span className="truncate">Legal Inquiries</span>
                </a>
              </nav>
            </div>

            {/* Quick Contact Micro-Card */}
            <div className="bg-white border border-[#E6E4DF] rounded-2xl p-4 shadow-2xs text-xs space-y-2">
              <p className="font-semibold text-[#1C1917]">Legal Consultation</p>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Direct questions regarding Bilateral NDAs or MSAs can be submitted anytime.
              </p>
              <a
                href="mailto:contact@creed-tech.com"
                className="inline-block text-[#FF6B00] font-semibold text-[11px] hover:underline"
              >
                contact@creed-tech.com &rarr;
              </a>
            </div>
          </aside>

          {/* ------------------------------------------------------------------ */}
          {/* RIGHT COLUMN: CARD-STRUCTURED EDITORIAL ARTICLES                  */}
          {/* ------------------------------------------------------------------ */}
          <main className="flex-1 max-w-3xl w-full space-y-6 sm:space-y-8">
            {/* 01. Acceptance of Terms */}
            <article
              id="acceptance-of-terms"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 01
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Mandatory Agreement
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  By accessing or using the website located at{" "}
                  <Link
                    href="/"
                    className="font-semibold text-[#FF6B00] hover:underline"
                  >
                    creed-tech.com
                  </Link>{" "}
                  (the &ldquo;Website&rdquo;), you acknowledge that you have read, understood, and agree
                  to be legally bound by these Terms and Conditions (&ldquo;Terms&rdquo;).
                </p>
                <p>
                  If you do not agree to these Terms, please discontinue use of the Website immediately.
                  Your continued browsing or interaction with the Website affirms your binding agreement to these terms.
                </p>
              </div>
            </article>

            {/* 02. Relationship to Formal Client Agreements */}
            <article
              id="client-agreements"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 02
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Contract Hierarchy
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Relationship to Formal Client Agreements
              </h2>

              {/* Callout Box with Orange Accent Border */}
              <div className="border-l-4 border-l-[#FF6B00] bg-[#FFFBF7] border border-[#FFD8B3] rounded-xl p-5 sm:p-6 space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-[#C2410C] tracking-wide uppercase">
                  Master Services Agreement (MSA) Precedence
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  These Website Terms govern general public access, content review, and preliminary electronic inquiry submissions. They do not replace, alter, or supersede separate, individually executed Master Services Agreements (MSAs), Statements of Work (SOWs), Non-Disclosure Agreements (NDAs), Service Level Agreements (SLAs), or Data Processing Agreements (DPAs) signed between Creed Tech and its commercial clients.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  In the event of any direct conflict between these Website Terms and a signed client contract, the specific terms of the signed client contract shall strictly govern.
                </p>
              </div>
            </article>

            {/* 03. Use of Website & Informational Scope */}
            <article
              id="informational-scope"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 03
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Discovery &amp; Scope
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Use of Website &amp; Informational Scope
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  The Website is provided solely for informational, technical research, and commercial discovery purposes. Creed Tech provides detailed overviews regarding its software engineering capabilities, cloud infrastructure modernization, AI orchestration, cybersecurity posture, and industry research.
                </p>
                <p>
                  Nothing published on the Website constitutes a binding commercial quote, financial warranty, or unconditional commitment to accept a particular project until formalized through bilateral scoping and executed contractual agreements.
                </p>
              </div>
            </article>

            {/* 04. Information Submitted Through Forms */}
            <article
              id="form-submissions"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 04
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Electronic Submissions
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Information Submitted Through Forms
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                When you submit information via our Contact, Get Started, Vision Scope Estimation, Careers, or Newsletter forms:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
                  <span className="text-[#FF6B00] font-bold mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Accuracy of Information</strong> &mdash; You agree to provide accurate, current, and genuine contact and project information.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
                  <span className="text-[#FF6B00] font-bold mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Legal Authority</strong> &mdash; You represent that you hold full legal authority to share any business requirements, specifications, or documents uploaded through our forms.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
                  <span className="text-[#FF6B00] font-bold mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Confidential Scoping &amp; NDAs</strong> &mdash; Inquiries submitted with an NDA request are safeguarded under strict enterprise confidentiality standards and bilateral review.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
                  <span className="text-[#FF6B00] font-bold mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Data Governance</strong> &mdash; For details on how form submissions are stored, processed, and protected, please review our{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-semibold text-[#FF6B00] underline hover:text-[#e05d00] transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </li>
              </ul>
            </article>

            {/* 05. Intellectual Property & Content Rights */}
            <article
              id="intellectual-property"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 05
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Proprietary Rights
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Intellectual Property &amp; Content Rights
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  All original text, architectural diagrams, layout designs, software code, logos, brand assets, and multimedia published on the Website are the exclusive intellectual property of Creed Tech or its respective licensors and are protected under international copyright and intellectual property legislation.
                </p>
                <p>
                  You may not reproduce, redistribute, modify, publish, or commercially exploit any content from the Website without prior explicit written permission from Creed Tech.
                </p>
              </div>
            </article>

            {/* 06. Third-Party Links & Syndicated News Attribution */}
            <article
              id="third-party-links"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 06
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  External Content
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Third-Party Links &amp; Syndicated News Attribution
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  The Website and Knowledge Center may feature links to external third-party resources, verified engineering documentation, or syndicated technology intelligence headlines (e.g., NVIDIA, OpenAI, Microsoft, Google).
                </p>
                <p>
                  Such links and syndicated references are provided solely for convenience and journalistic attribution. Creed Tech does not control, endorse, or assume liability for third-party websites, their external privacy standards, or external accuracy.
                </p>
              </div>
            </article>

            {/* 07. Acceptable Use & Prohibited Conduct */}
            <article
              id="prohibited-conduct"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 07
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Security Boundaries
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Acceptable Use &amp; Prohibited Conduct
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                When accessing or using the Website, you expressly agree not to:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
                  <span className="text-rose-500 font-bold mt-0.5">&times;</span>
                  <span>
                    Attempt to probe, scan, test vulnerability, or breach security controls on any Creed Tech server, network, or data endpoint.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
                  <span className="text-rose-500 font-bold mt-0.5">&times;</span>
                  <span>
                    Submit automated payloads, spam, injection attacks, or abusive scripts designed to disrupt infrastructure integrity.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
                  <span className="text-rose-500 font-bold mt-0.5">&times;</span>
                  <span>
                    Deploy aggressive scrapers, bots, or harvesting mechanisms that overwhelm server resources or degrade user experience.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
                  <span className="text-rose-500 font-bold mt-0.5">&times;</span>
                  <span>
                    Violate any applicable local, national, or international laws and data regulations through interaction with this service.
                  </span>
                </li>
              </ul>
            </article>

            {/* 08. Disclaimer of Warranties */}
            <article
              id="disclaimer-warranties"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 08
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  As-Is Warranty
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Disclaimer of Warranties
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  The Website and all materials, information, and content provided on it are delivered on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or uninterrupted availability.
                </p>
                <p>
                  Creed Tech does not guarantee that the Website will operate entirely free of errors or that server downtime will not occur during maintenance windows.
                </p>
              </div>
            </article>

            {/* 09. Limitation of Liability */}
            <article
              id="limitation-liability"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 09
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Liability Cap
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  To the maximum extent permitted by applicable law, in no event shall Creed Tech, its directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or business interruption, arising out of or related to your use of or inability to use the Website.
                </p>
              </div>
            </article>

            {/* 10. Modifications to Terms */}
            <article
              id="modifications"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 10
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Version Governance
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Modifications to Terms
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  Creed Tech reserves the right to revise, update, or modify these Terms at any time without prior individual notice. Any modifications will become effective immediately upon publication with an updated &ldquo;Last Updated&rdquo; date.
                </p>
                <p>
                  Your continued use of the Website following any updates signifies your full acceptance of the revised Terms.
                </p>
              </div>
            </article>

            {/* 11. Legal Inquiries & Governance */}
            <article
              id="legal-inquiries"
              className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
            >
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
                  SECTION 11
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Contact Protocol
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Legal Inquiries &amp; Governance
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                If you have questions, regulatory concerns, or contractual inquiries regarding these Terms &amp; Conditions, please reach our legal and solutions architecture team directly:
              </p>

              {/* Legal Office Contact Card */}
              <div className="border border-[#E6E4DF] rounded-xl bg-[#FAF9F6] p-5 sm:p-6">
                <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mb-4">
                  Creed Tech Legal &amp; Governance Office
                </p>
                <div className="divide-y divide-[#E6E4DF] text-xs sm:text-sm">
                  <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 first:pt-0">
                    <span className="text-slate-500 font-medium">Email Inquiries</span>
                    <a
                      href="mailto:contact@creed-tech.com"
                      className="text-slate-800 font-medium hover:text-[#FF6B00] transition-colors"
                    >
                      contact@creed-tech.com
                    </a>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-slate-500 font-medium">Web Inquiries</span>
                    <Link
                      href="/contact"
                      className="text-slate-800 font-medium hover:text-[#FF6B00] transition-colors"
                    >
                      creed-tech.com/contact
                    </Link>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 last:pb-0">
                    <span className="text-slate-500 font-medium">Security Center</span>
                    <Link
                      href="/security"
                      className="text-slate-800 font-medium hover:text-[#FF6B00] transition-colors"
                    >
                      creed-tech.com/security
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
