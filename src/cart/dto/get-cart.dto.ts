import { CartItem } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class GetCartDto {
  @IsNotEmpty()
  @IsNumber()
  cartId!: number;

  @IsNotEmpty()
  @IsNumber()
  userId!: number;
}

export class GetCartResponseDto {
  @IsNotEmpty()
  @IsArray()
  items!: CartItem[];
}
