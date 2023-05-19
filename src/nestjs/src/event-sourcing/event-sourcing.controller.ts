import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { Message } from "amqplib";
import { RabbitMQService } from 'src/event-handler/rabbitmq.service';

@Controller()
export class EventSourcingController  implements OnModuleInit{

  constructor(
    private readonly rabbitmqService: RabbitMQService
  ) {}

  async onModuleInit() {
    this.rabbitmqService.consume('event-sourcing-consumer', this.persistMessageEventSourcing)
  }

  persistMessageEventSourcing(message: Message) {
    const data = JSON.parse(message.content.toString())
    console.log(data)
  }

  
}
