import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceNormalStockTypeChangedToManualEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceNormalStockTypeChangedToManualEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceNormalStockTypeChangedToManualEvent {
    export type Payload = {
        announceNormalId: string
    }
}