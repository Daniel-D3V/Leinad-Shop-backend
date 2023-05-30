import { Controller, Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { InitializeStockNormalUsecaseFactory } from "@core/domain/dist/src/modules/stock/stock-normal/factories"
import { Message } from "amqplib";

@Injectable()
export class StockNormalConsumerService  implements OnModuleInit{
  
  constructor(
        private readonly rabbitmqService: RabbitMQService
    ) {}
    
  async onModuleInit() {
    const queue = 'create-stock-normal-queue';
    const exchangeName = 'AnnounceCreatedEventExchange'
    await this.rabbitmqService.assertExchange(exchangeName, "fanout", { durable: true, })
    await this.rabbitmqService.assertQueue(queue, { durable: true });
    await this.rabbitmqService.bindQueue(queue, exchangeName, 'AnnounceCreatedEvent');
    await this.rabbitmqService.consume(queue, this.initializeStockNormalPersistenceConsumer)
  }
  
  async initializeStockNormalPersistenceConsumer(message: Message) {

    const data = JSON.parse(message.content.toString())
    const initializeStockNormalUsecase = InitializeStockNormalUsecaseFactory.create({
        consumerName: 'initialize-stock-normal-persistence-consumer',
        eventId: data.id
    });
    const persistOutput = await initializeStockNormalUsecase.execute({
        announceId: data.id
    })
    if(persistOutput.isLeft()) {
      if(persistOutput.value[0].name !== "ConsumptionAlreadyRegisteredError"){
        throw persistOutput.value[0]
      }
      return
    }
  }
  
}
