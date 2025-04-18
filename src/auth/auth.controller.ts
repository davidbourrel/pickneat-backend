import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthBodyDto } from './auth-body.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async getAuth(
    @Body() authBody: AuthBodyDto,
  ): Promise<{ access_token: string }> {
    const data = await this.authService.login(authBody);
    return data;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: RequestWithUser) {
    console.log('req.user', req.user);

    return await this.authService.getProfile(req.user.email);
  }
}
