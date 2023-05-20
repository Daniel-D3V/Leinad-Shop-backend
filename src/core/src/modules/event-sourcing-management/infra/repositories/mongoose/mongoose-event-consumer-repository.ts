import { EventConsumerModel } from "@/modules/event-sourcing-management/domain/models";
import { EventConsumerRepoitoryInterface } from "@/modules/event-sourcing-management/domain/repositories";
import { MongoEventConsumerModel } from "./models";
import mongoose from "mongoose";


export class MongooseEventConsumerRepository implements EventConsumerRepoitoryInterface {

    session?: mongoose.mongo.ClientSession
    constructor(session?: mongoose.mongo.ClientSession){
        this.session = session
    }

    async registerConsumption(consumerName: string, eventId: string): Promise<void> {
        await MongoEventConsumerModel.create({ consumerName, eventId })
    }

    async findConsumption(consumerName: string, eventId: string): Promise<EventConsumerModel | null> {
        const mongoEventConsumer = await MongoEventConsumerModel.findOne({ consumerName, eventId })
        if(!mongoEventConsumer) return null
        return {
            consumerName: mongoEventConsumer.consumerName,
            eventId: mongoEventConsumer.eventId
        }
    }


}