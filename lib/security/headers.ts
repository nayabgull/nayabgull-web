/**
 * Security headers from docs/rules/seo.md §9. The static ones go on every response through
 * next.config.ts; the Content-Security-Policy carries a fresh nonce per request and is set in proxy.ts.
 */
export const HSTS = "max-age=63072000; includeSubDomains; preload";

export const STATIC_SECURITY_HEADERS: readonly { key: string; value: string }[] = [
  { key: "Strict-Transport-Security", value: HSTS },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

/** Cloudflare Turnstile (the quote form's spam check) loads its script and its frame from here. */
const TURNSTILE = "https://challenges.cloudflare.com";

/**
 * CSP for the public site. Scripts run only with the request's nonce ('strict-dynamic' lets a
 * trusted script load another one, which is how the Turnstile script arrives). In development React
 * needs 'unsafe-eval' for its debugging tools; production never gets it.
 */
export function contentSecurityPolicy(nonce: string, options: { dev?: boolean } = {}): string {
  const scripts = ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"];
  if (options.dev) scripts.push("'unsafe-eval'");
  return [
    "default-src 'self'",
    `script-src ${scripts.join(" ")}`,
    // next/image and the Turnstile widget set inline style attributes.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    `connect-src 'self' ${TURNSTILE}`,
    `frame-src ${TURNSTILE}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

/** Request header that carries the nonce from proxy.ts to the root layout. */
export const NONCE_HEADER = "x-nonce";
