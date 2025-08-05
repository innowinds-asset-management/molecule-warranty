import { Request } from 'express';

// ============================================================================
// ENUMS
// ============================================================================

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
  GUEST = 'GUEST'
}

export enum WarrantyNotificationType {
  Expiry_Warning = 'Expiry_Warning',
  Expired = 'Expired',
  Renewal_Due = 'Renewal_Due',
  Claim_Update = 'Claim_Update'
}

export enum ContractTypeName {
  AMC = 'AMC',
  CMC = 'CMC',
  ON_CALL = 'ON_CALL',
  BREAKDOWN_MAINTENANCE = 'BREAKDOWN_MAINTENANCE'
}

export enum PaymentTerms {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  YEARLY = 'YEARLY',
  ONE_TIME = 'ONE_TIME'
}

export enum CoverageType {
  COMPREHENSIVE = 'COMPREHENSIVE',
  PARTS_ONLY = 'PARTS_ONLY',
  LABOR_ONLY = 'LABOR_ONLY',
  PREVENTIVE_ONLY = 'PREVENTIVE_ONLY'
}

export enum ServiceFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  YEARLY = 'YEARLY',
  AS_REQUIRED = 'AS_REQUIRED'
}

// ============================================================================
// WARRANTY SYSTEM DTOs
// ============================================================================

export interface WarrantyType {
  warrantyTypeId: number;
  typeName: string;
  description?: string;
  createdAt: Date;
  warranties?: Warranties[];
}

export interface CreateWarrantyTypeDto {
  typeName: string;
  description?: string;
}

export interface UpdateWarrantyTypeDto {
  typeName?: string;
  description?: string;
}

export interface WarrantyTypeSearchDto {
  typeName?: string;
  description?: string;
}

export interface WarrantyTypeListDto {
  data: WarrantyType[];
  pagination: PaginationInfo;
}

export interface Warranties {
  warrantyId: number;
  assetId: string;
  warrantyTypeId: number;
  warrantySupplierId?: string;
  warrantyNumber?: string;
  startDate: Date;
  endDate: Date;
  warrantyPeriod?: number;
  coverageType?: string;
  coverageDescription?: string;
  termsConditions?: string;
  cost?: number;
  isActive: boolean;
  autoRenewal: boolean;
  createdAt: Date;
  updatedAt: Date;
  consumerId?: number;
  supplierId?: number;
  warrantyType?: WarrantyType;
  notifications?: WarrantyNotification[];
}

export interface CreateWarrantyDto {
  assetId: string;
  warrantyTypeId: number;
  warrantySupplierId?: string;
  warrantyNumber?: string;
  startDate: Date;
  endDate: Date;
  warrantyPeriod?: number;
  coverageType?: string;
  coverageDescription?: string;
  termsConditions?: string;
  cost?: number;
  isActive?: boolean;
  autoRenewal?: boolean;
  consumerId?: number;
  supplierId?: number;
}

export interface UpdateWarrantyDto {
  assetId?: string;
  warrantyTypeId?: number;
  warrantySupplierId?: string;
  warrantyNumber?: string;
  startDate?: Date;
  endDate?: Date;
  warrantyPeriod?: number;
  coverageType?: string;
  coverageDescription?: string;
  termsConditions?: string;
  cost?: number;
  isActive?: boolean;
  autoRenewal?: boolean;
  consumerId?: number;
  supplierId?: number;
}

export interface WarrantySearchDto {
  assetId?: string;
  warrantyTypeId?: number;
  consumerId?: number;
  supplierId?: number;
  isActive?: boolean;
  autoRenewal?: boolean;
  startDate?: Date;
  endDate?: Date;
  expiringSoon?: boolean;
}

export interface WarrantyListDto {
  data: Warranties[];
  pagination: PaginationInfo;
}

// ============================================================================
// WARRANTY NOTIFICATION DTOs
// ============================================================================

export interface WarrantyNotification {
  notificationId: number;
  warrantyId: number;
  notificationType: WarrantyNotificationType;
  message: string;
  recipientEmail?: string;
  sentDate?: Date;
  isSent: boolean;
  createdAt: Date;
  warranty?: Warranties;
}

