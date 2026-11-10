import type { ReactNode } from "react";

export interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: ReactNode;
}

/**
 * Centered eyebrow + H2 + short intro (at most 60 characters per line). The section's content goes
 * below it. `id` lands on the H2 so the section can use aria-labelledby.
 */
export function SectionHeader({ id, eyebrow, heading, intro }: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-small font-semibold tracking-[0.16em] text-accent uppercase">
        {eyebrow}
      </span>
      <h2 id={id} className="mt-3 text-h2 leading-tight font-bold">
        {heading}
      </h2>
      {intro ? (
        <p className="mx-auto mt-5 max-w-[60ch] text-lead text-text-muted">{intro}</p>
      ) : null}
    </div>
  );
}
