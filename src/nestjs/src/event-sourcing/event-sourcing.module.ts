import { Module } from '@nestjs/common';
import { EventSourcingController } from './event-sourcing.controller';

@Module({
  controllers: [EventSourcingController],
  
})
export class EventSourcingModule {}
