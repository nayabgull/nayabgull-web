import Link from "next/link";

/** Wordmark: gradient "NG" monogram + name. Text, not an image, so it stays sharp and themeable. */
export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center gap-3 rounded-md font-display font-bold"
    >
      <span
        aria-hidden="true"
        className="btn-primary grid size-9 place-items-center rounded-sm text-sm tracking-tight"
      >
        NG
      </span>
      <span className="text-lg tracking-tight">Nayab Gull</span>
    </Link>
  );
}
