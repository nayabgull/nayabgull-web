import Link from "next/link";

import { Container } from "@/components/ui/Container.tsx";
import { Logo } from "@/components/ui/Logo.tsx";
import { FOOTER_NAV } from "@/content/navigation.ts";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pt-12 pb-[max(3rem,env(safe-area-inset-bottom))]">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-small text-text-muted">
              Full-stack development, GoHighLevel and AI automation for US businesses.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-16 gap-y-8">
            {FOOTER_NAV.map((group) => (
              <div key={group.title}>
                <p className="font-display text-small font-semibold">{group.title}</p>
                <ul className="mt-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="inline-flex min-h-11 min-w-11 items-center text-small text-text-muted underline-offset-4 hover:text-text hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-small text-text-muted">
          © {new Date().getFullYear()} Nayab Gull. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
