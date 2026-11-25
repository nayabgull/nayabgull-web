import type { Metadata } from "next";

import { CategoryPage, categoryMetadata } from "./_category.tsx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return categoryMetadata((await params).slug, 1);
}

export default async function Page({ params }: Props) {
  return <CategoryPage slug={(await params).slug} page={1} />;
}
