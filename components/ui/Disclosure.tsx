"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

/**
 * A native <details> disclosure for the header: the Services dropdown and the mobile menu. It opens
 * with a click, Enter or Space with zero JavaScript. This component only adds the closing: on
 * Escape (focus goes back to the button), on a click or focus outside, and after a link is followed.
 */
export function Disclosure({
  summary,
  children,
  className = "",
  summaryClassName = "",
  label,
}: {
  summary: ReactNode;
  /** Accessible name when the summary shows only an icon. */
  label?: string;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;
    const close = () => {
      details.open = false;
    };
    const onOutside = (event: Event) => {
      if (details.open && event.target instanceof Node && !details.contains(event.target)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !details.open) return;
      close();
      details.querySelector("summary")?.focus();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) close();
    };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    document.addEventListener("keydown", onKey);
    details.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      document.removeEventListener("keydown", onKey);
      details.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={ref} className={`disclosure group ${className}`}>
      <summary aria-label={label} className={`cursor-pointer list-none ${summaryClassName}`}>
        {summary}
      </summary>
      {children}
    </details>
  );
}
