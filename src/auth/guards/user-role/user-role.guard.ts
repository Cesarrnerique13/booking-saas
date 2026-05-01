import { User } from '@/users/entities/user.entity';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { forbidden } from 'joi';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

   const validRoles:string[] = this.reflector.get('roles', context.getHandler());

   const req = context.switchToHttp().getRequest();
   const user = req.user as User;

   if(!user) {
    throw new NotFoundException('User not Found')
   }

   for (const role of user.roles) {
    if (validRoles.includes( role ) ) {
      return true;
    }
   }

    throw new ForbiddenException(`User ${user.name} need a valid role: [${validRoles}]`)
  }
}
