/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Set` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "creatorId";

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "creatorId";
