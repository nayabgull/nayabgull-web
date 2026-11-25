import { ChevronDownIcon } from "@/components/ui/icons.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { UseCasesBlock } from "@/content/pages/types.ts";

const ROWS = [
  ["problem", "The problem"],
  ["agent", "What the agent does"],
  ["result", "Result"],
] as const;

/**
 * Use cases as cards. Each card reads "The problem → What the agent does → Result" in three short
 * lines, names the example business, and keeps the full example in a native <details> (no JS).
 */
export function UseCasesSection({ block }: { block: UseCasesBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <div className="@container mt-12">
        <ul className="grid gap-5 @3xl:grid-cols-2 @5xl:grid-cols-3">
          {block.items.map((item, index) => (
            <li key={item.title} className="glass flex flex-col p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  aria-hidden="true"
                  className="font-display text-h2 leading-none font-bold text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-pill border border-border px-3 py-1 text-small text-text-muted">
                  Example: {item.business}
                </span>
              </div>
              <h3 className="mt-4 text-h3 font-semibold">{item.title}</h3>
              <dl className="usecase mt-4 space-y-4">
                {ROWS.map(([key, label]) => (
                  <div key={key} className="usecase-row relative pl-6">
                    <dt className="text-small font-semibold text-accent">{label}</dt>
                    <dd className="mt-0.5 text-text-muted">{item[key]}</dd>
                  </div>
                ))}
              </dl>
              <details className="faq-item group mt-auto border-t border-border pt-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold">
                  <span>See the full example</span>
                  <ChevronDownIcon className="faq-chevron size-5 transition-transform" />
                </summary>
                <div className="space-y-3 pb-1 text-text-muted">
                  {item.more.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
