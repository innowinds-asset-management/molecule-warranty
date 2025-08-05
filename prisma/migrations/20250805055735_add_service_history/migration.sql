-- CreateTable
CREATE TABLE `serviceHistory` (
    `serviceHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `assetId` VARCHAR(255) NOT NULL,
    `technicianName` VARCHAR(100) NOT NULL,
    `serviceSupplierName` VARCHAR(100) NOT NULL,
    `warrantyStatus` ENUM('ACTIVE', 'EXPIRED', 'VOID', 'CLAIMED', 'PENDING_CLAIM', 'TRANSFERRED', 'SUSPENDED', 'NOT_APPLICABLE') NOT NULL,
    `serviceStatus` VARCHAR(50) NULL,
    `serviceDate` DATE NOT NULL,
    `serviceType` VARCHAR(100) NULL,
    `serviceDescription` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `idxServiceHistoryDate`(`serviceDate`),
    INDEX `idxServiceHistoryAssetId`(`assetId`),
    INDEX `idxWarrantyStatus`(`warrantyStatus`),
    PRIMARY KEY (`serviceHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
