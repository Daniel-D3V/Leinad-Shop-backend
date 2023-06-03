import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalUpdatedEvent {
    export type Payload = {
        stockNormalId: string
        newStock: number
    }
}