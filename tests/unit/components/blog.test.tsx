import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AuthorBox } from "@/components/blog/AuthorBox.tsx";
import { HubLink } from "@/components/blog/HubLink.tsx";
import { Pagination } from "@/components/blog/Pagination.tsx";
import { PostAside } from "@/components/blog/PostAside.tsx";
import { PostBody } from "@/components/blog/PostBody.tsx";
import { PostCta } from "@/components/blog/PostCta.tsx";
import { PostFaq } from "@/components/blog/PostFaq.tsx";
import { PostHeader } from "@/components/blog/PostHeader.tsx";
import { PostList } from "@/components/blog/PostList.tsx";
import { TableOfContents } from "@/components/blog/TableOfContents.tsx";
import { CALL_CTA } from "@/content/home.ts";
import { toPost, toSummary } from "@/lib/blog/normalize.ts";
import { outline } from "@/lib/blog/toc.ts";

import {
  ctaBlock,
  faqBlock,
  FAQ_DOC,
  linksParagraph,
  MEDIA,
  POST_DOC,
  uploadNode,
} from "../blog/fixtures.ts";
import { heading, lexical } from "../cms/fixtures.ts";

afterEach(cleanup);

const POST = toPost(POST_DOC);

const formatted = (text: string, format: number) => ({ type: "text", text, format, version: 1 });

describe("PostBody", () => {
  it("renders semantic HTML with heading anchors from the outline", () => {
    const content = lexical(
      heading("h2", "First section"),
      {
        type: "paragraph",
        children: [
          formatted("bold", 1),
          formatted("italic", 2),
          formatted("code", 16),
          { type: "linebreak" },
          { type: "tab", children: [formatted("tab", 0)] },
        ],
      },
      { type: "paragraph", children: [] },
      heading("h3", "Detail"),
      heading("h4", "Smaller"),
      { type: "quote", children: [formatted("A quote", 0)] },
      {
        type: "list",
        listType: "number",
        children: [
          {
            type: "listitem",
            children: [
              formatted("One", 0),
              {
                type: "list",
                listType: "bullet",
                children: [{ type: "listitem", children: [formatted("Nested", 0)] }],
              },
            ],
          },
        ],
      },
      { type: "horizontalrule" },
      linksParagraph(["/pricing", "website pricing"], ["https://example.com/report", "the report"]),
      {
        type: "paragraph",
        children: [
          {
            type: "link",
            fields: { url: "https://example.com/x", newTab: true },
            children: [formatted("new tab", 0)],
          },
        ],
      },
      uploadNode(MEDIA),
      uploadNode(11),
      faqBlock([FAQ_DOC]),
      ctaBlock("Need help?", "Book a call."),
      { type: "block", fields: { blockType: "unknown" } },
      { type: "mystery" },
    );
    const { container } = render(<PostBody content={content} outline={outline(content)} />);
    expect(screen.getByRole("heading", { level: 2, name: "First section" })).toHaveAttribute(
      "id",
      "first-section",
    );
    expect(screen.getByRole("heading", { level: 3, name: "Detail" })).toHaveAttribute(
      "id",
      "detail",
    );
    expect(screen.getByRole("heading", { level: 4, name: "Smaller" })).toBeInTheDocument();
    expect(container.querySelector("strong")).toHaveTextContent("bold");
    expect(container.querySelector("em")).toHaveTextContent("italic");
    expect(container.querySelector("code")).toHaveTextContent("code");
    expect(container.querySelector("blockquote")).toHaveTextContent("A quote");
    expect(container.querySelector("ol li ul li")).toHaveTextContent("Nested");
    expect(container.querySelector("hr")).not.toBeNull();
    expect(screen.getByRole("link", { name: "website pricing" })).toHaveAttribute(
      "href",
      "/pricing",
    );
    expect(screen.getByRole("link", { name: "the report" })).toHaveAttribute("rel", "noopener");
    expect(screen.getByRole("link", { name: "new tab" })).toHaveAttribute("target", "_blank");
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByRole("img")).toHaveAttribute("alt", MEDIA.alt);
    expect(
      screen.getByRole("heading", { level: 2, name: "Frequently asked questions" }),
    ).toHaveAttribute("id", "frequently-asked-questions");
    expect(screen.getByText(FAQ_DOC.question)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: CALL_CTA.label })).toHaveAttribute(
      "href",
      CALL_CTA.href,
    );
  });

  it("renders nothing for a value that is not a Lexical state", () => {
    const { container } = render(<PostBody content={null} outline={outline(null)} />);
    expect(container.querySelector(".post-body")?.childElementCount).toBe(0);
  });
});

describe("post blocks", () => {
  it("hides an FAQ with no populated items and a CTA with no heading", () => {
    const { container } = render(
      <>
        <PostFaq id="x" fields={{ heading: "Q", faqs: [1] }} />
        <PostCta fields={{ heading: "", text: "x" }} />
        <PostCta fields={{ heading: "Only a heading" }} />
      </>,
    );
    expect(container.querySelectorAll("section")).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "Only a heading" })).toBeInTheDocument();
  });
});

