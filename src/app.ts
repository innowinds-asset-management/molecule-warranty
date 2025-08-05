import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from './middleware/errorHandler';
import { HealthController } from './controllers/health.controller';
import { specs } from './swagger';
import warrantyRoutes from './routes/warranty.route';
import serviceRequestRoutes from './routes/serviceRequest.route';
import serviceRequestItemRoutes from './routes/serviceRequestItem.route';
  
  
dotenv.config();

const app = express();
const healthController = new HealthController();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env['CORS_ORIGIN'] || '*',
  credentials: true
}));

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15 minutes
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get service health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatus'
 *       503:
 *         description: Service is unhealthy
 */
app.get('/health', healthController.getHealth);

/**
 * @swagger
 * /ready:
 *   get:
 *     summary: Check if service is ready to handle requests
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ready"
 *                 timestamp:
 *                   type: string
 *                   format: "date-time"
 *       503:
 *         description: Service is not ready
 */
app.get('/ready', healthController.getReadiness);

/**
 * @swagger
 * /live:
 *   get:
 *     summary: Check if service is alive
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "alive"
 *                 timestamp:
 *                   type: string
 *                   format: "date-time"
 *                 uptime:
 *                   type: number
 *                   description: Service uptime in seconds
 */
app.get('/live', healthController.getLiveness);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Warranty Service API Documentation'
}));

// API routes
const apiPrefix = process.env['API_PREFIX'] || '/api/v1';

// Warranty routes
app.use(`${apiPrefix}/warranty`, warrantyRoutes);
// Service request routes
app.use(`${apiPrefix}/service-request`, serviceRequestRoutes);
// Service request item routes
app.use(`${apiPrefix}/service-request-item`, serviceRequestItemRoutes);  

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

export default app; 