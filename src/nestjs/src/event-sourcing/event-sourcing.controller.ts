import { Controller } from '@nestjs/common';
import {  Payload, EventPattern, RmqContext, Ctx } from '@nestjs/microservices';



@Controller()
export class EventSourcingController {

  @EventPattern(undefined)
  create(@Payload() createEventSourcingDto: any,  @Ctx() context: RmqContext) {
    const data = JSON.parse(createEventSourcingDto)
    console.log(data)

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }

  
}
