import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import { STATIC_SECURITY_HEADERS } from "./lib/security/headers.ts";

/** Never let search engines index the CMS: seo.md §7. */
const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  headers() {
    return Promise.resolve([
      // seo.md §9. The Content-Security-Policy needs a nonce per request, so proxy.ts sets it.
      { source: "/:path*", headers: [...STATIC_SECURITY_HEADERS] },
      { source: "/admin", headers: NOINDEX },
      { source: "/admin/:path*", headers: NOINDEX },
      { source: "/api", headers: NOINDEX },
      { source: "/api/:path*", headers: NOINDEX },
    ]);
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withPayload(nextConfig);
