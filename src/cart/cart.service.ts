import { Injectable } from '@nestjs/common';
import { CartItem } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  private readonly includeContent = {
    items: {
      include: {
        product: true,
      },
    },
  };

  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: this.includeContent,
    });
  }

  async addToCart(addToCartDto: AddToCartDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: addToCartDto.userId },
    });
    if (!user) {
      throw new Error('User does not exist');
    }

    // Find the existing cart
    let cart = await this.prisma.cart.findUnique({
      where: { userId: addToCartDto.userId },
      include: this.includeContent,
    });

    // If it doesn't exist, create it
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId: addToCartDto.userId },
        include: this.includeContent,
      });
    }

    // Check if the product already exists in the cart
    const items = (cart.items ?? []) as CartItem[];

    const existingItem = items.find(
      (item) => item.productId === addToCartDto.productId,
    );

    if (existingItem) {
      // If the product exists, update the quantity
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        include: { product: true },
        data: { quantity: existingItem.quantity + 1 },
      });
    }

    // Otherwise, add the product to the cart
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: addToCartDto.productId,
        quantity: 1,
        priceAtAdding: addToCartDto.price,
      },
      include: { product: true },
    });
  }

  async updateCartItem(updateCartDto: UpdateCartDto) {
    // Check that the item belongs to the user's cart
    const cart = await this.prisma.cart.findUnique({
      where: { userId: updateCartDto.userId },
    });
    if (!cart) throw new Error('Cart not found');

    return this.prisma.cartItem.update({
      where: {
        id: updateCartDto.itemId,
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
    // Check that the item belongs to the user's cart
    const cart = await this.prisma.cart.findUnique({
      where: { userId: removeFromCartDto.userId },
    });
    if (!cart) throw new Error('Cart not found');

    return this.prisma.cartItem.delete({
      where: {
        id: removeFromCartDto.itemId,
      },
    });
  }

  async clearCart(userId: number) {
    // 1. Get the user's cart
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) return null;

    // 2. Delete all items from the cart
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
}
