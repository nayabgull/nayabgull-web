import { describe, expect, it } from "vitest";

import { snapshot } from "@/lib/seo/snapshot.ts";

import { GOOD_HTML } from "./fixtures.ts";

describe("snapshot", () => {
  const page = snapshot(GOOD_HTML);

  it("reads head tags", () => {
    expect(page.lang).toBe("en-US");
    expect(page.title).toBe("Web Development Agency for US Businesses | Nayab Gull");
    expect(page.canonical).toBe("https://nayabgull.com");
    expect(page.meta["og:type"]).toBe("website");
    expect(page.jsonLd).toHaveLength(1);
  });

  it("reads headings, images and links inside main only", () => {
    expect(page.headings.map((h) => h.level)).toEqual([1, 2, 3]);
    expect(page.images[0]).toEqual({
      alt: "Lead flow diagram",
      width: "800",
      height: "400",
      fromNextImage: true,
    });
    expect(page.links.map((l) => l.href)).not.toContain("/about");
    expect(page.links).toHaveLength(3);
  });

  it("drops header, nav and footer from body copy", () => {
    expect(page.bodyText).not.toContain("Footer text");
    expect(page.bodyText).not.toContain("About");
    expect(page.paragraphs).toContain("Fast pages.");
  });

  it("falls back to body when there is no main and handles a bare document", () => {
    const bare = snapshot("<html><body><a href='/a'>A</a><p>Hi.</p></body></html>");
    expect(bare.links).toEqual([{ href: "/a", text: "A" }]);
    expect(bare.title).toBeUndefined();
    expect(bare.lang).toBeUndefined();
  });
});
