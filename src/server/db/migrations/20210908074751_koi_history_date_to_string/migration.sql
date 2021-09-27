/*
  Warnings:

  - The migration will change the primary key for the `Koi` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will add a unique constraint covering the columns `[id]` on the table `Koi`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Koi" DROP CONSTRAINT "Koi_pkey";

-- AlterTable
ALTER TABLE "KoiHistory" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Koi.id_unique" ON "Koi"("id");