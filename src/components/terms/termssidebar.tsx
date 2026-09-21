const TOC_ITEMS = [
  { id: "acceptance-of-terms", num: "1", label: "Acceptance of Terms" },
  { id: "client-agreements", num: "2", label: "Client Agreements & MSAs" },
  { id: "informational-scope", num: "3", label: "Informational Scope" },
  { id: "form-submissions", num: "4", label: "Information via Forms" },
  { id: "intellectual-property", num: "5", label: "Intellectual Property" },
  { id: "third-party-links", num: "6", label: "Third-Party Attribution" },
  { id: "prohibited-conduct", num: "7", label: "Acceptable Use & Abuse" },
  { id: "disclaimer-warranties", num: "8", label: "Disclaimer of Warranties" },
  { id: "limitation-liability", num: "9", label: "Limitation of Liability" },
  { id: "modifications", num: "10", label: "Modifications to Terms" },
  { id: "legal-inquiries", num: "11", label: "Legal Inquiries" },
];

export default function TermsSidebar() {
  return (
    <aside className="hidden lg:block w-72 shrink-0 sticky top-28 self-start space-y-5">
      <div className="bg-white border border-[#E6E4DF] rounded-2xl p-5 shadow-2xs">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 pb-2 border-b border-[#F0EEEA]">
          Navigation Index
        </p>
        <nav className="flex flex-col space-y-1.5 text-xs">
          {TOC_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#FF6B00] hover:bg-[#FAF9F6] transition-colors"
            >
              <span className="w-5 h-5 rounded bg-[#FAF9F6] border border-[#E6E4DF] text-[10px] font-outfit font-bold text-[#FF6B00] group-hover:border-[#FF6B00]/40 flex items-center justify-center shrink-0 transition-colors">
                {item.num}
              </span>
              <span className="truncate">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Quick Contact Micro-Card */}
      <div className="bg-white border border-[#E6E4DF] rounded-2xl p-4 shadow-2xs text-xs space-y-2">
        <p className="font-outfit font-bold text-[#1C1917]">Legal Consultation</p>
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
  );
}
