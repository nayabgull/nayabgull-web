import { about } from "./about.ts";
import { aiAgentDevelopment } from "./ai-agent-development.ts";
import { aiAutomationAgency } from "./ai-automation-agency.ts";
import { aiChatbotDevelopment } from "./ai-chatbot-development.ts";
import { aiReceptionistForSmallBusiness } from "./ai-receptionist-for-small-business.ts";
import { businessProcessAutomationServices } from "./business-process-automation-services.ts";
import { contractorWebsiteDesign } from "./contractor-website-design.ts";
import { customCrmDevelopment } from "./custom-crm-development.ts";
import { gohighlevelAgency } from "./gohighlevel-agency.ts";
import { gohighlevelWorkflows } from "./gohighlevel-workflows.ts";
import { hireFullStackDeveloper } from "./hire-full-stack-developer.ts";
import { hireSaasDeveloper } from "./hire-saas-developer.ts";
import { privacyPolicy, terms } from "./legal.ts";
import { n8nAutomationAgency } from "./n8n-automation-agency.ts";
import { nextjsReactDevelopment } from "./nextjs-react-development.ts";
import { pricing } from "./pricing.ts";
import { roofingHvacWebsiteDesign } from "./roofing-hvac-website-design.ts";
import type { PageContent } from "./types.ts";
import { webDesignDevelopment } from "./web-design-development.ts";

/** Every launch page except the homepage, in build order. The sitemap and the tests read this list. */
export const PAGES: readonly PageContent[] = [
  gohighlevelAgency,
  gohighlevelWorkflows,
  customCrmDevelopment,
  aiAutomationAgency,
  aiAgentDevelopment,
  n8nAutomationAgency,
  aiReceptionistForSmallBusiness,
  businessProcessAutomationServices,
  aiChatbotDevelopment,
  roofingHvacWebsiteDesign,
  contractorWebsiteDesign,
  webDesignDevelopment,
  nextjsReactDevelopment,
  hireFullStackDeveloper,
  hireSaasDeveloper,
  pricing,
  about,
  privacyPolicy,
  terms,
];
