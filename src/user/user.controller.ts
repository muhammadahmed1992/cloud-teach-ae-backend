import { Body, Controller, Post} from '@nestjs/common';
import { UserService } from './user.service';
import ApiResponse from '@Helpers/api-response';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<CreateUserDto>> {
    return await this.userService.register(createUserDto);
  } 
}
