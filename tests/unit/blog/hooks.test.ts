import { describe, expect, it, vi } from "vitest";

const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({ revalidateTag }));

const hooks = await import("@/collections/hooks/revalidate-blog.ts");

type AnyArgs = Parameters<typeof hooks.revalidatePostAfterChange>[0];
const args = (doc: unknown, previousDoc?: unknown) => ({ doc, previousDoc }) as unknown as AnyArgs;

describe("blog revalidation hooks", () => {
  it("revalidates the blog tag with no stale window on publish and unpublish", () => {
    revalidateTag.mockClear();
    hooks.revalidatePostAfterChange(args({ _status: "published" }, { _status: "draft" }));
    hooks.revalidatePostAfterChange(args({ _status: "draft" }, { _status: "published" }));
    expect(revalidateTag).toHaveBeenCalledTimes(2);
    expect(revalidateTag).toHaveBeenCalledWith("blog", { expire: 0 });
  });

  it("does nothing for a draft save", () => {
    revalidateTag.mockClear();
    const doc = { _status: "draft" };
    expect(hooks.revalidatePostAfterChange(args(doc, { _status: "draft" }))).toBe(doc);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates on any author, category, media or FAQ change and on delete", () => {
    revalidateTag.mockClear();
    const doc = { id: 1 };
    expect(hooks.revalidateBlogAfterChange(args(doc))).toBe(doc);
    expect(
      hooks.revalidateBlogAfterDelete(
        args(doc) as unknown as Parameters<typeof hooks.revalidateBlogAfterDelete>[0],
      ),
    ).toBe(doc);
    expect(revalidateTag).toHaveBeenCalledTimes(2);
  });

  it("ignores the error Next.js throws outside a request (scripts, migrations)", () => {
    revalidateTag.mockImplementationOnce(() => {
      throw new Error("static generation store missing");
    });
    expect(() => {
      hooks.revalidateBlog();
    }).not.toThrow();
  });
});
