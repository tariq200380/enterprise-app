import type { Metadata } from "next";
import { getContactSettings } from "@/lib/contact-data";
import ContactPageClient from "@/components/contact/ContactPageClient";

// Step 3: Short cache for Contact page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact Solutions Architecture & Engineering | Creed Tech",
  description:
    "Schedule a technical consultation with Creed Tech's principal solutions architects. Direct engineering scoping and zero-obligation NDA protection.",
};

export default async function ContactPage() {
  const settings = await getContactSettings();

  return <ContactPageClient settings={settings} />;
}
