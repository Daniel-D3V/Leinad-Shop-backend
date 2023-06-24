import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceNormalStockTypeChangedToAutoEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceNormalStockTypeChangedToAutoEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceNormalStockTypeChangedToAutoEvent {
    export type Payload = {
        announceNormalId: string
    }
}