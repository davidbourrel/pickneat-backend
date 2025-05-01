import { Injectable } from '@nestjs/common';
import { Category, Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProduct(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
      include: {
        category: true,
      },
    });
  }

  async getProducts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        category: true,
      },
    });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where,
      include: {
        category: true,
      },
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
      include: {
        category: true,
      },
    });
  }

  async getCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const categories = await this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    const categoryOrder = ['Burgers', 'Sides', 'Salads', 'Drinks', 'Desserts'];
    return categories.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.name);
      const indexB = categoryOrder.indexOf(b.name);
      return indexA - indexB;
    });
  }
}
