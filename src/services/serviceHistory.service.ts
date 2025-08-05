import { PrismaClient } from '@prisma/client';
import { ServiceHistoryDto } from '../types';

const prisma = new PrismaClient();

export class ServiceHistoryService {
  /**
   * Fetch service history records with pagination.
   * @param page Page number (default: 1)
   * @param limit Number of records per page (default: 10)
   * @param assetId Optional filter by assetId
   * @returns Paginated service history records
   */
  async getServiceHistoryPaginated(
    page: number = 1,
    limit: number = 10,
    assetId?: string
  ): Promise<{
    data: ServiceHistoryDto[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }> {
    const pageNum = Math.max(1, page);
    const limitNum = Math.max(1, limit);

    const where: any = {};
    if (assetId) {
      where.assetId = assetId;
    }

    const [total, records] = await Promise.all([
      prisma.serviceHistory.count({ where }),
      prisma.serviceHistory.findMany({
        where,
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        orderBy: { serviceDate: 'desc' }
      })
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return {
      data: records as ServiceHistoryDto[],
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

  async getServiceHistoryById(id: number): Promise<ServiceHistoryDto | null> {
    const record = await prisma.serviceHistory.findUnique({
      where: { serviceHistoryId: id }
    });
    return record as ServiceHistoryDto;
  }

  async updateServiceHistory(id: number, data: ServiceHistoryDto): Promise<ServiceHistoryDto> {
    const updated = await prisma.serviceHistory.update({
      where: { serviceHistoryId: id },
      data: {
        assetId: data.assetId,
        technicianName: data.technicianName,
        serviceSupplierName: data.serviceSupplierName,
        warrantyStatus: data.warrantyStatus as any, // cast if enum
        serviceStatus: data.serviceStatus || null,
        serviceDate: data.serviceDate,
        serviceType: data.serviceType || null,
        serviceDescription: data.serviceDescription || null,
      },
    });
    return updated as ServiceHistoryDto;
  }

  async getServiceHistoryByAssetId(assetId: string): Promise<ServiceHistoryDto[]> {
    const records = await prisma.serviceHistory.findMany({
      where: { assetId },
      orderBy: { serviceDate: 'desc' }
    });
    return records as ServiceHistoryDto[];
  }

  async deleteServiceHistory(id: number): Promise<void> {
    await prisma.serviceHistory.delete({
      where: { serviceHistoryId: id }
    });
  }

  async createServiceHistory(data: ServiceHistoryDto): Promise<ServiceHistoryDto> {
    const created = await prisma.serviceHistory.create({
      data: {
        assetId: data.assetId,
        technicianName: data.technicianName,
        serviceSupplierName: data.serviceSupplierName,
        warrantyStatus: data.warrantyStatus as any, // cast if enum
        serviceStatus: data.serviceStatus || null,
        serviceDate: data.serviceDate,
        serviceType: data.serviceType || null,
        serviceDescription: data.serviceDescription || null,
      },
    });
    return created as ServiceHistoryDto;
  }
} 



export const serviceHistoryService = new ServiceHistoryService();

