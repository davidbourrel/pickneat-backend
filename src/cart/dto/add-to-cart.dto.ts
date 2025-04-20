import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsNumber()
  userId!: number;

  @IsNotEmpty()
  @IsNumber()
  productId!: number;

  @IsNotEmpty()
  @IsNumber()
  price!: number;
}
