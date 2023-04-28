import { BaseEvent } from "@/modules/@shared/events";

export class CategoryUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace CategoryUpdatedEvent {
    export type Payload = {
        categoryId: string
        data: {
            title?: string
            description?: string
        }
    }
}