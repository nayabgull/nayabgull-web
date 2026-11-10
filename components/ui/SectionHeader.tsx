import type { ReactNode } from "react";

export interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: ReactNode;
  align?: "start" | "center";
}

/** Eyebrow + H2 (+ intro). `id` lands on the H2 so the section can use aria-labelledby. */
export function SectionHeader({
  id,
  eyebrow,
  heading,
  intro,
  align = "start",
}: SectionHeaderProps) {
  const centered = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-3xl ${centered}`}>
      <span className="text-small font-semibold tracking-[0.16em] text-accent uppercase">
        {eyebrow}
      </span>
      <h2 id={id} className="mt-3 text-h2 leading-tight font-bold">
        {heading}
      </h2>
      {intro ? <p className="mt-5 text-lead text-text-muted">{intro}</p> : null}
    </div>
  );
}
