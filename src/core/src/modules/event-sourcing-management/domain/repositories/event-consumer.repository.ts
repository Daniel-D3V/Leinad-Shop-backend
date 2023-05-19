import { EventConsumerModel } from "../models"

export interface EventConsumerRepoitoryInterface {
    registerConsumption(consumerName: string, eventId: string): Promise<void>
    findConsumption(consumerName: string, eventId: string): Promise<EventConsumerModel | null>
}