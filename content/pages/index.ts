import { about } from "./about.ts";
import { aiAgentDevelopment } from "./ai-agent-development.ts";
import { aiAutomationAgency } from "./ai-automation-agency.ts";
import { contractorWebsiteDesign } from "./contractor-website-design.ts";
import { dentalMedicalWebsiteDesign } from "./dental-medical-website-design.ts";
import { gohighlevelAgency } from "./gohighlevel-agency.ts";
import { hireFullStackDeveloper } from "./hire-full-stack-developer.ts";
import { lawFirmWebsiteDesign } from "./law-firm-website-design.ts";
import { privacyPolicy, terms } from "./legal.ts";
import { pricing } from "./pricing.ts";
import { realEstateWebsiteDesign } from "./real-estate-website-design.ts";
import { roofingHvacWebsiteDesign } from "./roofing-hvac-website-design.ts";
import type { PageContent } from "./types.ts";
import { webDesignDevelopment } from "./web-design-development.ts";

/** Every launch page except the homepage, in build order. The sitemap and the tests read this list. */
export const PAGES: readonly PageContent[] = [
  gohighlevelAgency,
  aiAutomationAgency,
  aiAgentDevelopment,
  roofingHvacWebsiteDesign,
  lawFirmWebsiteDesign,
  contractorWebsiteDesign,
  dentalMedicalWebsiteDesign,
  realEstateWebsiteDesign,
  webDesignDevelopment,
  hireFullStackDeveloper,
  pricing,
  about,
  privacyPolicy,
  terms,
];
