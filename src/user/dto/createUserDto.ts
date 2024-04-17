import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray() // Ensure roles is an array
  @IsEnum(Role, { each: true }) // Validate each item against Role enum
  roles: Role[]; // Array of roles
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
