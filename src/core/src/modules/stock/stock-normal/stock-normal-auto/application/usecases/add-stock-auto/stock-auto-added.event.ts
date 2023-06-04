import { BaseEvent } from "@/modules/@shared/events";

export class StockAutoAddedEvent extends BaseEvent {

    constructor(
        readonly payload: StockAutoAddedEvent.Payload
    ){
        super();
    }
}

export namespace StockAutoAddedEvent {
    export type Payload = {
        id: string
        value: string
    }
}