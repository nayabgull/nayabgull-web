import { load } from "cheerio";

export interface Heading {
  level: number;
  text: string;
}

export interface PageLink {
  href: string;
  text: string;
}

export interface PageImage {
  alt: string | undefined;
  width: string | undefined;
  height: string | undefined;
  /** True when the tag was rendered by next/image (it adds `data-nimg`). */
  fromNextImage: boolean;
}

/** Everything the SEO, content and structured-data audits need from one rendered page. */
export interface PageSnapshot {
  lang: string | undefined;
  title: string | undefined;
  metaDescription: string | undefined;
  canonical: string | undefined;
  robots: string | undefined;
  /** `<meta property|name>` → content, for Open Graph and Twitter tags. */
  meta: Record<string, string>;
  headings: Heading[];
  jsonLd: string[];
  /** Links inside `<main>` (or `<body>` when there is no `<main>`). */
  links: PageLink[];
  images: PageImage[];
  /** Visible body copy blocks (paragraphs, list items, quotes, table cells) in reading order. */
  paragraphs: string[];
  /** All visible body copy, with navigation, header and footer removed. */
  bodyText: string;
}

const clean = (text: string): string => text.replace(/\s+/g, " ").trim();

export function snapshot(html: string): PageSnapshot {
  const $ = load(html);

  const meta: Record<string, string> = {};
  $("meta[property], meta[name]").each((_, el) => {
    const key = $(el).attr("property") ?? $(el).attr("name");
    const content = $(el).attr("content");
    if (key !== undefined && content !== undefined) meta[key] = content;
  });

  const headings: Heading[] = $("h1, h2, h3, h4, h5, h6")
    .toArray()
    .map((el) => ({ level: Number(el.tagName.slice(1)), text: clean($(el).text()) }));

  const jsonLd = $('script[type="application/ld+json"]')
    .toArray()
    .map((el) => $(el).text());

  const images: PageImage[] = $("img")
    .toArray()
    .map((el) => ({
      alt: $(el).attr("alt"),
      width: $(el).attr("width"),
      height: $(el).attr("height"),
      fromNextImage: $(el).attr("data-nimg") !== undefined,
    }));

  const root = $("main").length > 0 ? $("main").first() : $("body");
  const links: PageLink[] = root
    .find("a[href]")
    .toArray()
    .map((el) => ({ href: $(el).attr("href") ?? "", text: clean($(el).text()) }));

  const body = $("body").clone();
  body
    .find("script, style, noscript, template, nav, header, footer, [aria-hidden='true']")
    .remove();
  const paragraphs = body
    .find("p, li, blockquote, td, dd")
    .toArray()
    .filter((el) => $(el).find("p, li").length === 0)
    .map((el) => clean($(el).text()))
    .filter((text) => text !== "");

  return {
    lang: $("html").attr("lang"),
    title: $("head > title").first().text() || undefined,
    metaDescription: meta.description,
    canonical: $('link[rel="canonical"]').attr("href"),
    robots: meta.robots,
    meta,
    headings,
    jsonLd,
    links,
    images,
    paragraphs,
    bodyText: clean(body.text()),
  };
}
