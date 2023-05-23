import { EventConsumerModel } from "@/modules/event-sourcing-management/domain/models";
import { EventConsumerRepoitoryInterface } from "@/modules/event-sourcing-management/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaEventConsumerRepository implements EventConsumerRepoitoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    
    async registerConsumption(consumerName: string, eventId: string): Promise<void> {
        await this.prismaClient.eventConsumer.create({
            data: {
                eventId,
                consumerName
            }
        })
    }
    async findConsumption(consumerName: string, eventId: string): Promise<EventConsumerModel | null> {
        const eventConsumer = await this.prismaClient.eventConsumer.findFirst({
            where: {
                consumerName,
                eventId
            }
        })
        if(!eventConsumer) return null
        return {
            consumerName: eventConsumer.consumerName,
            eventId: eventConsumer.eventId
        }
    }

}