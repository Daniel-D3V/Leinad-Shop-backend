import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaEventConsumerRepository } from "./prisma-event-consumer.repository"
import { EventConsumerModel } from "@/modules/event-sourcing-management/domain/models"


describe("Test PrismaEventConsumerRepository", () => {

    let sut: PrismaEventConsumerRepository
    let eventConsumerModel: EventConsumerModel

    beforeEach( async() => {
        eventConsumerModel = {
            consumerName: "consumerName",
            eventId: "eventId"
        }
        sut = new PrismaEventConsumerRepository(prismaClient)
        await prismaClient.eventConsumer.deleteMany({})
    })

    it("Should register consumption", async() => {
        await sut.registerConsumption(eventConsumerModel.consumerName, eventConsumerModel.eventId)
        const eventConsumer = await prismaClient.eventConsumer.findFirst({
            where: {
                consumerName: "consumerName",
                eventId: "eventId"
            }
        })
        expect(eventConsumer).toBeTruthy()
    })

    it("Should find consumption", async() => {
        await sut.registerConsumption(eventConsumerModel.consumerName, eventConsumerModel.eventId)
        const eventConsumer = await sut.findConsumption(eventConsumerModel.consumerName, eventConsumerModel.eventId)
        expect(eventConsumer).toEqual(eventConsumerModel)
    })

})