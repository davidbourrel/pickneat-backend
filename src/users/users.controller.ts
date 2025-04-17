import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers({});
  }
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.getUser({ id: id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  async createUser(
    @Body()
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    try {
      console.log('user', user);

      if (!user.email || !user.passwordHash) {
        throw new Error('Email and password are required');
      }

      return this.userService.createUser(user);
    } catch (error) {
      throw new Error(`Failed to create user. Error: ${error as string}`);
    }
  }
}
