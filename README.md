<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Backend
---

## **Installation**

### Prerequisites

- npm or yarn
- MySQL or another supported database
- NestJS CLI (for backend)
- Run prisma migration  

npm install -g @nestjs/cli
---

## **Backend Setup (NestJS)**


1. Install dependencies:

npm install

2. Set up the environment variables:

Create a `.env` file in the `backend` directory with the following content:

DATABASE_URL="mysql://root:password@localhost:3306/cloudtech"
MYSQL_DATABASE=cloudtech
MYSQL_ROOT_PASSWORD=password
JWT_SECRET="yoursecretkey"
JWT_EXPIRATION=1h

3. npm run reset-migrate

4. Start the NestJS application:

npm run start:dev


## **API Endpoints**

### **Auth**

- `POST /auth/login` - Logs in a user and returns a JWT.

### **Books**

- `POST /books` - Admin only. Create a new book.
- `GET /books` - Admin and User. Fetch all books.
- `PUT /books/:id` - Admin only. Update a book by ID.
- `DELETE /books/:id` - Admin only. Delete a book by ID.

### **Reviews**

- `POST /reviews` - Admin and User. Submit a new review.
- `GET /reviews/:bookId/book` - Admin and User. Get reviews for a book.
- `PUT /reviews/:id` - Admin and User. Update a review by ID.
- `DELETE /reviews/:id` - Admin and User. Delete a review by ID.

---

## **Environment Variables**

Both backend and frontend use environment variables for configuration.

### **Backend (`.env` file)**

DATABASE_URL="mysql://root:crmsrv@12A@localhost:3306/cloudtech"

MYSQL_DATABASE=cloudtech
MYSQL_ROOT_PASSWORD=crmsrv@12A

JWT_SECRET="cloadtechae@1234"
JWT_EXPIRATION=1h

---

## **Running Migrations**

In the backend, you can reset and run migrations using:

npm run reset-migrate

This command resets the database and applies the latest migrations.

---

## **License**

This project is licensed under the MIT License.

----