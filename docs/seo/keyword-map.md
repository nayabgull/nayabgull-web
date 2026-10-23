# Keyword Map — single source of truth

Source: Google Keyword Planner (US, English, Oct 2025 – Sep 2026, pulled 23 Oct 2026), buyer-intent research and low-DR competitor study.
Volume = monthly US range. Comp = Google Ads competition (not SEO difficulty). Bid = top-of-page high bid (USD), a signal of commercial value.

Rules: one primary keyword per page; a keyword appears as a target on one page only; `lib/seo/keywords.ts` mirrors this file and `pnpm audit:cannibalization` compares them.

## Core

| Page | URL | Primary | Volume · Comp · Bid | Secondary |
| --- | --- | --- | --- | --- |
| Home | / | web development agency | 1K–10K · Low · $41 | web development company, custom web development company, ai automation agency (link only), gohighlevel expert (link only) |
| About | /about | nayab gull (brand) | — | full stack developer, freelance web developer |
| Pricing | /pricing | website development cost | 100–1K · Low · $23 | cost of web design, website design pricing, web app development cost |
| Hire | /hire-full-stack-developer | hire full stack developer | 100–1K · Low · $51 | hire web developer, hire website developer, website designers for hire (1K–10K), hire freelance web developer, freelance web developer, hire frontend developer |

## GoHighLevel hub (priority 1)

| Page | URL | Primary | Volume · Comp · Bid | Secondary |
| --- | --- | --- | --- | --- |
| Hub | /gohighlevel-agency | gohighlevel agency | 100–1K · Low · $991 | gohighlevel expert, hire gohighlevel expert, crm and marketing automation, crm automation services |
| Workflows | /gohighlevel-agency/workflows-automation | gohighlevel workflows | 100–1K · Low · $47 | crm automation, automated crm system |
| API | /gohighlevel-agency/api-integrations | gohighlevel api | 100–1K · Low · $23 | crm integration, webhook automation |
| Custom CRM | /gohighlevel-agency/custom-crm-development | custom crm development services | 100–1K · Low · $19 | crm development services, crm development company, custom crm, crm software development, real estate developer crm |

## AI Automation hub (priority 2)

| Page | URL | Primary | Volume · Comp · Bid | Secondary |
| --- | --- | --- | --- | --- |
| Hub | /ai-automation-agency | ai automation agency | 1K–10K · Low · $20 | ai automation services, ai workflow automation, marketing automation agency, business automation consultant, ai integration services |
| n8n / Make / Zapier | /ai-automation-agency/n8n-make-zapier | n8n automation | 1K–10K · Medium · $16 | n8n workflow, n8n expert, make com automation, make com expert, zapier workflow automation, hire zapier expert, zapier automation agency |
| AI chatbots | /ai-automation-agency/ai-chatbot-development | ai chatbot development services | 100–1K · Low · $38 | chatbot development services, chat bot development, whatsapp business api integration, chatgpt api integration |
| AI voice agents | /ai-automation-agency/ai-voice-agents | ai receptionist for small business | volume to verify | ai voice agent, ai phone answering |
| Process automation | /ai-automation-agency/business-process-automation | business process automation | 1K–10K · Low · $48 | workflow automation, workflow automation solutions, business process automation services, workflow automation services, workflow automation for small business |

## Industries (priority 3)

| Page | URL | Primary | Volume · Comp · Bid | Secondary |
| --- | --- | --- | --- | --- |
| Hub | /industries | industry website design | — | website design for small business |
| Law firms | /industries/law-firm-website-design | law firm website design | 1K–10K · Low · $87 | law firm web design, website development for law firms, law firm website design agency ($176), lawyer website design, attorney website design, small law firm website design, legal workflow automation |
| Dental & medical | /industries/dental-medical-website-design | medical website design company | 100–1K · Low · $79 | dental website design agency, dental web design company ($130), healthcare website design agency, doctor website design, healthcare workflow automation |
| Real estate | /industries/real-estate-website-design | real estate website design | 100–1K · Medium · $30 | realtor website design, real estate agent website design, real estate idx website design, real estate brokerage website design, real estate marketing automation |
| Roofing & HVAC | /industries/roofing-hvac-website-design | roofing website design | 100–1K · Low · $42 | roofing company website design, roofing web design company, hvac website design, hvac website design companies |
| Contractors | /industries/contractor-website-design | contractor website design | 1K–10K · Low · $18 | general contractor website design, website design for construction company, lead generation website design |