describe("PostHeader", () => {
  it("shows the H1, byline, both dates, the hero image and the direct answer", () => {
    render(<PostHeader post={POST} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(POST.title);
    expect(screen.getByText(/By Test Author/)).toHaveTextContent("Updated November 10, 2026");
    expect(screen.getByText(/By Test Author/)).toHaveTextContent("Published November 2, 2026");
    expect(screen.getByRole("img")).toHaveAttribute("alt", MEDIA.alt);
    expect(screen.getByText(POST.directAnswer)).toBeInTheDocument();
    const crumbs = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(crumbs).getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
  });

  it("shows only the publish date when the post was not updated later", () => {
    render(
      <PostHeader
        post={{
          ...POST,
          dateModified: POST.datePublished,
          heroImage: undefined,
          author: undefined,
          category: undefined,
        }}
      />,
    );
    expect(screen.queryByText(/Updated/)).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });
});

describe("TableOfContents and HubLink", () => {
  it("links every H2 and hides itself with fewer than two", () => {
    const { rerender } = render(
      <TableOfContents
        entries={[
          { id: "a", text: "A", level: 2 },
          { id: "b", text: "B", level: 2 },
        ]}
      />,
    );
    const toc = screen.getByRole("navigation", { name: "Table of contents" });
    expect(within(toc).getByRole("link", { name: "B" })).toHaveAttribute("href", "#b");
    rerender(<TableOfContents entries={[{ id: "a", text: "A", level: 2 }]} />);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("links up to the hub page, and renders nothing for an unknown hub", () => {
    const { rerender } = render(<HubLink hub="/gohighlevel-agency" />);
    expect(screen.getByRole("link", { name: "GoHighLevel agency" })).toHaveAttribute(
      "href",
      "/gohighlevel-agency",
    );
    rerender(<HubLink hub="/nope" />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});

describe("AuthorBox and PostAside", () => {
  it("shows the author with real profile links and an author page link", () => {
    if (!POST.authorProfile) throw new Error("fixture has an author");
    render(<AuthorBox author={POST.authorProfile} headingId="a" />);
    expect(screen.getByRole("link", { name: "Test Author" })).toHaveAttribute(
      "href",
      "/blog/author/test-author",
    );
    expect(screen.getByRole("link", { name: "Test Author on LinkedIn" })).toHaveAttribute(
      "rel",
      "noopener me",
    );
  });

  it("can leave out the photo, role, profiles and the author page link", () => {
    render(
      <AuthorBox
        author={{
          name: "N",
          slug: "n",
          jobTitle: undefined,
          bio: "Bio.",
          photo: undefined,
          profiles: [],
        }}
        headingId="a"
        linkToAuthorPage={false}
      />,
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders a top-level aside with author, topics and related posts", () => {
    render(
      <PostAside
        post={POST}
        related={[{ ...toSummary(POST_DOC), slug: "other", title: "Other post" }]}
      />,
    );
    const aside = screen.getByRole("complementary", { name: "About this post" });
    expect(within(aside).getByRole("link", { name: "GoHighLevel" })).toHaveAttribute(
      "href",
      "/blog/category/gohighlevel",
    );
    expect(within(aside).getByRole("link", { name: "#Workflows" })).toHaveAttribute(
      "href",
      "/blog/tag/workflows",
    );
    expect(within(aside).getByRole("link", { name: "Other post" })).toHaveAttribute(
      "href",
      "/blog/other",
    );
  });

  it("leaves out empty parts", () => {
    render(
      <PostAside
        post={{ ...POST, authorProfile: undefined, category: undefined, tags: [] }}
        related={[]}
      />,
    );
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});

describe("PostList and Pagination", () => {
  it("lists posts with newer/older links", () => {
    const summary = toSummary(POST_DOC);
    render(
      <PostList
        title="Blog"
        intro="Intro"
        list={{ items: [summary], page: 2, totalPages: 3 }}
        base="/blog"
      >
        <p>Extra</p>
      </PostList>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Blog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: summary.title })).toHaveAttribute(
      "href",
      `/blog/${summary.slug}`,
    );
    expect(screen.getByRole("link", { name: "Newer posts" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Older posts" })).toHaveAttribute(
      "href",
      "/blog/page/3",
    );
    expect(screen.getByText("Extra")).toBeInTheDocument();
  });

  it("hides pagination on a single page and the outer links on the ends", () => {
    const { rerender } = render(<Pagination base="/blog" page={1} totalPages={1} />);
    expect(screen.queryByRole("navigation")).toBeNull();
    rerender(<Pagination base="/blog" page={3} totalPages={3} />);
    expect(screen.queryByRole("link", { name: "Older posts" })).toBeNull();
    rerender(<Pagination base="/blog" page={1} totalPages={2} />);
    expect(screen.queryByRole("link", { name: "Newer posts" })).toBeNull();
  });

  it("shows a card without a category", () => {
    render(
      <PostList
        title="T"
        intro={null}
        list={{ items: [{ ...toSummary(POST_DOC), category: undefined }], page: 1, totalPages: 1 }}
        base="/blog"
      />,
    );
    expect(screen.queryByText(/GoHighLevel ·/)).toBeNull();
  });
});
