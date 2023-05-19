import mongoose from "mongoose"
import { MongooseEventRepository } from "./mongoose-event.repository"

import { randomUUID } from "crypto"
import { MongoEventModel } from "./models"
import { MongoMemoryServer } from 'mongodb-memory-server';
import { EventModel } from "@/modules/event-sourcing-management/domain/models";

describe("Test MongooseEventRepository", () => {

    let mongoServer: MongoMemoryServer
    let sut: MongooseEventRepository
    let event: EventModel
    let id: string

    beforeEach(async () => {
        id = randomUUID()
        event = {
            id,
            dateTimeOccurred: new Date(),
            eventName: "any_event_name",
            schemaVersion: "any_schema_version",
            payload: {
                any: "any"
            }
        }
        sut = new MongooseEventRepository()
        
        await MongoEventModel.deleteMany()
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



    it("Should save the event", async () => {
        await sut.persitEvent(event)
        const mongoEvent = await MongoEventModel.findOne({ id })
        if(!mongoEvent ) throw new Error("Event not found")
        
        expect(mongoEvent.id).toBe(event.id)
        expect(mongoEvent.eventName).toBe(event.eventName)
        expect(mongoEvent.schemaVersion).toBe(event.schemaVersion)
        expect(mongoEvent.dateTimeOccurred).toEqual(event.dateTimeOccurred)
        expect(mongoEvent.payload).toEqual(event.payload)
    })
})