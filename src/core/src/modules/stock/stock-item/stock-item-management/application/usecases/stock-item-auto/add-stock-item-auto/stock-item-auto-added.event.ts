import { BaseEvent } from "@/modules/@shared/events";

export class StockItemAutoAddedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemAutoAddedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemAutoAddedEvent {
    export type Payload = {
        id: string
        stockItemId: string
        value: string
    }
}