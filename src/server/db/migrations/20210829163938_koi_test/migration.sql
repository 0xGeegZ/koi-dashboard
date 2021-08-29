/*
  Warnings:

  - You are about to drop the `Update` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_koiId_fkey";

-- AlterTable
ALTER TABLE "Koi" ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "Update";

-- CreateTable
CREATE TABLE "KoiHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "length" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "koiId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KoiHistory" ADD FOREIGN KEY ("koiId") REFERENCES "Koi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
