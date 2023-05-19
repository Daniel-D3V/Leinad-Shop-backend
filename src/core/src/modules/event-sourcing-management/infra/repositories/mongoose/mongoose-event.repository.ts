import { EventModel } from "@/modules/event-sourcing-management/application/domain/models";
import { EventRepositoryInterface } from "@/modules/event-sourcing-management/application/domain/repositories";

export class MongooseEventRepository implements EventRepositoryInterface {

    async persitEvent(event: EventModel): Promise<void> {
        
    }
}