import type { Metadata } from "next";

import { ContactPage } from "@/components/sections/ContactPage.tsx";
import { contact, CONTACT_EMAIL } from "@/content/contact.ts";
import { pageMetadata } from "@/lib/seo/metadata.ts";

export function generateMetadata(): Metadata {
  return pageMetadata({ ...contact.meta, path: "/contact" });
}

export default function Page() {
  return <ContactPage content={contact} email={CONTACT_EMAIL} />;
}
