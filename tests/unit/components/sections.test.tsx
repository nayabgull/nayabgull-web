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
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute(
      "href",
      home.hero.primaryCta.href,
    );
    expect(screen.getByRole("button", { name: /theme/ })).toBeInTheDocument();
  });

  it("footer shows the brand and the current year", () => {
    render(<SiteFooter />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("about shows the photo once one is set", () => {
    render(<About about={{ ...home.about, photo: "/images/nayab-gull.webp" }} />);
    expect(
      screen.getByRole("img", { name: "Nayab Gull, full-stack developer in Lahore, Pakistan" }),
    ).toHaveAttribute("data-src", "/images/nayab-gull.webp");
  });
});
