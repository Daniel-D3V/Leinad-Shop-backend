import { BaseEvent } from "@/modules/@shared/events";

export class CategoryCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryCreatedEvent.Payload
    ) {
        super();
    }
}

export namespace CategoryCreatedEvent {
    export type Payload = {
        id: string
        title: string
        description: string
        parrentId?: string
        status: string
    }
}