/*
  Warnings:

  - Made the column `description` on table `TestSeries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "explaination" TEXT,
ADD COLUMN     "imgLink" TEXT,
ADD COLUMN     "instructions" TEXT;

-- AlterTable
ALTER TABLE "TestSeries" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "description" SET NOT NULL;
