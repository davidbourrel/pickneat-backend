import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty()
  @IsNumber()
  itemId!: number;

  @IsNotEmpty()
  @IsNumber()
  userId!: number;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}
