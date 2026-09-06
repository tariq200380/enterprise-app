import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-gray-50 border-b border-gray-200/80">
      {/* Hidden Checkbox for Pure CSS Mobile Navigation (No useState, No JS) */}
      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.webp"
            alt="Creed Tech"
            width={130}
            height={40}
            priority
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-gray-700 hover:text-[#0B45D8] hover:border-b-2 hover:border-[#0B45D8] transition-all py-1">
            Home
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-[#0B45D8] hover:border-b-2 hover:border-[#0B45D8] transition-all py-1">
            Services
          </Link>
          <Link href="/knowledge-center" className="text-gray-700 hover:text-[#0B45D8] hover:border-b-2 hover:border-[#0B45D8] transition-all py-1">
            Knowledge Center
          </Link>
          <Link href="/portfolio" className="text-gray-700 hover:text-[#0B45D8] hover:border-b-2 hover:border-[#0B45D8] transition-all py-1">
            Portfolio
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#0B45D8] hover:border-b-2 hover:border-[#0B45D8] transition-all py-1">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#0B45D8] hover:border-b-2 hover:border-[#0B45D8] transition-all py-1">
            Contact
          </Link>
        </div>

        {/* Action Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex bg-[#0B45D8] hover:bg-[#093bb8] text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md transition-colors shadow-sm"
          >
            Get Started
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <label
            htmlFor="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-gray-700 hover:text-[#0B45D8] hover:bg-gray-100 active:bg-blue-50 active:text-[#0B45D8] cursor-pointer transition-colors p-1"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (Smooth pure CSS slide via Tailwind grid-rows transition) */}
      <div className="grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] opacity-0 peer-checked:opacity-100 transition-all duration-300 ease-in-out md:hidden w-full bg-[#F4F6F8] border-t border-transparent peer-checked:border-gray-200 overflow-hidden">
        <div className="overflow-hidden min-h-0">
          <div className="px-4 py-4 max-h-[80vh] overflow-y-auto">
            <ul className="flex flex-col space-y-1.5 mb-4">
              <li>
                <Link
                  href="/"
                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] hover:translate-x-2 transition-all duration-200 ease-out"
                >
                  <span className="group-hover:font-semibold transition-all duration-200">Home</span>
                  <span className="text-xs text-gray-400 group-hover:text-[#0052FF] group-hover:translate-x-1.5 transition-all duration-200">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] hover:translate-x-2 transition-all duration-200 ease-out"
                >
                  <span className="group-hover:font-semibold transition-all duration-200">Services</span>
                  <span className="text-xs text-gray-400 group-hover:text-[#0052FF] group-hover:translate-x-1.5 transition-all duration-200">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/knowledge-center"
                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] hover:translate-x-2 transition-all duration-200 ease-out"
                >
                  <span className="group-hover:font-semibold transition-all duration-200">Knowledge Center</span>
                  <span className="text-xs text-gray-400 group-hover:text-[#0052FF] group-hover:translate-x-1.5 transition-all duration-200">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] hover:translate-x-2 transition-all duration-200 ease-out"
                >
                  <span className="group-hover:font-semibold transition-all duration-200">Portfolio</span>
                  <span className="text-xs text-gray-400 group-hover:text-[#0052FF] group-hover:translate-x-1.5 transition-all duration-200">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] hover:translate-x-2 transition-all duration-200 ease-out"
                >
                  <span className="group-hover:font-semibold transition-all duration-200">About</span>
                  <span className="text-xs text-gray-400 group-hover:text-[#0052FF] group-hover:translate-x-1.5 transition-all duration-200">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] hover:translate-x-2 transition-all duration-200 ease-out"
                >
                  <span className="group-hover:font-semibold transition-all duration-200">Contact</span>
                  <span className="text-xs text-gray-400 group-hover:text-[#0052FF] group-hover:translate-x-1.5 transition-all duration-200">&rarr;</span>
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Action Button at the end */}
            <div className="pt-3 border-t border-gray-200">
              <Link
                href="/contact"
                className="group w-full flex items-center justify-center gap-2 bg-[#0B45D8] hover:bg-[#093bb8] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] text-white text-sm font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all duration-200 text-center"
              >
                <span>Get Started</span>
                <span className="text-xs group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
