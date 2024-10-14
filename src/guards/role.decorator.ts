import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: number[]) => SetMetadata('Roles', roles);