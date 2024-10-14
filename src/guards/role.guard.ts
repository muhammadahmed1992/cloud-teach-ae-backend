import Constants from '@Helpers/constants';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Get the JWT token from the request header and decode it
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ForbiddenException(Constants.MISSING_TOKEN);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as any; // decode the token without validation

    // Attach decoded token (payload) to request object
    request.user = decodedToken;
    
    const user = request.user;
    if (!user) {
      throw new ForbiddenException(Constants.INVALID_PERMISSIONS);
    }

    // Get roles and userId metadata set on the handler (route)
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    // Check if the user's role matches any of the required roles
    const hasRole = () => requiredRoles ? requiredRoles.includes(user.roleId) : true;

    // Deny access if either role or userId check fails
    if (!hasRole()) {
      throw new ForbiddenException(Constants.INVALID_PERMISSIONS);
    }

    return true;  // Grant access if checks pass
  }
}
