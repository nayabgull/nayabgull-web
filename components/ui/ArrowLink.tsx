import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRightIcon } from "./icons.tsx";

/** Standalone text link with an arrow. At least 44 px tall, so it is a full tap target. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-link inline-flex min-h-11 items-center gap-2 font-semibold ${className}`}
    >
      <span>{children}</span>
      <ArrowRightIcon className="size-4 shrink-0" />
    </Link>
  );
}
