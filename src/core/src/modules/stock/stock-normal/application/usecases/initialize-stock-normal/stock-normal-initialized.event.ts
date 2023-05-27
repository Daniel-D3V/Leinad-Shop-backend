import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalInitializedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalInitializedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalInitializedEvent {
    export type Payload = {
        id: string
        stock: number
        announceId: string
    }
}