import { Container } from "@/components/ui/Container.tsx";
import { Logo } from "@/components/ui/Logo.tsx";
import { ThemeToggle } from "@/components/ui/ThemeToggle.tsx";
import { comingSoon } from "@/content/coming-soon.ts";
import { FOOTER_NAV } from "@/content/navigation.ts";
import { COMING_SOON_OPEN_PATHS } from "@/lib/site-mode.ts";

/** Header while SITE_MODE is "coming-soon": logo and theme toggle only, so nothing links to a hidden page. */
export function ComingSoonHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <a
        href="#main"
        className="btn-primary absolute top-2 left-4 z-50 inline-flex min-h-11 -translate-y-[200%] items-center rounded-pill px-5 font-semibold focus:translate-y-0"
      >
        Skip to content
      </a>
      <Container className="relative flex h-18 items-center justify-between gap-3">
        <Logo />
        <ThemeToggle />
      </Container>
    </header>
  );
}

/** Footer while SITE_MODE is "coming-soon": the legal pages stay linked because the demo form needs them. */
export function ComingSoonFooter() {
  const links = FOOTER_NAV.flatMap((group) => group.links).filter((link) =>
    COMING_SOON_OPEN_PATHS.includes(link.href),
  );
  return (
    <footer className="border-t border-border pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="text-small text-text-muted">{comingSoon.footerNote}</p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center justify-center gap-x-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 min-w-11 items-center text-small text-text-muted underline-offset-4 hover:text-text hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-small text-text-muted">
          © {new Date().getFullYear()} Nayab Gull. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
