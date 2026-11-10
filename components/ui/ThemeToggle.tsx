"use client";

import { oppositeTheme, resolveTheme, THEME_STORAGE_KEY } from "@/lib/theme.ts";

import { MoonIcon, SunIcon } from "./icons.tsx";

/** Flips light/dark and stores the choice. Icons switch through CSS, so the server markup is stable. */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current = resolveTheme(
      root.dataset.theme,
      window.matchMedia("(prefers-color-scheme: light)").matches,
    );
    const next = oppositeTheme(current);
    root.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the theme still switches for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors"
    >
      <MoonIcon className="theme-icon-moon size-5" />
      <SunIcon className="theme-icon-sun size-5" />
    </button>
  );
}
