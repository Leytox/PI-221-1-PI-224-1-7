/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `author` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
