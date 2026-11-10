import { Section } from "@/components/ui/Section.tsx";
import type { HomeContent } from "@/content/home.ts";

/**
 * TODO(nayab): TESTIMONIALS SLOT. Renders nothing until `home.testimonials` holds real, approved
 * quotes. Never add Review/AggregateRating JSON-LD for these (seo.md §6).
 */
export function Testimonials({ items }: { items: HomeContent["testimonials"] }) {
  if (items.length === 0) return null;
  return (
    <Section id="testimonials" labelledBy="testimonials-heading">
      <h2 id="testimonials-heading" className="text-h2 font-bold">
        What clients say
      </h2>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.name} className="glass p-6">
            <blockquote>{item.quote}</blockquote>
            <span className="mt-4 block font-semibold">
              {item.name}, {item.role}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
