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
    return this.prisma.cart.findFirst({
      where: { userId: getCartDto.userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async addToCart(addToCartDto: AddToCartDto) {
    // First, try to find an existing cart for the user
    const existingCart = await this.prisma.cart.findFirst({
      where: { userId: addToCartDto.userId },
    });

    if (existingCart) {
      // If cart exists, add item to existing cart
      return this.prisma.cartItem.create({
        data: {
          cartId: existingCart.id,
          productId: addToCartDto.productId,
          quantity: 1,
          priceAtAdding: addToCartDto.price,
        },
      });
    }

    // If no cart exists, create a new one with the item
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
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateCartItem(updateCartDto: UpdateCartDto) {
    return this.prisma.cartItem.update({
      where: {
        id: updateCartDto.itemId,
        cart: {
          userId: updateCartDto.userId,
        },
      },
      data: {
        quantity: updateCartDto.quantity,
      },
      include: {
        product: true,
      },
    });
  }

  async removeFromCart(removeFromCartDto: RemoveFromCartDto) {
    return this.prisma.cartItem.delete({
      where: {
        id: removeFromCartDto.itemId,
        cart: {
          userId: removeFromCartDto.userId,
        },
      },
    });
  }

  async clearCart(clearCartDto: ClearCartDto) {
    return this.prisma.cart.deleteMany({
      where: { userId: clearCartDto.userId },
    });
  }
}
