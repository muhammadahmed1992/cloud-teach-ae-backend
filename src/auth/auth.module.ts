import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Exporting the service if needed in other modules
})
export class AuthModule {}
