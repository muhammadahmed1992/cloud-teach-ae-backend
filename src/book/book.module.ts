import { Module } from '@nestjs/common';
import { BookController } from '@Book/book.controller';
import { BookService } from '@Book/book.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { JwtModule } from '@JWT/jwt.module';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}