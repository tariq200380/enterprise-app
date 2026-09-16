import type { Metadata } from "next";
import { getContactSettings } from "@/lib/contact-data";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Solutions Architecture & Engineering | Creed Tech",
  description:
    "Schedule a technical consultation with Creed Tech's principal solutions architects. Direct engineering scoping and zero-obligation NDA protection.",
};

export default async function ContactPage() {
  const settings = await getContactSettings();

  return <ContactPageClient settings={settings} />;
}
