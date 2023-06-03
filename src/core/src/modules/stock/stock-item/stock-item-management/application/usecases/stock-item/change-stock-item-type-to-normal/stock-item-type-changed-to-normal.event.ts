import { BaseEvent } from "@/modules/@shared/events";

export class StockItemTypeChangedToNormalEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemTypeChangedToNormalEvent.Payload
    ){
        super();
    }
}

export namespace StockItemTypeChangedToNormalEvent {
    export type Payload = {
        stockItemId: string
    }
}