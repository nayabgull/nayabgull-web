# Content Rules — human, easy to read, semantically optimized

Every page is written for a busy US business owner first and for Google second.
Rules marked **[CI]** are checked by `pnpm audit:content` and by the Payload publish hook. Hard failures block publishing.

## 1. Voice and audience

- Reader: US small-business owner, founder, attorney, dentist, agency owner. Busy, not technical.
- Voice: confident, warm, direct, specific. Sounds like Nayab talking to a client on a call.
- **American English** spelling and conventions (`optimize`, `color`), US dollar (`$2,500`), US dates (`October 23, 2026`).
- Second person ("you", "your business"). First person singular for Nayab's experience ("I built…"); "we" only where a team really worked.
- Explain technical terms the first time in plain words, or replace them with the outcome ("leads get a text in 60 seconds" instead of "webhook-triggered SMS workflow").

## 2. Readability (easy to read)

- **[CI]** Flesch Reading Ease ≥ **60** for service, hub, industry and package pages; ≥ **55** for blog posts.
- **[CI]** Flesch-Kincaid grade ≤ **9**.
- **[CI]** Average sentence length ≤ **20 words**; no sentence over **35 words**.
- **[CI]** Paragraphs ≤ **4 sentences** and ≤ **80 words**.
- **[CI]** Passive voice in ≤ **10%** of sentences.
- Active verbs, concrete nouns, one idea per sentence.
- Use lists for steps and parallel items, tables for comparisons, bold only for the key phrase of a section (≤ 1 per paragraph).
- Scannable: a reader skimming only the headings and bold text gets the whole message.

## 3. Human-like writing (no AI tone)

- **[CI] Banned phrases** (case-insensitive): "delve", "in today's fast-paced", "in today's digital world", "ever-evolving", "unlock the power", "unleash", "elevate your", "game-changer", "cutting-edge", "seamless(ly)", "robust solution", "tapestry", "navigate the complexities", "look no further", "it's important to note", "in conclusion", "revolutionize", "harness the power", "take your business to the next level", "one-stop shop", "world-class", "synergy", "best-in-class", "state-of-the-art", "furthermore," as an opener, "moreover," as an opener. List lives in `lib/content/banned-phrases.ts`; extend it there.
- **[CI]** No more than **2 em dashes** per 300 words.
- **[CI]** No sentence opens with the same word three times in a row.
- Vary sentence length (short + medium). Use real examples, numbers, names of tools, and Nayab's own process.
- Every section must say something a competitor page does not: a real workflow, a screenshot, a lesson from a project, a price range, a mistake to avoid.
- AI may help draft; Nayab reviews and edits every page before publishing. The author field is always a real person.

## 4. Semantic SEO (topic, not just keyword)

Before writing a page, create its **content brief** in Payload (or `content/briefs/<slug>.md`):

1. Primary keyword + search intent (hire / compare / learn / price).
2. Secondary keywords from `docs/seo/keyword-map.md`.
3. **Entities** to cover (people, tools, concepts the topic is known for). Example for the GHL page: GoHighLevel, CRM, pipeline, workflows, sub-account, A2P 10DLC, SMS, Vapi, AI voice agent, calendar booking, HubSpot.
4. Questions to answer (People Also Ask, Reddit, client calls).
5. What the top 5 Google results cover — and the gap this page will fill.

While writing:

- **[CI]** Primary keyword: in title, H1, URL, meta description, first 100 words, at least one H2. Density **≤ 1.5%** (no stuffing).
- **[CI]** At least **60%** of the brief's secondary keywords and **70%** of its entities appear naturally on the page.
- Use variants and synonyms naturally ("law firm website", "attorney website", "legal website design").
- Answer the main question directly in the first 2–3 sentences of the relevant section (AI Overviews and featured snippets pick these up).
- Define terms ("A2P 10DLC is…") in one clear sentence.
- Headings form an outline that alone explains the topic.
- Internal links connect related entities across the cluster (see `seo.md` §4).

## 5. Page anatomy (conversion)

Every money page (home, hubs, industries, services, packages) follows:

1. **Hero:** H1 with the outcome + who it is for; one-line proof; primary CTA ("Book a free strategy call").
2. **Problem:** 3 real pain points in the reader's words.
3. **Solution:** what Nayab builds and how it fixes each pain point.
4. **Proof:** case study with a real, approved number; client quote only if real and approved.
5. **Process:** 4–5 steps with timeline.
6. **Pricing signal:** a range or "starts at" price.
7. **FAQ:** objections (cost, timeline, ownership, time zone, support, results).
8. **Final CTA:** same primary CTA.

- **[CI]** One primary CTA per page (secondary CTA allowed, never competing).
- **[CI]** Primary CTA appears above the fold and again at the end.

## 6. Trust and accuracy (E-E-A-T)

- **[CI]** Every blog post and case study has an author (Nayab Gull), author bio link, `datePublished`, `dateModified`.
- **[CI]** Every statistic from outside has a linked source from the last 24 months.
- Never invent numbers, clients, testimonials, logos, awards, certifications or guarantees. Use only results Nayab confirms and has permission to share.
- No ranking or revenue guarantees ("guaranteed #1 on Google" is banned).
- Compliance words ("HIPAA compliant", "ADA compliant", "GDPR compliant") only when actually true and documented.
- "Best X companies" posts compare competitors fairly; including Nayab is fine, fake rankings are not.
- Pages are reviewed and `dateModified` updated at least every 6 months.

## 7. Uniqueness

- **[CI]** No two pages share more than **20%** identical text (shingle similarity check across all pages).
- Industry and industry × service pages each need unique pain points, examples, visuals and FAQs. Swapping the industry name in a template is forbidden.
- Never copy competitor text. Quotes from sources ≤ 25 words, in quotation marks, with a link.

## 8. Formatting in Payload

- Rich text uses semantic blocks only: headings, paragraphs, lists, tables, quotes, code, images, FAQ block, CTA block, callout block.
- No inline colors or font sizes; design comes from components.
- Every image block requires alt text (validation enforced).
- FAQ block powers both the visible FAQ and the `FAQPage` JSON-LD — never write FAQ schema by hand.

## 9. Accessibility in content

- Link text makes sense out of context.
- Tables have header rows; images that carry information have full alt text.
- No meaning carried by color alone; no text inside images.

## 10. More rules from Nayab

<!-- Nayab will add more content rules here. Claude: treat anything added below with the same priority as the sections above. -->
