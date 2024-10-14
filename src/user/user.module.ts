import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { RolesGuard } from '@Guards/role.guard';
import { JwtModule } from '@JWT/jwt.module';
@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, RolesGuard],
  exports: [UserService, RolesGuard]
})
export class UserModule {}
