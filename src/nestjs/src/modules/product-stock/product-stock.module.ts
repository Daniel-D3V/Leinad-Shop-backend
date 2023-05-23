import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductStockAutoController } from './product-stock-auto.controller';
import  { ProductStockNormalController } from "./normal/product-stock-normal.controller"
import { ProductStockController } from "./product-stock.controller"
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { ProductStockNormalConsumerService } from './normal/product-stock-normal-consumer.service';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';

@Module({
  controllers: [
      ProductStockAutoController,
      ProductStockNormalController, 
      ProductStockController
    ],
  providers: [ ProductStockNormalConsumerService, RabbitMQService ]
})
export class ProductStockModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
          {path: "product-stock-auto/*", method: RequestMethod.ALL},
          {path: "product-stock-normal/*", method: RequestMethod.ALL},
          {path: "product-stock/*", method: RequestMethod.ALL}
        )
  }
}
