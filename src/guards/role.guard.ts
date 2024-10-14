import Constants from '@Helpers/constants';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ForbiddenException(Constants.MISSING_TOKEN);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as any;

    request.user = decodedToken;
    
    const user = request.user;
    if (!user) {
      throw new ForbiddenException(Constants.INVALID_PERMISSIONS);
    }

    const requiredRoles = this.reflector.get<number[]>('Roles', context.getHandler());

    const hasRole = () => requiredRoles ? requiredRoles.includes(user.roleId) : true;

    if (!hasRole()) {
      throw new ForbiddenException(Constants.INVALID_PERMISSIONS);
    }

    return true;
  }
}
