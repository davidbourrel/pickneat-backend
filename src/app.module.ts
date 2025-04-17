import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make env variables available everywhere
    }),
    ProductsModule,
    UsersModule,
    CartModule,
    AuthModule,
  ],
  controllers: [AppController, CartController],
  providers: [AppService],
})
export class AppModule {}
