import type { Metadata } from "next";
import Link from "next/link";

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

      {/* Policy Content Card */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-xl p-6 sm:p-10 md:p-12 shadow-sm space-y-10">
          {/* 1. Overview & Privacy Commitment */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">1.</span>
              Overview &amp; Privacy Commitment
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              Creed Tech (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates{" "}
              <Link
                href="/"
                className="text-[#0052FF] font-semibold underline hover:text-[#0043D1] transition-colors"
              >
                creed-tech.com
              </Link>{" "}
              as an enterprise technology and custom software engineering firm. We hold a fundamental commitment to data privacy, confidentiality, and technical integrity.
            </p>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              This Privacy Policy explains what information we collect when you browse our Website, submit technical project inquiries, apply for careers, or subscribe to tech intelligence feeds, and how that information is safeguarded.
            </p>
          </div>

          {/* 2. Information You Voluntarily Provide */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">2.</span>
              Information You Voluntarily Provide
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              We collect personal and professional information only when you voluntarily submit it to us through our interactive communication forms:
            </p>
            <ul className="space-y-3 list-disc list-outside pl-5 text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed">
              <li>
                <strong className="text-slate-900 font-semibold">Contact &amp; Discovery Inquiries:</strong>{" "}
                When requesting architectural consultations, we collect your full name, business email, telephone number, organization name, requested service domain, and project scope details.
              </li>
              <li>
                <strong className="text-slate-900 font-semibold">Vision Estimation &amp; Dedicated Pod Requests:</strong>{" "}
                When submitting project scoping forms, we collect your contact information, desired engineering roles, engagement model (Dedicated Team, Fixed Price, etc.), and optional project requirement attachments.
              </li>
              <li>
                <strong className="text-slate-900 font-semibold">Career &amp; Talent Applications:</strong>{" "}
                When applying for open engineering positions, we collect your name, email, phone number, portfolio/GitHub links, cover note, and uploaded resume document.
              </li>
              <li>
                <strong className="text-slate-900 font-semibold">Newsletter Subscriptions:</strong>{" "}
                When signing up for technical intelligence briefings, we collect your email address.
              </li>
              <li>
                <strong className="text-slate-900 font-semibold">Article &amp; Platform Reviews:</strong>{" "}
                When submitting reader feedback on Knowledge Center articles, we collect your display name, role/organization, numerical rating, and review comments.
              </li>
            </ul>
          </div>

          {/* 3. Technical & Operational Security Information */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">3.</span>
              Technical &amp; Operational Security Information
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              To ensure reliable server operation, defend against automated abuse, and maintain platform security:
            </p>
            <ul className="space-y-3 list-disc list-outside pl-5 text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed">
              <li>
                <strong className="text-slate-900 font-semibold">Rate Limiting &amp; Abuse Prevention:</strong>{" "}
                Our backend implements lightweight, hashed IP-based rate limiting to prevent automated denial-of-service and form spamming. These temporary security hashes are automatically expired.
              </li>
              <li>
                <strong className="text-slate-900 font-semibold">Session Security:</strong>{" "}
                Administrative portal sessions utilize secure, encrypted session cookies{" "}
                <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">
                  CREED_ADMIN_SESSID
                </code>{" "}
                flagged with HttpOnly, SameSite=Lax, and Secure flags.
              </li>
              <li>
                <strong className="text-slate-900 font-semibold">Zero Tracking Scripts:</strong>{" "}
                The Website does not load third-party ad trackers, cross-site behavioral tracking cookies, or commercial marketing spyware. All core CSS, JS, and font dependencies are self-hosted.
              </li>
            </ul>
          </div>

          {/* 4. How We Use Your Information */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">4.</span>
              How We Use Your Information
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              Information collected through the Website is utilized strictly for legitimate business and operational purposes:
            </p>
            <ul className="space-y-3 list-disc list-outside pl-5 text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed">
              <li>
                Responding directly to your architectural consultations, technical scoping inquiries, and partnership requests.
              </li>
              <li>
                Preparing mutual Non-Disclosure Agreements (NDAs) and formal Statements of Work (SOWs).
              </li>
              <li>
                Evaluating candidate qualifications and scheduling recruitment interviews for career applicants.
              </li>
              <li>
                Delivering requested tech wire updates and engineering research publications.
              </li>
              <li>
                Maintaining server stability, detecting security anomalies, and protecting intellectual property.
              </li>
            </ul>
          </div>

          {/* 5. Data Storage, Retention & Protection */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">5.</span>
              Data Storage, Retention &amp; Protection
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              We implement multi-layered technical controls to protect your data against unauthorized access, disclosure, alteration, or destruction. Form submissions are stored within protected, access-controlled backend database records and private storage structures that are strictly inaccessible to public HTTP traffic.
            </p>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              We retain inquiry and recruitment data only as long as necessary to fulfill the operational business purposes for which it was submitted, or as required by applicable legal and regulatory obligations.
            </p>
          </div>

          {/* 6. Statutory Data Rights & GDPR Compliance */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE]/80 rounded-lg p-6 sm:p-7 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">6.</span>
              Statutory Data Rights &amp; GDPR Compliance
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
              Depending on your jurisdiction (including the European Economic Area under EU GDPR Regulation 2016/679), you may hold statutory rights regarding your personal data, including the right to access, rectify, port, or request erasure of your data, or to restrict or object to certain processing.
            </p>
            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
              For an in-depth breakdown of our European data residency architecture, Data Protection Officer (DPO) contact, and Article 28 Data Processing Agreements, please review our dedicated{" "}
              <Link
                href="/security"
                className="text-[#0052FF] font-semibold underline hover:text-[#0043D1] transition-colors"
              >
                European Privacy &amp; GDPR Compliance Center
              </Link>
              .
            </p>
          </div>

          {/* 7. Third-Party Disclosure & External Links */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">7.</span>
              Third-Party Disclosure &amp; External Links
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              Creed Tech does not sell, rent, or trade your personal or business inquiry information to third-party advertisers or commercial data brokers. We may share information only with authorized infrastructure providers (such as secure hosting facilities) acting on our direct instructions under strict confidentiality commitments, or when required by valid legal process.
            </p>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              Our Website may include links to external websites and syndicated news sources. We encourage you to review the privacy policies of any third-party websites you visit.
            </p>
          </div>

          {/* 8. Protection of Minors */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">8.</span>
              Protection of Minors
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              The Website and its engineering services are intended strictly for enterprise professionals, businesses, and adult job applicants. We do not knowingly collect personal data from individuals under 16 years of age.
            </p>
          </div>

          {/* 9. Updates to This Policy */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">9.</span>
              Updates to This Policy
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              We may update this Privacy Policy periodically to reflect enhancements in our data practices, platform features, or legal requirements. Updates will be published on this page with a revised &ldquo;Last Updated&rdquo; timestamp.
            </p>
          </div>

          {/* 10. Data Privacy Contacts */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight">
              <span className="text-[#0052FF] mr-2">10.</span>
              Data Privacy Contacts
            </h2>
            <p className="text-slate-600 text-xs sm:text-[13px] sm:text-sm leading-relaxed font-normal">
              To exercise your statutory data rights, request information regarding your records, or submit data privacy inquiries:
            </p>
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-lg p-6 space-y-1 text-slate-600 text-xs sm:text-[13px]">
              <p className="text-slate-900 font-bold text-xs sm:text-[13px] mb-2">
                Creed Tech Data Governance &amp; Privacy Office
              </p>
              <p>
                Privacy Inquiries:{" "}
                <a
                  href="mailto:privacy@creed-tech.com"
                  className="text-[#0052FF] font-semibold underline hover:text-[#0043D1] transition-colors"
                >
                  privacy@creed-tech.com
                </a>
              </p>
              <p>
                General Contact:{" "}
                <a
                  href="mailto:contact@creed-tech.com"
                  className="text-[#0052FF] font-semibold underline hover:text-[#0043D1] transition-colors"
                >
                  contact@creed-tech.com
                </a>
              </p>
              <p>
                Security Center:{" "}
                <Link
                  href="/security"
                  className="text-[#0052FF] font-semibold underline hover:text-[#0043D1] transition-colors"
                >
                  creed-tech.com/security
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
