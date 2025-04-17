import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './auth-body.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authBody: AuthBodyDto): Promise<{ access_token: string }> {
    const user = await this.userService.getUser({
      email: authBody.email,
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordCorrect = await this.verifyPassword(
      authBody.password,
      user.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return this.authenticateUser(user);
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    return await argon2.verify(hashedPassword, plainPassword);
  }

  private async authenticateUser(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
