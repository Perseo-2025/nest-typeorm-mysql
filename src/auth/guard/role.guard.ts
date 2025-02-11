import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/role.decorator';
import { Role } from '../../common/enum/rol.enum';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly reflector : Reflector)
  {}
  canActivate( context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(), //extraccion de los metadatos para el controlador de ruta procesxado actualmente
      context.getClass(), //<-accede a los metadados de la clase
    ])
    if(!role){
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if(user.role === Role.Admin){
      return true; //<- si el usuario es admin puede acceder a cualquier ruta
    } 

    return role === user.role;
  }
}
