import Link from "next/link";

export default function TermsAcceptance() {
  return (
    <article
      id="acceptance-of-terms"
      className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
        <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-outfit text-[11px] font-bold text-[#FF6B00]">
          SECTION 01
        </span>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Mandatory Agreement
        </span>
      </div>
      <h2 className="font-outfit text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
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
  );
}
