import Link from "next/link";

export default function GdprCta() {
  return (
    <section className="w-full bg-[#0B1220] py-12 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center border-t border-slate-800/40">
      {/* Ambient Orange Radial Glow - Pure Tailwind CSS */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(255,107,0,0.20)_0%,rgba(255,107,0,0.05)_45%,transparent_75%)]" />

      {/* Centered Soft Orange Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[300px] sm:h-[420px] bg-[#FF6B00]/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <span className="text-[11px] font-semibold text-[#FF6B00] tracking-[0.2em] uppercase block mb-3">
          DATA PRIVACY ASSURANCE &bull; ARTICLE 28 COMPLIANT
        </span>
        <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
          Need Our GDPR DPA &amp; Privacy Alignment Architecture?
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Our privacy and compliance team can help prepare Standard Contractual Clauses (SCC) frameworks and support developing customized DPA documentation tailored to client data processing requirements, under standard mutual NDA.
        </p>
        <div>
          <Link
            href="/contact"
            className="w-full sm:w-auto min-w-[200px] h-14 px-8 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold rounded inline-flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
          >
            Contact Privacy Team
          </Link>
        </div>
      </div>
    </section>
  );
}
