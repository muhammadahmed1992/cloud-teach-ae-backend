import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@Prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto';
import ApiResponse from '@Helpers/api-response';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import ResponseHelper from '@Helpers/response-helper';
import Constants from '@Helpers/constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(user: CreateUserDto): Promise<ApiResponse<CreateUserDto>> {
    const hashedPassword = await this.hashPassword(user.password);
    const createdUser: User = await this.prisma.user.create({
        data: {
          name: user.name,
          password: hashedPassword,
          roleId: user.roleId,
        },
      });
    return ResponseHelper.CreateResponse<CreateUserDto>(createdUser, HttpStatus.CREATED, Constants.USER_CREATED);
  }

  async findById(id: number): Promise<ApiResponse<CreateUserDto>> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });
    return ResponseHelper.CreateResponse<CreateUserDto>(user, HttpStatus.FOUND);
  }

  async findByName(name: string): Promise<ApiResponse<CreateUserDto>> {
    const user: User = await this.prisma.user.findUnique({
      where: { name },
    });
    return ResponseHelper.CreateResponse<CreateUserDto>(user, HttpStatus.FOUND);
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
