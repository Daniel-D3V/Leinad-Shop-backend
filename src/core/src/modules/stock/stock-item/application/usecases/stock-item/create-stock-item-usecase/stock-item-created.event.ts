import { BaseEvent } from "@/modules/@shared/events";

export class StockItemCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemCreatedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemCreatedEvent {
    export type Payload = {
        id: string
        announceId: string
        price: number
    }
}