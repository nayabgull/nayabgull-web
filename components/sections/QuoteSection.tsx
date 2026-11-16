import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";

import { QuoteCard } from "./QuoteCard.tsx";

/** Every page ends here: the quote form, plus the primary CTA for people who would rather talk. */
export function QuoteSection({ quote, source }: { quote: HomeContent["quote"]; source: string }) {
  return (
    <Section id="quote" labelledBy="quote-heading">
      <SectionHeader
        id="quote-heading"
        eyebrow={quote.eyebrow}
        heading={quote.heading}
        intro={quote.text}
      />
      <div data-cta-zone className="mt-10">
        <QuoteCard
          id="quote-form"
          as="h3"
          heading={quote.form.heading}
          text={quote.form.text}
          source={source}
        />
      </div>
      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <p className="text-text-muted">{quote.callText}</p>
        <ButtonLink href={quote.cta.href}>{quote.cta.label}</ButtonLink>
        <p className="max-w-[60ch] text-small text-text-muted">{quote.note}</p>
        <p className="text-small text-text-muted">
          {quote.contact.before}
          <Link href={quote.contact.link.href} className="text-link">
            {quote.contact.link.label}
          </Link>
          {quote.contact.after}
        </p>
      </div>
    </Section>
  );
}
