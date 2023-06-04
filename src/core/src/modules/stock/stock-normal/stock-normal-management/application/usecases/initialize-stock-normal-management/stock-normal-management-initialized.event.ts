import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalManagementInitializedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalManagementInitializedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalManagementInitializedEvent {
    export type Payload = {
        id: string
        announceNormalId: string
        stockType: string
    }
}