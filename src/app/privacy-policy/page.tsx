import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Transparent principles governing how Creed Tech respects, processes, and secures information submitted through our website and engineering communication channels.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen text-[#0F172A]">
      {/* ====================================================================== */}
      {/* 1. HERO HEADER                                                         */}
      {/* ====================================================================== */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[#E6E4DF]">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Category Tag */}
          <span className="text-xs font-semibold text-[#8C7A6B] tracking-wide mb-3">
            &mdash; Data Governance &amp; Trust
          </span>

          {/* Page Title (Editorial Serif) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Privacy Policy
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed max-w-2xl font-normal mb-6">
            Transparent principles governing how Creed Tech respects, processes,
            and secures information submitted through our website and engineering
            communication channels.
          </p>

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#E6E4DF] text-xs text-slate-500 shadow-2xs">
            <span>Last updated</span>
            <span className="font-semibold text-[#FF6B00]">August 21, 2026</span>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. TWO-COLUMN LAYOUT: STICKY TOC + MAIN CONTENT                        */}
      {/* ====================================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* ------------------------------------------------------------------ */}
          {/* LEFT SIDEBAR: STICKY "ON THIS PAGE" TABLE OF CONTENTS             */}
          {/* ------------------------------------------------------------------ */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5 pl-5">
              On this page
            </p>
            <nav
              id="toc-nav"
              suppressHydrationWarning
              className="flex flex-col space-y-3 text-xs border-l border-[#EFECE6] pl-5"
            >
              <a
                href="#overview"
                data-toc="overview"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">1</span>
                <span>Overview &amp; Privacy Commitment</span>
              </a>

              <a
                href="#voluntary-info"
                data-toc="voluntary-info"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">2</span>
                <span>Information You Voluntarily Provide</span>
              </a>

              <a
                href="#security-info"
                data-toc="security-info"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">3</span>
                <span>Technical &amp; Operational Security</span>
              </a>

              <a
                href="#how-we-use"
                data-toc="how-we-use"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">4</span>
                <span>How We Use Your Information</span>
              </a>

              <a
                href="#storage-retention"
                data-toc="storage-retention"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">5</span>
                <span>Data Storage, Retention &amp; Protection</span>
              </a>

              <a
                href="#statutory-gdpr"
                data-toc="statutory-gdpr"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">6</span>
                <span>Statutory Rights &amp; GDPR</span>
              </a>

              <a
                href="#third-party"
                data-toc="third-party"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">7</span>
                <span>Third-Party Disclosure &amp; Links</span>
              </a>

              <a
                href="#minors"
                data-toc="minors"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">8</span>
                <span>Protection of Minors</span>
              </a>

              <a
                href="#updates"
                data-toc="updates"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">9</span>
                <span>Updates to This Policy</span>
              </a>

              <a
                href="#contacts"
                data-toc="contacts"
                suppressHydrationWarning
                className="toc-link flex items-baseline gap-2.5 text-slate-500 hover:text-[#FF6B00] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#FF6B00] w-4 shrink-0">10</span>
                <span>Data Privacy Contacts</span>
              </a>
            </nav>
          </aside>

          {/* ------------------------------------------------------------------ */}
          {/* RIGHT COLUMN: MAIN EDITORIAL CONTENT                               */}
          {/* ------------------------------------------------------------------ */}
          <main className="flex-1 max-w-3xl w-full">
            {/* 01. Overview & Privacy Commitment */}
            <article id="overview" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                01
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Overview &amp; Privacy Commitment
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  Creed Tech (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates{" "}
                  <Link
                    href="/"
                    className="font-semibold text-[#FF6B00] hover:underline"
                  >
                    creed-tech.com
                  </Link>{" "}
                  as an enterprise technology and custom software engineering firm. We
                  hold a fundamental commitment to data privacy, confidentiality, and
                  technical integrity.
                </p>
                <p>
                  This Privacy Policy explains what information we collect when you browse
                  our website, submit technical project inquiries, apply for careers, or
                  subscribe to tech intelligence feeds, and how that information is safeguarded.
                </p>
              </div>
            </article>

            {/* 02. Information You Voluntarily Provide */}
            <article id="voluntary-info" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                02
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Information You Voluntarily Provide
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                We collect personal and professional information only when you voluntarily submit it through our interactive communication forms.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Contact &amp; Discovery Inquiries</strong> &mdash; when requesting architectural consultations, we collect your full name, business email, phone number, organization name, requested service details, and project scope.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Vision Estimation &amp; Dedicated Pod Requests</strong> &mdash; when submitting project scoping forms, we collect your contact information, desired engineering roles, engagement model (Dedicated Team, Fixed Price, etc.), and optional project requirement attachments.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Career &amp; Talent Applications</strong> &mdash; when applying for open engineering positions, we collect your name, email, phone number, portfolio/GitHub links, cover note, and uploaded resume documents.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Newsletter Subscriptions</strong> &mdash; when signing up for technical intelligence briefings, we collect your email address.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Article &amp; Platform Reviews</strong> &mdash; when submitting reader feedback on Knowledge Center articles, we collect your display name, organization, numerical rating, and review comments.
                  </span>
                </li>
              </ul>
            </article>

            {/* 03. Technical & Operational Security Information */}
            <article id="security-info" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                03
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Technical &amp; Operational Security Information
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                To ensure reliable server operation, defend against automated abuse, and maintain platform security, we process a narrow set of operational signals.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Rate Limiting &amp; Abuse Prevention</strong> &mdash; our backend implements lightweight, hashed IP-based rate limiting to prevent automated denial-of-service and form spamming. These temporary security markers are automatically expired.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Session Security</strong> &mdash; administrative portal sessions use secure, encrypted session cookies, tagged with HttpOnly, SameSite=Lax, and Secure flags.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#0F172A]">Zero Tracking Scripts</strong> &mdash; the website does not load third-party ad trackers, cross-site behavioral tracking cookies, or commercial marketing pixels. All core CSS, JS, and font dependencies are self-hosted.
                  </span>
                </li>
              </ul>
            </article>

            {/* 04. How We Use Your Information */}
            <article id="how-we-use" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                04
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                How We Use Your Information
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                Information collected through the website is utilized strictly for legitimate business and operational purposes:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    Responding directly to your architectural consultations, technical scoping inquiries, and partnership requests.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    Preparing mutual Non-Disclosure Agreements (NDAs) and formal Statements of Work (SOWs).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    Evaluating candidate qualifications and scheduling recruitment interviews for career applicants.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    Delivering requested tech wire updates and engineering research publications.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] mt-0.5">&bull;</span>
                  <span>
                    Maintaining server stability, detecting security anomalies, and protecting intellectual property.
                  </span>
                </li>
              </ul>
            </article>

            {/* 05. Data Storage, Retention & Protection */}
            <article id="storage-retention" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                05
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Data Storage, Retention &amp; Protection
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  We implement multi-layered technical controls to protect your data against unauthorized access, disclosure, alteration, or destruction. Form submissions are stored within protected, access-controlled backend database records and private storage structures that are strictly inaccessible to public HTTP traffic.
                </p>
                <p>
                  We retain inquiry and recruitment data only as long as necessary to fulfill the operational business purposes for which it was submitted, or as required by applicable legal and regulatory obligations.
                </p>
              </div>
            </article>

            {/* 06. Statutory Data Rights & GDPR Compliance */}
            <article id="statutory-gdpr" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                06
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Statutory Data Rights &amp; GDPR Compliance
              </h2>

              {/* Callout Box */}
              <div className="bg-[#FFF9F5] border border-[#FDBA74]/70 rounded-xl p-6 sm:p-7 space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-[#C2410C]">
                  Your rights under GDPR
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  Depending on your jurisdiction &mdash; including the European Economic Area under EU GDPR Regulation 2016/679 &mdash; you may hold statutory rights regarding your personal data, including the right to access, rectify, port, or request erasure of your data, or to restrict or object to certain processing.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  For an in-depth breakdown of our European data residency architecture, Data Protection Officer (DPO) contact, and Article 28 Data Processing Agreements, please review our dedicated{" "}
                  <Link
                    href="/security-gdpr"
                    className="font-semibold text-[#FF6B00] underline hover:text-[#e05d00] transition-colors"
                  >
                    European Privacy &amp; GDPR Compliance Center
                  </Link>
                  .
                </p>
              </div>
            </article>

            {/* 07. Third-Party Disclosure & External Links */}
            <article id="third-party" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                07
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Third-Party Disclosure &amp; External Links
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  Creed Tech does not sell, rent, or trade your personal or business inquiry information to third-party advertisers or commercial data brokers. We may share information only with authorized infrastructure providers, such as secure hosting facilities, acting as our direct contractors under strict confidentiality commitments, or when required by valid legal process.
                </p>
                <p>
                  Our website may include links to external websites and syndicated news sources. We encourage you to review the privacy policies of any third-party websites you visit.
                </p>
              </div>
            </article>

            {/* 08. Protection of Minors */}
            <article id="minors" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                08
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Protection of Minors
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                The website and its engineering services are intended strictly for enterprise professionals, businesses, and adult job applicants. We do not knowingly collect personal data from individuals under 18 years of age.
              </p>
            </article>

            {/* 09. Updates to This Policy */}
            <article id="updates" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                09
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Updates to This Policy
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We may update this Privacy Policy periodically to reflect enhancements to our data practices, platform features, or legal requirements. Updates will be published on this page with a revised &ldquo;Last Updated&rdquo; timestamp.
              </p>
            </article>

            {/* 10. Data Privacy Contacts */}
            <article id="contacts" className="scroll-mt-28">
              <span className="text-xs font-semibold text-[#B8A89A] block mb-2">
                10
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
                Data Privacy Contacts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                To exercise your statutory data rights, request information regarding your records, or submit data privacy inquiries, reach the Creed Tech Data Governance &amp; Privacy Office directly.
              </p>

              {/* Office Contact Card */}
              <div className="border border-[#E6E4DF] rounded-xl bg-white p-6 sm:p-7 shadow-2xs">
                <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mb-4">
                  Creed Tech Data Governance &amp; Privacy Office
                </p>
                <div className="divide-y divide-[#F0EFEB] text-xs sm:text-sm">
                  <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 first:pt-0">
                    <span className="text-slate-500 font-medium">Privacy Inquiries</span>
                    <a
                      href="mailto:privacy@creed-tech.com"
                      className="text-slate-800 font-medium hover:text-[#FF6B00] transition-colors"
                    >
                      privacy@creed-tech.com
                    </a>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-slate-500 font-medium">General Contact</span>
                    <a
                      href="mailto:contact@creed-tech.com"
                      className="text-slate-800 font-medium hover:text-[#FF6B00] transition-colors"
                    >
                      contact@creed-tech.com
                    </a>
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

      {/* Lightweight Browser Scrollspy for Sidebar (Runs after hydration) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function updateToc() {
                var links = document.querySelectorAll('.toc-link');
                if (!links.length) return;
                var ids = [];
                links.forEach(function(l) { ids.push(l.getAttribute('data-toc')); });
                var scrollPos = window.scrollY + 200;
                var active = ids[0];
                for (var i = 0; i < ids.length; i++) {
                  var el = document.getElementById(ids[i]);
                  if (el && el.offsetTop <= scrollPos) {
                    active = ids[i];
                  }
                }
                if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                  active = ids[ids.length - 1];
                }
                links.forEach(function(l) {
                  if (l.getAttribute('data-toc') === active) {
                    l.classList.add('text-[#FF6B00]', 'font-semibold');
                    l.classList.remove('text-slate-500');
                  } else {
                    l.classList.remove('text-[#FF6B00]', 'font-semibold');
                    l.classList.add('text-slate-500');
                  }
                });
              }
              window.addEventListener('scroll', updateToc, { passive: true });
              // Safely defer until React hydration has completed
              if (typeof window !== 'undefined') {
                setTimeout(updateToc, 150);
              }
            })();
          `,
        }}
      />
    </div>
  );
}
