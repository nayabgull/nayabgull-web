import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { CheckIcon } from "@/components/ui/icons.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { PricesBlock } from "@/content/pages/types.ts";

const COLUMNS = ["", "", "md:grid-cols-2", "md:grid-cols-2 xl:grid-cols-3"] as const;

/** "Starts at" prices. The note under the cards says they are starting prices, not guarantees. */
export function PricesSection({ block }: { block: PricesBlock }) {
  const headingId = `${block.id}-heading`;
  const columns = COLUMNS[Math.min(block.items.length, 3)] ?? "";
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <ul className={`mt-12 grid gap-6 ${columns}`}>
        {block.items.map((price) => (
          <GlassCard as="li" key={price.name} hover={false} className="p-6 sm:p-8">
            <h3 className="text-h3 font-semibold">{price.name}</h3>
            <p className="mt-3 font-display text-h3 font-bold text-accent">{price.label}</p>
            <p className="mt-3 text-text-muted">{price.text}</p>
            <ul className="mt-5 space-y-2 text-small text-text-muted">
              {price.includes.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </ul>
      <p className="mt-8 max-w-3xl text-small text-text-muted">{block.note}</p>
    </Section>
  );
}
