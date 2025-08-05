import { PrismaClient } from '@prisma/client';
import { ServiceRequestDto } from '../types';

const prisma = new PrismaClient();

export class ServiceRequestService {
  /**
   * Fetch service request records with pagination.
   * @param page Page number (default: 1)
   * @param limit Number of records per page (default: 10)
   * @param assetId Optional filter by assetId
   * @returns Paginated service request records
   */
  async getServiceRequestPaginated(
    page: number = 1,
    limit: number = 10,
    assetId?: string
  ): Promise<{
    data: ServiceRequestDto[];
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
      prisma.serviceRequest.count({ where }),
      prisma.serviceRequest.findMany({
        where,
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        orderBy: { serviceDate: 'desc' }
      })
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return {
      data: records as ServiceRequestDto[],
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

  async getServiceRequestById(id: number): Promise<ServiceRequestDto | null> {
    const record = await prisma.serviceRequest.findUnique({
      where: { serviceRequestId: id }
    });
    return record as ServiceRequestDto;
  }

  async updateServiceRequest(id: number, data: ServiceRequestDto): Promise<ServiceRequestDto> {
    const updated = await prisma.serviceRequest.update({
      where: { serviceRequestId: id },
      data: {
        assetId: data.assetId,
        technicianName: data.technicianName,
        serviceSupplierName: data.serviceSupplierName,
        warrantyStatus: data.warrantyStatus as any, // cast if enum
        serviceStatus: data.serviceStatus || null,
        approverName: data.approverName || null,
        serviceDate: data.serviceDate,
        serviceType: data.serviceType || null,
        serviceDescription: data.serviceDescription || null,
      },
    });
    return updated as ServiceRequestDto;
  }

  async getServiceRequestByAssetId(assetId: string): Promise<ServiceRequestDto[]> {
    const records = await prisma.serviceRequest.findMany({
      where: { assetId },
      orderBy: { serviceDate: 'desc' }
    });
    return records as ServiceRequestDto[];
  }

  async deleteServiceRequest(id: number): Promise<void> {
    await prisma.serviceRequest.delete({
      where: { serviceRequestId: id }
    });
  }

  async createServiceRequest(data: ServiceRequestDto): Promise<ServiceRequestDto> {
    const created = await prisma.serviceRequest.create({
      data: {
        assetId: data.assetId,
        technicianName: data.technicianName,
        serviceSupplierName: data.serviceSupplierName,
        warrantyStatus: data.warrantyStatus as any, // cast if enum
        serviceStatus: data.serviceStatus || null,
        approverName: data.approverName || null,
        serviceDate: data.serviceDate,
        serviceType: data.serviceType || null,
        serviceDescription: data.serviceDescription || null,
      },
    });
    return created as ServiceRequestDto;
  }
} 



export const serviceRequestService = new ServiceRequestService();

