import mongoose, { Schema, Document } from 'mongoose';

export interface IEventConsumer extends Document {
    consumerName: string
    eventId: string
}

const EventSchema: Schema = new Schema({
    consumerName: { type: String, required: true },
    eventId: { type: String, required: true }
});

export const MongoEventConsumerModel = mongoose.model<IEventConsumer>('EventConsumer', EventSchema);

