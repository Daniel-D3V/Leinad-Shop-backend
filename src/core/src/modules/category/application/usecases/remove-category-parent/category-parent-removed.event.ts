import { BaseEvent } from "@/modules/@shared/events";

export class CategoryParentRemovedEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryParentRemovedEvent.Payload
    ){
        super();
    }
}

export namespace CategoryParentRemovedEvent {
    export type Payload = {
        categoryId: string
    }
}