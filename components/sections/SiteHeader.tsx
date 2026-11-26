import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { Disclosure } from "@/components/ui/Disclosure.tsx";
import { ChevronDownIcon, MenuIcon } from "@/components/ui/icons.tsx";
import { Logo } from "@/components/ui/Logo.tsx";
import { ThemeToggle } from "@/components/ui/ThemeToggle.tsx";
import { CALL_CTA } from "@/content/home.ts";
import type { NavItem } from "@/content/navigation.ts";
import { isNavGroup, primaryNav } from "@/content/navigation.ts";

const ITEM =
  "inline-flex min-h-11 items-center gap-1 rounded-pill px-3 text-small font-medium text-text-muted transition-colors hover:text-text";
const MENU_LINK =
  "flex min-h-11 items-center rounded-md px-3 text-small font-medium hover:bg-surface-strong";

/** Desktop navigation: plain links, plus a dropdown for every group. */
function DesktopNav({ items }: { items: readonly NavItem[] }) {
  return (
    <nav aria-label="Primary" className="hidden xl:block">
      <ul className="flex items-center">
        {items.map((item) => (
          <li key={item.label} className="relative">
            {isNavGroup(item) ? (
              <Disclosure
                summaryClassName={ITEM}
                summary={
                  <>
                    {item.label}
                    <ChevronDownIcon className="disclosure-chevron size-4 transition-transform" />
                  </>
                }
              >
                <ul className="absolute top-full left-0 z-50 mt-2 w-64 rounded-md border border-border-strong bg-bg-raised p-2 shadow-card">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <Link prefetch={false} href={link.href} className={MENU_LINK}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            ) : (
              <Link prefetch={false} href={item.href} className={ITEM}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Below 1280 px: one menu button; the panel lists every page, groups under their label. */
function MobileNav({ items }: { items: readonly NavItem[] }) {
  return (
    <Disclosure
      className="xl:hidden"
      summaryClassName="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface"
      label="Menu"
      summary={<MenuIcon className="size-5" />}
    >
      <nav
        aria-label="Menu"
        className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border-strong bg-bg-raised px-gutter pt-3 pb-6 shadow-card"
      >
        <ul className="mx-auto max-w-md">
          {items.map((item) =>
            isNavGroup(item) ? (
              <li key={item.label} className="py-2">
                <p className="px-3 text-small font-semibold text-text-muted">{item.label}</p>
                <ul className="mt-1">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <Link prefetch={false} href={link.href} className={MENU_LINK}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>
                <Link prefetch={false} href={item.href} className={MENU_LINK}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
          <li className="mt-4">
            <ButtonLink href={CALL_CTA.href} className="w-full">
              {CALL_CTA.label}
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </Disclosure>
  );
}

/**
 * Sticky on every page: logo, navigation to real pages, theme toggle and the "Book a free call" button.
 * Links use prefetch={false} site-wide: pages render per request (the CSP nonce needs that), so a
 * prefetch would only make the server render pages nobody asked for. "Blog" shows only while at
 * least one post is published (`showBlog`).
 */
export function SiteHeader({ showBlog = false }: { showBlog?: boolean }) {
  const items = primaryNav(showBlog);
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
        <DesktopNav items={items} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={CALL_CTA.href}
            icon={null}
            className="min-h-11! px-5! py-2! text-small whitespace-nowrap max-[479px]:hidden!"
          >
            {CALL_CTA.label}
          </ButtonLink>
          <MobileNav items={items} />
        </div>
      </Container>
    </header>
  );
}
