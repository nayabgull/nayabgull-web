import type { ReactNode } from "react";

import { Container } from "./Container.tsx";

/** A page section labelled by its H2, with the standard vertical rhythm. */
export function Section({
  id,
  labelledBy,
  children,
  className = "",
}: {
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-section ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
