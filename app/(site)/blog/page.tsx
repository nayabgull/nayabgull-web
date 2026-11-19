import type { Metadata } from "next";

import { BlogHub, hubMetadata } from "./_hub.tsx";

export function generateMetadata(): Promise<Metadata> {
  return hubMetadata(1);
}

export default function Page() {
  return <BlogHub page={1} />;
}
