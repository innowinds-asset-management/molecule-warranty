import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Consumer Service API',
      version: '1.0.0',
      description: 'A microservice for managing users, consumers, and sites with hierarchical relationships',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the user'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              description: 'User password (hashed)'
            },
            name: {
              type: 'string',
              description: 'User full name'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the user is active'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            },
            consumers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Consumer'
              },
              description: 'List of consumers associated with this user'
            }
          },
          required: ['id', 'email', 'password', 'name', 'isActive', 'createdAt', 'updatedAt']
        },
        Consumer: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the consumer'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Consumer email address'
            },
            phone: {
              type: 'string',
              nullable: true,
              description: 'Consumer phone number'
            },
            company: {
              type: 'string',
              nullable: true,
              description: 'Company name'
            },
            address: {
              type: 'string',
              nullable: true,
              description: 'Street address'
            },
            city: {
              type: 'string',
              nullable: true,
              description: 'City name'
            },
            state: {
              type: 'string',
              nullable: true,
              description: 'State or province'
            },
            zipCode: {
              type: 'string',
              nullable: true,
              description: 'ZIP or postal code'
            },
            country: {
              type: 'string',
              description: 'Country code',
              default: 'US'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the consumer is active'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Consumer creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Consumer last update timestamp'
            },
            userId: {
              type: 'string',
              description: 'ID of the user this consumer belongs to'
            },
            user: {
              $ref: '#/components/schemas/User',
              description: 'Associated user information'
            },
            users: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              },
              description: 'List of users associated with this consumer'
            }
          },
          required: ['id', 'email', 'country', 'isActive', 'createdAt', 'updatedAt', 'userId']
        },

        CreateUserDto: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password (minimum 6 characters)'
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              description: 'User full name'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the user is active',
              default: true
            }
          },
          required: ['email', 'password', 'name']
        },
        UpdateUserDto: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password (minimum 6 characters)'
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              description: 'User full name'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the user is active'
            }
          }
        },
        CreateConsumerDto: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Consumer email address'
            },
            phone: {
              type: 'string',
              description: 'Consumer phone number'
            },
            company: {
              type: 'string',
              description: 'Company name'
            },
            address: {
              type: 'string',
              description: 'Street address'
            },
            city: {
              type: 'string',
              description: 'City name'
            },
            state: {
              type: 'string',
              description: 'State or province'
            },
            zipCode: {
              type: 'string',
              description: 'ZIP or postal code'
            },
            country: {
              type: 'string',
              description: 'Country code',
              default: 'US'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the consumer is active',
              default: true
            },
            userId: {
              type: 'string',
              description: 'ID of the user this consumer belongs to (required)'
            }
          },
          required: ['email', 'userId']
        },
        UpdateConsumerDto: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Consumer email address'
            },
            phone: {
              type: 'string',
              description: 'Consumer phone number'
            },
            company: {
              type: 'string',
              description: 'Company name'
            },
            address: {
              type: 'string',
              description: 'Street address'
            },
            city: {
              type: 'string',
              description: 'City name'
            },
            state: {
              type: 'string',
              description: 'State or province'
            },
            zipCode: {
              type: 'string',
              description: 'ZIP or postal code'
            },
            country: {
              type: 'string',
              description: 'Country code'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the consumer is active'
            },
            userId: {
              type: 'string',
              description: 'ID of the user this consumer belongs to'
            }
          }
        },

        PaginationResult: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object'
              },
              description: 'Array of items'
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  description: 'Current page number'
                },
                limit: {
                  type: 'integer',
                  description: 'Number of items per page'
                },
                total: {
                  type: 'integer',
                  description: 'Total number of items'
                },
                pages: {
                  type: 'integer',
                  description: 'Total number of pages'
                },
                hasNextPage: {
                  type: 'boolean',
                  description: 'Whether there is a next page'
                },
                hasPreviousPage: {
                  type: 'boolean',
                  description: 'Whether there is a previous page'
                }
              }
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Whether the request was successful'
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            error: {
              type: 'string',
              description: 'Error message'
            },
            message: {
              type: 'string',
              description: 'Success message'
            }
          }
        },
        HealthStatus: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['healthy', 'unhealthy'],
              description: 'Overall health status'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Health check timestamp'
            },
            service: {
              type: 'string',
              description: 'Service name'
            },
            version: {
              type: 'string',
              description: 'Service version'
            },
            environment: {
              type: 'string',
              description: 'Environment name'
            },
            checks: {
              type: 'object',
              properties: {
                database: {
                  type: 'string',
                  enum: ['healthy', 'unhealthy'],
                  description: 'Database health status'
                },
                memory: {
                  type: 'object',
                  description: 'Memory usage information'
                },
                uptime: {
                  type: 'number',
                  description: 'Service uptime in seconds'
                }
              }
            }
          }
        },
        SignupDto: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password (will be encrypted with email combination)'
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              description: 'User full name'
            },
            isActive: {
              type: 'boolean',
              default: true,
              description: 'Whether the user account is active'
            }
          },
          required: ['email', 'password', 'name']
        },
        LoginDto: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'User ID (used as username)'
            },
            password: {
              type: 'string',
              description: 'User password'
            }
          },
          required: ['userId', 'password']
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'User ID'
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'User email'
                },
                name: {
                  type: 'string',
                  description: 'User name'
                },
                isActive: {
                  type: 'boolean',
                  description: 'Whether user is active'
                }
              }
            },
            token: {
              type: 'string',
              description: 'JWT authentication token'
            }
          }
        },
        Warranty: {
          type: 'object',
          properties: {
            warrantyId: {
              type: 'integer',
              description: 'Unique identifier for the warranty'
            },
            assetId: {
              type: 'integer',
              description: 'Asset ID this warranty covers'
            },
            warrantyTypeId: {
              type: 'integer',
              description: 'Type of warranty'
            },
            warrantySupplierId: {
              type: 'string',
              nullable: true,
              description: 'Warranty supplier identifier'
            },
            warrantyNumber: {
              type: 'string',
              nullable: true,
              description: 'Warranty number'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Warranty start date'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Warranty end date'
            },
            warrantyPeriod: {
              type: 'integer',
              nullable: true,
              description: 'Warranty period in months'
            },
            coverageType: {
              type: 'string',
              nullable: true,
              description: 'Type of coverage'
            },
            coverageDescription: {
              type: 'string',
              nullable: true,
              description: 'Detailed coverage description'
            },
            termsConditions: {
              type: 'string',
              nullable: true,
              description: 'Warranty terms and conditions'
            },
            cost: {
              type: 'number',
              nullable: true,
              description: 'Warranty cost'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the warranty is active'
            },
            autoRenewal: {
              type: 'boolean',
              description: 'Whether warranty auto-renews'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Warranty creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Warranty last update timestamp'
            },
            consumerId: {
              type: 'integer',
              nullable: true,
              description: 'Consumer ID'
            },
            supplierId: {
              type: 'integer',
              nullable: true,
              description: 'Supplier ID'
            },
            warrantyType: {
              $ref: '#/components/schemas/WarrantyType'
            }
          },
          required: ['warrantyId', 'assetId', 'warrantyTypeId', 'startDate', 'endDate', 'isActive', 'autoRenewal', 'createdAt', 'updatedAt']
        },
        WarrantyType: {
          type: 'object',
          properties: {
            warrantyTypeId: {
              type: 'integer',
              description: 'Unique identifier for warranty type'
            },
            typeName: {
              type: 'string',
              description: 'Name of warranty type'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Description of warranty type'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            }
          },
          required: ['warrantyTypeId', 'typeName', 'createdAt']
        },
        CreateWarrantyDto: {
          type: 'object',
          properties: {
            assetId: {
              type: 'integer',
              description: 'Asset ID this warranty covers'
            },
            warrantyTypeId: {
              type: 'integer',
              description: 'Type of warranty'
            },
            warrantySupplierId: {
              type: 'string',
              description: 'Warranty supplier identifier'
            },
            warrantyNumber: {
              type: 'string',
              description: 'Warranty number'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Warranty start date'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Warranty end date'
            },
            warrantyPeriod: {
              type: 'integer',
              description: 'Warranty period in months'
            },
            coverageType: {
              type: 'string',
              description: 'Type of coverage'
            },
            coverageDescription: {
              type: 'string',
              description: 'Detailed coverage description'
            },
            termsConditions: {
              type: 'string',
              description: 'Warranty terms and conditions'
            },
            cost: {
              type: 'number',
              description: 'Warranty cost'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the warranty is active',
              default: true
            },
            autoRenewal: {
              type: 'boolean',
              description: 'Whether warranty auto-renews',
              default: false
            },
            consumerId: {
              type: 'integer',
              description: 'Consumer ID'
            },
            supplierId: {
              type: 'integer',
              description: 'Supplier ID'
            }
          },
          required: ['assetId', 'warrantyTypeId', 'startDate', 'endDate']
        },
        UpdateWarrantyDto: {
          type: 'object',
          properties: {
            assetId: {
              type: 'integer',
              description: 'Asset ID this warranty covers'
            },
            warrantyTypeId: {
              type: 'integer',
              description: 'Type of warranty'
            },
            warrantySupplierId: {
              type: 'string',
              description: 'Warranty supplier identifier'
            },
            warrantyNumber: {
              type: 'string',
              description: 'Warranty number'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Warranty start date'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Warranty end date'
            },
            warrantyPeriod: {
              type: 'integer',
              description: 'Warranty period in months'
            },
            coverageType: {
              type: 'string',
              description: 'Type of coverage'
            },
            coverageDescription: {
              type: 'string',
              description: 'Detailed coverage description'
            },
            termsConditions: {
              type: 'string',
              description: 'Warranty terms and conditions'
            },
            cost: {
              type: 'number',
              description: 'Warranty cost'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the warranty is active'
            },
            autoRenewal: {
              type: 'boolean',
              description: 'Whether warranty auto-renews'
            },
            consumerId: {
              type: 'integer',
              description: 'Consumer ID'
            },
            supplierId: {
              type: 'integer',
              description: 'Supplier ID'
            }
          }
        },
        ServiceHistory: {
          type: 'object',
          properties: {
            serviceHistoryId: {
              type: 'integer',
              description: 'Unique identifier for the service history record'
            },
            assetId: {
              type: 'string',
              description: 'Asset ID this service history belongs to'
            },
            technicianName: {
              type: 'string',
              description: 'Name of the technician who performed the service'
            },
            serviceSupplierName: {
              type: 'string',
              description: 'Name of the service supplier'
            },
            warrantyStatus: {
              type: 'string',
              enum: ['ACTIVE', 'EXPIRED', 'VOID'],
              description: 'Warranty status at the time of service'
            },
            serviceStatus: {
              type: 'string',
              nullable: true,
              description: 'Status of the service performed'
            },
            serviceDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the service was performed'
            },
            serviceType: {
              type: 'string',
              nullable: true,
              description: 'Type of service performed (Preventive, Repair, Installation)'
            },
            serviceDescription: {
              type: 'string',
              nullable: true,
              description: 'Detailed description of the service performed'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Service history creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Service history last update timestamp'
            }
          },
          required: ['serviceHistoryId', 'assetId', 'technicianName', 'serviceSupplierName', 'warrantyStatus', 'serviceDate', 'createdAt', 'updatedAt']
        },
        CreateServiceHistoryDto: {
          type: 'object',
          properties: {
            assetId: {
              type: 'string',
              description: 'Asset ID this service history belongs to'
            },
            technicianName: {
              type: 'string',
              description: 'Name of the technician who performed the service'
            },
            serviceSupplierName: {
              type: 'string',
              description: 'Name of the service supplier'
            },
            warrantyStatus: {
              type: 'string',
              enum: ['ACTIVE', 'EXPIRED', 'VOID'],
              description: 'Warranty status at the time of service'
            },
            serviceStatus: {
              type: 'string',
              description: 'Status of the service performed'
            },
            serviceDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the service was performed'
            },
            serviceType: {
              type: 'string',
              description: 'Type of service performed (Preventive, Repair, Installation)'
            },
            serviceDescription: {
              type: 'string',
              description: 'Detailed description of the service performed'
            }
          },
          required: ['assetId', 'technicianName', 'serviceSupplierName', 'warrantyStatus', 'serviceDate']
        },
        UpdateServiceHistoryDto: {
          type: 'object',
          properties: {
            assetId: {
              type: 'string',
              description: 'Asset ID this service history belongs to'
            },
            technicianName: {
              type: 'string',
              description: 'Name of the technician who performed the service'
            },
            serviceSupplierName: {
              type: 'string',
              description: 'Name of the service supplier'
            },
            warrantyStatus: {
              type: 'string',
              enum: ['ACTIVE', 'EXPIRED', 'VOID'],
              description: 'Warranty status at the time of service'
            },
            serviceStatus: {
              type: 'string',
              description: 'Status of the service performed'
            },
            serviceDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the service was performed'
            },
            serviceType: {
              type: 'string',
              description: 'Type of service performed (Preventive, Repair, Installation)'
            },
            serviceDescription: {
              type: 'string',
              description: 'Detailed description of the service performed'
            }
          }
        }
      },
      parameters: {
        page: {
          name: 'page',
          in: 'query',
          description: 'Page number for pagination',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 1
          }
        },
        limit: {
          name: 'limit',
          in: 'query',
          description: 'Number of items per page',
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10
          }
        },
        search: {
          name: 'search',
          in: 'query',
          description: 'Search term for filtering results',
          schema: {
            type: 'string'
          }
        },
        isActive: {
          name: 'isActive',
          in: 'query',
          description: 'Filter by active status',
          schema: {
            type: 'boolean'
          }
        },
        userId: {
          name: 'userId',
          in: 'query',
          description: 'Filter by user ID',
          schema: {
            type: 'string'
          }
        },

      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

export const specs = swaggerJsdoc(options); 