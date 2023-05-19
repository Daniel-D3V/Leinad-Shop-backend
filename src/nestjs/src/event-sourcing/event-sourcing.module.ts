import { Module } from '@nestjs/common';
import { EventSourcingController } from './event-sourcing.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [EventSourcingController],
  providers: [],
  // imports:  [ ClientsModule.register([
  //   {
  //     name: 'RABBITMQ_SERVICE',
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://admin:admin@localhost:5672'],
  //       queue: 'event-sourcing-consumer',
  //       queueOptions: {
  //         durable: true,
  //       },
  //       noAck: false
  //     },
  //   },
  // ]),
  // ]
})
export class EventSourcingModule {}
