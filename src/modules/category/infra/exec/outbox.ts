import { BaseEvent, EventEmitterInterface } from "@/modules/@shared/events";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";


export class PrismaOutBox implements EventEmitterInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async emit(event: BaseEvent): Promise<void> {

        const { id, eventName, dateTimeOccurred, payload } = event.format()
        await this.prismaClient.outbox.create({
            data: {
                id,
                eventName,
                payload: JSON.stringify(payload),
                timestamp: dateTimeOccurred
            }
        })
    }
}