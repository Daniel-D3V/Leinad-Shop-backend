import { Module } from '@nestjs/common';
import { MysqlEventConsumerService } from "./mysql-event-consumer.service"
import { RabbitMQService } from './rabbitmq.service';

@Module({
  providers: [ MysqlEventConsumerService, RabbitMQService ]
})
export class EventHandlerModule {}
