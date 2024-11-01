/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedPassword",
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";
