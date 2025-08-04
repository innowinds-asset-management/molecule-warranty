//warranty route

import { Router } from 'express';
import Joi from 'joi';
import { 
  getAllWarranties, 
  getWarrantyById, 
  createWarranty, 
  updateWarranty, 
  deleteWarranty,
  getWarrantiesByAsset,
  getExpiringWarranties
} from '../controllers/warranty.controller';

const router = Router();

// Validation schemas
const createWarrantySchema = Joi.object({
  assetId: Joi.number().required(),
  warrantyTypeId: Joi.number().required(),
  warrantySupplierId: Joi.string().optional(),
  warrantyNumber: Joi.string().optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  warrantyPeriod: Joi.number().optional(),
  coverageType: Joi.string().optional(),
  coverageDescription: Joi.string().optional(),
  termsConditions: Joi.string().optional(),
  cost: Joi.number().optional(),
  isActive: Joi.boolean().optional(),
  autoRenewal: Joi.boolean().optional(),
  consumerId: Joi.number().optional(),
  supplierId: Joi.number().optional()
});

const updateWarrantySchema = Joi.object({
  assetId: Joi.number().optional(),
  warrantyTypeId: Joi.number().optional(),
  warrantySupplierId: Joi.string().optional(),
  warrantyNumber: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  warrantyPeriod: Joi.number().optional(),
  coverageType: Joi.string().optional(),
  coverageDescription: Joi.string().optional(),
  termsConditions: Joi.string().optional(),
  cost: Joi.number().optional(),
  isActive: Joi.boolean().optional(),
  autoRenewal: Joi.boolean().optional(),
  consumerId: Joi.number().optional(),
  supplierId: Joi.number().optional()
});

// Validation middleware
const validateCreateWarranty = (req: any, res: any, next: any) => {
  const { error } = createWarrantySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0]?.message || 'Validation error'
    });
  }
  next();
};

const validateUpdateWarranty = (req: any, res: any, next: any) => {
  const { error } = updateWarrantySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0]?.message || 'Validation error'
    });
  }
  next();
};

/**
 * @swagger
 * /api/v1/warranties:
 *   get:
 *     summary: Get all warranties with pagination and filtering
 *     tags: [Warranties]
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/search'
 *       - $ref: '#/components/parameters/isActive'
 *       - in: query
 *         name: warrantyTypeId
 *         schema:
 *           type: integer
 *         description: Filter by warranty type ID
 *       - in: query
 *         name: consumerId
 *         schema:
 *           type: integer
 *         description: Filter by consumer ID
 *     responses:
 *       200:
 *         description: List of warranties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 data:
 *                   - warrantyId: 1
 *                     assetId: 1001
 *                     warrantyTypeId: 1
 *                     warrantyNumber: "WAR-2024-001"
 *                     startDate: "2024-01-15T00:00:00.000Z"
 *                     endDate: "2027-01-15T00:00:00.000Z"
 *                     cost: 0.00
 *                     isActive: true
 *                     autoRenewal: false
 *                     warrantyType:
 *                       warrantyTypeId: 1
 *                       typeName: "Manufacturer"
 *                       description: "Standard manufacturer warranty"
 *                 pagination:
 *                   page: 1
 *                   limit: 10
 *                   total: 1
 *                   pages: 1
 *                   hasNextPage: false
 *                   hasPreviousPage: false
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllWarranties);

/**
 * @swagger
 * /api/v1/warranties/{id}:
 *   get:
 *     summary: Get warranty by ID
 *     tags: [Warranties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warranty ID
 *     responses:
 *       200:
 *         description: Warranty retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 warrantyId: 1
 *                 assetId: 1001
 *                 warrantyTypeId: 1
 *                 warrantyNumber: "WAR-2024-001"
 *                 startDate: "2024-01-15T00:00:00.000Z"
 *                 endDate: "2027-01-15T00:00:00.000Z"
 *                 cost: 0.00
 *                 isActive: true
 *                 autoRenewal: false
 *                 warrantyType:
 *                   warrantyTypeId: 1
 *                   typeName: "Manufacturer"
 *                   description: "Standard manufacturer warranty"
 *       404:
 *         description: Warranty not found
 *       400:
 *         description: Invalid warranty ID
 */
router.get('/:id', getWarrantyById);

/**
 * @swagger
 * /api/v1/warranties:
 *   post:
 *     summary: Create a new warranty
 *     tags: [Warranties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWarrantyDto'
 *           example:
 *             assetId: 1001
 *             warrantyTypeId: 1
 *             warrantySupplierId: "MANUF-001"
 *             warrantyNumber: "WAR-2024-001"
 *             startDate: "2024-01-15T00:00:00.000Z"
 *             endDate: "2027-01-15T00:00:00.000Z"
 *             warrantyPeriod: 36
 *             coverageType: "Comprehensive Coverage"
 *             coverageDescription: "Full coverage including parts, labor, and emergency services"
 *             termsConditions: "Standard manufacturer warranty terms apply"
 *             cost: 0.00
 *             isActive: true
 *             autoRenewal: false
 *             consumerId: 1
 *             supplierId: 1
 *     responses:
 *       201:
 *         description: Warranty created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', validateCreateWarranty, createWarranty);

/**
 * @swagger
 * /api/v1/warranties/{id}:
 *   put:
 *     summary: Update warranty by ID
 *     tags: [Warranties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warranty ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWarrantyDto'
 *           example:
 *             cost: 2500.00
 *             isActive: false
 *             autoRenewal: true
 *     responses:
 *       200:
 *         description: Warranty updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Warranty not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', validateUpdateWarranty, updateWarranty);

/**
 * @swagger
 * /api/v1/warranties/{id}:
 *   delete:
 *     summary: Delete warranty by ID
 *     tags: [Warranties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warranty ID
 *     responses:
 *       200:
 *         description: Warranty deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Warranty deleted successfully"
 *       404:
 *         description: Warranty not found
 *       400:
 *         description: Invalid warranty ID
 */
router.delete('/:id', deleteWarranty);

/**
 * @swagger
 * /api/v1/warranties/asset/{id}:
 *   get:
 *     summary: Get warranties by asset ID
 *     tags: [Warranties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Warranties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 - warrantyId: 1
 *                   assetId: 1001
 *                   warrantyTypeId: 1
 *                   warrantyNumber: "WAR-2024-001"
 *                   startDate: "2024-01-15T00:00:00.000Z"
 *                   endDate: "2027-01-15T00:00:00.000Z"
 *                   isActive: true
 *                   warrantyType:
 *                     warrantyTypeId: 1
 *                     typeName: "Manufacturer"
 *       404:
 *         description: Asset not found
 *       400:
 *         description: Invalid asset ID
 */
router.get('/asset/:id', getWarrantiesByAsset);

/**
 * @swagger
 * /api/v1/warranties/expiring:
 *   get:
 *     summary: Get warranties expiring within specified days
 *     tags: [Warranties]
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 *         description: "Number of days before expiry (default: 30)"
 *     responses:
 *       200:
 *         description: Expiring warranties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 - warrantyId: 1
 *                   assetId: 1001
 *                   warrantyNumber: "WAR-2024-001"
 *                   endDate: "2024-12-15T00:00:00.000Z"
 *                   isActive: true
 *                   warrantyType:
 *                     warrantyTypeId: 1
 *                     typeName: "Manufacturer"
 *       500:
 *         description: Internal server error
 */
router.get('/expiring', getExpiringWarranties);

export default router;