import { Module } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { ReviewsController } from './review.controller';
import { PrismaModule } from '@Prisma/prisma.module';
import { JwtModule } from '@JWT/jwt.module';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
