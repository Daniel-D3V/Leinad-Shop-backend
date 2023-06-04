import { BaseEvent } from "@/modules/@shared/events";

export class StockAutoNormalValueChangedEvent extends BaseEvent {

    constructor(
        readonly payload: StockAutoNormalValueChangedEvent.Payload
    ){
        super();
    }
}

export namespace StockAutoNormalValueChangedEvent {
    export type Payload = {
        stockNormalAutoId: string
        value: string
    }
}