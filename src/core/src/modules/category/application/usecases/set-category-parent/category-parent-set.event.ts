import { BaseEvent } from "@/modules/@shared/events";

export class CategoryParentSetEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryParentSetEvent.Payload
    ){
        super();
    }
}

export namespace CategoryParentSetEvent {
    export type Payload = {
        categoryId: string
        parentId: string
    }
}