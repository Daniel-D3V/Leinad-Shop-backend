import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceItemPriceChangedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceItemPriceChangedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceItemPriceChangedEvent {
    export type Payload = {
        announceItemId: string
        price: number
    }
}