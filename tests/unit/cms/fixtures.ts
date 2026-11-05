import type { PublishCandidate } from "@/lib/cms/publish-rules.ts";

const text = (value: string) => ({ type: "text", text: value, version: 1 });
const block = (type: string, children: unknown[], extra: Record<string, unknown> = {}) => ({
  type,
  version: 1,
  children,
  ...extra,
});

export const heading = (tag: string, value: string) => block("heading", [text(value)], { tag });
export const paragraph = (value: string) => block("paragraph", [text(value)]);

export const lexical = (...children: unknown[]) => ({ root: block("root", children) });

/** About 1,260 words of plain copy: enough for a service page. */
const PADDING = Array.from({ length: 90 }, () =>
  paragraph("I check every page and send you a short plan. It takes a day."),
);

/** A document that passes every publish rule for /services/web-design-development. */
export const GOOD_SERVICE: PublishCandidate = {
  collection: "services",
  slug: "web-design-development",
  section: "services",
  title: "Website Design Company That Books More Calls",
  seo: {
    title: "Website Design Company for US Small Business | Nayab Gull",
    metaDescription:
      "Website design company for US small businesses. Fast sites that turn visitors into booked calls. Book a free strategy call with Nayab Gull today.",
    primaryKeyword: "website design company",
    canonical: "https://nayabgull.com/services/web-design-development",
  },
  content: lexical(
    paragraph("You get a clear plan and a fixed price before I write any code."),
    heading("h2", "Why hire a website design company like mine"),
    ...PADDING,
  ),
};
