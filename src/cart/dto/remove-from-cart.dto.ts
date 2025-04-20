import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveFromCartDto {
  @IsNotEmpty()
  @IsNumber()
  cartId!: number;

  @IsNotEmpty()
  @IsNumber()
  userId!: number;
}
