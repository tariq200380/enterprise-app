import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-gray-50 border-b border-gray-200/80 group">
      {/* Hidden Checkbox for Pure CSS Mobile Navigation (No useState, No JS) */}
      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
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

        {/* Right: Desktop Action Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex bg-[#0B45D8] hover:bg-[#093bb8] text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md transition-colors shadow-sm"
          >
            Get Started
          </Link>

          {/* Mobile Hamburger Toggle Button with Light Click/Tap Color Effect */}
          <label
            htmlFor="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-gray-700 hover:text-[#0B45D8] hover:bg-blue-50/80 active:bg-blue-100 active:text-[#0B45D8] active:scale-95 group-has-[:checked]:bg-blue-50 group-has-[:checked]:text-[#0B45D8] group-has-[:checked]:ring-1 group-has-[:checked]:ring-blue-200 cursor-pointer transition-all duration-200 p-1.5"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] transition-colors"
                >
                  <span>Home</span>
                  <span className="text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] transition-colors"
                >
                  <span>Services</span>
                  <span className="text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/knowledge-center"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] transition-colors"
                >
                  <span>Knowledge Center</span>
                  <span className="text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] transition-colors"
                >
                  <span>Portfolio</span>
                  <span className="text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] transition-colors"
                >
                  <span>About</span>
                  <span className="text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium text-gray-800 hover:bg-[#EAEFF6] hover:text-[#0052FF] transition-colors"
                >
                  <span>Contact</span>
                  <span className="text-xs">&rarr;</span>
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Action Button at the very end */}
            <div className="pt-3 border-t border-gray-200">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-[#0B45D8] hover:bg-[#093bb8] active:bg-[#072c91] text-white text-sm font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-colors text-center"
              >
                <span>Get Started</span>
                <span className="text-xs">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
