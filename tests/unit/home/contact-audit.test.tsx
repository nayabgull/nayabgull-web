import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContactPage } from "@/components/sections/ContactPage.tsx";
import { contact, CONTACT_EMAIL } from "@/content/contact.ts";
import { home } from "@/content/home.ts";
import { auditContent } from "@/lib/content/audit-rules.ts";
import { checkHeadings, checkMetaDescription, checkTitle } from "@/lib/seo/audit-rules.ts";
import { validateJsonLd } from "@/lib/seo/jsonld-validate.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { requiredSchemaTypes } from "@/lib/seo/page-types.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

const page = {
  ...snapshot(
    renderToStaticMarkup(
      <html lang="en-US">
        <body>
          <main>
            <ContactPage content={contact} email={CONTACT_EMAIL} />
          </main>
        </body>
      </html>,
    ),
  ),
  title: contact.meta.title,
  metaDescription: contact.meta.description,
};
const entry = keywordFor("/contact");

/** Runs the same rules as `pnpm audit:content` / `audit:seo` on the rendered contact page. */
describe("rendered contact page", () => {
  it("has a registered keyword and the base schema types", () => {
    expect(entry).toMatchObject({ pageType: "contact", primary: "contact nayab gull" });
    expect(requiredSchemaTypes("contact")).toEqual([
      "ProfessionalService",
      "WebSite",
      "BreadcrumbList",
    ]);
    expect(validateJsonLd(page.jsonLd, "contact")).toEqual([]);
  });

  it("passes the content, title, meta and heading rules", () => {
    expect(auditContent({ ...page, entry })).toEqual([]);
    expect(checkTitle(page, entry)).toEqual([]);
    expect(checkMetaDescription(page, entry)).toEqual([]);
    expect(checkHeadings(page, entry)).toEqual([]);
    expect(page.paragraphs.filter((p) => !/[.!?]$/.test(p))).toEqual([]);
  });

  it("offers the form, the call link and no invented email address", () => {
    expect(page.bodyText).toContain("Get my free quote");
    const call = page.links.find((link) => link.text === home.hero.primaryCta.label);
    expect(call?.href).toBe(home.hero.primaryCta.href);
    expect(CONTACT_EMAIL).toBeNull();
    expect(page.links.some((link) => link.href.startsWith("mailto:"))).toBe(false);
  });
});
