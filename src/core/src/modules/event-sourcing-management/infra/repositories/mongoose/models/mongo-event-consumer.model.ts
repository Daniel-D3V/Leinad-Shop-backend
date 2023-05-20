import mongoose, { Schema, Document } from 'mongoose';

export interface IEventConsumer extends Document {
    consumerName: string
    eventId: string
}

const EventSchema: Schema = new Schema({
    consumerName: { type: String, required: true },
    eventId: { type: String, required: true }
});
EventSchema.index({ consumerName: 1, eventId: 1 }, { unique: true });

export const MongoEventConsumerModel = mongoose.model<IEventConsumer>('EventConsumer', EventSchema);

