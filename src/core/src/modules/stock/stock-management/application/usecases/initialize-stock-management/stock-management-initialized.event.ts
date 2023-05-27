import { BaseEvent } from "@/modules/@shared/events";

export class StockManagementInitializedEvent extends BaseEvent {

    constructor(
        readonly payload: StockManagementInitializedEvent.Payload
    ){
        super();
    }
}

export namespace StockManagementInitializedEvent {
    export type Payload = {
        id: string
        announceId: string
        stockType: string
    }
}