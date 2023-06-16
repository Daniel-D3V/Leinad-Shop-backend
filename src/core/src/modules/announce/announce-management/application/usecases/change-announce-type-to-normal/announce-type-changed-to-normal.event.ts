import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceTypeChangedToNormalEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceTypeChangedToNormalEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceTypeChangedToNormalEvent {
    export type Payload = {
        announceId: string
    }
}