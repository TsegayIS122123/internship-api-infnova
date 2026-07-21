import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        fullName: 'Admin User',
        isActive: true,
      },
    });
    console.log(`✅ Admin created: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Admin already exists: ${adminEmail}`);
  }

  const sampleApplicants = [
    {
      firstName: 'Amanuel',
      lastName: 'Tesfaye',
      email: 'amanuel.tesfaye@example.com',
      phone: '+251911234567',
      status: 'PENDING',
      track: 'BACKEND_DEVELOPMENT',
      notes: 'Strong Node.js and TypeScript experience.',
    },
    {
      firstName: 'Selamawit',
      lastName: 'Gebremichael',
      email: 'selamawit.g@example.com',
      phone: '+251912345678',
      status: 'SHORTLISTED',
      track: 'FRONTEND_DEVELOPMENT',
      notes: 'Excellent React and UI/UX skills.',
    },
    {
      firstName: 'Henok',
      lastName: 'Assefa',
      email: 'henok.assefa@example.com',
      phone: '+251913456789',
      status: 'ACCEPTED',
      track: 'MOBILE_DEVELOPMENT',
      notes: 'Strong React Native and Flutter experience.',
    },
    {
      firstName: 'Meron',
      lastName: 'Hailu',
      email: 'meron.hailu@example.com',
      phone: '+251914567890',
      status: 'REJECTED',
      track: 'DATA_ANALYTICS',
      notes: 'Good Python skills but limited experience.',
    },
    {
      firstName: 'Dawit',
      lastName: 'Solomon',
      email: 'dawit.solomon@example.com',
      phone: '+251915678901',
      status: 'PENDING',
      track: 'UIUX_DESIGN',
      notes: 'Excellent portfolio with UI/UX projects.',
    },
    {
      firstName: 'Eden',
      lastName: 'Worku',
      email: 'eden.worku@example.com',
      phone: '+251916789012',
      status: 'SHORTLISTED',
      track: 'BACKEND_DEVELOPMENT',
      notes: 'Strong Java and Spring Boot experience.',
    },
    {
      firstName: 'Yonas',
      lastName: 'Tadesse',
      email: 'yonas.tadesse@example.com',
      phone: '+251917890123',
      status: 'PENDING',
      track: 'FRONTEND_DEVELOPMENT',
      notes: 'Vue.js and Angular experience.',
    },
    {
      firstName: 'Hanna',
      lastName: 'Girma',
      email: 'hanna.girma@example.com',
      phone: '+251918901234',
      status: 'PENDING',
      track: 'MOBILE_DEVELOPMENT',
      notes: 'Android development experience.',
    },
    {
      firstName: 'Biruk',
      lastName: 'Mekonnen',
      email: 'biruk.mekonnen@example.com',
      phone: '+251919012345',
      status: 'REJECTED',
      track: 'DATA_ANALYTICS',
      notes: 'Good SQL skills but needs more experience.',
    },
    {
      firstName: 'Saron',
      lastName: 'Alemayehu',
      email: 'saron.alemayehu@example.com',
      phone: '+251920123456',
      status: 'SHORTLISTED',
      track: 'UIUX_DESIGN',
      notes: 'Creative designer with strong portfolio.',
    },
    {
      firstName: 'Nathan',
      lastName: 'Teshome',
      email: 'nathan.teshome@example.com',
      phone: '+251921234567',
      status: 'ACCEPTED',
      track: 'BACKEND_DEVELOPMENT',
      notes: 'Experienced Node.js developer.',
    },
    {
      firstName: 'Bethelhem',
      lastName: 'Getachew',
      email: 'bethelhem.g@example.com',
      phone: '+251922345678',
      status: 'PENDING',
      track: 'FRONTEND_DEVELOPMENT',
      notes: 'Strong JavaScript and React skills.',
    },
  ];

  for (const applicant of sampleApplicants) {
    const existing = await prisma.applicant.findUnique({
      where: { email: applicant.email },
    });

    if (!existing) {
      await prisma.applicant.create({
        data: applicant,
      });
      console.log(`✅ Created applicant: ${applicant.firstName} ${applicant.lastName}`);
    } else {
      console.log(`ℹ️ Applicant already exists: ${applicant.firstName} ${applicant.lastName}`);
    }
  }

  console.log('🌱 Seeding completed successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });