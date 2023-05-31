import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';
import { StockNormalController } from './normal/stock-normal.controller';
import { StockNormalConsumerService } from './normal/stock-normal-consumer.service';
import { StockManagementConsumerService } from './stock-management/stock-normal-consumer.service';

@Module({
  controllers: [
      StockNormalController,
    ],
  providers: [ StockNormalConsumerService,StockManagementConsumerService ,RabbitMQService ]
})
export class ProductStockModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    
  }
}
