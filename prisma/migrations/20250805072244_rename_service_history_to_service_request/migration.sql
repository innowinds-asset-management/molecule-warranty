/*
  Warnings:

  - You are about to drop the `serviceHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `serviceHistory`;

-- CreateTable
CREATE TABLE `serviceRequest` (
    `serviceRequestId` INTEGER NOT NULL AUTO_INCREMENT,
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

    INDEX `idxServiceRequestDate`(`serviceDate`),
    INDEX `idxServiceRequestAssetId`(`assetId`),
    INDEX `idxWarrantyStatus`(`warrantyStatus`),
    PRIMARY KEY (`serviceRequestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
