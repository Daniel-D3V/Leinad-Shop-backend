import { Controller, Injectable, OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { CreateProductStockNormalUsecaseFactory } from "@core/domain/dist/src/modules/product-stock/factories"
import { Message } from "amqplib";
import { RemoveOutboxFactory } from "@core/domain/dist/src/modules/event-sourcing-management/factories";

@Injectable()
export class ProductStockNormalConsumerService  implements OnModuleInit{
  
  constructor(
        private readonly rabbitmqService: RabbitMQService
    ) {}
    
  async onModuleInit() {
    const queue = 'create-normal-stock-queue';
    const exchangeName = 'AnnounceCreatedEventExchange'
    await this.rabbitmqService.assertExchange(exchangeName, "fanout", { durable: true, })
    await this.rabbitmqService.assertQueue(queue, { durable: true });
    await this.rabbitmqService.bindQueue(queue, exchangeName, 'AnnounceCreatedEvent');
    await this.rabbitmqService.consume(queue, this.CreateNormalStockPersistenceConsumer)
  }
  
  async CreateNormalStockPersistenceConsumer(message: Message) {

    const data = JSON.parse(message.content.toString())
    const persistEventUsecase = CreateProductStockNormalUsecaseFactory.create({
        consumerName: 'create-normal-stock-persistence-consumer',
        eventId: data.id
    });
    const persistOutput = await persistEventUsecase.execute({
      productStockId: data.payload.id
    })
    if(persistOutput.isLeft()) {
      if(persistOutput.value[0].name !== "ConsumptionAlreadyRegisteredError"){
        throw persistOutput.value[0]
      }
      return
    }
  }
  
}
