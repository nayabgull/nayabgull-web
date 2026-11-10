import { about } from "./about.ts";
import { aiAutomationAgency } from "./ai-automation-agency.ts";
import { gohighlevelAgency } from "./gohighlevel-agency.ts";
import { hireFullStackDeveloper } from "./hire-full-stack-developer.ts";
import { pricing } from "./pricing.ts";
import { roofingHvacWebsiteDesign } from "./roofing-hvac-website-design.ts";
import type { PageContent } from "./types.ts";
import { webDesignDevelopment } from "./web-design-development.ts";

/** Every launch page except the homepage, in build order. The sitemap and the tests read this list. */
export const PAGES: readonly PageContent[] = [
  gohighlevelAgency,
  aiAutomationAgency,
  roofingHvacWebsiteDesign,
  webDesignDevelopment,
  hireFullStackDeveloper,
  pricing,
  about,
];
