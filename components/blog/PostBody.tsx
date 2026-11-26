import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { toImage } from "@/lib/blog/normalize.ts";
import type { Outline } from "@/lib/blog/toc.ts";
import type { Media } from "@/payload-types.ts";

import { PostCta } from "./PostCta.tsx";
import { PostFaq } from "./PostFaq.tsx";

/** One Lexical node as stored by Payload (only the fields the renderer reads). */
interface LexicalNode {
  type?: unknown;
  tag?: unknown;
  text?: unknown;
  format?: unknown;
  listType?: unknown;
  fields?: unknown;
  value?: unknown;
  children?: unknown;
}

const isNode = (value: unknown): value is LexicalNode =>
  typeof value === "object" && value !== null;
const childrenOf = (node: LexicalNode): LexicalNode[] =>
  Array.isArray(node.children) ? node.children.filter(isNode) : [];
const fieldsOf = (node: LexicalNode): Record<string, unknown> =>
  isNode(node.fields) ? (node.fields as Record<string, unknown>) : {};

// Lexical text format bit flags.
const BOLD = 1;
const ITALIC = 2;
const CODE = 16;

function renderText(node: LexicalNode, key: string): ReactNode {
  const format = typeof node.format === "number" ? node.format : 0;
  let out: ReactNode = typeof node.text === "string" ? node.text : "";
  if (format & CODE) out = <code key={`${key}c`}>{out}</code>;
  if (format & ITALIC) out = <em key={`${key}i`}>{out}</em>;
  if (format & BOLD) out = <strong key={`${key}b`}>{out}</strong>;
  return <span key={key}>{out}</span>;
}

function renderLink(node: LexicalNode, key: string): ReactNode {
  const fields = fieldsOf(node);
  const url = typeof fields.url === "string" ? fields.url : "";
  const children = renderInline(childrenOf(node), key);
  if (url.startsWith("/") && !url.startsWith("//")) {
    return (
      <Link key={key} href={url} prefetch={false} className="text-link">
        {children}
      </Link>
    );
  }
  const newTab = fields.newTab === true;
  return (
    <a
      key={key}
      href={url}
      className="text-link"
      rel={newTab ? "noopener noreferrer" : "noopener"}
      target={newTab ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

function renderInline(nodes: readonly LexicalNode[], prefix: string): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${prefix}-${index}`;
    if (node.type === "text") return renderText(node, key);
    if (node.type === "linebreak") return <br key={key} />;
    if (node.type === "link" || node.type === "autolink") return renderLink(node, key);
    return <span key={key}>{renderInline(childrenOf(node), key)}</span>;
  });
}

function renderList(node: LexicalNode, key: string): ReactNode {
  const items = childrenOf(node).map((item, index) => {
    const itemKey = `${key}-${index}`;
    const nested = childrenOf(item).filter((child) => child.type === "list");
    const inline = childrenOf(item).filter((child) => child.type !== "list");
    return (
      <li key={itemKey}>
        {renderInline(inline, itemKey)}
        {nested.map((list, n) => renderList(list, `${itemKey}-l${n}`))}
      </li>
    );
  });
  return node.listType === "number" ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>;
}

function renderUpload(node: LexicalNode, key: string): ReactNode {
  const image = toImage(isNode(node.value) ? (node.value as Media) : undefined);
  if (!image) return null;
  return (
    <figure key={key}>
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 768px) 720px, 100vw"
        className="h-auto w-full rounded-md"
      />
    </figure>
  );
}

function renderBlock(node: LexicalNode, key: string, id: string | undefined): ReactNode {
  const fields = fieldsOf(node);
  if (fields.blockType === "faq") return <PostFaq key={key} id={id} fields={fields} />;
  if (fields.blockType === "cta") return <PostCta key={key} fields={fields} />;
  return null;
}

function renderNode(node: LexicalNode, key: string, id: string | undefined): ReactNode {
  switch (node.type) {
    case "heading": {
      const tag = node.tag === "h3" ? "h3" : node.tag === "h4" ? "h4" : "h2";
      const Heading = tag;
      return (
        <Heading key={key} id={id}>
          {renderInline(childrenOf(node), key)}
        </Heading>
      );
    }
    case "paragraph": {
      const children = childrenOf(node);
      return children.length === 0 ? null : <p key={key}>{renderInline(children, key)}</p>;
    }
    case "quote":
      return <blockquote key={key}>{renderInline(childrenOf(node), key)}</blockquote>;
    case "list":
      return renderList(node, key);
    case "horizontalrule":
      return <hr key={key} />;
    case "upload":
      return renderUpload(node, key);
    case "block":
      return renderBlock(node, key, id);
    default:
      return null;
  }
}

/**
 * Renders a post body from Payload's Lexical JSON with semantic HTML only (content.md §8). Headings
 * get the anchor ids from `outline`, so the table of contents always links to them.
 */
export function PostBody({ content, outline }: { content: unknown; outline: Outline }) {
  const root = isNode(content) ? (content as { root?: unknown }).root : undefined;
  const nodes = isNode(root) ? childrenOf(root) : [];
  return (
    <div className="post-body">
      {nodes.map((node, index) => renderNode(node, `n${index}`, outline.ids.get(index)))}
    </div>
  );
}
