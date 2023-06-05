import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalManualUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalManualUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalManualUpdatedEvent {
    export type Payload = {
        stockNormalManualId: string
        stock: number
    }
}