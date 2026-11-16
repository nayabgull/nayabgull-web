import Link from "next/link";

import type { Rich } from "@/content/pages/types.ts";

const isExternal = (href: string): boolean => /^https?:\/\//.test(href);

/** Body copy with optional inline links. Internal links use next/link; external ones get rel="noopener". */
export function RichText({ value }: { value: Rich }) {
  if (typeof value === "string") return <>{value}</>;
  return (
    <>
      {value.map((part) => {
        if (typeof part === "string") return part;
        return isExternal(part.href) ? (
          <a key={part.href + part.text} href={part.href} rel="noopener" className="text-link">
            {part.text}
          </a>
        ) : (
          <Link key={part.href + part.text} href={part.href} className="text-link">
            {part.text}
          </Link>
        );
      })}
    </>
  );
}
