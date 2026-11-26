import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { ArrowDownIcon, ArrowRightIcon } from "@/components/ui/icons.tsx";
import { IDENTITY_LINE } from "@/content/home.ts";
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

/** A link to a section of the same page points down; every other link points right. */
const ctaIcon = (href: string) =>
  href.startsWith("#") ? (
    <ArrowDownIcon className="size-5" />
  ) : (
    <ArrowRightIcon className="size-5" />
  );

function Ctas({ hero, centered }: { hero: PageHeroContent; centered: boolean }) {
  if (!hero.primaryCta) return null;
  return (
    <div
      className={`mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${centered ? "sm:justify-center" : ""}`}
    >
      <ButtonLink href={hero.primaryCta.href} icon={ctaIcon(hero.primaryCta.href)}>
        {hero.primaryCta.label}
      </ButtonLink>
      {hero.secondaryCta ? (
        <ButtonLink
          href={hero.secondaryCta.href}
          variant="secondary"
          icon={ctaIcon(hero.secondaryCta.href)}
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
export function PageHero({
  content,
}: {
  content: Pick<PageContent, "hero" | "name" | "path" | "parent" | "request">;
}) {
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
        {/* The same identity line opens every hero subline (content/home.ts). */}
        {IDENTITY_LINE} {hero.lede}
      </p>
      <Proof facts={hero.proof} centered={centered} />
      {hero.callout ? <p className="mt-5 font-semibold">{hero.callout}</p> : null}
      <Ctas hero={hero} centered={centered} />
      {/* Extra intro paragraphs sit under the CTAs, so the primary CTA stays above the fold. */}
      {hero.body ? (
        <div
          className={`mt-6 space-y-3 border-l-2 border-border-strong pl-4 text-text-muted ${centered ? "mx-auto max-w-[60ch] text-left" : "max-w-[56ch]"}`}
        >
          {hero.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
  return (
    <section
      aria-labelledby="hero-heading"
      // The mobile CTA bar stays hidden while the hero is on screen, so it never covers the first view.
      data-cta-zone
      className="hero-bg pt-2 pb-16 sm:pt-4 lg:pb-20"
    >
      <Container>
        <Breadcrumbs current={content.name} parent={content.parent} centered={centered} />
        {hero.form ? (
          <div
            // A hero with extra intro text starts at the top, so its CTAs stay above the fold.
            className={`mt-2 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] ${hero.body ? "items-start lg:pt-6" : "items-center"}`}
          >
            {copy}
            <QuoteCard
              id="hero-quote"
              heading={hero.form.heading}
              text={hero.form.text}
              source={content.path}
              request={content.request}
            />
          </div>
        ) : (
          <div className="mt-4">{copy}</div>
        )}
      </Container>
    </section>
  );
}
