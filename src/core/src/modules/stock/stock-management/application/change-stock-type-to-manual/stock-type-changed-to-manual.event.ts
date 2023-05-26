import { BaseEvent } from "@/modules/@shared/events";

export class StockTypeChangedToManualEvent extends BaseEvent {

    constructor(
        readonly payload: StockTypeChangedToManualEvent.Payload
    ){
        super();
    }
}

export namespace StockTypeChangedToManualEvent {
    export type Payload = {
        productStockId: string
    }
}