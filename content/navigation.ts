import type { Link } from "./home.ts";

/**
 * Header and footer links. Hash links start with "/" so they also work from inner pages.
 * A page joins these lists in the PR that builds it; never link to a page that does not exist yet.
 */
export const PRIMARY_NAV: readonly Link[] = [
  { label: "GoHighLevel", href: "/gohighlevel-agency" },
  { label: "AI Automation", href: "/ai-automation-agency" },
  { label: "Web Design", href: "/services/web-design-development" },
  { label: "Industries", href: "/#industries" },
  { label: "FAQ", href: "/#faq" },
];

export interface FooterGroup {
  title: string;
  links: readonly Link[];
}

export const FOOTER_NAV: readonly FooterGroup[] = [
  {
    title: "Services",
    links: [
      { label: "GoHighLevel agency", href: "/gohighlevel-agency" },
      { label: "AI automation agency", href: "/ai-automation-agency" },
      { label: "Web design and development", href: "/services/web-design-development" },
      { label: "Hire a full stack developer", href: "/hire-full-stack-developer" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Roofing and HVAC websites", href: "/industries/roofing-hvac-website-design" },
    ],
  },
];
