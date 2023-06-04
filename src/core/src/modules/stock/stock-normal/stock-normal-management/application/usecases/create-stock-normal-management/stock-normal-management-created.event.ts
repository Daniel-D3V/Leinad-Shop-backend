import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalManagementCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalManagementCreatedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalManagementCreatedEvent {
    export type Payload = {
        id: string
        announceNormalId: string
        stockType: string
    }
}