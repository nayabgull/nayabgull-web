import type { Metadata } from "next";

import { HomePage } from "@/components/sections/HomePage.tsx";
import { home } from "@/content/home.ts";
import { pageMetadata } from "@/lib/seo/metadata.ts";

export function generateMetadata(): Metadata {
  return pageMetadata({ title: home.meta.title, description: home.meta.description, path: "/" });
}

export default function Home() {
  return <HomePage content={home} />;
}
