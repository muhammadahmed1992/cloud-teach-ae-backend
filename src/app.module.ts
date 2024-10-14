import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '@Auth/auth.module';
import { AdminModule } from '@Admin/admin.module';
import { UserModule } from '@User/user.module';
import { BookModule } from '@Book/book.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    UserModule,
    AuthModule,
    PrismaModule,
    AuthModule,
    BookModule
  ]
})
export class AppModule {}
