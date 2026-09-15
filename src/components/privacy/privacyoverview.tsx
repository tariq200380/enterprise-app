import Link from "next/link";

export default function PrivacyOverview() {
  return (
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
          <Link href="/" className="font-semibold text-[#FF6B00] hover:underline">
            creed-tech.com
          </Link>{" "}
          as an enterprise technology and custom software engineering firm. We hold a fundamental commitment to data privacy, confidentiality, and technical integrity.
        </p>
        <p>
          This Privacy Policy explains what information we collect when you browse our website, submit technical project inquiries, apply for careers, or subscribe to tech intelligence feeds, and how that information is safeguarded.
        </p>
      </div>
    </article>
  );
}
