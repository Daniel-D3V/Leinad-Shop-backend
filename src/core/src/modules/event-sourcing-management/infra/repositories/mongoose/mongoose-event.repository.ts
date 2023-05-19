import { EventModel } from "@/modules/event-sourcing-management/application/domain/models";
import { EventRepositoryInterface } from "@/modules/event-sourcing-management/application/domain/repositories";
import { MongoEventModel } from "./models";
import { Types } from "mongoose"

export class MongooseEventRepository implements EventRepositoryInterface {

    async persitEvent(event: EventModel): Promise<void> {
        await MongoEventModel.create({
            id: event.id,
            eventName: event.eventName,
            schemaVersion: event.schemaVersion,
            dateTimeOccurred: event.dateTimeOccurred,
            payload: event.payload
        })
    }
}