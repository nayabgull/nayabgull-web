import { about } from "./about.ts";
import { aiAgentDevelopment } from "./ai-agent-development.ts";
import { aiAutomationAgency } from "./ai-automation-agency.ts";
import { aiChatbotDevelopment } from "./ai-chatbot-development.ts";
import { aiReceptionistForSmallBusiness } from "./ai-receptionist-for-small-business.ts";
import { businessProcessAutomationServices } from "./business-process-automation-services.ts";
import { contractorWebsiteDesign } from "./contractor-website-design.ts";
import { customCrmDevelopment } from "./custom-crm-development.ts";
import { dentalMedicalWebsiteDesign } from "./dental-medical-website-design.ts";
import { gohighlevelAgency } from "./gohighlevel-agency.ts";
import { gohighlevelApiIntegrations } from "./gohighlevel-api-integrations.ts";
import { gohighlevelWorkflows } from "./gohighlevel-workflows.ts";
import { hireFullStackDeveloper } from "./hire-full-stack-developer.ts";
import { hireSaasDeveloper } from "./hire-saas-developer.ts";
import { industries } from "./industries.ts";
import { lawFirmWebsiteDesign } from "./law-firm-website-design.ts";
import { privacyPolicy, terms } from "./legal.ts";
import { n8nAutomationAgency } from "./n8n-automation-agency.ts";
import { nextjsReactDevelopment } from "./nextjs-react-development.ts";
import { pricing } from "./pricing.ts";
import { realEstateWebsiteDesign } from "./real-estate-website-design.ts";
import { roofingHvacWebsiteDesign } from "./roofing-hvac-website-design.ts";
import { shopifyDevelopment } from "./shopify-development.ts";
import type { PageContent } from "./types.ts";
import { webDesignDevelopment } from "./web-design-development.ts";
import { wordpressDevelopment } from "./wordpress-development.ts";

/** Every launch page except the homepage, in build order. The sitemap and the tests read this list. */
export const PAGES: readonly PageContent[] = [
  gohighlevelAgency,
  gohighlevelWorkflows,
  customCrmDevelopment,
  gohighlevelApiIntegrations,
  aiAutomationAgency,
  aiAgentDevelopment,
  n8nAutomationAgency,
  aiReceptionistForSmallBusiness,
  businessProcessAutomationServices,
  aiChatbotDevelopment,
  roofingHvacWebsiteDesign,
  contractorWebsiteDesign,
  lawFirmWebsiteDesign,
  realEstateWebsiteDesign,
  dentalMedicalWebsiteDesign,
  industries,
  webDesignDevelopment,
  nextjsReactDevelopment,
  wordpressDevelopment,
  shopifyDevelopment,
  hireFullStackDeveloper,
  hireSaasDeveloper,
  pricing,
  about,
  privacyPolicy,
  terms,
];
