import { ArrowLink } from "@/components/ui/ArrowLink.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { LinksBlock } from "@/content/pages/types.ts";

/** Related pages: a descriptive link plus one line on what the reader finds there. */
export function LinksSection({ block }: { block: LinksBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <ul className="mt-10 grid gap-x-10 gap-y-2 divide-border md:grid-cols-2">
        {block.items.map((item) => (
          <li key={item.href} className="border-t border-border py-4">
            <ArrowLink href={item.href}>{item.label}</ArrowLink>
            <p className="text-text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
