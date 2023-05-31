import { Controller, Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { InitializeStockItemNormalUsecaseFactory } from "@core/domain/dist/src/modules/stock/stock-item/factories"
import { Message } from "amqplib";

@Injectable()
export class StockItemNormalConsumerService  implements OnModuleInit{
  
  constructor(
        private readonly rabbitmqService: RabbitMQService
    ) {}
    
  async onModuleInit() {
    await this.rabbitmqService.setupConsumer({ 
        queue: 'initialize-stock-item-normal-queue', 
        exchange: 'StockItemCreatedEventExchange'
    }, this.initializeStockItemNormalConsumer)
  }
  
  async initializeStockItemNormalConsumer(message: Message) {
    const event = RabbitMQService.getContentFromMessage(message)
    const usecase = InitializeStockItemNormalUsecaseFactory.create()
    const usecaseResult = await usecase.execute({ 
        stockItemId: event.payload.id
     })
    if(usecaseResult.isLeft()) return 
  }

}
