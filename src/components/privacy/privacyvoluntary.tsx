export default function PrivacyVoluntary() {
  return (
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
  );
}
