"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const DEFAULT_LINKS: SocialLink[] = [
  { id: "1", platform: "Facebook", url: "https://facebook.com/creedtechnology" },
  { id: "2", platform: "Instagram", url: "https://instagram.com/creed.technologiess" },
  { id: "3", platform: "LinkedIn", url: "https://linkedin.com/company/creedtech" },
  { id: "4", platform: "Pinterest", url: "https://pinterest.com/creedtech" },
  { id: "6", platform: "GitHub", url: "https://github.com/creed-tech" },
  { id: "5", platform: "X (Twitter)", url: "https://x.com/CreedtechHq" },
];

export interface GeneralSiteInfo {
  siteName?: string;
  siteTagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  officeAddress?: string;
}

export default function Footer({
  initialSocialLinks,
  initialCopyrightText,
  initialGeneralInfo,
}: {
  initialSocialLinks?: SocialLink[];
  initialCopyrightText?: string;
  initialGeneralInfo?: GeneralSiteInfo;
}) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    initialSocialLinks && initialSocialLinks.length > 0 ? initialSocialLinks : DEFAULT_LINKS
  );
  const [copyright, setCopyright] = useState<string>(
    initialCopyrightText || "© 2026 Creed Tech. All rights reserved."
  );
  const [generalInfo, setGeneralInfo] = useState<GeneralSiteInfo>({
    siteName: initialGeneralInfo?.siteName || "Creed Tech",
    siteTagline: initialGeneralInfo?.siteTagline || "",
    contactEmail: initialGeneralInfo?.contactEmail || "info@creed-tech.com",
    contactPhone: initialGeneralInfo?.contactPhone || "+92 309 8307115",
    officeAddress:
      initialGeneralInfo?.officeAddress || "Office # 02, Main Shopping Center Sheikhupura.",
  });

  useEffect(() => {
    fetch("/api/admin/website-settings")
      .then((res) => res.json())
      .then((data) => {
        const s = data.settings || data;
        if (s) {
          if (Array.isArray(s.socialLinks) && s.socialLinks.length > 0) {
            const valid = s.socialLinks.filter((l: SocialLink) => l.url && l.url.trim() !== "");
            if (valid.length > 0) {
              setSocialLinks(valid);
            }
          }
          if (s.copyrightText) {
            setCopyright(s.copyrightText);
          }
          setGeneralInfo((prev) => ({
            siteName: s.siteName || s.site_name || prev.siteName,
            siteTagline: s.siteTagline || s.site_tagline || prev.siteTagline,
            contactEmail: s.contactEmail || s.contact_email || prev.contactEmail,
            contactPhone: s.contactPhone || s.contact_phone || prev.contactPhone,
            officeAddress: s.officeAddress || s.office_address || prev.officeAddress,
          }));
        }
      })
      .catch(() => {});
  }, []);
  return (
    <footer className="bg-[#1A1A1A] text-[#F4F6F8] pt-16 pb-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-x-8 md:gap-x-12 lg:gap-x-16 w-full max-w-7xl mx-auto px-2 sm:px-6 pb-2">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 md:col-span-1 flex flex-col text-left">
            <p className="text-xl font-medium h-6 flex items-center mb-6 tracking-tight">
              <span className="text-[#F4F6F8]">CREED</span>
              <span className="text-[#FF6A00]">TECH</span>
            </p>
            <div className="text-sm text-[#F4F6F8]/80 leading-relaxed flex flex-col justify-between h-auto md:h-[290px] space-y-3.5 md:space-y-0 font-normal">
              <p>
                We specialize in enterprise software architecture, robust cloud infrastructure, and next-generation cybersecurity.
              </p>
              <p>
                Engineering scalable, high-performance, and resilient systems tailored for global enterprises and modern businesses.
              </p>
              <p>
                Delivering end-to-end digital transformation, modern web systems, and strategic IT consulting to accelerate growth.
              </p>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="col-span-1 md:col-span-1 flex flex-col text-left">
            <p className="text-xs font-medium uppercase tracking-widest text-white h-6 flex items-center mb-6">
              USEFUL LINKS
            </p>
            <ul className="flex flex-col space-y-3.5">
              <li className="h-6 flex items-center">
                <Link href="/" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/knowledge-center" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Knowledge Center
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/portfolio" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/about" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/contact" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/careers" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/security" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Security Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="col-span-1 md:col-span-1 flex flex-col text-left">
            <p className="text-xs font-medium uppercase tracking-widest text-white h-6 flex items-center mb-6">
              OUR SERVICES
            </p>
            <ul className="flex flex-col space-y-3.5">
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Database Management
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Software Development
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Artificial Intelligence (AI)
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Cloud Infrastructure
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li className="h-6 flex items-center">
                <Link href="/services" className="text-sm leading-6 text-[#F4F6F8]/80 hover:text-white transition-colors">
                  Digital Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="col-span-2 md:col-span-1 flex flex-col text-left">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-6">
              
              {/* Left on Mobile / Top on Desktop: Get In Touch + Address, Email, Phone */}
              <div className="flex flex-col">
                <p className="text-xs font-medium text-white uppercase tracking-widest h-6 flex items-center mb-6">
                  Get In Touch
                </p>
                <div className="text-sm leading-6 text-[#F4F6F8]/80 flex flex-col space-y-3.5 font-normal">
                  <div className="h-auto leading-snug whitespace-pre-line">
                    {generalInfo.officeAddress}
                  </div>
                  <div className="h-6 flex items-center">
                    <a
                      href={`mailto:${generalInfo.contactEmail}`}
                      className="hover:text-white transition-colors"
                    >
                      {generalInfo.contactEmail}
                    </a>
                  </div>
                  <div className="h-6 flex items-center">
                    <a
                      href={`tel:${generalInfo.contactPhone?.replace(/\s+/g, "")}`}
                      className="hover:text-white transition-colors"
                    >
                      {generalInfo.contactPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right on Mobile / Bottom on Desktop: PSEB Registered + Social Icons Under It */}
              <div className="flex flex-col">
                <div className="h-6 flex items-center mb-6">
                  <span className="bg-[#0052FF]/20 text-white text-[11px] font-medium px-2.5 py-1 rounded-[4px] inline-block leading-normal">
                    PSEB Registered
                  </span>
                </div>

                {/* Social Icons Grid directly under PSEB */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-3 max-w-[200px] text-sm leading-6 text-[#F4F6F8]/80 font-normal">
                  {socialLinks.map((item) => {
                    const isX = item.platform.toLowerCase().includes("twitter") || item.platform.toLowerCase() === "x" || item.platform.toLowerCase().includes("x (twitter)");
                    return (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-6 flex items-center hover:text-[#FF6B00] transition-colors duration-200 truncate"
                        title={item.platform}
                      >
                        {isX ? (
                          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-label="X">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        ) : (
                          item.platform
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Sub Legal & Security Badges Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#2A2A2A] pt-5 mt-5 sm:pt-6 sm:mt-8">
          
          {/* Left: Copyright & Legal */}
          <div className="order-2 sm:order-1 text-xs text-[#F4F6F8]/60 w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center sm:justify-start text-center sm:text-left pt-0 sm:pt-0">
            <div className="w-full sm:w-auto text-center sm:text-left">
              <span className="block sm:inline">
                {copyright}
              </span>
            </div>
            <span className="hidden sm:inline text-gray-600 sm:mx-3">|</span>
            <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-x-3 text-center sm:mt-0">
              <Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/terms" className="hover:text-white hover:underline transition-colors">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>

          {/* Right: 4 Security Badges */}
          <div className="order-1 sm:order-2 grid grid-cols-2 sm:flex sm:flex-row sm:items-center justify-center gap-3 w-full sm:w-auto mb-5 sm:mb-0">
            <Link
              href="/security-iso-27001"
              className="w-full sm:w-28 h-8 flex items-center justify-center text-center text-xs font-medium rounded-[4px] bg-[#242424] text-[#F4F6F8]/90 border border-[#383838] transition-colors duration-150 hover:border-[#FF6B00] hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 cursor-pointer select-none"
            >
              ISO 27001
            </Link>
            <Link
              href="/security-gdpr"
              className="w-full sm:w-28 h-8 flex items-center justify-center text-center text-xs font-medium rounded-[4px] bg-[#242424] text-[#F4F6F8]/90 border border-[#383838] transition-colors duration-150 hover:border-[#FF6B00] hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 cursor-pointer select-none"
            >
              GDPR
            </Link>
            <Link
              href="/security-soc-2"
              className="w-full sm:w-28 h-8 flex items-center justify-center text-center text-xs font-medium rounded-[4px] bg-[#242424] text-[#F4F6F8]/90 border border-[#383838] transition-colors duration-150 hover:border-[#FF6B00] hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 cursor-pointer select-none"
            >
              SOC 2
            </Link>
            <Link
              href="/security-pci-dss"
              className="w-full sm:w-28 h-8 flex items-center justify-center text-center text-xs font-medium rounded-[4px] bg-[#242424] text-[#F4F6F8]/90 border border-[#383838] transition-colors duration-150 hover:border-[#FF6B00] hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 cursor-pointer select-none"
            >
              PCI-DSS
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
