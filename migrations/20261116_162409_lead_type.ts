import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_leads_type" AS ENUM('quote', 'demo');
  ALTER TYPE "public"."enum_leads_service" ADD VALUE 'ai-agent' BEFORE 'full-system';
  ALTER TABLE "leads" ADD COLUMN "type" "enum_leads_type" DEFAULT 'quote' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leads" ALTER COLUMN "service" SET DATA TYPE text;
  DROP TYPE "public"."enum_leads_service";
  CREATE TYPE "public"."enum_leads_service" AS ENUM('website', 'gohighlevel', 'ai-automation', 'full-system');
  ALTER TABLE "leads" ALTER COLUMN "service" SET DATA TYPE "public"."enum_leads_service" USING "service"::"public"."enum_leads_service";
  ALTER TABLE "leads" DROP COLUMN "type";
  DROP TYPE "public"."enum_leads_type";`)
}
