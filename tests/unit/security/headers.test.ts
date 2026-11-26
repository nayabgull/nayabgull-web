import { describe, expect, it } from "vitest";

import {
  contentSecurityPolicy,
  HSTS,
  NONCE_HEADER,
  STATIC_SECURITY_HEADERS,
} from "@/lib/security/headers.ts";
import { checkSecurityHeaders, REQUIRED_HSTS } from "@/lib/seo/site-rules.ts";

describe("security headers (seo.md §9)", () => {
  it("passes the SEO audit's header rules", () => {
    const headers: Record<string, string> = {
      "content-security-policy": contentSecurityPolicy("abc123"),
    };
    for (const { key, value } of STATIC_SECURITY_HEADERS) headers[key.toLowerCase()] = value;
    expect(checkSecurityHeaders(headers)).toEqual([]);
    expect(HSTS).toBe(REQUIRED_HSTS);
    expect(NONCE_HEADER).toBe("x-nonce");
  });

  it("allows scripts only with the nonce, and never inline or eval in production", () => {
    const csp = contentSecurityPolicy("abc123");
    const scripts = csp.split("; ").find((part) => part.startsWith("script-src")) ?? "";
    expect(scripts).toBe("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("frame-src https://challenges.cloudflare.com");
  });

  it("adds unsafe-eval only in development", () => {
    expect(contentSecurityPolicy("n", { dev: true })).toContain("'unsafe-eval'");
    expect(contentSecurityPolicy("n", { dev: false })).not.toContain("'unsafe-eval'");
  });
});
