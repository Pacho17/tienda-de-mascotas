-- CreateTable
CREATE TABLE `Users_fjbs` (
    `id_fjbs` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname_fjbs` VARCHAR(191) NOT NULL,
    `email_fjbs` VARCHAR(191) NOT NULL,
    `password_fjbs` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_fjbs_email_fjbs_key`(`email_fjbs`),
    PRIMARY KEY (`id_fjbs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pets_fjbs` (
    `id_fjbs` INTEGER NOT NULL AUTO_INCREMENT,
    `name_fjbs` VARCHAR(191) NULL,
    `photo_fjbs` VARCHAR(191) NOT NULL,
    `estado_fjbs` ENUM('disponible', 'adoptado') NOT NULL DEFAULT 'disponible',
    `raceId_fjbs` INTEGER NOT NULL,
    `categoryId_fjbs` INTEGER NOT NULL,
    `genderId_fjbs` INTEGER NOT NULL,
    `userId_fjbs` INTEGER NOT NULL,

    PRIMARY KEY (`id_fjbs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Races_fjbs` (
    `id_fjbs` INTEGER NOT NULL AUTO_INCREMENT,
    `name_fjbs` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_fjbs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories_fjbs` (
    `id_fjbs` INTEGER NOT NULL AUTO_INCREMENT,
    `name_fjbs` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_fjbs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genders_fjbs` (
    `id_fjbs` INTEGER NOT NULL AUTO_INCREMENT,
    `name_fjbs` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_fjbs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pets_fjbs` ADD CONSTRAINT `Pets_fjbs_raceId_fjbs_fkey` FOREIGN KEY (`raceId_fjbs`) REFERENCES `Races_fjbs`(`id_fjbs`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets_fjbs` ADD CONSTRAINT `Pets_fjbs_categoryId_fjbs_fkey` FOREIGN KEY (`categoryId_fjbs`) REFERENCES `Categories_fjbs`(`id_fjbs`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets_fjbs` ADD CONSTRAINT `Pets_fjbs_genderId_fjbs_fkey` FOREIGN KEY (`genderId_fjbs`) REFERENCES `Genders_fjbs`(`id_fjbs`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets_fjbs` ADD CONSTRAINT `Pets_fjbs_userId_fjbs_fkey` FOREIGN KEY (`userId_fjbs`) REFERENCES `Users_fjbs`(`id_fjbs`) ON DELETE RESTRICT ON UPDATE CASCADE;
