import Link from "next/link";

/** Visible breadcrumb trail: Home › current page. The BreadcrumbList JSON-LD uses the same names. */
export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-small text-text-muted">
      <ol className="flex flex-wrap items-center gap-x-2">
        <li>
          <Link href="/" className="text-link inline-flex min-h-11 min-w-11 items-center">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
