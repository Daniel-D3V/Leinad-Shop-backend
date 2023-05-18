import { BaseEvent, EventEmitterInterface } from "@/modules/@shared/events";
import { PrismaClient } from "@prisma/client";

export class OutboxEmitter implements EventEmitterInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async emit(event: BaseEvent): Promise<void> {
        
        const formatedEvent = event.format()
        const {  dateTimeOccurred, schemaVersion, ...props } = formatedEvent

        await this.prismaClient.outbox.create({
            data: {
                ...props,
                payload: JSON.stringify(formatedEvent),
                timestamp: dateTimeOccurred,
            }
        })
    }
}