import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceItemStockTypeChangedToManualEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceItemStockTypeChangedToManualEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceItemStockTypeChangedToManualEvent {
    export type Payload = {
        announceItemId: string
    }
}