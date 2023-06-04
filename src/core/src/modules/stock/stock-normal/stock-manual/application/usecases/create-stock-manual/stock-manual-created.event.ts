import { BaseEvent } from "@/modules/@shared/events";

export class StockManualCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockManualCreatedEvent.Payload
    ){
        super();
    }
}

export namespace StockManualCreatedEvent {
    export type Payload = {
        id: string
        stock: number
        stockManagementId: string
    }
}