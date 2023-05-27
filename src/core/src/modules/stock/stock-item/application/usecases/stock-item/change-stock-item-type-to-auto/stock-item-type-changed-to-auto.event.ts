import { BaseEvent } from "@/modules/@shared/events";

export class StockItemTypeChangedToAutoEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemTypeChangedToAutoEvent.Payload
    ){
        super();
    }
}

export namespace StockItemTypeChangedToAutoEvent {
    export type Payload = {
        stockItemId: string
    }
}