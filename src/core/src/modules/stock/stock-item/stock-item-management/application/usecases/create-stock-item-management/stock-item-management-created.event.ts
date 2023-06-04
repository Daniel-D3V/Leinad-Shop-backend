import { BaseEvent } from "@/modules/@shared/events";

export class StockItemManagementCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemManagementCreatedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemManagementCreatedEvent {
    export type Payload = {
        id: string
        announceItemId: string
        stockItemType: string
    }
}