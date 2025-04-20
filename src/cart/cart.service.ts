import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ClearCartDto } from './dto/clear-cart.dto';
import { GetCartDto } from './dto/get-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(getCartDto: GetCartDto) {
    return this.prisma.cart.findUnique({
      where: { id: getCartDto.cartId, userId: getCartDto.userId },
      include: {
        items: true,
      },
    });
  }

  async addToCart(addToCartDto: AddToCartDto) {
    return this.prisma.cart.create({
      data: {
        userId: addToCartDto.userId,
        items: {
          create: {
            productId: addToCartDto.productId,
            quantity: 1,
            priceAtAdding: addToCartDto.price,
          },
        },
      },
    });
  }

  async updateCartItem(updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id: updateCartDto.cartId, userId: updateCartDto.userId },
      data: {
        items: {
          update: {
            where: { id: updateCartDto.productId },
            data: { quantity: updateCartDto.quantity },
          },
        },
      },
    });
  }
  async removeFromCart(removeFromCartDto: RemoveFromCartDto) {
    return this.prisma.cart.delete({
      where: {
        id: removeFromCartDto.cartId,
        userId: removeFromCartDto.userId,
      },
    });
  }

  async clearCart(clearCartDto: ClearCartDto) {
    return this.prisma.cart.deleteMany({
      where: { userId: clearCartDto.userId },
    });
  }
}
