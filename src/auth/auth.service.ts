import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.getUser({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordCorrect = await this.verifyPassword(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return this.authenticateUser(user);
  }

  async getProfile(userEmail: string) {
    const user = await this.userService.getUser({
      email: userEmail,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { userEmail: user.email, userId: user.id };
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    return await argon2.verify(hashedPassword, plainPassword);
  }

  private async authenticateUser(user: User) {
    const payload = { sub: user.id, email: user.email };
    const userWithoutPassword = {
      ...user,
      passwordHash: undefined,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }
}
