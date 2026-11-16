import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import { TagList } from "@/components/ui/TagList.tsx";
import type { StackBlock } from "@/content/pages/types.ts";

/** Tools grouped by the job they do. Text badges only: no third-party logos. */
export function StackSection({ block }: { block: StackBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {block.groups.map((group) => (
          <GlassCard as="li" key={group.title} hover={false} className="flex flex-col p-6 sm:p-8">
            <h3 className="text-h3 font-semibold">{group.title}</h3>
            <p className="mt-3 text-text-muted">
              <RichText value={group.text} />
            </p>
            <TagList tags={group.tags} className="mt-auto pt-5" />
          </GlassCard>
        ))}
      </ul>
    </Section>
  );
}
