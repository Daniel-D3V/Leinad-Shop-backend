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
    await this.rabbitmqService.assertQueue(queue, { durable: true });
    await this.rabbitmqService.bindQueue(queue, 'amq.fanout', 'ProductStockNormalCreatedEvent');
    await this.rabbitmqService.consume(queue, this.persistMessageEventSourcing)
  }
  
  async persistMessageEventSourcing(message: Message) {

    const data = JSON.parse(message.content.toString())
    const persistEventUsecase = CreateProductStockNormalUsecaseFactory.create({
        consumerName: 'create-normal-stock-consumer',
        eventId: data.id
    });
    const persistOutput = await persistEventUsecase.execute(data)
    console.log(persistOutput.value)
    if(persistOutput.isLeft()) {
      return
    }

    const removeOutboxUsecase = RemoveOutboxFactory.create()
    await removeOutboxUsecase.execute(data.id)
  }
  
}
