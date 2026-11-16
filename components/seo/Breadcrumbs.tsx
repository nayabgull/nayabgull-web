import Link from "next/link";

const LINK = "text-link inline-flex min-h-11 min-w-11 items-center";

/**
 * Visible breadcrumb trail: Home › (hub ›) current page. The BreadcrumbList JSON-LD uses the same
 * names.
 */
export function Breadcrumbs({
  current,
  parent,
  centered = false,
}: {
  current: string;
  parent?: { name: string; path: string };
  centered?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-small text-text-muted">
      <ol className={`flex flex-wrap items-center gap-x-2 ${centered ? "justify-center" : ""}`}>
        <li>
          <Link prefetch={false} href="/" className={LINK}>
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        {parent ? (
          <>
            <li>
              <Link prefetch={false} href={parent.path} className={LINK}>
                {parent.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
          </>
        ) : null}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
