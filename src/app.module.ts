import { Module } from '@nestjs/common';
import { AdminModule } from '@Admin/admin.module';
import { UserModule } from '@User/user.module';
import { AuthModule } from '@Auth/auth.module';

@Module({
  imports: [
    AdminModule,
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
