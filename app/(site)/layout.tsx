import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";

import { MobileCtaBar } from "@/components/sections/MobileCtaBar.tsx";
import { SiteFooter } from "@/components/sections/SiteFooter.tsx";
import { SiteHeader } from "@/components/sections/SiteHeader.tsx";
import { BRAND, SITE_URL } from "@/lib/seo/site.ts";
import { THEME_INIT_SCRIPT } from "@/lib/theme.ts";

import "./globals.css";

// Headings only (frontend.md §3, max 2 families). Body text uses the system font stack from
// globals.css, so the only font download is Sora, which keeps mobile LCP down.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060c1f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7fc" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is set before paint by THEME_INIT_SCRIPT, so React must not warn about it.
    <html lang="en-US" className={sora.variable} suppressHydrationWarning>
      <head>
        <script
          // Constant string from lib/theme.ts; no user input reaches it.
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}
