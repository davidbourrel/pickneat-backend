import { Body, Controller, Post } from '@nestjs/common';
import { AuthBodyDto } from './auth-body.dto';
import { AuthService } from './auth.service';

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
}
