import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { parsePageParam } from "@/lib/blog/paths.ts";

import { BlogHub, hubMetadata } from "../../_hub.tsx";

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePageParam((await params).page);
  return page ? hubMetadata(page) : {};
}

export default async function Page({ params }: Props) {
  const page = parsePageParam((await params).page);
  if (!page) notFound();
  return <BlogHub page={page} />;
}
