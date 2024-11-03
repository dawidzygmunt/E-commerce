/*
  Warnings:

  - Added the required column `showText` to the `Billboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billboard" ADD COLUMN     "showText" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "imageUrl" TEXT NOT NULL;
