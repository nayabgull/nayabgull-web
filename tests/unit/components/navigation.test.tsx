import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/sections/SiteFooter.tsx";
import { SiteHeader } from "@/components/sections/SiteHeader.tsx";
import { Disclosure } from "@/components/ui/Disclosure.tsx";
import { CALL_CTA } from "@/content/home.ts";
import {
  BLOG_LINK,
  FOOTER_NAV,
  footerNav,
  isNavGroup,
  navHrefs,
  PRIMARY_NAV,
  primaryNav,
} from "@/content/navigation.ts";
import { ALL_ROUTES } from "@/lib/seo/routes.ts";

afterEach(cleanup);

describe("navigation data", () => {
  it("links only to real pages, never to a section of the homepage", () => {
    const hrefs = navHrefs();
    expect(hrefs.filter((href) => href.includes("#"))).toEqual([]);
    expect(hrefs.filter((href) => !ALL_ROUTES.includes(href))).toEqual([]);
  });

  it("links every public page from the footer, the legal pages included", () => {
    const footer = FOOTER_NAV.flatMap((group) => group.links.map((link) => link.href));
    expect(ALL_ROUTES.filter((route) => !footer.includes(route))).toEqual([]);
  });

  it("has the agreed header items: four dropdowns, About and Contact", () => {
    expect(PRIMARY_NAV.map((item) => item.label)).toEqual([
      "Services",
      "AI Automation",
      "GoHighLevel",
      "Industries",
      "About",
      "Contact",
    ]);
    const groups = PRIMARY_NAV.filter(isNavGroup);
    expect(groups.map((group) => group.label)).toEqual([
      "Services",
      "AI Automation",
      "GoHighLevel",
      "Industries",
    ]);
  });

  it("puts each hub first in its dropdown, followed by every child page of that hub", () => {
    const group = (label: string) =>
      PRIMARY_NAV.filter(isNavGroup).find((item) => item.label === label)?.links ?? [];
    for (const [label, hub] of [
      ["AI Automation", "/ai-automation-agency"],
      ["GoHighLevel", "/gohighlevel-agency"],
      ["Industries", "/industries"],
    ] as const) {
      const hrefs = group(label).map((link) => link.href);
      expect(hrefs[0]).toBe(hub);
      const children = ALL_ROUTES.filter((route) => route.startsWith(`${hub}/`));
      expect(children.filter((child) => !hrefs.includes(child))).toEqual([]);
    }
  });

  it("lists every page at most once per menu", () => {
    for (const item of PRIMARY_NAV.filter(isNavGroup)) {
      const hrefs = item.links.map((link) => link.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
    const header = PRIMARY_NAV.flatMap((item) =>
      isNavGroup(item) ? item.links.map((link) => link.href) : [item.href],
    );
    expect(new Set(header).size).toBe(header.length);
  });
});

describe("SiteHeader", () => {
  it("renders every header link in the desktop nav and in the mobile menu", () => {
    render(<SiteHeader />);
    for (const name of ["Primary", "Menu"]) {
      const nav = screen.getByRole("navigation", { name });
      for (const item of PRIMARY_NAV) {
        for (const link of isNavGroup(item) ? item.links : [item]) {
          expect(within(nav).getByRole("link", { name: link.label })).toHaveAttribute(
            "href",
            link.href,
          );
        }
      }
    }
    const menu = screen.getByRole("navigation", { name: "Menu" });
    expect(within(menu).getByRole("link", { name: CALL_CTA.label })).toHaveAttribute(
      "href",
      CALL_CTA.href,
    );
  });
});

describe("SiteFooter", () => {
  it("shows every footer group and link", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("navigation", { name: "Footer" });
    for (const group of FOOTER_NAV) {
      expect(footer).toHaveTextContent(group.title);
      for (const link of group.links) {
        expect(within(footer).getByRole("link", { name: link.label })).toHaveAttribute(
          "href",
          link.href,
        );
      }
    }
  });
});

describe("Disclosure", () => {
  function setup() {
    render(
      <div>
        <Disclosure summary="Services">
          <a href="#inside">Inside link</a>
        </Disclosure>
        <button type="button">Outside</button>
      </div>,
    );
    const details = screen.getByText("Services").closest("details");
    if (!details) throw new Error("no <details>");
    const open = () => {
      details.open = true;
    };
    return { details, open };
  }

  it("is a closed native disclosure by default", () => {
    const { details } = setup();
    expect(details.open).toBe(false);
    expect(details.querySelector("summary")).toHaveTextContent("Services");
  });

  it("closes on Escape and gives focus back to its button", () => {
    const { details, open } = setup();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(details.open).toBe(false);
    open();
    fireEvent.keyDown(document, { key: "Enter" });
    expect(details.open).toBe(true);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(details.open).toBe(false);
    expect(details.querySelector("summary")).toHaveFocus();
  });

  it("closes on a click or focus outside, and stays open for one inside", () => {
    const { details, open } = setup();
    open();
    fireEvent.pointerDown(screen.getByText("Inside link"));
    expect(details.open).toBe(true);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(details.open).toBe(false);
    open();
    fireEvent.focusIn(screen.getByRole("button", { name: "Outside" }));
    expect(details.open).toBe(false);
  });

  it("closes after a link inside it is followed", () => {
    const { details, open } = setup();
    open();
    fireEvent.click(screen.getByText("Services"));
    open();
    fireEvent.click(screen.getByText("Inside link"));
    expect(details.open).toBe(false);
  });
});

describe("Blog link", () => {
  it("is hidden until a post is published", () => {
    expect(primaryNav(false)).toBe(PRIMARY_NAV);
    expect(footerNav(false)).toBe(FOOTER_NAV);
    render(
      <>
        <SiteHeader />
        <SiteFooter />
      </>,
    );
    expect(screen.queryByRole("link", { name: "Blog" })).toBeNull();
  });

  it("sits before About in the header and in the footer's Company group once a post is live", () => {
    expect(primaryNav(true).map((item) => item.label)).toEqual([
      "Services",
      "AI Automation",
      "GoHighLevel",
      "Industries",
      "Blog",
      "About",
      "Contact",
    ]);
    expect(footerNav(true).find((group) => group.title === "Company")?.links).toContainEqual(
      BLOG_LINK,
    );
    render(
      <>
        <SiteHeader showBlog />
        <SiteFooter showBlog />
      </>,
    );
    for (const name of ["Primary", "Menu", "Footer"]) {
      const nav = screen.getByRole("navigation", { name });
      expect(within(nav).getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    }
  });
});
