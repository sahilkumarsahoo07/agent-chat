/*
  Warnings:

  - Added the required column `creator_id` to the `shared_chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assistants" ADD COLUMN     "actions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "models" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "is_locked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "rating" TEXT;

-- AlterTable
ALTER TABLE "shared_chats" ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "used_by" TEXT;

-- CreateIndex
CREATE INDEX "shared_chats_creator_id_idx" ON "shared_chats"("creator_id");

-- AddForeignKey
ALTER TABLE "shared_chats" ADD CONSTRAINT "shared_chats_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
