// src/controllers/serviceHistory.controller.ts
import { Request, Response } from 'express';
import { ServiceHistoryService } from '../services/serviceHistory.service';
import { ServiceHistoryDto } from '../types';

export class ServiceHistoryController {
  private serviceHistoryService: ServiceHistoryService;

  constructor() {
    this.serviceHistoryService = new ServiceHistoryService();
  }

  async getServiceHistoryPaginated(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, assetId } = req.query;
      const result = await this.serviceHistoryService.getServiceHistoryPaginated(
        Number(page),
        Number(limit),
        assetId as string
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service history' });
    }
  }

  async getServiceHistoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.serviceHistoryService.getServiceHistoryById(Number(id));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service history' });
    }
  }

  async createServiceHistory(req: Request, res: Response) {
    try {
      const data = req.body as ServiceHistoryDto;
      const result = await this.serviceHistoryService.createServiceHistory(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create service history' });
    }
  }

  async updateServiceHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body as ServiceHistoryDto;
      const result = await this.serviceHistoryService.updateServiceHistory(Number(id), data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update service history' });
    }
  }

  async getServiceHistoryByAssetId(req: Request, res: Response) {
    try {
      const { assetId } = req.params;
      const result = await this.serviceHistoryService.getServiceHistoryByAssetId(assetId as string);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service history' });
    }
  }

  async deleteServiceHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.serviceHistoryService.deleteServiceHistory(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service history' });
    }
  }
}

