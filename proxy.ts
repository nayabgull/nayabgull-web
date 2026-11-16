import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { contentSecurityPolicy, NONCE_HEADER } from "@/lib/security/headers.ts";
import { comingSoonDecision, isComingSoon } from "@/lib/site-mode.ts";

/**
 * Adds a Content-Security-Policy with a fresh nonce to every public page (seo.md §9). Next.js reads
 * the nonce from the request's CSP header and puts it on its own scripts; the root layout reads
 * x-nonce for the theme script. The other security headers are static (next.config.ts).
 *
 * With SITE_MODE=coming-soon it also rewrites every public route to the coming-soon page
 * (lib/site-mode.ts decides which paths stay open: the legal pages and everything the matcher skips).
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = contentSecurityPolicy(nonce, { dev: process.env.NODE_ENV === "development" });

  const headers = new Headers(request.headers);
  headers.set(NONCE_HEADER, nonce);
  headers.set("Content-Security-Policy", csp);

  let response = NextResponse.next({ request: { headers } });
  if (isComingSoon(process.env)) {
    const decision = comingSoonDecision(request.nextUrl.pathname);
    if (decision.action === "redirect") {
      // 308 keeps the method; the holding page has one address only: "/".
      response = NextResponse.redirect(new URL(decision.to, request.url), 308);
    } else if (decision.action === "rewrite") {
      response = NextResponse.rewrite(new URL(decision.to, request.url), { request: { headers } });
    }
  }
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Public pages only: not the CMS (/admin, /api), not static files, images or icons.
      source:
        "/((?!admin|api|_next/static|_next/image|og/|.*\\.(?:ico|png|svg|webp|avif|txt|xml)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
