import { Request } from '@nestjs/common';

export interface RequestWithUser extends Request {
  user: {
    email: string;
  };
}

export interface Payload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
