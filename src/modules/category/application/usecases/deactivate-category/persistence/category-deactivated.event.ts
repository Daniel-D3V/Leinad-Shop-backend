import { BaseEvent } from "@/modules/@shared/events";

export class CategoryDeactivatedEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryDeactivatedEvent.Payload
    ){
        super();
    }
}

export namespace CategoryDeactivatedEvent {
    export type Payload = {
        categoryId: string
    }
}