import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@User/user.module';
import { JwtModule } from '@JWT/jwt.module';

@Module({
  imports: [
    JwtModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
