import { Router } from 'express';
import Joi from 'joi';
import { ServiceRequestItemController } from '../controllers/serviceRequestItem.controller';

const router = Router();
const serviceRequestItemController = new ServiceRequestItemController();

// Validation schemas
const createServiceRequestItemSchema = Joi.object({
  serviceRequestId: Joi.number().required(),
  assetId: Joi.string().required(),
  partName: Joi.string().required(),
  partCost: Joi.number().positive().required(),
  labourCost: Joi.number().positive().required(),
  defectDescription: Joi.string().optional(),
});

const updateServiceRequestItemSchema = Joi.object({
  serviceRequestId: Joi.number().optional(),
  assetId: Joi.string().optional(),
  partName: Joi.string().optional(),
  partCost: Joi.number().positive().optional(),
  labourCost: Joi.number().positive().optional(),
  defectDescription: Joi.string().optional(),
});

// Routes
/**
 * @swagger
 * /api/v1/service-request-item:
 *   get:
 *     tags: [Service Request Item]
 *     summary: Get paginated service request items
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: serviceRequestId
 *         schema:
 *           type: integer
 *         description: Filter by service request ID
 *     responses:
 *       200:
 *         description: List of service request items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ServiceRequestItem'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationInfo'
 */
router.get('/', serviceRequestItemController.getServiceRequestItemPaginated);

/**
 * @swagger
 * /api/v1/service-request-item/{id}:
 *   get:
 *     tags: [Service Request Item]
 *     summary: Get service request item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service request item ID
 *     responses:
 *       200:
 *         description: Service request item details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ServiceRequestItem'
 *       404:
 *         description: Service request item not found
 */
router.get('/:id', serviceRequestItemController.getServiceRequestItemById);

/**
 * @swagger
 * /api/v1/service-request-item:
 *   post:
 *     tags: [Service Request Item]
 *     summary: Create a new service request item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateServiceRequestItemDto'
 *     responses:
 *       201:
 *         description: Service request item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ServiceRequestItem'
 *                 message:
 *                   type: string
 */
router.post('/', (req, res, next) => {
  const { error } = createServiceRequestItemSchema.validate(req.body);
  if (error && error.details && error.details.length > 0) {
    return res.status(400).json({
      success: false,
      message: (error.details[0] as Joi.ValidationErrorItem).message,
    });
  }
  return next();
}, serviceRequestItemController.createServiceRequestItem);

/**
 * @swagger
 * /api/v1/service-request-item/{id}:
 *   put:
 *     tags: [Service Request Item]
 *     summary: Update a service request item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service request item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateServiceRequestItemDto'
 *     responses:
 *       200:
 *         description: Service request item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ServiceRequestItem'
 *                 message:
 *                   type: string
 */
router.put('/:id', (req, res, next) => {
  const { error } = updateServiceRequestItemSchema.validate(req.body);
  if (error && error.details && error.details.length > 0) {
    return res.status(400).json({
      success: false,
      message: (error.details[0] as Joi.ValidationErrorItem).message,
    });
  }
  return next();
}, serviceRequestItemController.updateServiceRequestItem);

/**
 * @swagger
 * /api/v1/service-request-item/service-request/{serviceRequestId}:
 *   get:
 *     tags: [Service Request Item]
 *     summary: Get service request items by service request ID
 *     parameters:
 *       - in: path
 *         name: serviceRequestId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service request ID
 *     responses:
 *       200:
 *         description: List of service request items for the service request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ServiceRequestItem'
 */
router.get('/service-request/:serviceRequestId', serviceRequestItemController.getServiceRequestItemByServiceRequestId);

/**
 * @swagger
 * /api/v1/service-request-item/{id}:
 *   delete:
 *     tags: [Service Request Item]
 *     summary: Delete a service request item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service request item ID
 *     responses:
 *       200:
 *         description: Service request item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.delete('/:id', serviceRequestItemController.deleteServiceRequestItem);

export default router; 