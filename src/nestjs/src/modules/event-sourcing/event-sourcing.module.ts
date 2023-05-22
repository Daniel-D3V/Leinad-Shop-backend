import { Module } from '@nestjs/common';
import { EventSourcingController } from './event-sourcing.controller';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';

@Module({
  controllers: [EventSourcingController,],
  providers: [ RabbitMQService ]
})
export class EventSourcingModule {}
