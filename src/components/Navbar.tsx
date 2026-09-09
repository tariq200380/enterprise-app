import Image from "next/image";
import Link from "next/link";
import { HeaderNavLinkItem } from "./admin/settings/types";

export interface HeaderSettings {
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  navLinks?: HeaderNavLinkItem[];
  ctaText?: string;
  ctaUrl?: string;
  showCta?: boolean;
}

const DEFAULT_LINKS: HeaderNavLinkItem[] = [
  { id: "nav-1", label: "Home", url: "/", enabled: true },
  { id: "nav-2", label: "Services", url: "/services", enabled: true },
  { id: "nav-3", label: "Knowledge Center", url: "/knowledge-center", enabled: true },
  { id: "nav-4", label: "Portfolio", url: "/portfolio", enabled: true },
  { id: "nav-5", label: "About", url: "/about", enabled: true },
  { id: "nav-6", label: "Contact", url: "/contact", enabled: true },
];

export default function Navbar({
  headerSettings,
}: {
  headerSettings?: HeaderSettings;
}) {
  const logoUrl = headerSettings?.logoUrl?.trim() || "/images/logo.webp";
  const logoWidth = headerSettings?.logoWidth || 130;
  const logoHeight = headerSettings?.logoHeight || 36;
  const showCta = headerSettings?.showCta !== false;
  const ctaText = headerSettings?.ctaText || "Get Started";
  const ctaUrl = headerSettings?.ctaUrl || "/contact";

  const rawLinks = headerSettings?.navLinks && headerSettings.navLinks.length > 0
    ? headerSettings.navLinks
    : DEFAULT_LINKS;

  const links = rawLinks.filter((link) => link.enabled !== false);

  return (
    <header className="w-full bg-gray-50 border-b border-gray-200/80">
      {/* Hidden Checkbox for Pure CSS Mobile Navigation (No useState, No JS) */}
      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo with Custom Dimensions */}
        <Link href="/" className="flex items-center shrink-0">
          <div
            className="flex items-center overflow-hidden"
            style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
          >
            <Image
              src={logoUrl}
              alt="Creed Tech"
              width={logoWidth}
              height={logoHeight}
              unoptimized
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target={link.openInNewTab ? "_blank" : undefined}
              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
              className="text-gray-700 hover:text-[#FF6B00] border-b-2 border-transparent hover:border-[#FF6B00] transition-all duration-300 ease-in-out py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showCta && (
            <Link
              href={ctaUrl}
              className="hidden md:inline-flex bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
            >
              {ctaText}
            </Link>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <label
            htmlFor="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50 cursor-pointer transition-all duration-300 ease-in-out p-1"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (Smooth pure CSS slide via Tailwind grid-rows transition) */}
      <div className="grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] opacity-0 peer-checked:opacity-100 transition-all duration-500 ease-in-out md:hidden w-full bg-[#F4F6F8] border-t border-transparent peer-checked:border-gray-200 overflow-hidden">
        <div className="overflow-hidden min-h-0">
          <div className="px-4 py-4 max-h-[80vh] overflow-y-auto">
            <ul className="flex flex-col space-y-2 mb-4">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    className="mobile-nav-link group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-800 bg-white/80 border-l-4 border-transparent hover:border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white hover:shadow-md hover:shadow-orange-500/20 hover:translate-x-1.5 active:scale-[0.99] transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <span className="transition-colors duration-300 ease-in-out group-hover:text-white">
                      {link.label}
                    </span>
                    <span className="nav-arrow text-sm font-bold text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Action Button at the end */}
            {showCta && (
              <div className="pt-3 border-t border-gray-200">
                <Link
                  href={ctaUrl}
                  className="group w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#e05d00] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.99] text-white text-sm font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out text-center cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <span className="text-sm font-bold group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out">
                    &rarr;
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

