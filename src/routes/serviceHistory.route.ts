// src/routes/serviceHistory.route.ts
import { Router } from 'express';
import { ServiceHistoryController } from '../controllers/serviceHistory.controller';

const router = Router();
const serviceHistoryController = new ServiceHistoryController();

/**
 * @swagger
 * /api/v1/service-history:
 *   get:
 *     summary: Get all service history records with pagination
 *     tags: [Service History]
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - in: query
 *         name: assetId
 *         schema:
 *           type: string
 *         description: Filter by asset ID
 *     responses:
 *       200:
 *         description: List of service history records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ServiceHistory'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationInfo'
 *       500:
 *         description: Internal server error
 */
router.get('/', serviceHistoryController.getServiceHistoryPaginated);

/**
 * @swagger
 * /api/v1/service-history/{id}:
 *   get:
 *     summary: Get service history record by ID
 *     tags: [Service History]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service history ID
 *     responses:
 *       200:
 *         description: Service history record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceHistory'
 *       404:
 *         description: Service history record not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', serviceHistoryController.getServiceHistoryById);

/**
 * @swagger
 * /api/v1/service-history/asset/{assetId}:
 *   get:
 *     summary: Get service history records by asset ID
 *     tags: [Service History]
 *     parameters:
 *       - in: path
 *         name: assetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Service history records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceHistory'
 *       500:
 *         description: Internal server error
 */
router.get('/asset/:assetId', serviceHistoryController.getServiceHistoryByAssetId);

/**
 * @swagger
 * /api/v1/service-history:
 *   post:
 *     summary: Create a new service history record
 *     tags: [Service History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateServiceHistoryDto'
 *     responses:
 *       201:
 *         description: Service history record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceHistory'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/', serviceHistoryController.createServiceHistory);

/**
 * @swagger
 * /api/v1/service-history/{id}:
 *   put:
 *     summary: Update a service history record
 *     tags: [Service History]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service history ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateServiceHistoryDto'
 *     responses:
 *       200:
 *         description: Service history record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceHistory'
 *       404:
 *         description: Service history record not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', serviceHistoryController.updateServiceHistory);

/**
 * @swagger
 * /api/v1/service-history/{id}:
 *   delete:
 *     summary: Delete a service history record
 *     tags: [Service History]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service history ID
 *     responses:
 *       204:
 *         description: Service history record deleted successfully
 *       404:
 *         description: Service history record not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', serviceHistoryController.deleteServiceHistory);

export default router;