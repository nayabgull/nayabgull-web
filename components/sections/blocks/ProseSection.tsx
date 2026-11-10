import { CheckIcon } from "@/components/ui/icons.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { ProseBlock } from "@/content/pages/types.ts";

/** Heading on the left, running text (and an optional check list) on the right. */
export function ProseSection({ block }: { block: ProseBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <SectionHeader id={headingId} eyebrow={block.eyebrow} heading={block.heading} />
        <div className="max-w-3xl space-y-4 text-text-muted">
          {block.intro ? (
            <p className="text-lead">
              <RichText value={block.intro} />
            </p>
          ) : null}
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
      </div>
    </Section>
  );
}
