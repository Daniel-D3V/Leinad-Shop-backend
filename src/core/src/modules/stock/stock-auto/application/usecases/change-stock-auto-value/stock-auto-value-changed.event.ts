import { BaseEvent } from "@/modules/@shared/events";

export class StockAutoValueChangedEvent extends BaseEvent {

    constructor(
        readonly payload: StockAutoValueChangedEvent.Payload
    ){
        super();
    }
}

export namespace StockAutoValueChangedEvent {
    export type Payload = {
        stockAutoId: string
        value: string
    }
}