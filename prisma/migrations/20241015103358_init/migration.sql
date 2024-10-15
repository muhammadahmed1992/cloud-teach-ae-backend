/*
  Warnings:

  - You are about to drop the `userbook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userbook` DROP FOREIGN KEY `UserBook_bookId_fkey`;

-- DropTable
DROP TABLE `userbook`;
