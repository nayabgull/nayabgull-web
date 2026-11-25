import Link from "next/link";

import { hubFor } from "@/lib/blog/hubs.ts";

/** The link up to the post's hub page (seo.md §4: blog posts link up to their hub). */
export function HubLink({ hub }: { hub: string }) {
  const target = hubFor(hub);
  if (!target) return null;
  return (
    <p className="mt-10 rounded-lg border border-border bg-surface p-5">
      This guide is part of{" "}
      <Link href={target.value} prefetch={false} className="text-link font-semibold">
        {target.label}
      </Link>
      . Start there for the full service, pricing and process.
    </p>
  );
}
