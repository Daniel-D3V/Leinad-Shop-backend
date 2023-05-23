import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductStockAutoController } from './product-stock-auto.controller';
import  { ProductStockNormalController } from "./product-stock-normal.controller"
import { ProductStockController } from "./product-stock.controller"
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { CheckAnnounceFromUserMiddleware } from 'src/middlewares/check-announce-from-user/check-announce-from-user.middleware';

@Module({
  controllers: [
      ProductStockAutoController,
      ProductStockNormalController, 
      ProductStockController
    ],
  providers: []
})
export class ProductStockModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, CheckAnnounceFromUserMiddleware)
      .forRoutes("*/:*")
  }
}
