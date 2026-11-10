import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { About } from "@/components/sections/About.tsx";
import { SiteFooter } from "@/components/sections/SiteFooter.tsx";
import { SiteHeader } from "@/components/sections/SiteHeader.tsx";
import { home } from "@/content/home.ts";

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    <span role="img" aria-label={props.alt} data-src={props.src} />
  ),
}));

describe("layout sections", () => {
  it("header has a skip link, primary nav and the theme toggle", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
      "href",
      home.hero.primaryCta.href,
    );
    expect(screen.getByRole("button", { name: /theme/ })).toBeInTheDocument();
  });

  it("footer shows the brand and the current year", () => {
    render(<SiteFooter />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("about is text only: no photo and no initials avatar", () => {
    const { container } = render(<About about={home.about} />);
    expect(screen.getByRole("heading", { level: 2, name: home.about.heading })).toBeInTheDocument();
    expect(container.querySelector("img, [role='img']")).toBeNull();
    expect(container.textContent).not.toMatch(/\bNG\b/);
  });
});
