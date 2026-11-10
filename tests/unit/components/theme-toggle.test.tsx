import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "@/components/ui/ThemeToggle.tsx";

function mockSystem(prefersLight: boolean) {
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: prefersLight }));
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    window.localStorage.clear();
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("switches from the system theme and stores the choice", () => {
    mockSystem(false);
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Switch between light and dark theme" });
    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("light");
    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("still switches when storage is blocked", () => {
    mockSystem(true);
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).toBe("dark");
    setItem.mockRestore();
  });
});
