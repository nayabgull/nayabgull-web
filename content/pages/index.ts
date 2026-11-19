import { about } from "./about.ts";
import { aiAgentDevelopment } from "./ai-agent-development.ts";
import { aiAutomationAgency } from "./ai-automation-agency.ts";
import { gohighlevelAgency } from "./gohighlevel-agency.ts";
import { hireFullStackDeveloper } from "./hire-full-stack-developer.ts";
import { privacyPolicy, terms } from "./legal.ts";
import { nextjsReactDevelopment } from "./nextjs-react-development.ts";
import { pricing } from "./pricing.ts";
import { roofingHvacWebsiteDesign } from "./roofing-hvac-website-design.ts";
import type { PageContent } from "./types.ts";
import { webDesignDevelopment } from "./web-design-development.ts";

/** Every launch page except the homepage, in build order. The sitemap and the tests read this list. */
export const PAGES: readonly PageContent[] = [
  gohighlevelAgency,
  aiAutomationAgency,
  aiAgentDevelopment,
  roofingHvacWebsiteDesign,
  webDesignDevelopment,
  nextjsReactDevelopment,
  hireFullStackDeveloper,
  pricing,
  about,
  privacyPolicy,
  terms,
];
