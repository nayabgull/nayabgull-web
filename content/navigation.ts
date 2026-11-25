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
      { label: "n8n automation agency", href: "/ai-automation-agency/n8n-automation-agency" },
      {
        label: "AI receptionist",
        href: "/ai-automation-agency/ai-receptionist-for-small-business",
      },
      {
        label: "Business process automation",
        href: "/ai-automation-agency/business-process-automation-services",
      },
      { label: "GoHighLevel workflows", href: "/gohighlevel-agency/workflows-automation" },
      { label: "Custom CRM development", href: "/gohighlevel-agency/custom-crm-development" },
      { label: "AI chatbot development", href: "/ai-automation-agency/ai-chatbot-development" },
      { label: "GoHighLevel API integrations", href: "/gohighlevel-agency/api-integrations" },
      { label: "Web design and development", href: "/services/web-design-development" },
      { label: "Next.js and React development", href: "/services/nextjs-react-development" },
      { label: "WordPress development", href: "/services/wordpress-development" },
      { label: "Shopify development", href: "/services/shopify-development" },
      { label: "Hire a full stack developer", href: "/hire-full-stack-developer" },
      { label: "Hire a SaaS developer", href: "/hire-saas-developer" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  { label: "AI Automation", href: "/ai-automation-agency" },
  { label: "GoHighLevel", href: "/gohighlevel-agency" },
  {
    // The hub first, then every industry page that is live.
    label: "Industries",
    links: [
      { label: "All industries", href: "/industries" },
      { label: "Roofing and HVAC websites", href: "/industries/roofing-hvac-website-design" },
      { label: "Contractor websites", href: "/industries/contractor-website-design" },
      { label: "Law firm websites", href: "/industries/law-firm-website-design" },
      { label: "Real estate websites", href: "/industries/real-estate-website-design" },
      {
        label: "Dental and medical websites",
        href: "/industries/dental-medical-website-design",
      },
      { label: "Real estate websites", href: "/industries/real-estate-website-design" },
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
      { label: "WordPress development", href: "/services/wordpress-development" },
      { label: "Shopify development", href: "/services/shopify-development" },
      { label: "GoHighLevel agency", href: "/gohighlevel-agency" },
      { label: "GoHighLevel workflows", href: "/gohighlevel-agency/workflows-automation" },
      { label: "Custom CRM development", href: "/gohighlevel-agency/custom-crm-development" },
      { label: "GoHighLevel API integrations", href: "/gohighlevel-agency/api-integrations" },
      { label: "AI automation agency", href: "/ai-automation-agency" },
      { label: "AI agent development", href: "/ai-automation-agency/ai-agent-development" },
      { label: "n8n automation agency", href: "/ai-automation-agency/n8n-automation-agency" },
      {
        label: "AI receptionist",
        href: "/ai-automation-agency/ai-receptionist-for-small-business",
      },
      {
        label: "Business process automation",
        href: "/ai-automation-agency/business-process-automation-services",
      },
      { label: "Next.js and React development", href: "/services/nextjs-react-development" },
      { label: "AI chatbot development", href: "/ai-automation-agency/ai-chatbot-development" },
      { label: "Hire a full stack developer", href: "/hire-full-stack-developer" },
      { label: "Hire a SaaS developer", href: "/hire-saas-developer" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "All industries", href: "/industries" },
      { label: "Roofing and HVAC websites", href: "/industries/roofing-hvac-website-design" },
      { label: "Contractor websites", href: "/industries/contractor-website-design" },
      { label: "Law firm websites", href: "/industries/law-firm-website-design" },
      { label: "Real estate websites", href: "/industries/real-estate-website-design" },
      {
        label: "Dental and medical websites",
        href: "/industries/dental-medical-website-design",
      },
      { label: "Real estate websites", href: "/industries/real-estate-website-design" },
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
