import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      throw new HttpException(
        `Failed to get user. Error: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const userHashPassword = await this.hashPassword(data.passwordHash);
    try {
      return this.prisma.user.create({
        data: {
          ...data,
          passwordHash: userHashPassword,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Failed to create user. Error: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    try {
      return this.prisma.user.update({
        where,
        data,
      });
    } catch (error) {
      throw new HttpException(
        `Failed to update user. Error: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return this.prisma.user.delete({
        where,
      });
    } catch (error) {
      throw new HttpException(
        `Failed to delete user. Error: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hashPassword(plainPassword: string) {
    return await argon2.hash(plainPassword);
  }
}