export interface CreateWarrantyNotificationDto {
  warrantyId: number;
  notificationType: WarrantyNotificationType;
  message: string;
  recipientEmail?: string;
  sentDate?: Date;
  isSent?: boolean;
}

export interface UpdateWarrantyNotificationDto {
  warrantyId?: number;
  notificationType?: WarrantyNotificationType;
  message?: string;
  recipientEmail?: string;
  sentDate?: Date;
  isSent?: boolean;
}

export interface WarrantyNotificationSearchDto {
  warrantyId?: number;
  notificationType?: WarrantyNotificationType;
  isSent?: boolean;
  recipientEmail?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface WarrantyNotificationListDto {
  data: WarrantyNotification[];
  pagination: PaginationInfo;
}

// ============================================================================
// SERVICE CONTRACT DTOs
// ============================================================================

export interface ContractType {
  contractTypeId: number;
  typeName: ContractTypeName;
  typeCode: string;
  description?: string;
  contractDurationMonths?: number;
  createdAt: Date;
  serviceContracts?: ServiceContract[];
}

export interface CreateContractTypeDto {
  typeName: ContractTypeName;
  typeCode: string;
  description?: string;
  contractDurationMonths?: number;
}

export interface UpdateContractTypeDto {
  typeName?: ContractTypeName;
  typeCode?: string;
  description?: string;
  contractDurationMonths?: number;
}

export interface ContractTypeSearchDto {
  typeName?: ContractTypeName;
  typeCode?: string;
  description?: string;
}

export interface ContractTypeListDto {
  data: ContractType[];
  pagination: PaginationInfo;
}

export interface ServiceContractStatus {
  statusId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  serviceContracts?: ServiceContract[];
}

export interface CreateServiceContractStatusDto {
  name: string;
}

export interface UpdateServiceContractStatusDto {
  name?: string;
}

export interface ServiceContractStatusSearchDto {
  name?: string;
}

export interface ServiceContractStatusListDto {
  data: ServiceContractStatus[];
  pagination: PaginationInfo;
}

export interface ServiceContract {
  contractId: number;
  contractNumber: string;
  contractTypeId: number;
  assetId: string;
  serviceSupplierId: number;
  contractName: string;
  startDate: Date;
  endDate: Date;
  paymentTerms: PaymentTerms;
  coverageType: CoverageType;
  includes?: string;
  excludes?: string;
  serviceFrequency: ServiceFrequency;
  preventiveMaintenanceIncluded: boolean;
  breakdownMaintenanceIncluded: boolean;
  autoRenewal: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  statusId?: number;
  contractType?: ContractType;
  status?: ServiceContractStatus;
}

export interface CreateServiceContractDto {
  contractNumber: string;
  contractTypeId: number;
  assetId: string;
  serviceSupplierId: number;
  contractName: string;
  startDate: Date;
  endDate: Date;
  paymentTerms?: PaymentTerms;
  coverageType?: CoverageType;
  includes?: string;
  excludes?: string;
  serviceFrequency?: ServiceFrequency;
  preventiveMaintenanceIncluded?: boolean;
  breakdownMaintenanceIncluded?: boolean;
  autoRenewal?: boolean;
  createdBy?: string;
  updatedBy?: string;
  statusId?: number;
}

export interface UpdateServiceContractDto {
  contractNumber?: string;
  contractTypeId?: number;
  assetId?: string;
  serviceSupplierId?: number;
  contractName?: string;
  startDate?: Date;
  endDate?: Date;
  paymentTerms?: PaymentTerms;
  coverageType?: CoverageType;
  includes?: string;
  excludes?: string;
  serviceFrequency?: ServiceFrequency;
  preventiveMaintenanceIncluded?: boolean;
  breakdownMaintenanceIncluded?: boolean;
  autoRenewal?: boolean;
  createdBy?: string;
  updatedBy?: string;
  statusId?: number;
}

export interface ServiceContractSearchDto {
  contractTypeId?: number;
  serviceSupplierId?: number;
  statusId?: number;
  isActive?: boolean;
  autoRenewal?: boolean;
  startDate?: Date;
  endDate?: Date;
  paymentTerms?: PaymentTerms;
  coverageType?: CoverageType;
}

export interface ServiceContractListDto {
  data: ServiceContract[];
  pagination: PaginationInfo;
}

// ============================================================================
// PREFERENCE DTOs
// ============================================================================

export interface ConsumerPreference {
  preferenceId: number;
  consumerId: number;
  notificationDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateConsumerPreferenceDto {
  consumerId: number;
  notificationDays?: number;
}

export interface UpdateConsumerPreferenceDto {
  consumerId?: number;
  notificationDays?: number;
}

export interface ConsumerPreferenceSearchDto {
  consumerId?: number;
  notificationDays?: number;
}

export interface ConsumerPreferenceListDto {
  data: ConsumerPreference[];
  pagination: PaginationInfo;
}

export interface SupplierPreference {
  preferenceId: number;
  supplierId: number;
  notificationDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSupplierPreferenceDto {
  supplierId: number;
  notificationDays?: number;
}

export interface UpdateSupplierPreferenceDto {
  supplierId?: number;
  notificationDays?: number;
}

export interface SupplierPreferenceSearchDto {
  supplierId?: number;
  notificationDays?: number;
}

export interface SupplierPreferenceListDto {
  data: SupplierPreference[];
  pagination: PaginationInfo;
}

// ============================================================================
// COMMON DTOs
// ============================================================================

export interface PaginationQuery {
  page?: string;
  limit?: string;
  search?: string;
  isActive?: string;
  consumerId?: string;
  warrantyTypeId?: string;
  contractTypeId?: string;
  statusId?: string;
  startDate?: string;
  endDate?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CustomRequest extends Request {
  user?: any;
}

export interface DatabaseError {
  code: string;
  message: string;
  statusCode: number;
}

// ============================================================================
// AUTHENTICATION DTOs (for internal service auth)
// ============================================================================

export interface SignupDto {
  email: string;
  password: string;
  name: string;
  consumerId: string;
  role?: Role;
  isActive?: boolean;
}

export interface LoginDto {
  userId: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    consumerId: string;
    role: Role;
    isActive: boolean;
  };
  token: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// ============================================================================
// NOTIFICATION DTOs
// ============================================================================

export interface NotificationScheduleDto {
  warrantyId?: number;
  contractId?: number;
  notificationType: WarrantyNotificationType;
  scheduledDate: Date;
  recipientEmail: string;
  message: string;
}

export interface NotificationPreferenceDto {
  consumerId?: number;
  supplierId?: number;
  notificationDays: number;
  emailNotifications: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface WarrantyResponse {
  success: boolean;
  data?: Warranties;
  message?: string;
  error?: string;
}

export interface WarrantyListResponse {
  success: boolean;
  data?: Warranties[];
  pagination?: PaginationInfo;
  message?: string;
  error?: string;
}

export interface ServiceContractResponse {
  success: boolean;
  data?: ServiceContract;
  message?: string;
  error?: string;
}

export interface ServiceContractListResponse {
  success: boolean;
  data?: ServiceContract[];
  pagination?: PaginationInfo;
  message?: string;
  error?: string;
}

// ============================================================================
// QUERY TYPES
// ============================================================================

export interface WarrantyQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: string;
  warrantyTypeId?: number;
  consumerId?: number;
  supplierId?: number;
  isActive?: boolean;
  autoRenewal?: boolean;
  startDate?: Date;
  endDate?: Date;
  expiringSoon?: boolean;
  days?: number;
}

export interface ServiceContractQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  contractTypeId?: number;
  serviceSupplierId?: number;
  statusId?: number;
  isActive?: boolean;
  autoRenewal?: boolean;
  startDate?: Date;
  endDate?: Date;
  paymentTerms?: PaymentTerms;
  coverageType?: CoverageType;
}

//SeriveHistory 
export interface ServiceHistoryDto {
  serviceHistoryId?: number;
  assetId: string;
  technicianName: string;
  serviceSupplierName: string;
  warrantyStatus: string; // or WarrantyStatus if you have the enum imported
  serviceStatus?: string;
  serviceDate: Date;
  serviceType?: string;
  serviceDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}







