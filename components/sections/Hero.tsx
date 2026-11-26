import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { ArrowDownIcon } from "@/components/ui/icons.tsx";
import type { HomeContent } from "@/content/home.ts";

import { QuoteCard } from "./QuoteCard.tsx";

/**
 * Copy and CTAs on the left, the quote form on the right (below the copy on small screens). The H1
 * is the LCP element: plain text, no animation, no image. Only the hero has the grid background.
 */
export function Hero({ hero }: Pick<HomeContent, "hero">) {
  return (
    <section
      aria-labelledby="hero-heading"
      data-cta-zone
      className="hero-bg pt-6 pb-16 sm:pt-10 lg:pt-12 lg:pb-20"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <span className="badge-live inline-flex items-center gap-2 rounded-pill px-3 py-1 text-small font-semibold">
            <span className="dot-live size-2 rounded-full" aria-hidden="true" />
            {hero.badge}
          </span>
          <h1
            id="hero-heading"
            className="mt-4 max-w-[20ch] text-hero leading-[1.08] font-bold break-words"
          >
            {hero.headline.before}
            <span className="text-gradient">{hero.headline.highlight}</span>
            {hero.headline.after}
          </h1>
          <p className="mt-4 max-w-[52ch] text-lead text-text-muted">{hero.lede}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-small font-medium">
            {hero.proof.map((fact, index) => (
              <span key={fact} className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-lime" aria-hidden="true" />
                {fact}
                {index === hero.proof.length - 1 ? "." : ""}
              </span>
            ))}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="secondary"
              icon={<ArrowDownIcon className="size-5" />}
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        <QuoteCard id="hero-quote" heading={hero.form.heading} text={hero.form.text} source="/" />
      </Container>
    </section>
  );
}
