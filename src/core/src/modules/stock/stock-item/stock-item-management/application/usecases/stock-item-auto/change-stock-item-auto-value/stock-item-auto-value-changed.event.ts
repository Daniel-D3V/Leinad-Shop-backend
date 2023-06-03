import { BaseEvent } from "@/modules/@shared/events";

export class StockItemAutoValueChangedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemAutoValueChangedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemAutoValueChangedEvent {
    export type Payload = {
        stockItemAutoId: string
        value: string
    }
}