import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { ArrowDownIcon } from "@/components/ui/icons.tsx";
import type { PageContent } from "@/content/pages/types.ts";

import { AutomationFlow } from "./AutomationFlow.tsx";

/** Hero for every page except the homepage. The H1 is plain text (the LCP element), never animated. */
export function PageHero({ content }: { content: Pick<PageContent, "hero" | "flow" | "name"> }) {
  const { hero, flow } = content;
  return (
    <section aria-labelledby="hero-heading" className="hero-bg pt-2 pb-16 sm:pt-6 lg:pb-20">
      <Container>
        <Breadcrumbs current={content.name} />
        <div
          className={`mt-4 grid items-center gap-12 ${flow ? "lg:grid-cols-[1.15fr_0.85fr] lg:gap-16" : ""}`}
        >
          <div>
            <span className="text-small font-semibold tracking-[0.16em] text-accent uppercase">
              {hero.eyebrow}
            </span>
            <h1
              id="hero-heading"
              className="mt-3 max-w-[24ch] text-display leading-[1.06] font-bold break-words"
            >
              {hero.headline.before}
              <span className="text-gradient">{hero.headline.highlight}</span>
              {hero.headline.after}
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-text-muted">{hero.lede}</p>
            {hero.primaryCta ? (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            ) : null}
            {hero.proof.length > 0 ? (
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-small font-medium">
                {hero.proof.map((fact, index) => (
                  <span key={fact} className="inline-flex items-center gap-2">
                    <span className="size-2 rounded-full bg-lime" aria-hidden="true" />
                    {fact}
                    {index === hero.proof.length - 1 ? "." : ""}
                  </span>
                ))}
              </p>
            ) : null}
          </div>
          {flow ? <AutomationFlow flow={flow} /> : null}
        </div>
      </Container>
    </section>
  );
}
