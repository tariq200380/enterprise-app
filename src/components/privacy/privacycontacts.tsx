import Link from "next/link";

export default function PrivacyContacts() {
  return (
    <article id="contacts" className="scroll-mt-28">
      <span className="text-xs font-outfit font-bold text-[#FF6B00] block mb-2">
        10
      </span>
      <h2 className="font-outfit text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
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
  );
}
