import { BaseEvent } from "@/modules/@shared/events";

export class StockItemManualCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemManualCreatedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemManualCreatedEvent {
    export type Payload = {
        id: string
        stock: number
        stockItemManagementId: string
    }
}