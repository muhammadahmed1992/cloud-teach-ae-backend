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

  const users = await prisma.user.findMany({ where: { roleId: userRole.id } });
  const books = await prisma.book.findMany();

  const sharedBooks = books.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 3);

  for (const user of users) {
    let selectedBooks = [];

    if (user.name === 'Jeff' || user.name === 'Adams') {
      selectedBooks.push(...sharedBooks);

      const remainingBooks = books.filter(book => !sharedBooks.includes(book));
      const uniqueBooks = remainingBooks.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 5);

      selectedBooks.push(...uniqueBooks);
    } else {
      selectedBooks = books.sort(() => 0.5 - Math.random()).slice(0, 5);
    }

    for (const book of selectedBooks) {
      const existingUserBook = await prisma.userBook.findFirst({
        where: {
          userId: user.id,
          bookId: book.id,
          isDeleted: false,
        },
      });

      if (existingUserBook) {
        await prisma.userBook.update({
          where: {
            id: existingUserBook.id,
          },
          data: {
            updatedTime: new Date(),
            isDeleted: false,
          },
        });
      } else {
        await prisma.userBook.create({
          data: {
            userId: user.id,
            bookId: book.id,
            createdTime: new Date(),
            updatedTime: new Date(),
            isDeleted: false,
          },
        });
      }
    }
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