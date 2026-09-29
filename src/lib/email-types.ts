export interface EmailMediaItem {
  id: string;
  type?: "image" | "video";
  title?: string;
  mediaUrl?: string; // image or video URL
  thumbnailUrl?: string;
  year?: string;
  condition?: string;
  specs?: string;
  details?: string;
  linkUrl?: string;
  galleryUrls?: string[]; // multiple pictures for this machine offer
}

export type EmailFormatType =
  | "format-catalog"
  | "format-executive-signature"
  | "format-announcement"
  | "format-minimal"
  | "format-custom";

export interface EmailFormatMetadata {
  id: EmailFormatType;
  formatNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  status: "ACTIVE" | "RESERVED";
  description: string;
}

export interface EmailSocialLink {
  id: string;
  platform: "facebook" | "linkedin" | "whatsapp" | "instagram" | "twitter" | "youtube" | "website" | "other";
  url: string;
  label?: string;
}

export interface GalleryRowItem {
  id: string;
  imageUrl: string;
  text: string;
  title?: string;
  linkUrl?: string;
}

export interface GalleryRow {
  id: string;
  items: GalleryRowItem[];
}

export const DEFAULT_FORMAT2_SOCIAL_LINKS: EmailSocialLink[] = [
  { id: "soc-fb", platform: "facebook", url: "https://facebook.com", label: "Facebook" },
  { id: "soc-li", platform: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
  { id: "soc-wa", platform: "whatsapp", url: "https://wa.me/15550192834", label: "WhatsApp" },
  { id: "soc-ig", platform: "instagram", url: "https://instagram.com", label: "Instagram" },
];

export const DEFAULT_FORMAT2_GALLERY_ROWS: GalleryRow[] = [
  {
    id: "row-1",
    items: [
      { id: "item-1-1", imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop", text: "CNC Miller 5X", title: "CNC Miller 5X High Precision" },
      { id: "item-1-2", imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=400&auto=format&fit=crop", text: "Laser Cutter", title: "Fiber Laser Cutting System" },
      { id: "item-1-3", imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop", text: "Hydraulic Press", title: "Heavy Duty 200T Hydraulic Press" },
      { id: "item-1-4", imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=400&auto=format&fit=crop", text: "Automated Robot", title: "6-Axis Robotic Arm" },
      { id: "item-1-5", imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop", text: "Injection Mold", title: "Electric Injection Molding Machine" },
      { id: "item-1-6", imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=400&auto=format&fit=crop", text: "Rotary Lathe", title: "Precision Metal Turning Lathe" },
      { id: "item-1-7", imageUrl: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=400&auto=format&fit=crop", text: "Quality Scanner", title: "3D Optical CMM Scanner" },
    ],
  },
];


export const EMAIL_FORMATS_METADATA: EmailFormatMetadata[] = [
  {
    id: "format-catalog",
    formatNumber: 1,
    title: "Format 1: Catalog & Equipment Cards",
    subtitle: "Multi-Picture Cards, Specs & Details",
    badge: "Catalog Offers",
    icon: "🖼️",
    status: "ACTIVE",
    description: "2-Column Machine & Equipment offer cards with pictures, technical specifications, year, condition, and full gallery viewer.",
  },
  {
    id: "format-executive-signature",
    formatNumber: 2,
    title: "Format 2: Sidebar Dashboard & 7-Item Rows",
    subtitle: "Left Info Bar, Social Icons, Top Pic & Gallery",
    badge: "Dashboard & Gallery",
    icon: "📊",
    status: "ACTIVE",
    description: "Left sidebar with logo, heading, address, phone & social links + Main top pic and multi-row 7-item image gallery with enlarge popup modal.",
  },
  {
    id: "format-announcement",
    formatNumber: 3,
    title: "Format 3: Luxury Studio & Editorial Showcase",
    subtitle: "Top Message, Serene Teal Banners & Zig-Zag Studio Layout",
    badge: "Studio Editorial",
    icon: "🛋️",
    status: "ACTIVE",
    description: "High-end Scandinavian editorial design: Top email message, panoramic soft-teal hero banner, alternating zig-zag product cards with dark pill buttons, bottom studio showcase, and 4-column footer.",
  },
  {
    id: "format-minimal",
    formatNumber: 4,
    title: "Format 4: Executive Signature & Modern Geometric Banner",
    subtitle: "Curved Horizon Banner, Avatar Arc, Format 1 Cards & Social Badges",
    badge: "Executive Banner",
    icon: "💼",
    status: "ACTIVE",
    description: "Modern curved executive banner design matching reference: Circular avatar with geometric accent arcs, executive credentials, contact telemetry, company logo, social buttons, combined with Format 1 equipment catalog cards.",
  },
  {
    id: "format-custom",
    formatNumber: 5,
    title: "Format 5: [Slot 5 Reserved]",
    subtitle: "Pending your design specifications",
    badge: "Slot Reserved",
    icon: "🎯",
    status: "RESERVED",
    description: "Slot reserved for Format 5. Once you provide the format design/image, this template will be activated.",
  },
];

export interface EmailDepartmentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  accentColor: string;
  formatType?: EmailFormatType;
  phone?: string;
  address?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoTitle?: string;
  footerDisclaimer?: string;
  defaultSubjectTemplate?: string;
  defaultMessageTemplate?: string;
  isDefault?: boolean;
  mediaPosition?: "top" | "center" | "bottom";
  mediaAlignment?: "left" | "center" | "right";
  mediaType?: "video" | "image";
  mediaYear?: string;
  mediaCondition?: string;
  mediaSpecs?: string;
  mediaDetails?: string;
  mediaItems?: EmailMediaItem[];
  headerStyle?: "dark" | "light" | "centered";
  headerAlignment?: "left" | "center" | "right";
  contentAlignment?: "left" | "center" | "right";
  textColor?: string;
  backgroundColor?: string;
  showReferenceBadge?: boolean;
  referenceBadgeText?: string;
  // Modern Shutterstock-style email signature fields
  signatureStyle?: "modern-curved" | "dark-luxury" | "minimal-pill" | "classic-corporate";
  signatureName?: string;
  signatureRole?: string;
  signatureAvatar?: string;
  signatureCompany?: string;
  signatureCompanyLogo?: string;
  signatureTagline?: string;
  signatureWebsite?: string;
  // Format 2: Sidebar Dashboard & 7-Item Grid Fields
  sidebarLogo?: string;
  sidebarHeading?: string;
  sidebarAddress?: string;
  sidebarPhone?: string;
  sidebarSocialLinks?: EmailSocialLink[];
  featuredMainPicUrl?: string;
  featuredMainPicText?: string;
  galleryRows?: GalleryRow[];
}

/**
 * Generate public viewer URL for a specific media item.
 */
export function buildItemViewerUrl(
  item: Partial<EmailMediaItem>,
  profile: Partial<EmailDepartmentProfile>,
  baseUrl?: string
): string {
  if (item.linkUrl && item.linkUrl.trim() && !item.linkUrl.includes("/uploads/")) {
    return item.linkUrl.trim();
  }

  const defaultBase =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL || "https://creed-tech.com");
  const effectiveBaseUrl = (baseUrl && baseUrl.trim()) || defaultBase;

  const isVideo =
    item.type === "video" ||
    Boolean(
      item.mediaUrl &&
        (item.mediaUrl.includes("youtu") ||
          item.mediaUrl.includes("vimeo") ||
          item.mediaUrl.endsWith(".mp4") ||
          item.mediaUrl.endsWith(".webm"))
    );
  const type = isVideo ? "video" : "image";
  const rawSrc = isVideo
    ? item.mediaUrl || item.thumbnailUrl || ""
    : item.thumbnailUrl || item.mediaUrl || "";
  const rawThumb = item.thumbnailUrl || "";

  // Normalize relative paths like /uploads/...
  const normalize = (u: string) => {
    if (!u) return "";
    if (u.startsWith("/uploads/")) {
      return `${effectiveBaseUrl}${u}`;
    }
    return u;
  };

  const src = normalize(rawSrc);
  const thumb = normalize(rawThumb);

  const params = new URLSearchParams();
  params.set("type", type);
  if (src) params.set("src", src);
  if (thumb) params.set("thumb", thumb);
  if (item.title) params.set("title", item.title);
  if (item.year) params.set("year", item.year);
  if (item.condition) params.set("condition", item.condition);
  if (item.specs) params.set("specs", item.specs);
  if (item.details) params.set("desc", item.details);
  if (profile.department) params.set("desk", profile.department);
  if (profile.email) params.set("email", profile.email);
  if (profile.phone) params.set("phone", profile.phone);
  if (Array.isArray(item.galleryUrls) && item.galleryUrls.length > 0) {
    params.set("gallery", item.galleryUrls.map(normalize).join(","));
  }

  return `${effectiveBaseUrl}/view/media?${params.toString()}`;
}

/**
 * Generate public viewer URL for email media/offer clicks.
 * When clicked from email:
 * - If video: opens player and starts playing the video.
 * - If image: opens high-res picture and equipment/solution specifications card.
 */
export function buildMediaViewerUrl(
  profile: Partial<EmailDepartmentProfile>,
  baseUrl?: string
): string {
  const defaultBase =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL || "https://creed-tech.com");
  const effectiveBaseUrl = (baseUrl && baseUrl.trim()) || defaultBase;

  const isVideo =
    profile.mediaType === "video" ||
    Boolean(
      profile.videoUrl &&
        (profile.videoUrl.includes("youtu") ||
          profile.videoUrl.includes("vimeo") ||
          profile.videoUrl.endsWith(".mp4") ||
          profile.videoUrl.endsWith(".webm"))
    );
  const type = isVideo ? "video" : "image";
  const rawMediaSrc = isVideo
    ? profile.videoUrl || profile.videoThumbnail || ""
    : profile.videoThumbnail || profile.videoUrl || "";
  const rawThumb = profile.videoThumbnail || "";

  const normalize = (u: string) => {
    if (!u) return "";
    if (u.startsWith("/uploads/")) {
      return `${effectiveBaseUrl}${u}`;
    }
    return u;
  };

  const mediaSrc = normalize(rawMediaSrc);
  const thumb = normalize(rawThumb);

  const params = new URLSearchParams();
  params.set("type", type);
  if (mediaSrc) params.set("src", mediaSrc);
  if (thumb) params.set("thumb", thumb);
  if (profile.videoTitle) params.set("title", profile.videoTitle);
  if (profile.mediaYear) params.set("year", profile.mediaYear);
  if (profile.mediaCondition) params.set("condition", profile.mediaCondition);
  if (profile.mediaSpecs) params.set("specs", profile.mediaSpecs);
  if (profile.mediaDetails) params.set("desc", profile.mediaDetails);
  if (profile.department) params.set("desk", profile.department);
  if (profile.email) params.set("email", profile.email);
  if (profile.phone) params.set("phone", profile.phone);

  return `${effectiveBaseUrl}/view/media?${params.toString()}`;
}

export const ACCENT_COLOR_PRESETS = [
  "#FF6B00",
  "#0052FF",
  "#10B981",
  "#6366F1",
  "#EC4899",
  "#8B5CF6",
  "#F59E0B",
  "#0F172A",
];

export const TEXT_COLOR_PRESETS = [
  { label: "Pitch Black", color: "#000000" },
  { label: "Dark Slate", color: "#1E293B" },
  { label: "Charcoal", color: "#334155" },
  { label: "Dark Navy", color: "#0F172A" },
  { label: "Creed Blue", color: "#0052FF" },
  { label: "Emerald", color: "#047857" },
  { label: "Crimson", color: "#DC2626" },
  { label: "Purple", color: "#7C3AED" },
  { label: "Amber", color: "#D97706" },
  { label: "Muted Gray", color: "#64748B" },
  { label: "Silver Slate", color: "#94A3B8" },
  { label: "Pure White", color: "#FFFFFF" },
];

export const BG_COLOR_PRESETS = [
  { label: "Pure White", color: "#FFFFFF" },
  { label: "Crisp Snow", color: "#F8FAFC" },
  { label: "Soft Cream", color: "#FDFBF7" },
  { label: "Warm Linen", color: "#F5EFE6" },
  { label: "Pearl Slate", color: "#F1F5F9" },
  { label: "Soft Gray", color: "#E2E8F0" },
  { label: "Dark Slate", color: "#1E293B" },
  { label: "Dark Enterprise", color: "#0F172A" },
  { label: "Deep Midnight", color: "#090D16" },
  { label: "Obsidian Charcoal", color: "#18181B" },
  { label: "Deep Royal", color: "#0B192C" },
  { label: "Pitch Black", color: "#000000" },
];

export const SIGNATURE_STYLE_PRESETS = [
  { id: "modern-curved", label: "🌊 Modern Wave", description: "Curved accent ribbon, dual-ring avatar & logo badge" },
  { id: "dark-luxury", label: "⬛ Dark Enterprise", description: "Deep executive obsidian card with glowing accent ring" },
  { id: "minimal-pill", label: "✨ Minimalist Card", description: "Crisp white card with accent side-strip & compact grid" },
  { id: "classic-corporate", label: "🏢 Corporate Banner", description: "Two-tone executive header with brand crest & credentials" },
] as const;

export const DEFAULT_EMAIL_PROFILES: EmailDepartmentProfile[] = [
  {
    id: "sales",
    formatType: "format-catalog",
    name: "Creed Tech Equipment & Solutions",
    email: "catalog@creed-tech.com",
    department: "Machinery & Equipment Catalog Desk",
    accentColor: "#FF6B00",
    phone: "+1 (888) 492-7333",
    address: "Creed Tech Enterprise HQ, 450 Innovation Parkway, Suite 500, San Francisco, CA 94105",
    videoUrl: "https://creed-tech.com/portfolio",
    videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    videoTitle: "Heidelberg Speedmaster CD102-6+LX (2001)",
    mediaType: "image",
    mediaYear: "2001",
    mediaCondition: "★★★★☆ Very Good",
    mediaSpecs: "6 Colors, Coater, 15,000 SPH, Autoplate, Preset Plus",
    mediaDetails: "Direct factory serviced unit with full documentation and production readiness warranty.",
    mediaItems: [
      {
        id: "item-1",
        type: "image",
        title: "Heidelberg Speedmaster CD102-6+LX",
        thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        year: "2001",
        condition: "★★★★☆ Very Good",
        specs: "6 Colors, Coater, 15,000 SPH, Autoplate",
        details: "Top tier production machine inspected and ready for global shipment.",
      },
      {
        id: "item-2",
        type: "image",
        title: "Komori Lithrone GL-640+C (H-UV)",
        thumbnailUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
        mediaUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
        year: "2016",
        condition: "★★★★★ Excellent",
        specs: "6 Colors + Coater, H-UV Instant Curing, PQC-S",
        details: "Low impression count, impeccably maintained in climate-controlled plant.",
      },
    ],
    footerDisclaimer: "This offer is subject to prior sale. Technical specifications are provided based on manufacturer standards.",
    defaultSubjectTemplate: "Official Offer & Equipment Catalog - {service} [Inquiry #{id}]",
    defaultMessageTemplate: `Dear {client_name},

Thank you for your interest in Creed Tech Machinery & Enterprise Solutions.

We have reviewed your inquiry regarding "{service}" and are pleased to present our available equipment portfolio matching your production criteria.

Below you will find the verified specifications, high-resolution pictures, and equipment details for your review. Please let us know if you require technical inspection reports or freight estimates.

Best regards,

Creed Tech Equipment & Solutions Desk
Website: https://creed-tech.com`,
    isDefault: true,
    mediaPosition: "center",
    mediaAlignment: "center",
    headerStyle: "dark",
    contentAlignment: "left",
  },
  {
    id: "executive-desk",
    formatType: "format-executive-signature",
    name: "Tariq Mahmood",
    email: "executive@creed-tech.com",
    department: "Executive Management & Direct Desk",
    accentColor: "#0052FF",
    phone: "+1 (888) 492-7330",
    address: "Creed Tech Global Headquarters, 450 Innovation Parkway, Suite 500, San Francisco, CA 94105",
    footerDisclaimer: "CONFIDENTIALITY NOTICE: This transmission is intended solely for the designated recipient and may contain proprietary executive business information.",
    defaultSubjectTemplate: "Executive Correspondence: Scoping & Discovery for {service} [Inquiry #{id}]",
    defaultMessageTemplate: `Dear {client_name},

Thank you for contacting Creed Tech Executive Management.

We have evaluated your business objectives regarding "{service}". Our executive architecture team is prepared to schedule a direct discovery consultation to explore operational alignment, project roadmaps, and delivery milestones.

Please let us know your availability for a 20-minute discussion this week.

Warm regards,

Tariq Mahmood
Executive Management Desk`,
    isDefault: false,
    headerStyle: "dark",
    contentAlignment: "left",
    signatureStyle: "modern-curved",
    signatureRole: "Managing Director & Solutions Lead",
    signatureAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    signatureCompany: "CREED TECH",
    signatureTagline: "Enterprise Software & Cloud Systems",
    signatureWebsite: "https://creed-tech.com",
    sidebarHeading: "CREED TECH",
    sidebarLogo: "https://creed-tech.com/icons/icon-192x192.png",
    sidebarAddress: "Creed Tech Global Headquarters, 450 Innovation Parkway, Suite 500, San Francisco, CA 94105",
    sidebarPhone: "+1 (888) 492-7330",
    sidebarSocialLinks: DEFAULT_FORMAT2_SOCIAL_LINKS,
    featuredMainPicUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    featuredMainPicText: "Next-Generation Industrial Machinery & Enterprise Engineering Solutions",
    galleryRows: [
      {
        id: "row-1",
        items: [
          { id: "item-1-1", imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop", text: "CNC Miller 5X", title: "CNC Miller 5X High Precision" },
          { id: "item-1-2", imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=400&auto=format&fit=crop", text: "Laser Cutter", title: "Fiber Laser Cutting System" },
          { id: "item-1-3", imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop", text: "Hydraulic Press", title: "Heavy Duty 200T Hydraulic Press" },
          { id: "item-1-4", imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=400&auto=format&fit=crop", text: "Automated Robot", title: "6-Axis Robotic Arm" },
          { id: "item-1-5", imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop", text: "Injection Mold", title: "Electric Injection Molding Machine" },
          { id: "item-1-6", imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=400&auto=format&fit=crop", text: "Rotary Lathe", title: "Precision Metal Turning Lathe" },
          { id: "item-1-7", imageUrl: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=400&auto=format&fit=crop", text: "Quality Scanner", title: "3D Optical CMM Scanner" },
        ],
      },
    ],
  },
  {
    id: "support",
    name: "Creed Tech Technical Support",
    email: "support@creed-tech.com",
    department: "Technical Operations & Support",
    accentColor: "#0052FF",
    phone: "+1 (888) 492-7334",
    address: "Creed Tech Technical Support Center, 450 Innovation Parkway, San Francisco, CA 94105",
    videoUrl: "https://creed-tech.com/services",
    videoThumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    videoTitle: "Watch: High-Reliability Operations & SLA Support Guide",
    footerDisclaimer: "Creed Tech Support Desk operates 24/7/365 for Tier-1 mission-critical enterprise contracts. Ticket status updates are logged automatically.",
    defaultSubjectTemplate: "[Ticket #{id}] Creed Tech Support: Update on {service}",
    defaultMessageTemplate: `Dear {client_name},

Thank you for contacting Creed Tech Technical Operations regarding "{service}".

Your inquiry has been logged under Reference ID #{id} and routed directly to our senior site reliability and infrastructure engineering team.

We are currently reviewing the parameters you provided and will provide an initial diagnostic and resolution roadmap shortly. If you have logs or reproduction steps, please feel free to reply directly to this email.

Best regards,

Technical Operations & Support Desk
Creed Tech 24/7 Operations`,
    isDefault: false,
    mediaPosition: "center",
    mediaAlignment: "center",
    headerStyle: "dark",
    contentAlignment: "left",
  },
  {
    id: "security",
    name: "Creed Tech Cyber Security",
    email: "security@creed-tech.com",
    department: "Cybersecurity & Compliance",
    accentColor: "#10B981",
    phone: "+1 (888) 492-7335",
    address: "Creed Tech Security Operations Vault, 450 Innovation Parkway, San Francisco, CA 94105",
    videoUrl: "https://creed-tech.com/about",
    videoThumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    videoTitle: "Watch: Zero-Trust Security & Sovereign Compliance Overview",
    footerDisclaimer: "SECURE COMMUNICATION: This channel is monitored for compliance with SOC2 Type II, ISO 27001, and NIST CSF cryptographic frameworks. Mutual NDA is active upon request.",
    defaultSubjectTemplate: "CONFIDENTIAL: Mutual NDA & Architecture Scoping - Creed Tech [Inquiry #{id}]",
    defaultMessageTemplate: `Dear {client_name},

Thank you for contacting Creed Tech Cybersecurity & Cryptographic Architecture.

We treat all enterprise scopes, system architectures, and intellectual property with bank-grade confidentiality under mutual non-disclosure protections.

Prior to disclosing deeper system topology or codebases, our legal and compliance desk can execute a bilateral NDA. Please let us know if you would like us to countersign your corporate NDA or provide Creed Tech's standard mutual enterprise agreement.

Best regards,

Information Security & Compliance Desk
Creed Tech Sovereign Systems`,
    isDefault: false,
    mediaPosition: "top",
    mediaAlignment: "center",
    headerStyle: "dark",
    contentAlignment: "left",
  },
  {
    id: "info",
    name: "Creed Tech Corporate Desk",
    email: "info@creed-tech.com",
    department: "General Inquiries & Corporate Desk",
    accentColor: "#6366F1",
    phone: "+1 (888) 492-7330",
    address: "Creed Tech Global Headquarters, 450 Innovation Parkway, Suite 500, San Francisco, CA 94105",
    videoUrl: "https://creed-tech.com",
    videoThumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    videoTitle: "Watch: About Creed Tech Global Enterprise Engineering",
    footerDisclaimer: "Creed Tech Global Systems Corporation. All rights reserved. Registered Enterprise Engineering & Cloud Architecture Solutions.",
    defaultSubjectTemplate: "Creed Tech: Thank you for contacting us [Inquiry #{id}]",
    defaultMessageTemplate: `Dear {client_name},

Thank you for reaching out to Creed Tech.

We have received your message regarding "{service}" and have routed it to the appropriate division within our organization.

A dedicated specialist from our team will follow up with you within one business day. In the meantime, please feel free to explore our portfolio and engineering publications on our website.

Warm regards,

Creed Tech Corporate Communications
https://creed-tech.com`,
    isDefault: false,
    mediaPosition: "bottom",
    mediaAlignment: "center",
    headerStyle: "light",
    contentAlignment: "left",
  },
];

/**
 * Generate a modern, rich Shutterstock-style email signature card.
 * Supports 4 professional styles: Modern Wave, Dark Enterprise, Minimalist Pill, and Corporate Banner.
 */
export function generateEmailSignatureHtml(profile: Partial<EmailDepartmentProfile>): string {
  const accent = profile.accentColor || "#0052FF";
  const name = profile.name || "Enterprise Representative";
  const role = profile.signatureRole || profile.department || "Enterprise Solutions Director";
  const company = profile.signatureCompany || "CREED TECH";
  const tagline = profile.signatureTagline || "Enterprise Systems & Cloud Infrastructure";
  const email = profile.email || "desk@creed-tech.com";
  const phone = profile.phone || "+1 (888) 492-7330";
  const website = profile.signatureWebsite || "https://creed-tech.com";
  const address = profile.address || "San Francisco, CA";
  const avatar =
    profile.signatureAvatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
  const style = profile.signatureStyle || "modern-curved";
  const websiteDisplay = website.replace(/^https?:\/\//i, "").replace(/\/$/, "");

  if (style === "dark-luxury") {
    return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; background: #0B1120; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);">
      <tr>
        <td style="padding: 16px 20px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="76" valign="middle" align="center" style="padding-right: 16px;">
                <div style="width: 68px; height: 68px; border-radius: 50%; border: 3px solid ${accent}; overflow: hidden; box-shadow: 0 0 14px ${accent}40; background: #000000; text-align: center;">
                  <img src="${avatar}" alt="${name}" width="68" height="68" style="width: 68px; height: 68px; object-fit: cover; display: block; border-radius: 50%;" />
                </div>
              </td>
              <td valign="middle" style="line-height: 1.4;">
                <div style="font-size: 15px; font-weight: 800; color: #FFFFFF; text-transform: uppercase; letter-spacing: 0.04em;">
                  ${name}
                </div>
                <div style="font-size: 11px; font-weight: 700; color: ${accent}; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px;">
                  ${role}
                </div>
                <div style="font-size: 10px; color: #94A3B8; margin-top: 2px; margin-bottom: 8px;">
                  ${tagline}
                </div>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="font-size: 11px; color: #CBD5E1;">
                  <tr>
                    <td style="padding: 2px 14px 2px 0;">
                      <span style="color: ${accent}; font-weight: bold; margin-right: 4px;">📞</span>
                      <a href="tel:${phone}" style="color: #CBD5E1; text-decoration: none;">${phone}</a>
                    </td>
                    <td style="padding: 2px 0;">
                      <span style="color: ${accent}; font-weight: bold; margin-right: 4px;">✉️</span>
                      <a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 14px 2px 0;">
                      <span style="color: ${accent}; font-weight: bold; margin-right: 4px;">🌐</span>
                      <a href="${website}" target="_blank" style="color: #38BDF8; text-decoration: none;">${websiteDisplay}</a>
                    </td>
                    <td style="padding: 2px 0;">
                      <span style="color: ${accent}; font-weight: bold; margin-right: 4px;">📍</span>
                      <span style="color: #94A3B8;">${address}</span>
                    </td>
                  </tr>
                </table>
              </td>
              <td width="110" valign="middle" align="right" style="padding-left: 12px; border-left: 1px solid rgba(255, 255, 255, 0.1);">
                <div style="text-align: center;">
                  <div style="font-size: 13px; font-weight: 900; color: #FFFFFF; letter-spacing: 0.08em;">
                    CREED<span style="color: ${accent};">TECH</span>
                  </div>
                  <div style="font-size: 8px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 2px;">
                    ENTERPRISE
                  </div>
                  <div style="margin-top: 6px;">
                    <span style="display: inline-block; padding: 2px 8px; border-radius: 12px; background: ${accent}25; border: 1px solid ${accent}60; color: #FFFFFF; font-size: 9px; font-weight: 700;">
                      ● VERIFIED
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    `;
  }

  if (style === "minimal-pill") {
    return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-left: 5px solid ${accent}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
      <tr>
        <td style="padding: 14px 18px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="64" valign="middle" align="center" style="padding-right: 14px;">
                <div style="width: 58px; height: 58px; border-radius: 50%; border: 2px solid ${accent}; overflow: hidden; background: #F8FAFC;">
                  <img src="${avatar}" alt="${name}" width="58" height="58" style="width: 58px; height: 58px; object-fit: cover; display: block; border-radius: 50%;" />
                </div>
              </td>
              <td valign="middle" style="line-height: 1.35;">
                <div style="font-size: 14px; font-weight: 800; color: #0F172A; letter-spacing: 0.02em;">
                  ${name}
                </div>
                <div style="font-size: 11px; font-weight: 700; color: ${accent}; text-transform: uppercase; margin-top: 1px;">
                  ${role} • <span style="color: #64748B; font-weight: 600;">${company}</span>
                </div>
                <div style="font-size: 11px; color: #475569; margin-top: 6px;">
                  <span>📞 <a href="tel:${phone}" style="color: #475569; text-decoration: none; font-weight: 600;">${phone}</a></span>
                  &nbsp;&nbsp;•&nbsp;&nbsp;
                  <span>✉️ <a href="mailto:${email}" style="color: ${accent}; text-decoration: none; font-weight: 600;">${email}</a></span>
                  &nbsp;&nbsp;•&nbsp;&nbsp;
                  <span>🌐 <a href="${website}" target="_blank" style="color: ${accent}; text-decoration: none;">${websiteDisplay}</a></span>
                </div>
                ${address ? `<div style="font-size: 10px; color: #94A3B8; margin-top: 3px;">📍 ${address}</div>` : ""}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    `;
  }

  if (style === "classic-corporate") {
    return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);">
      <tr>
        <td style="background: ${accent}; height: 6px; font-size: 1px; line-height: 1px;">&nbsp;</td>
      </tr>
      <tr>
        <td style="padding: 16px 20px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="72" valign="middle" align="center" style="padding-right: 16px;">
                <div style="width: 64px; height: 64px; border-radius: 50%; border: 3px solid #FFFFFF; box-shadow: 0 2px 8px rgba(0,0,0,0.15); overflow: hidden; background: #FFFFFF;">
                  <img src="${avatar}" alt="${name}" width="64" height="64" style="width: 64px; height: 64px; object-fit: cover; display: block; border-radius: 50%;" />
                </div>
              </td>
              <td valign="middle" style="line-height: 1.4;">
                <div style="font-size: 15px; font-weight: 800; color: #0F172A; text-transform: uppercase;">
                  ${name}
                </div>
                <div style="font-size: 11px; font-weight: 700; color: ${accent}; text-transform: uppercase;">
                  ${role}
                </div>
                <div style="font-size: 10px; color: #64748B; margin-top: 2px; margin-bottom: 6px;">
                  ${company} • ${tagline}
                </div>
                <div style="font-size: 11px; color: #334155;">
                  <strong>Tel:</strong> <a href="tel:${phone}" style="color: #334155; text-decoration: none;">${phone}</a>
                  &nbsp;•&nbsp;
                  <strong>Email:</strong> <a href="mailto:${email}" style="color: ${accent}; text-decoration: none; font-weight: 600;">${email}</a>
                  &nbsp;•&nbsp;
                  <strong>Web:</strong> <a href="${website}" target="_blank" style="color: ${accent}; text-decoration: none;">${websiteDisplay}</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    `;
  }

  // Default: "modern-curved" (Primary Shutterstock wave signature)
  return `
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);">
    <tr>
      <td style="padding: 16px 20px; background: linear-gradient(to right, #FFFFFF 68%, #F8FAFC 100%);">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="78" valign="middle" align="center" style="padding-right: 16px;">
              <div style="position: relative; width: 68px; height: 68px; border-radius: 50%; padding: 3px; background: linear-gradient(135deg, ${accent}, #0F172A); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);">
                <div style="width: 100%; height: 100%; border-radius: 50%; overflow: hidden; background: #FFFFFF;">
                  <img src="${avatar}" alt="${name}" width="68" height="68" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 50%;" />
                </div>
              </div>
            </td>
            <td valign="middle" style="line-height: 1.4;">
              <div style="font-size: 15px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.04em;">
                ${name}
              </div>
              <div style="font-size: 11px; font-weight: 700; color: ${accent}; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 1px;">
                ${role}
              </div>
              <div style="font-size: 10px; color: #64748B; margin-top: 2px; margin-bottom: 8px;">
                ${tagline}
              </div>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="font-size: 11px; color: #334155;">
                <tr>
                  <td style="padding: 2px 14px 2px 0;">
                    <span style="color: ${accent}; font-weight: bold; margin-right: 3px;">📞</span>
                    <a href="tel:${phone}" style="color: #1E293B; text-decoration: none; font-weight: 600;">${phone}</a>
                  </td>
                  <td style="padding: 2px 0;">
                    <span style="color: ${accent}; font-weight: bold; margin-right: 3px;">✉️</span>
                    <a href="mailto:${email}" style="color: ${accent}; text-decoration: none; font-weight: 600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 2px 14px 2px 0;">
                    <span style="color: ${accent}; font-weight: bold; margin-right: 3px;">🌐</span>
                    <a href="${website}" target="_blank" style="color: #0284C7; text-decoration: none; font-weight: 600;">${websiteDisplay}</a>
                  </td>
                  <td style="padding: 2px 0;">
                    <span style="color: ${accent}; font-weight: bold; margin-right: 3px;">📍</span>
                    <span style="color: #64748B;">${address}</span>
                  </td>
                </tr>
              </table>
            </td>
            <td width="112" valign="middle" align="right" style="padding-left: 12px; border-left: 1px solid #F1F5F9;">
              <div style="background: linear-gradient(135deg, ${accent}, #0F172A); color: #FFFFFF; padding: 12px 10px; border-radius: 10px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                <div style="font-size: 12px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase;">
                  ${company}
                </div>
                <div style="font-size: 8px; font-weight: 700; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.14em; margin-top: 2px;">
                  OFFICIAL
                </div>
                <div style="margin-top: 6px; font-size: 8px; background: rgba(255,255,255,0.2); padding: 1.5px 6px; border-radius: 8px; display: inline-block;">
                  VERIFIED
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}

/**
 * Generate full responsive branded HTML email layout for a department profile.
 * Supports configurable media position (top/center/bottom), alignment (left/center/right),
 * header style (dark/light/centered), and content alignment.
 */
/**
 * Generate Format 2: Sidebar Dashboard & 7-Item Grid Email Layout.
 * Features:
 * - Left Sidebar: Upper part has Company Logo & Heading; Lower part has Address, Phone & Dynamic Social Links (Facebook, LinkedIn, WhatsApp, Instagram).
 * - Main Area: Top featured main picture with text; Lower rows of images (up to 7 images per row, centered if fewer), with text under each.
 * - Clicking any image links to the enlarged viewer URL.
 */
export function generateFormat2Html(
  profile: EmailDepartmentProfile,
  content: {
    clientName?: string;
    message: string;
    subject?: string;
    inquiryId?: number | string;
    referenceBadge?: string | null;
    showReferenceBadge?: boolean;
  }
): string {
  const accent = profile.accentColor || "#0052FF";
  const logo = profile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png";
  const heading = profile.sidebarHeading || profile.name || "CREED TECH";
  const address = profile.sidebarAddress || profile.address || "Karachi, Pakistan";
  const phone = profile.sidebarPhone || profile.phone || "+92 300 1234567";
  const socials =
    profile.sidebarSocialLinks && profile.sidebarSocialLinks.length > 0
      ? profile.sidebarSocialLinks
      : DEFAULT_FORMAT2_SOCIAL_LINKS;

  const mainPic =
    profile.featuredMainPicUrl ||
    (profile.mediaItems && profile.mediaItems[0]?.mediaUrl) ||
    profile.videoThumbnail ||
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
  const mainPicText =
    profile.featuredMainPicText ||
    "Next-Generation Industrial Machinery & Enterprise Engineering Solutions";

  const rows =
    profile.galleryRows && profile.galleryRows.length > 0
      ? profile.galleryRows
      : [
          {
            id: "row-1",
            items: [
              {
                id: "item-1-1",
                imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop",
                text: "CNC Miller 5X",
                title: "CNC Miller 5X High Precision",
              },
              {
                id: "item-1-2",
                imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=400&auto=format&fit=crop",
                text: "Laser Cutter",
                title: "Fiber Laser Cutting System",
              },
              {
                id: "item-1-3",
                imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop",
                text: "Hydraulic Press",
                title: "Heavy Duty 200T Hydraulic Press",
              },
              {
                id: "item-1-4",
                imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=400&auto=format&fit=crop",
                text: "Automated Robot",
                title: "6-Axis Robotic Arm",
              },
              {
                id: "item-1-5",
                imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop",
                text: "Injection Mold",
                title: "Electric Injection Molding Machine",
              },
              {
                id: "item-1-6",
                imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=400&auto=format&fit=crop",
                text: "Rotary Lathe",
                title: "Precision Metal Turning Lathe",
              },
              {
                id: "item-1-7",
                imageUrl: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=400&auto=format&fit=crop",
                text: "Quality Scanner",
                title: "3D Optical CMM Scanner",
              },
            ],
          },
        ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook": return "📘";
      case "linkedin": return "💼";
      case "whatsapp": return "💬";
      case "instagram": return "📷";
      case "twitter": return "🐦";
      case "youtube": return "▶️";
      case "website": return "🌐";
      default: return "🔗";
    }
  };

  const socialLinksHtml = socials
    .map(
      (soc) => `
    <tr>
      <td style="padding: 4px 0;">
        <a href="${soc.url}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); padding: 6px 10px; border-radius: 8px; color: #ffffff; font-size: 11px; font-weight: 600;">
          <span style="display: inline-block; width: 18px; text-align: center; margin-right: 6px;">${getPlatformIcon(soc.platform)}</span>
          <span style="color: #f1f5f9;">${soc.label || soc.platform.toUpperCase()}</span>
          <span style="float: right; color: #94a3b8; font-size: 10px;">↗</span>
        </a>
      </td>
    </tr>`
    )
    .join("");

  const formattedBody = content.message
    .split("\n")
    .map((line) =>
      line.trim() === ""
        ? "<br/>"
        : `<p style="margin: 0 0 12px 0; line-height: 1.6; color: #334155; font-size: 14px;">${line}</p>`
    )
    .join("");

  const mainPicViewerUrl = buildItemViewerUrl(
    { mediaUrl: mainPic, title: mainPicText, details: mainPicText },
    profile
  );

  const galleryRowsHtml = rows
    .map((row) => {
      const itemsInRow = (row.items || []).slice(0, 7);
      if (itemsInRow.length === 0) return "";

      const cells = itemsInRow
        .map((it) => {
          const itViewerUrl = buildItemViewerUrl(
            { mediaUrl: it.imageUrl, title: it.title || it.text, details: it.text },
            profile
          );
          return `
          <td align="center" valign="top" style="padding: 4px 3px; width: 72px;">
            <a href="${itViewerUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; text-align: center;">
              <div style="width: 66px; height: 66px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; background: #f8fafc; margin: 0 auto; box-shadow: 0 2px 5px rgba(0,0,0,0.04);">
                <img src="${it.imageUrl}" alt="${it.text || 'Gallery item'}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
              </div>
              <div style="font-size: 9px; font-weight: 700; color: #1e293b; line-height: 1.25; margin-top: 4px; max-width: 68px; word-break: break-word;">
                ${it.text}
              </div>
            </a>
          </td>`;
        })
        .join("");

      return `
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 12px auto;">
        <tr>
          ${cells}
        </tr>
      </table>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject || heading}</title>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- MAIN CONTAINER WRAPPER -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 820px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
    <!-- 1. TOP EMAIL MESSAGE ROW (ALAG SE UPAR) -->
    <tr>
      <td style="padding: 32px 32px 24px 32px; background-color: #ffffff; border-bottom: 2px solid #e2e8f0;">
        ${content.subject ? `
          <div style="font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid ${accent};">
            ${content.subject}
          </div>
        ` : ''}
        <div style="font-size: 14px; line-height: 1.7; color: #334155;">
          ${formattedBody}
        </div>
      </td>
    </tr>

    <!-- 2. FORMAT 2: EXECUTIVE SIGNATURE & PRODUCT SHOWCASE CARD (NEECHE) -->
    <tr>
      <td style="padding: 0; background-color: #ffffff;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <!-- LEFT SIDEBAR -->
            <td width="230" valign="top" style="width: 230px; min-width: 210px; background-color: #0b1120; color: #ffffff; padding: 24px 18px; border-right: 1px solid #1e293b;">
              <!-- Upper part: Logo and Heading -->
              <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.12);">
                ${logo ? `<img src="${logo}" alt="${heading}" style="max-height: 52px; max-width: 170px; object-fit: contain; margin: 0 auto 10px auto; display: block;" />` : ''}
                <div style="font-size: 16px; font-weight: 900; letter-spacing: 0.05em; color: #ffffff; text-transform: uppercase;">
                  ${heading}
                </div>
                <div style="font-size: 10px; font-weight: 700; color: ${accent}; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 3px;">
                  ${profile.department || "Enterprise Division"}
                </div>
              </div>

              <!-- Lower part: Address, Phone, Social Links -->
              <div style="padding-top: 20px;">
                ${address ? `
                  <div style="margin-bottom: 16px; font-size: 11px; color: #cbd5e1; line-height: 1.5;">
                    <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; font-weight: 800; margin-bottom: 3px;">📍 Address</div>
                    ${address}
                  </div>
                ` : ''}

                ${phone ? `
                  <div style="margin-bottom: 18px; font-size: 11px; color: #cbd5e1;">
                    <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; font-weight: 800; margin-bottom: 3px;">📞 Phone / Direct</div>
                    <a href="tel:${phone}" style="color: #60a5fa; text-decoration: none; font-weight: 700;">${phone}</a>
                  </div>
                ` : ''}

                <!-- Social Links -->
                <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.1);">
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; font-weight: 800; margin-bottom: 8px;">🌐 Connect / Social</div>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    ${socialLinksHtml}
                  </table>
                </div>
              </div>
            </td>

            <!-- RIGHT / MAIN SHOWCASE AREA (MAIN PIC & GALLERY) -->
            <td valign="top" style="padding: 22px 24px; background-color: #ffffff;">
              <!-- CENTER / TOP MAIN PICTURE WITH TEXT -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 18px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
                <tr>
                  <td style="padding: 0; text-align: center; background: #000000;">
                    <a href="${mainPicViewerUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none;">
                      <img src="${mainPic}" alt="${mainPicText}" style="width: 100%; max-height: 260px; object-fit: cover; display: block;" />
                    </a>
                  </td>
                </tr>
                ${mainPicText ? `
                <tr>
                  <td style="padding: 12px 18px; font-size: 13px; color: #1e293b; font-weight: 700; line-height: 1.5; background: #ffffff; border-top: 1px solid #f1f5f9;">
                    ${mainPicText}
                  </td>
                </tr>
                ` : ''}
              </table>

              <!-- LOWER GALLERY ROWS (UP TO 7 ITEMS PER ROW, CENTER ADJUSTED) -->
              <div style="margin-top: 16px; padding-top: 14px; border-top: 1px dashed #cbd5e1;">
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 12px; text-align: center;">
                  Featured Highlights &amp; Equipment (Click to Enlarge)
                </div>
                ${galleryRowsHtml}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateFormat3Html(
  profile: EmailDepartmentProfile,
  content: {
    clientName?: string;
    message: string;
    subject?: string;
    inquiryId?: number | string;
    service?: string;
    referenceBadge?: string | null;
    showReferenceBadge?: boolean;
  }
): string {
  const accent = profile.accentColor || "#5c95a2";
  const textColor = profile.textColor || "#1e293b";
  const bgColor = profile.backgroundColor || "#ffffff";
  const heading = profile.name || "CREED TECH";

  // Items from mediaItems or fallback to defaults
  let items: EmailMediaItem[] = [];
  if (Array.isArray(profile.mediaItems) && profile.mediaItems.length > 0) {
    items = profile.mediaItems;
  } else if (profile.videoThumbnail || profile.videoUrl) {
    items = [
      {
        id: "item-default",
        type: profile.mediaType || "image",
        title: profile.videoTitle || "Executive Precision Unit",
        mediaUrl: profile.videoUrl,
        thumbnailUrl: profile.videoThumbnail || profile.videoUrl,
        year: profile.mediaYear || "2024",
        condition: profile.mediaCondition || "★★★★★",
        specs: profile.mediaSpecs || "Precision Studio Collection • Verified Specification",
        details: profile.mediaDetails,
        linkUrl: profile.videoUrl,
      },
    ];
  } else {
    items = [
      {
        id: "item-default-1",
        type: "image",
        title: "Get out arows well styler it pieces.",
        thumbnailUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
        year: "2024",
        condition: "★★★★★",
        specs: "Masterfully designed with precision contours, verified load endurance, and minimalist elegance suited for high-tier operations.",
      },
      {
        id: "item-default-2",
        type: "image",
        title: "Peluct oend now",
        thumbnailUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
        year: "2024",
        condition: "★★★★★",
        specs: "Tailored ergonomic contours engineered with premium-grade alloy finish for seamless performance in mission-critical facilities.",
      },
    ];
  }

  const heroItem = items[0];
  const secondaryItem = items[1];
  const extraItems = items.slice(2);

  const heroUrl = heroItem ? buildItemViewerUrl(heroItem, profile) : "#";
  const secondaryUrl = secondaryItem ? buildItemViewerUrl(secondaryItem, profile) : "#";

  const topHeroStagingImage =
    profile.featuredMainPicUrl ||
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop";

  const productCutoutImage =
    heroItem?.thumbnailUrl ||
    heroItem?.mediaUrl ||
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop";

  const productStagingImage =
    secondaryItem?.thumbnailUrl ||
    secondaryItem?.mediaUrl ||
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop";

  const panoramicStagingImage =
    extraItems[0]?.thumbnailUrl ||
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop";

  const fbUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "facebook")?.url ||
    "https://facebook.com/creedtechnology";
  const liUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "linkedin")?.url ||
    "https://linkedin.com/company/creedtech";
  const waUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "whatsapp")?.url ||
    (profile.phone
      ? `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`
      : "https://wa.me/923219204488");
  const igUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "instagram")?.url ||
    "https://instagram.com/creed.technologiess";

  const formattedBody = content.message
    .split("\n")
    .map((line) =>
      line.trim() === ""
        ? "<br/>"
        : `<p style="margin: 0 0 12px 0; line-height: 1.72; color: #334155; font-size: 14px;">${line}</p>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject || heading}</title>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #eef2f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- CONTAINER (LUXURY SCANDINAVIAN STUDIO EDITORIAL EMAIL) -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 680px; margin: 0 auto; background: ${bgColor}; border-radius: 18px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.08); border: 1px solid #dbeafe;">

    <!-- 1. TOP EMAIL MESSAGE (SB SY OPER - ALAG SE) -->
    <tr>
      <td style="padding: 28px 32px 22px 32px; background-color: #ffffff; border-bottom: 2px dashed #cbd5e1;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px;">
          <tr>
            <td align="left">
              <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #64748b; font-family: monospace;">✉️ DIRECT EMAIL MESSAGE</span>
            </td>
            <td align="right">
              <span style="font-size: 9px; font-weight: 700; color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; padding: 2px 8px; border-radius: 9999px;">PRIORITY DISPATCH</span>
            </td>
          </tr>
        </table>
        ${content.subject ? `
          <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            ${content.subject}
          </div>
        ` : ''}
        <div style="font-size: 13.5px; line-height: 1.7; color: #334155; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          ${formattedBody}
        </div>
      </td>
    </tr>

    <!-- 2. SECTION 1: HERO BANNER (SOFT TEAL STUDIO SCENE MATCHING REFERENCE) -->
    <tr>
      <td style="background: linear-gradient(180deg, #6c9fa9 0%, #5a909d 100%); padding: 36px 28px 24px 28px; text-align: center; color: #ffffff;">
        <div style="font-size: 9px; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.82); margin-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
          ${profile.department || "CREED TECH ENTERPRISE STUDIO"}
        </div>
        <div style="font-family: Georgia, 'Playfair Display', 'Times New Roman', serif; font-size: 26px; font-weight: 700; line-height: 1.25; color: #ffffff; margin-bottom: 12px; max-width: 520px; margin-left: auto; margin-right: auto; letter-spacing: -0.01em;">
          ${heroItem?.title || "Ac's office dits book I love To lijch"}
        </div>
        <div style="font-size: 12.5px; line-height: 1.6; color: rgba(255,255,255,0.92); max-width: 440px; margin: 0 auto 18px auto; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
          ${profile.defaultMessageTemplate ? profile.defaultMessageTemplate.slice(0, 140) + "..." : "Refined architectural aesthetics and certified high-durability performance engineered for modern enterprise environments."}
        </div>
        <div style="margin-bottom: 22px;">
          <a href="${heroUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #1a2a32; color: #ffffff; padding: 10px 28px; border-radius: 9999px; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; display: inline-block; box-shadow: 0 4px 14px rgba(0,0,0,0.18); font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
            Discover Series
          </a>
        </div>
        <!-- Studio Staging Visual -->
        <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.18);">
          <img src="${topHeroStagingImage}" alt="Hero Scene" style="width: 100%; max-height: 270px; object-fit: cover; display: block;" />
        </div>
      </td>
    </tr>

    <!-- 3. SECTION 2: SPLIT FEATURE 1 (WHITE BG, TEXT LEFT, PRODUCT RIGHT) -->
    <tr>
      <td style="padding: 42px 32px; background-color: #ffffff;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="52%" valign="middle" style="padding-right: 20px;">
              <div style="font-family: Georgia, 'Playfair Display', 'Times New Roman', serif; font-size: 22px; font-weight: 700; line-height: 1.25; color: #1a2a32; margin-bottom: 12px; letter-spacing: -0.01em;">
                ${heroItem?.title || "Get out arows well styler it pieces."}
              </div>
              <div style="font-size: 12.5px; line-height: 1.65; color: #64748b; margin-bottom: 18px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                ${heroItem?.specs || heroItem?.details || "Masterfully designed with precision contours, verified load endurance, and minimalist elegance suited for high-tier operations."}
              </div>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    <a href="${heroUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #1a2a32; color: #ffffff; padding: 10px 24px; border-radius: 9999px; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; display: inline-block; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                      View Unit
                    </a>
                  </td>
                  <td valign="middle" style="padding-left: 14px;">
                    <span style="font-size: 11px; font-weight: 600; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                      <span style="color: #f59e0b;">&#9670;</span> Verified
                    </span>
                  </td>
                </tr>
              </table>
            </td>
            <td width="48%" valign="middle" align="center" style="padding-left: 10px;">
              <a href="${heroUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;">
                <img src="${productCutoutImage}" alt="${heroItem?.title || 'Product Cutout'}" style="width: 100%; max-height: 220px; object-fit: contain; display: block; margin: 0 auto; filter: drop-shadow(0 14px 20px rgba(0,0,0,0.12));" />
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- 4. SECTION 3: SPLIT FEATURE 2 (ZIG-ZAG FLIPPED: PRODUCT LEFT ON TEAL BACKDROP, TEXT RIGHT) -->
    <tr>
      <td style="padding: 32px 32px 42px 32px; background-color: #ffffff; border-top: 1px solid #f1f5f9;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="48%" valign="middle" align="center" style="padding-right: 18px;">
              <a href="${secondaryUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;">
                <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 24px rgba(0,0,0,0.1);">
                  <img src="${productStagingImage}" alt="${secondaryItem?.title || 'Product Staging'}" style="width: 100%; max-height: 220px; object-fit: cover; display: block; margin: 0 auto;" />
                </div>
              </a>
            </td>
            <td width="52%" valign="middle" style="padding-left: 12px;">
              <div style="font-size: 9px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: #94a3b8; margin-bottom: 6px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                MODERN COLLECTION
              </div>
              <div style="font-family: Georgia, 'Playfair Display', 'Times New Roman', serif; font-size: 22px; font-weight: 700; line-height: 1.25; color: #1a2a32; margin-bottom: 12px; letter-spacing: -0.01em;">
                ${secondaryItem?.title || "Peluct oend now"}
              </div>
              <div style="font-size: 12.5px; line-height: 1.65; color: #64748b; margin-bottom: 18px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                ${secondaryItem?.specs || secondaryItem?.details || "Tailored ergonomic contours engineered with premium-grade alloy finish for seamless performance in mission-critical facilities."}
              </div>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    <a href="${secondaryUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #1a2a32; color: #ffffff; padding: 10px 24px; border-radius: 9999px; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; display: inline-block; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                      See Specs
                    </a>
                  </td>
                  <td valign="middle" style="padding-left: 14px;">
                    <span style="font-size: 11px; font-weight: 600; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                      <span style="color: #10b981;">&#9679;</span> Ready
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- 5. SECTION 4: PANORAMIC BOTTOM SHOWCASE BANNER -->
    <tr>
      <td style="background: linear-gradient(180deg, #6c9fa9 0%, #5a909d 100%); padding: 38px 28px 24px 28px; text-align: center; color: #ffffff;">
        <div style="font-family: Georgia, 'Playfair Display', 'Times New Roman', serif; font-size: 22px; font-weight: 700; line-height: 1.3; color: #ffffff; margin-bottom: 10px; max-width: 480px; margin-left: auto; margin-right: auto;">
          ${profile.signatureTagline || "Premium Engineering Solutions For Modern High-Performance Workspaces"}
        </div>
        <div style="font-size: 12px; line-height: 1.6; color: rgba(255,255,255,0.92); margin-bottom: 18px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
          Direct enterprise inventory verified under ISO 9001 and strict operational benchmarks.
        </div>
        <div style="margin-bottom: 22px;">
          <a href="${heroUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #ffffff; color: #1a2a32; padding: 10px 28px; border-radius: 9999px; text-decoration: none; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; display: inline-block; box-shadow: 0 4px 14px rgba(0,0,0,0.15); font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
            Explore All Units &rarr;
          </a>
        </div>
        <!-- Panoramic Staging Strip -->
        <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.18);">
          <img src="${panoramicStagingImage}" alt="Collection Staging" style="width: 100%; max-height: 240px; object-fit: cover; display: block;" />
        </div>
      </td>
    </tr>

    <!-- 6. SECTION 5: EDITORIAL 4-COLUMN FOOTER (MATCHING REFERENCE EXACTLY) -->
    <tr>
      <td style="background-color: #ffffff; padding: 36px 30px 24px 30px; border-top: 1px solid #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <!-- Col 1: Brand & Tagline -->
            <td width="30%" valign="top" style="padding-right: 14px;">
              <div style="font-family: Georgia, 'Playfair Display', 'Times New Roman', serif; font-size: 15px; font-weight: 700; color: #1a2a32; margin-bottom: 6px;">
                CREED TECH
              </div>
              <div style="font-size: 10px; color: #64748b; line-height: 1.5;">
                We to your rich dispatches. Enterprise machinery &amp; tailored engineering solutions.
              </div>
            </td>
            <!-- Col 2: Quick Links -->
            <td width="20%" valign="top" style="padding: 0 8px;">
              <div style="font-size: 10px; font-weight: 700; color: #1a2a32; text-transform: uppercase; margin-bottom: 6px;">
                Directory
              </div>
              <div style="font-size: 9.5px; color: #64748b; line-height: 1.8;">
                <div>Equipment</div>
                <div>Catalog</div>
                <div>Warranty</div>
                <div>Direct Dispatch</div>
              </div>
            </td>
            <!-- Col 3: Assurance -->
            <td width="25%" valign="top" style="padding: 0 8px;">
              <div style="font-size: 10px; font-weight: 700; color: #1a2a32; text-transform: uppercase; margin-bottom: 6px;">
                Compliance
              </div>
              <div style="font-size: 9.5px; color: #64748b; line-height: 1.6;">
                Certified operational standard under stringent industrial tolerance and mutual NDA.
              </div>
            </td>
            <!-- Col 4: Contact Desk Button -->
            <td width="25%" valign="top" align="right" style="padding-left: 8px;">
              <div style="font-size: 10px; font-weight: 700; color: #1a2a32; text-transform: uppercase; margin-bottom: 6px; text-align: right;">
                Direct Desk
              </div>
              <div style="margin-bottom: 8px; font-size: 9.5px; color: #64748b; text-align: right;">
                ${profile.email}
              </div>
              <a href="mailto:${profile.email}" style="background-color: #1a2a32; color: #ffffff; padding: 7px 16px; border-radius: 9999px; text-decoration: none; font-size: 9.5px; font-weight: 700; display: inline-block;">
                Contact Desk &rarr;
              </a>
            </td>
          </tr>
        </table>

        <!-- Sub-footer Divider & Social Links (Facebook, LinkedIn, WhatsApp, Instagram) -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #f1f5f9;">
          <tr>
            <td align="left" valign="middle" style="font-size: 9px; color: #94a3b8;">
              &copy; ${new Date().getFullYear()} Creed Tech Enterprise Solutions. All rights reserved.
            </td>
            <td align="right" valign="middle">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="display: inline-table; margin: 0; padding: 0;">
                <tr>
                  <!-- Facebook -->
                  <td style="padding-left: 6px;">
                    <a href="${fbUrl}" target="_blank" rel="noopener noreferrer" title="Facebook" style="display: inline-block; width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #1a2a32; text-align: center; text-decoration: none; vertical-align: middle;">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='12' fill='%23ffffff'%3E%3Cpath d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E" alt="Facebook" width="12" height="12" style="display: inline-block; vertical-align: middle; border: 0;" />
                    </a>
                  </td>
                  <!-- LinkedIn -->
                  <td style="padding-left: 6px;">
                    <a href="${liUrl}" target="_blank" rel="noopener noreferrer" title="LinkedIn" style="display: inline-block; width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #1a2a32; text-align: center; text-decoration: none; vertical-align: middle;">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='12' fill='%23ffffff'%3E%3Cpath d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'/%3E%3C/svg%3E" alt="LinkedIn" width="12" height="12" style="display: inline-block; vertical-align: middle; border: 0;" />
                    </a>
                  </td>
                  <!-- WhatsApp -->
                  <td style="padding-left: 6px;">
                    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" title="WhatsApp" style="display: inline-block; width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #1a2a32; text-align: center; text-decoration: none; vertical-align: middle;">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='12' fill='%23ffffff'%3E%3Cpath d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z'/%3E%3C/svg%3E" alt="WhatsApp" width="12" height="12" style="display: inline-block; vertical-align: middle; border: 0;" />
                    </a>
                  </td>
                  <!-- Instagram -->
                  <td style="padding-left: 6px;">
                    <a href="${igUrl}" target="_blank" rel="noopener noreferrer" title="Instagram" style="display: inline-block; width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #1a2a32; text-align: center; text-decoration: none; vertical-align: middle;">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='12' fill='%23ffffff'%3E%3Cpath d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/%3E%3C/svg%3E" alt="Instagram" width="12" height="12" style="display: inline-block; vertical-align: middle; border: 0;" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Format 4: Executive Signature & Modern Geometric Banner
 * Matches reference image:
 * - Clean corporate top header
 * - Personalized message body
 * - Machine Offers & Equipment Showcase Cards (exact Format 1 catalog cards with 2-column grid, specs, year, condition, details)
 * - Modern Geometric Executive Signature Banner:
 *   - Circular avatar framed by crescent geometric accent arc & dashed orbit ring
 *   - Executive Name in bold uppercase + Job Role in royal blue/accent
 *   - Airplane / Tagline badge pill ("Designing Experiences • Enterprise Solutions")
 *   - 2x2 Contact details with icons (Phone, Email, Website, Address)
 *   - Company Logo with tagline & 4 round social badges (Facebook, LinkedIn, WhatsApp, Instagram)
 * - Sub-footer legal compliance & copyright
 */
export function generateFormat4Html(
  profile: EmailDepartmentProfile,
  content: {
    clientName?: string;
    message: string;
    subject?: string;
    inquiryId?: number | string;
    service?: string;
    referenceBadge?: string | null;
    showReferenceBadge?: boolean;
  }
): string {
  const accent = profile.accentColor || "#0052FF";
  const name = profile.signatureName || profile.name || "Tariq Mahmood";
  const role = profile.signatureRole || profile.department || "Chief Technical Director";
  const company = profile.signatureCompany || "CREED TECH";
  const tagline = profile.signatureTagline || "Enterprise Engineering & Industrial Systems";
  const phone = profile.phone || "+92 321 9204488";
  const email = profile.email || "solutions@creed-tech.com";
  const website = profile.signatureWebsite || "https://creed-tech.com";
  const websiteDisplay = website.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  const address = profile.address || "Office #02, Main Shopping Center, Sheikhupura, PK";
  const avatar =
    profile.signatureAvatar ||
    profile.sidebarLogo ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
  const companyLogo = profile.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png";

  const fbUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "facebook")?.url ||
    "https://facebook.com/creedtechnology";
  const liUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "linkedin")?.url ||
    "https://linkedin.com/company/creedtech";
  const waUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "whatsapp")?.url ||
    (profile.phone
      ? `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`
      : "https://wa.me/923219204488");
  const igUrl =
    profile.sidebarSocialLinks?.find((s) => s.platform === "instagram")?.url ||
    "https://instagram.com/creed.technologiess";

  const profileShowRef = profile.showReferenceBadge !== false;
  const displayBadge =
    content.showReferenceBadge === false || (!content.showReferenceBadge && !profileShowRef)
      ? null
      : content.referenceBadge !== undefined
      ? (content.referenceBadge && content.referenceBadge.trim() ? content.referenceBadge.trim() : null)
      : profile.referenceBadgeText
      ? profile.referenceBadgeText.replace("{id}", String(content.inquiryId || "34"))
      : content.inquiryId
      ? `REF #${content.inquiryId}`
      : "EXECUTIVE TRANSMISSION";

  const headingHtml = content.subject
    ? `<h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em;">${content.subject}</h2>`
    : "";

  const formattedBody = content.message
    .split("\n")
    .map((line) =>
      line.trim() === ""
        ? "<br/>"
        : `<p style="margin: 0 0 12px 0; line-height: 1.7; color: #334155; font-size: 13.5px;">${line}</p>`
    )
    .join("");

  // Items from mediaItems or fallback to defaults
  let items: EmailMediaItem[] = [];
  if (Array.isArray(profile.mediaItems) && profile.mediaItems.length > 0) {
    items = profile.mediaItems;
  } else if (profile.videoThumbnail || profile.videoUrl) {
    items = [
      {
        id: "item-default",
        type: profile.mediaType || "image",
        title: profile.videoTitle || "Executive Precision Unit",
        mediaUrl: profile.videoUrl,
        thumbnailUrl: profile.videoThumbnail || profile.videoUrl,
        year: profile.mediaYear || "2024",
        condition: profile.mediaCondition || "★★★★★",
        specs: profile.mediaSpecs || "Precision Equipment • Verified Specification",
        details: profile.mediaDetails,
        linkUrl: profile.videoUrl,
      },
    ];
  } else {
    items = [
      {
        id: "item-default-1",
        type: "image",
        title: "CNC Miller 5X High Precision",
        thumbnailUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
        year: "2024",
        condition: "★★★★★",
        specs: "5-Axis High Speed Machining Center with Heidenhain TNC 640 Controller",
      },
      {
        id: "item-default-2",
        type: "image",
        title: "Fiber Laser Cutting System 12kW",
        thumbnailUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=600&auto=format&fit=crop",
        year: "2024",
        condition: "★★★★★",
        specs: "Industrial Grade Laser Cutting Bed with Automated Material Feeding",
      },
    ];
  }

  // Format 1 style 2-column catalog cards
  const renderGridCell = (item: EmailMediaItem) => {
    const isItemVideo = item.type === "video";
    const itemImg = item.thumbnailUrl || item.mediaUrl || "";
    const itemUrl = buildItemViewerUrl(item, profile);

    return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); text-align: left; height: 100%;">
      <tr>
        <td style="padding: 0; background-color: #f8fafc; text-align: center; position: relative;">
          <a href="${itemUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none; position: relative;">
            <img src="${itemImg}" alt="${item.title || 'Offer'}" style="width: 100%; height: 135px; object-fit: cover; display: block;" />
            ${
              Array.isArray(item.galleryUrls) && item.galleryUrls.length > 1
                ? `<div style="position: absolute; top: 6px; right: 6px; background-color: rgba(15, 23, 42, 0.85); color: #ffffff; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.3px;">📷 ${item.galleryUrls.length} Photos</div>`
                : ""
            }
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 14px; background-color: #ffffff; vertical-align: top;">
          <a href="${itemUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #0f172a; display: block;">
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 4px; line-height: 1.3;">
              ${item.title || 'Equipment Offer'}
            </div>
          </a>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">
            ${item.year ? `<strong>Year:</strong> <span style="color: #0f172a; font-weight: 700;">${item.year}</span>&nbsp;&nbsp;` : ''}
            ${item.condition ? `<span style="color: #f59e0b; font-weight: 700;">${item.condition}</span>` : ''}
          </div>
          ${
            item.specs
              ? `<div style="font-size: 10px; color: #475569; background: #f8fafc; padding: 5px 8px; border-radius: 4px; margin-bottom: 8px; line-height: 1.35; font-family: monospace;">${item.specs}</div>`
              : ""
          }
          <div style="text-align: right; padding-top: 6px; border-top: 1px solid #f8fafc;">
            <a href="${itemUrl}" target="_blank" rel="noopener noreferrer" style="color: #0052FF; font-size: 11px; font-weight: 700; text-decoration: none;">
              ${isItemVideo ? '▶ Play Video ↗' : 'View Details ↗'}
            </a>
          </div>
        </td>
      </tr>
    </table>
    `;
  };

  const rows: string[] = [];
  for (let i = 0; i < items.length; i += 2) {
    const item1 = items[i];
    const item2 = items[i + 1];

    rows.push(`
      <tr>
        <td width="50%" valign="top" style="padding: 6px;">
          ${renderGridCell(item1)}
        </td>
        <td width="50%" valign="top" style="padding: 6px;">
          ${item2 ? renderGridCell(item2) : '&nbsp;'}
        </td>
      </tr>
    `);
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject || 'Creed Tech Executive Dispatch'}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 660px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);">
          <!-- 1. TOP HEADER BAR -->
          <tr>
            <td style="background-color: #0A192F; padding: 20px 28px; border-bottom: 3px solid ${accent};">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" valign="middle">
                    <div style="font-size: 18px; font-weight: 900; letter-spacing: 0.08em; color: #ffffff;">
                      CREED <span style="color: #0052FF;">TECH</span>
                    </div>
                    <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8; margin-top: 3px; font-weight: 600;">
                      ${profile.department || "Enterprise Operations Desk"}
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    ${
                      displayBadge
                        ? `<span style="display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); color: #bae6fd; font-size: 10.5px; font-weight: 700; font-family: monospace;">${displayBadge}</span>`
                        : "&nbsp;"
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 2. MESSAGE BODY -->
          <tr>
            <td style="padding: 28px 28px 12px 28px; background-color: #ffffff;">
              ${headingHtml}
              <div style="font-size: 14px; color: #1e293b; line-height: 1.7;">
                ${formattedBody}
              </div>
            </td>
          </tr>

          <!-- 3. FEATURED EQUIPMENT SHOWCASE CARDS (FORMAT 1 MULTI-ROW GRID) -->
          ${
            items.length > 0
              ? `
          <tr>
            <td style="padding: 12px 22px 20px 22px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 6px;">
                <tr>
                  <td align="left" style="font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.08em;">
                    ⚙️ Featured Machinery &amp; Technical Catalog
                  </td>
                  <td align="right" style="font-size: 10px; font-weight: 700; color: #0052FF;">
                    ${items.length} Units Available
                  </td>
                </tr>
              </table>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                ${rows.join("")}
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- 4. MODERN GEOMETRIC EXECUTIVE SIGNATURE BANNER (MATCHING REFERENCE IMAGE) -->
          <tr>
            <td style="padding: 8px 22px 24px 22px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 24px rgba(10, 25, 47, 0.07);">
                <!-- Horizon Wave Band -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0A192F 0%, #0052FF 65%, #00A3FF 100%); height: 30px; padding: 0 16px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" height="30">
                      <tr>
                        <td align="left" style="font-size: 8.5px; font-weight: 800; color: #ffffff; letter-spacing: 0.15em; text-transform: uppercase;">
                          ★ Official Executive Transmission &bull; Direct Desk
                        </td>
                        <td align="right" style="font-size: 8.5px; font-weight: 700; color: #bae6fd; font-family: monospace;">
                          ${profile.department}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Main 3-Column Banner Row -->
                <tr>
                  <td style="padding: 18px 20px; background-color: #ffffff;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <!-- Col 1: Avatar with Crescent Accent Arc & Dashed Orbit -->
                        <td width="92" valign="middle" align="center" style="padding-right: 16px;">
                          <div style="width: 78px; height: 78px; border-radius: 50%; padding: 4px; background: linear-gradient(135deg, #0052FF 0%, #0A192F 85%); border: 2px dashed #00A3FF; text-align: center; margin: 0 auto; box-shadow: 0 4px 14px rgba(0, 82, 255, 0.22);">
                            <img src="${avatar}" alt="${name}" width="78" height="78" style="width: 78px; height: 78px; border-radius: 50%; object-fit: cover; display: block;" />
                          </div>
                        </td>

                        <!-- Col 2: Name, Designation, Tagline Pill & 2x2 Contacts -->
                        <td valign="middle" style="padding-right: 14px; border-right: 1px solid #f1f5f9;">
                          <div style="font-size: 16px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.03em; line-height: 1.2;">
                            ${name}
                          </div>
                          <div style="font-size: 11px; font-weight: 800; color: #0052FF; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px;">
                            ${role}
                          </div>
                          <div style="margin-top: 4px; margin-bottom: 7px;">
                            <span style="display: inline-block; padding: 2px 10px; background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 9999px; font-size: 9px; font-weight: 700; color: #1E40AF;">
                              ✈ ${tagline}
                            </span>
                          </div>

                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="font-size: 11px; color: #334155; line-height: 1.5;">
                            <tr>
                              <td style="padding: 2px 12px 2px 0;">
                                <span style="color: #0052FF; font-weight: bold; margin-right: 3px;">📞</span>
                                <a href="tel:${phone}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${phone}</a>
                              </td>
                              <td style="padding: 2px 0;">
                                <span style="color: #0052FF; font-weight: bold; margin-right: 3px;">✉️</span>
                                <a href="mailto:${email}" style="color: #0052FF; text-decoration: none; font-weight: 600;">${email}</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 2px 12px 2px 0;">
                                <span style="color: #0052FF; font-weight: bold; margin-right: 3px;">🌐</span>
                                <a href="${website}" target="_blank" rel="noopener noreferrer" style="color: #0052FF; text-decoration: none; font-weight: 600;">${websiteDisplay}</a>
                              </td>
                              <td style="padding: 2px 0;">
                                <span style="color: #0052FF; font-weight: bold; margin-right: 3px;">📍</span>
                                <span style="color: #64748b;">${address}</span>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <!-- Col 3: Company Logo & Social Badges -->
                        <td width="124" valign="middle" align="center" style="padding-left: 12px;">
                          <div style="text-align: center; margin-bottom: 8px;">
                            <img src="${companyLogo}" alt="Logo" width="34" height="34" style="max-height: 34px; object-fit: contain; margin-bottom: 3px;" />
                            <div style="font-size: 12px; font-weight: 900; color: #0A192F; letter-spacing: 0.05em;">
                              CREED <span style="color: #0052FF;">TECH</span>
                            </div>
                            <div style="font-size: 7.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.12em;">
                              ENTERPRISE
                            </div>
                          </div>

                          <!-- 4 Social Badges -->
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="display: inline-table; margin: 0 auto;">
                            <tr>
                              <td style="padding: 0 2px;">
                                <a href="${fbUrl}" target="_blank" rel="noopener noreferrer" title="Facebook" style="display: inline-block; width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #0A192F; text-align: center; text-decoration: none; vertical-align: middle;">
                                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='10' height='10' fill='%23ffffff'%3E%3Cpath d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E" alt="Facebook" width="10" height="10" style="display: inline-block; vertical-align: middle; border: 0;" />
                                </a>
                              </td>
                              <td style="padding: 0 2px;">
                                <a href="${liUrl}" target="_blank" rel="noopener noreferrer" title="LinkedIn" style="display: inline-block; width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #0A192F; text-align: center; text-decoration: none; vertical-align: middle;">
                                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='10' height='10' fill='%23ffffff'%3E%3Cpath d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'/%3E%3C/svg%3E" alt="LinkedIn" width="10" height="10" style="display: inline-block; vertical-align: middle; border: 0;" />
                                </a>
                              </td>
                              <td style="padding: 0 2px;">
                                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" title="WhatsApp" style="display: inline-block; width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #0A192F; text-align: center; text-decoration: none; vertical-align: middle;">
                                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='10' height='10' fill='%23ffffff'%3E%3Cpath d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z'/%3E%3C/svg%3E" alt="WhatsApp" width="10" height="10" style="display: inline-block; vertical-align: middle; border: 0;" />
                                </a>
                              </td>
                              <td style="padding: 0 2px;">
                                <a href="${igUrl}" target="_blank" rel="noopener noreferrer" title="Instagram" style="display: inline-block; width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #0A192F; text-align: center; text-decoration: none; vertical-align: middle;">
                                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='10' height='10' fill='%23ffffff'%3E%3Cpath d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/%3E%3C/svg%3E" alt="Instagram" width="10" height="10" style="display: inline-block; vertical-align: middle; border: 0;" />
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 5. SUB-FOOTER -->
          <tr>
            <td style="background-color: #f8fafc; padding: 16px 28px; border-top: 1px solid #e2e8f0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" style="font-size: 10px; color: #94a3b8;">
                    &copy; ${new Date().getFullYear()} Creed Tech Enterprise Solutions. All rights reserved.
                  </td>
                  <td align="right" style="font-size: 10px; color: #94a3b8; font-family: monospace;">
                    Verified Industrial Compliance
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateEmailHtml(
  profile: EmailDepartmentProfile,
  content: {
    clientName?: string;
    message: string;
    subject?: string;
    inquiryId?: number | string;
    service?: string;
    referenceBadge?: string | null;
    showReferenceBadge?: boolean;
  }
): string {
  // Determine template format
  const format: EmailFormatType =
    profile.formatType ||
    (profile.sidebarLogo || profile.galleryRows || profile.sidebarSocialLinks
      ? "format-executive-signature"
      : "format-catalog");

  if (format === "format-executive-signature") {
    return generateFormat2Html(profile, content);
  }
  if (format === "format-announcement") {
    return generateFormat3Html(profile, content);
  }
  if (format === "format-minimal") {
    return generateFormat4Html(profile, content);
  }
  const accent = profile.accentColor || "#FF6B00";
  const textColor = profile.textColor || "#1e293b";
  const bgColor = profile.backgroundColor || "#ffffff";
  const mediaPos = profile.mediaPosition || "center";
  const mediaAlign = profile.mediaAlignment || "center";
  const headerStyle = profile.headerStyle || "dark";
  const headerAlign = profile.headerAlignment || (profile.headerStyle === "centered" ? "center" : "left");
  const contentAlign = profile.contentAlignment || "left";

  const profileShowRef = profile.showReferenceBadge !== false;
  const displayBadge =
    content.showReferenceBadge === false || (!content.showReferenceBadge && !profileShowRef)
      ? null
      : content.referenceBadge !== undefined
      ? (content.referenceBadge && content.referenceBadge.trim() ? content.referenceBadge.trim() : null)
      : profile.referenceBadgeText
      ? profile.referenceBadgeText.replace("{id}", String(content.inquiryId || "34"))
      : content.inquiryId
      ? `REF #${content.inquiryId}`
      : "VERIFIED DESK";

  const textAlignStyle =
    contentAlign === "center"
      ? "text-align: center;"
      : contentAlign === "right"
      ? "text-align: right;"
      : "text-align: left;";

  const headingHtml = content.subject
    ? `<h2 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 800; color: ${textColor}; ${textAlignStyle}">${content.subject}</h2>`
    : "";

  const formattedBody = content.message
    .split("\n")
    .map((line) =>
      line.trim() === ""
        ? "<br/>"
        : `<p style="margin: 0 0 12px 0; line-height: 1.65; color: ${textColor}; ${textAlignStyle}">${line}</p>`
    )
    .join("");

  const alignMargin =
    mediaAlign === "left"
      ? "margin: 22px 0; max-width: 520px;"
      : mediaAlign === "right"
      ? "margin: 22px 0 22px auto; max-width: 520px;"
      : "margin: 24px auto; max-width: 100%;";

  // Support multiple items (catalog grid) or fallback to single media
  let items: EmailMediaItem[] = [];
  if (Array.isArray(profile.mediaItems) && profile.mediaItems.length > 0) {
    items = profile.mediaItems;
  } else if (profile.videoThumbnail || profile.videoUrl) {
    items = [
      {
        id: "item-default",
        type: profile.mediaType || "image",
        title: profile.videoTitle || "Featured Equipment / Overview",
        mediaUrl: profile.videoUrl,
        thumbnailUrl: profile.videoThumbnail || profile.videoUrl,
        year: profile.mediaYear,
        condition: profile.mediaCondition,
        specs: profile.mediaSpecs,
        details: profile.mediaDetails,
        linkUrl: profile.videoUrl,
      },
    ];
  }

  let mediaCardHtml = "";

  if (items.length === 1) {
    const single = items[0];
    const isSingleVideo = single.type === "video";
    const singleImg = single.thumbnailUrl || single.mediaUrl || "";
    const destinationUrl = buildItemViewerUrl(single, profile);

    if (singleImg) {
      if (!isSingleVideo) {
        // Machinez.de single catalog/offer card
        mediaCardHtml = `
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="${alignMargin} background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); text-align: left;">
          <tr>
            <td style="padding: 0; background-color: #f8fafc; text-align: center;">
              <a href="${destinationUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none;">
                <img src="${singleImg}" alt="${single.title || 'Offer Equipment'}" style="width: 100%; max-height: 260px; object-fit: cover; display: block;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; background-color: #ffffff;">
              <a href="${destinationUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #0f172a;">
                <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
                  ${single.title || 'Featured Specification & Equipment'}
                </div>
              </a>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 10px;">
                <tr>
                  ${single.year ? `<td style="font-size: 12px; color: #64748b; padding-right: 16px;"><strong>Year:</strong> <span style="color: #0f172a; font-weight: 700;">${single.year}</span></td>` : ''}
                  ${single.condition ? `<td style="font-size: 12px; color: #64748b;"><strong>Condition:</strong> <span style="color: #f59e0b; font-weight: 700;">${single.condition}</span></td>` : ''}
                </tr>
              </table>
              ${single.specs ? `
                <div style="font-size: 11px; color: #475569; background-color: #f1f5f9; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; line-height: 1.5; font-family: monospace;">
                  ${single.specs}
                </div>
              ` : ''}
              <div style="text-align: right; padding-top: 8px; border-top: 1px solid #f1f5f9;">
                <a href="${destinationUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 7px 16px; background-color: ${accent}; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 6px;">
                  View Picture &amp; Details ↗
                </a>
              </div>
            </td>
          </tr>
        </table>
        `;
      } else {
        // Playable Video presentation card with Play button overlay
        mediaCardHtml = `
        <div style="${alignMargin} background: #0f172a; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; text-align: left;">
          <a href="${destinationUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none; position: relative;">
            <div style="position: relative; background: #000000; text-align: center;">
              <img src="${singleImg}" alt="${single.title || 'Watch Video'}" style="width: 100%; max-height: 220px; object-fit: cover; display: block; opacity: 0.85;" />
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 56px; height: 56px; background: ${accent}; border-radius: 50%; box-shadow: 0 4px 14px rgba(0,0,0,0.4); text-align: center; line-height: 56px;">
                <span style="color: #ffffff; font-size: 22px; margin-left: 3px; line-height: 56px; display: inline-block;">▶</span>
              </div>
            </div>
            <div style="padding: 12px 16px; background: #0b1120; color: #f8fafc; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: space-between;">
              <span>${single.title || 'Watch Video Presentation'}</span>
              <span style="color: ${accent}; font-size: 12px; font-weight: 700;">▶ Play Video (Autoplays) ↗</span>
            </div>
          </a>
        </div>
        `;
      }
    }
  } else if (items.length > 1) {
    // Machinez.de style multi-item card grid (2 columns table for maximum email client reliability)
    const renderGridCell = (item: EmailMediaItem) => {
      const isItemVideo = item.type === "video";
      const itemImg = item.thumbnailUrl || item.mediaUrl || "";
      const itemUrl = buildItemViewerUrl(item, profile);

      return `
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); text-align: left; height: 100%;">
        <tr>
          <td style="padding: 0; background-color: #f8fafc; text-align: center; position: relative;">
            <a href="${itemUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none; position: relative;">
              <img src="${itemImg}" alt="${item.title || 'Offer'}" style="width: 100%; height: 130px; object-fit: cover; display: block;" />
              ${
                Array.isArray(item.galleryUrls) && item.galleryUrls.length > 1
                  ? `<div style="position: absolute; top: 6px; right: 6px; background-color: rgba(15, 23, 42, 0.85); color: #ffffff; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.3px;">📷 ${item.galleryUrls.length} Photos</div>`
                  : ""
              }
              ${
                isItemVideo
                  ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 38px; height: 38px; background: ${accent}; border-radius: 50%; text-align: center; line-height: 38px; color: #ffffff; font-size: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">▶</div>`
                  : ""
              }
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; background-color: #ffffff; vertical-align: top;">
            <a href="${itemUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #0f172a; display: block;">
              <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 4px; line-height: 1.3;">
                ${item.title || 'Equipment Offer'}
              </div>
            </a>
            <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">
              ${item.year ? `<strong>Year:</strong> <span style="color: #0f172a; font-weight: 700;">${item.year}</span>&nbsp;&nbsp;` : ''}
              ${item.condition ? `<span style="color: #f59e0b; font-weight: 700;">${item.condition}</span>` : ''}
            </div>
            ${
              item.specs
                ? `<div style="font-size: 10px; color: #475569; background: #f8fafc; padding: 4px 6px; border-radius: 4px; margin-bottom: 6px; line-height: 1.3; font-family: monospace;">${item.specs}</div>`
                : ""
            }
            <div style="text-align: right; padding-top: 6px; border-top: 1px solid #f8fafc;">
              <a href="${itemUrl}" target="_blank" rel="noopener noreferrer" style="color: ${accent}; font-size: 11px; font-weight: 700; text-decoration: none;">
                ${isItemVideo ? '▶ Play Video ↗' : 'View Details ↗'}
              </a>
            </div>
          </td>
        </tr>
      </table>
      `;
    };

    const rows: string[] = [];
    for (let i = 0; i < items.length; i += 2) {
      const item1 = items[i];
      const item2 = items[i + 1];

      rows.push(`
        <tr>
          <td width="50%" valign="top" style="padding: 5px;">
            ${renderGridCell(item1)}
          </td>
          <td width="50%" valign="top" style="padding: 5px;">
            ${item2 ? renderGridCell(item2) : '&nbsp;'}
          </td>
        </tr>
      `);
    }

    mediaCardHtml = `
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="${alignMargin} margin-top: 16px; margin-bottom: 16px;">
        ${rows.join("")}
      </table>
    `;
  }

  const isLightHeader = headerStyle === "light";
  const headerBg = isLightHeader ? "#ffffff" : "#090d16";
  const headerTextColor = isLightHeader ? "#090d16" : "#ffffff";
  const headerSubtextColor = isLightHeader ? "#64748b" : "#94a3b8";
  const badgeBg = isLightHeader ? "#f1f5f9" : "rgba(255,255,255,0.08)";
  const badgeBorder = isLightHeader ? "#e2e8f0" : "rgba(255,255,255,0.15)";
  const badgeText = isLightHeader ? "#475569" : "#cbd5e1";

  const headerHtml =
    headerAlign === "center"
      ? `
      <td style="background: ${headerBg}; padding: 28px 32px; border-bottom: 3px solid ${accent}; text-align: center;">
        <div style="font-size: 22px; font-weight: 900; letter-spacing: 0.1em; color: ${headerTextColor};">
          CREED <span style="color: ${accent};">TECH</span>
        </div>
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: ${headerSubtextColor}; margin-top: 4px; font-weight: 600;">
          ${profile.department}
        </div>
        ${
          displayBadge
            ? `
        <div style="margin-top: 10px;">
          <span style="display: inline-block; padding: 3px 12px; border-radius: 20px; background: ${badgeBg}; border: 1px solid ${badgeBorder}; color: ${badgeText}; font-size: 10px; font-weight: 600;">
            ${displayBadge}
          </span>
        </div>
        `
            : ""
        }
      </td>
      `
      : headerAlign === "right"
      ? `
      <td style="background: ${headerBg}; padding: 24px 32px; border-bottom: 3px solid ${accent};">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="left" valign="middle">
              ${
                displayBadge
                  ? `
              <span style="display: inline-block; padding: 4px 10px; border-radius: 20px; background: ${badgeBg}; border: 1px solid ${badgeBorder}; color: ${badgeText}; font-size: 11px; font-weight: 600;">
                ${displayBadge}
              </span>
              `
                  : "&nbsp;"
              }
            </td>
            <td align="right" valign="middle">
              <div style="font-size: 20px; font-weight: 900; letter-spacing: 0.08em; color: ${headerTextColor};">
                CREED <span style="color: ${accent};">TECH</span>
              </div>
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: ${headerSubtextColor}; margin-top: 4px; font-weight: 600;">
                ${profile.department}
              </div>
            </td>
          </tr>
        </table>
      </td>
      `
      : `
      <td style="background: ${headerBg}; padding: 24px 32px; border-bottom: 3px solid ${accent};">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="left" valign="middle">
              <div style="font-size: 20px; font-weight: 900; letter-spacing: 0.08em; color: ${headerTextColor};">
                CREED <span style="color: ${accent};">TECH</span>
              </div>
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: ${headerSubtextColor}; margin-top: 4px; font-weight: 600;">
                ${profile.department}
              </div>
            </td>
            <td align="right" valign="middle">
              ${
                displayBadge
                  ? `
              <span style="display: inline-block; padding: 4px 10px; border-radius: 20px; background: ${badgeBg}; border: 1px solid ${badgeBorder}; color: ${badgeText}; font-size: 11px; font-weight: 600;">
                ${displayBadge}
              </span>
              `
                  : "&nbsp;"
              }
            </td>
          </tr>
        </table>
      </td>
      `;

  const isDarkBg = bgColor.toLowerCase() === "#000000" || bgColor.toLowerCase().startsWith("#0") || bgColor.toLowerCase().startsWith("#1");
  const footerBg = isDarkBg ? "rgba(255,255,255,0.04)" : "#f8fafc";
  const footerText = isDarkBg ? "#94a3b8" : "#64748b";
  const footerBorder = isDarkBg ? "rgba(255,255,255,0.1)" : "#e2e8f0";

  // FORMAT 1: CATALOG & EQUIPMENT OFFER CARDS
  // Renders 2-column machine/card catalog + clean corporate sign-off.
  // DOES NOT render large executive avatar signature card.
  let middleSectionHtml = "";
    const cleanCatalogSignoff = `
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #e2e8f0;">
        <tr>
          <td style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.03em;">
            ${profile.name}
          </td>
        </tr>
        <tr>
          <td style="font-size: 11px; font-weight: 700; color: ${accent}; padding-top: 2px;">
            ${profile.department}
          </td>
        </tr>
        ${
          profile.phone
            ? `<tr><td style="font-size: 11px; color: #64748b; padding-top: 4px;"><strong>Direct:</strong> <a href="tel:${profile.phone}" style="color: #334155; text-decoration: none;">${profile.phone}</a></td></tr>`
            : ""
        }
        <tr>
          <td style="font-size: 11px; color: #64748b; padding-top: 2px;">
            <strong>Email:</strong> <a href="mailto:${profile.email}" style="color: ${accent}; text-decoration: none; font-weight: 600;">${profile.email}</a>
          </td>
        </tr>
      </table>
    `;

    if (mediaPos === "top") {
      middleSectionHtml = `
        ${mediaCardHtml}
        ${headingHtml}
        ${formattedBody}
        ${cleanCatalogSignoff}
      `;
    } else if (mediaPos === "bottom") {
      middleSectionHtml = `
        ${headingHtml}
        ${formattedBody}
        ${cleanCatalogSignoff}
        ${mediaCardHtml}
      `;
    } else {
      // Default "center"
      middleSectionHtml = `
        ${headingHtml}
        ${formattedBody}
        ${mediaCardHtml}
        ${cleanCatalogSignoff}
      `;
    }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject || 'Creed Tech Enterprise'}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background: ${bgColor}; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
    <!-- HEADER -->
    <tr>
      ${headerHtml}
    </tr>

    <!-- EMAIL BODY -->
    <tr>
      <td style="padding: 32px 32px 24px 32px; background-color: ${bgColor}; color: ${textColor}; font-size: 14px; line-height: 1.65;">
        ${middleSectionHtml}
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background: ${footerBg}; padding: 24px 32px; border-top: 1px solid ${footerBorder}; font-size: 11px; color: ${footerText}; line-height: 1.6; ${textAlignStyle}">
        <div style="margin-bottom: 12px;">
          ${profile.address ? `<strong>Headquarters:</strong> ${profile.address}<br/>` : ''}
          <strong>Web:</strong> <a href="https://creed-tech.com" target="_blank" style="color: ${accent}; text-decoration: none; font-weight: 600;">https://creed-tech.com</a>
          &nbsp;•&nbsp;
          <strong>Portal:</strong> <a href="https://creed-tech.com/contact" target="_blank" style="color: ${footerText}; text-decoration: underline;">Contact Desk</a>
        </div>

        ${profile.footerDisclaimer ? `
          <div style="font-size: 10px; color: #94a3b8; border-top: 1px solid ${footerBorder}; padding-top: 10px; margin-top: 10px;">
            ${profile.footerDisclaimer}
          </div>
        ` : ''}
      </td>
    </tr>
  </table>
</body>
</html>`;
}
