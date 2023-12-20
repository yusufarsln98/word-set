/*
  Warnings:

  - You are about to drop the column `definition` on the `FlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `example` on the `FlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `translation` on the `FlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Set` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `FlashCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Language" ADD VALUE 'Portuguese';
ALTER TYPE "Language" ADD VALUE 'Japanese';

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_userId_fkey";

-- AlterTable
ALTER TABLE "FlashCard" DROP COLUMN "definition",
DROP COLUMN "example",
DROP COLUMN "translation",
ADD COLUMN     "cardId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "UserConfig" ADD COLUMN     "defaultAvatarIndex" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
