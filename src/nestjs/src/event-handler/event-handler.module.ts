import { Module } from '@nestjs/common';
import { MysqlEventConsumerService } from "./mysql-event-consumer.service"
import { RabbitMQEventEmitterService } from './rabbitmq-event-emitter.service';

@Module({
  providers: [ MysqlEventConsumerService, RabbitMQEventEmitterService ]
})
export class EventHandlerModule {}
