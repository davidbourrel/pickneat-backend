import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  @IsString()
  access_token!: string;
  user!: Omit<User, 'passwordHash'>;
}
