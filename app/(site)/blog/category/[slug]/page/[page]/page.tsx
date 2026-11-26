import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { parsePageParam } from "@/lib/blog/paths.ts";

import { CategoryPage, categoryMetadata } from "../../_category.tsx";

interface Props {
  params: Promise<{ slug: string; page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page } = await params;
  const number = parsePageParam(page);
  return number ? categoryMetadata(slug, number) : {};
}

export default async function Page({ params }: Props) {
  const { slug, page } = await params;
  const number = parsePageParam(page);
  if (!number) notFound();
  return <CategoryPage slug={slug} page={number} />;
}
