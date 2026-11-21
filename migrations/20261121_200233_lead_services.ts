import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Lead form: new business types and services (approved by Nayab 2026-11-22).
 *
 * Only ADDS enum values. Payload generated a drop-and-recreate of "enum_leads_service"; that was
 * replaced by ADD VALUE so no column is rewritten and no saved lead can be affected.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_leads_business_type" ADD VALUE IF NOT EXISTS 'ecommerce' BEFORE 'other';
  ALTER TYPE "public"."enum_leads_business_type" ADD VALUE IF NOT EXISTS 'saas' BEFORE 'other';
  ALTER TYPE "public"."enum_leads_service" ADD VALUE IF NOT EXISTS 'shopify' BEFORE 'gohighlevel';
  ALTER TYPE "public"."enum_leads_service" ADD VALUE IF NOT EXISTS 'web-app' BEFORE 'gohighlevel';
  ALTER TYPE "public"."enum_leads_service" ADD VALUE IF NOT EXISTS 'ai-receptionist' BEFORE 'ai-automation';
  ALTER TYPE "public"."enum_leads_service" ADD VALUE IF NOT EXISTS 'ai-chatbot' BEFORE 'ai-automation';
  ALTER TYPE "public"."enum_leads_service" ADD VALUE IF NOT EXISTS 'not-sure' AFTER 'full-system';`)
}

/**
 * Intentionally empty. PostgreSQL cannot drop a value from an enum, and rebuilding the types would
 * fail or lose data as soon as one lead uses a new value. The extra values are harmless, so
 * rolling back this migration leaves them in place.
 */
export async function down(_args: MigrateDownArgs): Promise<void> {
  await Promise.resolve()
}
