"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render: (element: HTMLElement, options: { sitekey: string }) => unknown;
}

const api = (): TurnstileApi | undefined =>
  (window as unknown as { turnstile?: TurnstileApi }).turnstile;

/**
 * Cloudflare Turnstile spam check. The script loads only after the visitor first focuses the form
 * (`active`), never on page load, so it costs nothing for people who only read the page. The widget
 * adds its own hidden "cf-turnstile-response" field to the form. Space is reserved to avoid a shift.
 */
export function Turnstile({ siteKey, active }: { siteKey: string; active: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!active || rendered.current) return;
    const render = () => {
      const turnstile = api();
      if (!turnstile || !box.current || rendered.current) return;
      rendered.current = true;
      turnstile.render(box.current, { sitekey: siteKey });
    };
    if (api()) {
      render();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", render);
    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.append(script);
    }
    return () => {
      script.removeEventListener("load", render);
    };
  }, [active, siteKey]);

  return <div ref={box} className="min-h-[65px]" data-turnstile />;
}
