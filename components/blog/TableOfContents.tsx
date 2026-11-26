import type { TocEntry } from "@/lib/blog/toc.ts";

/** In-page links to every H2. Anchors only, so it adds no internal page links. */
export function TableOfContents({ entries }: { entries: readonly TocEntry[] }) {
  if (entries.length < 2) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="my-8 rounded-lg border border-border bg-surface p-5"
    >
      <p className="font-display font-semibold">On this page</p>
      <ol className="mt-2 list-decimal pl-5 text-small">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="text-link inline-flex min-h-11 items-center">
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
