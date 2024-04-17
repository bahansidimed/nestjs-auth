import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector ,    private jwtService: JwtService,
    ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized: Missing JWT token');
    }

    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer ' prefix
    try {
      const decoded = this.jwtService.decode(token); // Decode the JWT token
      const user = decoded.sub; // Access user information from decoded payload
        console.log(user);
        console.log(requiredRoles);
        
      return requiredRoles.some((role) => user.roles?.includes(role));
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: Invalid JWT token');
    }
    
  }
}