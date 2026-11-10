import type { ReactNode } from "react";

/** Max content width 1440 px, fluid side gutter; backgrounds stay full-bleed outside it. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-(--container-site) px-gutter ${className}`}>
      {children}
    </div>
  );
}
