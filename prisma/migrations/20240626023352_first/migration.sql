-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `access` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `isShow` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
