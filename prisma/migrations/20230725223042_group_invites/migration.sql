-- CreateTable
CREATE TABLE `GroupInvite` (
    `phone` VARCHAR(191) NOT NULL,
    `groupId` INTEGER NOT NULL,

    PRIMARY KEY (`phone`, `groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroupInvite` ADD CONSTRAINT `GroupInvite_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
