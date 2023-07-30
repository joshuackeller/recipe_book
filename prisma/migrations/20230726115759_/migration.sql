/*
  Warnings:

  - The primary key for the `GroupInvite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[phone,groupId]` on the table `GroupInvite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `GroupInvite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GroupInvite` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `GroupInvite_phone_groupId_key` ON `GroupInvite`(`phone`, `groupId`);
