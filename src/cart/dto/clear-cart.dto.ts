import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClearCartDto {
  @IsNotEmpty()
  @IsNumber()
  userId!: number;
}
