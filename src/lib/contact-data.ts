import { cache } from "react";
import { query } from "@/lib/db";
import {
  DEFAULT_WEBSITE_SETTINGS,
  WebsiteSettingsData,
  ContactSettingsData,
} from "@/components/admin/settings/types";

export const getContactSettings = cache(async (): Promise<ContactSettingsData> => {
  const fallback = DEFAULT_WEBSITE_SETTINGS.contactSettings;

  try {
    const res = await query(
      "SELECT value FROM website_settings WHERE key = 'global_config' LIMIT 1"
    );

    if (res.rows.length === 0) {
      return fallback;
    }

    const rawValue = res.rows[0].value;
    const data: Partial<WebsiteSettingsData> =
      typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;

    if (!data || !data.contactSettings) {
      return fallback;
    }

    const cs = data.contactSettings;

    return {
      heroBadge: cs.heroBadge || fallback.heroBadge,
      heroHeadline: cs.heroHeadline || fallback.heroHeadline,
      heroDescription: cs.heroDescription || fallback.heroDescription,
      metric1Label: cs.metric1Label || fallback.metric1Label,
      metric1Value: cs.metric1Value || fallback.metric1Value,
      metric2Label: cs.metric2Label || fallback.metric2Label,
      metric2Value: cs.metric2Value || fallback.metric2Value,
      metric3Label: cs.metric3Label || fallback.metric3Label,
      metric3Value: cs.metric3Value || fallback.metric3Value,

      discoveryBadge: cs.discoveryBadge || fallback.discoveryBadge,
      discoveryTitle: cs.discoveryTitle || fallback.discoveryTitle,
      discoveryDescription: cs.discoveryDescription || fallback.discoveryDescription,
      discoveryBookingEmail: cs.discoveryBookingEmail || fallback.discoveryBookingEmail,
      officialInquiriesEmail: cs.officialInquiriesEmail || fallback.officialInquiriesEmail,
      telemetryPhone: cs.telemetryPhone || fallback.telemetryPhone,
      whatsAppDisplay: cs.whatsAppDisplay || fallback.whatsAppDisplay,
      whatsAppLinkUrl: cs.whatsAppLinkUrl || fallback.whatsAppLinkUrl,

      stepsBadge: cs.stepsBadge || fallback.stepsBadge,
      stepsTitle: cs.stepsTitle || fallback.stepsTitle,
      stepsDescription: cs.stepsDescription || fallback.stepsDescription,
      onboardingSteps:
        Array.isArray(cs.onboardingSteps) && cs.onboardingSteps.length > 0
          ? cs.onboardingSteps
          : fallback.onboardingSteps,

      faqs:
        Array.isArray(cs.faqs) && cs.faqs.length > 0
          ? cs.faqs
          : fallback.faqs,

      hubsTitle: cs.hubsTitle || fallback.hubsTitle,
      globalHubs:
        Array.isArray(cs.globalHubs) && cs.globalHubs.length > 0
          ? cs.globalHubs
          : fallback.globalHubs,

      rfpBannerTitle: cs.rfpBannerTitle || fallback.rfpBannerTitle,
      rfpBannerDescription: cs.rfpBannerDescription || fallback.rfpBannerDescription,
      rfpButtonText: cs.rfpButtonText || fallback.rfpButtonText,
      rfpTargetEmail: cs.rfpTargetEmail || fallback.rfpTargetEmail,
    };
  } catch (error) {
    console.error("Error fetching contact settings from DB:", error);
    return fallback;
  }
});
