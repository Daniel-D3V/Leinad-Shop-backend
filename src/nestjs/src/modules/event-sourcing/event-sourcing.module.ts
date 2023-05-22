import { Module } from '@nestjs/common';
import { EventSourcingController } from './event-sourcing.controller';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';
import { MysqlConsumerService } from 'src/services/mysql-consumer/mysql-consumer.service';

@Module({
  controllers: [EventSourcingController,],
  providers: [ RabbitMQService, MysqlConsumerService ]
})
export class EventSourcingModule {}
