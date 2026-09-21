export default function TermsWarranties() {
  return (
    <article
      id="disclaimer-warranties"
      className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
        <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-outfit text-[11px] font-bold text-[#FF6B00]">
          SECTION 08
        </span>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          As-Is Warranty
        </span>
      </div>
      <h2 className="font-outfit text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
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
  );
}
