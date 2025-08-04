import { PrismaClient } from '@prisma/client';
import { CreateWarrantyDto, UpdateWarrantyDto, PaginationInfo } from '../types';

const prisma = new PrismaClient();

export class WarrantyService {
  async getAllWarranties(query: any): Promise<{ data: any[], pagination: PaginationInfo }> {
    const { page = '1', limit = '10', search, isActive, warrantyTypeId, consumerId } = query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { warrantyNumber: { contains: search, mode: 'insensitive' } },
        { coverageType: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (warrantyTypeId) {
      where.warrantyTypeId = parseInt(warrantyTypeId);
    }

    if (consumerId) {
      where.consumerId = parseInt(consumerId);
    }

    const [warranties, total] = await Promise.all([
      prisma.warranties.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          warrantyType: true,
          notifications: true
        }
      }),
      prisma.warranties.count({ where })
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return {
      data: warranties,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: totalPages,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1
      }
    };
  }

  async getWarrantyById(id: number): Promise<any | null> {
    return prisma.warranties.findUnique({
      where: { warrantyId: id },
      include: {
        warrantyType: true,
        notifications: true
      }
    });
  }

  async createWarranty(warrantyData: CreateWarrantyDto): Promise<any> {
    return prisma.warranties.create({
      data: warrantyData,
      include: {
        warrantyType: true
      }
    });
  }

  async updateWarranty(id: number, updateData: UpdateWarrantyDto): Promise<any> {
    return prisma.warranties.update({
      where: { warrantyId: id },
      data: updateData,
      include: {
        warrantyType: true
      }
    });
  }

  async deleteWarranty(id: number): Promise<void> {
    await prisma.warranties.delete({
      where: { warrantyId: id }
    });
  }

  async getWarrantiesByAsset(assetId: string): Promise<any[]> {
    return prisma.warranties.findMany({
      where: { assetId },
      include: {
        warrantyType: true,
        notifications: true
      }
    });
  }

  async getExpiringWarranties(days: number = 30): Promise<any[]> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    return prisma.warranties.findMany({
      where: {
        endDate: {
          lte: expiryDate
        },
        isActive: true
      },
      include: {
        warrantyType: true,
        notifications: true
      }
    });
  }
}  


