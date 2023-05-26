import { BaseEvent } from "@/modules/@shared/events";

export class StockManagementCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockManagementCreatedEvent.Payload
    ){
        super();
    }
}

export namespace StockManagementCreatedEvent {
    export type Payload = {
        id: string
        announceId: string
        stockType: string
    }
}