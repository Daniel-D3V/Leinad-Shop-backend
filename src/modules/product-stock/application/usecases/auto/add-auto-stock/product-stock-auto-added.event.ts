import { BaseEvent } from "@/modules/@shared/events";

export class ProductStockAutoAddedEvent extends BaseEvent {

    constructor(
        readonly payload: CategoryActivatedEvent.Payload
    ){
        super();
    }
}

export namespace CategoryActivatedEvent {
    export type Payload = {
        productStockId: string
        value: string
    }
}