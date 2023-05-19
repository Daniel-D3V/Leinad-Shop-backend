import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { Message } from "amqplib";
import { RabbitMQService } from 'src/event-handler/rabbitmq.service';
import { PersistEventUsecaseFactory, RemoveOutboxFactory } from "@core/domain/dist/src/modules/event-sourcing-management/factories"

@Controller()
export class EventSourcingController  implements OnModuleInit{

  constructor(
    private readonly rabbitmqService: RabbitMQService
  ) {}

  async onModuleInit() {
    this.rabbitmqService.consume('event-sourcing-consumer', this.persistMessageEventSourcing)
  }
////
  async persistMessageEventSourcing(message: Message) {
    const data = JSON.parse(message.content.toString())
    
    const persistEventUsecase = PersistEventUsecaseFactory.create()
    await persistEventUsecase.execute(data)

    const removeOutboxUsecase = RemoveOutboxFactory.create()
    await removeOutboxUsecase.execute(data.id)
  }

  
}
