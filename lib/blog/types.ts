/** What the blog pages render. Built from Payload documents by lib/blog/normalize.ts. */

export interface BlogImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}

export interface ProfileLink {
  label: string;
  url: string;
}

export interface BlogAuthor {
  name: string;
  slug: string;
  jobTitle: string | undefined;
  bio: string;
  photo: BlogImage | undefined;
  profiles: ProfileLink[];
}

/** A post in a list: no body, so list queries stay small. */
export interface PostSummary {
  title: string;
  slug: string;
  excerpt: string;
  /** ISO 8601. */
  datePublished: string;
  dateModified: string;
  category: BlogCategory | undefined;
  tags: string[];
  author: { name: string; slug: string } | undefined;
}

export interface BlogPost extends PostSummary {
  directAnswer: string;
  hub: string;
  heroImage: BlogImage | undefined;
  authorProfile: BlogAuthor | undefined;
  /** Lexical editor state with relationships populated. */
  content: unknown;
  seo: { title: string; metaDescription: string };
}
