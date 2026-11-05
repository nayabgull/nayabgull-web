import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { ArrowDownIcon } from "@/components/ui/icons.tsx";
import type { HomeContent } from "@/content/home.ts";

import { AutomationFlow } from "./AutomationFlow.tsx";

/** The H1 is the LCP element: plain text, no animation, no image. */
export function Hero({ hero, flow }: Pick<HomeContent, "hero" | "flow">) {
  return (
    <section aria-labelledby="hero-heading" className="pt-6 pb-section sm:pt-14 lg:pt-12">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <span className="badge-live inline-flex items-center gap-2 rounded-pill px-3 py-1 text-small font-semibold">
            <span className="dot-live size-2 rounded-full" aria-hidden="true" />
            {hero.badge}
          </span>
          <h1
            id="hero-heading"
            className="mt-5 max-w-[20ch] text-display leading-[1.06] font-bold break-words"
          >
            {hero.headline.before}
            <span className="text-gradient">{hero.headline.highlight}</span>
            {hero.headline.after}
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-text-muted">{hero.lede}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="secondary"
              icon={<ArrowDownIcon className="size-5" />}
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-6 flex max-w-2xl items-start gap-2 text-small font-medium">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-lime" aria-hidden="true" />
            <span>{hero.proof}</span>
          </p>
        </div>
        <AutomationFlow flow={flow} />
      </Container>
    </section>
  );
}
