import { ValidationError } from "payload";
import type { CollectionBeforeChangeHook } from "payload";
import { describe, expect, it } from "vitest";

import { enforcePublishRules } from "@/collections/hooks/enforce-publish-rules.ts";

import { GOOD_SERVICE, lexical, paragraph } from "./fixtures.ts";

type Args = Parameters<CollectionBeforeChangeHook>[0];

const run = (data: Record<string, unknown>, originalDoc?: Record<string, unknown>) =>
  enforcePublishRules("services")({
    data,
    originalDoc,
    operation: originalDoc ? "update" : "create",
  } as unknown as Args) as Record<string, unknown>;

const good = {
  title: GOOD_SERVICE.title,
  slug: GOOD_SERVICE.slug,
  section: GOOD_SERVICE.section,
  seo: { ...GOOD_SERVICE.seo, canonical: undefined },
  content: GOOD_SERVICE.content,
};

describe("enforcePublishRules", () => {
  it("lets a draft save even when it breaks every rule", () => {
    const data = {
      _status: "draft",
      title: "x",
      slug: "not-in-the-map",
      content: lexical(paragraph("Hi.")),
    };
    expect(run(data)).toMatchObject({ title: "x" });
  });

  it("fills in the canonical from the slug", () => {
    const result = run({ ...good, _status: "draft" });
    expect(result.seo).toMatchObject({
      canonical: "https://nayabgull.com/services/web-design-development",
    });
  });

  it("does not invent a canonical before there is a slug", () => {
    const result = run({ _status: "draft", title: "New" });
    expect(result.seo).toBeUndefined();
  });

  it("publishes a document that passes every rule", () => {
    expect(() => run({ ...good, _status: "published" })).not.toThrow();
  });

  it("blocks publishing with field-level errors", () => {
    let error: unknown;
    try {
      run({ ...good, _status: "published", slug: "not-in-the-map" });
    } catch (caught) {
      error = caught;
    }
    expect(error).toBeInstanceOf(ValidationError);
    const { errors } = (error as ValidationError).data as {
      errors: { message: string; path: string }[];
    };
    expect(errors[0]).toMatchObject({ path: "seo.primaryKeyword" });
    expect(errors[0]?.message).toMatch(/^\[keyword-registered\]/);
  });

  it("checks the merged document when an update sends only some fields", () => {
    expect(() => run({ _status: "published" }, good)).not.toThrow();
    expect(() => run({ _status: "published", title: "Nope" }, good)).toThrow(ValidationError);
  });

  it("checks a published document that is edited without a status in the payload", () => {
    expect(() => run({ title: "Nope" }, { ...good, _status: "published" })).toThrow(
      ValidationError,
    );
  });
});
