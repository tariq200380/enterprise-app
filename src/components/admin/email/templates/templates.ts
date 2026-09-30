import {
  EmailDepartmentProfile,
  EmailMediaItem,
  EmailFormatType,
  GalleryRowItem,
  GalleryRow,
  DEFAULT_FORMAT2_SOCIAL_LINKS,
  DEFAULT_FORMAT2_GALLERY_ROWS,
  DEFAULT_FORMAT5_SOCIAL_LINKS,
  generateEmailHtml,
} from "@/lib/email-types";

/**
 * Creates a new default business department email profile.
 */
export function createDefaultDepartmentProfile(
  count: number,
  existingEmails: Set<string>
): EmailDepartmentProfile {
  let counter = count;
  let nextEmail = `desk${counter}@creed-tech.com`;
  while (existingEmails.has(nextEmail.toLowerCase())) {
    counter++;
    nextEmail = `desk${counter}@creed-tech.com`;
  }
  const nextName = `Creed Tech Desk ${counter}`;

  return {
    id: "dept_" + Date.now().toString(36),
    name: nextName,
    email: nextEmail,
    department: "Client Services",
    accentColor: "#FF6B00",
    phone: "+1 (888) 492-7330",
    address:
      "Creed Tech Global Headquarters, 450 Innovation Parkway, San Francisco, CA",
    videoUrl: "https://creed-tech.com",
    videoThumbnail:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
    videoTitle: "Watch: Architecture Overview",
    footerDisclaimer:
      "Creed Tech Sovereign Enterprise Systems. All rights reserved.",
    defaultSubjectTemplate:
      "Re: Creed Tech Discovery - {service} [Inquiry #{id}]",
    defaultMessageTemplate: `Dear {client_name},\n\nThank you for reaching out to Creed Tech regarding "{service}".\n\nBest regards,\nCreed Tech Team`,
  };
}

/**
 * Generates default format fields when switching active template format in Visual Designer.
 */
export function getFormatDefaultFields(
  formatId: EmailFormatType,
  current: EmailDepartmentProfile
): Partial<EmailDepartmentProfile> {
  if (formatId === "format-executive-signature") {
    return {
      sidebarHeading: current.sidebarHeading || current.name || "CREED TECH",
      sidebarLogo:
        current.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png",
      sidebarAddress:
        current.sidebarAddress ||
        current.address ||
        "Industrial Area Phase 2, Karachi",
      sidebarPhone:
        current.sidebarPhone || current.phone || "+92 300 1234567",
      sidebarSocialLinks:
        current.sidebarSocialLinks && current.sidebarSocialLinks.length > 0
          ? current.sidebarSocialLinks
          : DEFAULT_FORMAT2_SOCIAL_LINKS,
      featuredMainPicUrl:
        current.featuredMainPicUrl ||
        (current.mediaItems && current.mediaItems[0]?.mediaUrl) ||
        current.videoThumbnail ||
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      featuredMainPicText:
        current.featuredMainPicText ||
        "Next-Generation Industrial Machinery & Enterprise Engineering Solutions",
      galleryRows:
        current.galleryRows && current.galleryRows.length > 0
          ? current.galleryRows
          : DEFAULT_FORMAT2_GALLERY_ROWS,
    };
  }

  if (formatId === "format-minimal") {
    return {
      signatureName:
        current.signatureName || current.name || "Tariq Mahmood",
      signatureRole:
        current.signatureRole ||
        current.department ||
        "Chief Technical Director",
      signatureTagline:
        current.signatureTagline ||
        "Enterprise Engineering & Industrial Systems",
      signatureAvatar:
        current.signatureAvatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      sidebarLogo:
        current.sidebarLogo || "https://creed-tech.com/icons/icon-192x192.png",
      sidebarSocialLinks:
        current.sidebarSocialLinks && current.sidebarSocialLinks.length > 0
          ? current.sidebarSocialLinks
          : DEFAULT_FORMAT2_SOCIAL_LINKS,
    };
  }

  return {};
}

/**
 * Returns a new default media offer card.
 */
export function createDefaultMediaCard(
  count: number,
  specsMode: "same" | "separate" = "separate",
  firstItem?: EmailMediaItem
): EmailMediaItem {
  return {
    id: `item-${Date.now()}-${count}`,
    type: "image",
    title:
      specsMode === "same" && firstItem?.title
        ? firstItem.title
        : `Machine / Product Offer #${count}`,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    mediaUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    year: specsMode === "same" && firstItem?.year ? firstItem.year : "2018",
    condition:
      specsMode === "same" && firstItem?.condition
        ? firstItem.condition
        : "★★★★☆",
    specs:
      specsMode === "same" && firstItem?.specs
        ? firstItem.specs
        : "Fully inspected, standard configuration",
    details:
      specsMode === "same" && firstItem?.details ? firstItem.details : "",
  };
}

/**
 * Helper to extract or initialize media items array for an email profile.
 */
export function getEditingMediaItems(p: EmailDepartmentProfile): EmailMediaItem[] {
  if (Array.isArray(p.mediaItems) && p.mediaItems.length > 0) {
    return p.mediaItems;
  }
  if (p.videoThumbnail || p.videoUrl || p.videoTitle) {
    return [
      {
        id: "item-1",
        type: p.mediaType || "image",
        title: p.videoTitle || "Heidelberg CD102-6+LX",
        thumbnailUrl: p.videoThumbnail || p.videoUrl || "",
        mediaUrl: p.videoUrl || p.videoThumbnail || "",
        year: p.mediaYear || "2001",
        condition: p.mediaCondition || "★★★★☆",
        specs: p.mediaSpecs || "4 Colors, Coater, 15000 SPH, Autoplate",
        details: p.mediaDetails || "",
      },
    ];
  }
  return [
    {
      id: "item-1",
      type: "image",
      title: "Heidelberg CD102-6+LX",
      thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      year: "2001",
      condition: "★★★★☆",
      specs: "4 Colors, Coater, 15000 SPH, Autoplate",
      details: "Clean cylinders, tested and ready for production",
    },
  ];
}

/**
 * Copies the styled HTML email template to user's system clipboard for direct pasting into Gmail/Outlook.
 */
export async function copyEmailStyledHtml(
  profile: EmailDepartmentProfile,
  showToast?: (msg: string, type?: "success" | "error") => void
): Promise<void> {
  const htmlContent = generateEmailHtml(profile, {
    clientName: "Enterprise Client",
    message: (profile.defaultMessageTemplate || "Hello Client,\n\nThank you for reaching out.")
      .replace("{client_name}", "Enterprise Client")
      .replace("{service}", "Enterprise Solutions")
      .replace("{id}", "101"),
    subject: (profile.defaultSubjectTemplate || "Re: Creed Tech Discovery")
      .replace("{service}", "Enterprise Solutions")
      .replace("{id}", "101"),
    inquiryId: 101,
    service: "Enterprise Solutions",
  });

  try {
    if (typeof ClipboardItem !== "undefined" && navigator?.clipboard?.write) {
      const blobHtml = new Blob([htmlContent], { type: "text/html" });
      const blobText = new Blob([profile.defaultMessageTemplate || ""], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        }),
      ]);
    } else if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(htmlContent);
    }
    if (showToast) {
      showToast("✓ Styled layout copied to clipboard! Paste (Ctrl+V) directly into Gmail or Outlook.");
    }
  } catch {
    if (showToast) showToast("Copied to clipboard.");
  }
}
