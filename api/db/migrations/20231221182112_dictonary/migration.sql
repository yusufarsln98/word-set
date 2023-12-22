/*
  Warnings:

  - You are about to drop the column `cardId` on the `FlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `FlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `termSearch` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `termsLanguage` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `translationsLanguage` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wordId` to the `FlashCard` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Set` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dictionaryId` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_wordId_fkey";

-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_userId_fkey";

-- DropIndex
DROP INDEX "Word_termSearch_key";

-- AlterTable
ALTER TABLE "FlashCard" DROP COLUMN "cardId",
DROP COLUMN "term",
ADD COLUMN     "meaningIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wordId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Set" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "termSearch",
DROP COLUMN "termsLanguage",
DROP COLUMN "translationsLanguage",
ADD COLUMN     "dictionaryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "Dictionary" (
    "id" SERIAL NOT NULL,
    "dictionary" TEXT NOT NULL,

    CONSTRAINT "Dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meaning" (
    "id" SERIAL NOT NULL,
    "definition" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "cefrLevel" TEXT NOT NULL,
    "partOfSpeech" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,

    CONSTRAINT "Meaning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dictionary_dictionary_key" ON "Dictionary"("dictionary");

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_dictionaryId_fkey" FOREIGN KEY ("dictionaryId") REFERENCES "Dictionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meaning" ADD CONSTRAINT "Meaning_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
