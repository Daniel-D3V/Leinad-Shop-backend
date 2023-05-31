import { Controller, Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { InitializeStockManagementFactory } from "@core/domain/dist/src/modules/stock/stock-management/factories"
import { Message } from "amqplib";

@Injectable()
export class StockManagementConsumerService  implements OnModuleInit{
  
  constructor(
        private readonly rabbitmqService: RabbitMQService
    ) {}
    
  async onModuleInit() {
    await this.rabbitmqService.setupConsumer({ 
        queue: 'initialize-stock-management-queue', 
        exchange: 'AnnounceCreatedEventExchange'
    }, this.initializeStockNormalConsumer)
  }
  
  async initializeStockNormalConsumer(message: Message) {
    const event = RabbitMQService.getContentFromMessage(message)
    const usecase = InitializeStockManagementFactory.create()
    const usecaseResult = await usecase.execute({ announceId: event.payload.id })
    if(usecaseResult.isLeft()) return 
  }

}
