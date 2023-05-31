import { Controller, Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { InitializeStockItemUsecaseFactory } from "@core/domain/dist/src/modules/stock/stock-item/factories"
import { Message } from "amqplib";

@Injectable()
export class StockItemConsumerService  implements OnModuleInit{
  
  constructor(
        private readonly rabbitmqService: RabbitMQService
    ) {}
    
  async onModuleInit() {
    await this.rabbitmqService.setupConsumer({ 
        queue: 'initialize-stock-item-queue', 
        exchange: 'AnnounceItemCreatedEventExchange'
    }, this.initializeStockNormalConsumer)
  }
  
  async initializeStockNormalConsumer(message: Message) {
    const event = RabbitMQService.getContentFromMessage(message)
    const usecase = InitializeStockItemUsecaseFactory.create()
    const usecaseResult = await usecase.execute({ 
        announceItemId: event.payload.id
     })
    if(usecaseResult.isLeft()) return 
  }

}
