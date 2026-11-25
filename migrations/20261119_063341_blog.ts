import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Blog: Categories collection, post fields (excerpt, direct answer, hub, category relationship,
 * datePublished, dateModified) and author profile fields (LinkedIn, GitHub, Upwork).
 *
 * Hand-edited from `payload migrate:create` so no existing data is lost:
 * - posts.published_at is renamed to date_published (not dropped and re-added);
 * - old free-text categories become Category documents and posts point at them;
 * - author profile links move from the authors_same_as array to the new columns, matched by host.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");

  ALTER TABLE "authors" ADD COLUMN "linkedin_url" varchar;
  ALTER TABLE "authors" ADD COLUMN "github_url" varchar;
  ALTER TABLE "authors" ADD COLUMN "upwork_url" varchar;
  UPDATE "authors" a SET "linkedin_url" = s."url" FROM (
    SELECT DISTINCT ON ("_parent_id") "_parent_id", "url" FROM "authors_same_as"
    WHERE "url" ~* '^https://(www\\.)?linkedin\\.com/' ORDER BY "_parent_id", "_order"
  ) s WHERE s."_parent_id" = a."id";
  UPDATE "authors" a SET "github_url" = s."url" FROM (
    SELECT DISTINCT ON ("_parent_id") "_parent_id", "url" FROM "authors_same_as"
    WHERE "url" ~* '^https://(www\\.)?github\\.com/' ORDER BY "_parent_id", "_order"
  ) s WHERE s."_parent_id" = a."id";
  UPDATE "authors" a SET "upwork_url" = s."url" FROM (
    SELECT DISTINCT ON ("_parent_id") "_parent_id", "url" FROM "authors_same_as"
    WHERE "url" ~* '^https://(www\\.)?upwork\\.com/' ORDER BY "_parent_id", "_order"
  ) s WHERE s."_parent_id" = a."id";
  DROP TABLE "authors_same_as" CASCADE;

  ALTER TABLE "posts" RENAME COLUMN "published_at" TO "date_published";
  ALTER TABLE "_posts_v" RENAME COLUMN "version_published_at" TO "version_date_published";
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts" ADD COLUMN "direct_answer" varchar;
  ALTER TABLE "posts" ADD COLUMN "hub" varchar;
  ALTER TABLE "posts" ADD COLUMN "category_id" integer;
  ALTER TABLE "posts" ADD COLUMN "date_modified" timestamp(3) with time zone;
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_direct_answer" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hub" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_date_modified" timestamp(3) with time zone;

  INSERT INTO "categories" ("name", "slug", "description")
  SELECT DISTINCT ON (slug) name, slug, name FROM (
    SELECT trim("category") AS name,
      trim(both '-' from regexp_replace(lower(trim("category")), '[^a-z0-9]+', '-', 'g')) AS slug
    FROM "posts" WHERE coalesce(trim("category"), '') <> ''
    UNION ALL
    SELECT trim("version_category"),
      trim(both '-' from regexp_replace(lower(trim("version_category")), '[^a-z0-9]+', '-', 'g'))
    FROM "_posts_v" WHERE coalesce(trim("version_category"), '') <> ''
  ) old WHERE slug <> '' ORDER BY slug, name;
  UPDATE "posts" p SET "category_id" = c."id" FROM "categories" c
  WHERE c."slug" = trim(both '-' from regexp_replace(lower(trim(p."category")), '[^a-z0-9]+', '-', 'g'));
  UPDATE "_posts_v" v SET "version_category_id" = c."id" FROM "categories" c
  WHERE c."slug" = trim(both '-' from regexp_replace(lower(trim(v."version_category")), '[^a-z0-9]+', '-', 'g'));

  DROP INDEX "posts_category_idx";
  DROP INDEX "_posts_v_version_version_category_idx";
  ALTER TABLE "posts" DROP COLUMN "category";
  ALTER TABLE "_posts_v" DROP COLUMN "version_category";
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category_id");

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "authors_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  ALTER TABLE "authors_same_as" ADD CONSTRAINT "authors_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "authors_same_as_order_idx" ON "authors_same_as" USING btree ("_order");
  CREATE INDEX "authors_same_as_parent_id_idx" ON "authors_same_as" USING btree ("_parent_id");
  INSERT INTO "authors_same_as" ("_order", "_parent_id", "id", "label", "url")
  SELECT row_number() OVER (PARTITION BY id ORDER BY ord), id, substr(md5(random()::text), 1, 24), label, url
  FROM (
    SELECT "id", 1 AS ord, 'LinkedIn' AS label, "linkedin_url" AS url FROM "authors" WHERE "linkedin_url" IS NOT NULL
    UNION ALL SELECT "id", 2, 'GitHub', "github_url" FROM "authors" WHERE "github_url" IS NOT NULL
    UNION ALL SELECT "id", 3, 'Upwork', "upwork_url" FROM "authors" WHERE "upwork_url" IS NOT NULL
  ) links;
  ALTER TABLE "authors" DROP COLUMN "linkedin_url";
  ALTER TABLE "authors" DROP COLUMN "github_url";
  ALTER TABLE "authors" DROP COLUMN "upwork_url";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";

  ALTER TABLE "posts" ADD COLUMN "category" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_category" varchar;
  UPDATE "posts" p SET "category" = c."name" FROM "categories" c WHERE c."id" = p."category_id";
  UPDATE "_posts_v" v SET "version_category" = c."name" FROM "categories" c WHERE c."id" = v."version_category_id";
  ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_categories_id_fk";
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_category_id_categories_id_fk";
  DROP INDEX "posts_category_idx";
  DROP INDEX "_posts_v_version_version_category_idx";
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category");
  DROP TABLE "categories" CASCADE;

  ALTER TABLE "posts" RENAME COLUMN "date_published" TO "published_at";
  ALTER TABLE "_posts_v" RENAME COLUMN "version_date_published" TO "version_published_at";
  ALTER TABLE "posts" DROP COLUMN "excerpt";
  ALTER TABLE "posts" DROP COLUMN "direct_answer";
  ALTER TABLE "posts" DROP COLUMN "hub";
  ALTER TABLE "posts" DROP COLUMN "category_id";
  ALTER TABLE "posts" DROP COLUMN "date_modified";
  ALTER TABLE "_posts_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_direct_answer";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hub";
  ALTER TABLE "_posts_v" DROP COLUMN "version_category_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_date_modified";`)
}
