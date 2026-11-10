import { describe, expect, it } from "vitest";

import { pageMetadata } from "@/lib/seo/metadata.ts";

describe("pageMetadata", () => {
  const meta = pageMetadata({ title: "T | Nayab Gull", description: "D", path: "/" });

  it("sets an absolute title, description and self canonical", () => {
    expect(meta.title).toEqual({ absolute: "T | Nayab Gull" });
    expect(meta.description).toBe("D");
    expect(meta.alternates?.canonical).toBe("https://nayabgull.com");
  });

  it("fills Open Graph and the Twitter card", () => {
    expect(meta.openGraph).toMatchObject({
      title: "T | Nayab Gull",
      url: "https://nayabgull.com",
      type: "website",
      locale: "en_US",
    });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("uses the path for nested pages and allows articles", () => {
    const post = pageMetadata({ title: "x", description: "y", path: "/blog/a/", type: "article" });
    expect(post.alternates?.canonical).toBe("https://nayabgull.com/blog/a");
    expect(post.openGraph).toMatchObject({ type: "article" });
  });
});
