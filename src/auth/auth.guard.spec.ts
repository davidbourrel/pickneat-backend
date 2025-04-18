import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    authGuard = new AuthGuard(new JwtService());
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
