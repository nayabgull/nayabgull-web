"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

/**
 * Sets data-inview="true" while its content is on screen. CSS uses that to start an animation when
 * the visitor scrolls to it and to pause it when they scroll away. Without JavaScript (or without
 * IntersectionObserver) the attribute stays "false" and the content simply shows its final state.
 */
export function InView({
  children,
  className = "",
  threshold = 0.35,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { threshold },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div ref={ref} data-inview={inView} className={className}>
      {children}
    </div>
  );
}
