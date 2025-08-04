import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting warranty service database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.warrantyNotification.deleteMany();
  await prisma.warranties.deleteMany();
  await prisma.warrantyType.deleteMany();
  await prisma.serviceContract.deleteMany();
  await prisma.serviceContractStatus.deleteMany();
  await prisma.contractType.deleteMany();
  await prisma.consumerPreference.deleteMany();
  await prisma.supplierPreference.deleteMany();

  console.log('✅ Existing data cleared');

  // 1. Create Warranty Types
  console.log('📋 Creating warranty types...');
  const warrantyTypes = await Promise.all([
    prisma.warrantyType.create({
      data: {
        typeName: 'Manufacturer',
        description: 'Standard manufacturer warranty provided with new equipment'
      }
    }),
    prisma.warrantyType.create({
      data: {
        typeName: 'Extended',
        description: 'Extended warranty coverage beyond manufacturer warranty'
      }
    }),
    prisma.warrantyType.create({
      data: {
        typeName: 'Service Contract',
        description: 'Service contract providing maintenance and repair coverage'
      }
    }),
    prisma.warrantyType.create({
      data: {
        typeName: 'Third Party',
        description: 'Warranty provided by third-party insurance companies'
      }
    }),
    prisma.warrantyType.create({
      data: {
        typeName: 'Premium',
        description: 'Premium warranty with comprehensive coverage and fast response'
      }
    })
  ]);

  console.log(`✅ Created ${warrantyTypes.length} warranty types`);

  // 2. Create Contract Types
  console.log('📋 Creating contract types...');
  const contractTypes = await Promise.all([
    prisma.contractType.create({
      data: {
        typeName: 'AMC',
        typeCode: 'AMC',
        description: 'Annual Maintenance Contract - Comprehensive maintenance coverage',
        contractDurationMonths: 12
      }
    }),
    prisma.contractType.create({
      data: {
        typeName: 'CMC',
        typeCode: 'CMC',
        description: 'Comprehensive Maintenance Contract - Full service coverage',
        contractDurationMonths: 24
      }
    }),
    prisma.contractType.create({
      data: {
        typeName: 'ON_CALL',
        typeCode: 'ONCALL',
        description: 'On-Call Service - Pay-per-service maintenance',
        contractDurationMonths: null
      }
    }),
    prisma.contractType.create({
      data: {
        typeName: 'BREAKDOWN_MAINTENANCE',
        typeCode: 'BDM',
        description: 'Breakdown Maintenance - Emergency repair services only',
        contractDurationMonths: 12
      }
    })
  ]);

  console.log(`✅ Created ${contractTypes.length} contract types`);

  // 3. Create Service Contract Statuses
  console.log('📋 Creating service contract statuses...');
  const contractStatuses = await Promise.all([
    prisma.serviceContractStatus.create({
      data: {
        name: 'Draft',
      }
    }),
    prisma.serviceContractStatus.create({
      data: {
        name: 'Active',
      }
    }),
    prisma.serviceContractStatus.create({
      data: {
        name: 'Expired',
      }
    }),
    prisma.serviceContractStatus.create({
      data: {
        name: 'Terminated',
      }
    }),
    prisma.serviceContractStatus.create({
      data: {
        name: 'Suspended',
      }
    })
  ]);

  console.log(`✅ Created ${contractStatuses.length} contract statuses`);

  // 4. Create Consumer Preferences
  console.log('📋 Creating consumer preferences...');
  const consumerPreferences = await Promise.all([
    prisma.consumerPreference.create({
      data: {
        consumerId: 1,
        notificationDays: 30
      }
    }),
    prisma.consumerPreference.create({
      data: {
        consumerId: 2,
        notificationDays: 45
      }
    }),
    prisma.consumerPreference.create({
      data: {
        consumerId: 3,
        notificationDays: 15
      }
    }),
    prisma.consumerPreference.create({
      data: {
        consumerId: 4,
        notificationDays: 60
      }
    }),
    prisma.consumerPreference.create({
      data: {
        consumerId: 5,
        notificationDays: 30
      }
    })
  ]);

  console.log(`✅ Created ${consumerPreferences.length} consumer preferences`);

  // 5. Create Supplier Preferences
  console.log('📋 Creating supplier preferences...');
  const supplierPreferences = await Promise.all([
    prisma.supplierPreference.create({
      data: {
        supplierId: 1,
        notificationDays: 30
      }
    }),
    prisma.supplierPreference.create({
      data: {
        supplierId: 2,
        notificationDays: 45
      }
    }),
    prisma.supplierPreference.create({
      data: {
        supplierId: 3,
        notificationDays: 15
      }
    }),
    prisma.supplierPreference.create({
      data: {
        supplierId: 4,
        notificationDays: 60
      }
    }),
    prisma.supplierPreference.create({
      data: {
        supplierId: 5,
        notificationDays: 30
      }
    })
  ]);

  console.log(`✅ Created ${supplierPreferences.length} supplier preferences`);

  // 6. Create Warranties
  console.log('📋 Creating warranties...');
  const warranties = await Promise.all([
    prisma.warranties.create({
      data: {
        assetId: '1001',
        warrantyTypeId: warrantyTypes[0].warrantyTypeId, // Manufacturer
        warrantySupplierId: 'MANUF-001',
        warrantyNumber: 'WAR-2024-001',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2027-01-15'),
        warrantyPeriod: 36,
        coverageType: 'Comprehensive Coverage',
        coverageDescription: 'Full coverage including parts, labor, and emergency services',
        termsConditions: 'Standard manufacturer warranty terms apply',
        cost: 0.00,
        isActive: true,
        autoRenewal: false,
        consumerId: 1,
        supplierId: 1
      }
    }),
    prisma.warranties.create({
      data: {
        assetId: '1002',
        warrantyTypeId: warrantyTypes[1].warrantyTypeId, // Extended
        warrantySupplierId: 'EXTEND-001',
        warrantyNumber: 'WAR-2024-002',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2026-02-01'),
        warrantyPeriod: 24,
        coverageType: 'Extended Coverage',
        coverageDescription: 'Extended warranty with premium support',
        termsConditions: 'Extended warranty terms with 24/7 support',
        cost: 2500.00,
        isActive: true,
        autoRenewal: true,
        consumerId: 2,
        supplierId: 2
      }
    }),
    prisma.warranties.create({
      data: {
        assetId: '1003',
        warrantyTypeId: warrantyTypes[2].warrantyTypeId, // Service Contract
        warrantySupplierId: 'SERVICE-001',
        warrantyNumber: 'WAR-2024-003',
        startDate: new Date('2024-03-10'),
        endDate: new Date('2025-03-10'),
        warrantyPeriod: 12,
        coverageType: 'Service Contract',
        coverageDescription: 'Maintenance and repair service contract',
        termsConditions: 'Service contract terms with scheduled maintenance',
        cost: 1800.00,
        isActive: true,
        autoRenewal: true,
        consumerId: 3,
        supplierId: 3
      }
    }),
    prisma.warranties.create({
      data: {
        assetId: '1004',
        warrantyTypeId: warrantyTypes[3].warrantyTypeId, // Third Party
        warrantySupplierId: 'THIRD-001',
        warrantyNumber: 'WAR-2024-004',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        warrantyPeriod: 12,
        coverageType: 'Third Party Insurance',
        coverageDescription: 'Third-party insurance warranty coverage',
        termsConditions: 'Insurance-based warranty terms',
        cost: 1200.00,
        isActive: true,
        autoRenewal: false,
        consumerId: 4,
        supplierId: 4
      }
    }),
    prisma.warranties.create({
      data: {
        assetId: '1005',
        warrantyTypeId: warrantyTypes[4].warrantyTypeId, // Premium
        warrantySupplierId: 'PREMIUM-001',
        warrantyNumber: 'WAR-2024-005',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2028-04-01'),
        warrantyPeriod: 48,
        coverageType: 'Premium Coverage',
        coverageDescription: 'Premium warranty with 24/7 support and fast response',
        termsConditions: 'Premium warranty with guaranteed response times',
        cost: 5000.00,
        isActive: true,
        autoRenewal: true,
        consumerId: 5,
        supplierId: 5
      }
    })
  ]);

  console.log(`✅ Created ${warranties.length} warranties`);

  // 7. Create Service Contracts
  console.log('📋 Creating service contracts...');
  const serviceContracts = await Promise.all([
    prisma.serviceContract.create({
      data: {
        contractNumber: 'SC-2024-001',
        contractTypeId: contractTypes[0].contractTypeId, // AMC
        assetId: '2001',
        serviceSupplierId: 1,
        contractName: 'Annual Maintenance Contract - HVAC System',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        paymentTerms: 'YEARLY',
        coverageType: 'COMPREHENSIVE',
        includes: 'Preventive maintenance, emergency repairs, parts replacement',
        excludes: 'Damage due to misuse, natural disasters',
        serviceFrequency: 'QUARTERLY',
        preventiveMaintenanceIncluded: true,
        breakdownMaintenanceIncluded: true,
        autoRenewal: true,
        createdBy: 'admin@company.com',
        updatedBy: 'admin@company.com',
        statusId: contractStatuses[1].statusId // Active
      }
    }),
    prisma.serviceContract.create({
      data: {
        contractNumber: 'SC-2024-002',
        contractTypeId: contractTypes[1].contractTypeId, // CMC
        assetId: '2002',
        serviceSupplierId: 2,
        contractName: 'Comprehensive Maintenance Contract - Production Line',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2026-01-31'),
        paymentTerms: 'HALF_YEARLY',
        coverageType: 'COMPREHENSIVE',
        includes: 'Full maintenance, upgrades, optimization',
        excludes: 'Major overhauls, replacement of entire systems',
        serviceFrequency: 'MONTHLY',
        preventiveMaintenanceIncluded: true,
        breakdownMaintenanceIncluded: true,
        autoRenewal: true,
        createdBy: 'manager@company.com',
        updatedBy: 'manager@company.com',
        statusId: contractStatuses[1].statusId // Active
      }
    }),
    prisma.serviceContract.create({
      data: {
        contractNumber: 'SC-2024-003',
        contractTypeId: contractTypes[2].contractTypeId, // ON_CALL
        assetId: '2003',
        serviceSupplierId: 3,
        contractName: 'On-Call Service Contract - Backup Systems',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2025-02-28'),
        paymentTerms: 'ONE_TIME',
        coverageType: 'PARTS_ONLY',
        includes: 'Emergency repairs, critical system support',
        excludes: 'Preventive maintenance, routine inspections',
        serviceFrequency: 'AS_REQUIRED',
        preventiveMaintenanceIncluded: false,
        breakdownMaintenanceIncluded: true,
        autoRenewal: false,
        createdBy: 'tech@company.com',
        updatedBy: 'tech@company.com',
        statusId: contractStatuses[1].statusId // Active
      }
    }),
    prisma.serviceContract.create({
      data: {
        contractNumber: 'SC-2024-004',
        contractTypeId: contractTypes[3].contractTypeId, // BREAKDOWN_MAINTENANCE
        assetId: '2004',
        serviceSupplierId: 4,
        contractName: 'Breakdown Maintenance Contract - Conveyor System',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2025-03-31'),
        paymentTerms: 'QUARTERLY',
        coverageType: 'PARTS_ONLY',
        includes: 'Emergency repairs, parts replacement',
        excludes: 'Preventive maintenance, system upgrades',
        serviceFrequency: 'AS_REQUIRED',
        preventiveMaintenanceIncluded: false,
        breakdownMaintenanceIncluded: true,
        autoRenewal: true,
        createdBy: 'maintenance@company.com',
        updatedBy: 'maintenance@company.com',
        statusId: contractStatuses[1].statusId // Active
      }
    })
  ]);

  console.log(`✅ Created ${serviceContracts.length} service contracts`);

  // 8. Create Warranty Notifications
  console.log('📋 Creating warranty notifications...');
  const warrantyNotifications = await Promise.all([
    prisma.warrantyNotification.create({
      data: {
        warrantyId: warranties[0].warrantyId,
        notificationType: 'Expiry_Warning',
        message: 'Your manufacturer warranty for Asset #1001 will expire in 30 days. Consider extending your coverage.',
        recipientEmail: 'consumer1@example.com',
        sentDate: new Date('2024-12-15'),
        isSent: true
      }
    }),
    prisma.warrantyNotification.create({
      data: {
        warrantyId: warranties[1].warrantyId,
        notificationType: 'Renewal_Due',
        message: 'Your extended warranty for Asset #1002 is due for renewal. Auto-renewal is enabled.',
        recipientEmail: 'consumer2@example.com',
        sentDate: new Date('2024-01-15'),
        isSent: true
      }
    }),
    prisma.warrantyNotification.create({
      data: {
        warrantyId: warranties[2].warrantyId,
        notificationType: 'Expired',
        message: 'Your service contract for Asset #1003 has expired. Please contact us to renew.',
        recipientEmail: 'consumer3@example.com',
        sentDate: new Date('2025-03-10'),
        isSent: true
      }
    }),
    prisma.warrantyNotification.create({
      data: {
        warrantyId: warranties[3].warrantyId,
        notificationType: 'Claim_Update',
        message: 'Your warranty claim for Asset #1004 has been processed. Claim ID: CLM-2024-001',
        recipientEmail: 'consumer4@example.com',
        sentDate: new Date('2024-06-15'),
        isSent: true
      }
    }),
    prisma.warrantyNotification.create({
      data: {
        warrantyId: warranties[4].warrantyId,
        notificationType: 'Expiry_Warning',
        message: 'Your premium warranty for Asset #1005 will expire in 45 days. Premium support will end.',
        recipientEmail: 'consumer5@example.com',
        sentDate: null,
        isSent: false
      }
    })
  ]);

  console.log(`✅ Created ${warrantyNotifications.length} warranty notifications`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📊 Sample Data Summary:');
  console.log(`   Warranty Types: ${warrantyTypes.length}`);
  console.log(`   Contract Types: ${contractTypes.length}`);
  console.log(`   Contract Statuses: ${contractStatuses.length}`);
  console.log(`   Consumer Preferences: ${consumerPreferences.length}`);
  console.log(`   Supplier Preferences: ${supplierPreferences.length}`);
  console.log(`   Warranties: ${warranties.length}`);
  console.log(`   Service Contracts: ${serviceContracts.length}`);
  console.log(`   Warranty Notifications: ${warrantyNotifications.length}`);
  
  console.log('\n🔑 Sample Data Details:');
  console.log('   Warranty Types: Manufacturer, Extended, Service Contract, Third Party, Premium');
  console.log('   Contract Types: AMC, CMC, ON_CALL, BREAKDOWN_MAINTENANCE');
  console.log('   Contract Statuses: Draft, Active, Expired, Terminated, Suspended');
  console.log('   Notification Types: Expiry_Warning, Expired, Renewal_Due, Claim_Update');
  
  console.log('\n💡 Test Scenarios:');
  console.log('   - Expiring warranties with notifications');
  console.log('   - Active service contracts with different payment terms');
  console.log('   - Various warranty types with different coverage levels');
  console.log('   - Consumer and supplier notification preferences');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 