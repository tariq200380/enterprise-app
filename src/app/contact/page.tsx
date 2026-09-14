import type { Metadata } from "next";
import ContactModernDesign from "@/components/contact/ContactModernDesign";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Solutions Architecture & Engineering | Creed Tech",
  description:
    "Schedule a technical consultation with Creed Tech's principal solutions architects. Direct engineering scoping and zero-obligation NDA protection.",
};

export default function ContactPage() {
  return <ContactModernDesign />;
}
