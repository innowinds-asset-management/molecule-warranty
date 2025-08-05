import { Request, Response } from 'express';
import { ServiceRequestItemService } from '../services/serviceRequestItem.service';
import { CreateServiceRequestItemDto, UpdateServiceRequestItemDto } from '../types';

const serviceRequestItemService = new ServiceRequestItemService();

export class ServiceRequestItemController {
  async getServiceRequestItemPaginated(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query['page'] as string) || 1;
      const limit = parseInt(req.query['limit'] as string) || 10;
      const serviceRequestId = req.query['serviceRequestId'] ? parseInt(req.query['serviceRequestId'] as string) : undefined;

      const result = await serviceRequestItemService.getServiceRequestItemPaginated(page, limit, serviceRequestId);
      
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      console.error('Error in getServiceRequestItemPaginated:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getServiceRequestItemById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params['id'] as string);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid ID parameter',
        });
        return;
      }

      const item = await serviceRequestItemService.getServiceRequestItemById(id);
      
      if (!item) {
        res.status(404).json({
          success: false,
          message: 'Service request item not found',
        });
        return;
      }

      res.json({
        success: true,
        data: item,
      });
    } catch (error) {
      console.error('Error in getServiceRequestItemById:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async createServiceRequestItem(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateServiceRequestItemDto = req.body;
      
      const created = await serviceRequestItemService.createServiceRequestItem(data);
      
      res.status(201).json({
        success: true,
        data: created,
        message: 'Service request item created successfully',
      });
    } catch (error) {
      console.error('Error in createServiceRequestItem:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async updateServiceRequestItem(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params['id'] as string);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid ID parameter',
        });
        return;
      }

      const data: UpdateServiceRequestItemDto = req.body;
      
      const updated = await serviceRequestItemService.updateServiceRequestItem(id, data);
      
      res.json({
        success: true,
        data: updated,
        message: 'Service request item updated successfully',
      });
    } catch (error) {
      console.error('Error in updateServiceRequestItem:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getServiceRequestItemByServiceRequestId(req: Request, res: Response): Promise<void> {
    try {
      const serviceRequestId = parseInt(req.params['serviceRequestId'] as string);
      if (isNaN(serviceRequestId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid service request ID parameter',
        });
        return;
      }

      const items = await serviceRequestItemService.getServiceRequestItemByServiceRequestId(serviceRequestId);
      
      res.json({
        success: true,
        data: items,
      });
    } catch (error) {
      console.error('Error in getServiceRequestItemByServiceRequestId:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleteServiceRequestItem(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params['id'] as string);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid ID parameter',
        });
        return;
      }

      await serviceRequestItemService.deleteServiceRequestItem(id);
      
      res.json({
        success: true,
        message: 'Service request item deleted successfully',
      });
    } catch (error) {
      console.error('Error in deleteServiceRequestItem:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
} 