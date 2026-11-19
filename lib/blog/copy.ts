/** Fixed copy of the blog list pages. Post copy is written by Nayab in the CMS, never here. */
export const BLOG_COPY = {
  hub: {
    name: "Blog",
    title: "Blog: GoHighLevel, AI Automation and Web Guides | Nayab Gull",
    description:
      "Plain-English guides on GoHighLevel, AI automation and web development for US small businesses. Read a guide, then book a free strategy call.",
    intro:
      "Plain-English guides on GoHighLevel, AI automation and web development for US small businesses. Each post answers one question and links to the service it belongs to.",
  },
  pageTitle: (page: number): string => `Blog, Page ${page}: Guides and Articles | Nayab Gull`,
  categoryExtras: [": Guides and Articles", ": Guides and Articles From the Blog"],
  tagExtras: [": Tagged Posts", ": Tagged Posts on the Blog"],
  authorExtras: [": Author and Articles", ": Author Profile and Articles"],
} as const;

/** "Posts tagged …" description, 120–155 characters where the tag allows. */
export function tagDescription(tag: string): string {
  return `Every post on the Nayab Gull blog tagged "${tag}": practical guides on GoHighLevel, AI automation and websites for US small businesses.`;
}

export function authorDescription(name: string): string {
  return `${name} writes about GoHighLevel, AI automation and web development for US small businesses. Read the bio and every published post here.`;
}
