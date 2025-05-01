import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveFromCartDto {
  @IsNotEmpty()
  @IsNumber()
  itemId!: number;

  @IsNotEmpty()
  @IsNumber()
  userId!: number;
}
