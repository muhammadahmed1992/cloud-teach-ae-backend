import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  
  const adminPwd = await bcrypt.hash('crmsrv@12A', 10);
  const userPwd = await bcrypt.hash('websrvsigma308', 10);

  // Upsert roles (to avoid duplicates)
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

  // Upsert users (to avoid duplicates)
  await prisma.user.upsert({
    where: { name: 'admin_user123' },
    update: {},
    create: {
      name: 'admin_user123',
      password: adminPwd,
      roleId: adminRole.id,
    },
  });

  await prisma.user.upsert({
    where: { name: 'test_user123' },
    update: {},
    create: {
      name: 'test_user123',
      password: userPwd,
      roleId: userRole.id,
    },
  });

  // Upsert books (to avoid duplicates)
  const booksData = [
    {
      title: 'Book 1',
      author: 'Author 1',
      publicationDate: new Date('2020-01-01'),
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false,
    },
    {
      title: 'Book 2',
      author: 'Author 2',
      publicationDate: new Date('2020-02-01'),
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false,
    },
    {
      title: 'Book 3',
      author: 'Author 3',
      publicationDate: new Date('2020-03-01'),
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false,
    },
    {
      title: 'Book 4',
      author: 'Author 4',
      publicationDate: new Date('2020-04-01'),
      createdTime: new Date(),
      updatedTime: new Date(),
      isDeleted: false,
    },
  ];

  for (const bookData of booksData) {
    await prisma.book.upsert({
      where: { title: bookData.title },
      update: {},
      create: bookData,
    });
  }

  // Assign books to the user
  const user = await prisma.user.findUnique({ where: { name: 'test_user123' } });
  const books = await prisma.book.findMany({
    where: { title: { in: ['Book 1', 'Book 2'] } },
  });

  for (const book of books) {
    await prisma.userBook.upsert({
      where: {
        userId_bookId: {
          userId: user!.id,
          bookId: book.id,
        },
      },
      update: {},
      create: {
        userId: user!.id,
        bookId: book.id,
        createdTime: new Date(),
        updatedTime: new Date(),
        isDeleted: false,
      },
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