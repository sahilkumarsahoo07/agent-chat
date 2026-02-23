-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "active_path" TEXT[] DEFAULT ARRAY[]::TEXT[];
