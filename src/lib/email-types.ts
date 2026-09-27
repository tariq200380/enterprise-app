export interface EmailDepartmentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  accentColor: string;
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
  headerStyle?: "dark" | "light" | "centered";
  headerAlignment?: "left" | "center" | "right";
  contentAlignment?: "left" | "center" | "right";
  textColor?: string;
  backgroundColor?: string;
  showReferenceBadge?: boolean;
  referenceBadgeText?: string;
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

export const DEFAULT_EMAIL_PROFILES: EmailDepartmentProfile[] = [
  {
    id: "sales",
    name: "Creed Tech Enterprise Sales",
    email: "sales@creed-tech.com",
    department: "Enterprise Sales & Growth",
    accentColor: "#FF6B00",
    phone: "+1 (888) 492-7333",
    address: "Creed Tech Enterprise HQ, 450 Innovation Parkway, Suite 500, San Francisco, CA 94105",
    videoUrl: "https://creed-tech.com/portfolio",
    videoThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
    videoTitle: "Watch: Creed Tech Enterprise Architecture Overview (2 Mins)",
    footerDisclaimer: "This communication is confidential and intended solely for the recipient. Any unauthorized dissemination or duplication is strictly prohibited.",
    defaultSubjectTemplate: "Re: Creed Tech Enterprise Scoping & Solutions - {service} [Inquiry #{id}]",
    defaultMessageTemplate: `Dear {client_name},

Thank you for your interest in Creed Tech's {service}.

We have reviewed your project parameters and our solutions architecture team is prepared to present an enterprise engineering roadmap tailored to your workload specifications.

Attached to this correspondence is our capability overview. Please let us know your team's availability for a 25-minute technical discovery call this week.

Best regards,

Enterprise Sales & Strategy Desk
Creed Tech
Website: https://creed-tech.com`,
    isDefault: true,
    mediaPosition: "center",
    mediaAlignment: "center",
    headerStyle: "dark",
    contentAlignment: "left",
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
 * Generate full responsive branded HTML email layout for a department profile.
 * Supports configurable media position (top/center/bottom), alignment (left/center/right),
 * header style (dark/light/centered), and content alignment.
 */
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

  const videoCardHtml =
    profile.videoUrl && profile.videoThumbnail
      ? `
      <div style="${alignMargin} background: #0f172a; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; text-align: left;">
        <a href="${profile.videoUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none; position: relative;">
          <div style="position: relative; background: #000000; text-align: center;">
            <img src="${profile.videoThumbnail}" alt="${profile.videoTitle || 'Watch Video'}" style="width: 100%; max-height: 220px; object-fit: cover; display: block; opacity: 0.85;" />
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 56px; height: 56px; background: ${accent}; border-radius: 50%; box-shadow: 0 4px 14px rgba(0,0,0,0.4); text-align: center; line-height: 56px;">
              <span style="color: #ffffff; font-size: 22px; margin-left: 3px;">▶</span>
            </div>
          </div>
          <div style="padding: 12px 16px; background: #0b1120; color: #f8fafc; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: space-between;">
            <span>${profile.videoTitle || 'Watch Video Presentation'}</span>
            <span style="color: ${accent}; font-size: 12px;">Watch Video ↗</span>
          </div>
        </a>
      </div>
    `
      : "";

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

  const signatureHtml = `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid ${footerBorder};">
      <tr>
        <td align="${contentAlign === 'center' ? 'center' : contentAlign === 'right' ? 'right' : 'left'}" style="${textAlignStyle}" valign="middle">
          <div style="font-size: 14px; font-weight: 800; color: ${textColor};">
            ${profile.name}
          </div>
          <div style="font-size: 12px; color: ${accent}; font-weight: 600; margin-top: 2px;">
            Direct: <a href="mailto:${profile.email}" style="color: ${accent}; text-decoration: none;">${profile.email}</a>
            ${profile.phone ? ` • Tel: <a href="tel:${profile.phone}" style="color: ${footerText}; text-decoration: none;">${profile.phone}</a>` : ''}
          </div>
          <div style="font-size: 11px; color: ${footerText}; margin-top: 4px;">
            Enterprise Systems &amp; High-Reliability Architecture
          </div>
        </td>
      </tr>
    </table>
  `;

  // Position body and media card according to user's layout choice (Top, Center, Bottom)
  let middleSectionHtml = "";
  if (mediaPos === "top") {
    middleSectionHtml = `
      ${videoCardHtml}
      ${headingHtml}
      ${formattedBody}
      ${signatureHtml}
    `;
  } else if (mediaPos === "bottom") {
    middleSectionHtml = `
      ${headingHtml}
      ${formattedBody}
      ${signatureHtml}
      ${videoCardHtml}
    `;
  } else {
    // Default "center"
    middleSectionHtml = `
      ${headingHtml}
      ${formattedBody}
      ${videoCardHtml}
      ${signatureHtml}
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
