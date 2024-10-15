import { HttpStatus, Injectable} from '@nestjs/common';
import { UserService } from '@User/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '@Auth/dto/login.dto';
import ApiResponse from '@Helpers/api-response';
import { compare } from 'bcrypt';
import Constants from '@Helpers/constants';
import ResponseHelper from '@Helpers/response-helper';
import { LoginResponseDTO } from './dto/login-response.dto';
@Injectable()
export class AuthService {
constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
) {}
    
    async login(login: LoginDTO): Promise<ApiResponse<LoginResponseDTO>> {
        const { name, password } = login;
        const user: any = await this.userService.findByName(name);
        if (!user || !user.data || !(await compare(password, user.data.password))) {
            return ResponseHelper.CreateResponse<LoginResponseDTO>({
                isValid: false, accessToken: ''
            }, HttpStatus.NOT_FOUND, Constants.INVALID_USER);
        }
    
        const payload = { id: user.data.id, roleId: user.data.roleId };
        const accessToken = this.jwtService.sign(payload);
    
        return ResponseHelper.CreateResponse<LoginResponseDTO>({
                isValid: true, accessToken
            },HttpStatus.OK
        );
    }
}