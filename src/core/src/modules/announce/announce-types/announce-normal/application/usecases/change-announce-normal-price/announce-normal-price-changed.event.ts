import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceNormalPriceChangedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceNormalPriceChangedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceNormalPriceChangedEvent {
    export type Payload = {
        announceNormalId: string
        price: number
    }
}