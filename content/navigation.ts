import type { Link } from "./home.ts";

/**
 * Header and footer links. Every href is a real page (lib/seo/routes.ts), never a "/#section".
 * A page joins these lists in the PR that builds it; tests/unit/navigation.test.ts fails on a link
 * to a page that does not exist.
 */
export interface NavGroup {
  label: string;
  /** Shown as a dropdown in the header. */
  links: readonly Link[];
}

export type NavItem = Link | NavGroup;

export const isNavGroup = (item: NavItem): item is NavGroup => "links" in item;

export const PRIMARY_NAV: readonly NavItem[] = [
  {
    label: "Services",
    links: [
      { label: "AI agent development", href: "/ai-automation-agency/ai-agent-development" },
      { label: "Web design and development", href: "/services/web-design-development" },
      { label: "Hire a full stack developer", href: "/hire-full-stack-developer" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  { label: "AI Automation", href: "/ai-automation-agency" },
  { label: "GoHighLevel", href: "/gohighlevel-agency" },
  {
    // A dropdown until the /industries hub page exists; it lists every industry page that is live.
    label: "Industries",
    links: [
      { label: "Roofing and HVAC websites", href: "/industries/roofing-hvac-website-design" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface FooterGroup {
  title: string;
  links: readonly Link[];
}

/** The footer links every public page, the legal pages included. */
export const FOOTER_NAV: readonly FooterGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Web design and development", href: "/services/web-design-development" },
      { label: "GoHighLevel agency", href: "/gohighlevel-agency" },
      { label: "AI automation agency", href: "/ai-automation-agency" },
      { label: "AI agent development", href: "/ai-automation-agency/ai-agent-development" },
      { label: "Hire a full stack developer", href: "/hire-full-stack-developer" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Roofing and HVAC websites", href: "/industries/roofing-hvac-website-design" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/** Every href in the header and the footer, without duplicates. */
export function navHrefs(): string[] {
  const header = PRIMARY_NAV.flatMap((item) =>
    isNavGroup(item) ? item.links.map((link) => link.href) : [item.href],
  );
  const footer = FOOTER_NAV.flatMap((group) => group.links.map((link) => link.href));
  return [...new Set([...header, ...footer])];
}

/** "Blog" joins the header and footer only while at least one post is published. */
export const BLOG_LINK: Link = { label: "Blog", href: "/blog" };

/** Header items, with "Blog" before "About" when the blog has a published post. */
export function primaryNav(showBlog: boolean): readonly NavItem[] {
  if (!showBlog) return PRIMARY_NAV;
  const about = PRIMARY_NAV.findIndex((item) => !isNavGroup(item) && item.href === "/about");
  return [...PRIMARY_NAV.slice(0, about), BLOG_LINK, ...PRIMARY_NAV.slice(about)];
}

/** Footer groups, with "Blog" in Company when the blog has a published post. */
export function footerNav(showBlog: boolean): readonly FooterGroup[] {
  if (!showBlog) return FOOTER_NAV;
  return FOOTER_NAV.map((group) =>
    group.title === "Company" ? { ...group, links: [...group.links, BLOG_LINK] } : group,
  );
}
