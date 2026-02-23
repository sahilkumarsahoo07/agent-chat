-- AlterTable: add chat metadata columns to projects
ALTER TABLE "projects"
ADD COLUMN IF NOT EXISTS "chat_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS "chat_details" JSONB;


