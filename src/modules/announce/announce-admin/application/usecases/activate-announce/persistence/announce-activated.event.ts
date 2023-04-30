import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceActivatedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceActivatedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceActivatedEvent {
    export type Payload = {
        announceId: string
    }
}