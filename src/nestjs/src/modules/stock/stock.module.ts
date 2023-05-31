import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';
import { StockNormalController } from './normal/stock-normal.controller';
import { StockNormalConsumerService } from './normal/stock-normal-consumer.service';
import { StockManagementConsumerService } from './stock-management/stock-management-consumer.service';
import { StockManagementController } from "./stock-management/stock-management.controller"
import { StockAutoController } from './auto/stock-auto.controller';
import { StockItemConsumerService } from './item/stock-item-consumer.service';
import { StockItemController } from './item/stock-item.controller';
import { StockItemNormalConsumerService } from './item/stock-item-normal/stock-item-normal-consumer.service';
import { StockItemNormalController } from './item/stock-item-normal/stock-item-normal.controller';
import { StockItemAutoController } from './item/stock-item-auto/stock-item-auto.controller';

@Module({
  controllers: [
      StockNormalController,
      StockAutoController,
      StockManagementController,
      StockItemController,
      StockItemNormalController,
      StockItemAutoController
    ],
  providers: [ 
    RabbitMQService, 
    StockNormalConsumerService, 
    StockManagementConsumerService, 
    StockItemConsumerService,
    StockItemNormalConsumerService
  ]
})
export class ProductStockModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    
  }
}
