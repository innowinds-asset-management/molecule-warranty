//warranty controller

import { WarrantyService } from '../services/warranty.service';
import { Request, Response } from 'express';

const warrantyService = new WarrantyService();

export const getAllWarranties = async (req: Request, res: Response) => {
    const warranties = await warrantyService.getAllWarranties(req.query);
    return res.json(warranties);
};

//get warranty by id

export const getWarrantyById = async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    if (!id) {
        return res.status(400).json({ error: 'Warranty ID is required' });
    }
    const warranty = await warrantyService.getWarrantyById(parseInt(id));
    return res.json(warranty);
};

//create warranty

export const createWarranty = async (req: Request, res: Response) => {
    const warranty = await warrantyService.createWarranty(req.body);
    return res.json(warranty);
};

//update warranty


export const updateWarranty = async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    if (!id) {
        return res.status(400).json({ error: 'Warranty ID is required' });
    }
    const warranty = await warrantyService.updateWarranty(parseInt(id), req.body);
    return res.json(warranty);
};

//delete warranty

export const deleteWarranty = async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    if (!id) {
        return res.status(400).json({ error: 'Warranty ID is required' });
    }
    await warrantyService.deleteWarranty(parseInt(id));
    return res.json({ message: 'Warranty deleted successfully' });
};

//get warranties by asset

export const getWarrantiesByAsset = async (req: Request, res: Response) => {
    const id = req.params['id'] as string;
    if (!id) {
        return res.status(400).json({ error: 'Asset ID is required' });
    }
    const warranties = await warrantyService.getWarrantiesByAsset(parseInt(id));
    return res.json(warranties);
};

//get expiring warranties

export const getExpiringWarranties = async (req: Request, res: Response) => {
    const days = req.query['days'] ? parseInt(req.query['days'] as string) : undefined;
    const warranties = await warrantyService.getExpiringWarranties(days);
    return res.json(warranties);
};  
