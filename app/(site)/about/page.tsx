import type { Metadata } from "next";

import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { about as content } from "@/content/pages/about.ts";
import { contentMetadata } from "@/lib/seo/page-metadata.ts";

export function generateMetadata(): Metadata {
  return contentMetadata(content);
}

export default function Page() {
  return <ContentPage content={content} />;
}
