import { BaseEvent } from "@/modules/@shared/events";

export class StockItemManualUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemManualUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemManualUpdatedEvent {
    export type Payload = {
        stockItemManualId: string
        stock: number
    }
}