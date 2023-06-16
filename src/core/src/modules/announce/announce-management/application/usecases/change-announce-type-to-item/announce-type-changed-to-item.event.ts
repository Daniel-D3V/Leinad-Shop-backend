import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceTypeChangedToItemEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceTypeChangedToItemEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceTypeChangedToItemEvent {
    export type Payload = {
        announceId: string
    }
}