## Services

| Phase | URL | Primary | Volume · Comp · Bid | Secondary |
| --- | --- | --- | --- | --- |
| 1 | /services/web-design-development | website design company | 10K–100K · Low · $34 | web design company, web design firms, website creation company, web design agency, website design services, website development company |
| 1 | /services/nextjs-react-development | react development company | 100–1K · Low · $88 | react development agency ($458), react development services, hire react developers, hire next js developer, hire node js developer, nextjs development company |
| 1 | /services/saas-mvp-development | mvp development company | 100–1K · Low · $100 | mvp development agency ($121), mvp development services for startups, saas development company, saas application development services |
| 1 | /services/shopify-development | shopify agency | 1K–10K · Low · $35 | shopify seo services, expert shopify developers, hire shopify developer, shopify website development company, shopify store design services, headless shopify |
| 1 | /services/wordpress-development | wordpress agency | 1K–10K · Low · $40 | wordpress experts for hire ($86), hire wordpress developer, wordpress web design company, wordpress development agency |
| 2 | /services/custom-web-app-development | custom web development services | 100–1K · Low · $31 | web app development agency, web application development services, full stack development company, mern stack developer |
| 2 | /services/laravel-development | laravel development company | 100–1K · Low · $82 | laravel development services, php development company, hire dedicated php developer |
| 2 | /services/ecommerce-development | ecommerce development company | 100–1K · Low · $71 | hire woocommerce developers ($88), woocommerce development services, ecommerce website development services |
| 2 | /services/mobile-app-development | mobile app development agency | 1K–10K · Low · $82 | mobile app creation service (10K–100K), app development agency, react native development companies |
| 2 | /services/website-maintenance | website maintenance company | 100–1K · Low · $62 | website migration service, website speed optimization service, wordpress support services, managed wordpress hosting services |
| 2 | /services/api-integration-web-scraping | api integration company | 10–100 · Low · $50 | web scraping as a service, data scraping companies, api integration services |
| 2 | /services/small-business-website-design | small business website design services | 100–1K · Low · $33 | small company website design (1K–10K), website redesign company, website redesign agency, affordable web design for small business |

## Packages (phase 2)

| URL | Primary | Volume · Comp · Bid |
| --- | --- | --- |
| /packages/website-speed-optimization | website speed optimization service | 100–1K · Low · $25 |
| /packages/wordpress-care-plan | wordpress maintenance plans | 100–1K · Low · $25 |
| /packages/gohighlevel-setup | gohighlevel setup service | volume to verify |
| /packages/ai-chatbot | ai chatbot package | volume to verify |

## Blog clusters (each post gets its own primary when written)

| Cluster | Links up to | Starter topics |
| --- | --- | --- |
| GoHighLevel | /gohighlevel-agency | GoHighLevel review, A2P 10DLC setup, GHL workflow examples, GHL vs HubSpot, GHL API guide |
| AI automation | /ai-automation-agency | best AI automation companies for small business, n8n vs Make vs Zapier, AI receptionist guide, workflow automation examples |
| Cost | service pages | cost to develop an app (1K–10K), website development cost, custom software development cost, website maintenance cost, law firm website cost |
| Industries | /industries/* | law firm website must-haves, dental website checklist, roofing lead generation website, real estate IDX guide |
| Dev | service pages | Next.js vs WordPress, headless Shopify, MVP development process, Shopify speed optimization |

## Never primary

- Any "near me" keyword (no US office) — secondary mention only where natural.
- Jobs, salary, courses, tutorials, free templates, platform login or pricing keywords on service pages.
