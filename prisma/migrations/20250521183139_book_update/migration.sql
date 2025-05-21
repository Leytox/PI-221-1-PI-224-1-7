-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "image" TEXT,
ADD COLUMN     "isbn" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "pages" INTEGER,
ADD COLUMN     "publishedAt" TIMESTAMP(3);
