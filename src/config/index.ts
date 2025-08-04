import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  // Server Configuration
  port: number;
  nodeEnv: string;
  
  // Database Configuration
  database: {
    url: string;
  };
  
  // API Configuration
  api: {
    prefix: string;
    version: string;
  };
  
  // Security Configuration
  security: {
    jwtSecret: string;
    jwtExpiresIn: string;
    rateLimitWindowMs: number;
    rateLimitMaxRequests: number;
  };
  
  // Logging Configuration
  logging: {
    level: string;
    enableConsole: boolean;
    enableFile: boolean;
  };
  
  // Health Check Configuration
  health: {
    enabled: boolean;
    path: string;
  };
}

export const config: Config = {
  port: parseInt(process.env['PORT'] || '3004'),
  nodeEnv: process.env['NODE_ENV'] || 'development',

  database: {
    url: process.env['DATABASE_URL'] || 'mysql://root:root@mysql:3306/molecule_warranty',
  },
  
  api: {
    prefix: process.env['API_PREFIX'] || '/api',
    version: process.env['API_VERSION'] || 'v1',
  },
  
  security: {
    jwtSecret: process.env['JWT_SECRET'] || 'your-super-secret-jwt-key-change-this-in-production',
    jwtExpiresIn: process.env['JWT_EXPIRES_IN'] || '24h',
    rateLimitWindowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'),
    rateLimitMaxRequests: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'),
  },
  
  logging: {
    level: process.env['LOG_LEVEL'] || 'info',
    enableConsole: process.env['LOG_ENABLE_CONSOLE'] !== 'false',
    enableFile: process.env['LOG_ENABLE_FILE'] === 'true',
  },
  
  health: {
    enabled: process.env['HEALTH_CHECK_ENABLED'] !== 'false',
    path: process.env['HEALTH_CHECK_PATH'] || '/health',
  },
};

export default config; 