import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";
import { faqParagraphs } from "@/lib/content/faq.ts";

/**
 * Visible FAQ. Native <details>/<summary>: keyboard and screen-reader friendly with zero JS.
 * The FAQPage JSON-LD is built from the same items (lib/seo/jsonld.ts → faqPage).
 */
export function Faq({ faq }: { faq: HomeContent["faq"] }) {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <SectionHeader id="faq-heading" eyebrow={faq.eyebrow} heading={faq.heading} />
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-lg border border-border bg-surface">
        {faq.items.map((item) => (
          <details key={item.question} className="faq-item group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold sm:px-6">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="faq-chevron grid size-8 shrink-0 place-items-center rounded-full border border-border transition-transform"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
                  <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="space-y-3 px-5 pb-5 text-text-muted sm:px-6">
              {faqParagraphs(item.answer).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
