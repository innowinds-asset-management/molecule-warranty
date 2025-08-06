// src/controllers/serviceRequest.controller.ts
import { Request, Response } from 'express';
import { ServiceRequestService } from '../services/serviceRequest.service';
import { ServiceRequestDto } from '../types';

const serviceRequestService = new ServiceRequestService();

export class ServiceRequestController {

  async getServiceRequestPaginated(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, assetId } = req.query;
      const result = await serviceRequestService.getServiceRequestPaginated(
        Number(page),
        Number(limit),
        assetId as string
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service request' });
    }
  }

  async getServiceRequestById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await serviceRequestService.getServiceRequestById(Number(id));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service request' });
    }
  }

  async createServiceRequest(req: Request, res: Response) {
    try {
      const data = req.body as ServiceRequestDto;
      console.log("Data=",data);
      const result = await serviceRequestService.createServiceRequest(data);
      res.status(201).json(result);
    } catch (error) {
      console.log("Error=",error);
      res.status(500).json({ error: 'Failed to create service request' });
    }
  }

  async updateServiceRequest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body as ServiceRequestDto;
      const result = await serviceRequestService.updateServiceRequest(Number(id), data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update service request' });
    }
  }

  async getServiceRequestByAssetId(req: Request, res: Response) {
    try {
      const { assetId } = req.params;
      const result = await serviceRequestService.getServiceRequestByAssetId(assetId as string);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service request' });
    }
  }

  async deleteServiceRequest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await serviceRequestService.deleteServiceRequest(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service request' });
    }
  }
}

