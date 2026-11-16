import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_leads_lead_type" AS ENUM('quote', 'demo');
  ALTER TYPE "public"."enum_leads_service" ADD VALUE 'ai-agent';
  ALTER TYPE "public"."enum_leads_service" ADD VALUE 'ai-receptionist';
  ALTER TABLE "leads" ADD COLUMN "lead_type" "enum_leads_lead_type" DEFAULT 'quote' NOT NULL;
  ALTER TABLE "leads" ADD COLUMN "business_name" varchar;
  ALTER TABLE "leads" ADD COLUMN "website" varchar;
  CREATE INDEX "leads_lead_type_idx" ON "leads" USING btree ("lead_type");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leads" ALTER COLUMN "service" SET DATA TYPE text;
  DROP TYPE "public"."enum_leads_service";
  CREATE TYPE "public"."enum_leads_service" AS ENUM('website', 'gohighlevel', 'ai-automation', 'full-system');
  ALTER TABLE "leads" ALTER COLUMN "service" SET DATA TYPE "public"."enum_leads_service" USING "service"::"public"."enum_leads_service";
  DROP INDEX "leads_lead_type_idx";
  ALTER TABLE "leads" DROP COLUMN "lead_type";
  ALTER TABLE "leads" DROP COLUMN "business_name";
  ALTER TABLE "leads" DROP COLUMN "website";
  DROP TYPE "public"."enum_leads_lead_type";`)
}
