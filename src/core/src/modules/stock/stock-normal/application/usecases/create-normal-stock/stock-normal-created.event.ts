import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalCreatedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalCreatedEvent {
    export type Payload = {
        id: string
        stock: number
        announceId: string
    }
}