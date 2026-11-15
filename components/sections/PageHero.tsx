import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { ArrowDownIcon } from "@/components/ui/icons.tsx";
import type { PageContent, PageHero as PageHeroContent } from "@/content/pages/types.ts";

import { QuoteCard } from "./QuoteCard.tsx";

function Proof({ facts, centered }: { facts: readonly string[]; centered: boolean }) {
  if (facts.length === 0) return null;
  return (
    <p
      className={`mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-small font-medium ${centered ? "justify-center" : ""}`}
    >
      {facts.map((fact, index) => (
        <span key={fact} className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-lime" aria-hidden="true" />
          {fact}
          {index === facts.length - 1 ? "." : ""}
        </span>
      ))}
    </p>
  );
}

function Ctas({ hero, centered }: { hero: PageHeroContent; centered: boolean }) {
  if (!hero.primaryCta) return null;
  return (
    <div
      className={`mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${centered ? "sm:justify-center" : ""}`}
    >
      <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
      {hero.secondaryCta ? (
        <ButtonLink
          href={hero.secondaryCta.href}
          variant="secondary"
          icon={<ArrowDownIcon className="size-5" />}
        >
          {hero.secondaryCta.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}

/**
 * Hero for every page except the homepage. Money pages (`hero.form`) get the homepage layout: copy
 * and "Book a free call" on the left, the quote form card on the right. Other pages get centered
 * text. The H1 is plain text (the LCP element), never animated.
 */
export function PageHero({ content }: { content: Pick<PageContent, "hero" | "name" | "path"> }) {
  const { hero } = content;
  const centered = !hero.form;
  const copy = (
    <div className={centered ? "mx-auto max-w-3xl text-center" : ""}>
      <span className="text-small font-semibold tracking-[0.16em] text-accent uppercase">
        {hero.eyebrow}
      </span>
      <h1
        id="hero-heading"
        className={`mt-3 leading-[1.08] font-bold break-words ${centered ? "text-display" : "max-w-[20ch] text-hero"}`}
      >
        {hero.headline.before}
        <span className="text-gradient">{hero.headline.highlight}</span>
        {hero.headline.after}
      </h1>
      <p
        className={`mt-4 text-lead text-text-muted ${centered ? "mx-auto max-w-[60ch]" : "max-w-[52ch]"}`}
      >
        {hero.lede}
      </p>
      <Proof facts={hero.proof} centered={centered} />
      <Ctas hero={hero} centered={centered} />
    </div>
  );
  return (
    <section
      aria-labelledby="hero-heading"
      data-cta-zone={hero.primaryCta ? true : undefined}
      className="hero-bg pt-2 pb-16 sm:pt-4 lg:pb-20"
    >
      <Container>
        <Breadcrumbs current={content.name} centered={centered} />
        {hero.form ? (
          <div className="mt-2 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {copy}
            <QuoteCard
              id="hero-quote"
              heading={hero.form.heading}
              text={hero.form.text}
              source={content.path}
            />
          </div>
        ) : (
          <div className="mt-4">{copy}</div>
        )}
      </Container>
    </section>
  );
}
