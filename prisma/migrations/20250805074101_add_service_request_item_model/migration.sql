-- CreateTable
CREATE TABLE `serviceRequestItem` (
    `serviceRequestItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceRequestId` INTEGER NOT NULL,
    `assetId` VARCHAR(255) NOT NULL,
    `partName` VARCHAR(255) NOT NULL,
    `partCost` DOUBLE NOT NULL,
    `labourCost` DOUBLE NOT NULL,
    `defectDescription` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `idxServiceRequestItemRequestId`(`serviceRequestId`),
    INDEX `idxServiceRequestItemAssetId`(`assetId`),
    PRIMARY KEY (`serviceRequestItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `serviceRequestItem` ADD CONSTRAINT `serviceRequestItem_serviceRequestId_fkey` FOREIGN KEY (`serviceRequestId`) REFERENCES `serviceRequest`(`serviceRequestId`) ON DELETE RESTRICT ON UPDATE CASCADE;
