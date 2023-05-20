import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { Message } from "amqplib";
import { RabbitMQService } from 'src/event-handler/rabbitmq.service';
import { PersistEventUsecaseFactory, RemoveOutboxFactory } from "@core/domain/dist/src/modules/event-sourcing-management/factories"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Controller()
export class EventSourcingController  implements OnModuleInit{

  constructor(
    private readonly rabbitmqService: RabbitMQService
  ) {}

  async onModuleInit() {
    //await this.rabbitmqService.consume('event-sourcing-consumer', this.persistMessageEventSourcing)
  }
/////
  async persistMessageEventSourcing(message: Message) {
    await  sleep(5000)
    console.log(new Date().toISOString())
    const data = JSON.parse(message.content.toString())
    const persistEventUsecase = PersistEventUsecaseFactory.create();
    const result = await persistEventUsecase.execute(data)
    console.log(result.isRight())

    const removeOutboxUsecase = RemoveOutboxFactory.create()
    await removeOutboxUsecase.execute(data.id)
  }
  
}
