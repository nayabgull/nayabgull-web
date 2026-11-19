import Link from "next/link";

import { listPagePath } from "@/lib/blog/paths.ts";

const LINK = "text-link inline-flex min-h-11 items-center font-semibold";

/** Newer / older links between list pages. */
export function Pagination({
  base,
  page,
  totalPages,
}: {
  base: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between gap-4">
      {page > 1 ? (
        <Link href={listPagePath(base, page - 1)} prefetch={false} className={LINK}>
          Newer posts
        </Link>
      ) : (
        <span />
      )}
      <p className="text-small text-text-muted">
        Page {page} of {totalPages}
      </p>
      {page < totalPages ? (
        <Link href={listPagePath(base, page + 1)} prefetch={false} className={LINK}>
          Older posts
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
