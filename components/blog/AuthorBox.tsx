import Image from "next/image";
import Link from "next/link";

import { authorPath } from "@/lib/blog/paths.ts";
import type { BlogAuthor } from "@/lib/blog/types.ts";

/**
 * Who wrote the post (content.md §6, E-E-A-T): photo, name, role, bio, a link to the author page
 * and the real profiles the author entered in the CMS.
 */
export function AuthorBox({
  author,
  headingId,
  linkToAuthorPage = true,
}: {
  author: BlogAuthor;
  headingId: string;
  linkToAuthorPage?: boolean;
}) {
  return (
    <section aria-labelledby={headingId} className="rounded-lg border border-border bg-surface p-6">
      <h2 id={headingId} className="text-h3 font-bold">
        About the author
      </h2>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        {author.photo ? (
          <Image
            src={author.photo.url}
            alt={author.photo.alt}
            width={96}
            height={96}
            sizes="96px"
            className="size-24 shrink-0 rounded-full object-cover"
          />
        ) : null}
        <div>
          <p className="font-display text-lead font-semibold">
            {linkToAuthorPage ? (
              <Link href={authorPath(author.slug)} prefetch={false} className="text-link">
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </p>
          {author.jobTitle ? <p className="text-small text-text-muted">{author.jobTitle}</p> : null}
          <p className="mt-3 text-text-muted">{author.bio}</p>
          {author.profiles.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-x-4">
              {author.profiles.map((profile) => (
                <li key={profile.url}>
                  <a
                    href={profile.url}
                    rel="noopener me"
                    className="text-link inline-flex min-h-11 items-center"
                  >
                    {author.name} on {profile.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
