import Image from "next/image";
import Link from "next/link";

export default function KnowledgeCenter() {
  return (
    <section className="w-full py-14 sm:py-16 lg:py-20 border-b border-[#E3EDFF] bg-[#F4F8FF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Heading & Subtitle */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 tracking-tight mb-4">
            Knowledge Center
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl font-normal">
            Discover the latest advancements, expert insights, and practical tips to elevate your software development journey.
          </p>
        </div>

        {/* 2x2 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-6 w-full">
          
          {/* 1. INSIGHT CARD */}
          <Link
            href="/knowledge-center"
            className="group bg-white rounded-2xl border border-[#E1ECFB] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-6"
          >
            <div className="flex flex-col items-start pr-2">
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
                INSIGHT
              </span>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2.5 max-w-md">
                The enterprise software checklist before you scale
              </h3>
              <span className="text-xs text-gray-400 font-normal">
                Creed Team &bull; Jul 2026
              </span>
            </div>
            <div className="shrink-0 w-24 sm:w-28 h-20 sm:h-22 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden relative shadow-xs group-hover:scale-105 transition-transform duration-300 bg-gray-50 flex items-center justify-center">
              <Image 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
                alt="The enterprise software checklist before you scale" 
                className="w-full h-full object-cover object-center block"
                width={112}
                height={88}
                unoptimized
              />
            </div>
          </Link>

          {/* 2. ARTICLE CARD */}
          <Link
            href="/knowledge-center"
            className="group bg-white rounded-2xl border border-[#E1ECFB] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-6"
          >
            <div className="flex flex-col items-start pr-2">
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
                ARTICLE
              </span>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2.5 max-w-md">
                Why database migrations fail &mdash; and how to avoid it
              </h3>
              <span className="text-xs text-gray-400 font-normal">
                Creed Team &bull; Jul 2026
              </span>
            </div>
            <div className="shrink-0 w-24 sm:w-28 h-20 sm:h-22 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden relative shadow-xs group-hover:scale-105 transition-transform duration-300 bg-gray-50 flex items-center justify-center">
              <Image 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
                alt="Why database migrations fail — and how to avoid it" 
                className="w-full h-full object-cover object-center block"
                width={112}
                height={88}
                unoptimized
              />
            </div>
          </Link>

          {/* 3. NEWS CARD */}
          <Link
            href="/knowledge-center"
            className="group bg-white rounded-2xl border border-[#E1ECFB] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-6"
          >
            <div className="flex flex-col items-start pr-2">
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
                NEWS
              </span>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2.5 max-w-md">
                Creed Tech expands cloud infrastructure practice
              </h3>
              <span className="text-xs text-gray-400 font-normal">
                Creed Team &bull; Jun 2026
              </span>
            </div>
            <div className="shrink-0 w-24 sm:w-28 h-20 sm:h-22 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden relative shadow-xs group-hover:scale-105 transition-transform duration-300 bg-gray-50 flex items-center justify-center">
              <Image 
                src="/images/kc-news.webp"
                alt="Creed Tech expands cloud infrastructure practice" 
                className="w-full h-full object-cover object-center block"
                width={112}
                height={88}
              />
            </div>
          </Link>

          {/* 4. BLOG CARD */}
          <Link
            href="/knowledge-center"
            className="group bg-white rounded-2xl border border-[#E1ECFB] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-6"
          >
            <div className="flex flex-col items-start pr-2">
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
                BLOG
              </span>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2.5 max-w-md">
                A practical guide to QA for fast-moving teams
              </h3>
              <span className="text-xs text-gray-400 font-normal">
                Creed Team &bull; Jun 2026
              </span>
            </div>
            <div className="shrink-0 w-24 sm:w-28 h-20 sm:h-22 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden relative shadow-xs group-hover:scale-105 transition-transform duration-300 bg-gray-50 flex items-center justify-center">
              <Image 
                src="/images/kc-blog.webp"
                alt="A practical guide to QA for fast-moving teams" 
                className="w-full h-full object-cover object-center block"
                width={112}
                height={88}
              />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
