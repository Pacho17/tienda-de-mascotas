-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(32) NOT NULL,
    `correo` VARCHAR(32) NOT NULL,
    `contraseña` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mascotas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(32) NOT NULL,
    `estado` ENUM('disponible', 'adoptado') NOT NULL,
    `razald` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `foto` VARCHAR(64) NOT NULL,
    `generoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Raza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mascotas` ADD CONSTRAINT `Mascotas_razald_fkey` FOREIGN KEY (`razald`) REFERENCES `Raza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mascotas` ADD CONSTRAINT `Mascotas_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mascotas` ADD CONSTRAINT `Mascotas_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `Genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mascotas` ADD CONSTRAINT `Mascotas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
