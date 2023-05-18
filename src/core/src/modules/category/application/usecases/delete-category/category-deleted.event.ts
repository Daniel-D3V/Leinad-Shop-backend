import { BaseEvent } from "@/modules/@shared/events";

export class CategoryDeletedEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryDeletedEvent.Payload
    ){
        super();
    }
}

export namespace CategoryDeletedEvent {
    export type Payload = {
        categoryId: string
    }
}