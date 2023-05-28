import { BaseEvent } from "@/modules/@shared/events";

export class StockItemTitleChangedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemTitleChangedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemTitleChangedEvent {
    export type Payload = {
        stockItemId: string
        title: string
    }
}