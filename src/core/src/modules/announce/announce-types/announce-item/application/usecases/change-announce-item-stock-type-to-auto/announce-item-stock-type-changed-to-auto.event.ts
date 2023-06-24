import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceItemStockTypeChangedToAutoEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceItemStockTypeChangedToAutoEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceItemStockTypeChangedToAutoEvent {
    export type Payload = {
        announceItemId: string
    }
}