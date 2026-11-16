import { CheckIcon } from "@/components/ui/icons.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { ProseBlock } from "@/content/pages/types.ts";

/** Centered header, then running text (and an optional check list) in one readable column below it. */
export function ProseSection({ block }: { block: ProseBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <div className="mx-auto mt-8 max-w-[65ch] space-y-4 text-text-muted">
        {block.paragraphs.map((paragraph, index) => (
          <p key={index}>
            <RichText value={paragraph} />
          </p>
        ))}
        {block.bullets ? (
          <ul className="space-y-3 pt-2">
            {block.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-strong text-accent"
                >
                  <CheckIcon className="size-4" />
                </span>
                <span>
                  <RichText value={bullet} />
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Section>
  );
}
