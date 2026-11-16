import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { contentSecurityPolicy, NONCE_HEADER } from "@/lib/security/headers.ts";

/**
 * Adds a Content-Security-Policy with a fresh nonce to every public page (seo.md §9). Next.js reads
 * the nonce from the request's CSP header and puts it on its own scripts; the root layout reads
 * x-nonce for the theme script. The other security headers are static (next.config.ts).
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = contentSecurityPolicy(nonce, { dev: process.env.NODE_ENV === "development" });

  const headers = new Headers(request.headers);
  headers.set(NONCE_HEADER, nonce);
  headers.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers } });
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
