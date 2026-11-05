import type { HTMLAttributes, ReactNode } from "react";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "li" | "article";
  shine?: boolean;
  hover?: boolean;
  children: ReactNode;
  [data: `data-${string}`]: string | boolean | undefined;
};

/** Glass surface with an optional soft shine sweep (transform/opacity only, off with reduced motion). */
export function GlassCard({
  as: Tag = "div",
  shine = false,
  hover = true,
  className = "",
  children,
  ...rest
}: GlassCardProps) {
  return (
    <Tag className={`glass ${hover ? "card-hover" : ""} ${className}`} {...rest}>
      {shine ? <span className="shine" aria-hidden="true" /> : null}
      {children}
    </Tag>
  );
}
