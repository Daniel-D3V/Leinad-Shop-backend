
import { EventRepositoryInterface } from "@/modules/event-sourcing-management/domain/repositories";
import { MongoEventModel } from "./models";
import { EventModel } from "@/modules/event-sourcing-management/domain/models";
import mongoose from "mongoose";

export class MongooseEventRepository implements EventRepositoryInterface {

    session?: mongoose.mongo.ClientSession
    constructor(session?: mongoose.mongo.ClientSession){
        this.session = session
    }

    async persitEvent(event: EventModel): Promise<void> {
        await MongoEventModel.create([{
            id: event.id,
            eventName: event.eventName,
            schemaVersion: event.schemaVersion,
            dateTimeOccurred: event.dateTimeOccurred,
            payload: event.payload
        }], { session: this.session })
    }
}