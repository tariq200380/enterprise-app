"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { HeaderNavLinkItem } from "./admin/settings/types";

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
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Route change hone par mobile menu automatically close ho jaye
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeMenu = () => {
    setIsOpen(false);
  };

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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo with Custom Dimensions */}
        <Link href="/" onClick={closeMenu} className="flex items-center shrink-0">
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
        <div className="hidden md:flex items-center gap-5 lg:gap-8 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.id}
                href={link.url}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                className={`py-1 border-b-2 transition-all duration-200 ease-in-out cursor-pointer ${
                  isActive
                    ? "text-[#FF6B00] border-[#FF6B00] font-semibold"
                    : "text-gray-700 hover:text-[#FF6B00] border-transparent hover:border-[#FF6B00]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showCta && (
            <button
              type="button"
              data-modal="project"
              className="hidden md:inline-flex bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md transition-all duration-300 ease-in-out shadow-sm hover:shadow-md cursor-pointer"
            >
              {ctaText}
            </button>
          )}

          {/* Mobile Hamburger / Close Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50 cursor-pointer transition-all duration-300 ease-in-out p-1"
            aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (Smooth slide via Tailwind grid-rows transition) */}
      <div
        className={`grid transition-all duration-300 ease-in-out md:hidden w-full bg-[#F4F6F8] border-t overflow-hidden ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 border-gray-200"
            : "grid-rows-[0fr] opacity-0 border-transparent"
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="px-4 py-4 max-h-[80vh] overflow-y-auto">
            <ul className="flex flex-col space-y-2 mb-4">
              {links.map((link) => {
                const isActive = pathname === link.url;
                return (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      onClick={closeMenu}
                      target={link.openInNewTab ? "_blank" : undefined}
                      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      className={`mobile-nav-link group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium border-l-4 transition-all duration-200 ease-in-out cursor-pointer ${
                        isActive
                          ? "bg-orange-50/80 text-[#FF6B00] border-l-[#FF6B00] font-semibold"
                          : "text-gray-800 bg-white/80 border-l-transparent hover:border-l-[#FF5805] hover:bg-[#FF6B00] hover:text-white hover:shadow-md hover:shadow-orange-500/20 hover:translate-x-1.5"
                      }`}
                    >
                      <span className="transition-colors duration-200 ease-in-out">
                        {link.label}
                      </span>
                      <span className="nav-arrow text-sm font-bold transition-all duration-200 ease-in-out text-gray-400 group-hover:text-white group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Menu Action Button at the end */}
            {showCta && (
              <div className="pt-3 border-t border-gray-200">
                <button
                  type="button"
                  data-modal="project"
                  onClick={closeMenu}
                  className="group w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 ease-in-out text-center cursor-pointer bg-[#FF6B00] hover:bg-[#e05d00] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.99]"
                >
                  <span>{ctaText}</span>
                  <span className="text-sm font-bold transition-transform duration-200 ease-in-out group-hover:translate-x-1.5">
                    &rarr;
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

