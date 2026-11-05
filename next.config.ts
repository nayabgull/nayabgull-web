import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

/** Never let search engines index the CMS: seo.md §7. */
const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  headers() {
    return Promise.resolve([
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
