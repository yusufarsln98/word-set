/*
  Warnings:

  - A unique constraint covering the columns `[search]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `search` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "search" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Word_search_key" ON "Word"("search");
