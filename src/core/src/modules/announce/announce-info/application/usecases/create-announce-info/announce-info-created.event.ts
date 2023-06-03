import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceInfoCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceInfoCreatedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceInfoCreatedEvent {
    export type Payload = {
        id: string
        title: string
        description: string
        announceId: string
    }
}