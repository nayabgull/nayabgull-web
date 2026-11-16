import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { Logo } from "@/components/ui/Logo.tsx";
import { ThemeToggle } from "@/components/ui/ThemeToggle.tsx";
import { STRATEGY_CALL_URL } from "@/content/home.ts";
import { PRIMARY_NAV } from "@/content/navigation.ts";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <a
        href="#main"
        className="btn-primary absolute top-2 left-4 z-50 inline-flex min-h-11 -translate-y-[200%] items-center rounded-pill px-5 font-semibold focus:translate-y-0"
      >
        Skip to content
      </a>
      <Container className="flex h-18 items-center justify-between gap-3">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-pill px-4 text-small font-medium text-text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={STRATEGY_CALL_URL}
            icon={null}
            className="hidden min-h-11! px-5! py-2! text-small min-[440px]:inline-flex"
          >
            Book a call
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
