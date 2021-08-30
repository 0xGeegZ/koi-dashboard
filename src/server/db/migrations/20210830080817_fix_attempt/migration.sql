/*
  Warnings:

  - Made the column `koiId` on table `KoiHistory` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "KoiHistory" ALTER COLUMN "koiId" SET NOT NULL;
