import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './auth.types';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async getAuth(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const data = await this.authService.login(loginDto);
    return data;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: RequestWithUser) {
    console.log('req.user', req.user);

    return await this.authService.getProfile(req.user.email);
  }
}
