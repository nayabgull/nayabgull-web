import type { PageType } from "./page-types.ts";

export interface KeywordEntry {
  url: string;
  pageType: PageType;
  primary: string;
  secondary: readonly string[];
}

/**
 * Mirror of docs/seo/keyword-map.md (lowercase, notes such as "($176)" removed, "(link only)" entries left out).
 * `pnpm audit:cannibalization` fails when the two drift apart.
 */
export const KEYWORDS: readonly KeywordEntry[] = [
  {
    url: "/",
    pageType: "home",
    primary: "web development agency",
    secondary: ["web development company", "custom web development company"],
  },
  {
    url: "/about",
    pageType: "about",
    primary: "nayab gull",
    secondary: [],
  },
  {
    url: "/pricing",
    pageType: "pricing",
    primary: "website development cost",
    secondary: ["cost of web design", "website design pricing", "web app development cost"],
  },
  {
    url: "/hire-full-stack-developer",
    pageType: "service",
    primary: "hire full stack developer",
    secondary: [
      "hire web developer",
      "hire website developer",
      "website designers for hire",
      "hire freelance web developer",
      "freelance web developer",
      "hire frontend developer",
    ],
  },
  {
    url: "/gohighlevel-agency",
    pageType: "hub",
    primary: "gohighlevel agency",
    secondary: [
      "gohighlevel expert",
      "hire gohighlevel expert",
      "crm and marketing automation",
      "crm automation services",
    ],
  },
  {
    url: "/gohighlevel-agency/workflows-automation",
    pageType: "service",
    primary: "gohighlevel workflows",
    secondary: ["crm automation", "automated crm system"],
  },
  {
    url: "/gohighlevel-agency/api-integrations",
    pageType: "service",
    primary: "gohighlevel api",
    secondary: ["crm integration", "webhook automation"],
  },
  {
    url: "/gohighlevel-agency/custom-crm-development",
    pageType: "service",
    primary: "custom crm development services",
    secondary: [
      "crm development services",
      "crm development company",
      "custom crm",
      "crm software development",
      "real estate developer crm",
    ],
  },
  {
    url: "/ai-automation-agency",
    pageType: "hub",
    primary: "ai automation agency",
    secondary: [
      "ai automation services",
      "ai workflow automation",
      "marketing automation agency",
      "business automation consultant",
      "ai integration services",
    ],
  },
  {
    url: "/ai-automation-agency/n8n-make-zapier",
    pageType: "service",
    primary: "n8n automation",
    secondary: [
      "n8n workflow",
      "n8n expert",
      "make com automation",
      "make com expert",
      "zapier workflow automation",
      "hire zapier expert",
      "zapier automation agency",
    ],
  },
  {
    url: "/ai-automation-agency/ai-chatbot-development",
    pageType: "service",
    primary: "ai chatbot development services",
    secondary: [
      "chatbot development services",
      "chat bot development",
      "whatsapp business api integration",
      "chatgpt api integration",
    ],
  },
  {
    url: "/ai-automation-agency/ai-voice-agents",
    pageType: "service",
    primary: "ai receptionist for small business",
    secondary: ["ai voice agent", "ai phone answering"],
  },
  {
    url: "/ai-automation-agency/business-process-automation",
    pageType: "service",
    primary: "business process automation",
    secondary: [
      "workflow automation",
      "workflow automation solutions",
      "business process automation services",
      "workflow automation services",
      "workflow automation for small business",
    ],
  },
  {
    url: "/industries",
    pageType: "hub",
    primary: "industry website design",
    secondary: ["website design for small business"],
  },
  {
    url: "/industries/law-firm-website-design",
    pageType: "industry",
    primary: "law firm website design",
    secondary: [
      "law firm web design",
      "website development for law firms",
      "law firm website design agency",
      "lawyer website design",
      "attorney website design",
      "small law firm website design",
      "legal workflow automation",
    ],
  },
  {
    url: "/industries/dental-medical-website-design",
    pageType: "industry",
    primary: "medical website design company",
    secondary: [
      "dental website design agency",
      "dental web design company",
      "healthcare website design agency",
      "doctor website design",
      "healthcare workflow automation",
    ],
  },
  {
    url: "/industries/real-estate-website-design",
    pageType: "industry",
    primary: "real estate website design",
    secondary: [
      "realtor website design",
      "real estate agent website design",
      "real estate idx website design",
      "real estate brokerage website design",
      "real estate marketing automation",
    ],
  },
  {
    url: "/industries/roofing-hvac-website-design",
    pageType: "industry",
    primary: "roofing website design",
    secondary: [
      "roofing company website design",
      "roofing web design company",
      "hvac website design",
      "hvac website design companies",
    ],
  },
  {
    url: "/industries/contractor-website-design",
    pageType: "industry",
    primary: "contractor website design",
    secondary: [
      "general contractor website design",
      "website design for construction company",
      "lead generation website design",
    ],
  },
  {
    url: "/services/web-design-development",
    pageType: "service",
    primary: "website design company",
    secondary: [
      "web design company",
      "web design firms",
      "website creation company",
      "web design agency",
      "website design services",
      "website development company",
    ],
  },
  {
    url: "/services/nextjs-react-development",
    pageType: "service",
    primary: "react development company",
    secondary: [
      "react development agency",
      "react development services",
      "hire react developers",
      "hire next js developer",
      "hire node js developer",
      "nextjs development company",
    ],
  },
  {
    url: "/services/saas-mvp-development",
    pageType: "service",
    primary: "mvp development company",
    secondary: [
      "mvp development agency",
      "mvp development services for startups",
      "saas development company",
      "saas application development services",
    ],
  },
  {
    url: "/services/shopify-development",
    pageType: "service",
    primary: "shopify agency",
    secondary: [
      "shopify seo services",
      "expert shopify developers",
      "hire shopify developer",
      "shopify website development company",
      "shopify store design services",
      "headless shopify",
    ],
  },
  {
    url: "/services/wordpress-development",
    pageType: "service",
    primary: "wordpress agency",
    secondary: [
      "wordpress experts for hire",
      "hire wordpress developer",
      "wordpress web design company",
      "wordpress development agency",
    ],
  },
  {
    url: "/services/custom-web-app-development",
    pageType: "service",
    primary: "custom web development services",
    secondary: [
      "web app development agency",
      "web application development services",
      "full stack development company",
      "mern stack developer",
    ],
  },
  {
    url: "/services/laravel-development",
    pageType: "service",
    primary: "laravel development company",
    secondary: [
      "laravel development services",
      "php development company",
      "hire dedicated php developer",
    ],
  },
  {
    url: "/services/ecommerce-development",
    pageType: "service",
    primary: "ecommerce development company",
    secondary: [
      "hire woocommerce developers",
      "woocommerce development services",
      "ecommerce website development services",
    ],
  },
  {
    url: "/services/mobile-app-development",
    pageType: "service",
    primary: "mobile app development agency",
    secondary: [
      "mobile app creation service",
      "app development agency",
      "react native development companies",
    ],
  },
  {
    url: "/services/website-maintenance",
    pageType: "service",
    primary: "website maintenance company",
    secondary: [
      "website migration service",
      "website speed optimization service",
      "wordpress support services",
      "managed wordpress hosting services",
    ],
  },
  {
    url: "/services/api-integration-web-scraping",
    pageType: "service",
    primary: "api integration company",
    secondary: ["web scraping as a service", "data scraping companies", "api integration services"],
  },
  {
    url: "/services/small-business-website-design",
    pageType: "service",
    primary: "small business website design services",
    secondary: [
      "small company website design",
      "website redesign company",
      "website redesign agency",
      "affordable web design for small business",
    ],
  },
  {
    url: "/packages/website-speed-optimization",
    pageType: "package",
    primary: "website speed optimization service",
    secondary: [],
  },
  {
    url: "/packages/wordpress-care-plan",
    pageType: "package",
    primary: "wordpress maintenance plans",
    secondary: [],
  },
  {
    url: "/packages/gohighlevel-setup",
    pageType: "package",
    primary: "gohighlevel setup service",
    secondary: [],
  },
  {
    url: "/packages/ai-chatbot",
    pageType: "package",
    primary: "ai chatbot package",
    secondary: [],
  },
];

export function keywordFor(url: string): KeywordEntry | undefined {
  return KEYWORDS.find((entry) => entry.url === url);
}
