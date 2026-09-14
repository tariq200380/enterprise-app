import type { Metadata } from "next";
import { query } from "@/lib/db";
import { DEFAULT_WEBSITE_SETTINGS, WebsiteSettingsData } from "@/components/admin/settings/types";
import AboutModernDesign from "@/components/about/AboutModernDesign";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Creed Tech | Engineering Principles & Leadership",
  description:
    "Learn about Creed Tech's engineering principles, distributed architecture hubs, and commitment to sovereign enterprise software.",
};

async function getAboutData(): Promise<WebsiteSettingsData> {
  let settings = DEFAULT_WEBSITE_SETTINGS;

  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;

      settings = {
        ...settings,
        ...val,
      };
    }
  } catch (err) {
    console.error("Failed to load about page settings:", err);
  }

  return settings;
}

export default async function AboutPage() {
  const settings = await getAboutData();
  return <AboutModernDesign settings={settings} />;
}
