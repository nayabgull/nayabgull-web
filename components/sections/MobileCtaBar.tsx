"use client";

import { useEffect, useState } from "react";

import { STRATEGY_CALL_URL } from "@/content/home.ts";

/**
 * Small sticky bar on phones and tablets: "Get a quote" and "Book a call". It stays hidden while the
 * hero (which has both actions) or the closing quote section is on screen, so it never covers them.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = [...document.querySelectorAll("[data-cta-zone]")];
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    for (const target of targets) observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      hidden={!visible}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg px-gutter pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href="#quote"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-pill border border-border-strong bg-surface px-4 text-small font-semibold"
        >
          Get a quote
        </a>
        <a
          href={STRATEGY_CALL_URL}
          rel="noopener"
          className="btn-primary inline-flex min-h-11 flex-1 items-center justify-center rounded-pill px-4 text-small font-semibold"
        >
          Book a call
        </a>
      </div>
    </div>
  );
}
