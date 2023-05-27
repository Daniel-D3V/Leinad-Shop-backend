import { BaseEvent } from "@/modules/@shared/events";

export class StockItemPriceChangedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemPriceChangedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemPriceChangedEvent {
    export type Payload = {
        stockItemId: string
        price: number
    }
}