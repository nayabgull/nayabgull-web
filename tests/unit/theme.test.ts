import { runInNewContext } from "node:vm";

import { describe, expect, it } from "vitest";

import { isTheme, oppositeTheme, resolveTheme, THEME_INIT_SCRIPT } from "@/lib/theme.ts";

describe("theme helpers", () => {
  it("accepts only light and dark", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("blue")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });

  it("prefers the stored choice, then the system", () => {
    expect(resolveTheme("dark", true)).toBe("dark");
    expect(resolveTheme(undefined, true)).toBe("light");
    expect(resolveTheme("nonsense", false)).toBe("dark");
  });

  it("flips the theme", () => {
    expect(oppositeTheme("light")).toBe("dark");
    expect(oppositeTheme("dark")).toBe("light");
  });

  it("init script applies a stored theme and ignores bad values", () => {
    const run = (stored: string | null) => {
      document.documentElement.removeAttribute("data-theme");
      window.localStorage.clear();
      if (stored !== null) window.localStorage.setItem("theme", stored);
      runInNewContext(THEME_INIT_SCRIPT, { localStorage: window.localStorage, document });
      return document.documentElement.dataset.theme;
    };
    expect(run("light")).toBe("light");
    expect(run("evil")).toBeUndefined();
    expect(run(null)).toBeUndefined();
  });
});
