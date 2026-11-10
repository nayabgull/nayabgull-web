import { aiAutomationAgency } from "./ai-automation-agency.ts";
import { gohighlevelAgency } from "./gohighlevel-agency.ts";
import { roofingHvacWebsiteDesign } from "./roofing-hvac-website-design.ts";
import type { PageContent } from "./types.ts";

/** Every launch page except the homepage, in build order. The sitemap and the tests read this list. */
export const PAGES: readonly PageContent[] = [
  gohighlevelAgency,
  aiAutomationAgency,
  roofingHvacWebsiteDesign,
];
