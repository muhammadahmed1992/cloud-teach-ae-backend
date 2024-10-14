import { Body, Controller, Post} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import ApiResponse from '@Helpers/api-response';
import { LoginResponseDTO } from './dto/login-response.dto';
import { AuthService } from './Auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() loginDto: LoginDTO): Promise<ApiResponse<LoginResponseDTO>> {
    return await this.authService.login(loginDto);
  }
}
