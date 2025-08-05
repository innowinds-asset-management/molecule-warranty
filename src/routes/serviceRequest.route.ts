// src/routes/serviceRequest.route.ts
import { Router } from 'express';
import { ServiceRequestController } from '../controllers/serviceRequest.controller';

const router = Router();
const serviceRequestController = new ServiceRequestController();

/**
 * @swagger
 * /api/v1/service-request:
 *   get:
 *     summary: Get all service request records with pagination
 *     tags: [Service Request]
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
 *         description: List of service request records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ServiceRequest'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationInfo'
 *       500:
 *         description: Internal server error
 */
router.get('/', serviceRequestController.getServiceRequestPaginated);

/**
 * @swagger
 * /api/v1/service-request/{id}:
 *   get:
 *     summary: Get service request record by ID
 *     tags: [Service Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service request ID
 *     responses:
 *       200:
 *         description: Service request record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequest'
 *       404:
 *         description: Service request record not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', serviceRequestController.getServiceRequestById);

/**
 * @swagger
 * /api/v1/service-request/asset/{assetId}:
 *   get:
 *     summary: Get service request records by asset ID
 *     tags: [Service Request]
 *     parameters:
 *       - in: path
 *         name: assetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Service request records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceRequest'
 *       500:
 *         description: Internal server error
 */
router.get('/asset/:assetId', serviceRequestController.getServiceRequestByAssetId);

/**
 * @swagger
 * /api/v1/service-request:
 *   post:
 *     summary: Create a new service request record
 *     tags: [Service Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateServiceRequestDto'
 *     responses:
 *       201:
 *         description: Service request record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequest'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/', serviceRequestController.createServiceRequest);

/**
 * @swagger
 * /api/v1/service-request/{id}:
 *   put:
 *     summary: Update a service request record
 *     tags: [Service Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateServiceRequestDto'
 *     responses:
 *       200:
 *         description: Service request record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequest'
 *       404:
 *         description: Service request record not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', serviceRequestController.updateServiceRequest);

/**
 * @swagger
 * /api/v1/service-request/{id}:
 *   delete:
 *     summary: Delete a service request record
 *     tags: [Service Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service request ID
 *     responses:
 *       204:
 *         description: Service request record deleted successfully
 *       404:
 *         description: Service request record not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', serviceRequestController.deleteServiceRequest);

export default router;