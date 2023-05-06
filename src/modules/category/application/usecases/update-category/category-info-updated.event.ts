import { BaseEvent } from "@/modules/@shared/events";

export class CategoryInfoUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryInfoUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace CategoryInfoUpdatedEvent {
    export type Payload = {
        categoryId: string
        data: {
            title?: string
            description?: string
        }
    }
}