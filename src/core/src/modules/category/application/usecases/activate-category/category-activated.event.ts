import { BaseEvent } from "@/modules/@shared/events";

export class CategoryActivatedEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryActivatedEvent.Payload
    ){
        super();
    }
}

export namespace CategoryActivatedEvent {
    export type Payload = {
        categoryId: string
    }
}