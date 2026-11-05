import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import { SiteFooter } from "@/components/sections/SiteFooter.tsx";
import { SiteHeader } from "@/components/sections/SiteHeader.tsx";
import { BRAND, SITE_URL } from "@/lib/seo/site.ts";
import { THEME_INIT_SCRIPT } from "@/lib/theme.ts";

import "./globals.css";

// Two families max (frontend.md §3): a geometric display face and a clean body face.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="en-US" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
