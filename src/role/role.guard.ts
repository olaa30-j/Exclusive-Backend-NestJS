/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { Role } from 'src/domains/user/schemas/role.enum';

// here it is to check if role in request it is have rights to access this route or not
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector :Reflector){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean>{
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
