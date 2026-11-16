import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoonPage } from "@/components/sections/ComingSoonPage.tsx";
import { comingSoon } from "@/content/coming-soon.ts";
import { pageMetadata } from "@/lib/seo/metadata.ts";
import { isComingSoon } from "@/lib/site-mode.ts";

/**
 * Served at "/" through a rewrite in proxy.ts while SITE_MODE is "coming-soon". In live mode this
 * route does not exist (404), and in coming-soon mode proxy.ts redirects /coming-soon to "/", so the
 * page never has a second URL. The canonical is "/", the homepage address.
 */
export function generateMetadata(): Metadata {
  if (!isComingSoon(process.env)) notFound();
  return pageMetadata({
    title: comingSoon.meta.title,
    description: comingSoon.meta.description,
    path: "/",
  });
}

export default function Page() {
  if (!isComingSoon(process.env)) notFound();
  return <ComingSoonPage content={comingSoon} />;
}
