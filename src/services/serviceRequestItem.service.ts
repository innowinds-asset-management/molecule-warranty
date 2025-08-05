import { PrismaClient } from '@prisma/client';
import { ServiceRequestItemDto, CreateServiceRequestItemDto, UpdateServiceRequestItemDto, PaginationInfo } from '../types';

const prisma = new PrismaClient();

export class ServiceRequestItemService {
  async getServiceRequestItemPaginated(
    page: number = 1,
    limit: number = 10,
    serviceRequestId?: number
  ): Promise<{ data: ServiceRequestItemDto[]; pagination: PaginationInfo }> {
    const skip = (page - 1) * limit;
    
    const where = serviceRequestId ? { serviceRequestId } : {};
    
    const [data, total] = await Promise.all([
      prisma.serviceRequestItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.serviceRequestItem.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: data as ServiceRequestItemDto[],
              pagination: {
          page,
          limit,
          total,
          pages: totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
    };
  }

  async getServiceRequestItemById(id: number): Promise<ServiceRequestItemDto | null> {
    const item = await prisma.serviceRequestItem.findUnique({
      where: { serviceRequestItemId: id },
    });
    return item as ServiceRequestItemDto | null;
  }

  async createServiceRequestItem(data: CreateServiceRequestItemDto): Promise<ServiceRequestItemDto> {
    const created = await prisma.serviceRequestItem.create({
      data: {
        serviceRequestId: data.serviceRequestId,
        assetId: data.assetId,
        partName: data.partName,
        partCost: data.partCost,
        labourCost: data.labourCost,
        defectDescription: data.defectDescription || null,
      },
    });
    return created as ServiceRequestItemDto;
  }

  async updateServiceRequestItem(id: number, data: UpdateServiceRequestItemDto): Promise<ServiceRequestItemDto> {
    const updateData: any = {};
    if (data.serviceRequestId !== undefined) updateData.serviceRequestId = data.serviceRequestId;
    if (data.assetId !== undefined) updateData.assetId = data.assetId;
    if (data.partName !== undefined) updateData.partName = data.partName;
    if (data.partCost !== undefined) updateData.partCost = data.partCost;
    if (data.labourCost !== undefined) updateData.labourCost = data.labourCost;
    if (data.defectDescription !== undefined) updateData.defectDescription = data.defectDescription || null;

    const updated = await prisma.serviceRequestItem.update({
      where: { serviceRequestItemId: id },
      data: updateData,
    });
    return updated as ServiceRequestItemDto;
  }

  async getServiceRequestItemByServiceRequestId(serviceRequestId: number): Promise<ServiceRequestItemDto[]> {
    const items = await prisma.serviceRequestItem.findMany({
      where: { serviceRequestId },
      orderBy: { createdAt: 'desc' },
    });
    return items as ServiceRequestItemDto[];
  }

  async deleteServiceRequestItem(id: number): Promise<void> {
    await prisma.serviceRequestItem.delete({
      where: { serviceRequestItemId: id },
    });
  }
} 