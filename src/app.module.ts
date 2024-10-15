import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '@Auth/auth.module';
import { UserModule } from '@User/user.module';
import { BookModule } from '@Book/book.module'
import { ReviewsModule } from 'book-review/review.module';
import { HeartBeatController } from 'heart-beat.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    AuthModule,
    BookModule,
    ReviewsModule
  ],
  controllers: [HeartBeatController]
})
export class AppModule {}
