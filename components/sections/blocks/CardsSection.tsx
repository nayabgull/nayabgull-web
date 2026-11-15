import { ArrowLink } from "@/components/ui/ArrowLink.tsx";
import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { CardsBlock } from "@/content/pages/types.ts";

const COLUMNS = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 xl:grid-cols-3" } as const;

/** A grid of cards: title, a short text and an optional link to the page that covers it. */
export function CardsSection({ block }: { block: CardsBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <ul className={`mt-12 grid gap-6 ${COLUMNS[block.columns]}`}>
        {block.items.map((card) => (
          <GlassCard as="li" key={card.title} hover={false} className="flex flex-col p-6 sm:p-8">
            <h3 className="text-h3 font-semibold">{card.title}</h3>
            <p className="mt-3 text-text-muted">
              <RichText value={card.text} />
            </p>
            {card.link ? (
              <ArrowLink href={card.link.href} className="mt-auto pt-4">
                {card.link.label}
              </ArrowLink>
            ) : null}
          </GlassCard>
        ))}
      </ul>
    </Section>
  );
}
