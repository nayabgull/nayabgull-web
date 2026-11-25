import { about } from "./about.ts";
import { aiAgentDevelopment } from "./ai-agent-development.ts";
import { aiAutomationAgency } from "./ai-automation-agency.ts";
import { aiReceptionistForSmallBusiness } from "./ai-receptionist-for-small-business.ts";
import { gohighlevelAgency } from "./gohighlevel-agency.ts";
import { hireFullStackDeveloper } from "./hire-full-stack-developer.ts";
import { hireSaasDeveloper } from "./hire-saas-developer.ts";
import { privacyPolicy, terms } from "./legal.ts";
import { n8nAutomationAgency } from "./n8n-automation-agency.ts";
import { pricing } from "./pricing.ts";
import { roofingHvacWebsiteDesign } from "./roofing-hvac-website-design.ts";
import type { PageContent } from "./types.ts";
import { webDesignDevelopment } from "./web-design-development.ts";

/** Every launch page except the homepage, in build order. The sitemap and the tests read this list. */
export const PAGES: readonly PageContent[] = [
  gohighlevelAgency,
  aiAutomationAgency,
  aiAgentDevelopment,
  n8nAutomationAgency,
  aiReceptionistForSmallBusiness,
  roofingHvacWebsiteDesign,
  webDesignDevelopment,
  hireFullStackDeveloper,
  hireSaasDeveloper,
  pricing,
  about,
  privacyPolicy,
  terms,
];
