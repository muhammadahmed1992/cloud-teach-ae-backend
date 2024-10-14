/*
  Warnings:

  - Added the required column `userId` to the `BookReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BookReview` DROP FOREIGN KEY `BookReview_bookId_fkey`;

-- AlterTable
ALTER TABLE `BookReview` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BookReview` ADD CONSTRAINT `BookReview_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookReview` ADD CONSTRAINT `BookReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
