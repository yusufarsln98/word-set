/*
  Warnings:

  - You are about to drop the column `dictionary` on the `Dictionary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Dictionary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Dictionary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsLanguage` to the `Dictionary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translationsLanguage` to the `Dictionary` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Dictionary_dictionary_key";

-- AlterTable
ALTER TABLE "Dictionary" DROP COLUMN "dictionary",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "termsLanguage" "Language" NOT NULL,
ADD COLUMN     "translationsLanguage" "Language" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dictionary_name_key" ON "Dictionary"("name");
