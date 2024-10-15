import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  const passwords = {
    user1: 'crmsrv@12A',
    user2: 'websrvsigma308',
    user3: 'user_password',
  };

  const hashedPasswords = await Promise.all(
    Object.values(passwords).map((password) => bcrypt.hash(password, 10))
  );

  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator with full access',
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false,
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      description: 'Regular user with only his book access',
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false,
    },
  });

  await prisma.user.upsert({
    where: { name: 'admin_user123' },
    update: {},
    create: {
      name: 'admin_user123',
      password: hashedPasswords[0],
      roleId: adminRole.id,
    },
  });

  const usersData = [
    { name: 'Jeff', password: hashedPasswords[1], roleId: userRole.id },
    { name: 'Adams', password: hashedPasswords[2], roleId: userRole.id },
  ];

  for (const userData of usersData) {
    await prisma.user.upsert({
      where: { name: userData.name },
      update: {},
      create: userData,
    });
  }

  // Dummy book records
  const booksData = [];
  for (let i = 1; i <= 30; i++) {
    booksData.push({
      title: `Book ${i}`,
      author: `Author ${i}`,
      publicationDate: new Date(`2020-0${i % 12 + 1}-01`),
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false,
    });
  }

  for (const bookData of booksData) {
    await prisma.book.upsert({
      where: { title: bookData.title },
      update: {},
      create: bookData,
    });
  }

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