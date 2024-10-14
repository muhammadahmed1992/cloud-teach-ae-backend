import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  const adminPwd = await bcrypt.hash('crmsrv@12A', 10);
  const userPwd = await bcrypt.hash('websrvsigma308', 10);

  // Create roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      description: 'Administrator with full access',
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'User',
      description: 'Regular user with only his book access',
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false
    },
  });

  // Create users
  await prisma.user.create({
    data: {
      name: 'admin_user123',
      password: adminPwd,
      roleId: adminRole.id,
    },
  });

  await prisma.user.create({
    data: {
      name: 'test_user123',
      password: userPwd,
      roleId: userRole.id,
    },
  });

  console.log('Seed data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
