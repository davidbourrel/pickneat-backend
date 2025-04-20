import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ClearCartDto } from './dto/clear-cart.dto';
import { GetCartDto } from './dto/get-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Body() getCartDto: GetCartDto) {
    return this.cartService.getCart(getCartDto);
  }

  @Post()
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Put()
  async updateCartItem(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCartItem(updateCartDto);
  }

  @Delete(':productId')
  async removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto) {
    return this.cartService.removeFromCart(removeFromCartDto);
  }

  @Delete()
  async clearCart(@Body() clearCartDto: ClearCartDto) {
    return this.cartService.clearCart(clearCartDto);
  }
}
