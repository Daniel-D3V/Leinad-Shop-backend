import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { RabbitmqServerProvider } from "@core/domain/dist/src/modules/@shared/infra/providers"
import { Message } from "amqplib";

@Controller()
export class EventSourcingController  implements OnModuleInit{


  async onModuleInit() {
    const rabbitmqServerProvider = new RabbitmqServerProvider('amqp://admin:admin@localhost:5672')
    await rabbitmqServerProvider.start()
    rabbitmqServerProvider.consume('event-sourcing-consumer', this.persistMessageEventSourcing)
  }

  persistMessageEventSourcing(message: Message) {
    const data = JSON.parse(message.content.toString())
    console.log(data)
  }

  
}
