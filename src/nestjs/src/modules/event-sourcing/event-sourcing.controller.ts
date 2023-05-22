import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { Message } from "amqplib";
import { PersistEventUsecaseFactory, RemoveOutboxFactory } from "@core/domain/dist/src/modules/event-sourcing-management/factories"
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';


@Controller()
export class EventSourcingController  implements OnModuleInit{
  
  constructor(
    private readonly rabbitmqService: RabbitMQService
    ) {}
    
  async onModuleInit() {
    const queue = 'event-sourcing-queue';
    await this.rabbitmqService.assertQueue(queue, { durable: true });
    await this.rabbitmqService.bindQueue(queue, 'amq.fanout', '');
    await this.rabbitmqService.consume(queue, this.persistMessageEventSourcing)
  }
  
  async persistMessageEventSourcing(message: Message) {

    const data = JSON.parse(message.content.toString())
    const persistEventUsecase = PersistEventUsecaseFactory.create();
    const persistOutput = await persistEventUsecase.execute(data)
    if(persistOutput.isLeft()) return

    const removeOutboxUsecase = RemoveOutboxFactory.create()
    await removeOutboxUsecase.execute(data.id)
  }
  
}
