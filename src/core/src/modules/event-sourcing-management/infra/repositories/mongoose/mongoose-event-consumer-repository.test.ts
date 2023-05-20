import { MongoMemoryServer } from "mongodb-memory-server"
import { MongooseEventConsumerRepository } from "./mongoose-event-consumer-repository"
import { EventConsumerModel } from "@/modules/event-sourcing-management/domain/models"
import mongoose from "mongoose"
import { MongoEventConsumerModel } from "./models"



describe("Test MongooseEventConsumerRepository", () => {

    let mongoServer: MongoMemoryServer
    let sut: MongooseEventConsumerRepository
    let eventConsumer: EventConsumerModel

    beforeEach(async () => {
        eventConsumer = {
            consumerName: "any_consumer_name",
            eventId: "any_event_id"
        }
        sut = new MongooseEventConsumerRepository()
        
        await MongoEventConsumerModel.deleteMany()
    })

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri =  mongoServer.getUri();
        await mongoose.connect(mongoUri);
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop();
    })


    it("should return null when consumption is not registered", async () => {
        const result = await sut.findConsumption(eventConsumer.consumerName, eventConsumer.eventId)
        expect(result).toBeNull()
    })

    it("should return eventConsumer when consumption is registered", async () => {
        await MongoEventConsumerModel.create(eventConsumer)
        const result = await sut.findConsumption(eventConsumer.consumerName, eventConsumer.eventId)
        expect(result).toEqual(eventConsumer)
    })

    it("should register consumption", async () => {
        await sut.registerConsumption(eventConsumer.consumerName, eventConsumer.eventId)
        const result = await MongoEventConsumerModel.findOne(eventConsumer)
        expect(result).toBeTruthy()
    })

    
})