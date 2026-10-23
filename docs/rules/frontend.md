# Frontend Rules — responsive, accessible, fast, clean

## 1. Responsiveness (every device, no compromise)

- Mobile-first Tailwind. Layout works from **280 px** (folded phones) to **2560 px** (4K) with **no horizontal scroll**.
- Fluid type and spacing with `clamp()` tokens; no fixed pixel font sizes in components.
- Container queries (`@container`) for cards and sections that appear in different widths.
- Max content width 1440 px; above that, content centers and backgrounds stay full-bleed.
- Use `100dvh` / `svh`, never `100vh`. Respect safe-area insets (`env(safe-area-inset-*)`).
- Hover effects only under `@media (hover: hover)`; everything works by touch and keyboard.
- Touch targets ≥ **44 × 44 px**, ≥ 8 px apart.
- Text stays readable at **200% zoom** and in landscape phones.
- Images use `sizes` correctly so phones never download desktop images.

### CI viewport matrix (`pnpm test:responsive`)

| Class | Widths (px) |
| --- | --- |
| Folded / small phones | 280, 320, 360 |
| Phones | 375, 390, 414, 430 |
| Tablets | 768, 820, 1024 |
| Laptops | 1280, 1366, 1440 |
| Desktop / 4K | 1920, 2560 |

Each width runs in portrait (and landscape for phones/tablets), light and dark theme, in Chromium, Firefox and WebKit. Fails on: `scrollWidth > clientWidth`, overlapping interactive elements, text overflow/clipping, tap targets < 44 px, or visual diff > 0.1% from the approved snapshot.

Before launch, manual check on real devices: iPhone (Safari), Samsung (Chrome), iPad, Pixel, a Windows laptop (Edge).

## 2. Accessibility (WCAG 2.2 AA minimum)

- Semantic HTML first (`header`, `nav`, `main`, `section` with headings, `footer`, `button` vs `a`).
- Visible focus ring on every interactive element; logical tab order; skip-to-content link.
- Color contrast ≥ 4.5:1 for text, ≥ 3:1 for large text and UI parts — in both themes.
- Forms: visible labels, error messages linked with `aria-describedby`, no placeholder-only labels.
- Motion respects `prefers-reduced-motion`; nothing flashes more than 3 times a second.
- Radix/shadcn primitives for dialogs, menus, tabs (correct ARIA out of the box).

## 3. Performance

- Server Components by default. `"use client"` only for real interaction, as low in the tree as possible.
- Static generation + ISR for all CMS pages; on-demand revalidation from Payload hooks.
- Fonts: `next/font`, max 2 families, subset Latin, `display: swap`, size-adjusted fallbacks.
- Hero: no video, no Lottie, no heavy JS; LCP element is text or an optimized `next/image` with `priority`.
- Animation libraries load lazily (`LazyMotion`, dynamic import) and animate only `transform`/`opacity`.
- Third-party scripts via `next/script` `afterInteractive` / `lazyOnload`; Cal.com, chatbot and maps load on interaction or when scrolled into view.
- No layout shift: reserve space for images, embeds, fonts and late content.

## 4. Design system

- Tokens in CSS variables (`--color-*`, `--space-*`, `--radius-*`, `--font-*`) exposed to Tailwind v4 `@theme`.
- Dark-first premium look with a full light theme; theme toggle remembers choice and follows the system by default.
- Components come only from `components/ui` and `components/sections`; no one-off styles in pages.
- Industry pages may change accent color and imagery through tokens, never by forking components.

## 5. Code quality

- TypeScript `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`. No `any` (use `unknown` + narrowing).
- ESLint: `next/core-web-vitals`, `next/typescript`, `jsx-a11y` strict, `import/order`, no unused vars, no console in production code.
- Prettier with `prettier-plugin-tailwindcss` (sorted classes).
- Components ≤ 200 lines; functions do one thing; name by what they do.
- Data fetching through typed helpers in `lib/` using the Payload Local API; generated Payload types only.
- All user input validated with Zod on the server; never trust client data.
- Errors: `error.tsx` boundaries per segment, Sentry capture, friendly messages to users.
- Tests sit next to the code they test or in `tests/`; every bug fix adds a test that would have caught it.
