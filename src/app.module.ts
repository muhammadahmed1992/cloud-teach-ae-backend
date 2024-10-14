import { Module } from '@nestjs/common';

import { AdminModule } from '@Admin/admin.module';
import { UserModule } from '@User/user.module';
import { AuthModule } from '@Auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    UserModule,
    AuthModule,
    PrismaModule,
    AuthModule
  ]
})
export class AppModule {}
