import type { ReactNode } from "react";

import { ArrowRightIcon } from "./icons.tsx";

export interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  className?: string;
}

const isExternal = (href: string): boolean => /^https?:\/\//.test(href);

const VARIANTS = {
  primary: "btn-primary",
  secondary: "border border-border-strong bg-surface text-text card-hover",
} as const;

/** Call-to-action link (never a <button>: it navigates). Always at least 44 px tall. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = <ArrowRightIcon className="size-5" />,
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      rel={isExternal(href) ? "noopener" : undefined}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 py-3 text-center font-semibold ${VARIANTS[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon}
    </a>
  );
}
