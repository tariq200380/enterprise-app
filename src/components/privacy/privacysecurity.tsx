export default function PrivacySecurity() {
  return (
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
  );
}
