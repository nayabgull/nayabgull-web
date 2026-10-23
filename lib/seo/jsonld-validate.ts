import type { Issue } from "./issue.ts";
import type { PageType } from "./page-types.ts";
import { requiredSchemaTypes } from "./page-types.ts";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function typesOf(node: JsonObject): string[] {
  const type = node["@type"];
  if (typeof type === "string") return [type];
  if (Array.isArray(type)) return type.filter((t): t is string => typeof t === "string");
  return [];
}

/** Flattens top-level arrays and `@graph` into a list of nodes. */
function collectNodes(value: unknown): JsonObject[] {
  if (Array.isArray(value)) return value.flatMap(collectNodes);
  if (!isObject(value)) return [];
  const graph = value["@graph"];
  return Array.isArray(graph) ? [value, ...graph.flatMap(collectNodes)] : [value];
}

/** Required properties for types where missing data would make the markup invalid or useless. */
const REQUIRED_PROPS: Record<string, string[]> = {
  BreadcrumbList: ["itemListElement"],
  Person: ["name"],
  ProfessionalService: ["name", "url"],
  WebSite: ["name", "url"],
  Service: ["name", "provider", "areaServed"],
  BlogPosting: ["headline", "author", "datePublished", "dateModified", "image"],
  Article: ["headline", "author", "datePublished"],
  WebApplication: ["name"],
  FAQPage: ["mainEntity"],
};

const BANNED_TYPES = ["Review", "AggregateRating"];

/** Validates the raw contents of every `<script type="application/ld+json">` block on a page. */
export function validateJsonLd(blocks: readonly string[], pageType: PageType): Issue[] {
  const issues: Issue[] = [];
  if (blocks.length === 0) {
    return [{ rule: "jsonld-present", message: "No JSON-LD block on the page." }];
  }

  const nodes: JsonObject[] = [];
  blocks.forEach((raw, index) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      issues.push({
        rule: "jsonld-parse",
        message: `JSON-LD block ${index + 1} is not valid JSON.`,
      });
      return;
    }
    const roots = Array.isArray(parsed) ? parsed : [parsed];
    for (const root of roots) {
      if (!isObject(root) || root["@context"] !== "https://schema.org") {
        issues.push({
          rule: "jsonld-context",
          message: `JSON-LD block ${index + 1} must use "@context": "https://schema.org".`,
        });
      }
    }
    nodes.push(...collectNodes(parsed));
  });

  const found = new Set<string>();
  for (const node of nodes) {
    const types = typesOf(node);
    if (types.length === 0 && node["@graph"] === undefined) {
      issues.push({ rule: "jsonld-type", message: "A JSON-LD node has no @type." });
    }
    for (const type of types) {
      found.add(type);
      if (BANNED_TYPES.includes(type)) {
        issues.push({
          rule: "jsonld-banned",
          message: `Self-serving ${type} markup is not allowed.`,
        });
      }
      for (const prop of REQUIRED_PROPS[type] ?? []) {
        if (node[prop] === undefined) {
          issues.push({ rule: "jsonld-property", message: `${type} is missing "${prop}".` });
        }
      }
    }
  }

  for (const type of requiredSchemaTypes(pageType)) {
    if (!found.has(type)) {
      issues.push({ rule: "jsonld-required-type", message: `Missing required ${type} schema.` });
    }
  }
  return issues;
}
