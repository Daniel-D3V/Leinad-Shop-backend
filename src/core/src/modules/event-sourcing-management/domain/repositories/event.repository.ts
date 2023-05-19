import { EventModel } from "../models";

export interface EventRepositoryInterface {
    persitEvent(event: EventModel): Promise<void>
}