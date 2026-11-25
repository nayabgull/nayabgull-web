import { faqSections } from "@/lib/blog/jsonld.ts";
import { faqParagraphs } from "@/lib/content/faq.ts";

/**
 * FAQ block inside a post. Native <details>, no JavaScript. The FAQPage JSON-LD is built from the
 * same block (lib/blog/jsonld.ts), so the markup always matches what is visible.
 */
export function PostFaq({
  id,
  fields,
}: {
  id: string | undefined;
  fields: Record<string, unknown>;
}) {
  const [section] = faqSections({
    root: { children: [{ type: "block", fields: { ...fields, blockType: "faq" } }] },
  });
  if (!section) return null;
  return (
    <section aria-labelledby={id} className="my-10">
      <h2 id={id} className="text-h3 font-bold">
        {section.heading}
      </h2>
      <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-surface">
        {section.items.map((item) => (
          <details key={item.question} className="faq-item group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
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
            <div className="space-y-3 px-5 pb-5 text-text-muted">
              {faqParagraphs(item.answer).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
