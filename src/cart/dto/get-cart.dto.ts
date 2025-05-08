import { CartItem } from '@prisma/client';
import { IsArray, IsNotEmpty } from 'class-validator';

export class GetCartResponseDto {
  @IsNotEmpty()
  @IsArray()
  items!: CartItem[];
}
