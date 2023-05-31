import { Controller, Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { InitializeStockNormalUsecaseFactory } from "@core/domain/dist/src/modules/stock/stock-normal/factories"
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
    }, this.initializeStockNormalPersistenceConsumer)
  }
  
  async initializeStockNormalPersistenceConsumer(message: Message) {
    
    const event = JSON.parse(message.content.toString())
    console.log("its working", event)
    
  }
  
}
